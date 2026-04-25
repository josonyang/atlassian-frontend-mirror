import { PluginKey } from '@atlaskit/editor-prosemirror/state';

import type { AnalyticPluginState } from './types';

export const pluginKey: PluginKey<AnalyticPluginState> = new PluginKey<AnalyticPluginState>(
	'tableAnalyticPlugin',
);
