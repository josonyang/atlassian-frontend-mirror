/**
 * Maps a padding token to a cssMap key name.
 * e.g. 'space.050' → 'space050'
 */
export function getCssMapKey(paddingToken: string): string {
	return paddingToken.replace('space.', 'space');
}
