import React, { useCallback, useState } from 'react';

import { type Placement } from '@atlaskit/popper';
import Popup from '@atlaskit/popup';
import { Inline, xcss } from '@atlaskit/primitives';

import { type ReactionClick, type ReactionFocused, type ReactionMouseEnter } from '../../types';
import { Reaction } from '../Reaction';
import { type ReactionsProps, type OpenReactionsDialogOptions } from '../Reactions';

import { ReactionSummaryButton } from './ReactionSummaryButton';

const summaryPopupStyles = xcss({
	padding: 'space.100',
	paddingTop: 'space.050',
	maxWidth: '325px',
});

/**
 * Test id for the Reactions summary view popup
 */
export const RENDER_SUMMARY_VIEW_POPUP_TESTID = 'render-summary-view-popup';

interface ReactionSummaryViewProps
	extends Pick<
		ReactionsProps,
		'emojiProvider' | 'reactions' | 'flash' | 'particleEffectByEmoji' | 'allowUserDialog'
	> {
	/**
	 * Optional prop to change the placement of the summary popup reaction list
	 */
	placement?: Placement;
	/**
	 * event handler when a a reaction button is clicked inside the summary
	 */
	onReactionClick: ReactionClick;
	/**
	 * Optional event when the mouse cursor hovers over a reaction button inside the summary
	 */
	onReactionMouseEnter?: ReactionMouseEnter;
	/**
	 * Optional event when focused a reaction inside the summary
	 */
	onReactionFocused?: ReactionFocused;
	/**
	 * Optional prop for using an opaque button background instead of a transparent background
	 */
	showOpaqueBackground?: boolean;
	/**
	 * Optional prop for applying subtle styling to reaction picker
	 */
	subtleReactionsSummaryAndPicker?: boolean;
	/**
	 * Optional prop for enabling the Reactions Dialog
	 */
	allowUserDialog?: boolean;
	/**
	 * Optional function when the user wants to open the Reactions Dialog
	 */
	handleOpenReactionsDialog?: (options?: OpenReactionsDialogOptions) => void /**
	 * Optional prop for controlling if the reactions component is view only, disabling adding reactions
	 */;
	isViewOnly?: boolean;
}

export const ReactionSummaryView = ({
	emojiProvider,
	reactions = [],
	flash = {},
	particleEffectByEmoji = {},
	placement = 'auto-start',
	onReactionClick,
	onReactionFocused,
	onReactionMouseEnter,
	showOpaqueBackground = false,
	subtleReactionsSummaryAndPicker = false,
	allowUserDialog,
	handleOpenReactionsDialog,
	isViewOnly = false,
}: ReactionSummaryViewProps) => {
	const [isSummaryPopupOpen, setSummaryPopupOpen] = useState<boolean>(false);

	const handlePopupClose = useCallback(() => setSummaryPopupOpen(false), []);
	const handleSummaryClick = useCallback(
		() => setSummaryPopupOpen(!isSummaryPopupOpen),
		[isSummaryPopupOpen],
	);

	return (
		<Popup
			placement={placement}
			content={() => (
				<Inline
					xcss={summaryPopupStyles}
					testId={RENDER_SUMMARY_VIEW_POPUP_TESTID}
					space="space.025"
					shouldWrap
					alignBlock="center"
				>
					{reactions.map((reaction) => (
						<Reaction
							key={reaction.emojiId}
							reaction={reaction}
							emojiProvider={emojiProvider}
							onClick={onReactionClick}
							onFocused={onReactionFocused}
							onMouseEnter={onReactionMouseEnter}
							flash={flash[reaction.emojiId]}
							showParticleEffect={particleEffectByEmoji[reaction.emojiId]}
							allowUserDialog={allowUserDialog}
							handleOpenReactionsDialog={handleOpenReactionsDialog}
							isViewOnly={isViewOnly}
						/>
					))}
				</Inline>
			)}
			isOpen={isSummaryPopupOpen}
			onClose={handlePopupClose}
			trigger={(triggerProps) => (
				<ReactionSummaryButton
					{...triggerProps}
					emojiProvider={emojiProvider}
					reactions={reactions}
					onClick={handleSummaryClick}
					showOpaqueBackground={showOpaqueBackground}
					subtleReactionsSummaryAndPicker={subtleReactionsSummaryAndPicker}
				/>
			)}
		/>
	);
};
