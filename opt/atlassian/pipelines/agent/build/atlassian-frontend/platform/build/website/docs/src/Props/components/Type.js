// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from 'styled-components';
import { borderRadius, colors, themed } from '@atlaskit/theme';

// eslint-disable-next-line @atlaskit/design-system/no-styled-tagged-template-expression, @atlaskit/ui-styling-standard/no-styled -- Ignored via go/DSP-18766
const Type = styled.span`
	background-color: ${themed({ light: colors.P50, dark: colors.P500 })};
	border-radius: ${borderRadius}px;
	color: ${themed({ light: colors.P500, dark: colors.P50 })};
	display: inline-block;
	margin: 2px 0;
	padding: 0 0.2em;
`;

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-exported-styles, @atlaskit/design-system/no-styled-tagged-template-expression, @atlaskit/ui-styling-standard/no-styled -- Ignored via go/DSP-18766
export const TypeMeta = styled(Type)`
	background-color: ${themed({ light: colors.N20, dark: colors.DN50 })};
	color: ${colors.subtleText};
`;

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-exported-styles, @atlaskit/design-system/no-styled-tagged-template-expression, @atlaskit/ui-styling-standard/no-styled -- Ignored via go/DSP-18766
export const StringType = styled(Type)`
	background-color: ${themed({ light: colors.G50, dark: colors.G500 })};
	color: ${themed({ light: colors.G500, dark: colors.G100 })};
`;

export default Type;
