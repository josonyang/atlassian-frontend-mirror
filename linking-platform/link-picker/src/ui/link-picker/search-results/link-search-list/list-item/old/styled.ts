// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css } from '@emotion/react';

import { B100, B400, B50, N20, N200, N300 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

const listItemBaseStyles = css({
	display: 'flex',
	paddingTop: token('space.100', '8px'),
	paddingBottom: token('space.100', '8px'),
	paddingLeft: `clamp( ${token('space.100', '8px')}, var(--link-picker-padding-left), 100% )`,
	paddingRight: `clamp( ${token('space.100', '8px')}, var(--link-picker-padding-right), 100% )`,
	margin: 0,
	cursor: 'pointer',
});

const listItemFocusStyles = css({
	'&:focus': {
		outline: 'none',
		boxShadow: `0 0 0 2px ${token('color.border.focused', B100)} inset`,
		textDecoration: 'none',
	},
});

const listItemBoxShadow = css({
	boxShadow: `inset 2px 0px 0px ${token('color.border.selected', B400)}`,
});

const listItemActive = css({
	'&:hover': {
		backgroundColor: token('color.background.neutral.subtle.hovered', N20),
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	listItemBoxShadow,
});

const listItemSelected = css(
	{
		backgroundColor: token('color.background.selected', B50),
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	listItemBoxShadow,
);

export const composeListItemStyles = (selected = false) => {
	return css(
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		listItemBaseStyles,
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		!selected && listItemActive,
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		selected && listItemSelected,
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		listItemFocusStyles,
	);
};

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const itemNameStyles = css({
	overflow: 'hidden',
	alignContent: 'center',
	width: '100%',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const listItemContextStyles = css({
	color: token('color.text', N300),
	font: token('font.body.small'),
	display: 'flex',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const listItemContainerStyles = css({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const listItemContainerInnerStyles = css({
	color: token('color.text.subtlest', N200),
	whiteSpace: 'nowrap',
});

// eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const itemIconStyles = css({
	minWidth: token('space.200', '16px'),
	marginTop: token('space.050', '4px'),
	marginRight: token('space.150', '12px'),
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const imgStyles = css({
	maxWidth: token('space.200', '16px'),
});
