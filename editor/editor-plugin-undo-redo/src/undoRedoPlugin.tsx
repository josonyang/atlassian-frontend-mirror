import React from 'react';

import type { ToolbarUIComponentFactory } from '@atlaskit/editor-common/types';

import { keymapPlugin } from './pm-plugins/keymaps';
import { createPlugin } from './pm-plugins/main';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
// Ignored via go/ees005
// eslint-disable-next-line import/no-named-as-default
import ToolbarUndoRedo from './ui/ToolbarUndoRedo';
import type { UndoRedoPlugin } from './undoRedoPluginType';

export const undoRedoPlugin: UndoRedoPlugin = ({ api }) => {
	const primaryToolbarComponent: ToolbarUIComponentFactory = ({
		editorView,
		disabled,
		isToolbarReducedSpacing,
	}) => {
		return (
			<ToolbarUndoRedo
				isReducedSpacing={isToolbarReducedSpacing}
				disabled={disabled}
				editorView={editorView}
				api={api}
			/>
		);
	};
	api?.primaryToolbar?.actions.registerComponent({
		name: 'undoRedoPlugin',
		component: primaryToolbarComponent,
	});

	return {
		name: 'undoRedoPlugin',

		pmPlugins() {
			return [
				{
					name: 'undoRedoKeyMap',
					plugin: () => keymapPlugin(),
				},
				{
					name: 'undoRedoPlugin',
					plugin: (options) => createPlugin(options),
				},
			];
		},

		primaryToolbarComponent: !api?.primaryToolbar ? primaryToolbarComponent : undefined,
	};
};
