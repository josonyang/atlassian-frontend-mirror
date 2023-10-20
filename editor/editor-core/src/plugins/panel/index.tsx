import React from 'react';
import type { PanelAttributes } from '@atlaskit/adf-schema';
import { panel, PanelType } from '@atlaskit/adf-schema';
import type { QuickInsertItem } from '@atlaskit/editor-common/provider-factory';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import type {
  Command,
  NextEditorPlugin,
  OptionalPlugin,
} from '@atlaskit/editor-common/types';
import { createPlugin } from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';
import keymap from './pm-plugins/keymaps';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
  EVENT_TYPE,
} from '../analytics';
import {
  IconPanel,
  IconPanelNote,
  IconPanelSuccess,
  IconPanelWarning,
  IconPanelError,
} from '@atlaskit/editor-common/quick-insert';
import { createWrapSelectionTransaction } from '@atlaskit/editor-common/utils';
import { blockTypeMessages } from '@atlaskit/editor-common/messages';
import type { PanelPluginOptions } from './types';
import { IconCustomPanel } from '@atlaskit/editor-common/quick-insert';
import { T50 } from '@atlaskit/theme/colors';
import type { decorationsPlugin } from '@atlaskit/editor-plugin-decorations';
import type { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import { insertPanelWithAnalytics } from './actions';

export type PanelPlugin = NextEditorPlugin<
  'panel',
  {
    pluginConfiguration: PanelPluginOptions | undefined;
    dependencies: [
      typeof decorationsPlugin,
      OptionalPlugin<typeof analyticsPlugin>,
    ];
    actions: {
      insertPanel: (inputMethod: INPUT_METHOD) => Command;
    };
  }
>;

const panelPlugin: PanelPlugin = ({ config: options = {}, api }) => ({
  name: 'panel',

  nodes() {
    const panelNode = panel(!!options.allowCustomPanel);

    return [{ name: 'panel', node: panelNode }];
  },

  pmPlugins() {
    return [
      {
        name: 'panel',
        plugin: ({ providerFactory, dispatch }) =>
          createPlugin(dispatch, providerFactory, options),
      },
      {
        name: 'panelKeyMap',
        plugin: () => keymap(),
      },
    ];
  },

  actions: {
    insertPanel(inputMethod: INPUT_METHOD) {
      return insertPanelWithAnalytics(inputMethod, api?.analytics?.actions);
    },
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => {
      let quickInsertOptions: QuickInsertItem[] = [
        {
          id: 'infopanel',
          title: formatMessage(blockTypeMessages.infoPanel),
          keywords: ['panel'],
          description: formatMessage(blockTypeMessages.infoPanelDescription),
          priority: 800,
          icon: () => <IconPanel />,
          action(insert, state) {
            return createPanelAction({
              state,
              attributes: { panelType: PanelType.INFO },
            });
          },
        },
        {
          id: 'notepanel',
          title: formatMessage(blockTypeMessages.notePanel),
          description: formatMessage(blockTypeMessages.notePanelDescription),
          priority: 1000,
          icon: () => <IconPanelNote />,
          action(insert, state) {
            return createPanelAction({
              state,
              attributes: { panelType: PanelType.NOTE },
            });
          },
        },
        {
          id: 'successpanel',
          title: formatMessage(blockTypeMessages.successPanel),
          description: formatMessage(blockTypeMessages.successPanelDescription),
          keywords: ['tip'],
          priority: 1000,
          icon: () => <IconPanelSuccess />,
          action(insert, state) {
            return createPanelAction({
              state,
              attributes: { panelType: PanelType.SUCCESS },
            });
          },
        },
        {
          id: 'warningpanel',
          title: formatMessage(blockTypeMessages.warningPanel),
          description: formatMessage(blockTypeMessages.warningPanelDescription),
          priority: 1000,
          icon: () => <IconPanelWarning />,
          action(insert, state) {
            return createPanelAction({
              state,
              attributes: { panelType: PanelType.WARNING },
            });
          },
        },
        {
          id: 'errorpanel',
          title: formatMessage(blockTypeMessages.errorPanel),
          description: formatMessage(blockTypeMessages.errorPanelDescription),
          priority: 1000,
          icon: () => <IconPanelError />,
          action(insert, state) {
            return createPanelAction({
              state,
              attributes: { panelType: PanelType.ERROR },
            });
          },
        },
      ];
      if (options.allowCustomPanel && options.allowCustomPanelEdit) {
        quickInsertOptions.push({
          id: 'custompanel',
          title: formatMessage(blockTypeMessages.customPanel),
          description: formatMessage(blockTypeMessages.customPanelDescription),
          priority: 1000,
          icon: () => <IconCustomPanel />,
          action(insert, state) {
            return createPanelAction({
              state,
              attributes: {
                panelType: PanelType.CUSTOM,
                panelIcon: ':rainbow:',
                panelIconId: '1f308',
                panelIconText: '🌈',
                // TODO: https://product-fabric.atlassian.net/browse/DSP-7268
                // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
                panelColor: T50,
              },
            });
          },
        });
      }
      return quickInsertOptions;
    },
    floatingToolbar: (state, intl, providerFactory) =>
      getToolbarConfig(state, intl, options, providerFactory, api),
  },
});

/**
 * Creates panel action and wrap selection transaction with analytics for the panel insertion.
 *
 * @example
 * const tr = createPanelAction({
 *   state: editorState,
 *   attributes: { panelType: 'info' },
 * });
 * if (tr) {
 *   applyTransaction(tr);
 * }
 */
function createPanelAction({
  state,
  attributes,
}: {
  state: EditorState;
  attributes: PanelAttributes;
}) {
  const tr = createWrapSelectionTransaction({
    state,
    type: state.schema.nodes.panel,
    nodeAttributes: attributes,
  });
  if (tr) {
    addAnalytics(state, tr, {
      action: ACTION.INSERTED,
      actionSubject: ACTION_SUBJECT.DOCUMENT,
      actionSubjectId: ACTION_SUBJECT_ID.PANEL,
      attributes: {
        inputMethod: INPUT_METHOD.QUICK_INSERT,
        panelType: attributes.panelType,
      },
      eventType: EVENT_TYPE.TRACK,
    });
  }
  return tr;
}

export default panelPlugin;
