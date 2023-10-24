import { Fragment, Slice } from '@atlaskit/editor-prosemirror/model';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createEditorState } from '@atlaskit/editor-test-helpers/create-editor-state';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  blockquote,
  br,
  code,
  code_block,
  doc,
  hr,
  p,
} from '@atlaskit/editor-test-helpers/doc-builder';

import {
  formatMarkdown,
  formatPlainText,
  formatRichText,
} from '../../util/format-handlers';

describe('formatMarkdown', () => {
  describe('when pasting a blockquote inside an empty paragraph', () => {
    it('should set the selection inside the blockquote', () => {
      const state = createEditorState(
        doc(
          p(`Hello World`),
          p(
            '{<}',
            code(
              '> Dorothy followed her through many of the beautiful rooms in her castle.',
            ),
            '{>}',
          ),
          p('end'),
        ),
      );
      const plaintext = `> Dorothy followed her through many of the beautiful rooms in her castle.`;

      const tr = formatMarkdown(state, state.selection.from, plaintext);

      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('Hello World'),
          blockquote(
            p(
              'Dorothy followed her through many of the beautiful rooms in her castle.{<>}',
            ),
          ),
          p('end'),
        ),
      );
    });
  });

  describe('when pasting a blockquote in an existing paragraph', () => {
    it('should set the selection inside the blockquote', () => {
      const state = createEditorState(
        doc(
          p(
            'Hello',
            code(
              '{<}> Dorothy followed her through many of the beautiful rooms in her castle.{>}',
            ),
            'World',
          ),
        ),
      );
      const plaintext = `> Dorothy followed her through many of the beautiful rooms in her castle.`;

      const tr = formatMarkdown(state, state.selection.from, plaintext);

      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('Hello{6}'),
          blockquote(
            p(
              'Dorothy followed her through many of the beautiful rooms in her castle.{<>}',
            ),
          ),
          p('World'),
        ),
      );
    });
  });

  describe('when pasting a blockquote in empty doc', () => {
    it('should set the selection inside the blockquote', () => {
      const state = createEditorState(
        doc(
          p(
            code(
              '{<}> Dorothy followed her through many of the beautiful rooms in her castle.{>}',
            ),
          ),
        ),
      );

      const plaintext = `> Dorothy followed her through many of the beautiful rooms in her castle.`;

      const tr = formatMarkdown(state, state.selection.from, plaintext);

      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          blockquote(p(
            'Dorothy followed her through many of the beautiful rooms in her castle.{<>}',
          )),
        ),
      );
    });
  });
});

describe('formatMarkdown', () => {
  describe('when pasting a code_block inside an empty paragraph', () => {
    it('should set the selection inside the code_block', () => {
      const state = createEditorState(
        doc(
          p(`Hello World`),
          p(`{<}    some text with four spaces in the beginning{>}`),
          p('end'),
        ),
      );

      const plaintext = `    some text with four spaces in the beginning`;
      const tr = formatMarkdown(state, state.selection.from, plaintext);

      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('Hello World'),
          code_block()(`some text with four spaces in the beginning{<>}`),
          p('end'),
        ),
      );
    });
  });

  describe('when pasting a code_block in an existing paragraph', () => {
    it('should set the selection inside the code_block', () => {
      const state = createEditorState(
        doc(p('{<}    some text with four spaces in the beginning{>}')),
      );

      const plaintext = `    some text with four spaces in the beginning`;
      const tr = formatMarkdown(state, state.selection.from, plaintext);

      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          code_block()(`some text with four spaces in the beginning{<>}`),
        ),
      );
    });
  });

  describe('when converting a multi-line code_block to markdown', () => {
    it('should convert to plaintext', () => {
      const state = createEditorState(
        doc(
          p('lorem ipsum'),
          code_block()('{<}line with some text another line with some text'),
          p('{>}'),
        ),
      );

      const plaintext = `line with some text
another line with some text`;

      const tr = formatMarkdown(state, state.selection.from, plaintext);

      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('lorem ipsum'),
          p(`line with some text`, br(), `another line with some text`),
        ),
      );
    });
  });
});

