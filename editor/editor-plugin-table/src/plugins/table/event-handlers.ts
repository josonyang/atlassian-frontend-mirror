import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import {
  ACTION_SUBJECT,
  EVENT_TYPE,
  TABLE_ACTION,
} from '@atlaskit/editor-common/analytics';
import {
  browser,
  closestElement,
  isElementInTableCell,
  isLastItemMediaGroup,
  setNodeSelection,
} from '@atlaskit/editor-common/utils';
import type { Node as PmNode } from '@atlaskit/editor-prosemirror/model';
import type {
  EditorState,
  Transaction,
} from '@atlaskit/editor-prosemirror/state';
import { Selection, TextSelection } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { CellSelection } from '@atlaskit/editor-tables/cell-selection';
import { TableMap } from '@atlaskit/editor-tables/table-map';
import {
  cellAround,
  findCellRectClosestToPos,
  findTable,
  getSelectionRect,
  removeTable,
} from '@atlaskit/editor-tables/utils';

import {
  addResizeHandleDecorations,
  clearHoverSelection,
  hideInsertColumnOrRowButton,
  hideResizeHandleLine,
  hoverCell,
  hoverColumns,
  selectColumn,
  setEditorFocus,
  showInsertColumnButton,
  showInsertRowButton,
  showResizeHandleLine,
} from './commands';
import { getPluginState as getDragDropPluginState } from './pm-plugins/drag-and-drop/plugin-factory';
import { getPluginState } from './pm-plugins/plugin-factory';
import { getPluginState as getResizePluginState } from './pm-plugins/table-resizing/plugin-factory';
import { deleteColumns, deleteRows } from './transforms';
import type { ElementContentRects } from './types';
import { RESIZE_HANDLE_AREA_DECORATION_GAP } from './types';
import {
  getColumnOrRowIndex,
  getMousePositionHorizontalRelativeByElement,
  getMousePositionVerticalRelativeByElement,
  getSelectedCellInfo,
  hasResizeHandler,
  isCell,
  isColumnControlsDecorations,
  isCornerButton,
  isDragColumnFloatingInsertDot,
  isDragCornerButton,
  isDragRowFloatingInsertDot,
  isInsertRowButton,
  isResizeHandleDecoration,
  isRowControlsButton,
  isTableContainerOrWrapper,
  isTableControlsButton,
} from './utils';
import { getAllowAddColumnCustomStep } from './utils/get-allow-add-column-custom-step';

const isFocusingCalendar = (event: Event) =>
  event instanceof FocusEvent &&
  event.relatedTarget instanceof HTMLElement &&
  event.relatedTarget.getAttribute('aria-label') === 'calendar';

const isFocusingModal = (event: Event) =>
  event instanceof FocusEvent &&
  event.relatedTarget instanceof HTMLElement &&
  event.relatedTarget.closest('[role="dialog"]');

const isFocusingFloatingToolbar = (event: Event) =>
  event instanceof FocusEvent &&
  event.relatedTarget instanceof HTMLElement &&
  event.relatedTarget.closest('[role="toolbar"]');

const isFocusingDragHandles = (event: Event) =>
  event instanceof FocusEvent &&
  event.relatedTarget instanceof HTMLElement &&
  event.relatedTarget.closest('button') &&
  event.relatedTarget.getAttribute('draggable') === 'true';

export const handleBlur = (view: EditorView, event: Event): boolean => {
  const { state, dispatch } = view;
  // IE version check for ED-4665
  // Calendar focus check for ED-10466
  if (
    browser.ie_version !== 11 &&
    !isFocusingCalendar(event) &&
    !isFocusingModal(event) &&
    !isFocusingFloatingToolbar(event) &&
    !isFocusingDragHandles(event)
  ) {
    setEditorFocus(false)(state, dispatch);
  }
  event.preventDefault();
  return false;
};

export const handleFocus = (view: EditorView, event: Event): boolean => {
  const { state, dispatch } = view;
  setEditorFocus(true)(state, dispatch);
  event.preventDefault();
  return false;
};

type HTMLElementIE9 = Omit<HTMLElement, 'matches'> & {
  matches?: HTMLElement['matches']; // WARNING: 'matches' is optional in IE9
  msMatchesSelector?: (selectors: string) => boolean;
};

