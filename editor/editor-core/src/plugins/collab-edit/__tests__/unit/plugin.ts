import type { CollabEditProvider } from '@atlaskit/collab-provider';
import { doc, p, DocBuilder } from '@atlaskit/editor-test-helpers/doc-builder';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { nextTick } from '@atlaskit/editor-test-helpers/next-tick';
import {
  createProsemirrorEditorFactory,
  LightEditorPlugin,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// Editor plugins
import collabEditPlugin from '../../';
import createAnalyticsEventMock from '@atlaskit/editor-test-helpers/create-analytics-event-mock';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '../../../analytics';
import { EditorView } from 'prosemirror-view';
import featureFlagsPlugin from '@atlaskit/editor-plugin-feature-flags';
import { EditorState } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';

describe('collab-edit: plugin', () => {
  const createEditor = createProsemirrorEditorFactory();
  let fireMock: jest.Mock = jest.fn();
  const editor = (doc: DocBuilder, providerFactory?: any) => {
    fireMock = createAnalyticsEventMock();
    return createEditor({
      doc,
      preset: new Preset<LightEditorPlugin>()
        .add([featureFlagsPlugin, {}])
        .add([
          collabEditPlugin,
          {
            useNativePlugin: true,
            createAnalyticsEvent: fireMock,
          },
        ]),
      providerFactory,
    });
  };

  const providerMock = {
    send: jest.fn(),
    on() {
      return this;
    },
    off() {
      return this;
    },
    initialize() {
      return this;
    },
    unsubscribeAll() {
      return this;
    },
    sendMessage() {},
    setup: jest.fn(),
  };

  const collabEditProviderPromise = Promise.resolve(
    providerMock as unknown as CollabEditProvider,
  );
  let providerFactory: ProviderFactory;
  let editorView: EditorView;
  beforeEach(() => {
    providerMock.send.mockClear();
    providerMock.setup.mockClear();
    providerFactory = ProviderFactory.create({
      collabEditProvider: collabEditProviderPromise,
    });
    editorView = editor(doc(p('')), providerFactory).editorView;
  });

  it('should not be sending transactions through collab provider before it is ready', async () => {
    editorView.dispatch(editorView.state.tr.insertText('123'));
    await collabEditProviderPromise;
    await nextTick();
    expect(providerMock.send).not.toBeCalled();
  });

  it('should be sending transactions through collab provider when it is ready', async () => {
    editorView.dispatch(
      editorView.state.tr.scrollIntoView().setMeta('collabInitialised', true),
    );
    editorView.dispatch(editorView.state.tr.insertText('123'));
    await collabEditProviderPromise;
    await nextTick();
    expect(providerMock.send).toBeCalled();
  });

  it('should call send function for EditorState apply', async () => {
    const tr = editorView.state.tr
      .insertText('123')
      .setMeta('collabInitialised', true);

    editorView.state.apply(tr);
    await collabEditProviderPromise;
    await nextTick();

    expect(providerMock.send).toHaveBeenCalledTimes(0);
  });

  it('should call setup', async () => {
    await collabEditProviderPromise;
    await nextTick();
    expect(providerMock.setup).toHaveBeenCalled();
  });
  it('should fire analytics payload when onSyncUpError is called', async () => {
    await collabEditProviderPromise;
    await nextTick();
    const { onSyncUpError } = providerMock.setup.mock.calls[0][0];
    const mockAttributes = {
      lengthOfUnconfirmedSteps: 1,
    };
    onSyncUpError(mockAttributes);
    expect(fireMock).toHaveBeenCalledWith({
      action: ACTION.NEW_COLLAB_SYNC_UP_ERROR_NO_STEPS,
      actionSubject: ACTION_SUBJECT.EDITOR,
      eventType: EVENT_TYPE.OPERATIONAL,
      attributes: mockAttributes,
    });
  });

  it('should re-subscribe to provider factory after editor state reconfiguration', () => {
    const dispatch = jest.fn();
    const providerFactory = new ProviderFactory();
    const props = {
      dispatch,
      providerFactory,
    } as any;
    const subsSpy = jest.spyOn(providerFactory, 'subscribe');
    const unsubSpy = jest.spyOn(providerFactory, 'unsubscribeAll');

    let editorPlugin = collabEditPlugin({});
    let collabFactoryPlugin = editorPlugin.pmPlugins!()[0];
    let plugin = collabFactoryPlugin.plugin(props)!;

    const schema = new Schema({
      nodes: {
        doc: { content: 'paragraph+' },
        paragraph: {
          content: 'text*',
          toDOM: () => ['p', 0],
        },
        text: {},
      },
    });

    const editorState = EditorState.create({
      plugins: [plugin],
      schema,
    });

    const editorView = new EditorView(document.createElement('div'), {
      state: editorState,
    });

    editorPlugin = collabEditPlugin({});
    collabFactoryPlugin = editorPlugin.pmPlugins!()[0];
    plugin = collabFactoryPlugin.plugin(props)!;

    const newEditorState = EditorState.create({
      plugins: [plugin],
      schema,
    });

    editorView.updateState(newEditorState);

    expect(unsubSpy).toHaveBeenCalledTimes(1);
    expect(subsSpy).toHaveBeenCalledTimes(2);
    expect(subsSpy.mock.invocationCallOrder.at(-1)).toBeGreaterThan(
      unsubSpy.mock.invocationCallOrder.at(-1)!,
    );
  });
});
