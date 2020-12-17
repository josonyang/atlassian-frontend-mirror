import { createSocketIOCollabProvider } from '../../socket-io-provider';
jest.mock('socket.io-client');
import { Channel } from '../../channel';
import {
  MAX_STEP_REJECTED_ERROR,
  CATCHUP_THROTTLE_TIMEOUT,
  CollabErrorPayload,
} from '../../provider';
jest.mock('../../channel');

const testProviderConfig = {
  url: `http://provider-url:66661`,
  documentAri: 'ari:cloud:confluence:ABC:page/testpage',
};
const clientId = 'some-random-prosmirror-client-Id';

describe('provider unit tests', () => {
  let socket: any;
  let logSpy: jest.SpyInstance;
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const channel = new Channel({} as any);
    socket = channel.getSocket()!;
    jest.useFakeTimers();
  });
  afterEach(() => {
    logSpy.mockClear();
    jest.clearAllMocks();
    jest.useRealTimers();
  });
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
  };

  it('should emit connected event when provider is connected via socketIO', async done => {
    const provider = createSocketIOCollabProvider(testProviderConfig);
    provider.on('connected', ({ sid }) => {
      expect(sid).toBe('sid-123');
      done();
    });
    provider.initialize(() => editorState);
    socket.emit('connected', { sid: 'sid-123' });
  });

  it('should emit init event and trigger sendPresence once provider is connected', async done => {
    let expectedSid: any;
    const sid = 'expected-sid-123';
    const userId = 'user-123';
    const provider = createSocketIOCollabProvider(testProviderConfig);
    const spy = jest.spyOn(provider as any, 'sendPresence');
    provider.on('connected', ({ sid }) => {
      expectedSid = sid;
    });
    provider.on('init', ({ doc, version, metadata }: any) => {
      expect(expectedSid).toBe(sid);
      expect(doc).toBe('bla');
      expect(version).toBe(1);
      expect((provider as any).userId).toBe(userId);
      expect(spy).toBeCalled();
      expect(metadata).toEqual({
        title: 'some-random-title',
      });
      done();
    });
    provider.initialize(() => editorState);
    socket.emit('connected', { sid });
    socket.emit('init', {
      doc: 'bla',
      version: 1,
      userId,
      metadata: {
        title: 'some-random-title',
      },
    });
  });

  it('should emit error and trigger catchup', () => {
    const provider = createSocketIOCollabProvider(testProviderConfig);
    const throttledCatchupSpy = jest
      .spyOn(provider as any, 'throttledCatchup')
      .mockImplementation(() => {});
    const stepRejectedError: CollabErrorPayload = {
      code: 'HEAD_VERSION_UPDATE_FAILED',
      meta: 'The version number does not match the current head version.',
      message: 'Version number does not match current head version.',
    };

    provider.initialize(() => editorState);
    for (let i = 1; i <= MAX_STEP_REJECTED_ERROR + 2; i++) {
      socket.emit('error', stepRejectedError);
    }
    expect(throttledCatchupSpy).toBeCalledTimes(3);
  });

  it('should emit error and trigger catchup in 5 seconds', () => {
    const provider = createSocketIOCollabProvider(testProviderConfig);
    const throttledCatchupSpy = jest
      .spyOn(provider as any, 'throttledCatchup')
      .mockImplementation(() => {});
    const stepRejectedError: CollabErrorPayload = {
      code: 'HEAD_VERSION_UPDATE_FAILED',
      meta: 'The version number does not match the current head version.',
      message: 'Version number does not match current head version.',
    };

    provider.initialize(() => editorState);
    for (let i = 1; i <= MAX_STEP_REJECTED_ERROR / 2; i++) {
      socket.emit('error', stepRejectedError);
    }
    expect(throttledCatchupSpy).not.toBeCalled();
    jest.advanceTimersByTime(CATCHUP_THROTTLE_TIMEOUT);
    expect(throttledCatchupSpy).toBeCalled();
    expect(throttledCatchupSpy).toBeCalledTimes(1);
  });

  it('should emit metadata during init', async done => {
    const userId = 'user-123';
    const provider = createSocketIOCollabProvider(testProviderConfig);
    provider.on('init', ({ metadata }: any) => {
      expect(metadata).toEqual({
        title: 'some-random-title',
        editorWidth: 'some-random-width',
      });
      provider.on('metadata:changed', metadata => {
        expect(metadata).toEqual({
          title: 'some-random-title',
          editorWidth: 'some-random-width',
        });
        done();
      });
    });
    provider.initialize(() => editorState);
    socket.emit('init', {
      doc: 'bla',
      version: 1,
      userId,
      metadata: {
        title: 'some-random-title',
        editorWidth: 'some-random-width',
      },
    });
  });

  it('should emit metadata when title is changed', async done => {
    const provider = createSocketIOCollabProvider(testProviderConfig);
    provider.on('metadata:changed', metadata => {
      expect(metadata).toEqual({
        title: 'some-random-title',
      });
      done();
    });
    provider.initialize(() => editorState);
    socket.emit('title:changed', {
      title: 'some-random-title',
    });
  });

  it('should emit metadata when editor width is changed', async done => {
    const provider = createSocketIOCollabProvider(testProviderConfig);
    provider.on('metadata:changed', metadata => {
      expect(metadata).toEqual({
        editorWidth: 'some-random-editor-width',
      });
      done();
    });
    provider.initialize(() => editorState);
    socket.emit('width:changed', {
      editorWidth: 'some-random-editor-width',
    });
  });
});