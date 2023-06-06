import { Dispatch } from '@atlaskit/editor-common/event-dispatcher';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type {
  EditorContainerWidth,
  NextEditorPlugin,
} from '@atlaskit/editor-common/types';

import { pluginKey } from './plugin-key';
import type { WidthPluginState } from './types';
import { useResizeWidthObserver } from './useResizeWidthObserver';

function createPlugin(
  dispatch: Dispatch<WidthPluginState>,
): SafePlugin | undefined {
  return new SafePlugin({
    key: pluginKey,
    state: {
      init: () =>
        ({
          width: document.body.offsetWidth,
        } as WidthPluginState),
      apply(tr, pluginState: WidthPluginState) {
        const meta: WidthPluginState | undefined = tr.getMeta(pluginKey);

        if (!meta) {
          return pluginState;
        }

        const newPluginState = {
          ...pluginState,
          ...meta,
        };

        if (
          newPluginState &&
          (pluginState.width !== newPluginState.width ||
            pluginState.lineLength !== newPluginState.lineLength)
        ) {
          dispatch(pluginKey, newPluginState);
          return newPluginState;
        }
        return pluginState;
      },
    },
  });
}

export const widthPlugin: NextEditorPlugin<
  'width',
  {
    sharedState: EditorContainerWidth | undefined;
  }
> = () => ({
  name: 'width',

  pmPlugins: () => [
    {
      name: 'width',
      plugin: ({ dispatch }) => createPlugin(dispatch),
    },
  ],

  getSharedState: editorState => {
    if (!editorState) {
      return undefined;
    }

    return pluginKey.getState(editorState);
  },

  usePluginHook({ editorView, containerElement }) {
    return useResizeWidthObserver({ editorView, containerElement });
  },
});
