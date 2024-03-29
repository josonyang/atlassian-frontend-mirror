import React from 'react';

import {
  table,
  tableCell,
  tableHeader,
  tableRow,
  tableWithCustomWidth,
} from '@atlaskit/adf-schema';
import type { AnalyticsEventPayload } from '@atlaskit/editor-common/analytics';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  INPUT_METHOD,
  TABLE_ACTION,
} from '@atlaskit/editor-common/analytics';
import { ErrorBoundary } from '@atlaskit/editor-common/error-boundary';
import { IconTable } from '@atlaskit/editor-common/icons';
import { toggleTable, tooltip } from '@atlaskit/editor-common/keymaps';
import { toolbarInsertBlockMessages as messages } from '@atlaskit/editor-common/messages';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type {
  Command,
  EditorPlugin,
  GetEditorContainerWidth,
  GetEditorFeatureFlags,
  NextEditorPlugin,
} from '@atlaskit/editor-common/types';
import { browser } from '@atlaskit/editor-common/utils';
import { WithPluginState } from '@atlaskit/editor-common/with-plugin-state';
import type { AnalyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import type { ContentInsertionPlugin } from '@atlaskit/editor-plugin-content-insertion';
import type { GuidelinePlugin } from '@atlaskit/editor-plugin-guideline';
import type { SelectionPlugin } from '@atlaskit/editor-plugin-selection';
import type { WidthPlugin } from '@atlaskit/editor-plugin-width';
import type { Transaction } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { tableEditing } from '@atlaskit/editor-tables/pm-plugins';
import { createTable } from '@atlaskit/editor-tables/utils';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';

import { pluginConfig } from './create-plugin-config';
import { createPlugin as createDecorationsPlugin } from './pm-plugins/decorations/plugin';
import {
  createPlugin as createDragAndDropPlugin,
  pluginKey as dragAndDropPluginKey,
} from './pm-plugins/drag-and-drop';
import { keymapPlugin } from './pm-plugins/keymap';
import { createPlugin } from './pm-plugins/main';
import { pluginKey } from './pm-plugins/plugin-key';
import { createPlugin as createTableSafariDeleteCompositionTextIssueWorkaroundPlugin } from './pm-plugins/safari-delete-composition-text-issue-workaround';
import {
  createPlugin as createStickyHeadersPlugin,
  findStickyHeaderForTable,
  pluginKey as stickyHeadersPluginKey,
} from './pm-plugins/sticky-headers';
import {
  createPlugin as createTableAnalyticsPlugin,
  pluginKey as tableAnalyticsPluginKey,
} from './pm-plugins/table-analytics';
import { createPlugin as createTableLocalIdPlugin } from './pm-plugins/table-local-id';
import {
  createPlugin as createFlexiResizingPlugin,
  pluginKey as tableResizingPluginKey,
} from './pm-plugins/table-resizing';
import { tableSelectionKeymapPlugin } from './pm-plugins/table-selection-keymap';
import {
  createPlugin as createTableWidthPlugin,
  pluginKey as tableWidthPluginKey,
} from './pm-plugins/table-width';
import { getToolbarConfig } from './toolbar';
import type { ColumnResizingPluginState, PluginConfig } from './types';
import FloatingContextualButton from './ui/FloatingContextualButton';
import FloatingContextualMenu from './ui/FloatingContextualMenu';
import FloatingDeleteButton from './ui/FloatingDeleteButton';
import FloatingDragMenu from './ui/FloatingDragMenu';
import FloatingInsertButton from './ui/FloatingInsertButton';
import LayoutButton from './ui/LayoutButton';
import { isLayoutSupported } from './utils';
export interface TablePluginOptions {
  tableOptions: PluginConfig;
  // experimental custom table resizing experience, set inside editor-core behind a feature flag
  // will eventually replace breakoutEnabled
  tableResizingEnabled?: boolean;
  dragAndDropEnabled?: boolean;
  breakoutEnabled?: boolean;
  allowContextualMenu?: boolean;
  // TODO these two need to be rethought
  fullWidthEnabled?: boolean;
  wasFullWidthEnabled?: boolean;
  getEditorFeatureFlags?: GetEditorFeatureFlags;
}

type InsertTableAction = (analyticsPayload: AnalyticsEventPayload) => Command;

const defaultGetEditorFeatureFlags = () => ({});

export type TablePlugin = NextEditorPlugin<
  'table',
  {
    pluginConfiguration: TablePluginOptions | undefined;
    actions: {
      insertTable: InsertTableAction;
    };
    dependencies: [
      AnalyticsPlugin,
      ContentInsertionPlugin,
      WidthPlugin,
      GuidelinePlugin,
      SelectionPlugin,
    ];
  }
>;

/**
 * Table plugin to be added to an `EditorPresetBuilder` and used with `ComposableEditor`
 * from `@atlaskit/editor-core`.
 */
const tablesPlugin: TablePlugin = ({ config: options, api }) => {
  const editorViewRef: Record<'current', EditorView | null> = { current: null };
  const defaultGetEditorContainerWidth: GetEditorContainerWidth = () => {
    const defaultState = {
      width: document?.body?.offsetWidth ?? 500,
    };
    return api?.width.sharedState.currentState() ?? defaultState;
  };
  const editorAnalyticsAPI = api?.analytics?.actions;

  return {
    name: 'table',

    actions: {
      insertTable:
        (analyticsPayload): Command =>
        (state, dispatch) => {
          const node = createTable({
            schema: state.schema,
          });

          return (
            api?.contentInsertion?.actions?.insert({
              state,
              dispatch,
              node,

              options: {
                selectNodeInserted: false,
                analyticsPayload,
              },
            }) ?? false
          );
        },
    },

    nodes() {
      const tableNode = options?.tableResizingEnabled
        ? tableWithCustomWidth
        : table;

      return [
        { name: 'table', node: tableNode },
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
            eventDispatcher,
            getIntl,
          }) => {
            const {
              fullWidthEnabled,
              wasFullWidthEnabled,
              tableResizingEnabled,
              breakoutEnabled,
              tableOptions,
              getEditorFeatureFlags,
              dragAndDropEnabled,
            } = options || ({} as TablePluginOptions);
            return createPlugin(
              dispatchAnalyticsEvent,
              dispatch,
              portalProviderAPI,
              eventDispatcher,
              pluginConfig(tableOptions),
              defaultGetEditorContainerWidth,
              getEditorFeatureFlags || defaultGetEditorFeatureFlags,
              getIntl,
              breakoutEnabled,
              tableResizingEnabled,
              fullWidthEnabled,
              wasFullWidthEnabled,
              dragAndDropEnabled,
              editorAnalyticsAPI,
              api,
            );
          },
        },
        {
          name: 'tablePMColResizing',
          plugin: ({ dispatch }) => {
            const { fullWidthEnabled, tableOptions, getEditorFeatureFlags } =
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
                  editorAnalyticsAPI,
                )
              : undefined;
          },
        },
        { name: 'tableEditing', plugin: () => createDecorationsPlugin() },
        // Needs to be lower priority than editor-tables.tableEditing
        // plugin as it is currently swallowing backspace events inside tables
        {
          name: 'tableKeymap',
          plugin: () =>
            keymapPlugin(defaultGetEditorContainerWidth, editorAnalyticsAPI),
        },
        {
          name: 'tableSelectionKeymap',
          plugin: () => tableSelectionKeymapPlugin(api?.selection),
        },
        {
          name: 'tableEditing',
          plugin: () =>
            tableEditing({
              reportFixedTable: ({
                tr,
                reason,
              }: {
                tr: Transaction;
                reason: string;
              }) => {
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
            }) as SafePlugin,
        },
        {
          name: 'tableStickyHeaders',
          plugin: ({ dispatch, eventDispatcher }) =>
            options && options.tableOptions.stickyHeaders
              ? createStickyHeadersPlugin(
                  dispatch,
                  eventDispatcher,
                  () => [],
                  options?.getEditorFeatureFlags ||
                    defaultGetEditorFeatureFlags,
                )
              : undefined,
        },
        {
          name: 'tableDragAndDrop',
          plugin: ({ dispatch, eventDispatcher }) =>
            options?.dragAndDropEnabled
              ? createDragAndDropPlugin(dispatch, eventDispatcher)
              : undefined,
        },
        {
          name: 'tableLocalId',
          plugin: ({ dispatch }) => createTableLocalIdPlugin(dispatch),
        },
        {
          name: 'tableWidth',
          plugin: ({ dispatchAnalyticsEvent, dispatch }) =>
            options?.tableResizingEnabled
              ? createTableWidthPlugin(
                  dispatch,
                  dispatchAnalyticsEvent,
                  options?.fullWidthEnabled ?? false,
                )
              : undefined,
        },
        {
          name: 'tableAnalyticsPlugin',
          plugin: ({ dispatch, dispatchAnalyticsEvent }) =>
            getBooleanFF('platform.editor.table.overflow-state-analytics')
              ? createTableAnalyticsPlugin(
                  dispatch,
                  dispatchAnalyticsEvent,
                  options?.tableResizingEnabled ?? false,
                )
              : undefined,
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
      return (
        <ErrorBoundary
          component={ACTION_SUBJECT.TABLES_PLUGIN}
          dispatchAnalyticsEvent={dispatchAnalyticsEvent}
          fallbackComponent={null}
        >
          <WithPluginState
            plugins={{
              tableAnalyticsPluginState: tableAnalyticsPluginKey,
              tablePluginState: pluginKey,
              tableWidthPluginState: tableWidthPluginKey,
              tableResizingPluginState: tableResizingPluginKey,
              stickyHeadersState: stickyHeadersPluginKey,
              dragAndDropState: dragAndDropPluginKey,
            }}
            render={({
              tableResizingPluginState: resizingPluginState,
              stickyHeadersState,
              tablePluginState,
              tableWidthPluginState,
              dragAndDropState,
            }) => {
              const { state } = editorView;
              const isColumnResizing = resizingPluginState?.dragging;
              const isTableResizing = tableWidthPluginState?.resizing;
              const isResizing = isColumnResizing || isTableResizing;

              const {
                tableNode,
                tablePos,
                targetCellPosition,
                isContextualMenuOpen,
                layout,
                tableRef,
                pluginConfig,
                insertColumnButtonIndex,
                insertRowButtonIndex,
                isHeaderColumnEnabled,
                isHeaderRowEnabled,
                isDragAndDropEnabled,
                tableWrapperTarget,
              } = tablePluginState!;

              const { allowControls } = pluginConfig;

              const stickyHeader = stickyHeadersState
                ? findStickyHeaderForTable(stickyHeadersState, tablePos)
                : undefined;

              const LayoutContent =
                options &&
                !options.tableResizingEnabled &&
                isLayoutSupported(state) &&
                options.breakoutEnabled ? (
                  <LayoutButton
                    editorView={editorView}
                    mountPoint={popupsMountPoint}
                    boundariesElement={popupsBoundariesElement}
                    scrollableElement={popupsScrollableElement}
                    targetRef={tableWrapperTarget!}
                    layout={layout}
                    isResizing={
                      !!resizingPluginState && !!resizingPluginState.dragging
                    }
                    stickyHeader={stickyHeader}
                    editorAnalyticsAPI={editorAnalyticsAPI}
                  />
                ) : null;

              return (
                <>
                  {targetCellPosition &&
                    tableRef &&
                    !isResizing &&
                    options &&
                    options.allowContextualMenu && (
                      <FloatingContextualButton
                        isNumberColumnEnabled={
                          tableNode && tableNode.attrs.isNumberColumnEnabled
                        }
                        editorView={editorView}
                        tableNode={tableNode}
                        mountPoint={popupsMountPoint}
                        targetCellPosition={targetCellPosition}
                        scrollableElement={popupsScrollableElement}
                        dispatchAnalyticsEvent={dispatchAnalyticsEvent}
                        isContextualMenuOpen={isContextualMenuOpen}
                        layout={layout}
                        stickyHeader={stickyHeader}
                        tableWrapper={tableWrapperTarget}
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
                      editorView={editorView}
                      mountPoint={popupsMountPoint}
                      boundariesElement={popupsBoundariesElement}
                      scrollableElement={popupsScrollableElement}
                      hasStickyHeaders={stickyHeader && stickyHeader.sticky}
                      dispatchAnalyticsEvent={dispatchAnalyticsEvent}
                      editorAnalyticsAPI={editorAnalyticsAPI}
                      getEditorContainerWidth={defaultGetEditorContainerWidth}
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
                        options?.getEditorFeatureFlags ||
                        defaultGetEditorFeatureFlags
                      }
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
                      isNumberColumnEnabled={
                        tableNode && tableNode.attrs.isNumberColumnEnabled
                      }
                      editorAnalyticsAPI={editorAnalyticsAPI}
                    />
                  )}
                  {LayoutContent}
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
            const tr = insert(
              createTable({
                schema: state.schema,
              }),
            );
            editorAnalyticsAPI?.attachAnalyticsEvent({
              action: ACTION.INSERTED,
              actionSubject: ACTION_SUBJECT.DOCUMENT,
              actionSubjectId: ACTION_SUBJECT_ID.TABLE,
              attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
              eventType: EVENT_TYPE.TRACK,
            })(tr);
            return tr;
          },
        },
      ],
      floatingToolbar: getToolbarConfig(
        defaultGetEditorContainerWidth,
        editorAnalyticsAPI,
        options?.getEditorFeatureFlags || defaultGetEditorFeatureFlags,
        () => editorViewRef.current,
      )(pluginConfig(options?.tableOptions)),
    },
  };
};

export default tablesPlugin;
