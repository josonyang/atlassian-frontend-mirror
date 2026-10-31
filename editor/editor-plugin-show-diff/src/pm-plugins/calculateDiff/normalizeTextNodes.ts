import { Fragment, type Node as PMNode } from '@atlaskit/editor-prosemirror/model';

/**
 * Returns a copy of `node` in which adjacent text nodes with identical marks are joined, the same
 * normalisation ProseMirror applies whenever it rebuilds a node's content. A document parsed straight
 * from ADF keeps such split runs, so two documents with identical content and positions can still
 * differ in child count.
 */
export const normalizeTextNodes = (node: PMNode): PMNode => {
	if (node.isText || node.childCount === 0) {
		return node;
	}

	const children: PMNode[] = [];
	node.content.forEach((child) => children.push(normalizeTextNodes(child)));

	return node.copy(Fragment.fromArray(children));
};
