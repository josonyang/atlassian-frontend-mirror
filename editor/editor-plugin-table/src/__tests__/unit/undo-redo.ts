import clone from 'lodash/clone';

import type { DocBuilder } from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import { contentInsertionPlugin } from '@atlaskit/editor-plugin-content-insertion';
import { featureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
import { guidelinePlugin } from '@atlaskit/editor-plugin-guideline';
import { selectionPlugin } from '@atlaskit/editor-plugin-selection';
import { widthPlugin } from '@atlaskit/editor-plugin-width';
import { redo, undo } from '@atlaskit/editor-prosemirror/history';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
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
  tdCursor,
  tdEmpty,
  th,
  thEmpty,
  tr,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import sendKeyToPm from '@atlaskit/editor-test-helpers/send-key-to-pm';

import tablePlugin from '../../plugins/table';
import { insertColumn } from '../../plugins/table/commands';
import { pluginKey as tablePluginKey } from '../../plugins/table/pm-plugins/plugin-key';
import { deleteColumns } from '../../plugins/table/transforms';
import { colsToRect } from '../../plugins/table/utils/table';

const TABLE_LOCAL_ID = 'test-table-local-id';

const getEditorContainerWidth = () => {
  return {
    width: 500,
  };
};
// HELPERS
const INSERT_COLUMN = (editorView: EditorView) =>
  insertColumn(getEditorContainerWidth)(1)(
    editorView.state,
    editorView.dispatch,
    editorView,
  );
const DELETE_COLUMN = (editorView: EditorView) => {
  const { state, dispatch } = editorView;
  dispatch(deleteColumns(colsToRect([0], 1), true, editorView)(state.tr));
};
const SHORTCUT_ADD_COLUMN_BEFORE = (editorView: EditorView) =>
  sendKeyToPm(editorView, 'Ctrl-Alt-ArrowLeft');
const SHORTCUT_ADD_COLUMN_AFTER = (editorView: EditorView) =>
  sendKeyToPm(editorView, 'Ctrl-Alt-ArrowRight');

describe('undo/redo with tables', () => {
  const createEditor = createProsemirrorEditorFactory();
  const editor = (doc: DocBuilder) => {
    const tableOptions = {
      advanced: true,
      allowColumnSorting: true,
    };
    return createEditor({
      doc,
      preset: new Preset<LightEditorPlugin>()
        .add([featureFlagsPlugin, {}])
        .add([analyticsPlugin, {}])
        .add(contentInsertionPlugin)
        .add(widthPlugin)
        .add(guidelinePlugin)
        .add(selectionPlugin)
        .add([tablePlugin, { tableOptions }]),
      pluginKey: tablePluginKey,
    });
  };
  type TestCase = [
    string,
    {
      before: DocBuilder;
      action: Function;
    },
  ];

  const case01: TestCase = [
    'when table has colwidth attribute and new col has been inserted',
    {
      before: doc(
        table({
          localId: TABLE_LOCAL_ID,
        })(tr(th({ colwidth: [285] })(p('')), th({ colwidth: [1310] })(p('')))),
      ),
      action: INSERT_COLUMN,
    },
  ];

  const case02: TestCase = [
    'when table has colwidth attribute and deleting a col',
    {
      before: doc(
        table({
          localId: TABLE_LOCAL_ID,
        })(tr(th({ colwidth: [285] })(p('')), th({ colwidth: [1310] })(p('')))),
      ),
      action: DELETE_COLUMN,
    },
  ];

  const case03: TestCase = [
    'when table has no colwidth attribute and new col is inserted',
    {
      before: doc(
        table({
          localId: TABLE_LOCAL_ID,
        })(tr(thEmpty, thEmpty)),
      ),
      action: INSERT_COLUMN,
    },
  ];

  const case04: TestCase = [
    'when table has no colwidth attribute and col is deleted',
    {
      before: doc(
        table({
          localId: TABLE_LOCAL_ID,
        })(tr(thEmpty, thEmpty)),
      ),
      action: DELETE_COLUMN,
    },
  ];

  const case05: TestCase = [
    'when table has colwidth attribute and col is inserted after selection via shortcuts',
    {
      before: doc(
        table({
          localId: TABLE_LOCAL_ID,
        })(
          tr(
            td({ colwidth: [194] })(p('{<>}')),
            td({ colwidth: [564] })(p('')),
          ),
        ),
      ),
      action: SHORTCUT_ADD_COLUMN_AFTER,
    },
  ];

  const case06: TestCase = [
    'when table has colwidth attribute and col is inserted before selection via shortcuts',
    {
      before: doc(
        table({
          localId: TABLE_LOCAL_ID,
        })(
          tr(
            td({ colwidth: [194] })(p('{<>}')),
            td({ colwidth: [564] })(p('')),
          ),
        ),
      ),
      action: SHORTCUT_ADD_COLUMN_BEFORE,
    },
  ];

  const case07: TestCase = [
    'when table has no colwidth attribute and col is inserted before selection via shortcuts',
    {
      before: doc(
        table({
          localId: TABLE_LOCAL_ID,
        })(tr(tdCursor, tdEmpty)),
      ),
      action: SHORTCUT_ADD_COLUMN_BEFORE,
    },
  ];

  const case08: TestCase = [
    'when table has no colwidth attribute and col is inserted after selection via shortcuts',
    {
      before: doc(
        table({
          localId: TABLE_LOCAL_ID,
        })(tr(tdCursor, tdEmpty)),
      ),
      action: SHORTCUT_ADD_COLUMN_BEFORE,
    },
  ];

  describe.each<TestCase>([
    case01,
    case02,
    case03,
    case04,
    case05,
    case06,
    case07,
    case08,
  ])('[case%#] %s', (_description, testCase) => {
    it('should be able to undo/redo', () => {
      const { editorView } = editor(testCase.before);
      const docAtStart = clone(editorView.state.doc);
      testCase.action(editorView);
      expect(editorView.state.doc).not.toEqualDocument(docAtStart);
      const docAfterAction = clone(editorView.state.doc);
      undo(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(docAtStart);
      redo(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(docAfterAction);
    });
  });
});
