import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { PluginKey } from 'prosemirror-state';
import { NextEditorPlugin } from '@atlaskit/editor-common/types';
import { Dispatch } from '../../event-dispatcher';

import { pluginFactory } from '../../utils/plugin-state-factory';

export type EditorDisabledPluginState = { editorDisabled: boolean };

export const pluginKey = new PluginKey<EditorDisabledPluginState>(
  'editorDisabledPlugin',
);

function reducer(
  _pluginState: EditorDisabledPluginState,
  meta: EditorDisabledPluginState,
) {
  return meta;
}

const { createPluginState, getPluginState } = pluginFactory(pluginKey, reducer);

/*
Stores the state of the editor enabled/disabled for panel and floating
toolbar to subscribe to through <WithPluginState>. Otherwise the NodeViews
won't re-render when it changes.
*/
export function createPlugin(
  dispatch: Dispatch<EditorDisabledPluginState>,
): SafePlugin | undefined {
  return new SafePlugin({
    key: pluginKey,
    state: createPluginState(dispatch, { editorDisabled: false }),
    view: () => {
      return {
        update(view) {
          if (getPluginState(view.state).editorDisabled !== !view.editable) {
            const tr = view.state.tr.setMeta(pluginKey, {
              editorDisabled: !view.editable,
            } as EditorDisabledPluginState);

            tr.setMeta('isLocal', true);
            view.dispatch(tr);
          }
        },
      };
    },
  });
}

const editorDisabledPlugin: NextEditorPlugin<'editorDisabled'> = () => ({
  name: 'editorDisabled',

  pmPlugins: () => [
    {
      name: 'editorDisabled',
      plugin: ({ dispatch }) => createPlugin(dispatch),
    },
  ],
});

export default editorDisabledPlugin;
