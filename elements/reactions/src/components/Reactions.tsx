/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { css, jsx } from '@compiled/react';
import { FormattedMessage } from 'react-intl-next';

import { type UIAnalyticsEvent, useAnalyticsEvents } from '@atlaskit/analytics-next';
import {
	type KeyboardOrMouseEvent,
	ModalTransition,
	type OnCloseHandler,
} from '@atlaskit/modal-dialog';
import { type Placement } from '@atlaskit/popper';
import UFOSegment from '@atlaskit/react-ufo/segment';
import { token } from '@atlaskit/tokens';

import {
	createAndFireSafe,
	createPickerButtonClickedEvent,
	createPickerCancelledEvent,
	createPickerMoreClickedEvent,
	createReactionsRenderedEvent,
	createReactionSelectionEvent,
	isSampled,
} from '../analytics';
import { SAMPLING_RATE_REACTIONS_RENDERED_EXP } from '../shared/constants';
import { messages } from '../shared/i18n';
import {
	ReactionStatus,
	type ReactionClick,
	type ReactionSummary,
	type ReactionSource,
	type QuickReactionEmojiSummary,
	type ProfileCardWrapper,
} from '../types';
import { ReactionDialogOpened, ReactionDialogSelectedReactionChanged } from '../ufo';
import { Reaction } from './Reaction';
import { ReactionsDialog } from './ReactionsDialog';
import { ReactionPicker as ReactionPickerOld, type ReactionPickerProps } from './ReactionPicker';
import { ReactionPicker as ReactionPickerNew } from './ReactionPickerNew';
import { type SelectorProps } from './Selector';
import { ReactionSummaryView } from './ReactionSummaryView';
import { componentWithFG } from '@atlaskit/platform-feature-flags-react';

const ReactionPicker = componentWithFG(
	'platform_editor_reactions_picker_fix',
	ReactionPickerNew,
	ReactionPickerOld,
);

const wrapperStyle = css({
	display: 'flex',
	flexWrap: 'wrap',
	position: 'relative',
	alignItems: 'center',
	borderRadius: '15px',
	marginTop: token('space.negative.050', '-4px'),
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'> :first-of-type > :first-of-type': { marginLeft: 0 },
});

const noFlexWrapStyles = css({
	flexWrap: 'nowrap',
});

const noContainerPositionStyles = css({
	position: 'initial',
});

const reactionPickerStyle = css({
	display: 'inline-block',
	marginTop: token('space.050', '4px'),
});

/**
 * Set of all available UFO experiences relating to Reactions Dialog
 */
export const ufoExperiences = {
	/**
	 * Experience when a reaction dialog is opened
	 */
	openDialog: ReactionDialogOpened,
	/**
	 * Experience when a reaction changed/fetched from inside the modal dialog
	 */
	selectedReactionChangeInsideDialog: ReactionDialogSelectedReactionChanged,
};

/**
 * Test id for wrapper Reactions div
 */
export const RENDER_REACTIONS_TESTID = 'render-reactions';
/**
 * Test id for the view all reacted user to trigger the dialog
 */
export const RENDER_VIEWALL_REACTED_USERS_DIALOG = 'viewall-reacted-users-dialog';

/**
 * Test id for summary view of reactions
 */
export const RENDER_REACTIONS_SUMMARY_TESTID = 'reaction-summary-view';

