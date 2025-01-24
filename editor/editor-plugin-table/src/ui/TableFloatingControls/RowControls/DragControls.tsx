/* eslint-disable @atlaskit/design-system/prefer-primitives */
import type { MouseEvent } from 'react';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { Node as PmNode } from '@atlaskit/editor-prosemirror/model';
import type { Selection } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { CellSelection } from '@atlaskit/editor-tables';
import { getSelectionRect } from '@atlaskit/editor-tables/utils';
import { fg } from '@atlaskit/platform-feature-flags';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { token } from '@atlaskit/tokens';

import { clearHoverSelection } from '../../../pm-plugins/commands';
import { toggleDragMenu } from '../../../pm-plugins/drag-and-drop/commands';
import type { TriggerType } from '../../../pm-plugins/drag-and-drop/types';
import { getPluginState as getTablePluginState } from '../../../pm-plugins/plugin-factory';
import { getRowHeights, getRowsParams } from '../../../pm-plugins/utils/row-controls';
import { getSelectedRowIndexes } from '../../../pm-plugins/utils/selection';
import type { TablePlugin } from '../../../tablePluginType';
import { TableCssClassName as ClassName } from '../../../types';
import type { CellHoverMeta, DraggableSourceData, HandleTypes } from '../../../types';
import { dropTargetExtendedWidth } from '../../consts';
import type { DragHandleAppearance } from '../../DragHandle';
import { DragHandle, DragHandleWithSharedState } from '../../DragHandle';
import RowDropTarget from '../RowDropTarget';

type DragControlsProps = {
	editorView: EditorView;
	tableRef: HTMLTableElement;
	tableNode?: PmNode;
	tableWidth: number;
	tableActive?: boolean;
	hoveredCell?: CellHoverMeta;
	isInDanger?: boolean;
	isTableHovered?: boolean;
	isResizing?: boolean;
	hoverRows: (rows: number[], danger?: boolean) => void;
	selectRow: (row: number, expand: boolean) => void;
	selectRows: (rowIndexes: number[]) => void;
	updateCellHoverLocation: (rowIndex: number) => void;
	api?: ExtractInjectionAPI<TablePlugin>;
	selection?: Selection;
};

const getSelectedRows = (selection: Selection) => {
	if (selection instanceof CellSelection && selection.isRowSelection()) {
		const rect = getSelectionRect(selection);
		if (!rect) {
			return [];
		}
		return getSelectedRowIndexes(rect);
	}
	return [];
};

