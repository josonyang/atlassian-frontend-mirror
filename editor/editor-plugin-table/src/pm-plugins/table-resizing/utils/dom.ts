import { tableCellBorderWidth, tableMarginTop } from '@atlaskit/editor-common/styles';
import { closestElement, containsClassName, parsePx } from '@atlaskit/editor-common/utils';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import { TableCssClassName as ClassName } from '../../../types';
import { getPluginState as getMainPluginState } from '../../plugin-factory';
import { colWidthsForRow } from '../../utils/column-controls';
import { getRowHeights } from '../../utils/row-controls';

export const updateControls = () => (state: EditorState) => {
	const { tableRef } = getMainPluginState(state);
	if (!tableRef) {
		return;
	}
	const tr = tableRef.querySelector('tr');
	if (!tr) {
		return;
	}
	const wrapper = tableRef.parentElement;
	if (!(wrapper && wrapper.parentElement)) {
		return;
	}

	const rowControls = wrapper.parentElement.querySelectorAll<HTMLElement>(
		`.${ClassName.ROW_CONTROLS_BUTTON_WRAP}`,
	);
	const numberedRows = wrapper.parentElement.querySelectorAll<HTMLElement>(
		ClassName.NUMBERED_COLUMN_BUTTON,
	);

	syncStickyRowToTable(tableRef);

	const rowHeights = getRowHeights(tableRef);

	// update rows controls height on resize
	for (let i = 0, count = rowControls.length; i < count; i++) {
		const height = rowHeights[i];
		if (height) {
			rowControls[i].style.height = `${height}px`;

			if (numberedRows.length) {
				numberedRows[i].style.height = `${height}px`;
			}
		}
	}
};

export const isClickNear = (event: MouseEvent, click: { x: number; y: number }): boolean => {
	const dx = click.x - event.clientX,
		dy = click.y - event.clientY;
	return dx * dx + dy * dy < 100;
};

export const getResizeCellPos = (view: EditorView, event: MouseEvent): number | null => {
	// Ignored via go/ees005
	// eslint-disable-next-line @atlaskit/editor/no-as-casting
	const target = event.target as HTMLElement;

	if (!containsClassName(target, ClassName.RESIZE_HANDLE_DECORATION)) {
		return null;
	}

	const tableCell = closestElement(target, 'td, th');

	if (!tableCell) {
		return null;
	}

	const cellStartPosition = view.posAtDOM(tableCell, 0);
	return cellStartPosition - 1;
};

export const updateStickyMargins = (table: HTMLElement) => {
	const row = table.querySelector('tr.sticky');
	if (!row) {
		table.style.marginTop = '';
		return;
	}

	const paddingTop = parsePx(window.getComputedStyle(row).paddingTop || '') || 0;

	const firstRowHeight = row.getBoundingClientRect().height - paddingTop - tableCellBorderWidth;

	table.style.marginTop = `${tableMarginTop + firstRowHeight}px`;
};

const applyColWidthsToStickyRow = (
	// @ts-ignore - CCFE error TS6133: 'colGroup' is declared but its value is never read.
	colGroup: HTMLTableColElement | null,
	headerRow: HTMLTableRowElement,
) => {
	// sync column widths for the sticky row
	const newCols = colWidthsForRow(headerRow);

	if (newCols) {
		headerRow.style.gridTemplateColumns = newCols;
	}
};

export const syncStickyRowToTable = (tableRef?: HTMLElement | null) => {
	if (!tableRef) {
		return;
	}

	const headerRow = tableRef.querySelector('tr[data-header-row]') as HTMLTableRowElement;

	if (!headerRow) {
		return;
	}

	applyColWidthsToStickyRow(tableRef.querySelector('colgroup'), headerRow);
	applyTableWidthToStickyRow(tableRef, headerRow);
};

const applyTableWidthToStickyRow = (tableRef: HTMLElement, headerRow: HTMLTableRowElement) => {
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const tbody = tableRef.querySelector('tbody')!;
	const wrapper = tableRef.parentElement;

	if (tbody && wrapper) {
		// when resizing in Chrome, clientWidth will give us 759px
		// but toggling the sticky class will reset it to 760px.
		//
		// both elements in the dom + inspector will
		// be the same width but at layout will be different..
		const newWidth = Math.min(tbody.offsetWidth + 1, wrapper.offsetWidth);

		headerRow.style.width = `${newWidth}px`;
		headerRow.scrollLeft = wrapper.scrollLeft;
	}
};
