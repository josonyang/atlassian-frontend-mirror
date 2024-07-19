import { createElement } from 'react';

import ReactDOM from 'react-dom';
import { type IntlShape, RawIntlProvider } from 'react-intl-next';

import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { Decoration } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';

import type { BlockControlsPlugin, HandleOptions } from '../types';
import { DragHandle } from '../ui/drag-handle';
import { DropTarget } from '../ui/drop-target';
import { MouseMoveWrapper } from '../ui/mouse-move-wrapper';

export const dropTargetDecorations = (
	oldState: EditorState,
	newState: EditorState,
	api: ExtractInjectionAPI<BlockControlsPlugin>,
) => {
	const decs: Decoration[] = [];
	unmountDecorations('data-blocks-drop-target-container');
	// Decoration state is used to keep track of the position of the drop targets
	// and allows us to easily map the updated position in the plugin apply method.
	const decorationState: { index: number; pos: number }[] = [];
	let prevNode: PMNode | undefined;

	oldState.doc.nodesBetween(0, newState.doc.nodeSize - 2, (node, pos, _parent, index) => {
		decorationState.push({ index, pos });
		const dropTargetDec = createElement(DropTarget, {
			api,
			index,
			prevNode,
			nextNode: node,
		});

		decs.push(
			Decoration.widget(
				pos,
				() => {
					const element = document.createElement('div');
					element.setAttribute('data-blocks-drop-target-container', 'true');
					element.style.clear = 'unset';
					ReactDOM.render(dropTargetDec, element);
					return element;
				},
				{
					type: 'drop-target-decoration',
					side: -1,
				},
			),
		);
		prevNode = node;
		return false;
	});

	/**
	 * We are adding a drop target at the end of the document because by default we
	 * draw all drop targets at the top of every node. It's better to draw the drop targets
	 * at the top of each node because that way we only need to know the start position of the
	 * node and not its size.
	 *
	 */
	decorationState.push({
		index: decorationState.length + 1,
		pos: newState.doc.nodeSize - 2,
	});
	decs.push(
		Decoration.widget(
			newState.doc.nodeSize - 2,
			() => {
				const element = document.createElement('div');
				element.setAttribute('data-blocks-drop-target-container', 'true');
				ReactDOM.render(
					createElement(DropTarget, {
						api,
						index: decorationState.length,
					}),
					element,
				);
				return element;
			},
			{
				type: 'drop-target-decoration',
			},
		),
	);

	return { decs, decorationState };
};

export const emptyParagraphNodeDecorations = () => {
	const anchorName = `--node-anchor-paragraph-0`;
	const style = `anchor-name: ${anchorName}; margin-top: 0px;`;
	return Decoration.node(
		0,
		2,
		{
			style,
			['data-drag-handler-anchor-name']: anchorName,
		},
		{
			type: 'node-decoration',
		},
	);
};
export const nodeDecorations = (newState: EditorState) => {
	const decs: Decoration[] = [];
	newState.doc.descendants((node, pos, _parent, index) => {
		const anchorName = `--node-anchor-${node.type.name}-${index}`;
		let style;
		if (fg('platform.editor.elements.drag-and-drop-remove-wrapper_fyqr2')) {
			style = `anchor-name: ${anchorName}; ${pos === 0 ? 'margin-top: 0px;' : ''}; position: relative; z-index: 1;`;
		} else {
			style = `anchor-name: ${anchorName}; ${pos === 0 ? 'margin-top: 0px;' : ''}`;
		}

		decs.push(
			Decoration.node(
				pos,
				pos + node.nodeSize,
				{
					style,
					['data-drag-handler-anchor-name']: anchorName,
					['data-drag-handler-node-type']: node.type.name,
				},
				{
					type: 'node-decoration',
				},
			),
		);
		return false;
	});
	return decs;
};
/**
 * Setting up decorations around each node to track mousemove events into each node
 * When a mouseenter event is triggered on the node, we will set the activeNode to the node
 * And show the drag handle
 */
export const mouseMoveWrapperDecorations = (
	newState: EditorState,
	api: ExtractInjectionAPI<BlockControlsPlugin>,
) => {
	const decs: Decoration[] = [];
	unmountDecorations('data-blocks-decoration-container');

	newState.doc.descendants((node, pos, _parent, index) => {
		// Do not render a mouse move wrapper for nodes that have wrapping - this causes wrapping to break
		const hasWrapping = node.attrs.layout === 'wrap-left' || node.attrs.layout === 'wrap-right';
		if (hasWrapping) {
			return false;
		}
		const anchorName = `--node-anchor-${node.type.name}-${index}`;

		decs.push(
			Decoration.widget(
				pos,
				(view, getPos) => {
					const element = document.createElement('div');
					element.setAttribute('data-blocks-decoration-container', 'true');
					element.setAttribute('style', 'clear: unset;');
					ReactDOM.render(
						createElement(MouseMoveWrapper, {
							view,
							api,
							anchorName,
							nodeType: node.type.name,
							getPos,
						}),
						element,
					);
					return element;
				},
				{
					type: 'mouse-move-wrapper',
					side: -1,
					ignoreSelection: true,
					stopEvent: (e) => {
						return true;
					},
				},
			),
		);
		return false;
	});
	return decs;
};

export const dragHandleDecoration = (
	api: ExtractInjectionAPI<BlockControlsPlugin>,
	getIntl: () => IntlShape,
	pos: number,
	anchorName: string,
	nodeType: string,
	handleOptions?: HandleOptions,
) => {
	const elementType = fg('platform_editor_element_drag_and_drop_ed_24150') ? 'span' : 'div';

	return Decoration.widget(
		pos,
		(view, getPos) => {
			const element = document.createElement(elementType);
			// Need to set it to inline to avoid text being split when merging two paragraphs
			element.style.display = 'inline';
			element.setAttribute('data-testid', 'block-ctrl-decorator-widget');
			element.setAttribute('data-blocks-drag-handle-container', 'true');

			if (fg('platform_editor_element_drag_and_drop_ed_23896')) {
				unmountDecorations('data-blocks-drag-handle-container');
			}

			if (fg('platform.editor.elements.drag-and-drop-remove-wrapper_fyqr2')) {
				// There are times when global clear: "both" styles are applied to this decoration causing jumpiness
				// due to margins applied to other nodes eg. Headings
				element.style.clear = 'unset';
			}
			ReactDOM.render(
				createElement(
					RawIntlProvider,
					{ value: getIntl() },
					createElement(DragHandle, {
						view,
						api,
						getPos,
						anchorName,
						nodeType,
						handleOptions,
					}),
				),
				element,
			);
			return element;
		},
		{
			side: -1,
			id: 'drag-handle',
			destroy: (node) => {
				if (!fg('platform_editor_element_drag_and_drop_ed_23896')) {
					ReactDOM.unmountComponentAtNode(node as HTMLDivElement);
				}
			},
		},
	);
};

const unmountDecorations = (selector: string) => {
	// Removing decorations manually instead of using native destroy function in prosemirror API
	// as it was more responsive and causes less re-rendering
	const decorationsToRemove = document.querySelectorAll(`[${selector}="true"]`);
	decorationsToRemove.forEach((el) => {
		ReactDOM.unmountComponentAtNode(el);
	});
};
