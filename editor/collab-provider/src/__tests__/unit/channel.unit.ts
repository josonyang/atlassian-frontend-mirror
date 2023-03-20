import '../jest_mocks/socket.io-client.mock';

jest.mock('@atlaskit/util-service-support', () => {
  return {
    utils: {
      requestService: jest.fn(),
    },
  };
});

import { utils } from '@atlaskit/util-service-support';
import { Channel } from '../../channel';
import {
  Config,
  ErrorPayload,
  InitPayload,
  Metadata,
  PresencePayload,
  StepsPayload,
  ProductInformation,
  NamespaceStatus,
} from '../../types';
import * as Performance from '../../analytics/performance';
import type { CollabSendableSelection } from '@atlaskit/editor-common/collab';
import { createSocketIOSocket } from '../../socket-io-provider';
import { io, Socket } from 'socket.io-client';
import AnalyticsHelper from '../../analytics';
import { getProduct, getSubProduct } from '../../helpers/utils';
import type { AnalyticsWebClient } from '@atlaskit/analytics-listeners';
import Network from '../../connectivity/network';

const expectValidChannel = (channel: Channel): void => {
  expect(channel).toBeDefined();
  expect(channel.getSocket()).toBe(null);
  channel.connect();
  expect(channel.getSocket()).toBeDefined();
  const eventHandler = (channel.getSocket() as any).events.get('connect');
  expect(eventHandler).toBeDefined();
};

const allExpectedEventNames: string[] = [
  'connect',
  'data',
  'steps:added',
  'participant:telepointer',
  'presence:joined',
  'participant:left',
  'participant:updated',
  'metadata:changed',
  'disconnect',
  'error',
  'status',
];

let fakeAnalyticsWebClient: AnalyticsWebClient = {
  sendOperationalEvent: jest.fn(),
  sendScreenEvent: jest.fn(),
  sendTrackEvent: jest.fn(),
  sendUIEvent: jest.fn(),
};

const fakeDocumentAri =
  'ari:cloud:confluence:a436116f-02ce-4520-8fbb-7301462a1674:page/1731046230';
const testChannelConfig: Config = {
  url: 'https://localhost/ccollab',
  documentAri: fakeDocumentAri,
  createSocket: createSocketIOSocket,
  analyticsClient: fakeAnalyticsWebClient,
};

const getChannel = (config: Config = testChannelConfig): Channel => {
  const analyticsHelper = new AnalyticsHelper(
    config.documentAri,
    config.analyticsClient,
  );
  const channel = new Channel(config, analyticsHelper);
  expectValidChannel(channel);
  return channel;
};

const getExpectValidEventHandler =
  (channel: Channel) =>
  (expectedEventName: string): void => {
    const eventHandler = (channel.getSocket() as any).events.get(
      expectedEventName,
    );

    // Try/catch here to print the expectedEventName with reason in
    // the error, otherwise when tests fail, it is hard to know why
    try {
      expect(eventHandler).toBeDefined();
      expect(eventHandler).toBeInstanceOf(Function);
    } catch (err) {
      throw new Error(
        `${expectedEventName} is not a valid EventHandler: ${err}`,
      );
    }
  };

