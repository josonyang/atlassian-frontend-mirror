import type { NextEditorPlugin, OptionalPlugin } from '@atlaskit/editor-common/types';
import type { AnalyticsPlugin } from '@atlaskit/editor-plugin-analytics';

import type {
	AutocompletePluginOptions,
	AutocompletePluginState,
} from './pm-plugins/autocomplete-plugin';

export type AutocompletePlugin = NextEditorPlugin<
	'autocomplete',
	{
		pluginConfiguration?: AutocompletePluginOptions | undefined;
		sharedState: AutocompletePluginState | undefined;
		dependencies: [OptionalPlugin<AnalyticsPlugin>];
	}
>;
