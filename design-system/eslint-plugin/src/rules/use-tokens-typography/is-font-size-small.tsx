import { type CallExpression, type EslintNode, isNodeOfType } from 'eslint-codemod-utils';

export const isFontSizeSmall: (node: EslintNode) => node is CallExpression = (
	node: EslintNode,
): node is CallExpression =>
	isNodeOfType(node, 'CallExpression') &&
	isNodeOfType(node.callee, 'Identifier') &&
	node.callee.name === 'fontSizeSmall';
