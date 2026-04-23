/**
 * Normalizes an offset to a CSS length string. Numbers become `${n}px`;
 * strings pass through. Apply at the API boundary so internal code only
 * deals with strings.
 */
export function toCssLengthString({ value }: { value: number | string }): string {
	if (typeof value === 'number') {
		return `${value}px`;
	}
	return value;
}
