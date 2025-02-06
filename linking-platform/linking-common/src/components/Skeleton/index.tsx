/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { keyframes, jsx, css, cssMap } from '@compiled/react';

import { B50, N30, N40, N50, N60 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import { type SkeletonProps } from './types';
import SkeletonOld, { SpanSkeletonOld } from './SkeletonOld';
import { fg } from '@atlaskit/platform-feature-flags';

const placeholderShimmer = keyframes({
	'0%': {
		backgroundPosition: '-20px 0',
	},
	'100%': {
		backgroundPosition: '60px 0',
	},
});

const appearanceValues = {
	darkGray: {
		animation: token('color.background.accent.gray.subtle', N60),
	},
	gray: {
		animation: token('color.skeleton', N40),
	},
	blue: {
		animation: token('color.background.information.hovered', '#cce0ff'),
	},
};

const spanSkeletonStyles = css({
	userSelect: 'none',
	backgroundRepeat: 'no-repeat',
	animation: `${placeholderShimmer} 1s linear infinite forwards`,
});

const spanSkeletonBackgroundStyleMap = cssMap({
	gray: {
		backgroundColor: token('color.background.accent.gray.subtlest', N30),
	},
	blue: {
		backgroundColor: token('color.background.accent.blue.subtlest', B50),
	},
	darkGray: {
		backgroundColor: token('color.background.accent.gray.subtler', N50),
	},
});

const SpanSkeletonNew = ({
	width,
	appearance = 'gray',
	height = 14,
	borderRadius = 0,
	isShimmering = true,
	testId,
	style = {},
}: SkeletonProps): JSX.Element => {
	return (
		<span
			data-testid={testId}
			css={[spanSkeletonStyles, spanSkeletonBackgroundStyleMap[appearance]]}
			style={{
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop
				...style,
				height: (typeof height === 'number' ? `${height}px` : height) || 'auto',
				width: (typeof width === 'number' ? `${width}px` : width) || 'auto',
				borderRadius: (typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius) || 0,
				backgroundImage: `linear-gradient(
    to right,
    transparent 0%,
    ${appearanceValues[appearance].animation} 20%,
    transparent 40%,
    transparent 100%
  )`,
				backgroundSize: isShimmering ? `40px ${height}` : '0px',
			}}
		></span>
	);
};

export const SpanSkeleton = (props: SkeletonProps) => {
	if (fg('platform_bandicoots-linking-common-css')) {
		return <SpanSkeletonNew {...props} />;
	} else {
		return <SpanSkeletonOld {...props} />;
	}
};

const SkeletonNew = ({
	width,
	appearance = 'gray',
	height = 14,
	borderRadius = 0,
	isShimmering = true,
	testId,
	style = {},
}: SkeletonProps): JSX.Element => {
	return (
		<div
			data-testid={testId}
			css={[spanSkeletonStyles, spanSkeletonBackgroundStyleMap[appearance]]}
			style={{
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop
				...style,
				height: (typeof height === 'number' ? `${height}px` : height) || 'auto',
				width: (typeof width === 'number' ? `${width}px` : width) || 'auto',
				borderRadius: (typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius) || 0,
				backgroundImage: `linear-gradient(
    to right,
    transparent 0%,
    ${appearanceValues[appearance].animation} 20%,
    transparent 40%,
    transparent 100%
  )`,
				backgroundSize: isShimmering ? `40px ${height}` : '0px',
			}}
		></div>
	);
};

export const Skeleton = (props: SkeletonProps) => {
	if (fg('platform_bandicoots-linking-common-css')) {
		return <SkeletonNew {...props} />;
	} else {
		return <SkeletonOld {...props} />;
	}
};

export default Skeleton;
