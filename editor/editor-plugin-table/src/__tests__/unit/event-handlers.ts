import type { DocBuilder } from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import { contentInsertionPlugin } from '@atlaskit/editor-plugin-content-insertion';
import { decorationsPlugin } from '@atlaskit/editor-plugin-decorations';
import { featureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
import { gridPlugin } from '@atlaskit/editor-plugin-grid';
import { guidelinePlugin } from '@atlaskit/editor-plugin-guideline';
import { selectionPlugin } from '@atlaskit/editor-plugin-selection';
import { widthPlugin } from '@atlaskit/editor-plugin-width';
import { TextSelection } from '@atlaskit/editor-prosemirror/state';
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
  tr,
} from '@atlaskit/editor-test-helpers/doc-builder';
import { ffTest } from '@atlassian/feature-flags-test-utils';

import {
  addResizeHandleDecorations,
  showInsertColumnButton,
} from '../../plugins/table/commands';
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseOut,
  handleMouseOver,
  withCellTracking,
} from '../../plugins/table/event-handlers';
import { getPluginState } from '../../plugins/table/pm-plugins/plugin-factory';
import { pluginKey } from '../../plugins/table/pm-plugins/plugin-key';
import { TableCssClassName as ClassName } from '../../plugins/table/types';
import tablePlugin from '../../plugins/table-plugin';

