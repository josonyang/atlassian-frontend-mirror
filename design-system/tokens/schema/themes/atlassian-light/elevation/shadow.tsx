import type { ShadowTokenSchema, ValueSchema } from '../../../../src/types';
import type { BaseToken } from '../../../palettes/palette';

const shadow: ValueSchema<ShadowTokenSchema<BaseToken>> = {
	elevation: {
		shadow: {
			raised: {
				value: [
					{
						radius: 1,
						offset: { x: 0, y: 1 },
						color: 'Neutral1100',
						opacity: 0.25,
					},
					{
						radius: 1,
						offset: { x: 0, y: 0 },
						color: 'Neutral1100',
						opacity: 0.31,
					},
				],
			},
			overflow: {
				'[default]': {
					value: [
						{
							radius: 8,
							offset: { x: 0, y: 0 },
							color: 'Neutral1100',
							opacity: 0.16,
						},
						{
							radius: 1,
							offset: { x: 0, y: 0 },
							color: 'Neutral1100',
							opacity: 0.12,
						},
					],
				},
				// @ts-ignore no current palette colour for this yet
				spread: { value: '#091e4229' },
				// @ts-ignore no current palette colour for this yet
				perimeter: { value: '#091e421f' },
			},
			overlay: {
				value: [
					{
						radius: 12,
						offset: { x: 0, y: 8 },
						color: 'Neutral1100',
						opacity: 0.15,
					},
					{
						radius: 1,
						offset: { x: 0, y: 0 },
						color: 'Neutral1100',
						opacity: 0.31,
					},
				],
			},
		},
	},
};

export default shadow;