export const DragControls = ({
	tableRef,
	tableNode,
	tableWidth,
	hoveredCell,
	tableActive,
	editorView,
	isInDanger,
	isResizing,
	isTableHovered,
	hoverRows,
	selectRow,
	selectRows,
	updateCellHoverLocation,
	api,
	selection,
}: DragControlsProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const rowHeights = getRowHeights(tableRef);
	const rowsParams = getRowsParams(rowHeights);
	const heights = rowHeights.map((height) => `${height - 1}px`).join(' ');
	const selectedRowIndexes = getSelectedRows(selection ?? editorView.state.selection);
	const currentNodeLocalId = tableNode?.attrs?.localId ?? '';

	useEffect(() => {
		return monitorForElements({
			canMonitor({ source }) {
				const { type, localId, indexes } = source.data as Partial<DraggableSourceData>;

				if (!indexes || !localId || type !== 'table-row') {
					return false;
				}

				const { tableNode } = getTablePluginState(editorView.state);
				// If the draggable localId is the same as the current selected table localId then we will allow the monitor
				// watch for changes
				return localId === tableNode?.attrs.localId;
			},
			onDragStart() {
				setIsDragging(true);
			},
			onDrop() {
				setIsDragging(false);
			},
		});
	}, [editorView]);

	const toggleDragMenuHandler = useCallback(
		(
			trigger: TriggerType,
			event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | undefined,
		) => {
			if (event?.shiftKey) {
				return;
			}
			toggleDragMenu(
				undefined,
				'row',
				hoveredCell?.rowIndex,
				trigger,
			)(editorView.state, editorView.dispatch);
		},
		[editorView, hoveredCell?.rowIndex],
	);

	const rowIndex = hoveredCell?.rowIndex;

	const handleMouseOut = useCallback(() => {
		if (tableActive) {
			const { state, dispatch } = editorView;
			clearHoverSelection()(state, dispatch);
		}
	}, [editorView, tableActive]);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			const target = e.nativeEvent.target instanceof Element ? e.nativeEvent.target : null;
			const isParentDragControls = target?.closest(`.${ClassName.DRAG_ROW_CONTROLS}`);
			const rowIndex = target?.getAttribute('data-start-index');

			// avoid updating if event target is not related
			if (!isParentDragControls || !rowIndex) {
				return;
			}

			updateCellHoverLocation(Number(rowIndex));
		},
		[updateCellHoverLocation],
	);

	const rowIndexes = useMemo(() => {
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return [rowIndex!];
	}, [rowIndex]);

	const handleMouseOver = useCallback(() => {
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		hoverRows([rowIndex!]);
	}, [hoverRows, rowIndex]);

	const handleClick = useCallback(
		(e: MouseEvent) => {
			const isClickOutsideSelectedRows =
				// Ignored via go/ees005
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				selectedRowIndexes.length >= 1 && !selectedRowIndexes.includes(rowIndex!);
			if (!selectedRowIndexes || selectedRowIndexes.length === 0 || isClickOutsideSelectedRows) {
				// Ignored via go/ees005
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				selectRow(rowIndex!, e.shiftKey);
			}

			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			if (selectedRowIndexes.length > 1 && selectedRowIndexes.includes(rowIndex!) && !e.shiftKey) {
				selectRows(selectedRowIndexes);
			}
		},
		[rowIndex, selectRow, selectRows, selectedRowIndexes],
	);

	const generateHandleByType = (
		type: HandleTypes,
		appearance: DragHandleAppearance,
		gridRow: string,
		indexes: number[],
	) => {
		const isHover = type === 'hover';

		const previewHeight = rowHeights.reduce(
			(sum, v, i) => sum + v * (indexes.includes(i) ? 1 : 0),
			0,
		);

		return (
			<div
				key={type}
				style={{
					gridRow,
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					gridColumn: '2',
					// DragHandle uses `transform: rotate(90)`, which doesn't affect its parent (this div) causing the width of this element to be the true height of the drag handle
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					display: 'flex',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					width: '9px',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					height: '100%',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					position: 'relative',
					// eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage/preview, @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					right: '-0.5px',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop
					pointerEvents: 'none',
				}}
				data-testid={`table-floating-row-${isHover ? rowIndex : selectedRowIndexes[0]}-drag-handle`}
			>
				{fg('platform_editor_table_use_shared_state_hook_fg') ? (
					<DragHandleWithSharedState
						isDragMenuTarget={!isHover}
						direction="row"
						tableLocalId={currentNodeLocalId}
						indexes={indexes}
						forceDefaultHandle={!isHover}
						previewWidth={tableWidth}
						previewHeight={previewHeight}
						appearance={appearance}
						hoveredCell={hoveredCell}
						onClick={handleClick}
						onMouseOver={handleMouseOver}
						onMouseOut={handleMouseOut}
						toggleDragMenu={toggleDragMenuHandler}
						editorView={editorView}
						api={api}
					/>
				) : (
					<DragHandle
						isDragMenuTarget={!isHover}
						direction="row"
						tableLocalId={currentNodeLocalId}
						indexes={indexes}
						forceDefaultHandle={!isHover}
						previewWidth={tableWidth}
						previewHeight={previewHeight}
						appearance={appearance}
						hoveredCell={hoveredCell}
						onClick={handleClick}
						onMouseOver={handleMouseOver}
						onMouseOut={handleMouseOut}
						toggleDragMenu={toggleDragMenuHandler}
						editorView={editorView}
					/>
				)}
			</div>
		);
	};

	const rowHandles = () => {
		const handles = [];
		const isRowSelected = selectedRowIndexes.length > 0;
		const isEntireTableSelected = rowHeights.length > selectedRowIndexes.length;

		if (!tableActive) {
			return null;
		}

		// placeholder / selected need to always render at least one handle
		// so it can be focused via keyboard shortcuts
		handles.push(
			generateHandleByType(
				'selected',
				isRowSelected && isEntireTableSelected
					? isInDanger
						? 'danger'
						: 'selected'
					: 'placeholder',
				`${selectedRowIndexes[0] + 1} / span ${selectedRowIndexes.length}`,
				selectedRowIndexes,
			),
		);

		if (
			hoveredCell &&
			isTableHovered &&
			rowIndex !== undefined &&
			!selectedRowIndexes.includes(rowIndex) &&
			rowIndex < rowHeights.length
		) {
			handles.push(
				generateHandleByType('hover', 'default', `${rowIndex + 1} / span 1`, rowIndexes),
			);
		}

		return handles;
	};

	if (isResizing) {
		return null;
	}

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
			className={ClassName.DRAG_ROW_CONTROLS}
			style={{
				gridTemplateRows: heights,
				gridTemplateColumns: isDragging
					? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
						`${dropTargetExtendedWidth}px 14px ${tableWidth}px`
					: '0px 14px 0px',
				// eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage/preview
				left: isDragging
					? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
						`-${dropTargetExtendedWidth + 2}px`
					: token('space.negative.025', '-2px'),
			}}
			onMouseMove={handleMouseMove}
			contentEditable={false}
		>
			{rowsParams.map(({ startIndex, endIndex }, index) => (
				// Ignored via go/ees005
				// eslint-disable-next-line react/no-array-index-key
				<Fragment key={index}>
					<div
						style={{
							gridRow: `${index + 1} / span 1`,
							// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
							gridColumn: '2',
						}}
						data-start-index={startIndex}
						data-end-index={endIndex}
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
						className={ClassName.DRAG_ROW_FLOATING_INSERT_DOT_WRAPPER}
						contentEditable={false}
						// Ignored via go/ees005
						// eslint-disable-next-line react/no-array-index-key
						key={`insert-dot-${index}`}
					>
						{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766  */}
						<div className={ClassName.DRAG_ROW_FLOATING_INSERT_DOT} />
					</div>
					{isDragging && (
						<RowDropTarget
							// Ignored via go/ees005
							// eslint-disable-next-line react/no-array-index-key
							key={`drop-target-${index}`}
							index={index}
							localId={currentNodeLocalId}
							style={{
								// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
								gridColumn: '1 / span 3',
								gridRow: `${index + 1} / span 1`,
								// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
								height: '100%',
								// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
								pointerEvents: 'auto',
								// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
								position: 'relative',
								// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
								left: token('space.negative.100', '-8px'),
							}}
						/>
					)}
				</Fragment>
			))}
			{rowHandles()}
		</div>
	);
};

export const DragControlsWithSelection = ({
	editorView,
	tableRef,
	tableNode,
	tableWidth,
	tableActive,
	hoveredCell,
	isInDanger,
	isTableHovered,
	isResizing,
	hoverRows,
	selectRow,
	selectRows,
	updateCellHoverLocation,
	api,
}: Exclude<DragControlsProps, 'selection'>) => {
	const { selectionState } = useSharedPluginState(api, ['selection']);

	return (
		<DragControls
			editorView={editorView}
			tableRef={tableRef}
			tableNode={tableNode}
			tableWidth={tableWidth}
			tableActive={tableActive}
			hoveredCell={hoveredCell}
			isInDanger={isInDanger}
			isTableHovered={isTableHovered}
			isResizing={isResizing}
			hoverRows={hoverRows}
			selectRow={selectRow}
			selectRows={selectRows}
			updateCellHoverLocation={updateCellHoverLocation}
			api={api}
			selection={selectionState?.selection}
		/>
	);
};
