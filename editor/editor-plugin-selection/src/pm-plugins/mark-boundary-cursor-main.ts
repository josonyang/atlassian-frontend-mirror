import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { DecorationSet } from '@atlaskit/editor-prosemirror/view';

import { createMarkBoundaryCursorDecoration } from '../mark-boundary-cursor/ui/mark-boundary-cursor-decoration';
import { getActiveMarksSide } from '../mark-boundary-cursor/utils/active-marks-side';

import { markBoundaryCursorPluginKey } from './mark-boundary-cursor-plugin-key';

export const createMarkBoundaryCursorPlugin = () => {
	return new SafePlugin({
		key: markBoundaryCursorPluginKey,
		state: {
			init: () => ({
				decorations: DecorationSet.empty,
			}),
			apply(tr, currentState) {
				const { selection, storedMarks, doc, selectionSet, storedMarksSet } = tr;

				if (!selectionSet && !storedMarksSet) {
					return currentState;
				}

				const side = getActiveMarksSide({ selection, storedMarks });

				if (!side) {
					return {
						decorations: DecorationSet.empty,
					};
				}

				return {
					decorations: DecorationSet.create(doc, [
						createMarkBoundaryCursorDecoration(selection.head, side),
					]),
				};
			},
		},
		props: {
			decorations: (state: EditorState) => {
				return markBoundaryCursorPluginKey.getState(state)?.decorations;
			},
		},
	});
};
