import { type Property, property, type StringableASTNode } from 'eslint-codemod-utils';

export function convertPropertyNodeToStringableNode(node: Property): StringableASTNode<Property> {
	return property({
		key: node.key,
		value: node.value,
	});
}
