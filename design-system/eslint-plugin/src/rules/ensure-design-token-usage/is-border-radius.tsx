import { type EslintNode, isNodeOfType } from 'eslint-codemod-utils';

export function isBorderRadius(node: EslintNode): boolean {
	return (
		isNodeOfType(node, 'CallExpression') &&
		isNodeOfType(node.callee, 'Identifier') &&
		(node.callee.name === 'borderRadius' || node.callee.name === 'getBorderRadius')
	);
}
