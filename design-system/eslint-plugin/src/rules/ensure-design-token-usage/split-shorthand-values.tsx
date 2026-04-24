/**
 * Accomplishes split str by whitespace but preserves expressions in between ${...}
 * even if they might have whitepaces or nested brackets
 * @param str
 * @returns string[]
 * @example
 * Regex has two parts, first attempts to capture anything in between `${...}` in a capture group
 * Whilst allowing nested brackets and non empty characters leading or traling wrapping expression e.g `${gridSize}`, `-${gridSize}px`
 * second part is a white space delimiter
 * For input `-${gridSize / 2}px ${token(...)} 18px -> [`-${gridSize / 2}px`, `${token(...)}`, `18px`]
 */
export const splitShorthandValues = (str: string): string[] => {
	return str.split(/(\S*\$\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\S*)|\s+/g).filter(Boolean);
};
