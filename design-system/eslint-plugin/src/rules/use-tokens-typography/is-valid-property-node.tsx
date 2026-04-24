import { isNodeOfType, type Property } from 'eslint-codemod-utils';

export function isValidPropertyNode(node: Property): boolean {
	if (!isNodeOfType(node.key, 'Identifier') && !isNodeOfType(node.key, 'Literal')) {
		return false;
	}

	return true;
}
