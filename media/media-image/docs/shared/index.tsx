// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css } from '@emotion/react';
import { token } from '@atlaskit/tokens';
import { N40 } from '@atlaskit/theme/colors';

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const hrStyles = css({
	background: token('color.border', N40),
	border: 0,
	height: '2px',
	marginBottom: '3em',
	marginTop: '3em',
});
