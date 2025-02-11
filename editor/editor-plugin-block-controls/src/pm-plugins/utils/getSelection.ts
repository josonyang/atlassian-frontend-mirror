import { GapCursorSelection, Side } from '@atlaskit/editor-common/selection';
import { ResolvedPos } from '@atlaskit/editor-prosemirror/model';
import {
	EditorState,
	NodeSelection,
	Selection,
	TextSelection,
	type Transaction,
} from '@atlaskit/editor-prosemirror/state';
import { findParentNodeOfType } from '@atlaskit/editor-prosemirror/utils';
import { selectTableClosestToPos } from '@atlaskit/editor-tables/utils';

export const getInlineNodePos = (
	tr: Transaction,
	start: number,
	nodeSize: number,
): { inlineNodePos: number; inlineNodeEndPos: number } => {
	const $startPos = tr.doc.resolve(start);
	// To trigger the annotation floating toolbar for non-selectable node, we need to select inline nodes
	// Find the first inline node in the node
	let inlineNodePos: number = start;
	let foundInlineNode = false;
	let inlineNodeEndPos = 0;

	tr.doc.nodesBetween($startPos.pos, $startPos.pos + nodeSize, (n, pos) => {
		if (n.isInline) {
			inlineNodeEndPos = pos + n.nodeSize;
		}

		if (n.isInline && !foundInlineNode) {
			inlineNodePos = pos;
			foundInlineNode = true;
		}

		return true;
	});
	return { inlineNodePos, inlineNodeEndPos };
};

const isNodeWithMedia = (tr: Transaction, start: number, nodeSize: number) => {
	const $startPos = tr.doc.resolve(start);
	let hasMedia = false;
	tr.doc.nodesBetween($startPos.pos, $startPos.pos + nodeSize, (n) => {
		if (n.type.name === 'media') {
			hasMedia = true;
		}
	});
	return hasMedia;
};

export const getSelection = (tr: Transaction, start: number) => {
	const node = tr.doc.nodeAt(start);
	const isNodeSelection = node && NodeSelection.isSelectable(node);
	const nodeSize = node ? node.nodeSize : 1;
	const $startPos = tr.doc.resolve(start);
	const nodeName = node?.type.name;
	const isBlockQuoteWithMedia = nodeName === 'blockquote' && isNodeWithMedia(tr, start, nodeSize);

	if (
		(isNodeSelection && nodeName !== 'blockquote') ||
		isBlockQuoteWithMedia ||
		// decisionList/layoutColumn node is not selectable, but we want to select the whole node not just text
		['decisionList', 'layoutColumn'].includes(nodeName || '')
	) {
		return new NodeSelection($startPos);
	} else if (nodeName === 'mediaGroup' && node?.childCount === 1) {
		const $mediaStartPos = tr.doc.resolve(start + 1);
		return new NodeSelection($mediaStartPos);
	} else if (
		// Even though mediaGroup is not selectable,
		// we need a quick way to make all child media nodes appear as selected without the need for a custom selection
		nodeName === 'mediaGroup'
	) {
		return new NodeSelection($startPos);
	} else {
		const { inlineNodePos, inlineNodeEndPos } = getInlineNodePos(tr, start, nodeSize);
		return new TextSelection(tr.doc.resolve(inlineNodeEndPos), tr.doc.resolve(inlineNodePos));
	}
};

export const selectNode = (tr: Transaction, start: number, nodeType: string): Transaction => {
	// For table, we need to do cell selection instead of node selection
	if (nodeType === 'table') {
		tr = selectTableClosestToPos(tr, tr.doc.resolve(start + 1));
	} else {
		tr.setSelection(getSelection(tr, start));
	}
	return tr;
};

export const setCursorPositionAtMovedNode = (tr: Transaction, start: number): Transaction => {
	const node = tr.doc.nodeAt(start);
	const isNodeSelection = node && NodeSelection.isSelectable(node);

	const nodeSize = node ? node.nodeSize : 1;
	let selection: GapCursorSelection | TextSelection;
	// decisionList node is not selectable, but we want to select the whole node not just text
	// blockQuote is selectable, but we want to set cursor at the inline end Pos instead of the gap cursor as this causes jittering post drop
	if ((isNodeSelection && node.type.name !== 'blockquote') || node?.type.name === 'decisionList') {
		selection = new GapCursorSelection(tr.doc.resolve(start + node.nodeSize), Side.RIGHT);
	} else {
		const { inlineNodeEndPos } = getInlineNodePos(tr, start, nodeSize);
		selection = new TextSelection(tr.doc.resolve(inlineNodeEndPos));
	}

	tr.setSelection(selection);
	return tr;
};

/**
 * Checks if handle position is with the selection or corresponds to a (partially) selected node
 * @param state
 * @param selection
 * @param handlePos
 * @returns
 */
export const isHandleInSelection = (
	state: EditorState,
	selection: Selection,
	handlePos: number,
): boolean => {
	if (selection.empty) {
		return false;
	}
	const $selectionFrom = selection.$from;
	const selectionFrom = $selectionFrom.pos;
	let nodeStart = $selectionFrom.depth ? $selectionFrom.before() : selectionFrom;
	const $resolvedNodePos = state.doc.resolve(nodeStart);

	if (['tableRow', 'tableCell', 'tableHeader'].includes($resolvedNodePos.node().type.name)) {
		const parentNodeFindRes = findParentNodeOfType(state.schema.nodes['table'])(selection);
		const tablePos = parentNodeFindRes?.pos;
		nodeStart = typeof tablePos === 'undefined' ? nodeStart : tablePos;
	} else if (['listItem'].includes($resolvedNodePos.node().type.name)) {
		nodeStart = $resolvedNodePos.before(rootListDepth($resolvedNodePos));
	} else if (['taskList'].includes($resolvedNodePos.node().type.name)) {
		const listdepth = rootTaskListDepth($resolvedNodePos);
		nodeStart = $resolvedNodePos.before(listdepth);
	} else if (['blockquote'].includes($resolvedNodePos.node().type.name)) {
		nodeStart = $resolvedNodePos.before();
	}

	return Boolean(handlePos < selection.$to.pos && handlePos >= nodeStart);
};

export const rootListDepth = (itemPos: ResolvedPos) => {
	let depth;
	for (let i = itemPos.depth; i > 1; i -= 2) {
		const node = itemPos.node(i);
		if (node.type.name === 'listItem') {
			depth = i - 1;
		} else {
			break;
		}
	}
	return depth;
};

export const rootTaskListDepth = (taskListPos: ResolvedPos) => {
	let depth;
	for (let i = taskListPos.depth; i > 0; i--) {
		const node = taskListPos.node(i);
		if (node.type.name === 'taskList' || node.type.name === 'taskItem') {
			depth = i;
		} else {
			break;
		}
	}
	return depth;
};
