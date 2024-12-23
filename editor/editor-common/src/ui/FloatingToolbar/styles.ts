import { token } from '@atlaskit/tokens';

export const iconOnlySpacing = {
	'&&': {
		padding: '0px',
	},
	'& > span': {
		margin: '0px',
	},
};

interface Property {
	[key: string]: {
		// Ignored via go/ees005
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	};
}

const getStyles = (
	property: Property,
	{ appearance = 'default', state = 'default', mode = 'light' },
) => {
	if (!property[appearance] || !property[appearance][state]) {
		return 'initial';
	}
	return property[appearance][state][mode];
};

const background: Property = {
	danger: {
		default: { light: 'inherit', dark: 'inherit' },
		hover: {
			light: token('color.background.neutral.subtle.hovered'),
			dark: token('color.background.neutral.subtle.hovered'),
		},
		active: {
			light: token('color.background.neutral.pressed'),
			dark: token('color.background.neutral.pressed'),
		},
	},
};

const color = {
	danger: {
		default: {
			light: token('color.icon'),
			dark: token('color.icon'),
		},
		hover: {
			light: token('color.icon.danger'),
			dark: token('color.icon.danger'),
		},
		active: {
			light: token('color.icon.danger'),
			dark: token('color.icon.danger'),
		},
	},
};

// Ignored via go/ees005
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getButtonStyles = (props: any) => ({
	background: getStyles(background, props),
	color: getStyles(color, props),
});
