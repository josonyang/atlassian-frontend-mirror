/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { token } from '@atlaskit/tokens';

import { INNER_BORDER_RADIUS } from '../constants';

import AnimatedSvgContainer from './animated-svg-container';
import type { AIGlowingBorderProps } from './types';

const borderContainerStyles = css({
	display: 'flex',
	position: 'relative',
	padding: token('space.025', '2px'),
	width: 'fit-content',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const borderContentStyles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	borderRadius: INNER_BORDER_RADIUS,
	flexGrow: 1,
	zIndex: 1, // needs to be more than the svg container at least
});

/**
 * The bulk of this file is originally from
 * https://bitbucket.org/atlassian/barrel/src/master/ui/platform/ui-kit/ai
 * with modifications.
 */
const AIGlowingBorderOld = ({
	children,
	palette,
	isMoving = true,
	isGlowing,
	testId,
	additionalCss,
}: AIGlowingBorderProps) => (
	<div css={[borderContainerStyles, additionalCss?.container]} data-testid={testId}>
		<AnimatedSvgContainer
			palette={palette}
			isMoving={isMoving}
			additionalCss={additionalCss?.animatedSvgContainer}
		/>
		{isGlowing && (
			<AnimatedSvgContainer
				palette={palette}
				isMoving={isMoving}
				isGlowing
				additionalCss={additionalCss?.animatedSvgContainer}
			/>
		)}
		<div css={borderContentStyles}>{children} </div>
	</div>
);

export default AIGlowingBorderOld;
