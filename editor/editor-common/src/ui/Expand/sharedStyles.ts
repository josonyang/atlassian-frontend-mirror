// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css } from '@emotion/react';

import {
	akEditorLineHeight,
	akEditorSwoopCubicBezier,
	akLayoutGutterOffset,
	relativeFontSizeToBase16,
} from '@atlaskit/editor-shared-styles';
import { fg } from '@atlaskit/platform-feature-flags';
import { token } from '@atlaskit/tokens';

const BORDER_RADIUS = token('border.radius.100', '4px');

const EXPAND_COLLAPSED_BACKGROUND = token('color.background.neutral.subtle', 'transparent');
const EXPAND_SELECTED_BACKGROUND = token('elevation.surface', 'rgba(255, 255, 255, 0.6)');

const EXPAND_FOCUSED_BORDER_COLOR = token('color.border.focused');
const EXPAND_COLLAPSED_BORDER_COLOR = 'transparent';
const EXPAND_EXPANDED_BORDER_COLOR = token('color.border');

export const EXPAND_CONTAINER_PADDING = 8;
export interface StyleProps {
	expanded?: boolean;
	focused?: boolean;
	'data-node-type'?: 'expand' | 'nestedExpand';
	'data-title'?: string;
}

const containerStyles = (styleProps: StyleProps) => {
	const { expanded, focused } = styleProps;
	const marginTop = token('space.050', '0.25rem');
	const marginBottom = 0;
	// Only only these margins if the expand isn't editable
	// and is the root level expand.
	const marginHorizontal =
		styleProps['data-node-type'] === 'expand' ? `-${akLayoutGutterOffset}px` : 0;
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	const margin = `${marginTop} ${marginHorizontal} ${marginBottom}`;

	return () =>
		css({
			borderWidth: '1px',
			borderStyle: 'solid',
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
			borderColor: focused
				? EXPAND_FOCUSED_BORDER_COLOR
				: expanded
					? EXPAND_EXPANDED_BORDER_COLOR
					: EXPAND_COLLAPSED_BORDER_COLOR,
			borderRadius: BORDER_RADIUS,
			minHeight: '25px',
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
			background: !expanded ? EXPAND_COLLAPSED_BACKGROUND : EXPAND_SELECTED_BACKGROUND,
			margin: margin,
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
			transition: `background 0.3s ${akEditorSwoopCubicBezier}, border-color 0.3s ${akEditorSwoopCubicBezier}`,
			padding: token('space.100', `${EXPAND_CONTAINER_PADDING}px`),
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
			'td > :not(style):first-child, td > style:first-child + *': {
				marginTop: 0,
			},
		});
};

const contentStyles = (styleProps: StyleProps) => () =>
	// eslint-disable-next-line @atlaskit/design-system/no-css-tagged-template-expression -- needs manual remediation
	css`
		padding-top: ${styleProps.expanded ? token('space.100', '8px') : token('space.0', '0px')};
		padding-right: ${token('space.100', '8px')};
		padding-left: ${token('space.300', '24px')};
		margin-left: ${token('space.050', '4px')};
		display: flow-root;

		/* The follow rules inside @supports block are added as a part of ED-8893
		The fix is targeting mobile bridge on iOS 12 or below,
		We should consider remove this fix when we no longer support iOS 12 */
		@supports not (display: flow-root) {
			width: 100%;
			box-sizing: border-box;
		}

		${!styleProps.expanded
			? `
        .expand-content-wrapper, .nestedExpand-content-wrapper {
          /* We visually hide the content here to preserve the content during copy+paste */
          /* Do not add text nowrap here because inline comment navigation depends on the location of the text */
          width: 100%;
          display: block;
          height: 0;
          overflow: hidden;
          clip: rect(1px, 1px, 1px, 1px);
          user-select: none;
        }
      `
			: ''}
	`;

const titleInputStyles = () =>
	css({
		outline: 'none',
		border: 'none',
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		fontSize: relativeFontSizeToBase16(14),
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values, @atlaskit/design-system/use-tokens-typography -- Ignored via go/DSP-18766
		lineHeight: fg('platform-visual-refresh-icons') ? 1 : akEditorLineHeight,
		fontWeight: token('font.weight.regular'),
		color: token('color.text.subtlest'),
		background: 'transparent',
		display: 'flex',
		flex: 1,
		padding: `0 0 0 ${token('space.050', '4px')}`,
		width: '100%',
		'&::placeholder': {
			opacity: 1,
			color: token('color.text.subtlest'),
		},
	});

const titleContainerStyles = () =>
	css({
		padding: 0,
		display: 'flex',
		alignItems: 'flex-start',
		background: 'none',
		border: 'none',
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		fontSize: relativeFontSizeToBase16(14),
		width: '100%',
		color: token('color.text.subtle'),
		overflow: 'hidden',
		cursor: 'pointer',
		'&:focus': {
			outline: 0,
		},
	});
export const sharedExpandStyles = {
	titleInputStyles,
	titleContainerStyles,
	containerStyles,
	contentStyles,
};