export const handleClick = (view: EditorView, event: Event): boolean => {
  if (!(event.target instanceof HTMLElement)) {
    return false;
  }
  const element = event.target as HTMLElementIE9;
  const table = findTable(view.state.selection)!;

  if (
    event instanceof MouseEvent &&
    isColumnControlsDecorations(element as HTMLElement)
  ) {
    const [startIndex] = getColumnOrRowIndex(element as HTMLElement);
    const { state, dispatch } = view;

    return selectColumn(startIndex, event.shiftKey)(state, dispatch);
  }

  const matchfn = element.matches ? element.matches : element.msMatchesSelector;

  // check if the table cell with an image is clicked and its not the image itself
  if (
    !table ||
    !isElementInTableCell(element as HTMLElement) ||
    !matchfn ||
    matchfn.call(element, 'table .image, table p, table .image div')
  ) {
    return false;
  }
  const map = TableMap.get(table.node);

  /** Getting the offset of current item clicked */
  const colElement = (closestElement(element as HTMLElement, 'td') ||
    closestElement(element as HTMLElement, 'th')) as HTMLTableDataCellElement;
  const colIndex = colElement && colElement.cellIndex;
  const rowElement = closestElement(
    element as HTMLElement,
    'tr',
  ) as HTMLTableRowElement;
  const rowIndex = rowElement && rowElement.rowIndex;
  const cellIndex = map.width * rowIndex + colIndex;
  const {
    dispatch,
    state: {
      tr,
      schema: {
        nodes: { paragraph },
      },
    },
  } = view;
  const cellPos = map.map[cellIndex];
  if (isNaN(cellPos) || cellPos === undefined || typeof cellPos !== 'number') {
    return false;
  }

  const editorElement = table.node.nodeAt(cellPos) as PmNode;
  /** Only if the last item is media group, insert a paragraph */
  if (isLastItemMediaGroup(editorElement)) {
    const posInTable = map.map[cellIndex] + editorElement.nodeSize;
    tr.insert(posInTable + table.pos, paragraph.create());
    dispatch(tr);
    setNodeSelection(view, posInTable + table.pos);
  }
  return true;
};

export const handleMouseOver = (
  view: EditorView,
  mouseEvent: Event,
): boolean => {
  if (!(mouseEvent.target instanceof HTMLElement)) {
    return false;
  }
  const { state, dispatch } = view;
  const target = mouseEvent.target;
  const { insertColumnButtonIndex, insertRowButtonIndex } =
    getPluginState(state);

  if (isInsertRowButton(target)) {
    const [startIndex, endIndex] = getColumnOrRowIndex(target);

    const positionRow =
      getMousePositionVerticalRelativeByElement(mouseEvent as MouseEvent) ===
      'bottom'
        ? endIndex
        : startIndex;
    return showInsertRowButton(positionRow)(state, dispatch);
  }

  if (isColumnControlsDecorations(target)) {
    const [startIndex] = getColumnOrRowIndex(target);
    const { state, dispatch } = view;

    return hoverColumns([startIndex], false)(state, dispatch);
  }

  if (
    (isCell(target) || isCornerButton(target)) &&
    (typeof insertColumnButtonIndex === 'number' ||
      typeof insertRowButtonIndex === 'number')
  ) {
    return hideInsertColumnOrRowButton()(state, dispatch);
  }

  if (isResizeHandleDecoration(target)) {
    const [startIndex, endIndex] = getColumnOrRowIndex(target);
    return showResizeHandleLine({ left: startIndex, right: endIndex })(
      state,
      dispatch,
    );
  }

  return false;
};

// Ignore any `mousedown` `event` from control and numbered column buttons
// PM end up changing selection during shift selection if not prevented
export const handleMouseDown = (_: EditorView, event: Event) => {
  const isControl = !!(
    event.target &&
    event.target instanceof HTMLElement &&
    (isTableContainerOrWrapper(event.target) ||
      isColumnControlsDecorations(event.target) ||
      isRowControlsButton(event.target) ||
      isDragCornerButton(event.target))
  );

  if (isControl) {
    event.preventDefault();
  }

  return isControl;
};

export const handleMouseOut = (
  view: EditorView,
  mouseEvent: Event,
): boolean => {
  if (
    !(mouseEvent instanceof MouseEvent) ||
    !(mouseEvent.target instanceof HTMLElement)
  ) {
    return false;
  }

  const target = mouseEvent.target;

  if (isColumnControlsDecorations(target)) {
    const { state, dispatch } = view;
    return clearHoverSelection()(state, dispatch);
  }

  const relatedTarget = mouseEvent.relatedTarget as HTMLElement | null;
  // In case the user is moving between cell at the same column
  // we don't need to hide the resize handle decoration
  if (
    isResizeHandleDecoration(target) &&
    !isResizeHandleDecoration(relatedTarget)
  ) {
    const { state, dispatch } = view;
    return hideResizeHandleLine()(state, dispatch);
  }

  return false;
};

