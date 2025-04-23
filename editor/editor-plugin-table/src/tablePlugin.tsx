import React, { useEffect } from 'react';

import {
	tableCell,
	tableCellWithNestedTable,
	tableHeader,
	tableHeaderWithNestedTable,
	tableRow,
	tableRowWithNestedTable,
} from '@atlaskit/adf-schema';
import {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
	INPUT_METHOD,
	TABLE_ACTION,
} from '@atlaskit/editor-common/analytics';
import { browser } from '@atlaskit/editor-common/browser';
import { ErrorBoundary } from '@atlaskit/editor-common/error-boundary';
import { getDomRefFromSelection } from '@atlaskit/editor-common/get-dom-ref-from-selection';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import { IconTable } from '@atlaskit/editor-common/icons';
import { toggleTable, tooltip } from '@atlaskit/editor-common/keymaps';
import { toolbarInsertBlockMessages as messages } from '@atlaskit/editor-common/messages';
import {
	getParentOfTypeCount,
	getPositionAfterTopParentNodeOfType,
} from '@atlaskit/editor-common/nesting';
import { editorCommandToPMCommand } from '@atlaskit/editor-common/preset';
import { ResizerBreakoutModeLabel } from '@atlaskit/editor-common/resizer';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { Command, EditorPlugin, GetEditorContainerWidth } from '@atlaskit/editor-common/types';
import { WithPluginState } from '@atlaskit/editor-common/with-plugin-state';
import type { Transaction } from '@atlaskit/editor-prosemirror/state';
import { hasParentNodeOfType, safeInsert } from '@atlaskit/editor-prosemirror/utils';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { akEditorFloatingPanelZIndex } from '@atlaskit/editor-shared-styles';
import { tableEditing } from '@atlaskit/editor-tables/pm-plugins';
import { fg } from '@atlaskit/platform-feature-flags';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import { tableNodeSpecWithFixedToDOM } from './nodeviews/toDOM';
import { createPlugin as createTableAnalyticsPlugin } from './pm-plugins/analytics/plugin';
import { pluginKey as tableAnalyticsPluginKey } from './pm-plugins/analytics/plugin-key';
import { insertTableWithNestingSupport, insertTableWithSize } from './pm-plugins/commands/insert';
import { pluginConfig } from './pm-plugins/create-plugin-config';
import { createPlugin as createDecorationsPlugin } from './pm-plugins/decorations/plugin';
import { createPlugin as createDragAndDropPlugin } from './pm-plugins/drag-and-drop/plugin';
import { pluginKey as dragAndDropPluginKey } from './pm-plugins/drag-and-drop/plugin-key';
import { keymapPlugin } from './pm-plugins/keymap';
import { createPlugin } from './pm-plugins/main';
import { pluginKey } from './pm-plugins/plugin-key';
import { createPlugin as createTableSafariDeleteCompositionTextIssueWorkaroundPlugin } from './pm-plugins/safari-delete-composition-text-issue-workaround';
import { createPlugin as createStickyHeadersPlugin } from './pm-plugins/sticky-headers/plugin';
import { pluginKey as stickyHeadersPluginKey } from './pm-plugins/sticky-headers/plugin-key';
import { findStickyHeaderForTable } from './pm-plugins/sticky-headers/util';
import { createPlugin as createTableOverflowAnalyticsPlugin } from './pm-plugins/table-analytics';
import { createPlugin as createTableLocalIdPlugin } from './pm-plugins/table-local-id';
import { createPlugin as createFlexiResizingPlugin } from './pm-plugins/table-resizing/plugin';
import { getPluginState as getFlexiResizingPlugin } from './pm-plugins/table-resizing/plugin-factory';
import { pluginKey as tableResizingPluginKey } from './pm-plugins/table-resizing/plugin-key';
import { tableSelectionKeymapPlugin } from './pm-plugins/table-selection-keymap';
import {
	createPlugin as createSizeSelectorPlugin,
	pluginKey as sizeSelectorPluginKey,
} from './pm-plugins/table-size-selector';
import {
	createPlugin as createTableWidthPlugin,
	pluginKey as tableWidthPluginKey,
} from './pm-plugins/table-width';
import { createPlugin as createTableWidthInCommentFixPlugin } from './pm-plugins/table-width-in-comment-fix';
import { createTableWithWidth } from './pm-plugins/utils/create';
import { createPlugin as createViewModeSortPlugin } from './pm-plugins/view-mode-sort';
import type { TablePlugin, TablePluginOptions } from './tablePluginType';
import type { ColumnResizingPluginState, TableSharedStateInternal } from './types';
import { ContentComponent } from './ui/ContentComponent';
import FloatingContextualButton from './ui/FloatingContextualButton';
import FloatingContextualMenu from './ui/FloatingContextualMenu';
import FloatingDeleteButton from './ui/FloatingDeleteButton';
import FloatingDragMenu from './ui/FloatingDragMenu';
// Ignored via go/ees005
// eslint-disable-next-line import/no-named-as-default
import FloatingInsertButton from './ui/FloatingInsertButton';
import { FloatingToolbarLabel } from './ui/FloatingToolbarLabel/FloatingToolbarLabel';
import { GlobalStylesWrapper } from './ui/global-styles';
import { SizeSelector } from './ui/SizeSelector';
import { FullWidthDisplay } from './ui/TableFullWidthLabel';
import { getToolbarConfig } from './ui/toolbar';

