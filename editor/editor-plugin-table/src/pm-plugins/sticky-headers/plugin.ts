import type { Dispatch } from '@atlaskit/editor-common/event-dispatcher';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';

import { pluginKey } from './plugin-key';
import { createPluginState } from './plugin-state';
import type { StickyPluginState } from './types';

export const createPlugin = (
	dispatch: Dispatch,
	initialState = (): never[] => [],
): SafePlugin<StickyPluginState> => {
	return new SafePlugin({
		state: createPluginState(dispatch, initialState),
		key: pluginKey,
	});
};
