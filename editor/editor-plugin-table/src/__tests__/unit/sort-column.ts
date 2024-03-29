import { uuid } from '@atlaskit/adf-schema';
import { TableSortOrder as SortOrder } from '@atlaskit/custom-steps';
import type { DocBuilder } from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import { contentInsertionPlugin } from '@atlaskit/editor-plugin-content-insertion';
import { featureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
import { guidelinePlugin } from '@atlaskit/editor-plugin-guideline';
import { selectionPlugin } from '@atlaskit/editor-plugin-selection';
import { widthPlugin } from '@atlaskit/editor-plugin-width';
import type { PluginKey } from '@atlaskit/editor-prosemirror/state';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { LightEditorPlugin } from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  createProsemirrorEditorFactory,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  doc,
  p,
  table,
  td,
  th,
  tr,
} from '@atlaskit/editor-test-helpers/doc-builder';

import { sortByColumn } from '../../plugins/table/commands';
import { pluginKey as tablePluginKey } from '../../plugins/table/pm-plugins/plugin-key';
import type {
  PermittedLayoutsDescriptor,
  TablePluginState,
} from '../../plugins/table/types';
import tablePlugin from '../../plugins/table-plugin';

const TABLE_LOCAL_ID = 'test-table-local-id';

describe('table plugin', () => {
  beforeEach(() => {
    uuid.setStatic(TABLE_LOCAL_ID);
  });

  afterEach(() => {
    uuid.setStatic(false);
  });

  const createEditor = createProsemirrorEditorFactory();
  const tableOptions = {
    allowNumberColumn: true,
    allowHeaderRow: true,
    allowHeaderColumn: true,
    allowBackgroundColor: true,
    permittedLayouts: 'all' as PermittedLayoutsDescriptor,
    allowColumnSorting: true,
  };
  const preset = new Preset<LightEditorPlugin>()
    .add([featureFlagsPlugin, {}])
    .add([analyticsPlugin, {}])
    .add(contentInsertionPlugin)
    .add(widthPlugin)
    .add(guidelinePlugin)
    .add(selectionPlugin)
    .add([tablePlugin, { tableOptions }]);

  const editor = (doc: DocBuilder) => {
    return createEditor<TablePluginState, PluginKey, typeof preset>({
      doc,
      preset,
      pluginKey: tablePluginKey,
    });
  };

  describe('TableView', () => {
    describe('Sort Columns in given order', () => {
      it('sorts the given column in ascending order', () => {
        const { editorView } = editor(
          doc(
            table({ isNumberColumnEnabled: false, layout: 'default' })(
              tr(
                th({})(p('1')),
                th({})(p('2')),
                th({})(p('3')),
                th({})(p('4')),
                th({})(p('5')),
              ),
              tr(
                td({})(p('c')),
                td({})(p('c')),
                td({})(p()),
                td({})(p('c')),
                td({})(p()),
              ),
              tr(
                td({})(p('b')),
                td({})(p()),
                td({})(p('d')),
                td({})(p()),
                td({})(p('c')),
              ),
              tr(
                td({})(p()),
                td({})(p('z')),
                td({})(p()),
                td({})(p()),
                td({})(p('f')),
              ),
              tr(
                td({})(p('2')),
                td({})(p()),
                td({})(p()),
                td({})(p()),
                td({})(p()),
              ),
              tr(
                td({})(p('1')),
                td({})(p()),
                td({})(p('c')),
                td({})(p()),
                td({})(p()),
              ),
              tr(
                td({})(p('a')),
                td({})(p()),
                td({})(p()),
                td({})(p()),
                td({})(p()),
              ),
            ),
          ),
        );

        const sortByColumnCommand = sortByColumn(0, SortOrder.ASC);

        sortByColumnCommand(editorView.state, editorView.dispatch);

        expect(editorView.state.doc).toEqualDocument(
          doc(
            table({
              isNumberColumnEnabled: false,
              layout: 'default',
              localId: TABLE_LOCAL_ID,
            })(
              tr(
                th({})(p('1')),
                th({})(p('2')),
                th({})(p('3')),
                th({})(p('4')),
                th({})(p('5')),
              ),
              tr(
                td({})(p('1')),
                td({})(p()),
                td({})(p('c')),
                td({})(p()),
                td({})(p()),
              ),
              tr(
                td({})(p('2')),
                td({})(p()),
                td({})(p()),
                td({})(p()),
                td({})(p()),
              ),
              tr(
                td({})(p('a')),
                td({})(p()),
                td({})(p()),
                td({})(p()),
                td({})(p()),
              ),
              tr(
                td({})(p('b')),
                td({})(p()),
                td({})(p('d')),
                td({})(p()),
                td({})(p('c')),
              ),
              tr(
                td({})(p('c')),
                td({})(p('c')),
                td({})(p()),
                td({})(p('c')),
                td({})(p()),
              ),
              tr(
                td({})(p()),
                td({})(p('z')),
                td({})(p()),
                td({})(p()),
                td({})(p('f')),
              ),
            ),
          ),
        );
      });
      it('sorts the given column in descending order', () => {
        const { editorView } = editor(
          doc(
            table({ isNumberColumnEnabled: false, layout: 'default' })(
              tr(
                th({})(p('1')),
                th({})(p('2')),
                th({})(p('3')),
                th({})(p('4')),
                th({})(p('5')),
              ),
              tr(
                td({})(p('c')),
                td({})(p('c')),
                td({})(p()),
                td({})(p('c')),
                td({})(p()),
              ),
              tr(
                td({})(p('b')),
                td({})(p()),
                td({})(p('d')),
                td({})(p()),
                td({})(p('c')),
              ),
              tr(
                td({})(p()),
                td({})(p('z')),
                td({})(p()),
                td({})(p()),
                td({})(p('f')),
              ),
              tr(
                td({})(p('2')),
                td({})(p()),
                td({})(p()),
                td({})(p()),
                td({})(p()),
              ),
              tr(
                td({})(p('1')),
                td({})(p()),
                td({})(p('c')),
                td({})(p()),
                td({})(p()),
              ),
              tr(
                td({})(p('a')),
                td({})(p()),
                td({})(p()),
                td({})(p()),
                td({})(p()),
              ),
            ),
          ),
        );

        const sortByColumnCommand = sortByColumn(0, SortOrder.DESC);

        sortByColumnCommand(editorView.state, editorView.dispatch);

        expect(editorView.state.doc).toEqualDocument(
          doc(
            table({
              isNumberColumnEnabled: false,
              layout: 'default',
              localId: TABLE_LOCAL_ID,
            })(
              tr(
                th({})(p('1')),
                th({})(p('2')),
                th({})(p('3')),
                th({})(p('4')),
                th({})(p('5')),
              ),
              tr(
                td({})(p('c')),
                td({})(p('c')),
                td({})(p()),
                td({})(p('c')),
                td({})(p()),
              ),
              tr(
                td({})(p('b')),
                td({})(p()),
                td({})(p('d')),
                td({})(p()),
                td({})(p('c')),
              ),
              tr(
                td({})(p('a')),
                td({})(p()),
                td({})(p()),
                td({})(p()),
                td({})(p()),
              ),
              tr(
                td({})(p('2')),
                td({})(p()),
                td({})(p()),
                td({})(p()),
                td({})(p()),
              ),
              tr(
                td({})(p('1')),
                td({})(p()),
                td({})(p('c')),
                td({})(p()),
                td({})(p()),
              ),
              tr(
                td({})(p()),
                td({})(p('z')),
                td({})(p()),
                td({})(p()),
                td({})(p('f')),
              ),
            ),
          ),
        );
      });

      describe('case sensitivity', () => {
        describe('ascending order', () => {
          it('sorts the given column', () => {
            const { editorView } = editor(
              doc(
                table({ isNumberColumnEnabled: false, layout: 'default' })(
                  tr(th({})(p()), th({})(p())),
                  tr(td({})(p('A')), td({})(p('1'))),
                  tr(td({})(p('a')), td({})(p('2'))),
                  tr(td({})(p('b')), td({})(p('3'))),
                  tr(td({})(p('B')), td({})(p('4'))),
                  tr(td({})(p('bb')), td({})(p('5'))),
                  tr(td({})(p('Bb')), td({})(p('6'))),
                ),
              ),
            );

            const sortByColumnCommand = sortByColumn(0, SortOrder.ASC);

            sortByColumnCommand(editorView.state, editorView.dispatch);

            expect(editorView.state.doc).toEqualDocument(
              doc(
                table({
                  isNumberColumnEnabled: false,
                  layout: 'default',
                  localId: TABLE_LOCAL_ID,
                })(
                  tr(th({})(p()), th({})(p())),
                  tr(td({})(p('A')), td({})(p('1'))),
                  tr(td({})(p('a')), td({})(p('2'))),
                  tr(td({})(p('B')), td({})(p('4'))),
                  tr(td({})(p('b')), td({})(p('3'))),
                  tr(td({})(p('Bb')), td({})(p('6'))),
                  tr(td({})(p('bb')), td({})(p('5'))),
                ),
              ),
            );
          });
        });

        describe('descending order', () => {
          it('sorts the given column', () => {
            const { editorView } = editor(
              doc(
                table({ isNumberColumnEnabled: false, layout: 'default' })(
                  tr(th({})(p()), th({})(p())),
                  tr(td({})(p('A')), td({})(p('1'))),
                  tr(td({})(p('a')), td({})(p('2'))),
                  tr(td({})(p('b')), td({})(p('3'))),
                  tr(td({})(p('B')), td({})(p('4'))),
                  tr(td({})(p('bb')), td({})(p('5'))),
                  tr(td({})(p('Bb')), td({})(p('6'))),
                ),
              ),
            );

            const sortByColumnCommand = sortByColumn(0, SortOrder.DESC);

            sortByColumnCommand(editorView.state, editorView.dispatch);

            expect(editorView.state.doc).toEqualDocument(
              doc(
                table({
                  isNumberColumnEnabled: false,
                  layout: 'default',
                  localId: TABLE_LOCAL_ID,
                })(
                  tr(th({})(p()), th({})(p())),
                  tr(td({})(p('bb')), td({})(p('5'))),
                  tr(td({})(p('Bb')), td({})(p('6'))),
                  tr(td({})(p('b')), td({})(p('3'))),
                  tr(td({})(p('B')), td({})(p('4'))),
                  tr(td({})(p('a')), td({})(p('2'))),
                  tr(td({})(p('A')), td({})(p('1'))),
                ),
              ),
            );
          });
        });
      });
    });
  });
});
