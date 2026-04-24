import { type BackgroundColor } from '@atlaskit/primitives/compiled';

import { type AppearanceTypes } from './types';

export const flagBackgroundColor: Record<AppearanceTypes, BackgroundColor> = {
	error: 'color.background.danger.bold',
	info: 'color.background.neutral.bold',
	normal: 'elevation.surface.overlay',
	success: 'color.background.success.bold',
	warning: 'color.background.warning.bold',
};
