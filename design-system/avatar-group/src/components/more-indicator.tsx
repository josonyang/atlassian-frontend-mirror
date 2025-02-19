/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type CSSProperties, forwardRef, useCallback } from 'react';

import { cssMap, jsx } from '@compiled/react';

import { type AppearanceType, type AvatarClickEventHandler } from '@atlaskit/avatar';
import { fg } from '@atlaskit/platform-feature-flags';
import { token } from '@atlaskit/tokens';

import { type AvatarGroupSize } from './types';

const boxShadowCssVar = '--avatar-box-shadow';

const styles = cssMap({
	root: {
		display: 'flex',
		boxSizing: 'content-box',
		marginTop: token('space.025'),
		marginRight: token('space.025'),
		marginBottom: token('space.025'),
		marginLeft: token('space.025'),
		paddingTop: token('space.0'),
		paddingRight: token('space.0'),
		paddingBottom: token('space.0'),
		paddingLeft: token('space.0'),
		alignItems: 'stretch',
		justifyContent: 'center',
		flexDirection: 'column',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		backgroundColor: token('color.background.neutral'),
		color: token('color.text'),
		boxShadow: `var(${boxShadowCssVar})`,
		overflow: 'hidden',
		transform: 'translateZ(0)',
		transition: 'transform 200ms, opacity 200ms',
		'&:hover': {
			backgroundColor: token('color.background.neutral.hovered'),
			color: token('color.text'),
		},
		'&:active': {
			backgroundColor: token('color.background.neutral.pressed'),
			color: token('color.text'),
			transform: `scale(0.9)`,
		},
		'&:focus-visible': {
			boxShadow: 'none',
			outlineColor: token('color.border.focused', '#2684FF'),
			outlineStyle: 'solid',
			// eslint-disable-next-line @atlaskit/design-system/use-tokens-space
			outlineOffset: 2,
			// eslint-disable-next-line @atlaskit/design-system/use-tokens-space
			outlineWidth: 2,
		},
		'@media screen and (forced-colors: active)': {
			'&:focus-visible': {
				outlineWidth: 1,
			},
		},
	},
	circle: {
		borderRadius: token('border.radius.circle', '50%'),
	},
	active: {
		backgroundColor: token('color.background.selected'),
		boxShadow: `0 0 0 ${token('border.width.outline')} ${token('color.border.selected')}`,
		color: token('color.text.selected'),
		transform: `scale(0.9)`,
		'&:hover': {
			backgroundColor: token('color.background.selected.hovered'),
			color: token('color.text.selected'),
		},
		'&:active': {
			backgroundColor: token('color.background.selected.pressed'),
			color: token('color.text.selected'),
		},
	},
	disabled: {
		cursor: 'not-allowed',
		'&::after': {
			opacity: token('opacity.disabled', '0.7'),
			backgroundColor: token('elevation.surface'),
		},
	},
});

const widthHeightMap = cssMap({
	xsmall: {
		width: '16px',
		height: '16px',
	},
	small: {
		width: '24px',
		height: '24px',
	},
	medium: {
		width: '32px',
		height: '32px',
	},
	large: {
		width: '40px',
		height: '40px',
	},
	xlarge: {
		width: '96px',
		height: '96px',
	},
	xxlarge: {
		width: '128px',
		height: '128px',
	},
});

const borderRadiusMap = cssMap({
	xsmall: {
		borderRadius: '2px',
		'&::after': {
			borderRadius: '2px',
		},
	},
	small: {
		borderRadius: '2px',
		'&::after': {
			borderRadius: '2px',
		},
	},
	medium: {
		borderRadius: '3px',
		'&::after': {
			borderRadius: '3px',
		},
	},
	large: {
		borderRadius: '3px',
		'&::after': {
			borderRadius: '3px',
		},
	},
	xlarge: {
		borderRadius: '6px',
		'&::after': {
			borderRadius: '6px',
		},
	},
	xxlarge: {
		borderRadius: '12px',
		'&::after': {
			borderRadius: '12px',
		},
	},
});

const fontMap = cssMap({
	small: {
		font: token('font.body.small'),
	},
	medium: {
		font: token('font.body.small'),
	},
	large: {
		font: token('font.body.UNSAFE_small'),
	},
	xlarge: {
		font: token('font.body.large'),
	},
	xxlarge: {
		font: token('font.body.large'),
	},
});

export interface MoreIndicatorProps {
	count: number;
	'aria-controls'?: string;
	'aria-expanded'?: boolean;
	'aria-haspopup'?: boolean | 'dialog';
	buttonProps: Partial<React.HTMLAttributes<HTMLElement>>;
	onClick: AvatarClickEventHandler;
	isActive: boolean;
	size: AvatarGroupSize;
	appearance?: AppearanceType;
	borderColor?: string;
	testId?: string;
}

const MAX_DISPLAY_COUNT = 99;

const MoreIndicator = forwardRef<HTMLButtonElement, MoreIndicatorProps>(
	(
		{
			appearance = 'circle',
			// eslint-disable-next-line @atlaskit/platform/ensure-feature-flag-prefix
			borderColor = fg('platform-component-visual-refresh')
				? token('elevation.surface')
				: token('color.border.inverse'),
			size = 'medium',
			count = 0,
			testId,
			onClick,
			'aria-controls': ariaControls,
			'aria-expanded': ariaExpanded,
			'aria-haspopup': ariaHaspopup,
			buttonProps = {},
			isActive,
		},
		ref,
	) => {
		const onClickHander: AvatarClickEventHandler = useCallback(
			(event, analyticsEvent) => {
				if (buttonProps.onClick) {
					buttonProps.onClick(event as React.MouseEvent<HTMLElement, MouseEvent>);
				}

				onClick(event, analyticsEvent);
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[buttonProps.onClick, onClick],
		);

		return (
			<button
				type="submit"
				{...buttonProps}
				onClick={onClickHander}
				ref={ref as React.Ref<HTMLButtonElement>}
				data-testid={testId}
				aria-controls={ariaControls}
				aria-expanded={ariaExpanded}
				aria-haspopup={ariaHaspopup}
				style={{ [boxShadowCssVar]: `0 0 0 2px ${borderColor}` } as CSSProperties}
				css={[
					styles.root,
					borderRadiusMap[size],
					appearance === 'circle' && styles.circle,
					widthHeightMap[size],
					fontMap[size],
					isActive && styles.active,
				]}
			>
				+{count! > MAX_DISPLAY_COUNT ? MAX_DISPLAY_COUNT : count}
			</button>
		);
	},
);

MoreIndicator.displayName = 'MoreIndicator';

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default MoreIndicator;
