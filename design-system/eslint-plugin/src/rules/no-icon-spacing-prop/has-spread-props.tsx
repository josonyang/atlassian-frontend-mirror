import { type JSXElement } from 'eslint-codemod-utils';

/**
 * Returns true if the element has any JSXSpreadAttribute.
 */
export function hasSpreadProps(node: JSXElement): boolean {
	return node.openingElement.attributes.some((a) => a.type === 'JSXSpreadAttribute');
}
