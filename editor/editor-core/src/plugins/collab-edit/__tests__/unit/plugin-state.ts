import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import type { DocBuilder } from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, p } from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { LightEditorPlugin } from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  createProsemirrorEditorFactory,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';

import type { CollabSendableSelection } from '@atlaskit/editor-common/collab';
import collabEditPlugin, { pluginKey } from '../../index';
import { createMockCollabEditProvider } from '@atlaskit/synchrony-test-helpers';
import { TextSelection } from '@atlaskit/editor-prosemirror/state';
import { featureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';

const findTelepointerBySessionId = (
  editorView: EditorView,
  sessionId: string,
) => {
  const decorationList = pluginKey
    .getState(editorView.state)
    ?.decorations.find();

  return decorationList?.find(
    (deco: any) => deco.type.spec.key === `telepointer-${sessionId}`,
  );
};

const setPresence = (editorView: EditorView, sessionId: string) => {
  editorView.dispatch(
    editorView.state.tr.setMeta('presence', {
      left: [],
      joined: [
        {
          sessionId,
          lastActive: Date.now(),
          avatar: 'avatar.png',
          name: 'Bob',
        },
      ],
    }),
  );
};

const setTelePointerData = (
  editorView: EditorView,
  sessionId: string,
  selection: CollabSendableSelection = {
    type: 'textSelection',
    anchor: 0,
    head: 0,
  },
) => {
  editorView.dispatch(
    editorView.state.tr.setMeta('telepointer', {
      type: 'telepointer',
      selection,
      sessionId,
    }),
  );
};

const setTextSelection = (
  editorView: EditorView,
  anchor: number,
  head: number,
) => {
  editorView.state.apply(
    editorView.state.tr.setSelection(
      new TextSelection(
        editorView.state.doc.resolve(anchor),
        editorView.state.doc.resolve(head),
      ),
    ),
  );
};

describe('collab-edit: plugin-state', () => {
  const collabProvider = createMockCollabEditProvider();
  const createEditor = createProsemirrorEditorFactory();

  const collabPreset = new Preset<LightEditorPlugin>()
    .add([featureFlagsPlugin, {}])
    .add([
      collabEditPlugin,
      {
        provider: collabProvider,
      },
    ]);

  it('decorationSet should be updated correctly', () => {
    const document = doc(p('th{<>}is is a document'));
    const editor = (document: DocBuilder) =>
      createEditor({
        doc: document,
        preset: collabPreset,
      });

    const { editorView } = editor(document);

    editorView.dispatch(editorView.state.tr.setMeta('collabInitialised', true));

    setPresence(editorView, 'fakeId');

    setTelePointerData(editorView, 'fakeId', {
      type: 'textSelection',
      anchor: 1,
      head: 2,
    });

    const telepointerDeco = findTelepointerBySessionId(editorView, 'fakeId');
    const addSpy = jest.spyOn(
      (telepointerDeco as any).type.toDOM.classList,
      'add',
    );
    const removeSpy = jest.spyOn(
      (telepointerDeco as any).type.toDOM.classList,
      'remove',
    );

    // multiple transactions will not trigger multiple add/remove class
    setTextSelection(editorView, 2, 2);
    setTextSelection(editorView, 2, 2);
    expect(addSpy).toHaveBeenCalledTimes(1);

    setTextSelection(editorView, 3, 3);
    setTextSelection(editorView, 3, 3);
    expect(removeSpy).toHaveBeenCalledTimes(1);
  });
});
