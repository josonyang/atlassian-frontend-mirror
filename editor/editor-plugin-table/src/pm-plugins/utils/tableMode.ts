import { ACTION_SUBJECT, EVENT_TYPE, TABLE_ACTION } from '@atlaskit/editor-common/analytics';
import { TableSharedCssClassName } from '@atlaskit/editor-common/styles';
import { hasTableBeenResized } from '@atlaskit/editor-common/table';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { findTable } from '@atlaskit/editor-tables/utils';

import type { PluginInjectionAPI, TableSharedStateInternal } from '../../types';
import {
	type TableMeasurement,
	applyTableMeasurement,
	getTableMeasurement,
} from '../transforms/content-mode';

type ContentModePluginOptions = {
	allowColumnResizing: boolean;
	allowTableResizing: boolean;
	isFullPageEditor: boolean;
};

export const isContentModeSupported = ({
	allowColumnResizing,
	allowTableResizing,
	isFullPageEditor,
}: ContentModePluginOptions): boolean => {
	return allowColumnResizing && allowTableResizing && isFullPageEditor;
};

/**
 * Iterates all top-level tables in the document, and for those in content mode,
 * measures rendered column widths and sets colwidth + table width attributes
 * in a single batched transaction.
 */
export const applyMeasuredWidthToAllTables = (
	view: EditorView,
	pluginInjectionApi?: PluginInjectionAPI,
): void => {
	const {
		state: { doc, schema },
	} = view;
	let tr = view.state.tr;
	const { table } = schema.nodes;
	let modified = false;
	const measuredTables: Array<{
		measurement: TableMeasurement;
		node: PMNode;
		offset: number;
	}> = [];

	// modify only top-level tables
	doc.forEach((node, offset) => {
		if (node.type !== table || (hasTableBeenResized(node) && node.attrs.layout !== 'align-start')) {
			return;
		}

		const domNode = view.domAtPos(offset + 1).node;
		const tableWrapper =
			domNode instanceof HTMLElement
				? domNode.closest(`.${TableSharedCssClassName.TABLE_VIEW_CONTENT_WRAP}`)
				: null;
		const tableRef = tableWrapper?.querySelector<HTMLTableElement>('table');
		if (!tableRef) {
			return;
		}

		measuredTables.push({
			node,
			offset,
			measurement: getTableMeasurement(tableRef),
		});
	});

	measuredTables.forEach(({ node, offset, measurement }) => {
		tr = applyTableMeasurement(tr, node, measurement, offset);
		modified = true;
	});

	if (modified) {
		pluginInjectionApi?.analytics?.actions?.attachAnalyticsEvent({
			action: TABLE_ACTION.FIT_TO_CONTENT_AUTO_CONVERTED,
			actionSubject: ACTION_SUBJECT.TABLE,
			actionSubjectId: null,
			eventType: EVENT_TYPE.TRACK,
			attributes: {
				editorContainerWidth: pluginInjectionApi?.width?.sharedState.currentState()?.width ?? 0,
				totalTablesResized: measuredTables.length,
				measurements: measuredTables.map(({ measurement }) => ({
					tableWidth: measurement.tableWidth,
					totalColumnCount: measurement.colWidths.length,
				})),
			},
		})(tr);

		view.dispatch(tr.setMeta('addToHistory', false));
	}
};

/**
 * Temporarily overrides inline styles on the table and its surrounding containers so the browser
 * lays columns out with `table-layout: auto`, takes a content-width measurement, and then
 * **resets every modified style** so no temporary overrides leak into the rendered output.
 */
export const measureTableWithAutoLayout = (tableRef: HTMLTableElement): TableMeasurement => {
	const cols = Array.from(tableRef.querySelectorAll<HTMLElement>(':scope > colgroup > col'));
	const contentWrap = tableRef.closest<HTMLElement>(
		`.${TableSharedCssClassName.TABLE_VIEW_CONTENT_WRAP}`,
	);
	const resizerContainer = contentWrap?.querySelector<HTMLElement>(
		`.${TableSharedCssClassName.TABLE_RESIZER_CONTAINER}`,
	);
	const resizerItem = resizerContainer?.querySelector<HTMLElement>('.resizer-item.display-handle');

	// Capture current inline styles so we can restore them after measurement
	const prevTableWidth = tableRef.style.width;
	const prevTableLayout = tableRef.style.tableLayout;
	const prevColWidths = cols.map((col) => col.style.width);
	const prevResizerItemWidth = resizerItem?.style.width;

	// Apply temporary styles for content-based measurement
	tableRef.style.width = '';
	tableRef.style.tableLayout = 'auto';
	cols.forEach((col) => (col.style.width = ''));

	if (resizerContainer) {
		// favour CSS var to align with the table first render state, which gets reset
		// once resized by user. By doing this we avoid the need to any 'reset' work after
		// measurement and ensures it works if the table has been resized or not in the session.
		resizerContainer.style.width = 'var(--ak-editor-table-width)';
		resizerContainer.style.setProperty('--ak-editor-table-width', 'max-content');
	}

	if (resizerItem) {
		resizerItem.style.width = 'max-content';
	}

	const measurement = getTableMeasurement(tableRef);

	// Reset all inline styles back to their previous values
	tableRef.style.width = prevTableWidth;
	tableRef.style.tableLayout = prevTableLayout;
	cols.forEach((col, i) => (col.style.width = prevColWidths[i]));

	if (resizerItem) {
		resizerItem.style.width = prevResizerItemWidth ?? '';
	}

	return measurement;
};

/**
 * Used to measure a selected table width with it's content being laid out natively by the browser
 */
export const applyMeasuredWidthToSelectedTable = (
	view: EditorView,
	api?: PluginInjectionAPI,
): void => {
	const tableObject = findTable(view.state.selection);
	if (!tableObject) {
		return;
	}

	const { node, pos } = tableObject;

	const tableState = api?.table.sharedState.currentState() as TableSharedStateInternal | undefined;

	if (!tableState?.tableRef) {
		return;
	}

	// Instead of dispatching a transaction to "strip widths" and then waiting
	// for a rAF to measure natural column widths, directly update the DOM elements,
	// take a measurement, and reset styles so no temporary overrides persist.
	const measurement = measureTableWithAutoLayout(tableState.tableRef);

	const tr = applyTableMeasurement(view.state.tr, node, measurement, pos);

	api?.analytics?.actions?.attachAnalyticsEvent({
		action: TABLE_ACTION.FIT_TO_CONTENT_ON_DEMAND,
		actionSubject: ACTION_SUBJECT.TABLE,
		actionSubjectId: null,
		eventType: EVENT_TYPE.TRACK,
		attributes: {
			editorContainerWidth: api?.width?.sharedState.currentState()?.width ?? 0,
			tableWidth: measurement.tableWidth,
			totalColumnCount: measurement.colWidths.length,
		},
	})(tr);

	view.dispatch(tr);
};
