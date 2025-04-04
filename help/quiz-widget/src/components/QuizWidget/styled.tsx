// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from '@emotion/styled';
import { token } from '@atlaskit/tokens';

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const Quiz = styled.div({
	display: 'flex',
	flexDirection: 'column',
	font: token('font.body.large'),
	width: '100%',
	padding: `${token('space.250', '20px')} 30px ${token('space.250', '20px')} 0`,
	border: '1px solid grey',
	borderRadius: '28px',
	minWidth: '300px',
	maxWidth: '380px',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const QuizName = styled.div({
	margin: '3px 0',
	font: token('font.heading.large'),
	paddingLeft: token('space.250', '20px'),
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const Header = styled.div({
	display: 'flex',
	alignItems: 'start',
	flexDirection: 'column',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const QuizBlock = styled.ul({
	// eslint-disable-next-line @atlaskit/design-system/use-tokens-space -- needs manual remediation
	paddingLeft: '15px',
	// eslint-disable-next-line @atlaskit/design-system/use-tokens-space -- needs manual remediation
	marginBottom: '15px',
	marginTop: 0,
	minHeight: '105px',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const Footer = styled.div({
	paddingLeft: token('space.100', '8px'),
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	maxHeight: '32px',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const Question = styled.div({
	paddingLeft: token('space.075', '6px'),
	// eslint-disable-next-line @atlaskit/design-system/use-tokens-space  -- needs manual remediation
	marginBottom: '10px',
	font: token('font.body'),
	color: '#707070',
	textAlign: 'left',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const NavQuiz = styled.div({
	display: 'flex',
	alignContent: 'center',
	justifyContent: 'center',
	padding: '0 0 0 3px',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	':hover': {
		color: 'grey',
	},
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const NavAction = styled.span({
	font: token('font.body'),
	fontWeight: token('font.weight.medium'),
	display: 'flex',
	alignItems: 'center',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const Score = styled.div({
	// eslint-disable-next-line @atlaskit/design-system/use-tokens-space -- needs manual remediation
	marginTop: '10px',
	paddingLeft: token('space.075', '6px'),
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'start',
	fontWeight: token('font.weight.regular'),
	// eslint-disable-next-line @atlaskit/design-system/use-tokens-space -- needs manual remediation
	gap: '5px',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const Answer = styled.div({
	display: 'flex',
	alignItems: 'flex-end',
	maxHeight: '25px',
});
