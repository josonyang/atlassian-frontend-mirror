import { MAX_TIMING_NAME_LENGTH, sanitizeTimingName } from './timing-name';

describe('sanitizeTimingName', () => {
	it('returns names within the limit unchanged', () => {
		const name = 'a'.repeat(MAX_TIMING_NAME_LENGTH);

		expect(sanitizeTimingName(name)).toBe(name);
	});

	it('truncates long names to the maximum length', () => {
		const name = 'a'.repeat(MAX_TIMING_NAME_LENGTH + 10);

		expect(sanitizeTimingName(name)).toBe(name.slice(0, MAX_TIMING_NAME_LENGTH));
	});
});
