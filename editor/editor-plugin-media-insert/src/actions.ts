import type { Transaction } from '@atlaskit/editor-prosemirror/state';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import { pluginKey } from './pm-plugins/plugin-key';

export type MediaInsertPluginAction = typeof ACTION_OPEN_POPUP | typeof ACTION_CLOSE_POPUP;

export const ACTION_OPEN_POPUP = 'OPEN_POPUP';
export const ACTION_CLOSE_POPUP = 'CLOSE_POPUP';

const setPopupMeta = ({ type, tr }: { type: MediaInsertPluginAction; tr: Transaction }) =>
	tr.setMeta(pluginKey, { type });

export const showMediaInsertPopup = (tr: Transaction) => {
	// Log exposure here but don't actually switch anything on it
	editorExperiment('add-media-from-url', true, {
		exposure: true,
	});
	return setPopupMeta({ type: ACTION_OPEN_POPUP, tr });
};

export const closeMediaInsertPicker = (tr: Transaction) => {
	return setPopupMeta({ type: ACTION_CLOSE_POPUP, tr });
};
