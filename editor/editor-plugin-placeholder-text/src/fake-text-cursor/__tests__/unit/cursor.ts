import type { DocBuilder } from '@atlaskit/editor-common/types';
import { Slice } from '@atlaskit/editor-prosemirror/model';
import { Selection, TextSelection } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { DecorationSet } from '@atlaskit/editor-prosemirror/view';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import type { LightEditorPlugin } from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  createProsemirrorEditorFactory,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, p as paragraph } from '@atlaskit/editor-test-helpers/doc-builder';

import placeholderTextPlugin from '../../../plugin';
import {
  addFakeTextCursor,
  drawFakeTextCursor,
  FakeTextCursorBookmark,
  FakeTextCursorSelection,
  removeFakeTextCursor,
} from '../../cursor';

describe('placeholder text -> FakeTextCursor -> Cursor', () => {
  const createEditor = createProsemirrorEditorFactory();
  const editor = (doc: DocBuilder) =>
    createEditor({
      doc,
      preset: new Preset<LightEditorPlugin>().add([placeholderTextPlugin, {}]),
    });

  describe('addFakeTextCursor', () => {
    it('should add placeholder cursor', () => {
      const { editorView } = editor(doc(paragraph('{<>}')));
      expect(editorView.state.selection instanceof TextSelection).toEqual(true);
      addFakeTextCursor(editorView.state, editorView.dispatch);
      expect(
        editorView.state.selection instanceof FakeTextCursorSelection,
      ).toEqual(true);
    });
  });

  describe('removeFakeTextCursor', () => {
    it('should remove placeholder cursor', () => {
      const { editorView } = editor(doc(paragraph('{<>}')));
      addFakeTextCursor(editorView.state, editorView.dispatch);
      expect(
        editorView.state.selection instanceof FakeTextCursorSelection,
      ).toEqual(true);
      removeFakeTextCursor(editorView.state, editorView.dispatch);
      expect(editorView.state.selection instanceof TextSelection).toEqual(true);
    });
  });

  describe('drawFakeTextCursor', () => {
    it('should return null if selection is not of type FakeTextCursor', () => {
      const { editorView } = editor(doc(paragraph('{<>}')));
      const decoration = drawFakeTextCursor(editorView.state);
      expect(decoration).toEqual(null);
    });

    it('should return DecorationSet if selection is of type FakeTextCursor', () => {
      const { editorView } = editor(doc(paragraph('{<>}')));
      addFakeTextCursor(editorView.state, editorView.dispatch);
      const decoration = drawFakeTextCursor(editorView.state);
      expect(decoration instanceof DecorationSet).toEqual(true);
    });
  });

  describe('FakeTextCursorBookmark', () => {
    let editorView: EditorView;
    let linkFakeBookmark: FakeTextCursorBookmark;
    beforeEach(() => {
      ({ editorView } = editor(doc(paragraph('{<>}'))));
      linkFakeBookmark = new FakeTextCursorBookmark(
        editorView.state.selection.$from.pos,
      );
    });

    it('should have instance method map defined', () => {
      expect(linkFakeBookmark.map).not.toEqual(undefined);
    });

    it('should have instance method resolve defined', () => {
      expect(linkFakeBookmark.resolve).not.toEqual(undefined);
    });
  });

  describe('FakeTextCursor', () => {
    let editorView: EditorView;
    let linkFakeTextCursor: FakeTextCursorSelection;
    beforeEach(() => {
      ({ editorView } = editor(doc(paragraph('{<>}'))));
      linkFakeTextCursor = new FakeTextCursorSelection(
        editorView.state.selection.$from,
      );
    });

    it('should extend Selection', () => {
      expect(linkFakeTextCursor instanceof Selection).toEqual(true);
    });

    it('should return instance of FakeTextCursorBookmark when getBookmark is called', () => {
      expect(
        linkFakeTextCursor.getBookmark() instanceof FakeTextCursorBookmark,
      ).toEqual(true);
    });

    it('should return true when eq() is called with FakeTextCursor having same head', () => {
      const linkFakeTextCursorOther = new FakeTextCursorSelection(
        editorView.state.selection.$from,
      );
      expect(linkFakeTextCursor.eq(linkFakeTextCursorOther)).toEqual(true);
    });

    it('should return empty Slice when content() is called', () => {
      expect(linkFakeTextCursor.content()).toEqual(Slice.empty);
    });
  });
});
