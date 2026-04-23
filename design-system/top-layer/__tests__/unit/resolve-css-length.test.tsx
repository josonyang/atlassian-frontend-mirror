import { toCssLengthString } from '../../src/internal/resolve-css-length';

describe('toCssLengthString()', () => {
	it('returns numbers as px strings', () => {
		expect(toCssLengthString({ value: 8 })).toBe('8px');
		expect(toCssLengthString({ value: 0 })).toBe('0px');
		expect(toCssLengthString({ value: -4 })).toBe('-4px');
		expect(toCssLengthString({ value: 12.5 })).toBe('12.5px');
	});

	it('passes strings through unchanged', () => {
		expect(toCssLengthString({ value: '8px' })).toBe('8px');
		expect(toCssLengthString({ value: 'var(--ds-space-100, 8px)' })).toBe(
			'var(--ds-space-100, 8px)',
		);
		expect(toCssLengthString({ value: '1rem' })).toBe('1rem');
		expect(toCssLengthString({ value: 'calc(8px + 4px)' })).toBe('calc(8px + 4px)');
	});
});
