import type { Rule } from 'eslint';
import { isNodeOfType } from 'eslint-codemod-utils';

export const isDecendantOfSvgElement = (node: Rule.Node): boolean => {
	if (isNodeOfType(node, 'JSXElement')) {
		// @ts-ignore
		if (node.openingElement.name.name === 'svg') {
			return true;
		}
	}

	if (node.parent) {
		return isDecendantOfSvgElement(node.parent);
	}

	return false;
};
