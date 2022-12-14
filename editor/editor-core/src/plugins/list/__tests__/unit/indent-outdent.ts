import {
  doc,
  ol,
  li,
  p,
  code_block,
  DocBuilder,
} from '@atlaskit/editor-test-helpers/doc-builder';
import {
  createProsemirrorEditorFactory,
  LightEditorPlugin,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import listPlugin from '../..';
import codeBlockPlugin from '../../../code-block';
import sendKeyToPm from '@atlaskit/editor-test-helpers/send-key-to-pm';
import { insertText } from '@atlaskit/editor-test-helpers/transactions';
import { undo } from 'prosemirror-history';
import { featureFlagsContextPlugin } from '../../..';

describe('lists plugin -> indent and outdent', () => {
  const createEditor = createProsemirrorEditorFactory();

  const editor = (doc: DocBuilder) => {
    const preset = new Preset<LightEditorPlugin>()
      .add(listPlugin)
      .add([codeBlockPlugin, { appearance: 'full-page' }]);

    return createEditor({
      doc,
      preset,
    });
  };

  describe('When gap cursor is inside listItem before codeBlock', () => {
    it('should increase the depth of list item when Tab key press', () => {
      const { editorView } = editor(
        doc(
          ol()(
            li(p('text')),
            li('{<gap|>}', code_block()('text')),
            li(p('text')),
          ),
        ),
      );
      expect(editorView.state.selection.$from.depth).toEqual(2);

      sendKeyToPm(editorView, 'Tab');
      expect(editorView.state.selection.$from.depth).toEqual(4);
    });

    it('should decrease the depth of list item when Shift-Tab key press', () => {
      const { editorView } = editor(
        doc(
          ol()(
            li(p('text'), ol()(li('{<gap|>}', code_block()('text')))),
            li(p('text')),
          ),
        ),
      );
      expect(editorView.state.selection.$from.depth).toEqual(4);

      sendKeyToPm(editorView, 'Shift-Tab');
      expect(editorView.state.selection.$from.depth).toEqual(2);
    });
  });

  it('should increase the depth of list item when Tab key press', () => {
    const { editorView } = editor(
      doc(ol()(li(p('text')), li(p('te{<>}xt')), li(p('text')))),
    );
    expect(editorView.state.selection.$from.depth).toEqual(3);

    sendKeyToPm(editorView, 'Tab');

    expect(editorView.state.selection.$from.depth).toEqual(5);
  });

  it("shouldn't increase the depth of list item when Tab key press when at 6 levels indentation", () => {
    const { editorView } = editor(
      doc(
        ol()(
          li(
            p('first'),
            ol()(
              li(
                p('second'),
                ol()(
                  li(
                    p('third'),
                    ol()(
                      li(
                        p('fourth'),
                        ol()(
                          li(
                            p('fifth'),
                            ol()(li(p('sixth'), p('maybe seventh{<>}'))),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );

    expect(editorView.state.selection.$from.depth).toEqual(13);

    sendKeyToPm(editorView, 'Tab');

    expect(editorView.state.selection.$from.depth).toEqual(13);
  });

  it("shouldn't increase the depth of list item when Tab key press when a child list at 6 levels indentation", () => {
    const { editorView } = editor(
      // prettier-ignore
      doc(
        ol()(
          li(
            p('first'),
            ol()(
              li(
                p('second'),
                ol()(
                  li(
                    p('third'),
                    ol()(
                      li(
                        p('fourth'),
                        ol()(
                          li(
                            p('fifth')
                          ),
                          li(
                            p('fifth'),
                            ol()(
                              li(p('sixth')),
                              li(p('{<}sixth{>}')),
                            )
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );

    expect(editorView.state.selection.$from.depth).toEqual(13);

    sendKeyToPm(editorView, 'Tab');

    expect(editorView.state.selection.$from.depth).toEqual(13);
  });

  it('should nest the list item when Tab key press', () => {
    const { editorView } = editor(
      doc(ol()(li(p('text')), li(p('te{<>}xt')), li(p('text')))),
    );

    sendKeyToPm(editorView, 'Tab');

    expect(editorView.state.doc).toEqualDocument(
      doc(ol()(li(p('text'), ol()(li(p('te{<>}xt')))), li(p('text')))),
    );
  });

  it('should decrease the depth of list item when Shift-Tab key press', () => {
    const { editorView } = editor(
      doc(ol()(li(p('text'), ol()(li(p('te{<>}xt')))), li(p('text')))),
    );
    expect(editorView.state.selection.$from.depth).toEqual(5);

    sendKeyToPm(editorView, 'Shift-Tab');

    expect(editorView.state.selection.$from.depth).toEqual(3);
  });

  it('should lift the list item when Shift-Tab key press', () => {
    const { editorView } = editor(
      doc(ol()(li(p('text'), ol()(li(p('te{<>}xt')))), li(p('text')))),
    );

    sendKeyToPm(editorView, 'Shift-Tab');

    expect(editorView.state.doc).toEqualDocument(
      doc(ol()(li(p('text')), li(p('te{<>}xt')), li(p('text')))),
    );
  });

  it('should lift nested and same level list items correctly', () => {
    const { editorView } = editor(
      doc(
        ol()(li(p('some{<>}text'), ol()(li(p('B')))), li(p('C'))),

        p('after'),
      ),
    );

    sendKeyToPm(editorView, 'Shift-Tab');

    expect(editorView.state.doc).toEqualDocument(
      doc(
        p('some{<>}text'),
        ol()(li(p('B')), li(p('C'))),

        p('after'),
      ),
    );
  });

  it('should lift the list item when Enter key press is done on empty list-item', () => {
    const { editorView } = editor(
      doc(ol()(li(p('text'), ol()(li(p('{<>}')))), li(p('text')))),
    );

    sendKeyToPm(editorView, 'Enter');

    expect(editorView.state.doc).toEqualDocument(
      doc(ol()(li(p('text')), li(p('{<>}')), li(p('text')))),
    );
  });

  it('should the undo on the second list item revert back without cleared out the text', () => {
    const { editorView } = editor(doc(ol()(li(p('item{<>}')))));

    sendKeyToPm(editorView, 'Enter');
    insertText(editorView, 'item');
    sendKeyToPm(editorView, 'Tab');
    expect(editorView.state.doc).toEqualDocument(
      doc(ol()(li(p('item'), ol()(li(p('item{<>}')))))),
    );

    undo(editorView.state, editorView.dispatch);
    expect(editorView.state.doc).toEqualDocument(
      doc(ol()(li(p('item')), li(p('item{<>}')))),
    );
  });

  it('should the undo on the second level list item revert back without cleared out the text', () => {
    const { editorView } = editor(
      doc(ol()(li(p('item'), ol()(li(p('item{<>}')))))),
    );

    sendKeyToPm(editorView, 'Shift-Tab');
    expect(editorView.state.doc).toEqualDocument(
      doc(ol()(li(p('item')), li(p('item{<>}')))),
    );

    undo(editorView.state, editorView.dispatch);
    expect(editorView.state.doc).toEqualDocument(
      doc(ol()(li(p('item'), ol()(li(p('item{<>}')))))),
    );
  });
});

describe('lists plugin -> indent and outdent with restartNumberedLists', () => {
  const createEditor = createProsemirrorEditorFactory();

  const editor = (doc: DocBuilder) => {
    const preset = new Preset<LightEditorPlugin>()
      .add([listPlugin, { restartNumberedLists: true }])
      .add([featureFlagsContextPlugin, { restartNumberedLists: true }]);

    return createEditor({
      doc,
      preset,
    });
  };

  it('should lift the list item when Enter key press is done on empty list-item but maintain the numbering on the split list', () => {
    const { editorView } = editor(
      doc(ol()(li(p('One')), li(p('Two')), li(p('{<>}')), li(p('Three')))),
    );

    sendKeyToPm(editorView, 'Enter');

    expect(editorView.state.doc).toEqualDocument(
      doc(
        ol()(li(p('One')), li(p('Two'))),
        p(),
        ol({ order: 3 })(li(p('Three'))),
      ),
    );
  });
});