describe('Channel unit tests', () => {
  beforeEach(() => {
    testChannelConfig.analyticsClient = {
      sendOperationalEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendUIEvent: jest.fn(),
    };
  });

  afterEach(jest.clearAllMocks);

  it('should register eventHandlers as expected', () => {
    const channel = getChannel();
    const expectValidEventHandler = getExpectValidEventHandler(channel);

    allExpectedEventNames.forEach(expectValidEventHandler);
  });

  it('should return analytics upon successful initial document load', (done) => {
    expect.assertions(6);
    const channel = getChannel();

    const sendActionEventSpy = jest.spyOn(
      AnalyticsHelper.prototype,
      'sendActionEvent',
    );

    channel.on('init', (_data: any) => {
      done();
    });

    channel.getSocket()!.emit('data', <InitPayload & { type: 'initial' }>{
      type: 'initial',
      doc: 'ari:cloud:confluence:a436116f-02ce-4520-8fbb-7301462a1674:page/1731046230',
      version: 1234567,
      userId: '123',
      ttlEnabled: false,
      requiredPageRecovery: true,
      metadata: {
        title: 'a-title',
      },
    });
    expect(sendActionEventSpy).toHaveBeenCalledTimes(1);
    expect(sendActionEventSpy).toHaveBeenCalledWith('documentInit', 'SUCCESS', {
      latency: undefined,
      resetReason: undefined,
      ttlEnabled: false,
    });
  });

  it('should create connected channel as expected', (done) => {
    const channel = getChannel();

    channel.on('connected', (data: any) => {
      try {
        expect(data).toEqual({
          sid: channel.getSocket()!.id,
          initialized: false,
        });
        expect(channel.getConnected()).toBe(true);
        done();
      } catch (err) {
        done(err);
      }
    });

    expect(channel.getConnected()).toBe(false);
    channel.getSocket()!.emit('connect');
  });

  it('should create connected channel with "need404" flag', (done) => {
    let cbSpy: jest.SpyInstance;

    // Overriding createSocket to properly spy on auth callback's callback
    const customCreateSocket = (
      url: string,
      auth?: (cb: (data: object) => void) => void,
      productInfo?: ProductInformation,
    ): Socket => {
      const { pathname } = new URL(url);
      return io(url, {
        withCredentials: true,
        transports: ['polling', 'websocket'],
        path: `/${pathname.split('/')[1]}/socket.io`,
        auth: (cb) => {
          cbSpy = jest.fn(cb);
          auth!(cbSpy as any);
        },
        extraHeaders: {
          'x-product': getProduct(productInfo),
          'x-subproduct': getSubProduct(productInfo),
        },
      });
    };

    const channel = getChannel({
      ...testChannelConfig,
      need404: true,
      createSocket: customCreateSocket,
    });

    channel.on('connected', async (data: any) => {
      try {
        expect(data).toEqual({
          sid: channel.getSocket()!.id,
          initialized: false,
        });
        expect(channel.getConnected()).toBe(true);
        expect(cbSpy).toHaveBeenCalledTimes(1);
        expect(cbSpy).toHaveBeenCalledWith({
          initialized: false,
          need404: true,
        });
        done();
      } catch (err) {
        done(err);
      }
    });

    expect(channel.getConnected()).toBe(false);
    channel.getSocket()!.emit('connect');
  });

  it('should handle connect_error when no data in error', () => {
    // There is 5 assertions in the test, plus 4 from `getChannel` calling `expectValidChannel`
    expect.assertions(7 + 4);
    const measureStopSpy = jest
      .spyOn(Performance, 'stopMeasure')
      .mockImplementation(() => ({ duration: 69, startTime: 420 }));
    const sendActionEventSpy = jest.spyOn(
      AnalyticsHelper.prototype,
      'sendActionEvent',
    );
    const sendErrorEventSpy = jest.spyOn(
      AnalyticsHelper.prototype,
      'sendErrorEvent',
    );

    const error: Error = { name: 'kerfuffle', message: 'oh gosh oh bother' };

    const channel = getChannel();
    channel.on('error', (data: any) => {
      expect(data).toEqual({
        message: error.message,
      });
    });
    // @ts-ignore private method for test
    channel.onConnectError(error);

    expect(measureStopSpy).toHaveBeenCalledTimes(1);
    expect(measureStopSpy).toHaveBeenCalledWith(
      'socketConnect',
      expect.any(AnalyticsHelper),
    );
    expect(sendActionEventSpy).toHaveBeenCalledTimes(1);
    expect(sendActionEventSpy).toHaveBeenCalledWith('connection', 'FAILURE', {
      latency: 69,
    });
    expect(sendErrorEventSpy).toHaveBeenCalledTimes(1);
    expect(sendErrorEventSpy).toHaveBeenCalledWith(
      error,
      'Error while establishing connection',
    );
  });

  it('should connect, then disconnect channel as expected', (done) => {
    const channel = getChannel();

    channel.on('disconnect', (data: any) => {
      try {
        expect(data).toEqual({
          reason: 'User disconnect for some reason',
        });
        expect(channel.getConnected()).toBe(false);
        done();
      } catch (err) {
        done(err);
      }
    });

    channel.on('connected', (data: any) => {
      try {
        expect(data).toEqual({
          sid: channel.getSocket()!.id,
          initialized: false,
        });
        expect(channel.getConnected()).toBe(true);
        channel
          .getSocket()!
          .emit('disconnect', 'User disconnect for some reason');
      } catch (err) {
        done(err);
      }
    });

    expect(channel.getConnected()).toBe(false);
    channel.getSocket()!.emit('connect');
  });

  it('should connect and disconnect', (done) => {
    expect.assertions(9);
    const channel = getChannel();

    channel.on('connected', (data: any) => {
      expect(data).toEqual({
        sid: channel.getSocket()!.id,
        initialized: false,
      });
      expect(channel.getConnected()).toBe(true);

      // Now disconnect
      channel.getSocket()!.emit('disconnect', 'io server disconnect');
    });

    channel.on('disconnect', (data: any) => {
      expect(data).toEqual({
        reason: 'io server disconnect',
      });
      expect(channel.getConnected()).toBe(false);
      done();
    });

    expect(channel.getConnected()).toBe(false);
    channel.getSocket()!.emit('connect');
  });

  it('should emit an error if we catch an error during reconnecting', (done) => {
    expect.assertions(7);
    const channel = getChannel();
    const sendErrorEventSpy = jest.spyOn(
      AnalyticsHelper.prototype,
      'sendErrorEvent',
    );
    const connectError = new Error(
      'Have you ever been so far as decided to use even want more like',
    );

    // Now make reconnects fail, only once, so we don't mess up the global socket IO mock
    channel.getSocket()!.connect = jest.fn().mockImplementationOnce(() => {
      throw new Error(
        'Have you ever been so far as decided to use even want more like',
      );
    });

    channel.on('error', (error) => {
      expect(error).toEqual({
        data: {
          code: 'RECONNECTION_ERROR',
          status: 500,
        },
        message: 'Caught error during reconnection.',
      });
      expect(sendErrorEventSpy).toHaveBeenCalledTimes(1);
      expect(sendErrorEventSpy).toHaveBeenCalledWith(
        connectError,
        'Error while reconnecting the channel',
      );
      done();
    });

    channel.getSocket()!.emit('disconnect', 'io server disconnect');
  });

  it('should handle receiving initial data', (done) => {
    const channel = getChannel();

    channel.on('init', (data: any) => {
      try {
        expect(data).toEqual(<InitPayload>{
          doc: expect.stringMatching(/.*/),
          version: expect.any(Number),
          userId: '123',
          metadata: {
            title: 'a-title',
          },
        });
        expect(channel.getInitialized()).toBe(true);
        done();
      } catch (err) {
        done(err);
      }
    });

    expect(channel.getInitialized()).toBe(false);
    channel.getSocket()!.emit('data', <InitPayload & { type: 'initial' }>{
      type: 'initial',
      doc: '',
      version: 1234567,
      userId: '123',
      metadata: {
        title: 'a-title',
      },
    });
  });

  it('should handle receiving steps:added from server', (done) => {
    const channel = getChannel();

    channel.on('steps:added', (data: StepsPayload) => {
      try {
        expect(data).toEqual({
          steps: expect.any(Array),
          version: expect.any(Number),
        });
        done();
      } catch (err) {
        done(err);
      }
    });
    channel.getSocket()!.emit('steps:added', <StepsPayload>{
      version: 121423674845,
      steps: [],
    });
  });

  it('should handle receiving metadata:changed from server', (done) => {
    const channel = getChannel();

    channel.on('metadata:changed', (data: Metadata) => {
      try {
        expect(data).toEqual({ title: 'a new title', editorWidht: 'abc' });
        done();
      } catch (err) {
        done(err);
      }
    });
    channel
      .getSocket()!
      .emit('metadata:changed', { title: 'a new title', editorWidht: 'abc' });
  });

  it('should handle receiving participant:telepointer from server', (done) => {
    const channel = getChannel();

    channel.on('participant:telepointer', (data: any) => {
      try {
        expect(data).toEqual(<CollabSendableSelection>{
          type: 'textSelection',
          anchor: 3,
          head: 3,
        });
        done();
      } catch (err) {
        done(err);
      }
    });

    channel.getSocket()!.emit('participant:telepointer', <PresencePayload>{
      sessionId: 'abc',
      userId: 'cbfb',
      clientId: 'fbfbfb',
      timestamp: 456734573473564,
      data: {
        type: 'textSelection',
        anchor: 3,
        head: 3,
      },
    });
  });

  it('should handle step-rejected errors', (done) => {
    const channel = getChannel();
    channel.on('error', (error: ErrorPayload | string) => {
      try {
        expect(error).toEqual(<ErrorPayload>{
          code: 'HEAD_VERSION_UPDATE_FAILED',
          meta: 'The version number does not match the current head version.',
          message: 'Version number does not match current head version.',
        });
        done();
      } catch (err) {
        done(err);
      }
    });
    channel.getSocket()!.emit('error', <ErrorPayload>{
      code: 'HEAD_VERSION_UPDATE_FAILED',
      meta: 'The version number does not match the current head version.',
      message: 'Version number does not match current head version.',
    });
  });

  it('should handle receiving presence:joined from server', (done) => {
    const channel = getChannel();

    channel.on('presence:joined', (data: PresencePayload) => {
      try {
        expect(data).toEqual(<PresencePayload>{
          sessionId: 'abc',
          userId: 'cbfb',
          clientId: 'fbfbfb',
          timestamp: 456734573473564,
        });
        done();
      } catch (err) {
        done(err);
      }
    });

    channel.getSocket()!.emit('presence:joined', <PresencePayload>{
      sessionId: 'abc',
      userId: 'cbfb',
      clientId: 'fbfbfb',
      timestamp: 456734573473564,
    });
  });

  it('should handle receiving participant:left from server', (done) => {
    const channel = getChannel();

    channel.on('participant:left', (data: any) => {
      try {
        expect(data).toEqual(<PresencePayload>{
          sessionId: 'abc',
          userId: 'cbfb',
          clientId: 'fbfbfb',
          timestamp: 234562345623653,
        });
        done();
      } catch (err) {
        done(err);
      }
    });

    channel.getSocket()!.emit('participant:left', <PresencePayload>{
      sessionId: 'abc',
      userId: 'cbfb',
      clientId: 'fbfbfb',
      timestamp: 234562345623653,
    });
  });

  it('should handle receiving participant:updated from server', (done) => {
    const channel = getChannel();

    channel.on('participant:updated', (data) => {
      expect(data).toEqual({
        timestamp: 1676945569495,
        sessionId: 'cAA0xTLkAZj-r79VBzG0',
        userId: '70121:8fce2c13-5f60-40be-a9f2-956c6f041fbe',
        clientId: 2778370292,
      });
      done();
    });

    channel.getSocket()!.emit('participant:updated', {
      sessionId: 'cAA0xTLkAZj-r79VBzG0',
      timestamp: 1676945569495,
      data: {
        sessionId: 'cAA0xTLkAZj-r79VBzG0',
        userId: '70121:8fce2c13-5f60-40be-a9f2-956c6f041fbe',
        clientId: 2778370292,
      },
    });
  });

  it('should handle receiving metadata:changed from server', (done) => {
    const channel = getChannel();

    channel.on('metadata:changed', (data: any) => {
      try {
        expect(data).toEqual(<any>{
          title: 'My tremendous page title!',
        });
        done();
      } catch (err) {
        done(err);
      }
    });

    channel.getSocket()!.emit('metadata:changed', <any>{
      title: 'My tremendous page title!',
    });
  });

  it('should handle receiving width:changed from server', (done) => {
    const channel = getChannel();

    channel.on('metadata:changed', (data: any) => {
      try {
        expect(data).toEqual(<any>{
          editorWidth: 'My tremendous page width!',
        });
        done();
      } catch (err) {
        done(err);
      }
    });

    channel.getSocket()!.emit('metadata:changed', <any>{
      editorWidth: 'My tremendous page width!',
    });
  });

  it('should handle receiving restore event from server', (done) => {
    const channel = getChannel();
    (channel as any).initialized = true;
    const mockRestoreData = {
      doc: {},
      version: 1,
      userId: 'abc',
      metadata: { a: 1 },
    };

    channel.on('restore', (data: any) => {
      try {
        expect(data).toEqual(mockRestoreData);
        done();
      } catch (err) {
        done(err);
      }
    });
    channel.getSocket()!.emit('data', <any>{
      type: 'initial',
      ...mockRestoreData,
    });
  });

  it('should send x-token when making catchup call if tokenRefresh exist', async () => {
    const permissionTokenRefresh = jest
      .fn()
      .mockResolvedValue(Promise.resolve('new-token'));
    const configuration = {
      ...testChannelConfig,
      permissionTokenRefresh,
    };
    const spy = jest.spyOn(utils, 'requestService').mockResolvedValue({
      doc: 'doc',
      version: 1,
      stepMaps: 'step-map',
      metadata: 'meta',
    });

    const channel = getChannel(configuration);
    await channel.fetchCatchup(1);

    expect(permissionTokenRefresh).toBeCalledTimes(2);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), {
      path: 'document/ari%3Acloud%3Aconfluence%3Aa436116f-02ce-4520-8fbb-7301462a1674%3Apage%2F1731046230/catchup',
      queryParams: {
        version: 1,
      },
      requestInit: {
        headers: {
          'x-token': 'new-token',
          'x-product': 'unknown',
          'x-subproduct': 'unknown',
        },
      },
    });
  });

  it('should handle receiving namespace lock status event from server', (done) => {
    const channel = getChannel();

    channel.on('status', (data: NamespaceStatus) => {
      try {
        expect(data).toEqual({
          isLocked: true,
          waitTimeInMs: 10000,
          documentAri: 'mocked-documentARI',
          timestamp: 234562345623653,
        } as NamespaceStatus);
        done();
      } catch (err) {
        done(err);
      }
    });

    channel.getSocket()!.emit('status', {
      isLocked: true,
      waitTimeInMs: 10000,
      documentAri: 'mocked-documentARI',
      timestamp: 234562345623653,
    } as NamespaceStatus);
  });

  it('should handle receiving namespace unlock status event from server', (done) => {
    const channel = getChannel();

    channel.on('status', (data: NamespaceStatus) => {
      try {
        expect(data).toEqual({
          isLocked: false,
          documentAri: 'mocked-documentARI',
          timestamp: 234562345623653,
        } as NamespaceStatus);
        done();
      } catch (err) {
        done(err);
      }
    });

    channel.getSocket()!.emit('status', {
      isLocked: false,
      documentAri: 'mocked-documentARI',
      timestamp: 234562345623653,
    } as NamespaceStatus);
  });

  describe('Product information headers', () => {
    it('should pass the product information to the socket.io client', () => {
      const events = new Map<string, (...args: any) => {}>();
      const createSocketMock = jest.fn().mockImplementation(() => ({
        connect: jest.fn(),
        close: jest.fn(),
        events,
        on: jest
          .fn()
          .mockImplementation((eventName, callback) =>
            events.set(eventName, callback),
          ),
        io: { on: jest.fn() },
      }));
      getChannel({
        ...testChannelConfig,
        createSocket: createSocketMock,
        productInfo: {
          product: 'confluence',
        },
      });

      expect(createSocketMock).toHaveBeenCalledTimes(1);
      expect(createSocketMock).toHaveBeenCalledWith(
        'https://localhost/ccollab/session/ari:cloud:confluence:a436116f-02ce-4520-8fbb-7301462a1674:page/1731046230',
        expect.any(Function),
        { product: 'confluence' },
      );
    });

    it('should send the product headers along with the catch-up request', async () => {
      const spy = jest.spyOn(utils, 'requestService').mockResolvedValue({});
      const configuration = {
        ...testChannelConfig,
        productInfo: {
          product: 'embeddedConfluence',
          subProduct: 'JSM',
        },
      };
      const channel = getChannel(configuration);
      await channel.fetchCatchup(1);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expect.any(Object), {
        path: 'document/ari%3Acloud%3Aconfluence%3Aa436116f-02ce-4520-8fbb-7301462a1674%3Apage%2F1731046230/catchup',
        queryParams: {
          version: 1,
        },
        requestInit: {
          headers: {
            'x-product': 'embeddedConfluence',
            'x-subproduct': 'JSM',
          },
        },
      });
    });
  });

  it('should emit documentNotFound error when the catch-up request returns 404', (done) => {
    jest.spyOn(utils, 'requestService').mockRejectedValue({
      code: 404,
      reason: 'Page has been deleted for recovery',
    });
    const channel = getChannel();
    channel.on('error', (error) => {
      try {
        expect(error).toEqual({
          data: { status: 404, code: 'DOCUMENT_NOT_FOUND' },
          message: 'The requested document is not found',
        });
        done();
      } catch (err) {
        done(err);
      }
    });
    channel.fetchCatchup(1).then((data) => expect(data).toEqual({}));
  });

  describe('Network', () => {
    it('should emit an error if reconnection issues are detected due to network issues', (done) => {
      const sendErrorEventSpy = jest.spyOn(
        AnalyticsHelper.prototype,
        'sendErrorEvent',
      );
      const reconnectError = new Error('xhr poll error');
      const channel = getChannel();
      channel.on('error', (error) => {
        expect(error).toEqual({
          data: {
            status: 400,
            code: 'RECONNECTION_NETWORK_ISSUE',
          },
          message:
            'Reconnection failed 8 times when browser was offline, likely there was a network issue.',
        });
        expect(sendErrorEventSpy).toHaveBeenCalledTimes(1);
        expect(sendErrorEventSpy).toHaveBeenCalledWith(
          reconnectError,
          'Likely network issue while reconnecting the channel',
        );
        // Go back online
        window.dispatchEvent(new Event('online'));
        done();
      });

      // Go offline
      window.dispatchEvent(new Event('offline'));
      for (var i = 0; i < 8; i++) {
        (channel.getSocket()!.io as any).emit(
          'reconnect_error',
          reconnectError,
        );
      }
    });

    describe('Reconnection logic', () => {
      it('Should initialize the network helper on connect', () => {
        const analyticsHelper = new AnalyticsHelper(
          fakeDocumentAri,
          fakeAnalyticsWebClient,
        );
        const channel = new Channel(testChannelConfig, analyticsHelper);
        // @ts-ignore private method
        expect(channel.network).toBeNull();
        channel.connect();
        // @ts-ignore private method
        expect(channel.network).toBeInstanceOf(Network);
        // @ts-ignore private method
        expect(channel.network.onlineCallback).toEqual(channel.onOnlineHandler);
      });

      it('Should attempt to immediately reconnect when the browser online event is triggered', () => {
        const channel = getChannel();
        window.dispatchEvent(new Event('online'));
        expect(channel.getSocket()?.close).toBeCalled();
        expect(channel.getSocket()?.connect).toBeCalled();
      });

      it('Should destroy the network utility when the channel disconnects', () => {
        const channel = getChannel();
        // @ts-ignore
        const destroyMock = jest.spyOn(channel.network, 'destroy');
        // @ts-ignore
        window.dispatchEvent(new Event('online'));
        expect(channel.getSocket()?.close).toBeCalled();
        expect(channel.getSocket()?.connect).toBeCalled();
        channel.disconnect();
        // @ts-ignore
        expect(destroyMock).toBeCalled();
        // @ts-ignore
        expect(channel.network).toBeNull();
      });
    });
  });
});
