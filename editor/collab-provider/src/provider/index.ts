import type { EditorState, Transaction } from 'prosemirror-state';
import type { Step as ProseMirrorStep } from 'prosemirror-transform';
import { Emitter } from '../emitter';
import { Channel } from '../channel';
import type { ResolvedEditorState } from '@atlaskit/editor-common/collab';
import type {
  CollabEditProvider,
  CollabEvents,
  CollabEventTelepointerData,
  Config,
  Metadata,
  NamespaceStatus,
  PresencePayload,
  TelepointerPayload,
  InitialDraft,
} from '../types';

import { createLogger } from '../helpers/utils';
import AnalyticsHelper from '../analytics/analytics-helper';

import type { SyncUpErrorFunction } from '@atlaskit/editor-common/types';

import { telepointerCallback } from '../participants/telepointers-helper';
import { ParticipantsService } from '../participants/participants-service';
import {
  DestroyError,
  GetCurrentStateError,
  GetFinalAcknowledgedStateError,
  ProviderInitialisationError,
  SendTransactionError,
  SetEditorWidthError,
  SetMetadataError,
  SetTitleError,
  NCS_ERROR_CODE,
} from '../errors/error-types';
import { MetadataService } from '../metadata/metadata-service';
import { DocumentService } from '../document/document-service';
import { errorCodeMapper } from '../errors/error-code-mapper';
import type { InternalError } from '../errors/error-types';

const logger = createLogger('Provider', 'black');

const SEND_PRESENCE_INTERVAL = 150 * 1000; // 150 seconds

const OUT_OF_SYNC_PERIOD = 3 * 1000; // 3 seconds

export const MAX_STEP_REJECTED_ERROR = 15;

type BaseEvents = Pick<
  CollabEditProvider<CollabEvents>,
  'setup' | 'send' | 'sendMessage'
>;

export class Provider extends Emitter<CollabEvents> implements BaseEvents {
  private channel: Channel;
  private config: Config;
  private analyticsHelper?: AnalyticsHelper;
  private isChannelInitialized: boolean = false;
  private initialDraft?: InitialDraft;
  private isProviderInitialized: boolean = false;

  // To keep track of the namespace event changes from the server.
  private isNamespaceLocked: boolean = false;

  // SessionID is the unique socket-session.
  private sessionId?: string;

  // ClientID is the unique ID for a prosemirror client. Used for step-rebasing.
  private clientId?: number | string;

  // UserID is the users actual account id.
  private userId?: string;

  private presenceUpdateTimeout?: number;

  private disconnectedAt?: number;

  private readonly participantsService: ParticipantsService;
  private readonly metadataService: MetadataService;
  private readonly documentService: DocumentService;

  private readonly emitCallback: (evt: keyof CollabEvents, data: any) => void =
    (evt, data) => this.emit(evt, data);

  constructor(config: Config) {
    super();
    this.config = config;
    this.analyticsHelper = new AnalyticsHelper(
      this.config.documentAri,
      this.config.analyticsClient,
      this.config.getAnalyticsWebClient,
    );
    this.channel = new Channel(config, this.analyticsHelper);
    this.isChannelInitialized = false;
    this.initialDraft = this.config.initialDraft;
    this.isProviderInitialized = false;
    this.participantsService = new ParticipantsService(this.analyticsHelper);
    this.metadataService = new MetadataService(
      this.emitCallback,
      this.channel.sendMetadata,
    );
    this.documentService = new DocumentService(
      this.participantsService,
      this.analyticsHelper,
      this.channel.fetchCatchup,
      this.emitCallback,
      this.channel.broadcast,
      () => this.userId,
      this.onErrorHandled,
      this.metadataService,
    );
  }

