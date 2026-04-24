import { type EslintNode, isNodeOfType } from 'eslint-codemod-utils';

export const isDecendantOfGlobalToken = (node: EslintNode): boolean => {
	if (
		isNodeOfType(node, 'CallExpression') &&
		isNodeOfType(node.callee, 'Identifier') &&
		(node.callee.name === 'token' || node.callee.name === 'getTokenValue')
	) {
		return true;
	}

	if (node.parent) {
		return isDecendantOfGlobalToken(node.parent);
	}

	return false;
};
