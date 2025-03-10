// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from '@emotion/styled';

import { B400, N200 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

// By default buttons will hide overflow and ellipsis content instead of wrapping.
// This basically turns the button back into inline content
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const IconStyledButton = styled.span({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'&&&': {
		textAlign: 'initial',
		display: 'inline',
		verticalAlign: 'baseline',
		borderRadius: token('border.radius.100', '4px'),
		borderTopLeftRadius: '0px',
		borderBottomLeftRadius: '0px',
		padding: `${token('space.025', '2px')} ${token('space.075', '6px')}`,
		backgroundClip: 'padding-box',
		boxDecorationBreak: 'clone',
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'> span': {
		display: 'inline',
		overflow: 'initial',
		textOverflow: 'initial',
		whiteSpace: 'initial',
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
		'> span': {
			overflow: 'initial',
			textOverflow: 'initial',
			whiteSpace: 'initial',
		},
	},
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const NoLinkAppearance = styled.span({
	color: token('color.text.subtlest', N200),
	marginLeft: token('space.050', '4px'),
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const LinkAppearance = styled.a({
	color: token('color.link', B400),
	'&:hover': {
		textDecoration: 'none',
	},
});
