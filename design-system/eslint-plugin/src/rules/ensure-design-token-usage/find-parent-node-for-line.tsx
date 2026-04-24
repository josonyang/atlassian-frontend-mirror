import type { Rule } from 'eslint';

/**
 * @param node
 * @returns The furthest parent node that is on the same line as the input node.
 */
export const findParentNodeForLine = (node: Rule.Node): Rule.Node => {
	if (!node.parent) {
		return node;
	}
	if (node.loc?.start.line !== node.parent.loc?.start.line) {
		return node;
	} else {
		return findParentNodeForLine(node.parent);
	}
};
