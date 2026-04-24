import { type AppearanceTypes, type HeadingColor } from './types';

export const flagTextColor: Record<AppearanceTypes, HeadingColor> = {
	error: 'color.text.inverse',
	info: 'color.text.inverse',
	normal: 'color.text',
	success: 'color.text.inverse',
	warning: 'color.text.warning.inverse',
};
