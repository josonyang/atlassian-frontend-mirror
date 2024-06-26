// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from '@emotion/styled';
import { token } from '@atlaskit/tokens';

// eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage, @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const LocaleSelectorWrapper = styled.div({
	position: 'fixed',
	right: token('space.250', '20px'),
	top: token('space.250', '20px'),
	width: '200px',
	border: `1px solid ${token('color.border', '#ccc')}`,
	// eslint-disable-next-line @atlaskit/design-system/use-tokens-space -- needs manual remediation
	padding: '10px',
	borderRadius: '3px',
	backgroundColor: token('elevation.surface', 'white'),
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	h2: {
		// eslint-disable-next-line @atlaskit/design-system/use-tokens-space -- needs manual remediation
		marginBottom: '10px',
	},
});