describe('formatMarkdown', () => {
  describe('when pasting a rule inside an empty paragraph', () => {
    it('should set the selection inside the rule', () => {
      const state = createEditorState(
        doc(p(`Hello World`), p('{<}', code('***'), '{>}'), p('end')),
      );
      const plaintext = `***`;

      const tr = formatMarkdown(state, state.selection.from, plaintext);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('Hello World'),
          '{<node>}',
          hr(),
          p('end'),
        ),
      );
    });
  });

  describe('when pasting a rule with text before', () => {
    it('should set the node selection at rule', () => {
      const state = createEditorState(
        doc(p('Hello', code('{<}***{>}'), 'World')),
      );
      const plaintext = `
one
***`;

      const tr = formatMarkdown(state, state.selection.from, plaintext);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('Helloone'),
          '{<node>}',
          hr(),
          p('World'),
        ),
      );
    });
  });

  describe('when pasting a rule in an existing paragraph', () => {
    it('should set the node selection at rule', () => {
      const state = createEditorState(
        doc(p('Hello', code('{<}***{>}'), 'World')),
      );
      const plaintext = `***`;

      const tr = formatMarkdown(state, state.selection.from, plaintext);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('Hello'),
          '{<node>}',
          hr(),
          p('World'),
        ),
      );
    });
  });

  describe('when pasting a rule in empty doc', () => {
    it('should set the selection inside the rule', () => {
      const state = createEditorState(doc(p('{<}', code('***'), '{>}')));

      const plaintext = `***`;

      const tr = formatMarkdown(state, state.selection.from, plaintext);

      expect(tr).toEqualDocumentAndSelection(
        doc(
          '{<node>}',
          // prettier-ignore
          hr(),
        ),
      );
    });
  });
});

describe('formatPlainText: blockquote', () => {
  describe('when pasting a blockquote inside an empty doc', () => {
    it('should convert blockquote into plaintext & set the selection at the end of converted plaintext', () => {
      const state = createEditorState(
        doc(
          '{<}',
          blockquote(
            p(
              'Dorothy followed her through many of the beautiful rooms in her castle.',
            ),
          ),
          '{>}',
        ),
      );
      const plaintext = `> Dorothy followed her through many of the beautiful rooms in her castle.`;
      const tr = formatPlainText(state, state.selection.from, plaintext);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p(
            '> Dorothy followed her through many of the beautiful rooms in her castle.{<>}',
          ),
        ),
      );
    });
  });

  describe('when pasting a blockquote inside an empty paragraph', () => {
    it('should convert blockquote into plaintext & set the selection at the end of converted plaintext', () => {
      const state = createEditorState(
        doc(
          p(`Hello World`),
          p(
            '{<}',
            code(
              '> Dorothy followed her through many of the beautiful rooms in her castle.',
            ),
            '{>}',
          ),
          p('end'),
        ),
      );
      const plaintext = `> Dorothy followed her through many of the beautiful rooms in her castle.`;

      const tr = formatPlainText(state, state.selection.from, plaintext);

      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('Hello World'),
          p(
            '> Dorothy followed her through many of the beautiful rooms in her castle.{<>}',
          ),
          p('end'),
        ),
      );
    });
  });
});

describe('formatPlainText: rule', () => {
  describe('when pasting a rule inside an empty doc', () => {
    it('should convert rule into plaintext & set the selection at the end of converted plaintext', () => {
      const state = createEditorState(doc(p('{<>}')));
      const plaintext = `***`;
      const tr = formatPlainText(state, state.selection.from, plaintext);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('***{<>}'),
        ),
      );
    });
  });

  describe('when pasting a rule inside an doc with a rule selected', () => {
    it('should convert rule into plaintext & set the selection at the end of converted plaintext', () => {
      const state = createEditorState(doc('{<}', hr(), '{>}'));
      const plaintext = `***`;
      const tr = formatPlainText(state, state.selection.from, plaintext);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('***{<>}'),
        ),
      );
    });
  });

  describe('when pasting a rule inside an doc with node selection at the rule', () => {
    it('should convert rule into plaintext & set the selection at the end of converted plaintext', () => {
      const state = createEditorState(doc('{<node>}', hr()));
      const plaintext = `***`;
      const tr = formatPlainText(state, state.selection.from, plaintext);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('***{<>}'),
        ),
      );
    });
  });

  describe('when pasting a rule in between paragraphs', () => {
    it('should convert rule into plaintext & set the selection at the end of converted plaintext', () => {
      const state = createEditorState(
        doc(p(`Hello World`), p('{<}', code('***'), '{>}'), p('end')),
      );
      const plaintext = `***`;
      const tr = formatPlainText(state, state.selection.from, plaintext);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('Hello World'),
          p('***{<>}'),
          p('end'),
        ),
      );
    });
  });
});

