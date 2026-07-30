import { hexToEditorBackgroundPaletteColor, hexToEditorBackgroundPaletteRawValue } from './index';

describe('hexToEditorBackgroundPaletteColor', () => {
	test.each([
		['#DEEBFF', 'var(--ds-background-accent-blue-subtlest)'],
		['#B3D4FF', 'var(--ds-background-accent-blue-subtler)'],
		['#4C9AFF', 'var(--ds-background-accent-blue-subtle)'],
		['#ADCBFB', 'var(--ds-background-accent-blue-subtler-hovered)'],
		['#E6FCFF', 'var(--ds-background-accent-teal-subtlest)'],
		['#B3F5FF', 'var(--ds-background-accent-teal-subtler)'],
		['#79E2F2', 'var(--ds-background-accent-teal-subtle)'],
		['#B1E4F7', 'var(--ds-background-accent-teal-subtler-hovered)'],
		['#E3FCEF', 'var(--ds-background-accent-green-subtlest)'],
		['#ABF5D1', 'var(--ds-background-accent-green-subtler)'],
		['#57D9A3', 'var(--ds-background-accent-green-subtle)'],
		['#97EDC9', 'var(--ds-background-accent-green-subtler-hovered)'],
		['#EFFFD6', 'var(--ds-background-accent-lime-subtlest)'],
		['#D3F1A7', 'var(--ds-background-accent-lime-subtler)'],
		['#BDE97C', 'var(--ds-background-accent-lime-subtler-hovered)'],
		['#FFFAE6', 'var(--ds-background-accent-yellow-subtlest)'],
		['#FFF0B3', 'var(--ds-background-accent-yellow-subtler)'],
		['#FFC400', 'var(--ds-background-accent-orange-subtle)'],
		['#EFDD4E', 'var(--ds-background-accent-yellow-subtler-hovered)'],
		['#FFF5DB', 'var(--ds-background-accent-orange-subtlest)'],
		['#FCE4A6', 'var(--ds-background-accent-orange-subtler)'],
		['#FBD779', 'var(--ds-background-accent-orange-subtler-hovered)'],
		['#FFEBE6', 'var(--ds-background-accent-red-subtlest)'],
		['#FFBDAD', 'var(--ds-background-accent-red-subtler)'],
		['#FF8F73', 'var(--ds-background-accent-red-subtle)'],
		['#FFB8B2', 'var(--ds-background-accent-red-subtler-hovered)'],
		['#FFECF8', 'var(--ds-background-accent-magenta-subtlest)'],
		['#FDD0EC', 'var(--ds-background-accent-magenta-subtler)'],
		['#FCB6E1', 'var(--ds-background-accent-magenta-subtler-hovered)'],
		['#EAE6FF', 'var(--ds-background-accent-purple-subtlest)'],
		['#C0B6F2', 'var(--ds-background-accent-purple-subtler)'],
		['#998DD9', 'var(--ds-background-accent-purple-subtle)'],
		['#E3BDFA', 'var(--ds-background-accent-purple-subtler-hovered)'],
		['#FFFFFF', 'var(--ds-surface)'],
		['#F4F5F7', 'var(--ds-background-accent-gray-subtlest)'],
		['#B3BAC5', 'var(--ds-background-accent-gray-subtle)'],
		['#B7B9BE', 'var(--ds-background-accent-gray-subtler-hovered)'],
	])('hexToEditorBackgroundPaletteColor(%s)', (inputHexCode, expectedCssValue) => {
		expect(hexToEditorBackgroundPaletteColor(inputHexCode)).toBe(expectedCssValue);
	});
	test('supports loading via a lowercase value', () => {
		expect(hexToEditorBackgroundPaletteColor('#deebff')).toBe(
			'var(--ds-background-accent-blue-subtlest)',
		);
	});
});

describe('hexToEditorBackgroundPaletteRawValue', () => {
	test('Returns input hex when tokens are on the page', () => {
		expect(hexToEditorBackgroundPaletteRawValue('#deebff')).toBe('#deebff');
	});

	test('Returns undefined when unmapped input is provided', () => {
		expect(hexToEditorBackgroundPaletteRawValue('invalid')).toBe(undefined);
	});
});
