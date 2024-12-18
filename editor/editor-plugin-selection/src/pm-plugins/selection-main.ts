import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import type { Dispatch } from '@atlaskit/editor-common/event-dispatcher';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { SelectionPluginState } from '@atlaskit/editor-common/selection';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { NodeSelection, TextSelection } from '@atlaskit/editor-prosemirror/state';

import type { SelectionPluginOptions } from '../types';
import { selectionPluginKey } from '../types';

import { SelectionActionTypes } from './actions';
import { onCreateSelectionBetween } from './events/create-selection-between';
import { createOnKeydown } from './events/keydown';
import { createPluginState, getPluginState } from './plugin-factory';
import { getDecorations, shouldRecalcDecorations } from './utils';

export const getInitialState = (state: EditorState): SelectionPluginState => ({
	decorationSet: getDecorations(state.tr),
	selection: state.selection,
});

export const createPlugin = (
	dispatch: Dispatch,
	dispatchAnalyticsEvent: DispatchAnalyticsEvent,
	options: SelectionPluginOptions = {},
) => {
	return new SafePlugin({
		key: selectionPluginKey,
		state: createPluginState(dispatch, getInitialState),
		appendTransaction(_transactions, oldEditorState, newEditorState) {
			if (!shouldRecalcDecorations({ oldEditorState, newEditorState })) {
				return;
			}

			const { tr } = newEditorState;
			tr.setMeta(selectionPluginKey, {
				type: SelectionActionTypes.SET_DECORATIONS,
				selection: tr.selection,
				decorationSet: getDecorations(tr),
			});

			return tr;
		},

		filterTransaction(tr, state) {
			// Prevent single click selecting atom nodes on mobile (we want to select with long press gesture instead)
			if (
				options.useLongPressSelection &&
				tr.selectionSet &&
				tr.selection instanceof NodeSelection &&
				!tr.getMeta(selectionPluginKey)
			) {
				return false;
			}

			// Prevent prosemirror's mutation observer overriding a node selection with a text selection
			// for exact same range - this was cause of being unable to change dates in collab:
			// https://product-fabric.atlassian.net/browse/ED-10645
			if (
				state.selection instanceof NodeSelection &&
				tr.selection instanceof TextSelection &&
				state.selection.from === tr.selection.from &&
				state.selection.to === tr.selection.to
			) {
				return false;
			}

			return true;
		},

		props: {
			createSelectionBetween: onCreateSelectionBetween,
			decorations(state) {
				return getPluginState(state).decorationSet;
			},

			handleDOMEvents: {
				keydown: createOnKeydown({ __livePage: options.__livePage }),
			},
		},
	});
};
