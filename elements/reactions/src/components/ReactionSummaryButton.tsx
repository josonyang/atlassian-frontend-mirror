/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { forwardRef, useMemo } from 'react';
import { useIntl } from 'react-intl-next';
import { ResourcedEmoji } from '@atlaskit/emoji';
import { messages } from '../shared/i18n';
import { RESOURCED_EMOJI_COMPACT_HEIGHT } from '../shared/constants';
import { type ReactionSummary } from '../types';
import { Counter } from './Counter';
import { ReactionButton } from './ReactionButton';
import { type ReactionsProps } from './Reactions';
import { ReactionParticleEffect } from './ReactionParticleEffect';

import { Box, Flex, Inline, Stack } from '@atlaskit/primitives/compiled';
import { cssMap, jsx, cx } from '@compiled/react';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
	emoji: {
		transformOrigin: 'center center 0',
	},

	button: {
		paddingTop: token('space.050'),
		paddingRight: token('space.050'),
		paddingBottom: token('space.050'),
		paddingLeft: token('space.100'),
	},

	container: {
		position: 'relative',
	},

	summaryButtonIconAfter: {
		paddingRight: token('space.100'),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	emojiPlaceholderBackground: {
		backgroundColor: token('color.skeleton'),
	},

	particleEffectContainer: {
		paddingRight: token('space.300'),
	},
});

interface ReactionSummaryButtonProps
	extends Pick<ReactionsProps, 'emojiProvider' | 'reactions' | 'useButtonAlignmentStyling'> {
	/**
	 * event handler when the summary button is clicked to view all reactions
	 */
	onClick: () => void;

	/**
	 * The number of emojis to show in the summary button
	 */
	emojisToShow?: number;

	/**
	 * Optional prop for using an opaque button background instead of a transparent background
	 */
	showOpaqueBackground?: boolean;

	/**
	 * Optional prop for applying subtle styling to reaction summary button
	 */
	subtleReactionsSummaryAndPicker?: boolean;

	/**
	 * Optional event handler when mouse enters the button
	 */
	onMouseEnter?: () => void;

	/**
	 * Optional event handler when mouse leaves the button
	 */
	onMouseLeave?: () => void;

	/**
	 * Optional prop for the optimistic image URL
	 */
	summaryGetOptimisticImageURL?: (emojiId: string) => string;

	/**
	 * Optional prop to add an icon to the end of the summary button
	 */
	summaryButtonIconAfter?: React.ReactNode;

	/**
	 * Optional prop to set the most recently clicked emoji id
	 */
	summaryViewParticleEffectEmojiId?: { id: string; shortName: string } | null;
}

/**
 * Test id for summary reaction wrapper button
 */
export const RENDER_SUMMARY_BUTTON_TESTID = 'reaction-summary-button';

/**
 * Test id for emojis displayed inside summary button. All emoji's in the summary button will have this test id
 */
export const RENDER_SUMMARY_EMOJI_TESTID = 'summary-emoji-display';

// forwardRef is used here so that the parent popup component can properly interact with the button
export const ReactionSummaryButton = forwardRef(
	(
		{
			emojiProvider,
			reactions = [],
			emojisToShow = 3,
			onClick,
			showOpaqueBackground = false,
			subtleReactionsSummaryAndPicker = false,
			useButtonAlignmentStyling = false,
			onMouseEnter,
			onMouseLeave,
			summaryGetOptimisticImageURL,
			summaryButtonIconAfter,
			summaryViewParticleEffectEmojiId,
		}: ReactionSummaryButtonProps,
		ref: React.Ref<HTMLDivElement>,
	) => {
		const intl = useIntl();

		// Helper function to sort reactions by count and return top N
		const getTopReactions = (reactions: ReactionSummary[], topN: number): ReactionSummary[] => {
			return [...reactions].sort((a, b) => b.count - a.count).slice(0, topN);
		};

		const totalReactionsCount = useMemo(() => {
			return reactions.reduce((accum: number, current: ReactionSummary) => {
				return (accum += current?.count || 0);
			}, 0);
		}, [reactions]);

		const topReactions = useMemo(
			() => getTopReactions(reactions, emojisToShow),
			[emojisToShow, reactions],
		);

		return (
			<Flex xcss={styles.container} ref={ref} alignItems="center" justifyContent="center">
				<Stack alignInline="center">
					{summaryViewParticleEffectEmojiId && (
						<Box xcss={styles.particleEffectContainer}>
							<ReactionParticleEffect
								key={summaryViewParticleEffectEmojiId.id}
								emojiId={summaryViewParticleEffectEmojiId}
								emojiProvider={emojiProvider}
							/>
						</Box>
					)}
					<ReactionButton
						onClick={onClick}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						testId={RENDER_SUMMARY_BUTTON_TESTID}
						ariaLabel={intl.formatMessage(messages.summary)}
						showSubtleStyle={subtleReactionsSummaryAndPicker}
						showOpaqueBackground={showOpaqueBackground}
					>
						<Inline space="space.050" xcss={cx(styles.button)} testId="reaction-summary-wrapper">
							{topReactions.map((reaction) => (
								<Box
									xcss={styles.emoji}
									testId={RENDER_SUMMARY_EMOJI_TESTID}
									style={{
										// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop, @atlaskit/design-system/use-tokens-typography
										lineHeight: '12px',
									}}
								>
									<ResourcedEmoji
										key={reaction.emojiId}
										emojiProvider={emojiProvider}
										emojiId={{ id: reaction.emojiId, shortName: '' }}
										fitToHeight={RESOURCED_EMOJI_COMPACT_HEIGHT}
										optimisticImageURL={summaryGetOptimisticImageURL?.(reaction.emojiId)}
										placeholderXcss={styles.emojiPlaceholderBackground}
									/>
								</Box>
							))}
						</Inline>
						<Counter
							value={totalReactionsCount}
							useDarkerFont={useButtonAlignmentStyling}
							useUpdatedStyles={useButtonAlignmentStyling}
						/>
						{summaryButtonIconAfter && (
							<Box xcss={styles.summaryButtonIconAfter}>{summaryButtonIconAfter}</Box>
						)}
					</ReactionButton>
				</Stack>
			</Flex>
		);
	},
);
