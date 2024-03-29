import type { DocBuilder } from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  code_block,
  doc,
  media,
  mediaSingle,
  p,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { insertText } from '@atlaskit/editor-test-helpers/transactions';

describe('inputrules', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: DocBuilder) =>
    createEditor({
      doc,
      editorProps: {
        legacyImageUploadProvider: Promise.resolve(() => {}),
        media: {
          allowMediaSingle: true,
        },
      },
    });

  describe('image rule', () => {
    it('should convert `![text](url)` to image', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '![text](url)', sel);
      expect(editorView.state.doc).toEqualDocument(
        doc(p(), mediaSingle()(media({ type: 'external', url: 'url' })())),
      );
    });

    it('should convert `![](url)` to image', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '![](url)', sel);
      expect(editorView.state.doc).toEqualDocument(
        doc(p(), mediaSingle()(media({ type: 'external', url: 'url' })())),
      );
    });

    it('should not convert `![text](url)` to image inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '![text](url)', sel);
      expect(editorView.state.doc).toEqualDocument(
        doc(code_block()('![text](url)')),
      );
    });
  });
});
