/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type FC, type ReactNode } from 'react';

import { css, jsx } from '@compiled/react';
import AnimateHeight from 'react-animate-height';
import { defineMessages, useIntl } from 'react-intl';

import Button from '@atlaskit/button/button';
import ChevronDownIcon from '@atlaskit/icon/core/chevron-down';
import ChevronRightIcon from '@atlaskit/icon/core/chevron-right';
import { Box } from '@atlaskit/primitives/compiled/box';
import { token } from '@atlaskit/tokens';

const i18n = defineMessages({
	collapse: {
		id: 'bitbucket.panel-collapse.message',
		defaultMessage: 'collapse',
		description: 'Label on the panel to signal that the user can collapse the panel.',
	},
	expand: {
		id: 'bitbucket.panel-expand.message',
		defaultMessage: 'expand',
		description: 'Label on the panel to signal that the user can expand the panel.',
	},
});

const panelWrapperStyles = css({
	marginBlockStart: token('space.0'),
	marginInlineEnd: 'auto',
	marginBlockEnd: token('space.200'),
	marginInlineStart: 'auto',
});

const panelHeaderStyles = css({
	alignItems: 'center',
	borderRadius: token('radius.small', '3px'),
	display: 'flex',
	left: token('space.negative.300'),
	marginBlockEnd: token('space.100'),
	marginBlockStart: token('space.200'),
	paddingBlockEnd: token('space.025'),
	paddingBlockStart: token('space.025'),
	paddingInlineEnd: token('space.0'),
	paddingInlineStart: token('space.300'),
	position: 'relative',
	transition: 'all 200ms ease-in-out',
	width: '100%',
	'&:hover': {
		backgroundColor: token('elevation.surface.hovered'),
		cursor: 'pointer',
	},
	// Replaces react-focus-within's `isFocused` prop.
	'&:focus-within': {
		backgroundColor: token('elevation.surface.hovered'),
	},
	// Reveal the expand/collapse button while the header is hovered or focused.
	// Replaces the styled-components `${ButtonWrapper}` component selector.
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors
	'&:hover [data-panel-button-wrapper]': {
		opacity: 1,
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors
	'&:focus-within [data-panel-button-wrapper]': {
		opacity: 1,
	},
});

const buttonWrapperStyles = css({
	left: 0,
	// eslint-disable-next-line @atlaskit/design-system/use-tokens-typography
	lineHeight: 0,
	opacity: 1,
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	transition: 'all 200ms ease-in-out',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors
	'& button': {
		pointerEvents: 'none',
	},
});

const buttonWrapperHiddenStyles = css({
	opacity: 0,
});

export type BasePanelProps = {
	/** Accessible label for the expand/collapse button. Use this when the header is a non-text
	 * React node so screen readers announce a meaningful name instead of the icon label. */
	ariaLabel?: string;
	/** Content to be shown inside the panel. */
	children?: ReactNode;
	/** Header to render on the panel. Clicking the header expands and collapses the panel */
	header?: ReactNode;
};

type PanelState = BasePanelProps & {
	/** Defines whether the panel is expanded by default. */
	isExpanded: boolean;
	/** This callback is called when panel is expanded/collapsed */
	onChange: (isExpanded: boolean) => void;
};

const PanelStateless: FC<PanelState> = ({
	children,
	header,
	isExpanded = false,
	onChange,
	ariaLabel,
}) => {
	const intl = useIntl();
	const i18nExpandText = intl.formatMessage(i18n.expand);
	const i18nCollapseText = intl.formatMessage(i18n.collapse);

	return (
		<div css={panelWrapperStyles}>
			{/*
			 * The header is a pointer-only convenience target. Keyboard and assistive tech users
			 * interact with the nested expand/collapse Button, whose click bubbles to this handler,
			 * so the wrapper itself is marked role="none" (go/a11y-interactive-element-not-keyboard-focusable).
			 */}
			<div css={panelHeaderStyles} onClick={() => onChange(!isExpanded)} role="none">
				<div
					css={[buttonWrapperStyles, isExpanded && buttonWrapperHiddenStyles]}
					data-panel-button-wrapper
				>
					<Button
						appearance="subtle"
						aria-expanded={isExpanded}
						aria-label={ariaLabel}
						spacing="none"
						iconBefore={
							isExpanded ? (
								<Box as="span" paddingInlineStart="space.050">
									<ChevronDownIcon color="currentColor" label={i18nCollapseText} size="small" />
								</Box>
							) : (
								<Box as="span" paddingInlineStart="space.050">
									<ChevronRightIcon color="currentColor" label={i18nExpandText} size="small" />
								</Box>
							)
						}
					/>
				</div>
				<span>{header}</span>
			</div>
			<AnimateHeight
				duration={200}
				easing="linear"
				height={isExpanded ? 'auto' : 0}
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
				className="panel-content"
			>
				{children}
			</AnimateHeight>
		</div>
	);
};

export default PanelStateless;
