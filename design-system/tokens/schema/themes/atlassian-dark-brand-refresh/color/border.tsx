import type { BorderColorTokenSchema, ValueSchema } from '../../../../src/types';
import type { BaseToken } from '../../../palettes/palette';

const color: ValueSchema<BorderColorTokenSchema<BaseToken>> = {
	color: {
		border: {
			'[default]': {
				value: 'DarkNeutral300A',
			},
			bold: {
				value: 'DarkNeutral600',
			},
			inverse: {
				value: 'DarkNeutral0',
			},
			focused: {
				value: 'Blue300',
			},
			input: {
				value: 'DarkNeutral600',
			},
			disabled: {
				value: 'DarkNeutral200A',
			},
			brand: {
				value: 'Blue400',
			},
			selected: {
				value: 'Blue400',
			},
			danger: {
				value: 'Red500',
			},
			warning: {
				value: 'Orange500',
			},
			success: {
				value: 'Lime500',
			},
			discovery: {
				value: 'Purple500',
			},
			information: {
				value: 'Blue500',
			},
		},
	},
};

export default color;
