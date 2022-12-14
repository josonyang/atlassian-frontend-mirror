import { pluginKey } from '../../pm-plugins/main';
import randomId from '@atlaskit/editor-test-helpers/random-id';

import {
  doc,
  h1,
  ol,
  ul,
  li,
  p,
  media,
  mediaSingle,
  layoutSection,
  layoutColumn,
  breakout,
  table,
  tr,
  td,
  DocBuilder,
} from '@atlaskit/editor-test-helpers/doc-builder';
import {
  createProsemirrorEditorFactory,
  LightEditorPlugin,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import listPlugin from '../..';
import blockTypePlugin from '../../../block-type';
import breakoutPlugin from '../../../breakout';
import widthPlugin from '../../../width';
import layoutPlugin from '../../../layout';
import { tablesPlugin } from '@atlaskit/editor-plugin-table';
import mediaPlugin from '../../../media';
import featureFlagsPlugin from '../../../feature-flags-context';

import sendKeyToPm from '@atlaskit/editor-test-helpers/send-key-to-pm';
import { toggleOrderedList, toggleBulletList } from '../../commands';
import { insertMediaAsMediaSingle } from '../../../media/utils/media-single';
import { INPUT_METHOD } from '../../../analytics';

describe('lists', () => {
  const createEditor = createProsemirrorEditorFactory();

  const editor = (doc: DocBuilder) => {
    const preset = new Preset<LightEditorPlugin>()
      .add(listPlugin)
      .add(blockTypePlugin)
      .add([breakoutPlugin, { allowBreakoutButton: true }])
      .add(widthPlugin)
      .add([layoutPlugin, { allowBreakout: true }])
      .add(tablesPlugin)
      .add([mediaPlugin, { allowMediaSingle: true }]);

    return createEditor({
      doc,
      preset,
    });
  };

  const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
  const temporaryFileId = `temporary:${randomId()}`;

  describe('API', () => {
    it('should be enabled when selecting ordered list', () => {
      const { editorView } = editor(doc(ol()(li(p('te{<>}xt')))));
      const pluginState = pluginKey.getState(editorView.state);

      expect(pluginState).toHaveProperty('orderedListActive', true);
      expect(pluginState).toHaveProperty('orderedListDisabled', false);
      expect(pluginState).toHaveProperty('bulletListActive', false);
      expect(pluginState).toHaveProperty('bulletListDisabled', false);
    });

    it('should be disabled when selecting h1', () => {
      const { editorView } = editor(doc(h1('te{<>}xt')));
      const pluginState = pluginKey.getState(editorView.state);

      expect(pluginState).toHaveProperty('orderedListActive', false);
      expect(pluginState).toHaveProperty('orderedListDisabled', true);
      expect(pluginState).toHaveProperty('bulletListActive', false);
      expect(pluginState).toHaveProperty('bulletListDisabled', true);
    });
  });

  describe('toggling a list', () => {
    it('should allow toggling between normal text and ordered list', () => {
      const { editorView } = editor(doc(p('t{a}ex{b}t')));

      toggleOrderedList(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(ol()(li(p('text')))));
      toggleOrderedList(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should allow toggling between normal text and bullet list', () => {
      const { editorView } = editor(doc(p('t{<}ex{>}t')));

      toggleBulletList(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(ul(li(p('text')))));
      toggleBulletList(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should allow toggling between ordered and bullet list', () => {
      const { editorView } = editor(doc(ol()(li(p('t{<}ex{>}t')))));

      toggleBulletList(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(ul(li(p('text')))));
      toggleBulletList(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should retain breakout marks on ancestor when toggling list within a layout', () => {
      const expectedOutput = doc(
        breakout({ mode: 'wide' })(
          layoutSection(
            layoutColumn({ width: 33.33 })(p('')),
            layoutColumn({ width: 33.33 })(ul(li(p('One')))),
            layoutColumn({ width: 33.33 })(p('')),
          ),
        ),
      );

      const { editorView } = editor(
        doc(
          breakout({ mode: 'wide' })(
            layoutSection(
              layoutColumn({ width: 33.33 })(p('')),
              layoutColumn({ width: 33.33 })(p('{<}One{>}')),
              layoutColumn({ width: 33.33 })(p('')),
            ),
          ),
        ),
      );

      toggleBulletList(editorView);
      expect(editorView.state.doc).toEqualDocument(expectedOutput);
    });

    it('should retain text selection when toggling a list', () => {
      const { editorView } = editor(doc(p('hello{<>}')));

      toggleBulletList(editorView);
      // If the text is not selected, pressing enter will
      // create a new paragraph. If it is selected the
      // 'hello' text will be removed
      sendKeyToPm(editorView, 'Enter');

      expect(editorView.state.doc).toEqualDocument(
        doc(ul(li(p('hello')), li(p('')))),
      );
    });
  });

  describe('untoggling a list', () => {
    // prettier-ignore
    const expectedOutput = doc(
      ol()(
        li(p('One')),
      ),
      p('Two'),
      p('Three'),
      ol()(
        li(p('Four'))
      ),
    );

    it('should allow untoggling part of a list based on selection', () => {
      const { editorView } = editor(
        // prettier-ignore
        doc(
          ol()(
            li(p('One')),
            li(p('{<}Two')),
            li(p('Three{>}')),
            li(p('Four')),
          ),
        ),
      );

      toggleOrderedList(editorView);
      expect(editorView.state.doc).toEqualDocument(expectedOutput);
    });

    it('should untoggle empty paragraphs in a list', () => {
      const { editorView } = editor(
        doc(ol()(li(p('{<}One')), li(p('Two')), li(p()), li(p('Three{>}')))),
      );

      toggleOrderedList(editorView);
      expect(editorView.state.doc).toEqualDocument(
        doc(p('One'), p('Two'), p(), p('Three')),
      );
    });

    it('should untoggle all list items with different ancestors in selection', () => {
      const { editorView } = editor(
        // prettier-ignore
        doc(
          ol()(
            li(p('One')),
            li(p('{<}Two')),
            li(p('Three')),
          ),
          p('LOL'),
          ol()(
            li(p('One{>}')),
            li(p('Two')),
          ),
        ),
      );

      toggleOrderedList(editorView);
      expect(editorView.state.doc).toEqualDocument(
        // prettier-ignore
        doc(
          ol()(
            li(p('One')),
          ),
          p('Two'),
          p('Three'),
          p('LOL'),
          p('One'),
          ol()(
            li(p('Two')),
          ),
        ),
      );
    });

    it('should untoggle list item in the last column of a table cell', () => {
      const TABLE_LOCAL_ID = 'test-table-local-id';
      const { editorView } = editor(
        doc(
          table({ localId: TABLE_LOCAL_ID })(
            tr(td()(p('')), td()(ol()(li(p('One{<>}'))))),
          ),
        ),
      );

      toggleOrderedList(editorView);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          table({ localId: TABLE_LOCAL_ID })(
            tr(td()(p('')), td()(p('One{<>}'))),
          ),
        ),
      );
    });
  });

  describe('nested list scenarios', () => {
    it('should be possible to toggle a simple nested list', () => {
      const { editorView } = editor(
        doc(ol()(li(p('text'), ol()(li(p('text{<>}')))), li(p('text')))),
      );

      toggleOrderedList(editorView);

      expect(editorView.state.doc).toEqualDocument(
        doc(ol()(li(p('text'))), p('text{<>}'), ol()(li(p('text')))),
      );
    });

    it('should be possible to toggle an empty nested list item', () => {
      const { editorView } = editor(
        doc(ol()(li(p('text'), ol()(li(p('{<>}')))), li(p('text')))),
      );

      toggleOrderedList(editorView);

      expect(editorView.state.doc).toEqualDocument(
        doc(ol()(li(p('text'))), p('{<>}'), ol()(li(p('text')))),
      );
    });

    it('should be possible to toggle a selection across different depths in the list', () => {
      const { editorView } = editor(
        doc(ol()(li(p('te{<}xt'), ol()(li(p('text{>}')))), li(p('text')))),
      );

      toggleOrderedList(editorView);

      expect(editorView.state.doc).toEqualDocument(
        doc(p('te{<}xt'), p('text{>}'), ol()(li(p('text')))),
      );
    });

    it('should be possible to toggle a selection across lists with different parent lists', () => {
      const { editorView } = editor(
        doc(
          ol()(li(p('te{<}xt'), ol()(li(p('text'))))),
          ol()(li(p('te{>}xt'), ol()(li(p('text'))))),
        ),
      );

      toggleOrderedList(editorView);

      expect(editorView.state.doc).toEqualDocument(
        doc(p('te{<}xt'), p('text'), p('te{>}xt'), ol()(li(p('text')))),
      );
    });

    it('should be create a new list for children of lifted list item', () => {
      const { editorView } = editor(
        doc(
          ol()(
            li(p('text'), ol()(li(p('te{<>}xt'), ol()(li(p('text')))))),
            li(p('text')),
          ),
        ),
      );

      toggleOrderedList(editorView);

      expect(editorView.state.doc).toEqualDocument(
        doc(
          ol()(li(p('text'))),
          p('te{<>}xt'),
          ol()(li(p('text')), li(p('text'))),
        ),
      );
    });

    it('should only change type to bullet list when toggling orderedList to bulletList', () => {
      const { editorView } = editor(
        doc(
          ol()(
            li(p('text'), ol()(li(p('text'), ol()(li(p('te{<>}xt')))))),
            li(p('text')),
          ),
        ),
      );

      toggleBulletList(editorView);

      expect(editorView.state.doc).toEqualDocument(
        doc(
          ol()(
            li(p('text'), ol()(li(p('text'), ul(li(p('te{<>}xt')))))),
            li(p('text')),
          ),
        ),
      );
    });
  });

  describe('when adding media inside list', () => {
    it('should add media as media single', () => {
      const { editorView } = editor(doc(ul(li(p('Three')), li(p('Four{<>}')))));

      insertMediaAsMediaSingle(
        editorView,
        media({
          id: temporaryFileId,
          type: 'file',
          collection: testCollectionName,
          __fileMimeType: 'image/png',
        })()(editorView.state.schema),
        INPUT_METHOD.PICKER_CLOUD,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          ul(
            li(p('Three')),
            li(
              p('Four'),
              mediaSingle({ layout: 'center' })(
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                  __fileMimeType: 'image/png',
                })(),
              ),
            ),
          ),
        ),
      );
    });

    it('should not add non images inside lists', () => {
      const { editorView } = editor(doc(ul(li(p('Three')), li(p('Four{<>}')))));

      insertMediaAsMediaSingle(
        editorView,
        media({
          id: temporaryFileId,
          type: 'file',
          collection: testCollectionName,
          __fileMimeType: 'pdf',
        })()(editorView.state.schema),
        INPUT_METHOD.PICKER_CLOUD,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(ul(li(p('Three')), li(p('Four{<>}')))),
      );
    });
  });

  describe('child-count attribute', () => {
    it('should add data-child-count attribute, when number of listItem is more than 99', () => {
      const { editorView } = editor(
        doc(
          ol()(
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
          ),
        ),
      );
      const pluginState = pluginKey.getState(editorView.state);

      expect(pluginState.decorationSet.find()[1].type.attrs).toEqual({
        'data-child-count': '100+',
      });
    });

    it('should not add data-child-count attribute, when number of listItem is less than 100', () => {
      const { editorView } = editor(
        doc(
          ol()(
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
            li(p('1')),
          ),
        ),
      );
      const pluginState = pluginKey.getState(editorView.state);

      expect(pluginState.decorationSet.find()[1]).toBeUndefined();
    });
  });
});