  private initializeChannel = () => {
    this.emit('connecting', { initial: true });
    const shouldInitialize =
      Boolean(this.initialDraft) && !this.isProviderInitialized;
    this.channel
      .on('connected', ({ sid, initialized }) => {
        this.sessionId = sid;
        this.emit('connected', { sid, initial: !initialized });
        // If initial draft is already present and the channel is initialized,
        // fire the provider's init event with initial draft document and version
        if (this.initialDraft && initialized && !this.isProviderInitialized) {
          const { document, version, metadata }: InitialDraft =
            this.initialDraft;
          // Initial document, version, metadata from initial draft
          this.documentService.updateDocument({
            doc: document,
            version,
            metadata,
          });
          this.metadataService.updateMetadata(metadata);
          this.isProviderInitialized = true;
        }
        // If already initialized, `connected` means reconnected
        if (
          initialized &&
          this.disconnectedAt &&
          // Offline longer than `OUT_OF_SYNC_PERIOD`
          Date.now() - this.disconnectedAt >= OUT_OF_SYNC_PERIOD
        ) {
          this.documentService.throttledCatchup();
        }
        this.startInactiveRemover();
        this.disconnectedAt = undefined;
      })
      .on('init', ({ doc, version, metadata }) => {
        // Initial document and version
        this.documentService.updateDocument({
          doc,
          version,
          metadata,
        });
        this.metadataService.updateMetadata(metadata);
      })
      .on('restore', this.documentService.onRestore)
      .on('steps:added', this.documentService.onStepsAdded)
      .on('metadata:changed', this.metadataService.onMetadataChanged)
      .on('participant:telepointer', this.onParticipantTelepointer.bind(this))
      .on('presence:joined', this.onPresenceJoined.bind(this))
      .on('presence', this.onPresence.bind(this))
      .on('participant:left', this.onParticipantLeft.bind(this))
      .on('participant:updated', this.onParticipantUpdated.bind(this))
      .on('disconnect', this.onDisconnected.bind(this))
      .on('error', this.onErrorHandled)
      .on('status', this.onNamespaceStatusChanged.bind(this))
      .connect(shouldInitialize);
  };

  /**
   * Initialisation logic, called by Jira with a dummy getState function, deprecated in favour of the setup method which allows more configuration
   * @param {Function} getState Function that returns the editor state, used to retrieve collab-edit properties and to interact with prosemirror-collab
   * @throws {ProviderInitialisationError} Something went wrong during provider initialisation
   * @deprecated Use setup method instead
   */
  initialize(getState: () => EditorState): this {
    return this.setup({
      getState,
    });
  }

  /**
   * Initialisation logic, called by the editor in the collab-edit plugin
   * @param {Object} parameters ...
   * @param {Function} parameters.getState Function that returns the editor state, used to retrieve collab-edit properties and to interact with prosemirror-collab
   * @param {SyncUpErrorFunction} parameters.onSyncUpError (Optional) Function that gets called when the sync of steps fails after retrying 30 times, used by Editor to log to analytics
   * @throws {ProviderInitialisationError} Something went wrong during provider initialisation
   */
  setup({
    getState,
    onSyncUpError,
  }: {
    getState: () => EditorState;
    onSyncUpError?: SyncUpErrorFunction;
  }): this {
    this.checkForCookies();
    try {
      const collabPlugin = getState().plugins.find(
        (p: any) => p.key === 'collab$',
      );
      if (collabPlugin === undefined) {
        throw new ProviderInitialisationError(
          'Collab provider attempted to initialise, but Editor state is missing collab plugin',
        );
      }
      this.clientId = (collabPlugin.spec as any).config.clientID;

      this.documentService.setup({
        getState,
        onSyncUpError,
        clientId: this.clientId,
      });

      if (!this.isChannelInitialized) {
        this.initializeChannel();
        this.isChannelInitialized = true;
      }
    } catch (initError) {
      this.analyticsHelper?.sendErrorEvent(
        initError,
        'Error while initialising the provider',
      );
      // Throw error so consumers are aware the initialisation failed when initialising themselves
      throw new ProviderInitialisationError(
        'Provider initialisation error',
        initError,
      );
    }

    return this;
  }

  private checkForCookies() {
    if (!global.navigator.cookieEnabled) {
      const initError = new ProviderInitialisationError(
        'Cookies are not enabled. Please enable cookies to use collaborative editing.',
      );
      this.analyticsHelper?.sendErrorEvent(
        initError,
        'Error while initialising the provider - cookies disabled',
      );
      throw new ProviderInitialisationError(
        'Provider initialisation error - cookies disabled',
        initError,
      );
    }
  }

