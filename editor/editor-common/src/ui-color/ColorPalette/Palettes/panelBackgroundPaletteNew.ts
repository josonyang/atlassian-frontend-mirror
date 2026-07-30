import { token } from '@atlaskit/tokens';

import type { PaletteColor } from './type';

// new palette for platform_editor_lovability_text_bg_color experiment
export const panelBackgroundPaletteNew: PaletteColor[] = [
	{ label: 'White' as const, value: '#FFFFFF' },
	{ label: 'Subtle blue' as const, value: '#DEEBFF' },
	{ label: 'Subtle teal' as const, value: '#E6FCFF' },
	{ label: 'Subtle green' as const, value: '#E3FCEF' },
	{ label: 'Subtle lime' as const, value: '#EFFFD6' },
	{ label: 'Subtle yellow' as const, value: '#FFFAE6' },
	{ label: 'Subtle orange' as const, value: '#FFF5DB' },
	{ label: 'Subtle red' as const, value: '#FFEBE6' },
	{ label: 'Subtle magenta' as const, value: '#FFECF8' },
	{ label: 'Subtle purple' as const, value: '#EAE6FF' },

	{ label: 'Gray' as const, value: '#F4F5F7' },
	{ label: 'Blue' as const, value: '#B3D4FF' },
	{ label: 'Teal' as const, value: '#B3F5FF' },
	{ label: 'Green' as const, value: '#ABF5D1' },
	{ label: 'Lime' as const, value: '#D3F1A7' },
	{ label: 'Yellow' as const, value: '#FFF0B3' },
	{ label: 'Orange' as const, value: '#FCE4A6' },
	{ label: 'Red' as const, value: '#FFBDAD' },
	{ label: 'Magenta' as const, value: '#FDD0EC' },
	{ label: 'Purple' as const, value: '#C0B6F2' },

	{ label: 'Bold gray' as const, value: '#B7B9BE' },
	{ label: 'Bold blue' as const, value: '#ADCBFB' },
	{ label: 'Bold teal' as const, value: '#B1E4F7' },
	{ label: 'Bold green' as const, value: '#97EDC9' },
	{ label: 'Bold lime' as const, value: '#BDE97C' },
	{ label: 'Bold yellow' as const, value: '#EFDD4E' },
	{ label: 'Bold orange' as const, value: '#FBD779' },
	{ label: 'Bold red' as const, value: '#FFB8B2' },
	{ label: 'Bold magenta' as const, value: '#FCB6E1' },
	{ label: 'Bold purple' as const, value: '#E3BDFA' },
].map((color) => ({
	...color,
	border: token('color.border'),
}));
