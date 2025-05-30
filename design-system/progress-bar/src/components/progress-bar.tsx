/**
 * @jsxRuntime classic
 * @jsx jsx
 */

import React from 'react';

import { css, cssMap, jsx, keyframes } from '@compiled/react';

import { G300, N40A, N500 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { type DefaultProgressBarProps } from '../types';

const MIN_VALUE = 0;
const MAX_VALUE = 1;

const increasingBarAnimation = keyframes({
	from: { left: '-5%', width: '5%' },
	to: { left: '130%', width: ' 100%' },
});

const decreasingBarAnimation = keyframes({
	from: { left: '-80%', width: '80%' },
	to: { left: '110%', width: '10%' },
});

const containerStyles = css({
	width: '100%',
	height: 6,
	position: 'relative',
	backgroundColor: token('color.background.neutral', N40A),
	borderRadius: token('border.radius', '3px'),
	overflow: 'hidden',
});

const containerAppearance = cssMap({
	default: { backgroundColor: token('color.background.neutral', N40A) },
	success: { backgroundColor: token('color.background.neutral', N40A) },
	inverse: {
		backgroundColor: token('color.background.inverse.subtle', 'rgba(255, 255, 255, 0.5)'),
	},
});

const barAppearance = cssMap({
	default: { backgroundColor: token('color.background.neutral.bold', N500) },
	success: { backgroundColor: token('color.background.success.bold', G300) },
	inverse: { backgroundColor: token('elevation.surface', 'white') },
});

const barStyles = css({
	display: 'block',
	height: 6,
	position: 'absolute',
	borderRadius: token('border.radius', '3px'),
});

const determinateBarStyles = css({
	transition: 'width 0.2s',
});

const increasingBarStyles = css({
	animationDuration: '2s',
	animationIterationCount: 'infinite',
	animationName: increasingBarAnimation,
});

const decreasingBarStyles = css({
	animationDelay: '0.5s',
	animationDuration: '2s',
	animationIterationCount: 'infinite',
	animationName: decreasingBarAnimation,
});

/**
 * __Progress bar__
 *
 * A progress bar displays the status of a given process.
 *
 * - [Examples](https://atlassian.design/components/progress-bar/examples)
 * - [Code](https://atlassian.design/components/progress-bar/code)
 * - [Usage](https://atlassian.design/components/progress-bar/usage)
 */
const ProgressBar = ({
	appearance = 'default',
	ariaLabel,
	isIndeterminate = false,
	testId = 'progress-bar',
	value = 0,
}: DefaultProgressBarProps) => {
	const valueParsed = isIndeterminate ? MIN_VALUE : Math.max(MIN_VALUE, Math.min(value, MAX_VALUE));

	return (
		<div
			css={[containerStyles, containerAppearance[appearance]]}
			role="progressbar"
			aria-label={ariaLabel}
			aria-valuemin={MIN_VALUE}
			aria-valuenow={valueParsed}
			aria-valuemax={MAX_VALUE}
			data-testid={testId}
		>
			{isIndeterminate ? (
				<React.Fragment>
					<span css={[barStyles, barAppearance[appearance], increasingBarStyles]} />
					<span css={[barStyles, barAppearance[appearance], decreasingBarStyles]} />
				</React.Fragment>
			) : (
				<span
					style={{ width: `${Number(value) * 100}%` }}
					css={[barStyles, barAppearance[appearance], determinateBarStyles]}
				/>
			)}
		</div>
	);
};

export default ProgressBar;
