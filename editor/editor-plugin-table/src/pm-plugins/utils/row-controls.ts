import { parsePx } from '@atlaskit/editor-common/utils';
import type { Node as PMNode, Schema } from '@atlaskit/editor-prosemirror/model';
import type { Selection, Transaction } from '@atlaskit/editor-prosemirror/state';
import { safeInsert } from '@atlaskit/editor-prosemirror/utils';
import { TableMap } from '@atlaskit/editor-tables/table-map';
import { findTable, getSelectionRect, isRowSelected } from '@atlaskit/editor-tables/utils';

import { TableCssClassName as ClassName } from '../../types';
import { tableDeleteButtonSize } from '../../ui/consts';

export interface RowParams {
	startIndex: number;
	endIndex: number;
	height: number;
}

export const getRowHeights = (tableRef: HTMLTableElement): number[] => {
	const heights: number[] = [];
	const tableBody = tableRef.querySelector('tbody');
	if (tableBody) {
		const rows = tableBody.childNodes;
		for (let i = 0, count = rows.length; i < count; i++) {
			const row = rows[i] as HTMLTableRowElement;
			heights[i] = row.getBoundingClientRect().height + 1;

			// padding only gets applied when the container has sticky
			if (row.classList.contains('sticky') && i === 0) {
				const styles = window.getComputedStyle(row);
				const paddingTop = parsePx(styles.paddingTop || '');
				heights[i] -= paddingTop ? paddingTop + 1 : +1;
			}
		}
	}

	return heights;
};

export const getRowDeleteButtonParams = (
	rowsHeights: Array<number | undefined>,
	selection: Selection,
	offsetTop = 0,
): { top: number; indexes: number[] } | null => {
	const rect = getSelectionRect(selection);
	if (!rect) {
		return null;
	}
	let height = 0;
	let offset = offsetTop;
	// find the rows before the selection
	for (let i = 0; i < rect.top; i++) {
		const rowHeight = rowsHeights[i];
		if (rowHeight) {
			offset += rowHeight - 1;
		}
	}
	// these are the selected rows widths
	const indexes: number[] = [];
	for (let i = rect.top; i < rect.bottom; i++) {
		const rowHeight = rowsHeights[i];
		if (rowHeight) {
			height += rowHeight - 1;
			indexes.push(i);
		}
	}

	const top = offset + height / 2 - tableDeleteButtonSize / 2;
	return { top, indexes };
};

export const getRowsParams = (rowsHeights: Array<number | undefined>): RowParams[] => {
	const rows: RowParams[] = [];
	for (let i = 0, count = rowsHeights.length; i < count; i++) {
		const height = rowsHeights[i];
		if (!height) {
			continue;
		}
		let endIndex = rowsHeights.length;
		for (let k = i + 1, count = rowsHeights.length; k < count; k++) {
			if (rowsHeights[k]) {
				endIndex = k;
				break;
			}
		}
		rows.push({ startIndex: i, endIndex, height });
	}
	return rows;
};

export const getRowClassNames = (
	index: number,
	selection: Selection,
	hoveredRows: number[] = [],
	isInDanger?: boolean,
	isResizing?: boolean,
): string => {
	const classNames: string[] = [];
	if (isRowSelected(index)(selection) || (hoveredRows.indexOf(index) > -1 && !isResizing)) {
		classNames.push(ClassName.HOVERED_CELL_ACTIVE);
		if (isInDanger) {
			classNames.push(ClassName.HOVERED_CELL_IN_DANGER);
		}
	}
	return classNames.join(' ');
};

export const copyPreviousRow =
	(schema: Schema) => (insertNewRowIndex: number) => (tr: Transaction) => {
		const table = findTable(tr.selection);
		if (!table) {
			return tr;
		}

		const map = TableMap.get(table.node);
		const copyPreviousRowIndex = insertNewRowIndex - 1;

		if (insertNewRowIndex <= 0) {
			throw Error(
				`Row Index less or equal 0 isn't not allowed since there is not a previous to copy`,
			);
		}

		if (insertNewRowIndex > map.height) {
			return tr;
		}

		const tableNode = table.node;
		const {
			nodes: { tableRow },
		} = schema;

		const cellsInRow = map.cellsInRect({
			left: 0,
			right: map.width,
			top: copyPreviousRowIndex,
			bottom: copyPreviousRowIndex + 1,
		});
		const offsetIndexPosition = copyPreviousRowIndex * map.width;
		const offsetNextLineIndexPosition = insertNewRowIndex * map.width;
		const cellsPositionsInOriginalRow = map.map.slice(
			offsetIndexPosition,
			offsetIndexPosition + map.width,
		);

		const cellsPositionsInNextRow = map.map.slice(
			offsetNextLineIndexPosition,
			offsetNextLineIndexPosition + map.width,
		);

		const cells = [] as PMNode[];
		const fixRowspans: { pos: number; node: PMNode }[] = [];
		for (let i = 0; i < cellsPositionsInOriginalRow.length; ) {
			const pos = cellsPositionsInOriginalRow[i];
			const documentCellPos = pos + table.start;
			const node = tr.doc.nodeAt(documentCellPos);
			if (!node) {
				continue;
			}

			const attributes = {
				...node.attrs,
				colspan: 1,
				rowspan: 1,
			};

			const newCell = node.type.createAndFill(attributes);

			if (!newCell) {
				return tr;
			}

			if (cellsPositionsInNextRow.indexOf(pos) > -1) {
				fixRowspans.push({ pos: documentCellPos, node });
			} else if (cellsInRow.indexOf(pos) > -1) {
				if (node.attrs.colspan > 1) {
					const newCellWithColspanFixed = node.type.createAndFill({
						...attributes,
						colspan: node.attrs.colspan,
					});

					if (!newCellWithColspanFixed) {
						return tr;
					}

					cells.push(newCellWithColspanFixed);
					i = i + node.attrs.colspan;

					continue;
				}
				cells.push(newCell);
			} else {
				cells.push(newCell);
			}

			i++;
		}

		fixRowspans.forEach((cell) => {
			tr.setNodeMarkup(cell.pos, undefined, {
				...cell.node.attrs,
				rowspan: cell.node.attrs.rowspan + 1,
			});
		});

		const cloneRow = tableNode.child(copyPreviousRowIndex);
		let rowPos = table.start;
		for (let i = 0; i < insertNewRowIndex; i++) {
			rowPos += tableNode.child(i).nodeSize;
		}

		return safeInsert(tableRow.createChecked(cloneRow.attrs, cells, cloneRow.marks), rowPos)(tr);
	};