const defaultGetEditorFeatureFlags = () => ({});

/**
 * Table plugin to be added to an `EditorPresetBuilder` and used with `ComposableEditor`
 * from `@atlaskit/editor-core`.
 */
const tablePlugin: TablePlugin = ({ config: options, api }) => {
	const editorViewRef: Record<'current', EditorView | null> = { current: null };
	const defaultGetEditorContainerWidth: GetEditorContainerWidth = () => {
		return (
			api?.width?.sharedState.currentState() ?? {
				width: document?.body?.offsetWidth ?? 500,
			}
		);
	};
	const editorAnalyticsAPI = api?.analytics?.actions;
	const ariaNotifyPlugin = api?.accessibilityUtils?.actions.ariaNotify;

	const isTableFixedColumnWidthsOptionEnabled =
		options?.getEditorFeatureFlags?.().tableWithFixedColumnWidthsOption || false;

	const shouldUseIncreasedScalingPercent =
		options?.isTableScalingEnabled &&
		(isTableFixedColumnWidthsOptionEnabled ||
			// When in comment editor, we need the scaling percent to be 40% while tableWithFixedColumnWidthsOption is not visible
			options?.isCommentEditor);

	const isTableSelectorEnabled =
		// eslint-disable-next-line @atlaskit/platform/no-preconditioning
		!options?.isChromelessEditor &&
		!options?.isCommentEditor &&
		options?.getEditorFeatureFlags?.().tableSelector &&
		editorExperiment('platform_editor_controls', 'variant1') &&
		fg('platform_editor_controls_table_picker');

	return {
		name: 'table',

		// Use getSharedState to store fullWidthEnabled and wasFullWidthModeEnabled to guarantee access
		// to most up to date values - passing to createPluginState will not re-initialise the state
		getSharedState: (editorState) => {
			if (!editorState) {
				return undefined;
			}

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const tablePluginState = pluginKey.getState(editorState)!;
			const tableResizingPluginState = getFlexiResizingPlugin(editorState);
			const tableWidthResizingPluginState = tableWidthPluginKey.getState(editorState);

			const stickyHeadersState = stickyHeadersPluginKey.getState(editorState);
			const stickyHeader = stickyHeadersState
				? findStickyHeaderForTable(stickyHeadersState, tablePluginState?.tablePos)
				: undefined;

			const dragAndDropState = dragAndDropPluginKey.getState(editorState);

			const sharedStateInternal: TableSharedStateInternal = {
				isFullWidthModeEnabled: !!options?.fullWidthEnabled,
				wasFullWidthModeEnabled: !!options?.wasFullWidthEnabled,
				isHeaderRowEnabled: tablePluginState.isHeaderRowEnabled,
				isHeaderColumnEnabled: tablePluginState.isHeaderColumnEnabled,
				ordering: tablePluginState.ordering,
				isResizing: !!(
					tableResizingPluginState?.dragging || tableWidthResizingPluginState?.resizing
				),
				isTableResizing: tableWidthResizingPluginState?.resizing,
				isInDanger: tablePluginState.isInDanger,
				hoveredRows: tablePluginState.hoveredRows,
				hoveredColumns: tablePluginState.hoveredColumns,
				hoveredCell: tablePluginState.hoveredCell,
				isTableHovered: tablePluginState.isTableHovered,
				isWholeTableInDanger: tablePluginState.isWholeTableInDanger,
				// IMPORTANT: Need to continue to pass tableNode to control re-renders
				// TableComponent listens for node attribute changes to update colgroups
				tableNode: tablePluginState.tableNode,
				widthToWidest: tablePluginState.widthToWidest,
				resizingTableLocalId: tableWidthResizingPluginState?.tableLocalId,
				tableRef: tablePluginState?.tableRef ?? undefined,
				resizingTableRef: tableWidthResizingPluginState?.tableRef ?? undefined,
				tablePos: tablePluginState.tablePos,
				targetCellPosition: tablePluginState.targetCellPosition,
				isContextualMenuOpen: tablePluginState.isContextualMenuOpen,
				pluginConfig: tablePluginState.pluginConfig,
				insertColumnButtonIndex: tablePluginState.insertColumnButtonIndex,
				insertRowButtonIndex: tablePluginState.insertRowButtonIndex,
				isDragAndDropEnabled: tablePluginState.isDragAndDropEnabled,
				tableWrapperTarget: tablePluginState.tableWrapperTarget,
				isCellMenuOpenByKeyboard: tablePluginState.isCellMenuOpenByKeyboard,
				stickyHeader,
				dragMenuDirection: dragAndDropState?.dragMenuDirection,
				dragMenuIndex: dragAndDropState?.dragMenuIndex,
				isDragMenuOpen: dragAndDropState?.isDragMenuOpen,
			};

			return sharedStateInternal;
		},

		actions: {
			insertTable:
				(analyticsPayload): Command =>
				(state, dispatch) => {
					if (
						options?.tableOptions?.allowNestedTables &&
						fg('platform_editor_use_nested_table_pm_nodes')
					) {
						return editorCommandToPMCommand(
							insertTableWithNestingSupport(
								{
									isTableScalingEnabled: options?.isTableScalingEnabled,
									isTableAlignmentEnabled: options?.tableOptions.allowTableAlignment,
									isFullWidthModeEnabled: options?.fullWidthEnabled,
									isCommentEditor: options?.isCommentEditor,
									isChromelessEditor: options?.isChromelessEditor,
									isTableResizingEnabled: options?.tableOptions.allowTableResizing,
								},
								api,
								analyticsPayload,
							),
						)(state, dispatch);
					} else {
						const node = createTableWithWidth({
							isTableScalingEnabled: options?.isTableScalingEnabled,
							isTableAlignmentEnabled: options?.tableOptions.allowTableAlignment,
							isFullWidthModeEnabled: options?.fullWidthEnabled,
							isCommentEditor: options?.isCommentEditor,
							isChromelessEditor: options?.isChromelessEditor,
							isTableResizingEnabled: options?.tableOptions.allowTableResizing,
						})(state.schema);

						return (
							api?.contentInsertion?.actions?.insert({
								state,
								dispatch,
								node,
								options: {
									selectNodeInserted: false,
									analyticsPayload: {
										...analyticsPayload,
										attributes: {
											...analyticsPayload.attributes,
											localId: node.attrs.localId,
										},
									},
								},
							}) ?? false
						);
					}
				},
		},

		commands: {
			insertTableWithSize: fg('platform_editor_use_nested_table_pm_nodes')
				? (rowsCount, colsCount, inputMethod) =>
						insertTableWithNestingSupport(
							{
								isTableScalingEnabled: options?.isTableScalingEnabled,
								isTableAlignmentEnabled: options?.tableOptions.allowTableAlignment,
								isFullWidthModeEnabled: options?.fullWidthEnabled,
								isCommentEditor: options?.isCommentEditor,
								isChromelessEditor: options?.isChromelessEditor,
								isTableResizingEnabled: options?.tableOptions.allowTableResizing,
								createTableProps: {
									rowsCount,
									colsCount,
								},
							},
							api,
							{
								action: ACTION.INSERTED,
								actionSubject: ACTION_SUBJECT.DOCUMENT,
								actionSubjectId: ACTION_SUBJECT_ID.TABLE,
								attributes: {
									inputMethod: inputMethod ?? INPUT_METHOD.PICKER,
									totalRowCount: rowsCount,
									totalColumnCount: colsCount,
								},
								eventType: EVENT_TYPE.TRACK,
							},
						)
				: insertTableWithSize(
						options?.fullWidthEnabled,
						options?.isTableScalingEnabled,
						options?.tableOptions.allowTableAlignment,
						api?.analytics?.actions,
						options?.isCommentEditor,
					),
		},

		nodes() {
			const { allowColumnResizing } = pluginConfig(options?.tableOptions);
			// TODO: ED-25901 - We need to move this into a plugin config option so we don't accidentally enable nested nodes in Jira
			const isNestingSupported = Boolean(options?.tableOptions?.allowNestedTables);

			return isNestingSupported
				? [
						{
							name: 'table',
							node: tableNodeSpecWithFixedToDOM({
								allowColumnResizing: Boolean(allowColumnResizing),
								tableResizingEnabled: Boolean(options?.tableOptions.allowTableResizing),
								getEditorContainerWidth: defaultGetEditorContainerWidth,
								isNestingSupported,
							}),
						},
						{ name: 'tableHeader', node: tableHeaderWithNestedTable },
						{ name: 'tableRow', node: tableRowWithNestedTable },
						{ name: 'tableCell', node: tableCellWithNestedTable },
					]
				: [
						{
							name: 'table',
							node: tableNodeSpecWithFixedToDOM({
								allowColumnResizing: Boolean(allowColumnResizing),
								tableResizingEnabled: Boolean(options?.tableOptions.allowTableResizing),
								getEditorContainerWidth: defaultGetEditorContainerWidth,
								isNestingSupported,
							}),
						},
						{ name: 'tableHeader', node: tableHeader },
						{ name: 'tableRow', node: tableRow },
						{ name: 'tableCell', node: tableCell },
					];
		},

		pmPlugins() {
			const plugins: ReturnType<NonNullable<EditorPlugin['pmPlugins']>> = [
				{
					name: 'table',
					plugin: ({
						dispatchAnalyticsEvent,
						dispatch,
						portalProviderAPI,
						nodeViewPortalProviderAPI,
						eventDispatcher,
						getIntl,
					}) => {
						const {
							fullWidthEnabled,
							wasFullWidthEnabled,
							tableOptions,
							getEditorFeatureFlags,
							dragAndDropEnabled,
							isTableScalingEnabled,
							isCommentEditor,
							isChromelessEditor,
						} = options || ({} as TablePluginOptions);

						return createPlugin(
							dispatchAnalyticsEvent,
							dispatch,
							portalProviderAPI,
							nodeViewPortalProviderAPI,
							eventDispatcher,
							pluginConfig(tableOptions),
							defaultGetEditorContainerWidth,
							getEditorFeatureFlags || defaultGetEditorFeatureFlags,
							getIntl,
							fullWidthEnabled,
							wasFullWidthEnabled,
							dragAndDropEnabled,
							editorAnalyticsAPI,
							api,
							isTableScalingEnabled,
							shouldUseIncreasedScalingPercent,
							isCommentEditor,
							isChromelessEditor,
						);
					},
				},
				{
					name: 'tablePMColResizing',
					plugin: ({ dispatch, nodeViewPortalProviderAPI }) => {
						const { fullWidthEnabled, tableOptions, getEditorFeatureFlags, isTableScalingEnabled } =
							options || ({} as TablePluginOptions);
						const { allowColumnResizing } = pluginConfig(tableOptions);
						return allowColumnResizing
							? createFlexiResizingPlugin(
									dispatch,
									{
										lastColumnResizable: !fullWidthEnabled,
									} as ColumnResizingPluginState,
									defaultGetEditorContainerWidth,
									getEditorFeatureFlags || defaultGetEditorFeatureFlags,
									api,
									nodeViewPortalProviderAPI,
									editorAnalyticsAPI,
									isTableScalingEnabled || false,
									!!options?.isCommentEditor,
								)
							: undefined;
					},
				},
				{ name: 'tableEditing', plugin: () => createDecorationsPlugin() },
				// Needs to be lower priority than editor-tables.tableEditing
				// plugin as it is currently swallowing backspace events inside tables
				{
					name: 'tableKeymap',
					plugin: ({ getIntl, nodeViewPortalProviderAPI }) => {
						const {
							dragAndDropEnabled,
							isTableScalingEnabled = false,
							fullWidthEnabled = false,
							isCommentEditor = false,
							isChromelessEditor = false,
							tableOptions,
						} = options || ({} as TablePluginOptions);

						return keymapPlugin(
							defaultGetEditorContainerWidth,
							api,
							nodeViewPortalProviderAPI,
							editorAnalyticsAPI,
							dragAndDropEnabled,
							isTableScalingEnabled,
							tableOptions?.allowTableAlignment,
							fullWidthEnabled,
							api,
							getIntl,
							isTableFixedColumnWidthsOptionEnabled,
							shouldUseIncreasedScalingPercent,
							isCommentEditor,
							isChromelessEditor,
							tableOptions?.allowTableResizing,
						);
					},
				},
				{
					name: 'tableSelectionKeymap',
					plugin: ({ getIntl }) => tableSelectionKeymapPlugin(api, getIntl),
				},
				{
					name: 'tableEditing',
					plugin: () => {
						const { dragAndDropEnabled } = options || ({} as TablePluginOptions);

						return tableEditing({
							reportFixedTable: ({ tr, reason }: { tr: Transaction; reason: string }) => {
								editorAnalyticsAPI?.attachAnalyticsEvent({
									action: TABLE_ACTION.FIXED,
									actionSubject: ACTION_SUBJECT.TABLE,
									actionSubjectId: null,
									attributes: {
										reason,
									},
									eventType: EVENT_TYPE.TRACK,
								})(tr);
							},
							dragAndDropEnabled,
						}) as SafePlugin;
					},
				},
				{
					name: 'tableStickyHeaders',
					plugin: ({ dispatch, eventDispatcher }) =>
						options && options.tableOptions.stickyHeaders
							? createStickyHeadersPlugin(dispatch, () => [])
							: undefined,
				},
				{
					name: 'tableDragAndDrop',
					plugin: ({ dispatch }) => {
						return options?.dragAndDropEnabled
							? createDragAndDropPlugin(
									dispatch,
									editorAnalyticsAPI,
									options?.isTableScalingEnabled,
									isTableFixedColumnWidthsOptionEnabled,
									options.isCommentEditor,
								)
							: undefined;
					},
				},
				{
					name: 'tableViewModeSort',
					plugin: ({ nodeViewPortalProviderAPI }) => {
						return api?.editorViewMode
							? createViewModeSortPlugin(api, nodeViewPortalProviderAPI)
							: undefined;
					},
				},
				{
					name: 'tableLocalId',
					plugin: ({ dispatch }) => createTableLocalIdPlugin(dispatch),
				},
				{
					name: 'tableWidth',
					plugin: ({ dispatchAnalyticsEvent, dispatch }) =>
						options?.tableOptions.allowTableResizing
							? createTableWidthPlugin(
									dispatch,
									dispatchAnalyticsEvent,
									options.fullWidthEnabled ?? false,
									options.isTableScalingEnabled ?? false,
									options.tableOptions.allowTableResizing ?? false,
									options.isCommentEditor ?? false,
								)
							: undefined,
				},
				{
					name: 'tableWidthInCommentFix',
					plugin: ({ dispatch }) =>
						options?.tableOptions.allowTableResizing && options?.isCommentEditor
							? createTableWidthInCommentFixPlugin(
									dispatch,
									options.tableOptions.allowTableAlignment ?? false,
								)
							: undefined,
				},
				// TODO: ED-26961 - should be deprecated and eventually replaced with 'tableAnalyticsPlugin'
				{
					name: 'tableOverflowAnalyticsPlugin',
					plugin: ({ dispatch, dispatchAnalyticsEvent }) =>
						createTableOverflowAnalyticsPlugin(
							dispatch,
							dispatchAnalyticsEvent,
							options?.tableOptions.allowTableResizing ?? false,
						),
				},
				{
					name: 'tableAnalyticsPlugin',
					plugin: ({ dispatch, dispatchAnalyticsEvent }) =>
						createTableAnalyticsPlugin(dispatch, dispatchAnalyticsEvent),
				},
				{
					name: 'tableGetEditorViewReferencePlugin',
					plugin: () => {
						return new SafePlugin({
							view: (editorView) => {
								editorViewRef.current = editorView;
								return {
									destroy: () => {
										editorViewRef.current = null;
									},
								};
							},
						});
					},
				},
				{
					name: 'tableSizeSelectorPlugin',
					plugin: ({ dispatch }) =>
						isTableSelectorEnabled ? createSizeSelectorPlugin(dispatch) : undefined,
				},
			];

			// Workaround for table element breaking issue caused by composition event with an inputType of deleteCompositionText.
			// https://github.com/ProseMirror/prosemirror/issues/934
			if (browser.safari) {
				plugins.push({
					name: 'tableSafariDeleteCompositionTextIssueWorkaround',
					plugin: () => {
						return createTableSafariDeleteCompositionTextIssueWorkaroundPlugin();
					},
				});
			}

			return plugins;
		},

		contentComponent({
			editorView,
			popupsMountPoint,
			popupsBoundariesElement,
			popupsScrollableElement,
			dispatchAnalyticsEvent,
		}) {
			if (editorExperiment('platform_editor_usesharedpluginstateselector', true)) {
				return (
					<ContentComponent
						api={api}
						editorView={editorView}
						dispatchAnalyticsEvent={dispatchAnalyticsEvent}
						options={options}
						popupsMountPoint={popupsMountPoint}
						popupsBoundariesElement={popupsBoundariesElement}
						popupsScrollableElement={popupsScrollableElement}
						defaultGetEditorContainerWidth={defaultGetEditorContainerWidth}
						defaultGetEditorFeatureFlags={defaultGetEditorFeatureFlags}
					/>
				);
			}

			return (
				<ErrorBoundary
					component={ACTION_SUBJECT.TABLES_PLUGIN}
					dispatchAnalyticsEvent={dispatchAnalyticsEvent}
					fallbackComponent={null}
				>
					<GlobalStylesWrapper
						featureFlags={api?.featureFlags?.sharedState.currentState()}
						isDragAndDropEnabledOption={options?.dragAndDropEnabled}
						api={api}
					/>
					<WithPluginState
						plugins={{
							tableAnalyticsPluginState: tableAnalyticsPluginKey,
							tablePluginState: pluginKey,
							tableWidthPluginState: tableWidthPluginKey,
							tableResizingPluginState: tableResizingPluginKey,
							stickyHeadersState: stickyHeadersPluginKey,
							dragAndDropState: dragAndDropPluginKey,
							sizeSelectorPluginState: sizeSelectorPluginKey,
						}}
						render={({
							tableResizingPluginState: resizingPluginState,
							stickyHeadersState,
							tablePluginState,
							tableWidthPluginState,
							dragAndDropState,
							sizeSelectorPluginState,
						}) => {
							const isColumnResizing = resizingPluginState?.dragging;
							const isTableResizing = tableWidthPluginState?.resizing;
							const resizingTableLocalId = tableWidthPluginState?.tableLocalId;
							const resizingTableRef = tableWidthPluginState?.tableRef;
							const isResizing = isColumnResizing || isTableResizing;
							const widthToWidest = tablePluginState?.widthToWidest;
							const isSizeSelectorOpen = sizeSelectorPluginState?.isSelectorOpen;

							const {
								tableNode,
								tablePos,
								targetCellPosition,
								isContextualMenuOpen,
								tableRef,
								pluginConfig,
								insertColumnButtonIndex,
								insertRowButtonIndex,
								isHeaderColumnEnabled,
								isHeaderRowEnabled,
								isDragAndDropEnabled,
								tableWrapperTarget,
								isCellMenuOpenByKeyboard,
								// Ignored via go/ees005
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							} = tablePluginState!;

							const { allowControls } = pluginConfig;

							const stickyHeader = stickyHeadersState
								? findStickyHeaderForTable(stickyHeadersState, tablePos)
								: undefined;

							return (
								<>
									{targetCellPosition &&
										(tableRef || isCellMenuOpenByKeyboard) &&
										!isResizing &&
										options &&
										options.allowContextualMenu && (
											<FloatingContextualButton
												isNumberColumnEnabled={tableNode && tableNode.attrs.isNumberColumnEnabled}
												editorView={editorView}
												tableNode={tableNode}
												mountPoint={popupsMountPoint}
												targetCellPosition={targetCellPosition}
												scrollableElement={popupsScrollableElement}
												dispatchAnalyticsEvent={dispatchAnalyticsEvent}
												isContextualMenuOpen={isContextualMenuOpen}
												stickyHeader={stickyHeader}
												tableWrapper={tableWrapperTarget}
												isCellMenuOpenByKeyboard={isCellMenuOpenByKeyboard}
											/>
										)}
									{allowControls && (
										<FloatingInsertButton
											tableNode={tableNode}
											tableRef={tableRef}
											insertColumnButtonIndex={insertColumnButtonIndex}
											insertRowButtonIndex={insertRowButtonIndex}
											isHeaderColumnEnabled={isHeaderColumnEnabled}
											isHeaderRowEnabled={isHeaderRowEnabled}
											isDragAndDropEnabled={isDragAndDropEnabled}
											isTableScalingEnabled={options?.isTableScalingEnabled}
											editorView={editorView}
											mountPoint={popupsMountPoint}
											boundariesElement={popupsBoundariesElement}
											scrollableElement={popupsScrollableElement}
											hasStickyHeaders={stickyHeader && stickyHeader.sticky}
											dispatchAnalyticsEvent={dispatchAnalyticsEvent}
											editorAnalyticsAPI={editorAnalyticsAPI}
											getEditorContainerWidth={defaultGetEditorContainerWidth}
											getEditorFeatureFlags={
												options?.getEditorFeatureFlags || defaultGetEditorFeatureFlags
											}
											isChromelessEditor={options?.isChromelessEditor}
											api={api}
											isCommentEditor={options?.isCommentEditor}
										/>
									)}
									{options?.allowContextualMenu && (
										<FloatingContextualMenu
											editorView={editorView}
											mountPoint={popupsMountPoint}
											boundariesElement={popupsBoundariesElement}
											targetCellPosition={targetCellPosition}
											isOpen={Boolean(isContextualMenuOpen) && !isResizing}
											pluginConfig={pluginConfig}
											editorAnalyticsAPI={editorAnalyticsAPI}
											getEditorContainerWidth={defaultGetEditorContainerWidth}
											getEditorFeatureFlags={
												options?.getEditorFeatureFlags || defaultGetEditorFeatureFlags
											}
											isCellMenuOpenByKeyboard={isCellMenuOpenByKeyboard}
											isCommentEditor={options?.isCommentEditor}
											api={api}
										/>
									)}
									{isDragAndDropEnabled && (
										<FloatingDragMenu
											editorView={editorView}
											mountPoint={popupsMountPoint}
											boundariesElement={popupsBoundariesElement}
											tableRef={tableRef as HTMLTableElement}
											tableNode={tableNode}
											targetCellPosition={targetCellPosition}
											direction={dragAndDropState?.dragMenuDirection}
											index={dragAndDropState?.dragMenuIndex}
											isOpen={!!dragAndDropState?.isDragMenuOpen && !isResizing}
											getEditorContainerWidth={defaultGetEditorContainerWidth}
											editorAnalyticsAPI={editorAnalyticsAPI}
											stickyHeaders={stickyHeader}
											pluginConfig={pluginConfig}
											isTableScalingEnabled={options?.isTableScalingEnabled}
											getEditorFeatureFlags={
												options?.getEditorFeatureFlags || defaultGetEditorFeatureFlags
											}
											ariaNotifyPlugin={ariaNotifyPlugin}
											api={api}
											isCommentEditor={options?.isCommentEditor}
										/>
									)}
									{allowControls && !isDragAndDropEnabled && !isResizing && (
										<FloatingDeleteButton
											editorView={editorView}
											selection={editorView.state.selection}
											tableRef={tableRef as HTMLTableElement}
											mountPoint={popupsMountPoint}
											boundariesElement={popupsBoundariesElement}
											scrollableElement={popupsScrollableElement}
											stickyHeaders={stickyHeader}
											isNumberColumnEnabled={tableNode && tableNode.attrs.isNumberColumnEnabled}
											editorAnalyticsAPI={editorAnalyticsAPI}
											api={api}
										/>
									)}
									{(options?.isTableScalingEnabled ||
										(options?.tableOptions.allowTableResizing && options.isCommentEditor)) &&
										isTableResizing &&
										widthToWidest &&
										resizingTableLocalId &&
										resizingTableRef &&
										widthToWidest[resizingTableLocalId] && (
											<FloatingToolbarLabel
												target={resizingTableRef}
												content={
													editorExperiment('single_column_layouts', true) ? (
														<ResizerBreakoutModeLabel layout="full-width" />
													) : (
														<FullWidthDisplay />
													)
												}
												alignX={'center'}
												alignY={'bottom'}
												stick={true}
												forcePlacement={true}
												zIndex={akEditorFloatingPanelZIndex}
												offset={[0, 10]}
											/>
										)}

									{isTableSelectorEnabled && isSizeSelectorOpen && (
										<SizeSelector
											api={api}
											isOpenedByKeyboard={false}
											popupsMountPoint={popupsMountPoint}
											target={
												sizeSelectorPluginState?.targetRef ??
												getDomRefFromSelection(
													editorView,
													ACTION_SUBJECT_ID.PICKER_TABLE_SIZE,
													api?.analytics?.actions.fireAnalyticsEvent,
												)
											}
											popupsBoundariesElement={popupsBoundariesElement}
											popupsScrollableElement={popupsScrollableElement}
										/>
									)}
								</>
							);
						}}
					/>
				</ErrorBoundary>
			);
		},

		pluginsOptions: {
			quickInsert: ({ formatMessage }) => [
				{
					id: 'table',
					title: formatMessage(messages.table),
					description: formatMessage(messages.tableDescription),
					keywords: ['cell', 'table'],
					priority: 600,
					keyshortcut: tooltip(toggleTable),
					icon: () => <IconTable />,
					action(insert, state) {
						if (isTableSelectorEnabled) {
							const tr = insert('');
							tr.setMeta(sizeSelectorPluginKey, {
								isSelectorOpen: true,
							});

							return tr;
						}

						// see comment on tablesPlugin.getSharedState on usage
						const tableState = api?.table?.sharedState.currentState();
						const tableNodeProps = {
							isTableScalingEnabled: options?.isTableScalingEnabled,
							isTableAlignmentEnabled: options?.tableOptions.allowTableAlignment,
							isFullWidthModeEnabled: tableState?.isFullWidthModeEnabled,
							isCommentEditor: options?.isCommentEditor,
							isChromelessEditor: options?.isChromelessEditor,
							isTableResizingEnabled: options?.tableOptions.allowTableResizing,
						};

						let tableNode = createTableWithWidth(tableNodeProps)(state.schema);

						let { tr } = state;
						// If the cursor is inside a table
						if (
							hasParentNodeOfType(state.schema.nodes.table)(state.selection) &&
							options?.tableOptions?.allowNestedTables &&
							fg('platform_editor_use_nested_table_pm_nodes')
						) {
							// If the experiment is disabled, or we're trying to nest deeper than one level, we insert the table after the top table
							if (
								editorExperiment('nested-tables-in-tables', false, { exposure: true }) ||
								getParentOfTypeCount(state.schema.nodes.table)(state.selection.$from) > 1
							) {
								// Nesting is too deep insert table after the top parent table
								const positionAfterTopTable = getPositionAfterTopParentNodeOfType(
									state.schema.nodes.table,
								)(state.selection.$from);
								tr = safeInsert(tableNode, positionAfterTopTable)(tr);
								tr.scrollIntoView();
							} else {
								// Table can be nested in parent table
								tableNode = createTableWithWidth({
									...tableNodeProps,
									isNestedTable: true,
								})(state.schema);
								tr = insert(tableNode);
							}
						} else {
							tr = insert(tableNode);
						}

						editorAnalyticsAPI?.attachAnalyticsEvent({
							action: ACTION.INSERTED,
							actionSubject: ACTION_SUBJECT.DOCUMENT,
							actionSubjectId: ACTION_SUBJECT_ID.TABLE,
							attributes: {
								inputMethod: INPUT_METHOD.QUICK_INSERT,
								localId: tableNode.attrs.localId,
							},
							eventType: EVENT_TYPE.TRACK,
						})(tr);
						return tr;
					},
				},
			],
			floatingToolbar: getToolbarConfig(
				defaultGetEditorContainerWidth,
				api,
				editorAnalyticsAPI,
				() => editorViewRef.current,
				options,
				isTableFixedColumnWidthsOptionEnabled,
				shouldUseIncreasedScalingPercent,
			)(pluginConfig(options?.tableOptions)),
		},
		usePluginHook({ editorView }) {
			const { editorViewModeState } = useSharedPluginState(api, ['editorViewMode']);
			const mode = editorViewModeState?.mode;

			useEffect(() => {
				const { state, dispatch } = editorView;
				const tr = state.tr;
				tr.setMeta('viewModeState', mode);
				if (dispatch) {
					dispatch(tr);
				}
			}, [editorView, mode]);
		},
	};
};

export default tablePlugin;
