import { PluginKey } from '@atlaskit/editor-prosemirror/state';

import type { ViewModeSortPluginState } from './types';

export const tableViewModeSortPluginKey: PluginKey<ViewModeSortPluginState> =
	new PluginKey<ViewModeSortPluginState>('tableViewModeSortPlugin');