describe('formatPlainText: codeblock', () => {
  describe('when pasting a codeblock inside an empty paragraph', () => {
    it('should convert codeblock into plaintext & set the selection at the end of converted plaintext', () => {
      const state = createEditorState(
        doc(
          p(`Hello World`),
          '{<}',
          code_block()(
            '``` { "firstName": "John", "lastName": "Smith", "age": 25 } ```',
          ),
          p('{>}'),
          p('end'),
        ),
      );

      const ticks = '````';
      const plaintext = `${ticks}
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
${ticks}`;
      const tr = formatPlainText(state, state.selection.from, plaintext);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('Hello World'),
          p(`${ticks}
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
${ticks}{<>}`),
          p('end'),
        ),
      );
    });
  });

  describe('when pasting a codeblock inside an empty doc', () => {
    it('should convert codeblock into plaintext & set the selection at the end of converted plaintext', () => {
      const state = createEditorState(doc(code_block()('{<}Hello world{>}')));
      const plaintext = `Hello world`;
      const tr = formatPlainText(state, state.selection.from, plaintext);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          // prettier-ignore
          p('Hello world{<>}'),
        ),
      );
    });
  });
});

describe('format rich text: blockquote', () => {
  describe('when pasting a blockquote in empty doc', () => {
    it('should convert blockquote to paragraph with code mark', () => {
      const plaintext = '> test blockquote';
      const state = createEditorState(
        doc('{<}', blockquote(p('test blockquote')), '{>}'),
      );
      const schema = state.schema;
      const richTextSlice = new Slice(
        Fragment.from(schema.text(plaintext, [schema.marks.code.create()])),
        0,
        0,
      );
      let tr = formatRichText(state, state.selection.from, richTextSlice);
      expect(tr).toEqualDocumentAndSelection(doc(p(code(`${plaintext}{<>}`))));
    });

    it('should convert blockquote with multiple lines into a codeblock', () => {
      const plaintext = `> test blockquote line 1
> test blockquote line 2`;
      const state = createEditorState(
        doc(
          '{<}',
          blockquote(p('test blockquote line 1'), p('test blockquote line 2')),
          '{>}',
        ),
      );
      const schema = state.schema;
      const richTextSlice = new Slice(
        Fragment.fromArray([
          schema.nodes.codeBlock.create(
            { language: null },
            schema.text(plaintext),
          ),
          schema.nodes.paragraph.create(),
        ]),
        1,
        1,
      );
      let tr = formatRichText(state, state.selection.from, richTextSlice);
      expect(tr).toEqualDocumentAndSelection(
        doc(code_block({})(plaintext), p('{<>}')),
      );
    });
  });

  describe('when pasting a blockquote inside a paragraph', () => {
    it('should convert blockquote to paragraph with code mark', () => {
      const plaintext = '> test blockquote';
      const state = createEditorState(
        doc(
          p('Some text'),
          '{<}',
          blockquote(p('test blockquote')),
          '{>}',
          p('another text'),
        ),
      );
      const schema = state.schema;
      const richTextSlice = new Slice(
        Fragment.from(schema.text(plaintext, [schema.marks.code.create()])),
        0,
        0,
      );
      let tr = formatRichText(state, state.selection.from, richTextSlice);
      expect(tr).toEqualDocumentAndSelection(
        doc(p('Some text'), p(code(`${plaintext}{<>}`)), p('another text')),
      );
    });

    it('should convert blockquote with multiple lines into a codeblock', () => {
      const plaintext = `> test blockquote line 1
> test blockquote line 2`;
      const state = createEditorState(
        doc(
          p('some text'),
          '{<}',
          blockquote(p('test blockquote line 1'), p('test blockquote line 2')),
          '{>}',
          p('another text'),
        ),
      );
      const schema = state.schema;
      const richTextSlice = new Slice(
        Fragment.fromArray([
          schema.nodes.codeBlock.create(
            { language: null },
            schema.text(plaintext),
          ),
          schema.nodes.paragraph.create(),
        ]),
        1,
        1,
      );
      let tr = formatRichText(state, state.selection.from, richTextSlice);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          p('some text'),
          code_block({})(plaintext),
          p('{<>}'),
          p('another text'),
        ),
      );
    });
  });

  describe('when pasting a blockquote between two paragraph', () => {
    it('should convert blockquote to paragraph with code mark', () => {
      const plaintext = '> test blockquote';
      const state = createEditorState(
        doc(
          p('Some text'),
          '{<}',
          blockquote(p('test blockquote')),
          '{>}',
          p('another text'),
        ),
      );
      const schema = state.schema;
      const richTextSlice = new Slice(
        Fragment.from(schema.text(plaintext, [schema.marks.code.create()])),
        0,
        0,
      );
      let tr = formatRichText(state, state.selection.from, richTextSlice);
      expect(tr).toEqualDocumentAndSelection(
        doc(p('Some text'), p(code(`${plaintext}{<>}`)), p('another text')),
      );
    });

    it('should convert blockquote with multiple lines into a codeblock', () => {
      const plaintext = `> test blockquote line 1
> test blockquote line 2`;
      const state = createEditorState(
        doc(
          p('some text'),
          '{<}',
          blockquote(p('test blockquote line 1'), p('test blockquote line 2')),
          '{>}',
          p('another text'),
        ),
      );
      const schema = state.schema;
      const richTextSlice = new Slice(
        Fragment.fromArray([
          schema.nodes.codeBlock.create(
            { language: null },
            schema.text(plaintext),
          ),
          schema.nodes.paragraph.create(),
        ]),
        1,
        1,
      );
      let tr = formatRichText(state, state.selection.from, richTextSlice);
      expect(tr).toEqualDocumentAndSelection(
        doc(
          p('some text'),
          code_block({})(plaintext),
          p('{<>}'),
          p('another text'),
        ),
      );
    });
  });
});

