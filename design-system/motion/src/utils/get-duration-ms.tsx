/**
 * Gets the duration in milliseconds for an animation property.
 * @param animation - The animation property to get the duration for.
 * @returns The duration in milliseconds.
 */
export const getDurationMs = (animation: string): number => {
	const match = animation.trim().match(/^(-?\d*\.?\d+)(ms|s)\b/);
	if (!match) {
		return 0;
	}
	const value = parseFloat(match[1]);
	const unit = match[2];
	return unit === 's' ? value * 1000 : value;
};
