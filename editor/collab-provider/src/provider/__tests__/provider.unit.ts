jest.useFakeTimers();

jest.mock('@atlaskit/prosemirror-collab', () => {
  return {
    sendableSteps: function (state: any) {
      return state.collab;
    },
    getVersion: (state: any) => {
      return (state.collab as any).version;
    },
  };
});

jest.mock('../../channel', () => {
  const events = new Map<string, (...args: any) => {}>();

  function Channel() {
    return {
      emit: (event: string, ...args: any[]) => {
        const handler = events.get(event);
        if (handler) {
          handler(...args);
        }
      },
      on: jest
        .fn()
        .mockImplementation(function (this: any, eventName, callback) {
          events.set(eventName, callback);
          return this;
        }),
      connect: jest.fn(),
      broadcast: () => jest.fn(),
      fetchCatchup: () => jest.fn(),
      sendMetadata: () => jest.fn(),
      fetchReconcile: () => jest.fn(),
    };
  }
  return {
    Channel,
  };
});

jest.mock('../../document/catchup', () => {
  return {
    catchup: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});

jest.mock('lodash/throttle', () => jest.fn((fn) => fn));

import { defaultSchema } from '@atlaskit/adf-schema/schema-default';
import type { AnalyticsWebClient } from '@atlaskit/analytics-listeners';
import { Node } from '@atlaskit/editor-prosemirror/model';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { nextTick } from '@atlaskit/editor-test-helpers/next-tick';
import type { Provider } from '../';
import { MAX_STEP_REJECTED_ERROR } from '../';
import AnalyticsHelper from '../../analytics/analytics-helper';
import { Channel } from '../../channel';
import { catchup } from '../../document/catchup';
import { ACK_MAX_TRY } from '../../helpers/const';
import * as Utilities from '../../helpers/utils';
import * as Telepointer from '../../participants/telepointers-helper';
import { createSocketIOCollabProvider } from '../../socket-io-provider';
import { commitStepQueue } from '../commit-step';
// @ts-ignore only used for mock
import ProseMirrorCollab from '@atlaskit/prosemirror-collab';
import { ProviderInitialisationError } from '../../errors/custom-errors';
import type { InternalError } from '../../errors/internal-errors';
import { INTERNAL_ERROR_CODE } from '../../errors/internal-errors';
import { NCS_ERROR_CODE } from '../../errors/ncs-errors';
import type { UserPermitType } from '../../types';

const testProviderConfig = {
  url: `http://provider-url:66661`,
  documentAri: 'ari:cloud:confluence:ABC:page/testpage',
};
const clientId = 'some-random-prosemirror-client-Id';

describe('Provider', () => {
  let channel: any;

  beforeEach(() => {
    const analyticsHelper = new AnalyticsHelper(testProviderConfig.documentAri);
    channel = new Channel({} as any, analyticsHelper);
  });

  afterEach(jest.clearAllMocks);

  const editorState: any = {
    plugins: [
      {
        key: 'collab$',
        spec: {
          config: {
            clientID: clientId,
          },
        },
      },
    ],
    collab: {
      steps: [],
      origins: [],
      version: 0,
    },
    doc: Node.fromJSON(defaultSchema, {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Hello, World!' },
            {
              // Add a node that looks different in ADF
              type: 'text',
              marks: [
                {
                  type: 'typeAheadQuery',
                  attrs: {
                    trigger: '/',
                  },
                },
              ],
              text: '/',
            },
          ],
        },
      ],
    }),
  };

  describe('setup', () => {
    it('should throw an error when cookies are not enabled', () => {
      const sendErrorEventSpy = jest.spyOn(
        AnalyticsHelper.prototype,
        'sendErrorEvent',
      );
      Object.defineProperty(global.navigator, 'cookieEnabled', {
        value: false,
        writable: true,
      });
      const provider = createSocketIOCollabProvider(testProviderConfig);
      expect(() => {
        provider.setup({ getState: () => editorState });
      }).toThrowErrorMatchingInlineSnapshot(
        `"Cookies are not enabled. Please enable cookies to use collaborative editing."`,
      );
      expect(sendErrorEventSpy).toHaveBeenCalledWith(
        new ProviderInitialisationError(
          'Cookies are not enabled. Please enable cookies to use collaborative editing.',
        ),
        'Error while initialising the provider - cookies disabled',
      );
      Object.defineProperty(global.navigator, 'cookieEnabled', {
        value: true,
      });
    });

    describe('when initializing provider with initial draft and buffering enabled', () => {
      const testProviderConfigWithDraft = {
        initialDraft: {
          document: 'test-document' as any,
          version: 1,
          metadata: { title: 'random-title' },
        },
        ...testProviderConfig,
        isBufferingEnabled: true,
      };

      it('should successfully initialize provider and call catchup when channel connects', async (done) => {
        expect.assertions(4);
        const sid = 'expected-sid-123';
        const provider = createSocketIOCollabProvider(
          testProviderConfigWithDraft,
        );
        const sendStepsFromCurrentStateSpy = jest.spyOn(
          // @ts-ignore
          provider.documentService as any,
          'sendStepsFromCurrentState',
        );
        provider.on('init', (data) => {
          expect(data).toEqual({
            doc: 'test-document',
            version: 1,
            metadata: { title: 'random-title' },
          });
        });
        provider.setup({ getState: () => editorState });
        channel.emit('connected', { sid, initialized: true });
        expect((provider as any).isProviderInitialized).toEqual(true);
        expect((provider as any).isBuffered).toEqual(true);
        expect(sendStepsFromCurrentStateSpy).toHaveBeenCalledTimes(1);
        done();
      });

      it('should start document setup and channel connection when editor state is defined', (done) => {
        expect.assertions(3);
        const provider = createSocketIOCollabProvider(
          testProviderConfigWithDraft,
        );
        const mockEditorState = jest.fn(() => editorState);
        const documentSetupSpy = jest.spyOn(
          // @ts-ignore
          provider.documentService as any,
          'setup',
        );
        const initializeChannelSpy = jest.spyOn(
          provider as any,
          'initializeChannel',
        );
        provider.setup({ getState: mockEditorState });
        expect(documentSetupSpy).toHaveBeenCalledTimes(1);
        expect(documentSetupSpy).toHaveBeenCalledWith({
          getState: mockEditorState,
          clientId: 'some-random-prosemirror-client-Id',
          onSyncUpError: undefined,
        });
        expect(initializeChannelSpy).toHaveBeenCalledTimes(1);
        done();
      });

      it('should fire an analytics event for provider initialization and unconfirmed step count when buffering is successful', async (done) => {
        expect.assertions(3);
        const sid = 'expected-sid-123';
        const provider = createSocketIOCollabProvider(
          testProviderConfigWithDraft,
        );
        const sendActionEventSpy = jest.spyOn(
          AnalyticsHelper.prototype,
          'sendActionEvent',
        );
        provider.on('init', (data) => {
          expect(data).toEqual({
            doc: 'test-document',
            version: 1,
            metadata: { title: 'random-title' },
          });
        });
        provider.setup({ getState: () => editorState });
        expect(sendActionEventSpy).toHaveBeenCalledWith(
          'providerInitialized',
          'INFO',
          {
            isBuffered: true,
          },
        );
        channel.emit('connected', { sid, initialized: true });
        expect(sendActionEventSpy).toHaveBeenCalledWith(
          'hasUnconfirmedSteps',
          'INFO',
          {
            numUnconfirmedSteps: 0,
          },
        );
        done();
      });
    });
  });

  describe('initialisation', () => {
    it('should call initializeChannel once', () => {
      const provider = createSocketIOCollabProvider(testProviderConfig);
      const initializeChannelSpy = jest.spyOn(
        provider as any,
        'initializeChannel',
      );
      provider.initialize(() => editorState);
      // make sure initializeChannel is called
      expect(initializeChannelSpy).toHaveBeenCalledTimes(1);
      provider.initialize(() => editorState);
      // make sure initializeChannel is not called again
      expect(initializeChannelSpy).toHaveBeenCalledTimes(1);
    });

    it('It should start the participant inactive remover when the channel is connected', () => {
      const provider = createSocketIOCollabProvider(testProviderConfig);
      // @ts-ignore - Spy on private member for test
      const participantsService = provider.participantsService;
      jest.spyOn(participantsService, 'startInactiveRemover');

      provider.initialize(() => editorState);
      channel.emit('connected', { sid: 'sid-123' });
      expect(participantsService.startInactiveRemover).toBeCalledWith(
        'sid-123',
      );
    });

    describe('should emit an event on the provider emitter', () => {
      it("'connecting' when the connection is being established to the provider", (done) => {
        const provider = createSocketIOCollabProvider(testProviderConfig);
        provider.on('connecting', ({ initial }) => {
          expect(initial).toBe(true);
          done();
        });
        provider.initialize(() => editorState);
      });

      it("'connected' when the connection is successfully established", async (done) => {
        const provider = createSocketIOCollabProvider(testProviderConfig);
        provider.on('connected', ({ sid, initial }) => {
          expect(sid).toBe('sid-123');
          expect(initial).toBe(true);
          done();
        });
        provider.initialize(() => editorState);
        channel.emit('connected', { sid: 'sid-123' });
      });

      it("'init' with the initialisation data from the collab service", async (done) => {
        let expectedSid: any;
        const sid = 'expected-sid-123';
        const userId = 'user-123';
        const provider = createSocketIOCollabProvider(testProviderConfig);
        provider.on('connected', ({ sid }) => {
          expectedSid = sid;
        });
        provider.on('init', ({ doc, version, metadata }: any) => {
          expect(expectedSid).toBe(sid);
          expect(doc).toBe('bla');
          expect(version).toBe(1);
          expect(metadata).toEqual({
            title: 'some-random-title',
          });
          done();
        });
        provider.initialize(() => editorState);
        channel.emit('connected', { sid });
        channel.emit('init', {
          doc: 'bla',
          version: 1,
          userId,
          metadata: {
            title: 'some-random-title',
          },
        });
      });
    });

    it("'init' with the initial draft data from the provider config", async (done) => {
      const testProviderConfigWithDraft = {
        initialDraft: {
          document: 'test-document' as any,
          version: 1,
          metadata: { title: 'random-title' },
        },
        ...testProviderConfig,
      };
      const sid = 'expected-sid-123';
      const provider = createSocketIOCollabProvider(
        testProviderConfigWithDraft,
      );
      provider.on('init', (data) => {
        expect(data).toEqual({
          doc: 'test-document',
          version: 1,
          metadata: { title: 'random-title' },
        });
        done();
      });
      provider.initialize(() => editorState);
      channel.emit('connected', { sid, initialized: true });
    });
  });

  describe('document restore', () => {
    const mockedMetadata = { b: 1 };
    const mockedSteps = [{ type: 'fakeStep' }, { type: 'fakeStep' }];
    const mockRestoreData = {
      doc: { a: 1 },
      version: 1,
      userId: 'abc',
      metadata: mockedMetadata,
    };

    it('should emit events for restoration', (done) => {
      expect.assertions(5);
      const sendActionEventSpy = jest.spyOn(
        AnalyticsHelper.prototype,
        'sendActionEvent',
      );
      const provider = createSocketIOCollabProvider(testProviderConfig);
      jest
        // @ts-ignore
        .spyOn(provider.documentService as any, 'getUnconfirmedSteps')
        .mockImplementation(() => mockedSteps);
      provider.initialize(() => editorState);
      provider.on('init', (data) => {
        expect(data).toEqual({
          doc: mockRestoreData.doc,
          version: mockRestoreData.version,
          metadata: mockedMetadata,
          reserveCursor: true,
        });
      });
      provider.on('metadata:changed', (metadata) => {
        expect(metadata).toEqual(mockedMetadata);
      });

      provider.on('local-steps', ({ steps }) => {
        expect(steps).toEqual(mockedSteps);
      });
      // Event emit is a sync operation, so put done here is enough.
      channel.emit('restore', mockRestoreData);

      expect(sendActionEventSpy).toHaveBeenCalledTimes(1);
      expect(sendActionEventSpy).toBeCalledWith(
        'reinitialiseDocument',
        'SUCCESS',
        {
          hasTitle: false,
          numUnconfirmedSteps: 2,
          useReconcile: false,
        },
      );
      done();
    });

    it('should fire analytics on document restore failure', (done) => {
      expect.assertions(8);
      const sendActionEventSpy = jest.spyOn(
        AnalyticsHelper.prototype,
        'sendActionEvent',
      );
      const sendErrorEventSpy = jest.spyOn(
        AnalyticsHelper.prototype,
        'sendErrorEvent',
      );
      const sendProviderErrorEventSpy = jest.spyOn(
        AnalyticsHelper.prototype,
        'sendProviderErrorEvent',
      );
      const provider = createSocketIOCollabProvider(testProviderConfig);
      const restoreError: Error = {
        name: 'Oh no!',
        message: 'Someone has fallen in the river in LEGO city!',
      };
      jest
        // @ts-ignore
        .spyOn(provider.documentService as any, 'getUnconfirmedSteps')
        .mockImplementationOnce(() => mockedSteps);
      jest
        // @ts-ignore
        .spyOn(provider.documentService as any, 'updateDocument')
        .mockImplementationOnce(() => {
          throw restoreError;
        });
      provider.initialize(() => editorState);
      provider.on('error', (error) => {
        expect(error).toEqual({
          code: 'DOCUMENT_RESTORE_ERROR',
          message: 'Collab service unable to restore document',
          recoverable: false,
          status: 500,
        });
        expect(sendActionEventSpy).toHaveBeenCalledTimes(1);
        expect(sendActionEventSpy).toHaveBeenCalledWith(
          'reinitialiseDocument',
          'FAILURE',
          {
            numUnconfirmedSteps: 2,
            useReconcile: false,
          },
        );
        expect(sendErrorEventSpy).toHaveBeenCalledTimes(2);
        expect(sendProviderErrorEventSpy).toHaveBeenCalledTimes(1);
        expect(sendErrorEventSpy).toHaveBeenNthCalledWith(
          1,
          restoreError,
          'Error while reinitialising document',
        );
        expect(sendErrorEventSpy).toHaveBeenNthCalledWith(
          2,
          {
            data: {
              code: 'DOCUMENT_RESTORE_ERROR',
              status: 500,
            },
            message: 'Caught error while trying to recover the document',
          },
          'Error handled',
        );
        expect(sendProviderErrorEventSpy).toHaveBeenCalledWith({
          code: 'DOCUMENT_RESTORE_ERROR',
          message: 'Collab service unable to restore document',
          recoverable: false,
          status: 500,
        });
        done();
      });
      channel.emit('restore', mockRestoreData);
    });
  });

  it('should not emit empty joined or left presence', async () => {
    const provider = createSocketIOCollabProvider(testProviderConfig);
    let counter = 0;
    provider.on('presence', ({ joined, left }) => {
      counter++;
      expect(joined?.length).toBe(1);
      expect(left).toBe(undefined);
    });
    provider.initialize(() => editorState);
    channel.emit('participant:updated', {
      sessionId: 'random-sessionId',
      timestamp: Date.now(),
      userId: 'blabla-userId',
      clientId: 'blabla-clientId',
    });
    channel.emit('participant:updated', {
      sessionId: 'random-sessionId',
      timestamp: Date.now(),
      userId: 'blabla-userId',
      clientId: 'blabla-clientId',
    });

    await new Promise(process.nextTick);

    expect(counter).toBe(1);
  });

  it('emit disconnected to consumer', () => {
    const provider = createSocketIOCollabProvider(testProviderConfig);
    const mockFn = jest.fn();
    provider.on('disconnected', ({ reason, sid }) => {
      mockFn(reason, sid);
    });
    provider.initialize(() => editorState);
    channel.emit('connected', { sid: 'sid-1' });
    channel.emit('disconnect', { reason: 'transport close' });
    channel.emit('connected', { sid: 'sid-2' });
    channel.emit('disconnect', { reason: 'transport error' });
    channel.emit('connected', { sid: 'sid-3' });
    channel.emit('disconnect', { reason: 'ping timeout' });
    channel.emit('connected', { sid: 'sid-4' });
    channel.emit('disconnect', { reason: 'io client disconnect' });
    channel.emit('connected', { sid: 'sid-5' });
    channel.emit('disconnect', { reason: 'io server disconnect' });
    channel.emit('connected', { sid: 'sid-6' });
    channel.emit('disconnect', { reason: 'blah?' });
    expect(mockFn.mock.calls.length).toBe(6);
    expect(mockFn.mock.calls).toEqual([
      ['SOCKET_CLOSED', 'sid-1'],
      ['SOCKET_ERROR', 'sid-2'],
      ['SOCKET_TIMEOUT', 'sid-3'],
      ['CLIENT_DISCONNECT', 'sid-4'],
      ['SERVER_DISCONNECT', 'sid-5'],
      ['UNKNOWN_DISCONNECT', 'sid-6'],
    ]);
  });

  describe('Emit metadata cases', () => {
    it('should emit metadata when title is changed', async (done) => {
      const provider = createSocketIOCollabProvider(testProviderConfig);
      provider.on('metadata:changed', (metadata) => {
        expect(metadata).toEqual({
          title: 'some-random-title',
        });
        done();
      });
      provider.initialize(() => editorState);
      channel.emit('metadata:changed', {
        title: 'some-random-title',
      });
    });

    it('should emit metadata when title has changed to empty string', async (done) => {
      const provider = createSocketIOCollabProvider(testProviderConfig);
      provider.on('metadata:changed', (metadata) => {
        expect(metadata).toEqual({
          title: '',
        });
        done();
      });
      provider.initialize(() => editorState);
      channel.emit('metadata:changed', {
        title: '',
      });
    });

    it('should emit metadata with editorWidth', async (done) => {
      const provider = createSocketIOCollabProvider(testProviderConfig);
      provider.on('metadata:changed', (metadata) => {
        expect(metadata).toEqual({
          editorWidth: 'full-page',
          version: 1,
        });
        done();
      });
      provider.initialize(() => editorState);
      channel.emit('metadata:changed', {
        editorWidth: 'full-page',
        version: 1,
      });
    });

    it('should emit metadata when editor width is changed to empty string', async (done) => {
      const provider = createSocketIOCollabProvider(testProviderConfig);
      provider.on('metadata:changed', (metadata) => {
        expect(metadata).toEqual({
          editorWidth: '',
        });
        done();
      });
      provider.initialize(() => editorState);
      channel.emit('metadata:changed', {
        editorWidth: '',
      });
    });

    it('should emit metadata during init', async (done) => {
      const userId = 'user-123';
      const provider = createSocketIOCollabProvider(testProviderConfig);
      provider.on('init', ({ metadata }: any) => {
        expect(metadata).toEqual({
          title: 'some-random-title',
          editorWidth: 'some-random-width',
        });
        provider.on('metadata:changed', (metadata) => {
          expect(metadata).toEqual({
            title: 'some-random-title',
            editorWidth: 'some-random-width',
          });
          done();
        });
      });
      provider.initialize(() => editorState);
      channel.emit('init', {
        doc: 'bla',
        version: 1,
        userId,
        metadata: {
          title: 'some-random-title',
          editorWidth: 'some-random-width',
        },
      });
    });
  });

  describe('Handle fire analytic requests', () => {
    let provider: Provider;
    let fakeAnalyticsWebClient: AnalyticsWebClient;

    beforeEach(() => {
      fakeAnalyticsWebClient = {
        sendOperationalEvent: jest.fn(),
        sendScreenEvent: jest.fn(),
        sendTrackEvent: jest.fn(),
        sendUIEvent: jest.fn(),
      };
      const testProviderConfigWithAnalytics = {
        url: `http://provider-url:66661`,
        documentAri: 'ari:cloud:confluence:ABC:page/testpage',
        analyticsClient: fakeAnalyticsWebClient,
      };
      provider = createSocketIOCollabProvider(testProviderConfigWithAnalytics);
      provider.initialize(() => editorState);
    });

    describe('fire participants events', () => {
      it('should update the participants', async () => {
        const sendActionEventSpy = jest.spyOn(
          AnalyticsHelper.prototype,
          'sendActionEvent',
        );
        const provider = createSocketIOCollabProvider(testProviderConfig);
        provider.on('presence', ({ joined, left }) => {
          expect(joined?.length).toBe(1);
          expect(left).toBe(undefined);
        });
        provider.initialize(() => editorState);

        channel.emit('participant:updated', {
          sessionId: 'sessionId-1',
          timestamp: Date.now(),
          userId: 'userId-1',
          clientId: 'clientId-1',
        });

        channel.emit('participant:updated', {
          sessionId: 'sessionId-2',
          timestamp: Date.now(),
          userId: 'userId-2',
          clientId: 'clientId-2',
        });

        await new Promise(process.nextTick);
        expect(sendActionEventSpy).toHaveBeenCalledTimes(2);
        expect(sendActionEventSpy).toHaveBeenNthCalledWith(
          1,
          'updateParticipants',
          'SUCCESS',
          {
            participants: 1,
          },
        );
        expect(sendActionEventSpy).toHaveBeenNthCalledWith(
          2,
          'updateParticipants',
          'SUCCESS',
          {
            participants: 2,
          },
        );
      });
    });
  });

  describe('Emit errors to consumers', () => {
    it('should emit failed_to_save dynamo errors to consumer', (done) => {
      const testProviderConfigWithAnalytics = {
        url: `http://provider-url:66661`,
        documentAri: 'ari:cloud:confluence:ABC:page/testpage',
      };
      const provider = createSocketIOCollabProvider(
        testProviderConfigWithAnalytics,
      );
      provider.on('error', (error) => {
        expect(error).toEqual({
          code: 'FAIL_TO_SAVE',
          message: 'Collab service is not able to save changes',
          recoverable: false,
          status: 500,
        });
        done();
      });
      const failedOnDynamo: InternalError = {
        data: {
          status: 500,
          meta: 'No value returned from metadata while updating',
          code: NCS_ERROR_CODE.DYNAMO_ERROR,
        },
        message: 'Error while updating metadata',
      };
      provider.initialize(() => editorState);
      channel.emit('error', failedOnDynamo);
    });

    it('should emit no permission errors to consumer', (done) => {
      const testProviderConfigWithAnalytics = {
        url: `http://provider-url:66661`,
        documentAri: 'ari:cloud:confluence:ABC:page/testpage',
      };
      const provider = createSocketIOCollabProvider(
        testProviderConfigWithAnalytics,
      );
      provider.on('error', (error) => {
        expect(error).toEqual({
          code: 'NO_PERMISSION_ERROR',
          message:
            'User does not have permissions to access this document or document is not found',
          recoverable: true,
          status: 403,
        });
        done();
      });
      const noPermissionError: InternalError = {
        data: {
          status: 403,
          code: NCS_ERROR_CODE.INSUFFICIENT_EDITING_PERMISSION,
          meta: {
            description:
              'The user does not have permission for collaborative editing of this resource or the resource was deleted',
          },
        },
        message: 'No permission!',
      };
      provider.initialize(() => editorState);
      channel.emit('error', noPermissionError);
    });

    it('should emit catchup failed errors to consumer', (done) => {
      const testProviderConfigWithAnalytics = {
        url: `http://provider-url:66661`,
        documentAri: 'ari:cloud:confluence:ABC:page/testpage',
      };
      const provider = createSocketIOCollabProvider(
        testProviderConfigWithAnalytics,
      );
      provider.on('error', (error) => {
        expect(error).toEqual({
          code: 'INTERNAL_SERVICE_ERROR',
          message: 'Collab Provider experienced an unrecoverable error',
          reason: 'CATCHUP_FAILED',
          recoverable: true,
          status: 500,
        });
        done();
      });
      const catchupError: InternalError = {
        data: {
          status: 500,
          code: INTERNAL_ERROR_CODE.CATCHUP_FAILED,
        },
        message: 'Cannot fetch catchup from collab service',
      };
      provider.initialize(() => editorState);
      channel.emit('error', catchupError);
    });

    it('should emit 404 errors to consumer', (done) => {
      const testProviderConfigWithAnalytics = {
        url: `http://provider-url:66661`,
        documentAri: 'ari:cloud:confluence:ABC:page/testpage',
      };
      const provider = createSocketIOCollabProvider(
        testProviderConfigWithAnalytics,
      );
      provider.on('error', (error) => {
        expect(error).toEqual({
          code: 'DOCUMENT_NOT_FOUND',
          message: 'The requested document is not found',
          recoverable: true,
          status: 404,
        });
        done();
      });
      provider.initialize(() => editorState);
      channel.emit('error', {
        data: {
          code: 'DOCUMENT_NOT_FOUND',
        },
      });
    });
  });

  describe('catch-up', () => {
    let sendActionEventSpy: jest.SpyInstance;
    const stepRejectedError: InternalError = {
      data: {
        code: NCS_ERROR_CODE.HEAD_VERSION_UPDATE_FAILED,
        meta: {
          currentVersion: 3,
          incomingVersion: 4,
        },
        status: 409,
      },
      message: 'Version number does not match current head version.',
    };

    beforeEach(() => {
      sendActionEventSpy = jest.spyOn(
        AnalyticsHelper.prototype,
        'sendActionEvent',
      );
    });

    it('should be triggered when reconnecting after being disconnected for more than 3s', async () => {
      const provider = createSocketIOCollabProvider(testProviderConfig);
      const throttledCatchupSpy = jest.spyOn(
        // @ts-ignore
        provider.documentService as any,
        'throttledCatchup',
      );
      provider.initialize(() => editorState);

      jest.spyOn(Date, 'now').mockReturnValueOnce(Date.now() - 3 * 1000); // Time travel 3s to the past
      channel.emit('disconnect', {
        reason:
          'Testing - Faking that we got disconnected 3s ago, HAHAHA, take that code',
      });

      channel.emit('connected', {
        sid: 'pweq3Q7NOPY4y88QAGyr',
        initialized: true,
      });

      expect(throttledCatchupSpy).toHaveBeenCalledTimes(1);
      expect(throttledCatchupSpy).toHaveBeenCalledWith();
    });

    it('should be triggered when initial draft is present and is reconnecting after being disconnected for more than 3s', async () => {
      // ensure that if initial draft exists, any reconnections do not attempt to re-update document/metadata with initial draft
      const testProviderConfigWithDraft = {
        initialDraft: {
          document: 'test-document' as any,
          version: 1,
          metadata: { title: 'random-title' },
        },
        ...testProviderConfig,
      };
      const provider = createSocketIOCollabProvider(
        testProviderConfigWithDraft,
      );
      const throttledCatchupSpy = jest.spyOn(
        // @ts-ignore
        provider.documentService as any,
        'throttledCatchup',
      );
      const updateDocumentSpy = jest.spyOn(
        //@ts-ignore
        provider.documentService as any,
        'updateDocument',
      );
      provider.initialize(() => editorState);

      jest.spyOn(Date, 'now').mockReturnValueOnce(Date.now() - 3 * 1000); // Time travel 3s to the past
      channel.emit('disconnect', {
        reason:
          'Testing - Faking that we got disconnected 3s ago, HAHAHA, take that code',
      });

      channel.emit('connected', {
        sid: 'pweq3Q7NOPY4y88QAGyr',
        initialized: true,
      });

      expect(updateDocumentSpy).toHaveBeenCalledTimes(1);
      expect(updateDocumentSpy).toHaveBeenCalledWith({
        doc: 'test-document',
        metadata: { title: 'random-title' },
        version: 1,
      });
      expect(throttledCatchupSpy).toHaveBeenCalledTimes(1);
      expect(throttledCatchupSpy).toHaveBeenCalledWith();
    });

    it('should be triggered when confirmed steps from other participants were received from NCS that are further in the future than the local steps (aka some changes got lost before reaching us)', async () => {
      const provider = createSocketIOCollabProvider(testProviderConfig);
      const throttledCatchupSpy = jest.spyOn(
        // @ts-ignore
        provider.documentService as any,
        'throttledCatchup',
      );
      provider.initialize(() => editorState);

      channel.emit('steps:added', {
        version: 9999, // High version, indicated we didn't get a ton of steps, expected version is 1
        steps: [
          {
            stepType: 'replace',
            from: 1479,
            to: 1479,
            slice: { content: [{ type: 'text', text: 'lol' }] },
            clientId: 666950124,
            userId: '70121:8fce2c13-5f60-40be-a9f2-956c6f041fbe',
            createdAt: 1679027507189,
          },
        ],
      });

      expect(throttledCatchupSpy).toHaveBeenCalledTimes(1);
      expect(throttledCatchupSpy).toHaveBeenCalledWith();
    });

    it('should be triggered after 15 rejected steps and reset the rejected steps counter', async () => {
      const provider = createSocketIOCollabProvider(testProviderConfig);
      const throttledCatchupSpy = jest.spyOn(
        // @ts-ignore
        provider.documentService as any,
        'throttledCatchup',
      );

      provider.initialize(() => editorState);
      for (let i = 1; i <= MAX_STEP_REJECTED_ERROR; i++) {
        channel.emit('error', stepRejectedError);
      }

      expect(throttledCatchupSpy).toHaveBeenCalledTimes(1);
      expect(catchup).toHaveBeenCalledTimes(1);
      expect(catchup).toHaveBeenCalledWith({
        applyLocalSteps: expect.any(Function),
        fetchCatchup: expect.any(Function),
        filterQueue: expect.any(Function),
        getCurrentPmVersion: expect.any(Function),
        getUnconfirmedSteps: expect.any(Function),
        updateDocument: expect.any(Function),
        updateMetadata: expect.any(Function),
        analyticsHelper: expect.any(Object),
        clientId: 'some-random-prosemirror-client-Id',
      });

      await new Promise(process.nextTick);

      for (let i = 1; i <= MAX_STEP_REJECTED_ERROR; i++) {
        channel.emit('error', stepRejectedError);
      }

      expect(throttledCatchupSpy).toHaveBeenCalledTimes(2);
      expect(catchup).toHaveBeenCalledTimes(2);
      expect(catchup).toHaveBeenNthCalledWith(2, {
        applyLocalSteps: expect.any(Function),
        fetchCatchup: expect.any(Function),
        filterQueue: expect.any(Function),
        getCurrentPmVersion: expect.any(Function),
        getUnconfirmedSteps: expect.any(Function),
        updateDocument: expect.any(Function),
        updateMetadata: expect.any(Function),
        analyticsHelper: expect.any(Object),
        clientId: 'some-random-prosemirror-client-Id',
      });
    });

    it('should reset the rejected step counter when catchup throws an error', async () => {
      const catchupMock = (catchup as jest.Mock).mockImplementation(() => {
        throw new Error('catchup error');
      });

      const provider = createSocketIOCollabProvider(testProviderConfig);

      const throttledCatchupSpy = jest.spyOn(
        // @ts-ignore
        provider.documentService as any,
        'throttledCatchup',
      );

      provider.initialize(() => editorState);
      for (let i = 1; i <= MAX_STEP_REJECTED_ERROR; i++) {
        channel.emit('error', stepRejectedError);
      }

      expect(throttledCatchupSpy).toHaveBeenCalledTimes(1);
      expect(catchup).toHaveBeenCalledTimes(1);
      expect(sendActionEventSpy).toHaveBeenCalledTimes(17);
      expect(sendActionEventSpy).toHaveBeenNthCalledWith(
        17,
        'catchup',
        'FAILURE',
        {
          latency: 0,
        },
      );
      channel.emit('error', stepRejectedError);

      expect(sendActionEventSpy).toHaveBeenCalledTimes(18);
      expect(throttledCatchupSpy).toHaveBeenCalledTimes(1);
      expect(catchupMock).toHaveBeenCalledTimes(1);
    });
  });

  it('Does not throw errors when attempting to commit steps', () => {
    expect(() => {
      commitStepQueue({
        // @ts-ignore
        channel: {
          broadcast: jest.fn().mockImplementation(() => {
            throw new Error('Test');
          }),
        },
        steps: [],
        emit: jest.fn(),
      });
    }).not.toThrow();
  });

  describe('gracefully fails when Presence features throw', () => {
    let sendErrorEventSpy: jest.SpyInstance;
    let provider: Provider;
    const fakeError = new Error('Kaboooooom!');

    beforeEach(() => {
      sendErrorEventSpy = jest.spyOn(
        AnalyticsHelper.prototype,
        'sendErrorEvent',
      );
      provider = createSocketIOCollabProvider(testProviderConfig);
    });

    it('when the consumer sends a telepointer message', () => {
      jest
        .spyOn(Telepointer, 'telepointerCallback')
        .mockImplementationOnce(() => {
          throw fakeError;
        });
      provider.sendMessage({
        type: 'telepointer',
        selection: { type: 'textSelection', anchor: 693, head: 693 },
        sessionId: 'cAA0xTLkAZj-r79VBzG0',
      });

      expect(sendErrorEventSpy).toHaveBeenCalledTimes(1);
      expect(sendErrorEventSpy).toHaveBeenCalledWith(
        fakeError,
        'Error while sending message - telepointer',
      );
    });
  });

  describe('API', () => {
    let sendActionEventSpy: jest.SpyInstance;
    let sendErrorEventSpy: jest.SpyInstance;
    let provider: Provider;

    beforeEach(() => {
      // Jest spies
      sendActionEventSpy = jest.spyOn(
        AnalyticsHelper.prototype,
        'sendActionEvent',
      );
      sendErrorEventSpy = jest.spyOn(
        AnalyticsHelper.prototype,
        'sendErrorEvent',
      );

      // Initialize provider
      provider = createSocketIOCollabProvider(testProviderConfig);
      provider.initialize(() => editorState);
      provider.setTitle("What's in a good title?");
    });

    describe('get current state with converted ADF document (getCurrentState)', () => {
      it('should resolve to the current editor state for a valid ADF document', async () => {
        const currentState = await provider.getCurrentState();

        expect(currentState).toEqual({
          content: {
            content: [
              {
                content: [
                  {
                    text: 'Hello, World!',
                    type: 'text',
                  },
                  {
                    marks: [],
                    text: '/',
                    type: 'text',
                  },
                ],
                type: 'paragraph',
              },
            ],
            type: 'doc',
            version: 1,
          },
          stepVersion: 0,
          title: "What's in a good title?",
        });
        expect(sendActionEventSpy).toHaveBeenCalledTimes(1);
        expect(sendActionEventSpy).toHaveBeenCalledWith(
          'getCurrentState',
          'SUCCESS',
          { latency: undefined }, // Performance API undefined when running jest tests
        );
        expect(sendErrorEventSpy).not.toHaveBeenCalled();
      });

      it('should reject if document conversion to ADF fails', async () => {
        expect.assertions(5);
        provider.initialize(() => ({
          ...editorState,
          doc: 'something invalid',
        }));

        try {
          await provider.getCurrentState();
        } catch (error) {
          const adfConverterError = new TypeError(
            "Cannot read properties of undefined (reading 'forEach')",
          );

          expect(error).toEqual(adfConverterError);
          expect(sendErrorEventSpy).toHaveBeenCalledTimes(2);
          expect(sendErrorEventSpy).toHaveBeenCalledWith(
            adfConverterError,
            'Error while returning ADF version of current draft document',
          );
          expect(sendActionEventSpy).toHaveBeenCalledTimes(1);
          expect(sendActionEventSpy).toHaveBeenCalledWith(
            'getCurrentState',
            'FAILURE',
            { latency: undefined }, // Performance API undefined when running jest tests
          );
        }
      });

      it('should reject if the prosemirror-collab plugin fails to retrieve the current version', async () => {
        expect.assertions(5);
        const fakeProseMirrorCollabError = new Error(
          "Cannot read property 'version' of undefined",
        );
        jest
          .spyOn(ProseMirrorCollab, 'getVersion')
          .mockImplementationOnce(() => {
            throw fakeProseMirrorCollabError;
          });

        try {
          await provider.getCurrentState();
        } catch (error) {
          expect(error).toEqual(fakeProseMirrorCollabError);
          expect(sendErrorEventSpy).toHaveBeenCalledTimes(2);
          expect(sendErrorEventSpy).toHaveBeenCalledWith(
            fakeProseMirrorCollabError,
            'Error while returning ADF version of current draft document',
          );
          expect(sendActionEventSpy).toHaveBeenCalledTimes(1);
          expect(sendActionEventSpy).toHaveBeenCalledWith(
            'getCurrentState',
            'FAILURE',
            { latency: undefined }, // Performance API undefined when running jest tests
          );
        }
      });

      it('should return the title if set', async () => {
        channel.emit('metadata:changed', {
          title: "What's in a better title?",
        });

        const currentState = await provider.getCurrentState();
        expect(currentState.title).toEqual("What's in a better title?");
        expect(sendActionEventSpy).toHaveBeenCalledTimes(1);
        expect(sendActionEventSpy).toHaveBeenCalledWith(
          'getCurrentState',
          'SUCCESS',
          { latency: undefined }, // Performance API undefined when running jest tests
        );
        expect(sendErrorEventSpy).not.toHaveBeenCalled();
      });
    });

    describe('get final acknowledged state with converted ADF document (getFinalAcknowledgedState)', () => {
      it('should resolve to the final editor state', async () => {
        const finalAcknowledgedState =
          await provider.getFinalAcknowledgedState();

        expect(finalAcknowledgedState).toEqual({
          title: "What's in a good title?",
          stepVersion: 0,
          content: {
            content: [
              {
                content: [
                  {
                    type: 'text',
                    text: 'Hello, World!',
                  },
                  {
                    type: 'text',
                    text: '/',
                    marks: [],
                  },
                ],
                type: 'paragraph',
              },
            ],
            type: 'doc',
            version: 1,
          },
        });
        expect(sendActionEventSpy).toHaveBeenCalledTimes(2);
        expect(sendActionEventSpy).toHaveBeenNthCalledWith(
          1,
          'getCurrentState',
          'SUCCESS',
          { latency: undefined }, // Performance API undefined when running jest tests
        );
        expect(sendActionEventSpy).toHaveBeenNthCalledWith(
          2,
          'publishPage',
          'SUCCESS',
          { latency: undefined }, // Performance API undefined when running jest tests
        );
        expect(sendErrorEventSpy).not.toHaveBeenCalled();
      });

      it('final acknowledge state should include latest updated metadata', async () => {
        const verifyMetadataTitle = async (title: string) => {
          const ackState = await provider.getFinalAcknowledgedState();
          expect(ackState).toEqual(
            expect.objectContaining({
              title,
            }),
          );
        };

        const provider = createSocketIOCollabProvider(testProviderConfig);
        provider.initialize(() => editorState);

        channel.emit('init', {
          doc: 'document-content',
          version: 1,
          metadata: {
            title: 'original-title',
          },
        });
        await nextTick();
        await verifyMetadataTitle('original-title');

        channel.emit('metadata:changed', {
          title: 'new-title',
        });
        await nextTick();
        await verifyMetadataTitle('new-title');
      });

      it('should not log UGC when logging an error', async () => {
        expect.assertions(10);
        const invalidDocument = {
          type: 'doc',
          content: [
            {
              type: 'some-invalid-type',
              textContent: 'Super secret UGC',
            },
          ],
        };
        provider.initialize(() => ({
          ...editorState,
          doc: invalidDocument,
        }));

        try {
          await provider.getFinalAcknowledgedState();
        } catch (error) {
          expect(error).toEqual(
            new TypeError(
              "Cannot read properties of undefined (reading 'forEach')",
            ),
          );

          expect(sendActionEventSpy).toHaveBeenCalledTimes(3);
          expect(sendActionEventSpy).toHaveBeenNthCalledWith(
            1,
            'getCurrentState',
            'FAILURE',
            { latency: undefined }, // Performance API undefined when running jest tests
          );
          expect(sendActionEventSpy).toHaveBeenNthCalledWith(
            2,
            'getCurrentState',
            'FAILURE',
            { latency: undefined }, // Performance API undefined when running jest tests
          );
          expect(sendActionEventSpy).toHaveBeenNthCalledWith(
            3,
            'publishPage',
            'FAILURE',
            { latency: undefined }, // Performance API undefined when running jest tests
          );
          expect(sendErrorEventSpy).toHaveBeenCalledTimes(4);
          expect(sendErrorEventSpy).toHaveBeenNthCalledWith(
            1,
            new TypeError(
              "Cannot read properties of undefined (reading 'forEach')",
            ),
            'Error while returning ADF version of current draft document',
          );
          expect(sendErrorEventSpy).toHaveBeenNthCalledWith(
            2,
            new TypeError(
              "Cannot read properties of undefined (reading 'forEach')",
            ),
            'Error while returning ADF version of current draft document',
          );
          expect(sendErrorEventSpy).toHaveBeenNthCalledWith(
            3,
            new TypeError(
              "Cannot read properties of undefined (reading 'forEach')",
            ),
            'Error while returning ADF version of the final draft document',
          );
          expect(sendErrorEventSpy).toHaveBeenNthCalledWith(
            4,
            new TypeError(
              "Cannot read properties of undefined (reading 'forEach')",
            ),
            'Error while returning ADF version of the final draft document',
          );
        }
      });

      describe('when syncing up with server', () => {
        let sendSpy: jest.SpyInstance;
        const newState = {
          ...editorState,
          collab: {
            steps: [1],
            origins: [1],
          },
        };

        beforeEach(() => {
          sendSpy = jest
            // @ts-ignore
            .spyOn(provider.documentService as any, 'sendStepsFromCurrentState')
            .mockImplementation(() => {});

          jest.spyOn(Utilities, 'sleep').mockResolvedValue(() => undefined);
        });

        it('should return if it can sync up', async () => {
          const mockedSteps = [{ type: 'fakeStep' }];
          jest
            // @ts-ignore
            .spyOn(provider.documentService as any, 'getUnconfirmedSteps')
            .mockImplementationOnce(() => mockedSteps)
            .mockImplementationOnce(() => []);
          jest
            .spyOn(
              // @ts-ignore
              provider.documentService as any,
              'getUnconfirmedStepsOrigins',
            )
            .mockImplementationOnce(() => [1])
            .mockImplementationOnce(() => undefined);
          provider.initialize(() => editorState);

          const finalAck = await provider.getFinalAcknowledgedState();

          expect(sendActionEventSpy).toHaveBeenCalledTimes(3);
          expect(sendActionEventSpy).toHaveBeenNthCalledWith(
            1,
            'commitUnconfirmedSteps',
            'SUCCESS',
            {
              numUnconfirmedSteps: 1,
              latency: undefined, // Performance API undefined when running jest tests
            },
          );
          expect(sendActionEventSpy).toHaveBeenNthCalledWith(
            2,
            'getCurrentState',
            'SUCCESS',
            {
              latency: undefined, // Performance API undefined when running jest tests
            },
          );
          expect(sendActionEventSpy).toHaveBeenNthCalledWith(
            3,
            'publishPage',
            'SUCCESS',
            {
              latency: undefined, // Performance API undefined when running jest tests
            },
          );
          expect(finalAck).toEqual({
            stepVersion: 0,
            title: "What's in a good title?",
            content: {
              content: [
                {
                  content: [
                    {
                      type: 'text',
                      text: 'Hello, World!',
                    },
                    {
                      type: 'text',
                      text: '/',
                      marks: [],
                    },
                  ],
                  type: 'paragraph',
                },
              ],
              type: 'doc',
              version: 1,
            },
          });
        });

        describe("if can't sync up", () => {
          it('should call reconcile ', async () => {
            provider.initialize(() => newState);
            jest
              // @ts-ignore
              .spyOn(provider.documentService as any, 'fetchReconcile')
              .mockImplementationOnce(() => {
                return {
                  document: JSON.stringify(editorState.doc),
                  version: 2,
                };
              });

            await provider.getFinalAcknowledgedState();
            expect(sendActionEventSpy).toHaveBeenCalledTimes(3);
            expect(sendActionEventSpy).toHaveBeenNthCalledWith(
              1,
              'commitUnconfirmedSteps',
              'FAILURE',
              {
                numUnconfirmedSteps: 1,
                latency: undefined, // Performance API undefined when running jest tests
              },
            );
            expect(sendActionEventSpy).toHaveBeenNthCalledWith(
              2,
              'getCurrentState',
              'SUCCESS',
              {
                latency: undefined, // Performance API undefined when running jest tests
              },
            );
            expect(sendActionEventSpy).toHaveBeenNthCalledWith(
              3,
              'publishPage',
              'SUCCESS',
              {
                latency: undefined, // Performance API undefined when running jest tests
              },
            );
            expect(sendSpy).toHaveBeenCalledTimes(ACK_MAX_TRY + 1);
          });

          it('should call onSyncUpError if reconcile fails', async () => {
            const onSyncUpErrorMock = jest.fn();
            jest
              // @ts-ignore
              .spyOn(provider.documentService as any, 'fetchReconcile')
              .mockImplementationOnce(() => {
                throw new Error();
              });

            provider.setup({
              getState: () => newState,
              onSyncUpError: onSyncUpErrorMock,
            });

            await expect(
              provider.getFinalAcknowledgedState(),
            ).rejects.toThrow(); // Trigger error from function

            expect(onSyncUpErrorMock).toHaveBeenCalledTimes(1);
            expect(onSyncUpErrorMock).toHaveBeenCalledWith({
              clientId: 'some-random-prosemirror-client-Id',
              lengthOfUnconfirmedSteps: 1,
              maxRetries: 60,
              tries: 61,
              version: undefined,
            });
          });
        });
      });
    });

    describe('Get the unconfirmed steps', () => {
      it('returns current unconfirmed steps', () => {
        provider.initialize(() => editorState);
        let documentServiceGetUnconfirmedStepsSpy = jest.spyOn(
          (provider as any).documentService,
          'getUnconfirmedSteps',
        );
        expect(provider.getUnconfirmedSteps()).toEqual([]);
        expect(documentServiceGetUnconfirmedStepsSpy).toBeCalledTimes(1);
      });
    });

    describe('metadata', () => {
      it('Can set and get latest metadata', () => {
        const setMetadataSpy = jest.spyOn(
          (provider as any).metadataService,
          'setMetadata',
        );
        const sampleMetadata = { title: 'hello', editorWidth: '300' };
        provider.setMetadata(sampleMetadata);
        expect(provider.getMetadata()).toEqual(sampleMetadata);
        expect(setMetadataSpy).toBeCalledWith(sampleMetadata);
      });
    });
  });

  describe('View Permission Only', () => {
    it('Should block view only steps metadata', () => {
      const provider = createSocketIOCollabProvider({
        ...testProviderConfig,
        featureFlags: {
          blockViewOnly: true,
        },
      });
      const setMetadataSpy = jest.spyOn(
        (provider as any).metadataService,
        'setMetadata',
      );
      const getIsNamespaceLockedSpy = jest.spyOn(
        (provider as any).namespaceService,
        'getIsNamespaceLocked',
      );
      provider.initialize(() => editorState);
      const permissionResponse: UserPermitType = {
        isPermittedToView: true,
        isPermittedToComment: true,
        isPermittedToEdit: false,
      };
      provider.on('permission', (permissions) => {
        expect(permissions).toStrictEqual({
          isPermittedToView: true,
          isPermittedToEdit: false,
          isPermittedToComment: true,
        });
      });
      channel.emit('permission', permissionResponse);
      provider.send(null, null, {} as any);
      provider.setMetadata({});
      provider.setTitle('title');
      expect(setMetadataSpy).toBeCalledTimes(0);
      expect(getIsNamespaceLockedSpy).toBeCalledTimes(0);
    });
  });
});
