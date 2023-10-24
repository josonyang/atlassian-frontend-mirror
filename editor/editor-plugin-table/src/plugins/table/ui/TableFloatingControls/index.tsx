import React, { Component } from 'react';

import type { TableColumnOrdering } from '@atlaskit/custom-steps';
import { browser } from '@atlaskit/editor-common/utils';
import type { Selection } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import { hoverCell, hoverRows, selectRow } from '../../commands';
import { getPluginState } from '../../pm-plugins/plugin-factory';
import type { RowStickyState } from '../../pm-plugins/sticky-headers';
import type { CellHoverMeta } from '../../types';
import { isSelectionUpdated } from '../../utils';

import { CornerControls } from './CornerControls';
import NumberColumn from './NumberColumn';
import { DragControls, RowControls } from './RowControls';

export interface Props {
  editorView: EditorView;
  selection?: Selection;
  tableRef?: HTMLTableElement;
  tableActive?: boolean;
  isInDanger?: boolean;
  isResizing?: boolean;
  isHeaderRowEnabled?: boolean;
  isHeaderColumnEnabled?: boolean;
  isNumberColumnEnabled?: boolean;
  isDragAndDropEnabled?: boolean;
  hasHeaderRow?: boolean;
  headerRowHeight?: number;
  hoveredRows?: number[];
  hoveredCell?: CellHoverMeta;
  ordering?: TableColumnOrdering;
  stickyHeader?: RowStickyState;
}

interface State {
  tableHeight: number;
}

export default class TableFloatingControls extends Component<Props, State> {
  static displayName = 'TableFloatingControls';
  private resizeObserver?: ResizeObserver;

  componentDidMount() {
    this.tryInitResizeObserver();
  }

  componentDidUpdate() {
    // tableRef prop is not guaranteed to be defined after componentDidMount, so retry to init resize observer on update
    this.tryInitResizeObserver();
  }

  // tracking the table height changes to update floating controls
  private tryInitResizeObserver() {
    let { tableRef } = this.props;
    if (tableRef && !this.resizeObserver && window?.ResizeObserver) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const tableHeight = entry.contentRect.height;
          this.setState({ tableHeight });
        }
      });
      this.resizeObserver.observe(tableRef);
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const {
      tableRef,
      isInDanger,
      isResizing,
      isHeaderRowEnabled,
      isNumberColumnEnabled,
      hoveredRows,
      selection,
      tableActive,
      isHeaderColumnEnabled,
      ordering,
      headerRowHeight,
      stickyHeader,
      hoveredCell,
    } = this.props;
    const tableHeight = this.state?.tableHeight;
    const nextTableHeight = nextState?.tableHeight;
    return (
      ordering !== nextProps.ordering ||
      tableRef !== nextProps.tableRef ||
      tableHeight !== nextTableHeight ||
      tableActive !== nextProps.tableActive ||
      isInDanger !== nextProps.isInDanger ||
      isResizing !== nextProps.isResizing ||
      hoveredRows !== nextProps.hoveredRows ||
      isHeaderRowEnabled !== nextProps.isHeaderRowEnabled ||
      isHeaderColumnEnabled !== nextProps.isHeaderColumnEnabled ||
      isNumberColumnEnabled !== nextProps.isNumberColumnEnabled ||
      isSelectionUpdated(selection!, nextProps.selection) ||
      headerRowHeight !== nextProps.headerRowHeight ||
      stickyHeader !== nextProps.stickyHeader ||
      hoveredCell !== nextProps.hoveredCell
    );
  }

  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  render() {
    const {
      editorView,
      tableRef,
      isInDanger,
      isResizing,
      isNumberColumnEnabled,
      isHeaderRowEnabled,
      isHeaderColumnEnabled,
      tableActive,
      hasHeaderRow,
      hoveredRows,
      stickyHeader,
      isDragAndDropEnabled,
      hoveredCell,
    } = this.props;

    if (!tableRef) {
      return null;
    }

    const stickyTop =
      stickyHeader && stickyHeader.sticky && hasHeaderRow
        ? stickyHeader.top
        : undefined;

    return (
      <div onMouseDown={(e) => !isDragAndDropEnabled && e.preventDefault()}>
        {isNumberColumnEnabled ? (
          <NumberColumn
            editorView={editorView}
            hoverRows={this.hoverRows}
            tableRef={tableRef}
            tableActive={tableActive}
            hoveredRows={hoveredRows}
            hasHeaderRow={hasHeaderRow}
            isInDanger={isInDanger}
            isResizing={isResizing}
            selectRow={this.selectRow}
            updateCellHoverLocation={this.updateCellHoverLocation}
            stickyTop={stickyTop}
            isDragAndDropEnabled={isDragAndDropEnabled}
          />
        ) : null}

        {tableActive && (
          <>
            {isDragAndDropEnabled ? (
              <DragControls
                tableRef={tableRef}
                hoveredCell={hoveredCell}
                editorView={editorView}
                tableActive={tableActive}
                isInDanger={isInDanger}
                hoverRows={this.hoverRows}
                selectRow={this.selectRow}
                updateCellHoverLocation={this.updateCellHoverLocation}
              />
            ) : (
              <>
                <CornerControls
                  editorView={editorView}
                  tableRef={tableRef}
                  isInDanger={isInDanger}
                  isResizing={isResizing}
                  isHeaderRowEnabled={isHeaderRowEnabled}
                  isHeaderColumnEnabled={isHeaderColumnEnabled}
                  hoveredRows={hoveredRows}
                  stickyTop={tableActive ? stickyTop : undefined}
                />
                <RowControls
                  editorView={editorView}
                  tableRef={tableRef}
                  hoverRows={this.hoverRows}
                  hoveredRows={hoveredRows}
                  isInDanger={isInDanger}
                  isResizing={isResizing}
                  selectRow={this.selectRow}
                  stickyTop={tableActive ? stickyTop : undefined}
                />
              </>
            )}
          </>
        )}
      </div>
    );
  }

  private selectRow = (row: number, expand: boolean) => {
    const { editorView } = this.props;
    const { state, dispatch } = editorView;
    // fix for issue ED-4665
    if (browser.ie_version === 11) {
      (editorView.dom as HTMLElement).blur();
    }
    selectRow(row, expand)(state, dispatch);
  };

  private hoverRows = (rows: Array<number>, danger?: boolean) => {
    const { state, dispatch } = this.props.editorView;
    hoverRows(rows, danger)(state, dispatch);
  };

  // re-use across numbered columns and row controls
  private updateCellHoverLocation = (rowIndex: number) => {
    const { editorView, tableActive } = this.props;
    const { state, dispatch } = editorView;
    const { hoveredCell } = getPluginState(state);

    if (tableActive && hoveredCell.rowIndex !== rowIndex) {
      hoverCell(rowIndex, hoveredCell.colIndex)(state, dispatch);
    }
  };
}
