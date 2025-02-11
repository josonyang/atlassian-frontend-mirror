import {
	isIgnored as isIgnoredByGapCursor,
	isSelectionAtStartOfNode,
} from '@atlaskit/editor-common/selection';
import { isEmptyParagraph } from '@atlaskit/editor-common/utils';
import type { Node as PmNode, ResolvedPos } from '@atlaskit/editor-prosemirror/model';
import type {
	EditorState,
	ReadonlyTransaction,
	Transaction,
} from '@atlaskit/editor-prosemirror/state';
import {
	AllSelection,
	NodeSelection,
	Selection,
	TextSelection,
} from '@atlaskit/editor-prosemirror/state';
import type { ContentNodeWithPos, NodeWithPos } from '@atlaskit/editor-prosemirror/utils';
import { findParentNode, flatten } from '@atlaskit/editor-prosemirror/utils';
import { Decoration, DecorationSet } from '@atlaskit/editor-prosemirror/view';
import { akEditorSelectedNodeClassName } from '@atlaskit/editor-shared-styles';

import { selectionPluginKey } from '../types';

export const getDecorations = (
	tr: Transaction | ReadonlyTransaction,
	manualSelection?: { anchor: number; head: number },
): DecorationSet => {
	let selection = tr.selection;
	if (selection instanceof NodeSelection) {
		return DecorationSet.create(tr.doc, [
			Decoration.node(selection.from, selection.to, {
				class: akEditorSelectedNodeClassName,
			}),
		]);
	}
	if (selection instanceof TextSelection || selection instanceof AllSelection) {
		if (
			manualSelection &&
			manualSelection.anchor >= 0 &&
			manualSelection.head >= 0 &&
			manualSelection.anchor <= tr.doc.nodeSize &&
			manualSelection.head <= tr.doc.nodeSize
		) {
			selection = TextSelection.create(tr.doc, manualSelection.anchor, manualSelection.head);
		}
		const decorations = getNodesToDecorateFromSelection(selection, tr.doc).map(({ node, pos }) => {
			return Decoration.node(pos, pos + node.nodeSize, {
				class: akEditorSelectedNodeClassName,
			});
		});
		return DecorationSet.create(tr.doc, decorations);
	}
	return DecorationSet.empty;
};

const topLevelBlockNodesThatHaveSelectionStyles = [
	'table',
	'panel',
	'expand',
	'layoutSection',
	'decisionList',
	'decisionItem',
	'codeBlock',
];

/**
 * Use `getNodesToDecorateFromSelection` to collect and return
 * a list of nodes within the Selection that should have Selection
 * decorations applied. This allows selection styles to be added to
 * nested nodes. It will ignore text nodes as decorations are
 * applied natively and also ignore nodes that don't completely
 * sit within the given `Selection`.
 */
export const getNodesToDecorateFromSelection = (selection: Selection, doc: PmNode) => {
	const nodes: { node: PmNode; pos: number }[] = [];
	if (selection.from !== selection.to) {
		const { from, to } = selection;

		doc.nodesBetween(from, to, (node, pos) => {
			const withinSelection = from <= pos && pos + node.nodeSize <= to;
			// The reason we need to check for these nodes is to stop
			// traversing their children if they are within a selection -
			// this is to prevent selection styles from being added to
			// the children as well as the parent node.
			// Example scenario is if an entire table has been selected
			// we should not traverse its children so we can apply the
			// selection styles to the table. But if an entire tableRow
			// has been selected (but the parent table has not) we should
			// traverse it as it could contain other nodes that need
			// selection styles. I couldn’t see a clear way to differentiate
			// without explicitly stating which nodes should be traversed
			// and which shouldn’t.
			const isTopLevelNodeThatHasSelectionStyles =
				topLevelBlockNodesThatHaveSelectionStyles.includes(node.type.name);
			// If the node is a top-level block node and completely sits within
			// the selection, we do not recurse it's children to prevent selection
			// styles being added to its child nodes. The expected behaviour
			// is that selection styles are only added to the parent.
			if (node && withinSelection && isTopLevelNodeThatHasSelectionStyles) {
				nodes.push({ node, pos });
				return false;
				// Otherwise we recurse the children and return them so we can apply
				// selection styles. Text is handled by the browser.
			} else if (node && withinSelection && !node.isText) {
				nodes.push({ node, pos });
			}
			return true;
		});
	}
	return nodes;
};

export function shouldRecalcDecorations({
	oldEditorState,
	newEditorState,
}: {
	oldEditorState: EditorState;
	newEditorState: EditorState;
}): boolean {
	const oldSelection = oldEditorState.selection;
	const newSelection = newEditorState.selection;
	const oldPluginState = selectionPluginKey.getState(oldEditorState);
	const newPluginState = selectionPluginKey.getState(newEditorState);

	if (!oldPluginState || !newPluginState) {
		return false;
	}

	// If selection is unchanged, no need to recalculate
	if (oldSelection.eq(newSelection)) {
		// We need this special case for NodeSelection, as Prosemirror still thinks the
		// selections are equal when the node has changed
		if (oldSelection instanceof NodeSelection && newSelection instanceof NodeSelection) {
			const oldDecorations = oldPluginState.decorationSet.find();
			const newDecorations = newPluginState.decorationSet.find();
			// There might not be old or new decorations if the node selection is for a text node
			// This wouldn't have happened intentionally, but we need to handle this case regardless
			if (oldDecorations.length > 0 && newDecorations.length > 0) {
				return !(
					oldDecorations[0] as Decoration & {
						eq: (other: Decoration) => boolean;
					}
				).eq(newDecorations[0]);
			}
			return !(oldDecorations.length === 0 && newDecorations.length === 0);
		}
		return false;
	}

	// There's no point updating decorations if going from one standard TextSelection to another
	if (
		oldSelection instanceof TextSelection &&
		newSelection instanceof TextSelection &&
		oldSelection.from === oldSelection.to &&
		newSelection.from === newSelection.to
	) {
		return false;
	}

	return true;
}

