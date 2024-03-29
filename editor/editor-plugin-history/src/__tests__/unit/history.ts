// eslint-disable-next-line import/no-extraneous-dependencies
import type { HistoryPluginState } from '@atlaskit/editor-plugin-history';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import sendKeyToPm from '@atlaskit/editor-test-helpers/send-key-to-pm';

import { historyPluginKey } from '../../plugin-key';

describe('History Plugin', () => {
  const createEditor = createEditorFactory();
  const editor = () =>
    createEditor({
      // this plugin is only enabled for mobile currently
      editorProps: { appearance: 'mobile' },
      pluginKey: historyPluginKey,
    });
  const getPluginState = (state: EditorState): HistoryPluginState =>
    historyPluginKey.getState(state)!;
  let editorView: EditorView;

  beforeEach(() => {
    ({ editorView } = editor());
  });

  describe('canUndo', () => {
    it('should initially be false', () => {
      expect(getPluginState(editorView.state).canUndo).toBe(false);
    });

    it('should update to true when there are events to undo', () => {
      editorView.dispatch(editorView.state.tr.insertText('hello'));
      expect(getPluginState(editorView.state).canUndo).toBe(true);
    });

    it('should update to false when all events are undone', () => {
      editorView.dispatch(editorView.state.tr.insertText('hello'));
      sendKeyToPm(editorView, 'Mod-z');
      expect(getPluginState(editorView.state).canUndo).toBe(false);
    });
  });

  describe('canRedo', () => {
    it('should initially be false', () => {
      expect(getPluginState(editorView.state).canRedo).toBe(false);
    });

    it('should update to true when there are events to redo', () => {
      editorView.dispatch(editorView.state.tr.insertText('hello'));
      sendKeyToPm(editorView, 'Mod-z');
      expect(getPluginState(editorView.state).canRedo).toBe(true);
    });

    it('should update to false when all events are redone', () => {
      editorView.dispatch(editorView.state.tr.insertText('hello'));
      sendKeyToPm(editorView, 'Mod-z');
      sendKeyToPm(editorView, 'Mod-y');
      expect(getPluginState(editorView.state).canRedo).toBe(false);
    });
  });
});