export const handleMouseLeave = (view: EditorView, event: Event): boolean => {
  if (!(event.target instanceof HTMLElement)) {
    return false;
  }

  const { state, dispatch } = view;
  const {
    insertColumnButtonIndex,
    insertRowButtonIndex,
    isDragAndDropEnabled,
  } = getPluginState(state);

  const target = event.target;
  if (isTableControlsButton(target)) {
    return true;
  }

  if (isDragAndDropEnabled) {
    const { isDragMenuOpen } = getDragDropPluginState(state);
    // Only set hoveredCell colIndex and rowIndex to undefined if the drag menu is not open
    !isDragMenuOpen && hoverCell()(state, dispatch);
  }

  if (
    (typeof insertColumnButtonIndex !== 'undefined' ||
      typeof insertRowButtonIndex !== 'undefined') &&
    hideInsertColumnOrRowButton()(state, dispatch)
  ) {
    return true;
  }

  return false;
};

export const handleMouseMove = (
  view: EditorView,
  event: Event,
  elementContentRects?: ElementContentRects,
) => {
  if (!(event.target instanceof HTMLElement)) {
    return false;
  }
  const element = event.target;

  if (
    isColumnControlsDecorations(element) ||
    isDragColumnFloatingInsertDot(element)
  ) {
    const { state, dispatch } = view;
    const { insertColumnButtonIndex, isDragAndDropEnabled } =
      getPluginState(state);
    const [startIndex, endIndex] = getColumnOrRowIndex(element);

    const positionColumn =
      getMousePositionHorizontalRelativeByElement(
        event as MouseEvent,
        elementContentRects,
        undefined,
        isDragAndDropEnabled,
      ) === 'right'
        ? endIndex
        : startIndex;

    if (positionColumn !== insertColumnButtonIndex) {
      return showInsertColumnButton(positionColumn)(state, dispatch);
    }
  }

  if (isRowControlsButton(element) || isDragRowFloatingInsertDot(element)) {
    const { state, dispatch } = view;
    const { insertRowButtonIndex } = getPluginState(state);
    const [startIndex, endIndex] = getColumnOrRowIndex(element);

    const positionRow =
      getMousePositionVerticalRelativeByElement(event as MouseEvent) ===
      'bottom'
        ? endIndex
        : startIndex;

    if (positionRow !== insertRowButtonIndex) {
      return showInsertRowButton(positionRow)(state, dispatch);
    }
  }

  if (!isResizeHandleDecoration(element) && isCell(element)) {
    const positionColumn = getMousePositionHorizontalRelativeByElement(
      event as MouseEvent,
      elementContentRects,
      RESIZE_HANDLE_AREA_DECORATION_GAP,
    );

    if (positionColumn !== null) {
      const { state, dispatch } = view;
      const { resizeHandleColumnIndex, resizeHandleRowIndex } =
        getPluginState(state);
      const tableCell = closestElement(
        element,
        'td, th',
      ) as HTMLTableCellElement;
      const cellStartPosition = view.posAtDOM(tableCell, 0);
      const rect = findCellRectClosestToPos(
        state.doc.resolve(cellStartPosition),
      );

      if (rect) {
        const columnEndIndexTarget =
          positionColumn === 'left' ? rect.left : rect.right;

        const rowIndexTarget = rect.top;

        if (
          columnEndIndexTarget !== resizeHandleColumnIndex ||
          rowIndexTarget !== resizeHandleRowIndex ||
          !hasResizeHandler({ target: element, columnEndIndexTarget })
        ) {
          return addResizeHandleDecorations(
            rowIndexTarget,
            columnEndIndexTarget,
            true,
          )(state, dispatch);
        }
      }
    }
  }

  return false;
};

