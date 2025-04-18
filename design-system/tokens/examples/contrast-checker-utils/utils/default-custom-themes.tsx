import { type ActiveTokens } from '@atlaskit/tokens';

export const defaultCustomTheme: { name: ActiveTokens; value: string }[] = [
	/*** DS token overrides ***/
	/* Brand tokens */
	{ name: 'color.text.brand', value: '#64329a' },
	{ name: 'color.icon.brand', value: '#64329a' },
	{ name: 'color.background.brand.bold', value: '#64329a' },
	{ name: 'color.background.brand.bold.hovered', value: '#452269' },
	{ name: 'color.background.brand.bold.pressed', value: '#2d1645' },
	{ name: 'color.border.brand', value: '#64329a' },
	{ name: 'color.chart.brand', value: '#8f6ab6' },
	{ name: 'color.chart.brand.hovered', value: '#835aae' },

	/* Selected tokens */
	{ name: 'color.text.selected', value: '#64329a' },
	{ name: 'color.icon.selected', value: '#64329a' },
	{ name: 'color.background.selected', value: '#f4f0f8' },
	{ name: 'color.background.selected.hovered', value: '#e4dbed' },
	{ name: 'color.background.selected.pressed', value: '#c1aed7' },
	{ name: 'color.background.selected.bold', value: '#64329a' },
	{ name: 'color.background.selected.bold.hovered', value: '#452269' },
	{ name: 'color.background.selected.bold.pressed', value: '#2d1645' },
	{ name: 'color.border.selected', value: '#64329a' },

	/* Link tokens */
	{ name: 'color.link', value: '#64329a' },
	{ name: 'color.link.pressed', value: '#452269' },
];
