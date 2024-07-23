/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type MouseEvent } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import ChevronRight from '@atlaskit/icon/glyph/chevron-right';
import { easeOut } from '@atlaskit/motion/curves';
import { mediumDurationMs, smallDurationMs } from '@atlaskit/motion/durations';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';
import { UNSAFE_media } from '@atlaskit/primitives/responsive';
import { B100, B200, N0, N200, N30A } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { RESIZE_BUTTON_SELECTOR } from '../../common/constants';

import { type ResizeButtonProps } from './types';

const increaseHitAreaStyles = css({
	position: 'absolute',
	insetBlockEnd: `${token('space.negative.100', '-8px')}`,
	insetBlockStart: `${token('space.negative.100', '-8px')}`,
	insetInlineEnd: `${token('space.negative.150', '-12px')}`,
	insetInlineStart: `${token('space.negative.100', '-8px')}`,
});

const furtherIncreasedHitAreasStyles = css({
	insetBlockEnd: `${token('space.negative.300', '-24px')}`,
	insetBlockStart: `${token('space.negative.300', '-24px')}`,
});

const mobileStyles = css({
	// eslint-disable-next-line @atlaskit/design-system/no-nested-styles, @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	[UNSAFE_media.below.sm]: {
		opacity: 1,
	},
});

const resizeIconButtonStyles = css({
	width: 24,
	height: 24,
	padding: token('space.0', '0px'),
	position: 'absolute',
	backgroundColor: token('elevation.surface.overlay', N0),
	border: 0,
	borderRadius: token('border.radius.circle', '50%'),
	// eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage -- TODO: https://product-fabric.atlassian.net/browse/DSP-3392; this boxShadow needs further investigation, along with the hover and active background colors.
	boxShadow: `0 0 0 1px ${N30A}, 0 2px 4px 1px ${N30A}`,
	color: token('color.text.subtle', N200),
	cursor: 'pointer',
	insetBlockStart: token('space.400', '32px'),
	insetInlineStart: 0,
	/**
	 * The fallback value of 0 ensures that the button is hidden by default,
	 * unless some parent (or the button itself) overrides it.
	 */
	opacity: `var(--ds--resize-button--opacity,0)`,
	outline: 0,
	transform: 'translateX(-50%)',
	transition: `
    background-color ${smallDurationMs}ms linear,
    color ${smallDurationMs}ms linear,
    opacity ${mediumDurationMs}ms ${easeOut}
  `,
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	':hover': {
		backgroundColor: token('color.background.selected.bold', B100),
		color: token('color.text.inverse', N0),
		opacity: 1,
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	':active, :focus': {
		backgroundColor: token('color.background.selected.bold.hovered', B200),
		color: token('color.text.inverse', N0),
		opacity: 1,
	},
});

const resizeIconButtonExpandedStyles = css({
	transform: 'rotate(180deg)',
	transformOrigin: 7,
});

const preventDefault = (event: MouseEvent) => event.preventDefault();
const cssSelector = { [RESIZE_BUTTON_SELECTOR]: true };
const ResizeButton = ({ isLeftSidebarCollapsed, label, testId, ...props }: ResizeButtonProps) => (
	<button
		{...cssSelector} // DO NOT remove. used as a CSS selector.
		aria-expanded={!isLeftSidebarCollapsed}
		aria-label={label}
		type="button"
		// The error goes away when we remove the spread ...props
		css={[
			resizeIconButtonStyles,
			mobileStyles,
			!isLeftSidebarCollapsed && resizeIconButtonExpandedStyles,
		]}
		data-testid={testId}
		// Prevents focus staying attached to the button when pressed
		onMouseDown={preventDefault}
		// eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
		{...props}
	>
		<ChevronRight label="" />
		{getBooleanFF('platform.design-system-team.page-layout-resize-button-fix_u0qxv') ? (
			<span css={[increaseHitAreaStyles, furtherIncreasedHitAreasStyles]} />
		) : (
			<div css={increaseHitAreaStyles} />
		)}
	</button>
);

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default ResizeButton;
