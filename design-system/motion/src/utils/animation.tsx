import { getDocument } from '@atlaskit/browser-apis';

/**
 * Gets the duration in milliseconds for an animation property.
 * @param animation - The animation property to get the duration for.
 * @returns The duration in milliseconds.
 */
export const getDurationMs = (animation: string): { duration: number, delay: number } => {
	const match = [...animation.trim().matchAll(/(-?\d*\.?\d+)(ms|s)\b/g)];
	if (match.length === 0) {
		return { duration: 0, delay: 0 };
	}
	const durationValue = parseFloat(match[0][1]);
	const durationUnit = match[0][2];
	const duration = durationUnit === 's' ? durationValue * 1000 : durationValue;

	let delay = 0;
	if(match[1]) {
		const delayValue = parseFloat(match[1][1]);
		const delayUnit = match[1][2];
		delay = delayUnit === 's' ? delayValue * 1000 : delayValue;
	}

	return {
		duration,
		delay
	}
};

export const convertToMs = (duration: string): number => {
	// Use regex to separate the number and the unit
	const matches = duration.match(/^(\d+\.?\d*)(s|ms)$/);
	
	if (!matches) return 0; // Or return for invalid format
  
	const value = parseFloat(matches[1]);
	const unit = matches[2];
  
	if (unit === 's') {
	  return value * 1000; // Convert seconds to milliseconds
	} else {
	  return value; // Already in milliseconds
	}
  }

/**
 * Resolves a motion token to a string value.
 * @param token - The motion token to resolve.
 * @returns The string value for the motion token.
 */
export const resolveMotionToken = (token: string): string => {
	const cssVarMatch = token.match(/var\(\s*(--[^,\s)]+)/);
	const cssVar = cssVarMatch ? cssVarMatch[1] : null;
	if (cssVar) {
		const documentElement = getDocument()?.documentElement;
		if (documentElement) {
			return getComputedStyle(documentElement).getPropertyValue(cssVar);
		}
	}
	return '';
};
