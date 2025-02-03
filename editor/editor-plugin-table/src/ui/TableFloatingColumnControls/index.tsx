import React, { useEffect, useMemo, useRef, useState } from 'react';

import type { TableColumnOrdering } from '@atlaskit/custom-steps';
import type { GetEditorFeatureFlags } from '@atlaskit/editor-common/types';
import type { Node as PmNode } from '@atlaskit/editor-prosemirror/model';
import type { Selection } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import type { RowStickyState } from '../../pm-plugins/sticky-headers/types';
import { getColumnsWidths } from '../../pm-plugins/utils/column-controls';
import { containsHeaderColumn } from '../../pm-plugins/utils/nodes';
import { getRowHeights } from '../../pm-plugins/utils/row-controls';
import type { CellHoverMeta, DraggableSourceData, PluginInjectionAPI } from '../../types';
import { TableCssClassName as ClassName } from '../../types';

import { ColumnControls } from './ColumnControls';
import { ColumnDropTargets } from './ColumnDropTargets';

interface Props {
	editorView: EditorView;
	getEditorFeatureFlags: GetEditorFeatureFlags;
	selection?: Selection;
	tableRef?: HTMLTableElement;
	getNode: () => PmNode;
	tableActive?: boolean;
	isInDanger?: boolean;
	hasHeaderRow?: boolean;
	headerRowHeight?: number;
	hoveredRows?: number[];
	hoveredCell?: CellHoverMeta;
	isResizing?: boolean;
	ordering?: TableColumnOrdering;
	stickyHeader?: RowStickyState;
	isTableHovered?: boolean;
	tableContainerWidth?: number;
	isNumberColumnEnabled?: boolean;
	getScrollOffset?: () => number;
	tableWrapperHeight?: number;
	api?: PluginInjectionAPI;
	isChromelessEditor?: boolean;
}

const TableFloatingColumnControls = ({
	editorView,
	tableRef,
	getNode,
	tableActive,
	hasHeaderRow,
	hoveredCell,
	isResizing,
	stickyHeader,
	selection,
	isInDanger,
	isTableHovered,
	tableContainerWidth,
	isNumberColumnEnabled,
	getScrollOffset,
	tableWrapperHeight,
	api,
	isChromelessEditor,
}: Props) => {
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const node = getNode();
	const currentNodeLocalId = node?.attrs.localId;
	const hasHeaderColumn = containsHeaderColumn(node);
	const stickyTop =
		stickyHeader && stickyHeader.sticky && hasHeaderRow ? stickyHeader.top : undefined;

	useEffect(() => {
		return monitorForElements({
			canMonitor({ source }) {
				const { type, localId, indexes } = source.data as Partial<DraggableSourceData>;
				return type === 'table-column' && !!indexes?.length && localId === currentNodeLocalId;
			},
			onDragStart() {
				setIsDragging(true);
			},
			onDrop() {
				setIsDragging(false);
			},
		});
	}, [editorView, currentNodeLocalId]);

	const rowHeights = useMemo(() => {
		// NOTE: we don't care so much as to what tableHeight is, we only care that it changed and is a sane value.
		if (tableRef && !!tableWrapperHeight) {
			return getRowHeights(tableRef);
		}
		return [0];
	}, [tableRef, tableWrapperHeight]);

	if (!tableRef || !tableActive || isResizing) {
		return null;
	}

	const colWidths = getColumnsWidths(editorView);

	if (stickyTop) {
		const columnControlTopOffsetFromParent = '-12px';
		containerRef?.current?.style.setProperty('top', columnControlTopOffsetFromParent);
	} else {
		containerRef?.current?.style.removeProperty('top');
	}

	return (
		<div
			ref={containerRef}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
			className={
				ClassName.DRAG_COLUMN_CONTROLS_WRAPPER +
				(isChromelessEditor ? ' ' + ClassName.TABLE_CHROMELESS : '')
			}
			data-testid="table-floating-column-controls-wrapper"
		>
			<ColumnControls
				editorView={editorView}
				hoveredCell={hoveredCell}
				tableRef={tableRef}
				tableActive={tableActive}
				isTableHovered={isTableHovered}
				stickyTop={tableActive ? stickyTop : undefined}
				localId={currentNodeLocalId}
				isInDanger={isInDanger}
				rowHeights={rowHeights}
				colWidths={colWidths}
				hasHeaderColumn={hasHeaderColumn}
				tableContainerWidth={tableContainerWidth}
				isNumberColumnEnabled={isNumberColumnEnabled}
				isDragging={isDragging}
				getScrollOffset={getScrollOffset}
				api={fg('platform_editor_table_use_shared_state_hook_fg') ? api : undefined}
			/>
			{isDragging && (
				<ColumnDropTargets
					tableRef={tableRef}
					isHeaderSticky={stickyHeader?.sticky && hasHeaderRow}
					tableHeight={tableWrapperHeight}
					localId={currentNodeLocalId}
					colWidths={colWidths}
					getScrollOffset={getScrollOffset}
				/>
			)}
		</div>
	);
};

export default TableFloatingColumnControls;
