export function includesTokenString(originalValue: string): boolean {
	return originalValue.includes('${token(');
}