export interface ReactionsProps
	extends Pick<
			ReactionPickerProps,
			| 'allowAllEmojis'
			| 'emojiProvider'
			| 'emojiPickerSize'
			| 'miniMode'
			| 'reactionPickerTriggerIcon'
			| 'reactionPickerPlacement'
		>,
		Pick<SelectorProps, 'pickerQuickReactionEmojiIds'> {
	/**
	 * event handler to fetching the reactions
	 */
	loadReaction: () => void;
	/**
	 * Event callback when an emoji button is selected
	 */
	onSelection: (emojiId: string) => void;
	/**
	 * Optional list of reactions to render (defaults to empty list)
	 */
	reactions?: ReactionSummary[];
	/**
	 * Condition for the reaction list status while being fetched
	 */
	status: ReactionStatus;
	/**
	 * event handler when the emoji button is clicked
	 */
	onReactionClick: ReactionClick;
	/**
	 * Optional emoji reactions list to show custom animation or render as standard (key => emoji string "id", value => true/false to show custom animation)
	 */
	flash?: Record<string, boolean>;
	/**
	 * Optional emoji reactions list to show floating emoji particle effect (key => emoji string "id", value => true/false to show the particle effect).
	 * Generally used for newly added reactions.
	 */
	particleEffectByEmoji?: Record<string, boolean>;
	/**
	 * Optional event to get reaction details for an emoji
	 * @param emojiId current reaction emoji id
	 */
	getReactionDetails?: (emojiId: string) => void;
	/**
	 * Optional error message to show when unable to display the reaction emoji
	 */
	errorMessage?: string;
	/**
	 * quickReactionEmojiIds are emojis that will be shown in the the primary view even if the reaction count is zero
	 */
	quickReactionEmojis?: QuickReactionEmojiSummary;
	/**
	 * Optional callback function called when opening reactions dialog
	 */
	onDialogOpenCallback?: (emojiId: string, source?: string) => void;
	/**
	 * Optional callback function called when closing reactions dialog
	 */
	onDialogCloseCallback?: OnCloseHandler;
	/**
	 * Optional callback function called when selecting a reaction in reactions dialog
	 */
	onDialogSelectReactionCallback?: (emojiId: string) => void;
	/**
	 * Optional callback function called when navigating between pages in the reactions dialog
	 */
	onDialogPageChangeCallback?: (emojiId: string, curentPage: number, maxPages: number) => void;
	/**
	 * Enables a summary view for displaying reactions. If enabled and the number of reactions meets or exceeds the summaryViewThreshold, reactions will be shown in a more aggregated format.
	 */
	summaryViewEnabled?: boolean;
	/**
	 * The minimum number of reactions required to switch to the summary view when summaryViewEnabled is true. Defaults to 3 if not specified.
	 */
	summaryViewThreshold?: number;
	/**
	 * Optional prop to change the placement of the summary popup reaction list
	 */
	summaryViewPlacement?: Placement;
	/**
	 * Optional prop to change the style of the summary view
	 */
	useButtonAlignmentStyling?: boolean;
	/**
	 * Optional prop for using an opaque button background instead of a transparent background
	 */
	showOpaqueBackground?: boolean;
	/**
	 * Optional prop for applying subtle styling to reaction summary and picker
	 */
	subtleReactionsSummaryAndPicker?: boolean;
	/**
	 * Optional prop for displaying text to add a reaction
	 */
	showAddReactionText?: boolean;
	/**
	 * Optional prop for hiding default reactions displayed when there are no existing reactions
	 */
	hideDefaultReactions?: boolean;
	/**
	 * Optional prop from checking a feature gate for rendering Reactions Dialog
	 */
	allowUserDialog?: boolean;
	/**
	 * Optional prop for rendering a profile card wrapper in the Reactions Dialog
	 */
	ProfileCardWrapper?: ProfileCardWrapper;
	/**
	 * Optional prop to hide the user reactions and only render the picker
	 */
	onlyRenderPicker?: boolean;
	/**
	 * Optional prop for controlling if the reactions component is view only, disabling adding reactions
	 */
	isViewOnly?: boolean;
	/*
	 * Optional prop for disabling the wrap behavior on the reactions container
	 */
	noWrap?: boolean;
	/**
	 * Optional prop for using your own container for relative positioning for emoji picker popup
	 */
	noRelativeContainer?: boolean;
	/**
	 * Optional prop for controlling if default reactions are subtle
	 */
	showSubtleDefaultReactions?: boolean;
	/**
	 * Optional prop for controlling tooltip content of the trigger button
	 */
	reactionPickerTriggerTooltipContent?: string;
	/**
	 * Optional prop for controlling if we can select emojis and display UI via summary view picker
	 */
	allowSelectFromSummaryView?: boolean;
	/**
	 * Optional prop for controlling text of the trigger button
	 */
	reactionPickerTriggerText?: string;
	/**
	 * Optional prop for controlling if the summary view is hoverable
	 */
	hoverableSummaryView?: boolean;
	/**
	 * Optional prop to say if the reactions component is in a list
	 */
	isListItem?: boolean;
	/**
	 * Optional prop to optimistically render the image URL for a given emoji id. Typically used in SSR before the emoji Provider resolves & the real image is loaded.
	 */
	summaryGetOptimisticImageURL?: (emojiId: string) => string;
	/**
	 *  Optional prop to change the placement of the reaction picker popup
	 */
	reactionPickerPlacement?: Placement;
	/**
	 * Optional prop to add an icon to the end of the summary button
	 */
	summaryButtonIconAfter?: React.ReactNode;
	/**
	 * Optional prop to render the particle effect on the summary view
	 */
	renderParticleEffectOnSummaryView?: boolean;
}

