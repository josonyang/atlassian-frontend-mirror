/* eslint-disable @atlaskit/design-system/no-html-button */
import type { MouseEventHandler } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import classnames from 'classnames';
import ReactDOM from 'react-dom';
import type { WrappedComponentProps } from 'react-intl-next';
import { injectIntl } from 'react-intl-next';

import { browser } from '@atlaskit/editor-common/browser';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import { tableMessages as messages } from '@atlaskit/editor-common/messages';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { TextSelection } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { findTable, TableMap } from '@atlaskit/editor-tables';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { token } from '@atlaskit/tokens';

import { getPluginState as getDnDPluginState } from '../../pm-plugins/drag-and-drop/plugin-factory';
import type { TriggerType } from '../../pm-plugins/drag-and-drop/types';
import { getPluginState } from '../../pm-plugins/plugin-factory';
import {
	findDuplicatePosition,
	hasMergedCellsInSelection,
} from '../../pm-plugins/utils/merged-cells';
import type { TablePlugin } from '../../tablePluginType';
import { TableCssClassName as ClassName } from '../../types';
import type { CellHoverMeta, TableDirection, TableSharedStateInternal } from '../../types';
import { dragTableInsertColumnButtonSize } from '../consts';
import { DragPreview } from '../DragPreview';

import { HandleIconComponent } from './HandleIconComponent';

export type DragHandleAppearance = 'default' | 'selected' | 'disabled' | 'danger' | 'placeholder';

