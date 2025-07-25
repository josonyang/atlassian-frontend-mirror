import type { Dispatch } from '@atlaskit/editor-common/event-dispatcher';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { ExtractInjectionAPI, PMPluginFactoryParams } from '@atlaskit/editor-common/types';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { DecorationSet } from '@atlaskit/editor-prosemirror/view';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';

import type { FindReplacePlugin } from '../findReplacePluginType';
import type { FindReplacePluginState } from '../types';

import { createPluginState, getPluginState } from './plugin-factory';
import { findReplacePluginKey } from './plugin-key';

export const initialState: FindReplacePluginState = {
	isActive: false,
	shouldFocus: false,
	findText: '',
	replaceText: '',
	index: 0,
	matches: [],
	decorationSet: DecorationSet.empty,
	shouldMatchCase: false,
};

export const createPlugin = (
	dispatch: Dispatch,
	getIntl: PMPluginFactoryParams['getIntl'],
	api?: ExtractInjectionAPI<FindReplacePlugin>,
) => {
	return new SafePlugin({
		key: findReplacePluginKey,
		state: createPluginState(dispatch, () =>
			expValEquals('platform_editor_find_and_replace_improvements', 'isEnabled', true) ||
			expValEquals('platform_editor_toggle_expand_on_match_found', 'isEnabled', true)
				? { ...initialState, getIntl, api }
				: { ...initialState },
		),
		props: {
			decorations(state: EditorState) {
				const { isActive, findText, decorationSet } = getPluginState(state);
				if (isActive && findText) {
					return decorationSet;
				}
			},
		},
	});
};
