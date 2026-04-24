import { isNodeOfType, type JSXAttribute, type JSXElement } from 'eslint-codemod-utils';

/**
 * Returns the `spacing` JSXAttribute from an icon element, or undefined.
 */
export function getSpacingAttribute(node: JSXElement): JSXAttribute | undefined {
	if (!isNodeOfType(node.openingElement, 'JSXOpeningElement')) {
		return undefined;
	}
	return node.openingElement.attributes.find(
		(a): a is JSXAttribute => a.type === 'JSXAttribute' && a.name.name === 'spacing',
	);
}
