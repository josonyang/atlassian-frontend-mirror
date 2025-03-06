import React from 'react';

import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import type { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type { GetEditorFeatureFlags, getPosHandlerNode } from '@atlaskit/editor-common/types';
import type { Node as PmNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { findTable } from '@atlaskit/editor-tables';

import type { PluginInjectionAPI, TableSharedStateInternal } from '../types';

import TableComponent from './TableComponent';
import type { TableOptions } from './types';

// Ignored via go/ees005
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ForwardRef = (node: HTMLElement | null) => any;

type TableComponentWithSharedStateProps = {
	view: EditorView;
	options?: TableOptions;
	getNode: () => PmNode;
	dispatchAnalyticsEvent: DispatchAnalyticsEvent;
	getEditorFeatureFlags: GetEditorFeatureFlags;
	api?: PluginInjectionAPI;
	eventDispatcher: EventDispatcher;
	forwardRef: ForwardRef;
	getPos: getPosHandlerNode;
	allowColumnResizing?: boolean;
	allowControls?: boolean;
	allowTableAlignment?: boolean;
	allowTableResizing?: boolean;
};

/**
 * Use useSharedPluginState to control re-renders from plugin dependencies
 */
export const TableComponentWithSharedState = ({
	view,
	options,
	getNode,
	dispatchAnalyticsEvent,
	api,
	getEditorFeatureFlags,
	eventDispatcher,
	allowColumnResizing,
	allowControls,
	getPos,
	forwardRef,
	allowTableAlignment,
	allowTableResizing,
}: TableComponentWithSharedStateProps) => {
	const { widthState, tableState, mediaState, selectionState, editorViewModeState } =
		useSharedPluginState(api, ['width', 'table', 'media', 'selection', 'editorViewMode']);

	const isLivePageViewMode = editorViewModeState?.mode === 'view';

	if (!tableState) {
		return null;
	}

	const {
		isTableResizing,
		isHeaderColumnEnabled,
		isHeaderRowEnabled,
		ordering,
		isResizing,
		isInDanger,
		hoveredCell,
		hoveredRows,
		isTableHovered,
		isWholeTableInDanger,
	} = tableState as TableSharedStateInternal;

	/**
	 *  ED-19810
	 *  There is a getPos issue coming from this code. We need to apply this workaround for now and apply a patch
	 *  directly to confluence since this bug is now in production.
	 */
	let currentTablePos: number | undefined;
	try {
		currentTablePos = getPos ? getPos() : undefined;
	} catch (e) {
		currentTablePos = undefined;
	}

	const selectedTable = findTable(view.state.selection);

	const tablePos = selectedTable && selectedTable.start - 1;

	const tableActive =
		typeof currentTablePos === 'number' &&
		typeof tablePos === 'number' &&
		currentTablePos === tablePos &&
		!isTableResizing;

	return (
		<TableComponent
			view={view}
			allowColumnResizing={allowColumnResizing}
			eventDispatcher={eventDispatcher}
			getPos={getPos}
			isMediaFullscreen={mediaState?.isFullscreen}
			options={options}
			allowControls={allowControls}
			isHeaderRowEnabled={isHeaderRowEnabled}
			isHeaderColumnEnabled={isHeaderColumnEnabled}
			isDragAndDropEnabled={options?.isDragAndDropEnabled && !isLivePageViewMode}
			isTableScalingEnabled={options?.isTableScalingEnabled}
			allowTableAlignment={allowTableAlignment}
			allowTableResizing={allowTableResizing}
			tableActive={tableActive && !isLivePageViewMode}
			ordering={ordering}
			isResizing={isResizing}
			getNode={getNode}
			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			containerWidth={widthState!}
			contentDOM={forwardRef}
			getEditorFeatureFlags={getEditorFeatureFlags}
			dispatchAnalyticsEvent={dispatchAnalyticsEvent}
			pluginInjectionApi={api}
			isInDanger={!!isInDanger}
			hoveredRows={hoveredRows}
			hoveredCell={hoveredCell}
			isTableHovered={isTableHovered}
			isWholeTableInDanger={isWholeTableInDanger}
			selection={selectionState?.selection}
		/>
	);
};
