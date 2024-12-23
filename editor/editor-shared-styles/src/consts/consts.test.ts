import { participantColors, relativeFontSizeToBase16 } from './consts';

describe('consts', () => {
	describe('participantColors', () => {
		it('should be an array of 18 colors', () => {
			expect(participantColors).toHaveLength(18);
		});
	});

	describe('relativeFontSizeToBase16', () => {
		it('relativeFontSizeToBase16 should return 1rem with a base font size of 16px', () => {
			expect(relativeFontSizeToBase16(16)).toBe('1rem');
		});
		it('relativeFontSizeToBase16 should return 0.875rem with a base font size of 14px', () => {
			expect(relativeFontSizeToBase16(14)).toBe('0.875rem');
		});
		it('relativeFontSizeToBase16 should return 0.875rem with a base font size (string) of 14px', () => {
			expect(relativeFontSizeToBase16('14')).toBe('0.875rem');
		});
		// Ignored via go/ees005
		// eslint-disable-next-line jest/no-identical-title
		it('relativeFontSizeToBase16 should return 0.875rem with a base font size (string) of 14px', () => {
			expect(relativeFontSizeToBase16('14px')).toBe('0.875rem');
		});
		it('relativeFontSizeToBase16 should throw an error for invalid string', () => {
			expect(() => relativeFontSizeToBase16('px')).toThrowError();
		});
	});
});
