/* eslint-disable @atlaskit/platform/ensure-feature-flag-prefix */
import type { Node as PmNode } from '@atlaskit/editor-prosemirror/model';
import { type EditorState } from '@atlaskit/editor-prosemirror/state';
import { type NodeWithPos } from '@atlaskit/editor-prosemirror/utils';
import { fg } from '@atlaskit/platform-feature-flags';

export const defaultWordWrapState = false;

export const codeBlockWrappedStates: WeakMap<PmNode, boolean | undefined> = new WeakMap();

export const isCodeBlockWordWrapEnabled = (codeBlockNode: PmNode): boolean => {
	if (!fg('editor_support_code_block_wrapping')) {
		return false;
	}
	const currentNodeWordWrapState = codeBlockWrappedStates.get(codeBlockNode);

	return currentNodeWordWrapState !== undefined ? currentNodeWordWrapState : defaultWordWrapState;
};

/**
 * Swap the old node key with the new node key in the wrapped states WeakMap.
 * Replaced with updateCodeBlockWrappedStateNodeKeys() under 'editor_code_block_wrapping_language_change_bug' feature gate.
 */
export const transferCodeBlockWrappedValue = (
	oldCodeBlockNode: PmNode,
	newCodeBlockNode: PmNode,
): void => {
	if (!fg('editor_support_code_block_wrapping')) {
		return;
	}
	// Don't overwrite the value for the new node if it already exists.
	// This can happen when a drag&drop is swapping nodes.
	if (codeBlockWrappedStates.has(newCodeBlockNode)) {
		return;
	}

	const previousValue = isCodeBlockWordWrapEnabled(oldCodeBlockNode);

	codeBlockWrappedStates.set(newCodeBlockNode, previousValue);

	codeBlockWrappedStates.delete(oldCodeBlockNode);
};

/**
 * As the code block node is used as the wrapped state key, there is instances where the node will be destroyed & recreated and is no longer a valid key.
 * In these instances, we must get the value from that old node and set it to the value of the new node.
 * This function takes all the given nodes, finds their old nodes from the old state and updates these old node keys.
 */
export const updateCodeBlockWrappedStateNodeKeys = (
	newCodeBlockNodes: NodeWithPos[],
	oldState: EditorState,
): void => {
	if (
		!fg('editor_support_code_block_wrapping') ||
		!fg('editor_code_block_wrapping_language_change_bug')
	) {
		return;
	}

	newCodeBlockNodes.forEach((newCodeBlockNode) => {
		// Don't overwrite the value for the new node if it already exists.
		// This can happen when a drag&drop is swapping nodes.
		if (codeBlockWrappedStates.has(newCodeBlockNode.node)) {
			return;
		}

		// Do not go out of range on the oldState doc. Happens on initial load.
		if (oldState.doc.nodeSize <= newCodeBlockNode.pos) {
			return;
		}

		const oldCodeBlockNode = oldState.doc.nodeAt(newCodeBlockNode.pos);
		if (!oldCodeBlockNode || oldCodeBlockNode.type !== oldState.schema.nodes.codeBlock) {
			return;
		}

		const previousValue = isCodeBlockWordWrapEnabled(oldCodeBlockNode);

		codeBlockWrappedStates.set(newCodeBlockNode.node, previousValue);
	});
};
