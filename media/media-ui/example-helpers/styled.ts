import { token } from '@atlaskit/tokens';
import { N900 } from '@atlaskit/theme/colors';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from '@emotion/styled';

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const InputWrapper = styled.div({
	margin: `${token('space.250', '20px')} 0`,
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const PreviewList = styled.ul({
	margin: 0,
	padding: 0,
	listStyleType: 'none',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const PreviewItem = styled.li({
	borderRadius: token('space.100', '8px'),
	border: `1px solid ${token('color.border', '#ccc')}`,
	padding: token('space.100', '8px'),
	overflow: 'auto',
	maxHeight: '600px',
	position: 'relative',
	marginBottom: token('space.100', '8px'),
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const Code = styled.code({
	padding: token('space.050', '4px'),
	borderRadius: token('space.050', '4px'),
	backgroundColor: token('color.background.inverse.subtle', '#0002'),
	color: token('color.text', N900),
	font: token('font.code'),
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const CloseButton = styled.button({
	position: 'absolute',
	top: token('space.050', '4px'),
	right: token('space.050', '4px'),
	cursor: 'pointer',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const PreviewImageContainer = styled.div({
	marginTop: token('space.100', '8px'),
	marginBottom: token('space.100', '8px'),
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const OrientationSelectWrapper = styled.label({
	marginBottom: token('space.250', '20px'),
	display: 'block',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const TimeRangeWrapper = styled.div({
	marginTop: token('space.500', '40px'),
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const Container = styled.div({
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const Group = styled.div({
	width: '250px',
	padding: token('space.250', '20px'),
});
