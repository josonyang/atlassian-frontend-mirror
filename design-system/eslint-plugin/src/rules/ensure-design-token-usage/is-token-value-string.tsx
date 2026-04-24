/**
 * Returns whether the current string is a token value.
 * @param originalVaue string representing a css property value e.g 1em, 12px.
 */
export function isTokenValueString(originalValue: string): boolean {
	return originalValue.startsWith('${token(') && originalValue.endsWith('}');
}
