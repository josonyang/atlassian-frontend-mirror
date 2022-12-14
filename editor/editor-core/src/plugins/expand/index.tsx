import React from 'react';
import { expand, nestedExpand } from '@atlaskit/adf-schema';
import { NextEditorPlugin, EditorProps } from '../../types';
import { createPlugin } from './pm-plugins/main';
import { expandKeymap } from './pm-plugins/keymap';
import { IconExpand } from '../quick-insert/assets';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { getToolbarConfig } from './toolbar';
import { createExpandNode } from './commands';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { LongPressSelectionPluginOptions } from '../selection/types';

interface ExpandPluginOptions extends LongPressSelectionPluginOptions {
  allowInsertion?: boolean;
  appearance?: EditorProps['appearance'];
}

const expandPlugin: NextEditorPlugin<'expand', never, ExpandPluginOptions> = (
  options = {},
) => ({
  name: 'expand',

  nodes() {
    return [
      { name: 'expand', node: expand },
      { name: 'nestedExpand', node: nestedExpand },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'expand',
        plugin: ({ dispatch, getIntl }) => {
          return createPlugin(
            dispatch,
            getIntl,
            options.appearance,
            options.useLongPressSelection,
          );
        },
      },
      {
        name: 'expandKeymap',
        plugin: expandKeymap,
      },
    ];
  },

  pluginsOptions: {
    floatingToolbar: getToolbarConfig,

    quickInsert: ({ formatMessage }) => {
      if (options && options.allowInsertion !== true) {
        return [];
      }
      return [
        {
          id: 'expand',
          title: formatMessage(messages.expand),
          description: formatMessage(messages.expandDescription),
          keywords: ['accordion', 'collapse'],
          priority: 600,
          icon: () => <IconExpand />,
          action(insert, state) {
            const node = createExpandNode(state);
            const tr = insert(node);
            return addAnalytics(state, tr, {
              action: ACTION.INSERTED,
              actionSubject: ACTION_SUBJECT.DOCUMENT,
              actionSubjectId:
                node.type === state.schema.nodes.nestedExpand
                  ? ACTION_SUBJECT_ID.NESTED_EXPAND
                  : ACTION_SUBJECT_ID.EXPAND,
              attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
              eventType: EVENT_TYPE.TRACK,
            });
          },
        },
      ];
    },
  },
});

export default expandPlugin;
export type { ExpandPluginState } from './types';
export function isExpandInsertionEnabled({ allowExpand }: EditorProps) {
  if (allowExpand && typeof allowExpand === 'object') {
    return !!allowExpand.allowInsertion;
  }

  return false;
}
export { pluginKey } from './pm-plugins/plugin-factory';
