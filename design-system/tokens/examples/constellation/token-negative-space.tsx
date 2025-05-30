/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { Bleed } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';

const TokenNegativeSpaceCodeBlock = `
import { token } from '@atlaskit/tokens';

// Container styles
paddingInline: token('space.200', '16px'),

// Divider styles
marginInline: token('space.negative.200', '-16px'),
`;

const containerStyles = css({
	width: 300,
	height: 200,
	padding: token('space.200'),
	backgroundColor: token('elevation.surface.overlay'),
	boxShadow: token('elevation.shadow.overlay'),
});

const dividerStyles = css({
	border: 'none',
	borderBlockEnd: `1px solid ${token('color.border')}`,
});

const TokenNegativeSpace = () => {
	return (
		<div css={containerStyles}>
			<p>A container with an inset</p>
			<Bleed inline="space.200">
				<hr role="presentation" css={dividerStyles}></hr>
			</Bleed>
		</div>
	);
};

export default {
	example: TokenNegativeSpace,
	code: TokenNegativeSpaceCodeBlock,
};
