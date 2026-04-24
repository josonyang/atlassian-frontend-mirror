import { token } from '@atlaskit/tokens';

import { type AppearanceTypes } from './types';

export const flagIconColor: Record<AppearanceTypes, string> = {
	error: token('color.icon.inverse'),
	info: token('color.icon.inverse'),
	normal: token('color.icon.subtle'),
	success: token('color.icon.inverse'),
	warning: token('color.icon.warning.inverse'),
};