export interface OpenReactionsDialogOptions {
	emojiId?: string;
	source?: string;
}

/**
 * Get content of the tooltip
 */
export function getTooltip(status: ReactionStatus, errorMessage?: string, tooltipContent?: string) {
	switch (status) {
		case ReactionStatus.error:
			return errorMessage || <FormattedMessage {...messages.unexpectedError} />;
		// When reaction is not available don't show any tooltip (e.g. Archive page in Confluence)
		case ReactionStatus.disabled:
			return null;
		case ReactionStatus.notLoaded:
		case ReactionStatus.loading:
			return <FormattedMessage {...messages.loadingReactions} />;
		case ReactionStatus.ready:
			return !!tooltipContent ? tooltipContent : <FormattedMessage {...messages.addReaction} />;
	}
}

/**
 * Renders list of reactions
 */
export const Reactions = React.memo(
	({
		flash = {},
		particleEffectByEmoji = {},
		status,
		errorMessage,
		loadReaction,
		quickReactionEmojis,
		pickerQuickReactionEmojiIds,
		getReactionDetails = () => {},
		onSelection,
		reactions = [],
		emojiProvider,
		allowAllEmojis,
		onReactionClick,
		allowUserDialog,
		onDialogOpenCallback = () => {},
		onDialogCloseCallback = () => {},
		onDialogSelectReactionCallback = () => {},
		onDialogPageChangeCallback = () => {},
		emojiPickerSize = 'medium',
		miniMode = false,
		summaryViewEnabled = false,
		summaryViewThreshold = 3,
		summaryViewPlacement,
		showOpaqueBackground = false,
		subtleReactionsSummaryAndPicker = false,
		showAddReactionText = false,
		hideDefaultReactions = false,
		ProfileCardWrapper,
		onlyRenderPicker = false,
		isViewOnly = false,
		noWrap = false,
		noRelativeContainer = false,
		showSubtleDefaultReactions,
		reactionPickerTriggerTooltipContent,
		reactionPickerTriggerIcon,
		allowSelectFromSummaryView = false,
		useButtonAlignmentStyling = false,
		reactionPickerTriggerText,
		hoverableSummaryView = false,
		isListItem = false,
		summaryGetOptimisticImageURL,
		reactionPickerPlacement,
		summaryButtonIconAfter,
		renderParticleEffectOnSummaryView = false,
	}: ReactionsProps) => {
		const [selectedEmojiId, setSelectedEmojiId] = useState<string>('');
		const [summaryViewParticleEffectEmojiId, setSummaryViewParticleEffectEmojiId] = useState<{
			id: string;
			shortName: string;
		} | null>(null);

		// if the reactions are empty, then set summaryViewParticleEffectEmojiId to null to clear the particle effect state
		useEffect(() => {
			if (reactions.length === 0) {
				setSummaryViewParticleEffectEmojiId(null);
			}
		}, [reactions]);

		const { createAnalyticsEvent } = useAnalyticsEvents();

		let openTime = useRef<number>();
		let renderTime = useRef<number>();

		useEffect(() => {
			if (status === ReactionStatus.notLoaded) {
				loadReaction();
			}
		}, [status, loadReaction]);

		useEffect(() => {
			if (status !== ReactionStatus.ready) {
				renderTime.current = Date.now();
			} else {
				const isSSR = process.env.REACT_SSR;
				if (isSampled(SAMPLING_RATE_REACTIONS_RENDERED_EXP) && !isSSR) {
					createAndFireSafe(
						createAnalyticsEvent,
						createReactionsRenderedEvent,
						renderTime.current ?? Date.now(), //renderTime.current can be null during unit test cases
					);
				}
				renderTime.current = undefined;
			}
		}, [createAnalyticsEvent, status]);

		const handleReactionMouseEnter = useCallback(
			(emojiId: string) => {
				getReactionDetails(emojiId);
			},
			[getReactionDetails],
		);

		const handleReactionFocused = useCallback(
			(emojiId: string) => {
				getReactionDetails(emojiId);
			},
			[getReactionDetails],
		);

		const handlePickerOpen = useCallback(() => {
			openTime.current = Date.now();
			createAndFireSafe(createAnalyticsEvent, createPickerButtonClickedEvent, reactions.length);
		}, [createAnalyticsEvent, reactions]);

		const handleOnCancel = useCallback(() => {
			createAndFireSafe(createAnalyticsEvent, createPickerCancelledEvent, openTime.current);
			openTime.current = undefined;
		}, [createAnalyticsEvent]);

		const handleOnMore = useCallback(() => {
			createAndFireSafe(createAnalyticsEvent, createPickerMoreClickedEvent, openTime.current);
		}, [createAnalyticsEvent]);

		const handleSetSummaryViewParticleEffectEmojiId = useCallback(
			(emojiId: string) => {
				// Find if this emoji is already in existing reactions
				const existingReaction = reactions.find((reaction) => reaction.emojiId === emojiId);
				// Only set mostRecentlyClickedId if user hasn't reacted with this emoji yet
				if (!existingReaction?.reacted) {
					setSummaryViewParticleEffectEmojiId({ id: emojiId, shortName: '' });
				} else {
					setSummaryViewParticleEffectEmojiId(null);
				}
			},
			[reactions, setSummaryViewParticleEffectEmojiId],
		);

		const handleOnSelection = useCallback(
			(emojiId: string, source: ReactionSource) => {
				createAndFireSafe(
					createAnalyticsEvent,
					createReactionSelectionEvent,
					source,
					emojiId,
					reactions.find((reaction) => reaction.emojiId === emojiId),
					openTime.current,
				);
				openTime.current = undefined;
				onSelection(emojiId);
				handleSetSummaryViewParticleEffectEmojiId(emojiId);
			},
			[createAnalyticsEvent, onSelection, reactions, handleSetSummaryViewParticleEffectEmojiId],
		);

		const handleSummaryViewReactionClick = useCallback(
			(emojiId: string, event: React.MouseEvent<HTMLButtonElement>) => {
				onReactionClick(emojiId, event);
				handleSetSummaryViewParticleEffectEmojiId(emojiId);
			},
			[onReactionClick, handleSetSummaryViewParticleEffectEmojiId],
		);

		const handleCloseReactionsDialog: OnCloseHandler = (
			e: KeyboardOrMouseEvent,
			analyticsEvent: UIAnalyticsEvent,
		) => {
			setSelectedEmojiId('');
			onDialogCloseCallback(e, analyticsEvent);
		};

		const handleSelectReactionInDialog = (emojiId: string) => {
			// ufo selected reaction inside the modal dialog
			ufoExperiences.selectedReactionChangeInsideDialog.start();

			handleReactionMouseEnter(emojiId);
			setSelectedEmojiId(emojiId);
			onDialogSelectReactionCallback(emojiId);

			// ufo selected reaction inside the modal dialog success
			ufoExperiences.selectedReactionChangeInsideDialog.success({
				metadata: {
					emojiId,
					source: 'Reactions',
					reason: 'Selected Emoji changed',
				},
			});
		};

		const handlePaginationChange = useCallback(
			(emojiId: string, currentPage: number, maxPages: number) => {
				// fetch the latest active emoji from the new page
				getReactionDetails(emojiId);
				setSelectedEmojiId(emojiId);
				onDialogPageChangeCallback(emojiId, currentPage, maxPages);
			},
			// Exclude unstable getReactionDetails to avoid extra re-renders
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[setSelectedEmojiId],
		);

		/**
		 * Get the reactions that we want to render are any reactions with a count greater than zero as well as any default emoji not already shown
		 */
		const memorizedReactions = useMemo(() => {
			//
			/**
			 * If reactions not empty, don't show quick reactions Pre defined emoji or if its empty and default reactions not hidden => return the current list of reactions
			 */
			if (
				(reactions.length === 0 && hideDefaultReactions) ||
				reactions.length > 0 ||
				!quickReactionEmojis
			) {
				return reactions;
			}

			// add any missing default reactions
			const { ari, containerAri, emojiIds } = quickReactionEmojis;
			const items: ReactionSummary[] = emojiIds
				.filter((emojiId) => !reactions.some((reaction) => reaction.emojiId === emojiId))
				.map((emojiId) => {
					return {
						ari,
						containerAri,
						emojiId,
						count: 0,
						reacted: false,
					};
				});
			return reactions.concat(items);
		}, [quickReactionEmojis, reactions, hideDefaultReactions]);

		const shouldShowSummaryView =
			summaryViewEnabled &&
			memorizedReactions.length >= summaryViewThreshold &&
			reactions.length > 0;

		// criteria to show Reactions Dialog
		const hasEmojiWithFivePlusReactions = reactions.some((reaction) => reaction.count >= 5);

		const sortedReactions = useMemo(() => {
			return [...memorizedReactions].sort((a, b) => b?.count - a?.count);
		}, [memorizedReactions]);

		/**
		 * event handler to open dialog with selected reaction
		 * @param emojiId initial emoji id to load dialog with
		 */
		const handleOpenReactionsDialog = ({
			emojiId = sortedReactions[0].emojiId,
			source = 'endOfPageReactions',
		}: OpenReactionsDialogOptions = {}) => {
			// ufo start opening reaction dialog
			ufoExperiences.openDialog.start();
			getReactionDetails(emojiId);
			setSelectedEmojiId(emojiId);
			onDialogOpenCallback(emojiId, source);

			// ufo opening reaction dialog success
			ufoExperiences.openDialog.success({
				metadata: {
					emojiId,
					source: 'Reactions',
					reason: 'Opening Reactions Dialog successfully',
				},
			});
		};

		return (
			<UFOSegment name="reactions">
				<div
					css={[
						wrapperStyle,
						noWrap && noFlexWrapStyles,
						noRelativeContainer && noContainerPositionStyles,
					]}
					data-testid={RENDER_REACTIONS_TESTID}
				>
					{!onlyRenderPicker &&
						(shouldShowSummaryView ? (
							<div data-testid={RENDER_REACTIONS_SUMMARY_TESTID}>
								<ReactionSummaryView
									reactions={sortedReactions}
									emojiProvider={emojiProvider}
									flash={flash}
									particleEffectByEmoji={particleEffectByEmoji}
									onSelection={handleOnSelection}
									onReactionClick={handleSummaryViewReactionClick}
									onReactionFocused={handleReactionFocused}
									onReactionMouseEnter={handleReactionMouseEnter}
									placement={summaryViewPlacement}
									showOpaqueBackground={showOpaqueBackground}
									subtleReactionsSummaryAndPicker={subtleReactionsSummaryAndPicker}
									handleOpenReactionsDialog={() =>
										handleOpenReactionsDialog({ source: 'summaryView' })
									}
									allowUserDialog={allowUserDialog && hasEmojiWithFivePlusReactions}
									isViewOnly={isViewOnly}
									allowSelectFromSummaryView={allowSelectFromSummaryView}
									disabled={status !== ReactionStatus.ready}
									reactionPickerTriggerIcon={reactionPickerTriggerIcon}
									tooltipContent={getTooltip(
										status,
										errorMessage,
										reactionPickerTriggerTooltipContent,
									)}
									emojiPickerSize={emojiPickerSize}
									onOpen={handlePickerOpen}
									useButtonAlignmentStyling={useButtonAlignmentStyling}
									reactionPickerTriggerText={reactionPickerTriggerText}
									hoverableSummaryView={hoverableSummaryView}
									summaryGetOptimisticImageURL={summaryGetOptimisticImageURL}
									summaryButtonIconAfter={summaryButtonIconAfter}
									summaryViewParticleEffectEmojiId={
										renderParticleEffectOnSummaryView ? summaryViewParticleEffectEmojiId : null
									}
								/>
							</div>
						) : (
							memorizedReactions.map((reaction) => (
								<Reaction
									key={reaction.emojiId}
									reaction={reaction}
									emojiProvider={emojiProvider}
									onClick={onReactionClick}
									onMouseEnter={handleReactionMouseEnter}
									onFocused={handleReactionFocused}
									flash={flash[reaction.emojiId]}
									showParticleEffect={particleEffectByEmoji[reaction.emojiId]}
									showOpaqueBackground={showOpaqueBackground}
									allowUserDialog={allowUserDialog && hasEmojiWithFivePlusReactions}
									handleOpenReactionsDialog={handleOpenReactionsDialog}
									isViewOnly={isViewOnly}
									showSubtleStyle={showSubtleDefaultReactions && reactions.length === 0}
								/>
							))
						))}
					{/* Don't render the picker if:
					   1. Component is view only, thus disabling adding reactions
					   2. Summary view is being rendered and the picker is shown inside the summary view tray
					   via allowSelectFromSummaryView, preventing us needing to render it again outside the tray
					*/}
					{isViewOnly ||
					(!onlyRenderPicker && shouldShowSummaryView && allowSelectFromSummaryView) ? null : (
						<ReactionPicker
							css={reactionPickerStyle}
							emojiProvider={emojiProvider}
							allowAllEmojis={allowAllEmojis}
							pickerQuickReactionEmojiIds={pickerQuickReactionEmojiIds}
							disabled={status !== ReactionStatus.ready}
							onSelection={handleOnSelection}
							onOpen={handlePickerOpen}
							onCancel={handleOnCancel}
							onShowMore={handleOnMore}
							tooltipContent={
								hoverableSummaryView
									? null
									: getTooltip(status, errorMessage, reactionPickerTriggerTooltipContent)
							}
							emojiPickerSize={emojiPickerSize}
							miniMode={miniMode}
							showOpaqueBackground={showOpaqueBackground}
							showAddReactionText={showAddReactionText}
							subtleReactionsSummaryAndPicker={subtleReactionsSummaryAndPicker}
							reactionPickerTriggerIcon={reactionPickerTriggerIcon}
							reactionPickerTriggerText={reactionPickerTriggerText}
							isListItem={isListItem}
							hoverableReactionPicker={hoverableSummaryView}
							hoverableReactionPickerDelay={hoverableSummaryView ? 300 : 0}
							reactionPickerPlacement={reactionPickerPlacement}
						/>
					)}
					<ModalTransition>
						{!!selectedEmojiId && (
							<UFOSegment name="reactions-dialog">
								<ReactionsDialog
									selectedEmojiId={selectedEmojiId}
									reactions={sortedReactions}
									emojiProvider={emojiProvider}
									handleCloseReactionsDialog={handleCloseReactionsDialog}
									handleSelectReaction={handleSelectReactionInDialog}
									handlePaginationChange={handlePaginationChange}
									ProfileCardWrapper={ProfileCardWrapper}
								/>
							</UFOSegment>
						)}
					</ModalTransition>
				</div>
			</UFOSegment>
		);
	},
);