describe('restart numbered lists', () => {
  const createEditor = createProsemirrorEditorFactory();

  const editor = (doc: DocBuilder) => {
    const preset = new Preset<LightEditorPlugin>()
      .add([listPlugin, { restartNumberedLists: true }])
      .add([featureFlagsPlugin, { restartNumberedLists: true }]);

    return createEditor({
      doc,
      preset,
    });
  };

  describe('item counter spacing styles', () => {
    const testCases = [
      {
        scenario:
          'when number of listItem is less than 3 digits (eg up to "3")',
        totalListItems: 3,
        expectedInlineStyle: '--ed--list--item-counter--padding:2.385ch;',
      },
      {
        scenario:
          'when number of listItem is less than 3 digits (eg up to "99")',
        totalListItems: 99,
        expectedInlineStyle: '--ed--list--item-counter--padding:2.385ch;',
      },
      {
        scenario: 'when number of listItem is 3 digits (eg up to "105")',
        totalListItems: 105,
        expectedInlineStyle:
          '--ed--list--item-counter--padding:calc(4ch - 2px);',
      },
      {
        scenario: 'when number of listItem is 4 digits (eg up to "8989")',
        totalListItems: 8989,
        expectedInlineStyle:
          '--ed--list--item-counter--padding:calc(5ch - 2px);',
      },
    ];

    testCases.forEach(({ scenario, totalListItems, expectedInlineStyle }) => {
      it(`should add an inline-style CSS variable reflecting a dynamically calculated left padding value, ${scenario}`, () => {
        const listWithXItems = doc(
          ol()(...Array(totalListItems).fill(li(p('item')))),
        );
        const { editorView } = editor(listWithXItems);
        const pluginState = pluginKey.getState(editorView.state);
        expect(pluginState.decorationSet.find()[1].type.attrs).toEqual({
          style: expectedInlineStyle,
        });
      });
    });
  });
});
