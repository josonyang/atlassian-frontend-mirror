import {
  doc,
  inlineCard,
  ul,
  li,
  p,
  panel,
  DocBuilder,
} from '@atlaskit/editor-test-helpers/doc-builder';
import {
  createProsemirrorEditorFactory,
  LightEditorPlugin,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import { tablesPlugin } from '@atlaskit/editor-plugin-table';
import listPlugin from '../../../../list';
import codeBlockPlugin from '../../../../code-block';
import layoutPlugin from '../../../../layout';
import mediaPlugin from '../../../../media';
import panelPlugin from '../../../../panel';
import cardPlugin from '../../../../card';
import { deleteBlockContent } from '../../../commands';
import { isNodeAWrappingBlockNode } from '../../../utils';

describe('delete block content', () => {
  const createEditor = createProsemirrorEditorFactory();

  const editor = (doc: DocBuilder) => {
    const preset = new Preset<LightEditorPlugin>()
      .add(listPlugin)
      .add([codeBlockPlugin, { appearance: 'full-page' }])
      .add(layoutPlugin)
      .add([cardPlugin, { platform: 'web' }])
      .add([mediaPlugin, { allowMediaSingle: true }])
      .add(tablesPlugin)
      .add(panelPlugin);

    return createEditor({
      doc,
      preset,
    });
  };

  describe('when deleting in a panel', () => {
    it('should not delete the panel when deleting inlineCard', () => {
      const initialDoc = doc(
        panel()(
          p('{<}', inlineCard({ url: 'http://www.google.com' })(), '{>}'),
        ),
      );

      const expectedDoc = doc(panel()(p('{<>}')));

      const { editorView } = editor(initialDoc);
      deleteBlockContent(isNodeAWrappingBlockNode)(
        editorView.state,
        editorView.dispatch,
      );
      expect(editorView.state).toEqualDocumentAndSelection(expectedDoc);
    });

    it('should not delete the panel when deleting text', () => {
      const initialDoc = doc(panel()(p('{<}AAA{>}')));

      const expectedDoc = doc(panel()(p('{<>}')));

      const { editorView } = editor(initialDoc);
      deleteBlockContent(isNodeAWrappingBlockNode)(
        editorView.state,
        editorView.dispatch,
      );
      expect(editorView.state).toEqualDocumentAndSelection(expectedDoc);
    });

    it('should not delete the panel when deleting list', () => {
      const initialDoc = doc(
        panel()(ul(li(p('{<}a')), li(p('b')), li(p('c{>}')))),
      );

      const expectedDoc = doc(panel()(ul(li(p('{<>}')))));

      const { editorView } = editor(initialDoc);
      deleteBlockContent(isNodeAWrappingBlockNode)(
        editorView.state,
        editorView.dispatch,
      );
      expect(editorView.state).toEqualDocumentAndSelection(expectedDoc);
    });

    it('should not delete the panel when deleting across bottom of list', () => {
      const initialDoc = doc(
        panel()(ul(li(p('{<}aaa')), li(p('bbb')), li(p('ccc')))),
        p('ddd{>}'),
      );

      const expectedDoc = doc(panel()(ul(li(p('{<>}')))));

      const { editorView } = editor(initialDoc);
      deleteBlockContent(isNodeAWrappingBlockNode)(
        editorView.state,
        editorView.dispatch,
      );
      expect(editorView.state).toEqualDocumentAndSelection(expectedDoc);
    });

    it('should delete the panel when deleting across top of list', () => {
      const initialDoc = doc(
        p('{<}aaa'),
        panel()(ul(li(p('bbb')), li(p('ccc')), li(p('ddd{>}')))),
      );

      const expectedDoc = doc(p('{<>}'));

      const { editorView } = editor(initialDoc);
      deleteBlockContent(isNodeAWrappingBlockNode)(
        editorView.state,
        editorView.dispatch,
      );
      expect(editorView.state).toEqualDocumentAndSelection(expectedDoc);
    });
  });
});