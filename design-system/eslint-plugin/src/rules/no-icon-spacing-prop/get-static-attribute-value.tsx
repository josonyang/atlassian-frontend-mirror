import { type JSXAttribute } from 'eslint-codemod-utils';

/**
 * Returns the static string value of a JSXAttribute, or undefined if dynamic.
 */
export function getStaticAttributeValue(attr: JSXAttribute): string | undefined {
	if (attr.value && attr.value.type === 'Literal' && typeof attr.value.value === 'string') {
		return attr.value.value;
	}
	return undefined;
}
