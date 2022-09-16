import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { GetEditorFeatureFlags } from '@atlaskit/editor-common/types';

import { Dispatch, EventDispatcher } from '../../../../event-dispatcher';

import { TableRowNodeView } from './nodeviews/tableRow';
import { pluginKey } from './plugin-key';
import { createPluginState } from './plugin-state';

export const createPlugin = (
  dispatch: Dispatch,
  eventDispatcher: EventDispatcher,
  initialState = () => [],
  getEditorFeatureFlags: GetEditorFeatureFlags,
) => {
  return new SafePlugin({
    state: createPluginState(dispatch, initialState),
    key: pluginKey,
    props: {
      nodeViews: {
        tableRow: (node, view, getPos) => {
          return new TableRowNodeView(
            node,
            view,
            getPos,
            eventDispatcher,
            getEditorFeatureFlags,
          );
        },
      },
    },
  });
};
