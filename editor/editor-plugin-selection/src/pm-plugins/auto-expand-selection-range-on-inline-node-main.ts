import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { NodeSelection, TextSelection } from '@atlaskit/editor-prosemirror/state';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import { autoExpandSelectionRangeOnInlineNodePluginKey } from './auto-expand-selection-range-on-inline-node-key';

export const createAutoExpandSelectionRangeOnInlineNodePlugin = () => {
	let mouseDownElement: HTMLElement | null = null;

	return new SafePlugin({
		key: autoExpandSelectionRangeOnInlineNodePluginKey,
		props: {
			handleDOMEvents: {
				mousedown: (_view, event) => {
					mouseDownElement = event.target as HTMLElement;
				},
				mouseup: (view, event) => {
					const mouseUpElement = event.target as HTMLElement;

					// terminate early if mouse down and mouse up elements are the same -> e.g a click event
					if (mouseDownElement === mouseUpElement) {
						return;
					}

					// terminate early if mouse up event is not fired on inline node
					if (!isMouseUpOnSupportedNode(mouseUpElement)) {
						return;
					}

					const { dispatch, state } = view;
					const { selection } = state;

					// terminate early if current selection is on a node
					if (selection instanceof NodeSelection) {
						return;
					}

					// only expand range when experiment is enabled, also fire exposure events here
					if (
						editorExperiment('expand_selection_range_to_include_inline_node', true, {
							exposure: true,
						})
					) {
						// find the document position of the mouse up element
						const elementStartPosition = view.posAtDOM(mouseUpElement, 0);

						// find out the direction of selection
						const isAnchorBeforeElement = selection.$anchor.pos <= elementStartPosition;
						const expandedSelectionHeadPosition = isAnchorBeforeElement
							? elementStartPosition + 1
							: elementStartPosition;

						// expand the selection to include the mouse up element
						const tr = state.tr.setSelection(
							TextSelection.create(state.doc, selection.$anchor.pos, expandedSelectionHeadPosition),
						);
						dispatch(tr);
					}
				},
			},
		},
	});
};

const isMouseUpOnSupportedNode = (mouseUpElement: HTMLElement) => {
	const supportedNodes = ['emoji', 'status', 'date', 'mention', 'inlineCard'];
	const supportedNodeViewContentClassNamesList = supportedNodes
		.map((nodeType) => `.${nodeType}View-content-wrap`)
		.join(', ');
	return !!mouseUpElement.closest(supportedNodeViewContentClassNamesList);
};
