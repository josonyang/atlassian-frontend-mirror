import type {
  EditorState,
  Transaction,
} from '@atlaskit/editor-prosemirror/state';
import { TextSelection } from '@atlaskit/editor-prosemirror/state';
import type { Decoration } from '@atlaskit/editor-prosemirror/view';
import { DecorationSet } from '@atlaskit/editor-prosemirror/view';
import {
  moveColumn,
  moveRow,
  selectColumn,
  selectRow,
} from '@atlaskit/editor-tables/utils';

import type { DraggableType, TableDirection } from '../../types';
import { TableDecorations } from '../../types';
import {
  createColumnInsertLine,
  createRowInsertLine,
  updateDecorations,
} from '../../utils';
import { combineTransforms } from '../../utils/transforms';

import { DragAndDropActionType } from './actions';
import { DropTargetType } from './consts';
import { createCommand, getPluginState } from './plugin-factory';
import { pluginKey } from './plugin-key';

// TODO: This command is a placeholder example. Please replace this if required.
export const getDecorations = (state: EditorState): DecorationSet => {
  return pluginKey.getState(state)?.decorationSet || DecorationSet.empty;
};

export const updatePluginStateDecorations = (
  state: EditorState,
  decorations: Decoration[],
  key: TableDecorations,
): DecorationSet =>
  updateDecorations(state.doc, getDecorations(state), decorations, key);

export const setDropTarget = (
  type: DropTargetType,
  index: number,
  tr?: Transaction,
) =>
  createCommand(
    (state) => {
      const { dropTargetType, dropTargetIndex } = getPluginState(state);
      if (dropTargetType === type && dropTargetIndex === index) {
        return false;
      }

      let decorationSet = DecorationSet.empty;
      if (type === 'column') {
        decorationSet = updatePluginStateDecorations(
          state,
          createColumnInsertLine(index, state.selection),
          TableDecorations.COLUMN_INSERT_LINE,
        );
      } else if (type === 'row') {
        decorationSet = updatePluginStateDecorations(
          state,
          createRowInsertLine(index, state.selection),
          TableDecorations.ROW_INSERT_LINE,
        );
      }

      return {
        type: DragAndDropActionType.SET_DROP_TARGET,
        data: {
          decorationSet,
          type,
          index,
        },
      };
    },
    (originalTr: Transaction) =>
      (tr || originalTr).setMeta('addToHistory', false),
  );

export const clearDropTarget = (tr?: Transaction) =>
  createCommand(
    (state) => {
      const { dropTargetType, dropTargetIndex } = getPluginState(state);
      if (dropTargetType === DropTargetType.NONE && dropTargetIndex === 0) {
        return false;
      }

      return {
        type: DragAndDropActionType.CLEAR_DROP_TARGET,
        data: {
          decorationSet: DecorationSet.empty,
        },
      };
    },
    (originalTr: Transaction) =>
      (tr || originalTr).setMeta('addToHistory', false),
  );

export const moveSource = (
  sourceType: DraggableType,
  sourceIndex: number,
  targetIndex: number,
) =>
  createCommand(
    (state) => {
      return {
        type: DragAndDropActionType.CLEAR_DROP_TARGET,
        data: {
          decorationSet: DecorationSet.empty,
        },
      };
    },
    (tr: Transaction) => {
      if (sourceIndex === targetIndex) {
        return tr.setMeta('addToHistory', false);
      }

      const anchor = tr.selection.anchor;
      const selectStartOfTable = (newTr: Transaction) =>
        newTr.setSelection(TextSelection.create(newTr.doc, anchor));

      const isTableRow = sourceType === 'table-row';

      if (isTableRow) {
        return combineTransforms(
          [
            moveRow(sourceIndex, targetIndex),
            selectStartOfTable,
            selectRow(targetIndex),
          ],
          tr,
        );
      }

      return combineTransforms(
        [
          moveColumn(sourceIndex, targetIndex),
          selectStartOfTable,
          selectColumn(targetIndex),
        ],
        tr,
      );
    },
  );

export const toggleDragMenu = (
  isDragMenuOpen: boolean | undefined,
  direction?: TableDirection,
  index?: number,
) =>
  createCommand(
    (state) => {
      let {
        isDragMenuOpen: previousOpenState,
        dragMenuDirection: previousDragMenuDirection,
        dragMenuIndex: previousDragMenuIndex,
      } = getPluginState(state);

      if (
        previousOpenState === isDragMenuOpen &&
        previousDragMenuDirection === direction &&
        previousDragMenuIndex === index
      ) {
        return false;
      }

      let updatedMenuOpenState;
      if (isDragMenuOpen !== undefined) {
        updatedMenuOpenState = isDragMenuOpen;
      } else {
        // menu open but menu direction changed, means user clicked on drag handle of different row/column
        // menu open menu direction not changed, but index changed, means user clicked on drag handle of same row/column, different cells.
        // 2 scenarios above , menu should remain open.
        if (
          (previousOpenState === true &&
            previousDragMenuDirection !== direction) ||
          (previousOpenState === true &&
            previousDragMenuDirection === direction &&
            previousDragMenuIndex !== index)
        ) {
          updatedMenuOpenState = true;
        } else {
          updatedMenuOpenState = !previousOpenState;
        }
      }

      return {
        type: DragAndDropActionType.TOGGLE_DRAG_MENU,
        data: {
          isDragMenuOpen: updatedMenuOpenState,
          direction: direction ?? previousDragMenuDirection,
          index: index ?? previousDragMenuIndex,
        },
      };
    },
    (tr: Transaction) => {
      return tr.setMeta('addToHistory', false);
    },
  );
