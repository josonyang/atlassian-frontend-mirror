import type { Rule } from 'eslint';
import { isNodeOfType } from 'eslint-codemod-utils';

export const isDecendantOfStyleJsxAttribute = (node: Rule.Node): boolean => {
	if (isNodeOfType(node, 'JSXAttribute')) {
		return true;
	}

	if (node.parent) {
		return isDecendantOfStyleJsxAttribute(node.parent);
	}

	return false;
};
