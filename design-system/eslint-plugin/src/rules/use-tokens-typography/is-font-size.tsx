import { type CallExpression, type EslintNode, isNodeOfType } from 'eslint-codemod-utils';

export const isFontSize: (node: EslintNode) => node is CallExpression = (
	node: EslintNode,
): node is CallExpression =>
	isNodeOfType(node, 'CallExpression') &&
	isNodeOfType(node.callee, 'Identifier') &&
	(node.callee.name === 'fontSize' || node.callee.name === 'getFontSize');