export function handleTripleClick(view: EditorView, pos: number) {
  const { state, dispatch } = view;
  const $cellPos = cellAround(state.doc.resolve(pos));
  if (!$cellPos) {
    return false;
  }

  const cell = state.doc.nodeAt($cellPos.pos);
  if (cell) {
    const selFrom = Selection.findFrom($cellPos, 1, true);
    const selTo = Selection.findFrom(
      state.doc.resolve($cellPos.pos + cell.nodeSize),
      -1,
      true,
    );
    if (selFrom && selTo) {
      dispatch(
        state.tr.setSelection(new TextSelection(selFrom.$from, selTo.$to)),
      );
      return true;
    }
  }

  return false;
}
export const handleCut = (
  oldTr: Transaction,
  oldState: EditorState,
  newState: EditorState,
  editorAnalyticsAPI?: EditorAnalyticsAPI,
  editorView?: EditorView,
): Transaction => {
  const oldSelection = oldState.tr.selection;
  let { tr } = newState;
  if (oldSelection instanceof CellSelection) {
    const $anchorCell = oldTr.doc.resolve(
      oldTr.mapping.map(oldSelection.$anchorCell.pos),
    );
    const $headCell = oldTr.doc.resolve(
      oldTr.mapping.map(oldSelection.$headCell.pos),
    );

    const cellSelection = new CellSelection($anchorCell, $headCell);
    tr.setSelection(cellSelection);

    if (tr.selection instanceof CellSelection) {
      const rect = getSelectionRect(cellSelection);
      if (rect) {
        const {
          verticalCells,
          horizontalCells,
          totalCells,
          totalRowCount,
          totalColumnCount,
        } = getSelectedCellInfo(tr.selection);

        // Reassigning to make it more obvious and consistent
        editorAnalyticsAPI?.attachAnalyticsEvent({
          action: TABLE_ACTION.CUT,
          actionSubject: ACTION_SUBJECT.TABLE,
          actionSubjectId: null,
          attributes: {
            verticalCells,
            horizontalCells,
            totalCells,
            totalRowCount,
            totalColumnCount,
          },
          eventType: EVENT_TYPE.TRACK,
        })(tr);

        // Need this check again since we are overriding the tr in previous statement
        if (tr.selection instanceof CellSelection) {
          const isTableSelected =
            tr.selection.isRowSelection() && tr.selection.isColSelection();
          if (isTableSelected) {
            tr = removeTable(tr);
          } else if (tr.selection.isRowSelection()) {
            const {
              pluginConfig: { isHeaderRowRequired },
            } = getPluginState(newState);
            tr = deleteRows(rect, isHeaderRowRequired)(tr);
          } else if (tr.selection.isColSelection()) {
            tr = deleteColumns(
              rect,
              getAllowAddColumnCustomStep(oldState),
              editorView,
            )(tr);
          }
        }
      }
    }
  }

  return tr;
};

export const whenTableInFocus =
  (
    eventHandler: (
      view: EditorView,
      mouseEvent: Event,
      elementContentRects?: ElementContentRects,
    ) => boolean,
    elementContentRects?: ElementContentRects,
  ) =>
  (view: EditorView, mouseEvent: Event): boolean => {
    if (
      !getPluginState(view.state)?.tableNode ||
      !!getResizePluginState(view.state)?.dragging
    ) {
      return false;
    }

    return eventHandler(view, mouseEvent, elementContentRects);
  };

const trackCellLocation = (view: EditorView, mouseEvent: Event) => {
  const target = mouseEvent.target;
  const maybeTableCell = isElementInTableCell(
    target as HTMLElement,
  ) as HTMLTableCellElement | null;
  const tableRef = getPluginState(view.state).tableRef;
  const { hoveredCell, tableNode } = getPluginState(view.state);

  const tableElement = closestElement(
    target as HTMLElement,
    'table',
  ) as HTMLTableElement;

  // hover will only trigger if target localId is the same with selected localId
  if (
    tableElement?.dataset?.tableLocalId &&
    tableElement.dataset.tableLocalId !== tableNode?.attrs.localId
  ) {
    return;
  }

  if (!maybeTableCell || !tableRef) {
    return;
  }

  const colIndex = maybeTableCell.cellIndex;
  const rowElement = closestElement(
    target as HTMLElement,
    'tr',
  ) as HTMLTableRowElement;
  const rowIndex = rowElement && rowElement.rowIndex;

  const colHeight = tableRef.offsetHeight;
  const colWidth = maybeTableCell.offsetWidth;

  if (
    hoveredCell.colIndex !== colIndex ||
    hoveredCell.rowIndex !== rowIndex ||
    hoveredCell.colWidth !== colWidth ||
    hoveredCell.colHeight !== colHeight
  ) {
    hoverCell(
      rowIndex,
      colIndex,
      colWidth,
      colHeight,
    )(view.state, view.dispatch);
  }
};

export const withCellTracking =
  (
    eventHandler: (
      view: EditorView,
      mouseEvent: Event,
      elementContentRects?: ElementContentRects,
    ) => boolean,
    elementContentRects?: ElementContentRects,
  ) =>
  (view: EditorView, mouseEvent: Event): boolean => {
    if (
      getPluginState(view.state).isDragAndDropEnabled &&
      !getDragDropPluginState(view.state).isDragging
    ) {
      trackCellLocation(view, mouseEvent);
    }
    return eventHandler(view, mouseEvent, elementContentRects);
  };
