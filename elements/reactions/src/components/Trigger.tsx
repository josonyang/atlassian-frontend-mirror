/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type AriaAttributes } from 'react';
import { defineMessages, useIntl } from 'react-intl-next';
import { type AnalyticsEvent, type UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Tooltip from '@atlaskit/tooltip';
import { token } from '@atlaskit/tokens';
import EmojiAddIcon from '@atlaskit/icon/core/migration/emoji-add';

import { fg } from '@atlaskit/platform-feature-flags';

import { Box, Pressable } from '@atlaskit/primitives/compiled';
import { cssMap, jsx, cx, css } from '@compiled/react';
import React from 'react';

const styles = cssMap({
	trigger: {
		minWidth: '32px',
		height: '24px',
		paddingTop: token('space.0'),
		paddingRight: token('space.0'),
		paddingBottom: token('space.0'),
		paddingLeft: token('space.0'),
		borderWidth: token('border.width'),
		borderStyle: 'solid',
		borderRadius: token('border.radius.circle'),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	subtleTrigger: {
		minWidth: '24px',
		borderStyle: 'none',
	},

	expandedTrigger: {
		minWidth: '110px',
	},

	triggerStylesRefresh: {
		borderRadius: token('border.radius'),
	},

	transparentEnabledTrigger: {
		borderColor: token('color.border'),
		backgroundColor: token('color.background.neutral.subtle'),

		'&:hover': {
			backgroundColor: token('color.background.neutral.subtle.hovered'),
		},
		'&:active': {
			backgroundColor: token('color.background.neutral.subtle.pressed'),
		},
	},

	opaqueEnabledTrigger: {
		borderColor: token('color.border'),
		backgroundColor: token('elevation.surface'),
		'&:hover': {
			backgroundColor: token('elevation.surface.hovered'),
		},
		'&:active': {
			backgroundColor: token('elevation.surface.pressed'),
		},
	},

	disabledTrigger: {
		borderColor: token('color.border.disabled'),
		backgroundColor: token('color.background.disabled'),
	},

	miniMode: {
		minWidth: '24px',
		paddingTop: token('space.050'),
		paddingRight: token('space.050'),
		paddingBottom: token('space.050'),
		paddingLeft: token('space.050'),
		borderStyle: 'none',
		borderRadius: token('border.radius'),
	},

	fullWidthSummaryViewReactionPickerTrigger: {
		width: '100%',
		paddingTop: token('space.100'),
		paddingLeft: token('space.100'),
		paddingRight: token('space.100'),
	},

	fullWidthSelectorTrayReactionPickerTrigger: {
		width: '100%',
		paddingTop: token('space.050'),
		paddingLeft: token('space.050'),
		paddingRight: token('space.050'),
	},

	fullWidth: {
		width: '100%',
		maxWidth: '305px',
	},
});

/**
 * Test id for the tooltip
 */
export const RENDER_TOOLTIP_TRIGGER_TESTID = 'render-tooltip-trigger';
export const RENDER_TRIGGER_BUTTON_TESTID = 'render-trigger-button';
export const RENDER_TRIGGER_CONTAINER_TESTID = 'render-trigger-container';
export const RENDER_LIST_ITEM_WRAPPER_TESTID = 'render-list-item-wrapper';

export interface TriggerProps {
	/**
	 * Optional Event handler when the button to open the picker is clicked
	 * @param e Mouse Dom event
	 * @param analyticsEvent atlaskit analytics event payload of the button
	 */
	onClick?: (e: React.MouseEvent<HTMLElement>, analyticsEvent: AnalyticsEvent) => void;
	/**
	 * apply "miniMode" className to the button
	 */
	miniMode?: boolean;
	/**
	 * Enable/Disable the button to be clickable (defaults to false)
	 */
	disabled?: boolean;
	/**
	 * Tooltip content for trigger button
	 */
	tooltipContent: React.ReactNode;
	/**
	 * Aria accessibility attributes that will be added to the button
	 */
	ariaAttributes?: AriaAttributes;
	/**
	 * Optional prop for using an opaque button background instead of a transparent background
	 */
	showOpaqueBackground?: boolean;
	/**
	 * Optional prop for displaying text to add a reaction
	 */
	showAddReactionText?: boolean;
	/**
	 * Optional prop for applying subtle styling to reaction picker
	 */
	subtleReactionsSummaryAndPicker?: boolean;
	/**
	 * Optional prop for controlling icon inside Trigger
	 */
	reactionPickerTriggerIcon?: React.ReactNode;
	/**
	 * Optional prop for controlling if reaction picker is opened
	 */
	isSelected?: boolean;
	/**
	 * Optional prop for controlling text inside Trigger
	 */
	reactionPickerTriggerText?: string;
	/**
	 * Optional prop for controlling if the summary view reaction picker trigger should be full width
	 */
	fullWidthSummaryViewReactionPickerTrigger?: boolean;
	/**
	 * Optional prop to say if the reactions component is in a list
	 */
	isListItem?: boolean;
	/*
	 * Optional prop for controlling if the selector tray reaction picker trigger should be full width
	 */
	fullWidthSelectorTrayReactionPickerTrigger?: boolean;
}

const i18n = defineMessages({
	addReaction: {
		id: 'reaction-picker-trigger.add.reaction.message',
		description: 'Message displayed when there are no page reactions existing on the page.',
		defaultMessage: 'Add a reaction',
	},
});

const addReactionStyles = cssMap({
	addReactionMessage: {
		font: token('font.body.UNSAFE_small'),
		color: token('color.text.subtle'),
		marginLeft: token('space.050'),
	},
});

const noMarkerListStyle = css({
	listStyle: 'none',
});

/**
 * Render an emoji button to open the reactions select picker
 */
export const Trigger = React.forwardRef(
	(props: TriggerProps, ref: React.Ref<HTMLButtonElement>) => {
		const { formatMessage } = useIntl();

		const {
			onClick,
			miniMode,
			tooltipContent,
			disabled = false,
			ariaAttributes = {},
			showOpaqueBackground = false,
			showAddReactionText = false,
			subtleReactionsSummaryAndPicker = false,
			reactionPickerTriggerIcon,
			reactionPickerTriggerText = formatMessage(i18n.addReaction),
			fullWidthSummaryViewReactionPickerTrigger = false,
			isListItem = false,
			fullWidthSelectorTrayReactionPickerTrigger = false,
		} = props;

		const handleMouseDown = (
			e: React.MouseEvent<HTMLElement>,
			analyticsEvent: UIAnalyticsEvent,
		) => {
			if (onClick && !disabled) {
				onClick(e, analyticsEvent);
			}
		};

		const renderPressableButton = () => (
			<Pressable
				testId={RENDER_TRIGGER_BUTTON_TESTID}
				xcss={cx(
					styles.trigger,
					(fullWidthSummaryViewReactionPickerTrigger ||
						fullWidthSelectorTrayReactionPickerTrigger) &&
						styles.fullWidth,
					subtleReactionsSummaryAndPicker && styles.subtleTrigger,
					showAddReactionText && styles.expandedTrigger,
					disabled
						? styles.disabledTrigger
						: showOpaqueBackground
							? styles.opaqueEnabledTrigger
							: styles.transparentEnabledTrigger,
					miniMode && styles.miniMode,
					// eslint-disable-next-line @atlaskit/platform/ensure-feature-flag-prefix
					fg('platform-component-visual-refresh') && styles.triggerStylesRefresh,
				)}
				style={{
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop, @atlaskit/design-system/use-tokens-typography
					lineHeight: '16px',
				}}
				onClick={handleMouseDown}
				isDisabled={disabled}
				ref={ref}
				data-subtle={subtleReactionsSummaryAndPicker}
				data-mini-mode={miniMode}
				{...ariaAttributes}
			>
				{!!reactionPickerTriggerIcon ? (
					reactionPickerTriggerIcon
				) : (
					// TODO: https://product-fabric.atlassian.net/browse/DSP-21007
					<EmojiAddIcon
						testId="emoji-add-icon"
						color={disabled ? token('color.icon.disabled') : token('color.icon')}
						LEGACY_size="small"
						label="Add reaction"
					/>
				)}
				{showAddReactionText && (
					<Box xcss={cx(addReactionStyles.addReactionMessage)}>{reactionPickerTriggerText}</Box>
				)}
			</Pressable>
		);

		return (
			<Box
				xcss={cx(
					fullWidthSummaryViewReactionPickerTrigger &&
						styles.fullWidthSummaryViewReactionPickerTrigger,
					fullWidthSelectorTrayReactionPickerTrigger &&
						styles.fullWidthSelectorTrayReactionPickerTrigger,
				)}
				testId={RENDER_TRIGGER_CONTAINER_TESTID}
			>
				<Tooltip
					testId={RENDER_TOOLTIP_TRIGGER_TESTID}
					content={tooltipContent}
					canAppear={() => !showAddReactionText}
				>
					{isListItem ? (
						<li data-testid={RENDER_LIST_ITEM_WRAPPER_TESTID} css={noMarkerListStyle}>
							{renderPressableButton()}
						</li>
					) : (
						renderPressableButton()
					)}
				</Tooltip>
			</Box>
		);
	},
);