type DragHandleProps = {
	tableLocalId: string;
	indexes: number[];
	forceDefaultHandle?: boolean;
	previewWidth?: number;
	previewHeight?: number;
	hoveredCell?: CellHoverMeta;
	direction?: TableDirection;
	appearance?: DragHandleAppearance;
	onClick?: MouseEventHandler;
	onMouseOver?: MouseEventHandler;
	onMouseOut?: MouseEventHandler;
	toggleDragMenu?: (
		trigger: TriggerType,
		event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	editorView: EditorView;
	isDragMenuTarget: boolean; // this is identify which current handle component is
	hoveredColumns?: number[];
	hoveredRows?: number[];
};

type DragHandleWithSharedStateProps = Exclude<DragHandleProps, 'hoveredColumns' | 'hoveredRows'> & {
	api?: ExtractInjectionAPI<TablePlugin>;
};

const DragHandleComponent = ({
	isDragMenuTarget,
	tableLocalId,
	direction = 'row',
	appearance = 'default',
	indexes,
	forceDefaultHandle = false,
	previewWidth,
	previewHeight,
	onMouseOver,
	onMouseOut,
	toggleDragMenu,
	hoveredCell,
	onClick,
	editorView,
	intl: { formatMessage },
	hoveredColumns,
	hoveredRows,
}: DragHandleProps & WrappedComponentProps) => {
	const dragHandleDivRef = useRef<HTMLButtonElement>(null);
	const [previewContainer, setPreviewContainer] = useState<HTMLElement | null>(null);
	const {
		state,
		state: { selection },
	} = editorView;

	if (hoveredColumns === undefined || hoveredRows === undefined) {
		const { hoveredColumns: hoveredColumnsState, hoveredRows: hoveredRowsState } =
			getPluginState(state);
		hoveredColumns = hoveredColumnsState;
		hoveredRows = hoveredRowsState;
	}
	const { isDragMenuOpen = false } = getDnDPluginState(state);

	const isRow = direction === 'row';
	const isColumn = direction === 'column';

	// Added !isDragMenuOpen check so when hover 'Delete column/row' from drag menu
	// the handle of the next column/row does not show the 'hovered' state icon
	const isRowHandleHovered = isRow && hoveredRows.length > 0 && !isDragMenuOpen;
	const isColumnHandleHovered = isColumn && hoveredColumns.length > 0 && !isDragMenuOpen;

	const hasMergedCells = useMemo(() => {
		const table = findTable(selection);
		if (!table) {
			return false;
		}

		const map = TableMap.get(table?.node);

		if (!map.hasMergedCells() || indexes.length < 1) {
			return false;
		}

		const { mapByColumn, mapByRow } = map;

		// this handle when hover to first column or row which has merged cells.
		if (
			hoveredCell &&
			hoveredCell.rowIndex !== undefined &&
			hoveredCell.colIndex !== undefined &&
			selection instanceof TextSelection
		) {
			const { rowIndex, colIndex } = hoveredCell;

			const mergedPositionInRow = findDuplicatePosition(mapByRow[rowIndex]);
			const mergedPositionInCol = findDuplicatePosition(mapByColumn[colIndex]);

			const hasMergedCellsInFirstRowOrColumn =
				direction === 'column'
					? mergedPositionInRow.includes(mapByRow[0][colIndex])
					: mergedPositionInCol.includes(mapByColumn[0][rowIndex]);

			const isHoveredOnFirstRowOrColumn =
				direction === 'column'
					? hoveredCell.rowIndex === 0 && hasMergedCellsInFirstRowOrColumn
					: hoveredCell.colIndex === 0 && hasMergedCellsInFirstRowOrColumn;

			if (isHoveredOnFirstRowOrColumn) {
				const mergedSizes =
					direction === 'column'
						? mapByRow[0].filter((el: number) => el === mapByRow[0][colIndex]).length
						: mapByColumn[0].filter((el: number) => el === mapByColumn[0][rowIndex]).length;

				const mergedSelection = hasMergedCellsInSelection(
					direction === 'column'
						? [colIndex, colIndex + mergedSizes - 1]
						: [rowIndex, rowIndex + mergedSizes - 1],
					direction,
				)(selection);

				return mergedSelection;
			}
		}

		return hasMergedCellsInSelection(indexes, direction)(selection);
	}, [indexes, selection, direction, hoveredCell]);

	const handleIconProps = {
		forceDefaultHandle,
		isHandleHovered: isColumnHandleHovered || isRowHandleHovered,
		hasMergedCells,
	};

	useEffect(() => {
		const dragHandleDivRefCurrent = dragHandleDivRef.current;

		if (dragHandleDivRefCurrent) {
			return draggable({
				element: dragHandleDivRefCurrent,
				canDrag: () => {
					return !hasMergedCells;
				},
				getInitialData() {
					return {
						localId: tableLocalId,
						type: `table-${direction}`,
						indexes,
					};
				},
				onGenerateDragPreview: ({ nativeSetDragImage }) => {
					setCustomNativeDragPreview({
						getOffset: ({ container }) => {
							const rect = container.getBoundingClientRect();
							if (browser.safari) {
								// See: https://product-fabric.atlassian.net/browse/ED-21442
								// We need to ensure that the preview is not overlaying screen content when the snapshot is taken, otherwise
								// safari will composite the screen text elements into the bitmap snapshot. The container is a wrapper which is already
								// positioned fixed at top/left 0.
								// IMPORTANT: we must not exceed more then the width of the container off-screen otherwise not preview will
								// be generated.
								container.style.left = `-${rect.width - 0.0001}px`;
							}
							if (isRow) {
								return { x: 12, y: rect.height / 2 };
							} else {
								return { x: rect.width / 2 + 4, y: 12 };
							}
						},
						render: function render({ container }) {
							setPreviewContainer(container);
							return () => setPreviewContainer(null);
						},
						nativeSetDragImage,
					});
				},
			});
		}
	}, [tableLocalId, direction, indexes, isRow, editorView.state.selection, hasMergedCells]);

	const showDragMenuAnchorId = isRow ? 'drag-handle-button-row' : 'drag-handle-button-column';

	return (
		<>
			<button
				type="button"
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
				className={ClassName.DRAG_HANDLE_BUTTON_CLICKABLE_ZONE}
				data-testid="table-drag-handle-clickable-zone-button"
				style={{
					height: isRow
						? // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
							`calc(100% - ${dragTableInsertColumnButtonSize}px)`
						: `${token('space.200', '16px')}`, // 16px here because it's the size of drag handle button's large side
					width: isRow
						? `${token('space.200', '16px')}` // 16px here because it's the size of drag handle button's large side
						: // eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
							`calc(100% - ${dragTableInsertColumnButtonSize}px)`,
					left: isRow ? `${token('space.050', '4px')}` : undefined,
					bottom: isColumn ? `${token('space.0', '0px')}` : undefined,
					alignSelf: isColumn ? 'none' : 'center',
					zIndex: isColumn ? '-1' : 'auto',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop
					pointerEvents: 'auto',
				}}
				onMouseUp={(e) => {
					// should toggle menu if current drag menu open.
					// return focus to editor so copying table selections whilst still works, i cannot call e.preventDefault in a mousemove event as this stops dragstart events from firing
					// -> this is bad for a11y but is the current standard new copy/paste keyboard shortcuts should be introduced instead
					editorView.focus();
					if (isDragMenuOpen) {
						toggleDragMenu && toggleDragMenu('mouse', e);
					}
				}}
				onClick={onClick}
			/>
			<button
				type="button"
				id={isDragMenuTarget ? showDragMenuAnchorId : undefined}
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
				className={classnames(ClassName.DRAG_HANDLE_BUTTON_CONTAINER, appearance, {
					[ClassName.DRAG_HANDLE_DISABLED]: hasMergedCells,
				})}
				ref={dragHandleDivRef}
				style={{
					transform: isColumn ? 'none' : 'rotate(90deg)',
					alignSelf: isColumn ? 'none' : 'center',
				}}
				data-testid="table-drag-handle-button"
				aria-label={formatMessage(isRow ? messages.rowDragHandle : messages.columnDragHandle)}
				aria-expanded={isDragMenuOpen && isDragMenuTarget ? 'true' : 'false'}
				aria-haspopup="menu"
				// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
				onMouseOver={onMouseOver}
				// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
				onMouseOut={onMouseOut}
				onMouseUp={(e) => {
					// return focus to editor so copying table selections whilst still works, i cannot call e.preventDefault in a mousemove event as this stops dragstart events from firing
					// -> this is bad for a11y but is the current standard new copy/paste keyboard shortcuts should be introduced instead
					editorView.focus();
					toggleDragMenu && toggleDragMenu('mouse', e);
				}}
				onClick={onClick}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						toggleDragMenu && toggleDragMenu('keyboard');
					}
				}}
			>
				{appearance !== 'placeholder' ? (
					//  cannot block pointer events in Firefox as it breaks Dragging functionality
					browser.gecko ? (
						// Ignored via go/ees005
						// eslint-disable-next-line react/jsx-props-no-spreading
						<HandleIconComponent {...handleIconProps} />
					) : (
						// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
						<span style={{ pointerEvents: 'none' }}>
							<HandleIconComponent
								// Ignored via go/ees005
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...handleIconProps}
							/>
						</span>
					)
				) : null}
			</button>
			{previewContainer &&
				previewWidth !== undefined &&
				previewHeight !== undefined &&
				ReactDOM.createPortal(
					<DragPreview direction={direction} width={previewWidth} height={previewHeight} />,
					previewContainer,
				)}
		</>
	);
};

