import type { Command, NextEditorPlugin, OptionalPlugin } from '@atlaskit/editor-common/types';
import type { AnalyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import type { PrimaryToolbarPlugin } from '@atlaskit/editor-plugin-primary-toolbar';
import type { SelectionToolbarPlugin } from '@atlaskit/editor-plugin-selection-toolbar';
import type { UserPreferencesPlugin } from '@atlaskit/editor-plugin-user-preferences';

import type { TextColorPluginConfig, TextColorPluginState } from './pm-plugins/main';
import type { TextColorInputMethod } from './types';

export type TextColorPluginOptions = TextColorPluginConfig | boolean;

export type Dependencies = [
	OptionalPlugin<AnalyticsPlugin>,
	OptionalPlugin<PrimaryToolbarPlugin>,
	OptionalPlugin<SelectionToolbarPlugin>,
	OptionalPlugin<UserPreferencesPlugin>,
];

export type TextColorPlugin = NextEditorPlugin<
	'textColor',
	{
		pluginConfiguration: TextColorPluginOptions | undefined;
		dependencies: Dependencies;
		actions: {
			changeColor: (color: string, inputMethod?: TextColorInputMethod) => Command;
		};
		sharedState: TextColorPluginState | undefined;
	}
>;
