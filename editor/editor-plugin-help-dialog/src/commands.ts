import type { Transaction } from '@atlaskit/editor-prosemirror/state';

import { pluginKey } from './plugin-key';

export const openHelpCommand = (tr: Transaction, dispatch?: Function): boolean => {
	tr = tr.setMeta(pluginKey, true);
	if (dispatch) {
		dispatch(tr);
		return true;
	}
	return false;
};
export const closeHelpCommand = (tr: Transaction, dispatch: Function): void => {
	tr = tr.setMeta(pluginKey, false);
	dispatch(tr);
};
