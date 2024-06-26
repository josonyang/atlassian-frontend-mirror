import type { AttributeSchema, ShapeTokenSchema } from '../../../src/types';
import type { ShapePaletteToken } from '../../palettes/shape-palette';

const shape: AttributeSchema<ShapeTokenSchema<ShapePaletteToken>> = {
	border: {
		width: {
			'[default]': {
				attributes: {
					group: 'shape',
					state: 'active',
					suggest: ['1px', '2px'],
					introduced: '1.5.2',
					description: 'The default border width. Used for all borders.',
				},
			},
			'0': {
				attributes: {
					group: 'shape',
					state: 'experimental',
					introduced: '1.2.1',
					description: 'Used for zero width borders.',
				},
			},
			outline: {
				attributes: {
					group: 'shape',
					state: 'active',
					introduced: '1.5.2',
					description: 'Used for focus, active or selected inputs.',
				},
			},
			indicator: {
				attributes: {
					group: 'shape',
					state: 'active',
					introduced: '1.5.2',
					description: 'Used for indicators like tab and menu selected states.',
				},
			},
		},
		radius: {
			'[default]': {
				attributes: {
					group: 'shape',
					state: 'active',
					suggest: ['3px', '4px'],
					introduced: '1.5.2',
					description: 'The default border radius.',
				},
			},
			'050': {
				attributes: {
					group: 'shape',
					state: 'active',
					introduced: '1.1.0',
					description: 'Used for selection indicators, like tabs.',
				},
			},
			'100': {
				attributes: {
					group: 'shape',
					state: 'active',
					introduced: '1.1.0',
					description: 'Used for buttons and inputs.',
				},
			},
			'200': {
				attributes: {
					group: 'shape',
					state: 'active',
					introduced: '1.1.0',
					description: 'Used for smaller cards.',
				},
			},
			'300': {
				attributes: {
					group: 'shape',
					state: 'active',
					introduced: '1.1.0',
					description: 'Used for cards and larger containers.',
				},
			},
			'400': {
				attributes: {
					group: 'shape',
					state: 'active',
					introduced: '1.1.0',
					description: 'Used for modals.',
				},
			},
			circle: {
				attributes: {
					group: 'shape',
					state: 'active',
					suggest: ['50%'],
					introduced: '1.1.0',
					description: 'Used for circular containers, like a rounded button.',
				},
			},
		},
	},
};
export default shape;