  /**
   * Send steps from transaction to NCS (and as a consequence to other participants), called from the collab-edit plugin in the editor
   * @param {Transaction} _tr Deprecated, included to keep API consistent with Synchrony provider
   * @param {EditorState} _oldState Deprecated, included to keep API consistent with Synchrony provider
   * @param {EditorState} newState The editor state after applying the transaction
   * @throws {SendTransactionError} Something went wrong while sending the steps for this transaction
   */
  send(
    _tr: Transaction | null,
    _oldState: EditorState | null,
    newState: EditorState,
  ) {
    try {
      // Don't send steps while the document is locked (eg. when restoring the document)
      if (this.isNamespaceLocked) {
        logger('The document is temporary locked');
        return;
      }
      this.documentService.send(_tr, _oldState, newState);
    } catch (error) {
      this.analyticsHelper?.sendErrorEvent(
        error,
        'Error while sending steps for a transaction',
      );
      throw new SendTransactionError(
        'Error while sending steps for a transaction',
        error,
      );
    }
  }

  /**
   * @param {InternalError} error The error to handle
   */
  private onErrorHandled = (error: InternalError) => {
    // User tried committing steps but they were rejected because:
    // HEAD_VERSION_UPDATE_FAILED: the collab service's latest stored step tail version didn't correspond to the head version of the first step submitted
    // VERSION_NUMBER_ALREADY_EXISTS: while storing the steps there was a conflict meaning someone else wrote steps into the database more quickly
    if (
      error.data?.code === NCS_ERROR_CODE.HEAD_VERSION_UPDATE_FAILED ||
      error.data?.code === NCS_ERROR_CODE.VERSION_NUMBER_ALREADY_EXISTS
    ) {
      this.documentService.onStepRejectedError();
    } else {
      this.analyticsHelper?.sendErrorEvent(error, 'Error handled');
      const mappedError = errorCodeMapper(error);
      // Temporarily only emit errors to Confluence very intentionally because they will disconnect the collab provider
      if (mappedError) {
        this.analyticsHelper?.sendErrorEvent(mappedError, 'Error emitted');
        this.emit('error', mappedError);
      }
    }
  };

  /**
   * Send messages, such as telepointers, to NCS and other participants. Only used for telepointer data (text and node selections) in the editor and JWM. JWM does some weird serialisation stuff on the node selections.
   * Silently fails if an error occurs, since Presence isn't a critical functionality and self-restores over time.
   * @param {CollabEventTelepointerData} data Data you want to send to NCS / the other participants
   * @param {string} data.type Can only be 'telepointer' for now, we don't support anything else yet
   * @param {CollabSendableSelection} data.selection Object representing the selected element
   * @param {string} data.sessionId Identifier identifying the session
   */
  sendMessage(data: CollabEventTelepointerData) {
    try {
      if (data?.type === 'telepointer') {
        const payload = {
          userId: this.userId!,
          sessionId: this.sessionId!,
          clientId: this.clientId!,
          selection: data.selection,
        };
        const callback = telepointerCallback(this.config.documentAri);
        this.channel.broadcast('participant:telepointer', payload, callback);
      }
    } catch (error) {
      // We don't want to throw errors for Presence features as they tend to self-restore
      this.analyticsHelper?.sendErrorEvent(
        error,
        'Error while sending message - telepointer',
      );
    }
  }

  private sendPresence = () => {
    try {
      if (this.presenceUpdateTimeout) {
        clearTimeout(this.presenceUpdateTimeout);
      }
      this.channel.broadcast('participant:updated', {
        sessionId: this.sessionId!,
        userId: this.userId!,
        clientId: this.clientId!,
      });

      this.presenceUpdateTimeout = window.setTimeout(
        () => this.sendPresence(),
        SEND_PRESENCE_INTERVAL,
      );
    } catch (error) {
      // We don't want to throw errors for Presence features as they tend to self-restore
      this.analyticsHelper?.sendErrorEvent(
        error,
        'Error while sending presence',
      );
    }
  };

