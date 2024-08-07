import type { UtilTokenSchema, ValueSchema } from '../../../../src/types';
import type { BaseToken } from '../../../palettes/legacy-palette';
import elevation from '../elevation/surface';

const utility: ValueSchema<UtilTokenSchema<BaseToken>> = {
	elevation: {
		surface: {
			current: {
				value: elevation.elevation.surface['[default]']['[default]'].value,
			},
		},
	},
	UNSAFE: {
		transparent: {
			value: 'transparent',
		},
	},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { utility };
