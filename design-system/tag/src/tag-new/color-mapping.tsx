/**
 * @jsxRuntime classic
 * @jsx jsx
 */


import { type NewTagColor } from './types';

// Color mapping from old color names to new color names
export const colorMapping: Record<string, NewTagColor> = {
	standard: 'gray',
	grey: 'gray',
	blue: 'blue',
	green: 'green',
	red: 'red',
	yellow: 'yellow',
	purple: 'purple',
	lime: 'lime',
	magenta: 'magenta',
	orange: 'orange',
	teal: 'teal',
	// Light variants map to same as their non-light counterparts
	greyLight: 'gray',
	blueLight: 'blue',
	greenLight: 'green',
	redLight: 'red',
	yellowLight: 'yellow',
	purpleLight: 'purple',
	limeLight: 'lime',
	magentaLight: 'magenta',
	orangeLight: 'orange',
	tealLight: 'teal',
};
