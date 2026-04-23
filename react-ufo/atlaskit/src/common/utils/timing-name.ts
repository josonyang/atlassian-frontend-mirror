export const MAX_TIMING_NAME_LENGTH = 255;

export function sanitizeTimingName(name: string): string {
	if (name.length <= MAX_TIMING_NAME_LENGTH) {
		return name;
	}

	return name.slice(0, MAX_TIMING_NAME_LENGTH);
}