const DragHandleComponentWithSharedState = ({
	isDragMenuTarget,
	tableLocalId,
	direction,
	appearance,
	indexes,
	forceDefaultHandle,
	previewHeight,
	previewWidth,
	onMouseOver,
	onMouseOut,
	toggleDragMenu,
	hoveredCell,
	onClick,
	editorView,
	intl,
	api,
}: DragHandleWithSharedStateProps & WrappedComponentProps) => {
	const { tableState } = useSharedPluginState(api, ['table']) as {
		tableState?: TableSharedStateInternal;
	};

	return (
		<DragHandleComponent
			isDragMenuTarget={isDragMenuTarget}
			tableLocalId={tableLocalId}
			direction={direction}
			appearance={appearance}
			indexes={indexes}
			forceDefaultHandle={forceDefaultHandle}
			previewWidth={previewWidth}
			previewHeight={previewHeight}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			toggleDragMenu={toggleDragMenu}
			hoveredCell={hoveredCell}
			onClick={onClick}
			editorView={editorView}
			intl={intl}
			hoveredColumns={tableState?.hoveredColumns}
			hoveredRows={tableState?.hoveredRows}
		/>
	);
};

export const DragHandle = injectIntl(DragHandleComponent);

export const DragHandleWithSharedState = injectIntl(DragHandleComponentWithSharedState);
