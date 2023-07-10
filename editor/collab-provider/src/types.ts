import type { Step } from 'prosemirror-transform';
import type { EditorState, Transaction } from 'prosemirror-state';
import type { AnalyticsWebClient } from '@atlaskit/analytics-listeners';
import type { Manager } from 'socket.io-client';
import type { DisconnectReason } from './disconnected-reason-mapper';
import type { InternalError } from './errors/error-types';
import type { ProviderError } from './errors/error-types';
import { JSONDocNode } from '@atlaskit/editor-json-transformer';
import { GetUserType } from './participants/participants-helper';
import AnalyticsHelper from './analytics/analytics-helper';
export type { ProviderParticipant } from './participants/participants-helper';

// types from editor common

export interface CollabParticipant {
  lastActive: number;
  sessionId: string;
  avatar: string;
  name: string;
  cursorPos?: number;
}

export interface CollabEventInitData {
  doc?: any;
  json?: any;
  version?: number;
  sid?: string;
  reserveCursor?: boolean;
}

export interface CollabEventRemoteData {
  json?: any;
  newState?: EditorState;
  userIds?: (number | string)[];
}

export interface CollabEventConnectionData {
  sid: string;
  initial: boolean;
}

export interface CollabEventConnectingData {
  initial: boolean;
}

export interface CollabEventDisconnectedData {
  sid: string;
  reason:
    | 'CLIENT_DISCONNECT'
    | 'SERVER_DISCONNECT'
    | 'SOCKET_CLOSED'
    | 'SOCKET_ERROR'
    | 'SOCKET_TIMEOUT'
    | 'UNKNOWN_DISCONNECT';
}

export interface CollabEventPresenceData {
  joined?: CollabParticipant[];
  left?: { sessionId: string }[];
}

export interface CollabEventLocalStepData {
  steps: Array<Step>;
}

export type ResolvedEditorState<T = any> = {
  content: JSONDocNode | T;
  title: string | null;
  stepVersion: number;
};

// types from editor common end

export interface Storage {
  get(key: string): Promise<string>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

// Initial draft
export interface InitialDraft {
  document: JSONDocNode;
  version: number;
  metadata?: Metadata;
  timestamp?: number;
}

export interface Config {
  url: string;
  documentAri: string;
  lifecycle?: Lifecycle;
  storage?: Storage;
  // ESS-1009 Allow to opt-in into 404 response
  need404?: boolean;
  createSocket: (
    path: string,
    auth?: AuthCallback | InitAndAuthData,
    productInfo?: ProductInformation,
  ) => Socket;
  /**
   * @deprecated: Use promise based getAnalyticsWebClient instead
   */
  analyticsClient?: AnalyticsWebClient;
  getAnalyticsWebClient?: Promise<AnalyticsWebClient>;
  featureFlags?: { [key: string]: boolean };
  getUser?: GetUserType;
  /**
   * If provided, permissionTokenRefresh is called whenever a new JWT token is required.
   */
  permissionTokenRefresh?: () => Promise<string | null>;
  //flag to signal if the token should be cached locally
  cacheToken?: boolean;
  productInfo?: ProductInformation;
  /**
   * Throws errors when trying to send data to collab but the client is not offline.
   * This can lead to potential dataloss and retrying should be considered. Without this flag the provider silently drops the requests.
   */
  throwOnNotConnected?: boolean;
  // initial draft passed on provider creation
  initialDraft?: InitialDraft;
  /**
   * When a page is being published this number can control the number of failed steps until a catchup is triggered.
   * The default value is MAX_STEP_REJECTED_ERROR (15).
   */
  failedStepLimitBeforeCatchupOnPublish?: number;

