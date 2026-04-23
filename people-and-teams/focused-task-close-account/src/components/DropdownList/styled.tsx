import { styled } from '@compiled/react';
import { token } from '@atlaskit/tokens';

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const AccessibleSitesList = styled.ul({
	listStyle: 'none',
	paddingLeft: 0,
	fontWeight: token('font.weight.semibold'),
	marginLeft: token('space.100'),
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'> li': {
		marginTop: 0,
	},
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const AccessibleSitesListFootnote = styled.div({
	paddingLeft: 0,
	marginLeft: token('space.100'),
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const ButtonWrapper = styled.div({
	paddingTop: 0,
	paddingBottom: 0,
	paddingLeft: token('space.100'),
	paddingRight: token('space.100'),
});