  /**
   * Called when a participant joins the session.
   *
   * We keep track of participants internally in this class, and emit the `presence` event to update
   * the active avatars in the editor.
   * This method will be triggered from backend to notify all participants to exchange presence
   */
  private onPresenceJoined = ({ sessionId }: PresencePayload) => {
    try {
      logger('Participant joined with session: ', sessionId);
      // This expose existing users to the newly joined user
      this.sendPresence();
    } catch (error) {
      // We don't want to throw errors for Presence features as they tend to self-restore
      this.analyticsHelper?.sendErrorEvent(
        error,
        'Error while joining presence',
      );
    }
  };

  private onPresence = ({ userId }: PresencePayload) => {
    try {
      logger('onPresence userId: ', userId);
      this.userId = userId;
      this.sendPresence();
      this.channel.sendPresenceJoined();
    } catch (error) {
      // We don't want to throw errors for Presence features as they tend to self-restore
      this.analyticsHelper?.sendErrorEvent(
        error,
        'Error while receiving presence',
      );
    }
  };

  /**
   * Called when a participant leaves the session.
   *
   * We emit the `presence` event to update the active avatars in the editor.
   */
  private onParticipantLeft = (data: PresencePayload) =>
    this.participantsService.participantLeft(data, this.emitCallback);

  private startInactiveRemover = () =>
    this.participantsService.removeInactiveParticipants(
      this.sessionId,
      this.emitCallback,
    );

  /**
   * Called when we receive an update event from another participant.
   */
  private onParticipantUpdated = (data: PresencePayload) =>
    this.participantsService.updateParticipant(
      data,
      this.config.getUser,
      this.emitCallback,
    );

  /**
   * Called when we receive a telepointer update from another
   * participant.
   */
  private onParticipantTelepointer = (data: TelepointerPayload) =>
    this.participantsService.participantTelepointer(
      data,
      this.sessionId,
      this.config.getUser,
      this.emitCallback,
    );

  // Note: this gets triggered on page reload for Firefox (not other browsers) because of closeOnBeforeunload: false
  private onDisconnected = ({ reason }: { reason: string }) => {
    this.disconnectedAt = Date.now();
    this.participantsService.disconnect(
      reason,
      this.sessionId,
      this.emitCallback,
    );
  };

  /**
   * "Destroy" the provider, disconnect it's connection to the back-end service and unsubscribe all event listeners on the provider.
   * Used by Jira products (JWM, JPD) to disable the provider
   * @throws {DestroyError} Something went wrong while shutting down the collab provider
   */
  destroy() {
    return this.unsubscribeAll();
  }

  /**
   * Disconnect the provider, disconnect it's connection to the back-end service and unsubscribe all event listeners on the provider.
   * Used by Confluence to disable the provider when a user doesn't have access to a resource.
   * @deprecated use destroy instead, it does the same thing
   * @throws {DestroyError} Something went wrong while shutting down the collab provider
   */
  disconnect() {
    return this.unsubscribeAll();
  }

  /**
   * Disconnect the provider's connection to the back-end service and unsubscribe from all events emitted by this provider. Kept to keep roughly aligned to Synchrony API, which you need to call for each event.
   * @deprecated use destroy instead, it does the same thing
   * @throws {DestroyError} Something went wrong while shutting down the collab provider
   */
  unsubscribeAll() {
    try {
      super.unsubscribeAll();
      this.channel.disconnect();
    } catch (error) {
      this.analyticsHelper?.sendErrorEvent(
        error,
        'Error while shutting down the collab provider',
      );
      throw new DestroyError(
        'Error while shutting down the collab provider',
        error,
      );
    }
    this.clearTimers();
    return this;
  }

  /**
   * Update the title of the document in the collab provider and optionally broadcast it to other participants and NCS
   * @deprecated use setMetadata instead, it does the same thing
   * @param {string} title Title you want to set on the document
   * @param {boolean} broadcast (Optional) Flag indicating whether you want to broadcast the title change to the other participants, always true for now (otherwise we would lose title changes)
   * @throws {SetTitleError} Something went wrong while setting the title
   */
  setTitle(title: string, broadcast?: boolean) {
    try {
      this.metadataService.setTitle(title, broadcast);
    } catch (error) {
      this.analyticsHelper?.sendErrorEvent(error, 'Error while setting title');
      throw new SetTitleError('Error while setting title', error);
    }
  }