describe('format rich text: rule', () => {
  describe('when pasting a rule in empty doc', () => {
    it('should convert rule  to *** with code mark', () => {
      const plaintext = '***';
      const state = createEditorState(doc('{<}', hr(), '{>}'));
      const schema = state.schema;
      const richTextSlice = new Slice(
        Fragment.from(schema.text(plaintext, [schema.marks.code.create()])),
        0,
        0,
      );
      let tr = formatRichText(state, state.selection.from, richTextSlice);
      expect(tr).toEqualDocumentAndSelection(doc(p(code(`${plaintext}{<>}`))));
    });
  });

  describe('when pasting a rule inside a paragraph', () => {
    it('should convert rule  to *** with code mark', () => {
      const plaintext = '***';
      const state = createEditorState(
        doc(p('some text'), '{<}', hr(), '{>}', p('another text')),
      );
      const schema = state.schema;
      const richTextSlice = new Slice(
        Fragment.from(schema.text(plaintext, [schema.marks.code.create()])),
        0,
        0,
      );
      let tr = formatRichText(state, state.selection.from, richTextSlice);
      expect(tr).toEqualDocumentAndSelection(
        doc(p('some text'), p(code(`${plaintext}{<>}`)), p('another text')),
      );
    });
  });

  describe('when pasting a rule between two paragraphs', () => {
    it('should convert rule  to *** with code mark', () => {
      const plaintext = '***';
      const state = createEditorState(
        doc(p('some text'), '{<}', hr(), '{>}', p('another text')),
      );
      const schema = state.schema;
      const richTextSlice = new Slice(
        Fragment.from(schema.text(plaintext, [schema.marks.code.create()])),
        0,
        0,
      );
      let tr = formatRichText(state, state.selection.from, richTextSlice);
      expect(tr).toEqualDocumentAndSelection(
        doc(p('some text'), p(code(`${plaintext}{<>}`)), p('another text')),
      );
    });
  });
});