  /**
   * Enable checking if a document update from collab-provider is being dropped by the editor,
   * throwing a non-recoverable error if it's detected.
   */
  enableErrorOnFailedDocumentApply?: boolean;
}

export interface InitAndAuthData {
  // The initialized status. If false, BE will send document, otherwise not.
  initialized: boolean;
  // ESS-1009 Allow to opt-in into 404 response
  need404?: boolean;
  token?: string;
}

export type AuthCallback = (cb: (data: InitAndAuthData) => void) => void;

interface SimpleEventEmitter {
  on(event: string, fn: Function): SimpleEventEmitter;
}
export interface Socket extends SimpleEventEmitter {
  id: string;
  connect(): Socket;
  emit(event: string, ...args: any[]): Socket;
  close(): Socket;
  io?: Manager;
}

export type LifecycleEvents = 'save' | 'restore';
export type EventHandler = () => void;

export interface Lifecycle {
  on(event: LifecycleEvents, handler: EventHandler): void;
}

export type CollabConnectedPayload = CollabEventConnectionData;
export type CollabConnectingPayload = CollabEventConnectingData;

export interface CollabDisconnectedPayload {
  reason: DisconnectReason;
  sid: string;
}

export interface CollabInitPayload extends CollabEventInitData {
  doc: any;
  version: number;
  metadata?: Metadata;
  reserveCursor?: boolean;
}

export interface CollabDataPayload extends CollabEventRemoteData {
  version: number;
  json: StepJson[];
  userIds: (number | string)[];
}

export type CollabTelepointerPayload = CollabEventTelepointerData;
export type CollabPresencePayload = CollabEventPresenceData;
export type CollabMetadataPayload = Metadata;
export type CollabLocalStepsPayload = {
  steps: readonly Step[];
};
export type CollabCommitStatusEventPayload = {
  status: 'attempt' | 'success' | 'failure';
  version: number;
};

export interface CollabEvents {
  'metadata:changed': CollabMetadataPayload;
  init: CollabInitPayload;
  connected: CollabConnectedPayload;
  disconnected: CollabDisconnectedPayload;
  data: CollabDataPayload;
  telepointer: CollabTelepointerPayload;
  presence: CollabPresencePayload;
  'local-steps': CollabLocalStepsPayload;
  error: ProviderError;
  entity: any;
  connecting: CollabConnectingPayload;
  'commit-status': CollabCommitStatusEventPayload;
}

// Channel
export interface Metadata {
  [key: string]: string | number | boolean;
}

export type InitPayload = {
  doc: any;
  version: number;
  userId?: string;
  metadata?: Metadata;
};

/**
 * @description Incoming payload type from the `broadcast` route in NCS
 * @param {number} timestamp added in NCS
 * @param {string} sessionId socket.id from NCS
 * @param data event specific data from NCS
 */
export type BroadcastIncomingPayload = {
  sessionId?: string;
  timestamp?: number;
  data: PresencePayload | TelepointerPayload | StepsPayload | any; // broadcasted data from NCS, any added as a fallback
};

export type PresenceData = {
  sessionId: string;
  userId: string | undefined;
  clientId: number | string;
};

export type PresencePayload = PresenceData & {
  timestamp: number;
};

export type TelepointerPayload = PresencePayload & {
  selection: CollabSendableSelection;
};

type MarkJson = {
  type: string;
  attrs: { [key: string]: any };
};

type NodeJson = {
  type: string;
  attrs: { [key: string]: any };
  content: NodeJson[];
  marks: MarkJson[];
  text?: string;
};

type SliceJson = {
  content: NodeJson[];
  openStart: number;
  openEnd: number;
};

export type StepJson = {
  stepType?: string; // Likely required
  from?: number;
  to?: number;
  slice?: SliceJson;
  clientId: number | string;
  userId: string;
  createdAt?: number; // Potentially required?
  structure?: boolean;
};

export enum AcknowledgementResponseTypes {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type AcknowledgementSuccessPayload = {
  type: AcknowledgementResponseTypes.SUCCESS;
};

export type AcknowledgementPayload =
  | AcknowledgementSuccessPayload
  | AcknowledgementErrorPayload;

export type AddStepAcknowledgementSuccessPayload = {
  type: AcknowledgementResponseTypes.SUCCESS;
  version: number;
};

export type AcknowledgementErrorPayload = {
  type: AcknowledgementResponseTypes.ERROR;
  error: InternalError;
};

export type AddStepAcknowledgementPayload =
  | AddStepAcknowledgementSuccessPayload
  | AcknowledgementErrorPayload;

export type StepsPayload = {
  version: number;
  steps: StepJson[];
};

// ESS-2916 Type def for namespace status - lock/unlock
export type NamespaceStatus = {
  isLocked: boolean;
  timestamp: number;
  // waitTimeInMs is set when the isLocked bool set to true. Otherwise, it is null
  waitTimeInMs?: number;
};

export type ChannelEvent = {
  connected: {
    sid: string;
    initialized: boolean;
  };
  init: InitPayload;
  restore: InitPayload;
  reconnected: null;
  'presence:joined': PresencePayload;
  presence: PresencePayload;
  'participant:left': PresencePayload;
  'participant:telepointer': TelepointerPayload;
  'participant:updated': PresencePayload;
  'steps:commit': StepsPayload & { userId: string };
  'steps:added': StepsPayload;
  'metadata:changed': Metadata;
  error: InternalError;
  disconnect: { reason: string };
  status: NamespaceStatus;
};

export interface CatchupResponse {
  doc?: string;
  version?: number;
  stepMaps?: any[];
  metadata?: Metadata;
}

// Catchup
export interface CatchupOptions {
  getCurrentPmVersion: () => number;
  fetchCatchup: (fromVersion: number) => Promise<CatchupResponse>;
  filterQueue: (condition: (stepsPayload: StepsPayload) => boolean) => void;
  getUnconfirmedSteps: () => readonly Step[] | undefined;
  applyLocalSteps: (steps: Step[]) => void;
  updateDocument: ({
    doc,
    version,
    metadata,
    reserveCursor,
  }: CollabInitPayload) => void;
  updateMetadata: (metadata: Metadata | undefined) => void;
  analyticsHelper: AnalyticsHelper | undefined;
}

export type ProductInformation = {
  product: string;
  subProduct?: string;
};

export interface CollabEventTelepointerData {
  type: 'telepointer';
  selection: CollabSendableSelection;
  sessionId: string;
}

export interface CollabSendableSelection {
  type: 'textSelection' | 'nodeSelection';
  // JWM does some weird serialisation stuff:
  // eg. {"type":"nodeSelection","head":"{\"nodeId\":\"project:10002:view/list/node/summary-10000\"}"}
  anchor?: number | string;
  head?: number | string;
}

export interface CollabEditProvider<
  Events extends CollabEvents = CollabEvents,
> {
  initialize(getState: () => any, createStep: (json: object) => Step): this; // TO-DO: depecrate this

  setup(props: {
    getState?: () => EditorState;
    onSyncUpError?: SyncUpErrorFunction;
  }): this;

  send(tr: Transaction, oldState: EditorState, newState: EditorState): void;

  on(evt: keyof Events, handler: (...args: any) => void): this;

  off(evt: keyof Events, handler: (...args: any) => void): this;

  unsubscribeAll(evt: keyof Events): this;

  sendMessage<K extends keyof Events>(data: { type: K } & Events[K]): void;

  getFinalAcknowledgedState(): Promise<ResolvedEditorState>;
}

export type NewCollabSyncUpErrorAttributes = {
  lengthOfUnconfirmedSteps?: number;
  tries: number;
  maxRetries: number;
  clientId?: number | string;
  version: number;
};

export type SyncUpErrorFunction = (
  attributes: NewCollabSyncUpErrorAttributes,
) => void;
