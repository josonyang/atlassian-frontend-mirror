import rafSchedule from 'raf-schd';

import type { Dispatch } from '@atlaskit/editor-common/event-dispatcher';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { pluginFactory } from '@atlaskit/editor-common/utils';
import { PluginKey } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import {
	type EditorDisabledPlugin,
	type EditorDisabledPluginState,
} from './editorDisabledPluginType';

const pluginKey = new PluginKey<EditorDisabledPluginState>('editorDisabledPlugin');

function reducer(_pluginState: EditorDisabledPluginState, meta: EditorDisabledPluginState) {
	return meta;
}

const { createPluginState, getPluginState } = pluginFactory(pluginKey, reducer);

const scheduleEditorDisabledUpdate = rafSchedule((view: EditorView) => {
	if (getPluginState(view.state).editorDisabled !== !view.editable) {
		const tr = view.state.tr.setMeta(pluginKey, {
			editorDisabled: !view.editable,
		} as EditorDisabledPluginState);

		tr.setMeta('isLocal', true);
		view.dispatch(tr);
	}
});

/*
Stores the state of the editor enabled/disabled for panel and floating
toolbar to subscribe to through useSharedPluginState. Otherwise the NodeViews
won't re-render when it changes.
*/
function createPlugin(dispatch: Dispatch<EditorDisabledPluginState>): SafePlugin | undefined {
	return new SafePlugin({
		key: pluginKey,
		state: createPluginState(dispatch, { editorDisabled: false }),
		view: () => {
			return {
				update(view) {
					scheduleEditorDisabledUpdate(view);
				},
				destroy() {
					scheduleEditorDisabledUpdate.cancel();
				},
			};
		},
	});
}

/**
 * Editor disabled plugin to be added to an `EditorPresetBuilder` and used with `ComposableEditor`
 * from `@atlaskit/editor-core`.
 */
export const editorDisabledPlugin: EditorDisabledPlugin = () => ({
	name: 'editorDisabled',

	getSharedState(editorState) {
		if (!editorState) {
			return {
				editorDisabled: false,
			};
		}

		const pluginState = pluginKey.getState(editorState);

		if (!pluginState) {
			return {
				editorDisabled: false,
			};
		}

		return pluginState;
	},

	pmPlugins: () => [
		{
			name: 'editorDisabled',
			plugin: ({ dispatch }) => createPlugin(dispatch),
		},
	],
});
