/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { token } from '@atlaskit/tokens';

import { useTheme } from '../../theme';
import { stripEmptyProperties } from '../../utils';

import { type SkeletonPrimaryButtonProps } from './types';

const VAR_PRIMARY_BUTTON_BEFORE_HIGHLIGHTED_BACKGROUND_COLOR =
	'--primary-button-before-highlighted-background-color';
const VAR_PRIMARY_BUTTON_AFTER_DROPDOWN_BORDER_COLOR =
	'--primary-button-after-dropdown-border-color';

const primaryButtonSkeletonStyles = css({
	margin: `0 ${token('space.075', '6px')}`,
	padding: `0 ${token('space.050', '4px')}`,
	position: 'relative',
	appearance: 'none',
	border: 0,
	font: token('font.body'),
	fontWeight: token('font.weight.medium'),
	pointerEvents: 'none',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	':focus, :active, :hover': {
		appearance: 'none',
		border: 0,
		outline: 0,
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'::-moz-focus-inner': {
		border: 0,
	},
});

const isHighlightedStyles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'&:before': {
		height: 3,
		position: 'absolute',
		backgroundColor: `var(${VAR_PRIMARY_BUTTON_BEFORE_HIGHLIGHTED_BACKGROUND_COLOR})`,
		borderStartEndRadius: token('border.radius.050', '1px'),
		borderStartStartRadius: token('border.radius.050', '1px'),
		content: '""',
		insetBlockEnd: 0,
		insetInlineStart: token('space.025', '2px'),
	},
});

const isHighlightedAndDropdownButtonStyles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'&:before': {
		insetInlineEnd: -10,
	},
});

const isHighlightedNotDropdownButtonStyles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'&:before': {
		insetInlineEnd: token('space.025', '2px'),
	},
});

const isDropdownButtonStyles = css({
	// eslint-disable-next-line @atlaskit/design-system/use-tokens-space
	marginInlineEnd: 18,

	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'&:after': {
		display: 'inline-block',
		width: 4,
		height: 4,
		position: 'absolute',
		borderBlockEnd: '2px solid',
		borderColor: `var(${VAR_PRIMARY_BUTTON_AFTER_DROPDOWN_BORDER_COLOR})`,
		borderInlineEnd: '2px solid',
		borderRadius: token('border.radius.050', '1px'),
		content: '""',
		insetBlockStart: 'calc(50% - 4px)',
		insetInlineStart: 'calc(100% - 3px)',
		marginInlineStart: token('space.050', '4px'),
		transform: 'rotate(45deg) scale(1.05)',
		verticalAlign: 'middle',
	},
});

const buttonWrapperStyles = css({
	display: 'flex',
	margin: 0,
});

/**
 * __Skeleton primary button__
 *
 * Skeleton buttons are lightweight HTML button elements with CSS that represent
 * their heavier interactive counterparts, for use when elements of the
 * navigation are loaded dynamically. This one represents a primary button.
 *
 * - [Examples](https://atlassian.design/components/atlassian-navigation/examples#skeleton-button)
 * - [Code](https://atlassian.design/components/atlassian-navigation/code)
 */
export const SkeletonPrimaryButton = ({
	isDropdownButton = false,
	isHighlighted = false,
	text,
	children,
	testId,
}: SkeletonPrimaryButtonProps) => {
	const theme = useTheme();
	const primaryButton = theme.mode.primaryButton;

	const dynamicStyles = stripEmptyProperties({
		...primaryButton.default,
		...(isHighlighted && { color: primaryButton.selected.color }),
		[VAR_PRIMARY_BUTTON_BEFORE_HIGHLIGHTED_BACKGROUND_COLOR]: primaryButton.selected.borderColor,
		[VAR_PRIMARY_BUTTON_AFTER_DROPDOWN_BORDER_COLOR]: isHighlighted
			? primaryButton.default.borderColor
			: primaryButton.default.color,
	});

	return (
		<div role="listitem" css={buttonWrapperStyles}>
			<button
				type="button"
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				style={dynamicStyles as React.CSSProperties}
				css={[
					primaryButtonSkeletonStyles,
					isHighlighted && isHighlightedStyles,
					isDropdownButton && isDropdownButtonStyles,
					isHighlighted &&
						(isDropdownButton
							? isHighlightedAndDropdownButtonStyles
							: isHighlightedNotDropdownButtonStyles),
				]}
				data-testid={testId}
			>
				{text || children}
			</button>
		</div>
	);
};
