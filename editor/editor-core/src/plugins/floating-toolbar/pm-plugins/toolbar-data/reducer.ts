import type { FloatingToolbarPluginAction } from './types';
import type { FloatingToolbarPluginData } from '@atlaskit/editor-plugin-floating-toolbar';

export const reducer = (
  pluginState: FloatingToolbarPluginData,
  action: FloatingToolbarPluginAction,
): FloatingToolbarPluginData => {
  switch (action.type) {
    case 'SHOW_CONFIRM_DIALOG':
      return {
        ...pluginState,
        confirmDialogForItem: action.data.buttonIndex,
      };

    case 'HIDE_CONFIRM_DIALOG':
      return {
        ...pluginState,
        confirmDialogForItem: undefined,
      };

    default:
      return pluginState;
  }
};
