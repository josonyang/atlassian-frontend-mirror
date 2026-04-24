import { token } from '@atlaskit/tokens';

import { type AppearanceTypes } from './types';

export const actionTextColor: Record<AppearanceTypes, string> = {
	success: token('color.text.inverse'),
	info: token('color.text.inverse'),
	error: token('color.text.inverse'),
	warning: token('color.text.warning.inverse'),
	normal: token('color.link'),
};