  /**
   * Set editor width, not used any more
   * @deprecated use setMetadata instead, it does the same thing
   * @param {string} editorWidth string? indicating the editor width
   * @param {boolean} broadcast (Optional) Flag indicating whether you want to broadcast the editor width change
   * @throws {SetEditorWidthError} Something went wrong while setting the editor width
   */
  setEditorWidth(editorWidth: string, broadcast?: boolean) {
    try {
      this.metadataService.setEditorWidth(editorWidth, broadcast);
    } catch (error) {
      this.analyticsHelper?.sendErrorEvent(
        error,
        'Error while setting editor width',
      );
      throw new SetEditorWidthError('Error while setting editor width', error);
    }
  }

  /**
   * Set the editor width and title and distribute it to all participants. Used by Confluence
   * @param {Metadata} metadata The metadata you want to update
   * @throws {ExampleError} Something went wrong while setting the metadata
   */
  setMetadata(metadata: Metadata) {
    try {
      this.metadataService.setMetadata(metadata);
    } catch (error) {
      this.analyticsHelper?.sendErrorEvent(
        error,
        'Error while setting metadata',
      );
      throw new SetMetadataError('Error while setting metadata', error);
    }
  }

  /**
   * Returns the documents metadata
   */
  getMetadata = () => {
    return this.metadataService.getMetaData();
  };

  /**
   * Return the ADF version of the current draft document, together with it's title and the current step version.
   * Used for draft sync, a process running every 5s for the first editor of a document to sync the document to the Confluence back-end.
   * @throws {GetCurrentStateError} Something went wrong while returning the current state
   */
  getCurrentState = async (): Promise<ResolvedEditorState> => {
    try {
      return this.documentService.getCurrentState();
    } catch (error) {
      this.analyticsHelper?.sendErrorEvent(
        error,
        'Error while returning ADF version of current draft document',
      );
      throw new GetCurrentStateError(
        'Error while returning the current state of the draft document',
        error,
      ); // Reject the promise so the consumer can react to it failing
    }
  };

  /**
   * Return the final acknowledged (by NCS) ADF version of the current draft document, together with it's title and the current step version.
   * Used when returning the document to Confluence on publish.
   * @throws {GetFinalAcknowledgedStateError} Something went wrong while returning the acknowledged state
   */
  getFinalAcknowledgedState = async (): Promise<ResolvedEditorState> => {
    try {
      return this.documentService.getFinalAcknowledgedState();
    } catch (error) {
      this.analyticsHelper?.sendErrorEvent(
        error,
        'Error while returning ADF version of the final draft document',
      );
      throw new GetFinalAcknowledgedStateError(
        'Error while returning the final acknowledged state of the draft document',
        error,
      ); // Reject the promise so the consumer can react to it failing
    }
  };

  getUnconfirmedSteps = (): readonly ProseMirrorStep[] | undefined => {
    return this.documentService.getUnconfirmedSteps();
  };

  /**
   * ESS-2916 namespace status event- lock/unlock
   */
  private onNamespaceStatusChanged = async (data: NamespaceStatus) => {
    const { isLocked, waitTimeInMs, timestamp } = data;
    const start = Date.now();
    logger(`Received a namespace status changed event `, { data });
    if (isLocked && waitTimeInMs) {
      this.isNamespaceLocked = true;
      logger(`Received a namespace status change event `, {
        isLocked,
      });

      // To protect the collab editing process from locked out due to BE
      setTimeout(() => {
        logger(`The namespace lock has expired`, {
          waitTime: Date.now() - start,
          timestamp,
        });
        this.isNamespaceLocked = false;
      }, waitTimeInMs);
      return;
    }
    this.isNamespaceLocked = false;
    logger(`The page lock has expired`);
  };

  /**
   * Used when the provider is disconnected or destroyed to prevent perpetual timers from continuously running
   */
  private clearTimers = () => {
    clearTimeout(this.presenceUpdateTimeout);
    this.participantsService.clearTimers();
  };
}
