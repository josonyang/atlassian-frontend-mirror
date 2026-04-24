import { identifier, literal, type Property, property, type StringableASTNode } from 'eslint-codemod-utils';

export function getLiteralProperty(
	propertyName: string,
	propertyValue: string,
): StringableASTNode<Property> {
	return property({
		key: identifier(propertyName),
		value: literal(propertyValue),
	});
}