describe('table plugin: decorations', () => {
  const createEditor = createProsemirrorEditorFactory();
  const editor = (doc: DocBuilder) =>
    createEditor({
      doc,
      preset: new Preset<LightEditorPlugin>()
        .add([featureFlagsPlugin, {}])
        .add([analyticsPlugin, {}])
        .add(contentInsertionPlugin)
        .add(widthPlugin)
        .add(guidelinePlugin)
        .add(selectionPlugin)
        .add(tablePlugin),
      pluginKey,
    });

  describe('#handleMouseDown', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
    it('should return true & prevent default behaviour for table wrappers: pm-table-container', () => {
      const { editorView } = editor(
        doc(table()(tr(td({})(p())), tr(td({})(p())), tr(td({})(p())))),
      );
      const tableContainer = document.createElement('div');
      tableContainer.className = 'pm-table-container';
      const event = new MouseEvent('mousedown');
      Object.defineProperty(event, 'target', { value: tableContainer });
      const preventDefaultSpy = jest.spyOn(
        MouseEvent.prototype,
        'preventDefault',
      );

      expect(handleMouseDown(editorView, event)).toEqual(true);
      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    });

    it('should return true & prevent default behaviour for table wrappers: pm-table-wrapper', () => {
      const { editorView } = editor(
        doc(table()(tr(td({})(p())), tr(td({})(p())), tr(td({})(p())))),
      );
      const tableContainer = document.createElement('div');
      tableContainer.className = 'pm-table-wrapper';
      const event = new MouseEvent('mousedown');
      Object.defineProperty(event, 'target', { value: tableContainer });
      const preventDefaultSpy = jest.spyOn(
        MouseEvent.prototype,
        'preventDefault',
      );

      expect(handleMouseDown(editorView, event)).toEqual(true);
      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    });

    it('should return false & not prevent default behaviour for editor content area: ak-editor-content-area', () => {
      const { editorView } = editor(
        doc(table()(tr(td({})(p())), tr(td({})(p())), tr(td({})(p())))),
      );
      const editorContentArea = document.createElement('div');
      editorContentArea.className = 'ak-editor-content-area';
      const event = new MouseEvent('mousedown');
      Object.defineProperty(event, 'target', { value: editorContentArea });
      const preventDefaultSpy = jest.spyOn(
        MouseEvent.prototype,
        'preventDefault',
      );

      expect(handleMouseDown(editorView, event)).toEqual(false);
      expect(preventDefaultSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('#handleMouseOut', () => {
    describe('when the target is a resize handle column', () => {
      it('should return true', () => {
        const { editorView } = editor(
          doc(table()(tr(tdCursor, tdEmpty), tr(td()(p('{o}')), tdEmpty))),
        );
        const firstCell = document.createElement('div');
        firstCell.classList.add(ClassName.RESIZE_HANDLE_DECORATION);

        const spy = jest
          .spyOn(MouseEvent.prototype, 'target', 'get')
          .mockReturnValue(firstCell);

        const event = new MouseEvent('opa');

        expect(handleMouseOut(editorView, event)).toEqual(true);
        spy.mockRestore();
      });
    });

    describe('when the relatedTarget is a resize handle column too', () => {
      it('should return false', () => {
        const { editorView } = editor(
          doc(table()(tr(tdCursor, tdEmpty), tr(td()(p('{o}')), tdEmpty))),
        );
        const firstCell = document.createElement('div');
        firstCell.classList.add(ClassName.RESIZE_HANDLE_DECORATION);
        const secondCell = document.createElement('div');
        secondCell.classList.add(ClassName.RESIZE_HANDLE_DECORATION);

        const spy = jest
          .spyOn(MouseEvent.prototype, 'target', 'get')
          .mockReturnValue(secondCell);

        const event = new MouseEvent('opa', {
          relatedTarget: firstCell,
        });

        expect(handleMouseOut(editorView, event)).toEqual(false);
        spy.mockRestore();
      });
    });
  });
});

describe('table event handlers', () => {
  const createEditor = createProsemirrorEditorFactory();
  const editor = (doc: DocBuilder) =>
    createEditor({
      doc,
      attachTo: document.body,
      preset: new Preset<LightEditorPlugin>()
        .add([featureFlagsPlugin, {}])
        .add([analyticsPlugin, {}])
        .add(contentInsertionPlugin)
        .add(decorationsPlugin)
        .add(widthPlugin)
        .add(guidelinePlugin)
        .add(gridPlugin)
        .add(selectionPlugin)
        .add(tablePlugin),
      pluginKey,
    });

  describe('#handleMouseOver', () => {
    describe('when insert col/row button is hidden', () => {
      it('should return false', () => {
        const { editorView } = editor(
          doc(table()(tr(tdCursor, tdEmpty), tr(tdEmpty, tdEmpty))),
        );
        const { state } = editorView;
        const cursorPos = 8;
        editorView.dispatch(
          state.tr.setSelection(
            new TextSelection(state.doc.resolve(cursorPos)),
          ),
        );
        const event = {
          target: editorView.dom.querySelector('td'),
        };
        expect(handleMouseOver(editorView, event as MouseEvent)).toEqual(false);
      });
    });

    describe('when insert col/row button is visible', () => {
      it('should call hideInsertColumnOrRowButton when moving to the first cell', () => {
        const { editorView, refs } = editor(
          doc(table()(tr(tdCursor, tdEmpty), tr(tdEmpty, tdEmpty))),
        );

        showInsertColumnButton(0)(editorView.state, editorView.dispatch);

        const firstCell = editorView.domAtPos(refs['<>']);
        const event = {
          target: firstCell.node,
        };
        expect(handleMouseOver(editorView, event as any)).toEqual(true);
      });
    });
  });

  describe('#handleMouseMove', () => {
    describe('when resize decoration has been set', () => {
      it('should return false', () => {
        const { editorView, refs } = editor(
          doc(table()(tr(tdCursor, tdEmpty), tr(tdEmpty, tdEmpty))),
        );
        const { state, dispatch } = editorView;

        addResizeHandleDecorations(0, 0, false)(state, dispatch);

        const firstCell = editorView.domAtPos(refs['<>']);
        const event = {
          target: firstCell.node,
        };
        expect(handleMouseMove(editorView, event as any)).toEqual(false);
      });
    });
  });
});

describe('withCellTracking', () => {
  const createEditor = createProsemirrorEditorFactory();
  const editor = (doc: DocBuilder, isDragAndDropEnabled = false) =>
    createEditor({
      doc,
      attachTo: document.body,
      preset: new Preset<LightEditorPlugin>()
        .add([featureFlagsPlugin, {}])
        .add([analyticsPlugin, {}])
        .add(contentInsertionPlugin)
        .add(decorationsPlugin)
        .add(widthPlugin)
        .add(guidelinePlugin)
        .add(gridPlugin)
        .add(selectionPlugin)
        .add([
          tablePlugin,
          {
            dragAndDropEnabled: isDragAndDropEnabled,
            tableOptions: { advanced: true },
          },
        ]),
      pluginKey,
    });

  describe('should fire event handler passed in', () => {
    ffTest(
      'platform.editor.table.drag-and-drop',
      () => {
        const { editorView } = editor(
          doc(table()(tr(tdCursor, tdEmpty), tr(tdEmpty, tdEmpty))),
          true,
        );
        const eventHandlerSpy = jest.fn();
        withCellTracking(eventHandlerSpy)(editorView, {} as any);

        expect(eventHandlerSpy).toHaveBeenCalled();
      },
      () => {
        const { editorView } = editor(
          doc(table()(tr(tdCursor, tdEmpty), tr(tdEmpty, tdEmpty))),
        );
        const eventHandlerSpy = jest.fn();
        withCellTracking(eventHandlerSpy)(editorView, {} as any);

        expect(eventHandlerSpy).toHaveBeenCalled();
      },
    );
  });

  describe('should correctly set table cell coordinates based on mouse location', () => {
    ffTest('platform.editor.table.drag-and-drop', () => {
      const { editorView, refs } = editor(
        doc(table()(tr(tdCursor, tdEmpty), tr(tdEmpty, tdEmpty))),
        true,
      );
      const firstCell = editorView.domAtPos(refs['<>']);

      const event = {
        target: firstCell.node,
      };

      withCellTracking(jest.fn())(editorView, event as any);

      const pluginState = getPluginState(editorView.state);
      expect(pluginState.hoveredCell).toEqual({
        colIndex: undefined,
        rowIndex: undefined,
      });
    });
  });
});