export const isSelectableContainerNode = (node?: PmNode | null): boolean =>
	!!(node && !node.isAtom && NodeSelection.isSelectable(node));

export const isSelectableChildNode = (node?: PmNode | null): boolean =>
	!!(node && (node.isText || isEmptyParagraph(node) || NodeSelection.isSelectable(node)));

/**
 * Finds closest parent node that is a selectable block container node
 * If it finds a parent that is not selectable but supports gap cursor, will
 * return undefined
 */
export const findSelectableContainerParent = (
	selection: Selection,
): ContentNodeWithPos | undefined => {
	let foundNodeThatSupportsGapCursor = false;
	const selectableNode = findParentNode((node) => {
		const isSelectable = isSelectableContainerNode(node);
		if (!isSelectable && !isIgnoredByGapCursor(node)) {
			foundNodeThatSupportsGapCursor = true;
		}
		return isSelectable;
	})(selection);

	if (!foundNodeThatSupportsGapCursor) {
		return selectableNode;
	}
};

/**
 * Finds node before that is a selectable block container node, starting
 * from $pos.depth + 1 and working in
 * If it finds a node that is not selectable but supports gap cursor, will
 * return undefined
 */
export const findSelectableContainerBefore = (
	$pos: ResolvedPos,
	doc: PmNode,
): NodeWithPos | undefined => {
	// prosemirror just returns the same pos from Selection.findFrom when
	// parent.inlineContent is true, so we move position back one here
	// to counteract that
	if ($pos.parent.inlineContent && isSelectableContainerNode($pos.parent)) {
		$pos = doc.resolve($pos.start() - 1);
	}
	const selectionBefore = Selection.findFrom($pos, -1);
	if (selectionBefore) {
		const $selectionBefore = doc.resolve(selectionBefore.from);
		for (let i = $pos.depth + 1; i <= $selectionBefore.depth; i++) {
			const node = $selectionBefore.node(i);
			if (isSelectableContainerNode(node)) {
				return {
					node,
					pos: $selectionBefore.start(i) - 1,
				};
			}
			if (i > $pos.depth + 1 && !isIgnoredByGapCursor(node)) {
				return;
			}
		}

		/**
		 * Stick to the default left selection behaviour,
		 * useful for mediaSingleWithCaption
		 */
		if (
			selectionBefore instanceof NodeSelection &&
			NodeSelection.isSelectable(selectionBefore.node)
		) {
			return {
				node: selectionBefore.node,
				pos: selectionBefore.from,
			};
		}
	}
};

/**
 * Finds node after that is a selectable block container node, starting
 * from $pos.depth + 1 and working in
 * If it finds a node that is not selectable but supports gap cursor, will
 * return undefined
 */
export const findSelectableContainerAfter = (
	$pos: ResolvedPos,
	doc: PmNode,
): NodeWithPos | undefined => {
	const selectionAfter = Selection.findFrom($pos, 1);
	if (selectionAfter) {
		const $selectionAfter = doc.resolve(selectionAfter.from);
		for (let i = $pos.depth + 1; i <= $selectionAfter.depth; i++) {
			const node = $selectionAfter.node(i);
			if (isSelectableContainerNode(node)) {
				return {
					node,
					pos: $selectionAfter.start(i) - 1,
				};
			}
			if (i > $pos.depth + 1 && !isIgnoredByGapCursor(node)) {
				return;
			}
		}
	}
};

/**
 * Finds first child node that is a selectable block container node OR that
 * supports gap cursor
 */
export const findFirstChildNodeToSelect = (parent: PmNode): NodeWithPos | undefined =>
	flatten(parent).find(
		(child) => isSelectableChildNode(child.node) || !isIgnoredByGapCursor(child.node),
	);

/**
 * Finds last child node that is a selectable block container node OR that
 * supports gap cursor
 */
export const findLastChildNodeToSelect = (parent: PmNode): NodeWithPos | undefined => {
	let child: NodeWithPos | undefined;
	parent.descendants((node, pos) => {
		if (isSelectableChildNode(node) || !isIgnoredByGapCursor(node)) {
			child = { node, pos };
			return false;
		}
	});
	if (child) {
		return child;
	}
};

export const isSelectionAtStartOfParentNode = ($pos: ResolvedPos, selection: Selection) =>
	isSelectionAtStartOfNode($pos, findSelectableContainerParent(selection));

export const isSelectionAtEndOfParentNode = ($pos: ResolvedPos, selection: Selection) => {
	const isAtTheEndOfCurrentLevel = $pos.parent.content.size === $pos.parentOffset;
	if (!isAtTheEndOfCurrentLevel) {
		return false;
	}

	if ($pos.depth === 0 || NodeSelection.isSelectable($pos.parent)) {
		return isAtTheEndOfCurrentLevel;
	}

	const $after = $pos.doc.resolve($pos.after());
	return $after.parent.content.size === $after.parentOffset;
};
