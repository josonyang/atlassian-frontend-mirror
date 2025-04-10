/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { Fragment } from 'react';
import { type EmojiId, type OnEmojiEvent } from '@atlaskit/emoji/types';
import { type EmojiProvider } from '@atlaskit/emoji/resource';
import Tooltip from '@atlaskit/tooltip';
import { DefaultReactions } from '../shared/constants';
import { EmojiButton } from './EmojiButton';
import { ShowMore } from './ShowMore';
import { keyframes } from '@compiled/react';
import { css, jsx, cssMap } from '@atlaskit/css';

import { Box, Inline } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
	container: {
		paddingTop: token('space.050'),
		paddingRight: token('space.050'),
		paddingBottom: token('space.050'),
		paddingLeft: token('space.050'),
	},

	separator: {
		borderLeftWidth: token('border.width'),
		borderLeftColor: token('color.border'),
		borderLeftStyle: 'solid',
		marginInlineStart: token('space.050'),
		marginInlineEnd: token('space.100'),
		height: '24px',
		display: 'inline-block',
	},
});

const revealAnimation = keyframes({
	'0%': {
		opacity: 1,
		transform: 'scale(0.5)',
	},
	'75%': {
		transform: 'scale(1.25)',
	},
	'100%': {
		opacity: 1,
		transform: 'scale(1)',
	},
});

const revealStyle = css({
	animation: `${revealAnimation} 150ms ease-in-out forwards`,
	opacity: 0,
});

/**
 * Test id for wrapper Selector div
 */
export const RENDER_SELECTOR_TESTID = 'render-selector';

export interface SelectorProps {
	/**
	 * Provider for loading emojis
	 */
	emojiProvider: Promise<EmojiProvider>;
	/**
	 * Event handler when an emoji gets selected
	 */
	onSelection: OnEmojiEvent;
	/**
	 * Enable/Disable selection of extra custom emoji beyond default list (defaults to false)
	 */
	showMore?: boolean;
	/**
	 * Optional event when extra custom emojis icon is selected
	 */
	onMoreClick?: React.MouseEventHandler<HTMLElement>;
	/**
	 * Optional emojis shown for user to select from when the reaction add button is clicked (defaults to pre-defined list of emojis {@link DefaultReactions})
	 */
	pickerQuickReactionEmojiIds?: EmojiId[];
}

type RevealProps = {
	children: React.ReactNode;
	testId?: string;
};

const Reveal = ({ children, testId }: RevealProps) => {
	return (
		<div data-testid={testId} css={revealStyle}>
			{children}
		</div>
	);
};

/**
 * Reactions picker panel part of the <ReactionPicker /> component
 */
export const Selector = ({
	emojiProvider,
	onMoreClick,
	onSelection,
	showMore,
	pickerQuickReactionEmojiIds = DefaultReactions,
}: SelectorProps) => {
	/**
	 * Render the default emoji icon
	 * @param emoji emoji item
	 * @param index location of the emoji in the array
	 */
	const renderEmoji = (emoji: EmojiId, index: number) => {
		return (
			<Reveal key={emoji.id ?? emoji.shortName} testId={RENDER_SELECTOR_TESTID}>
				<Tooltip content={emoji.shortName}>
					<EmojiButton emojiId={emoji} emojiProvider={emojiProvider} onClick={onSelection} />
				</Tooltip>
			</Reveal>
		);
	};

	return (
		<Inline alignBlock="center" xcss={styles.container}>
			{pickerQuickReactionEmojiIds ? pickerQuickReactionEmojiIds.map(renderEmoji) : null}
			{showMore ? (
				<Fragment>
					<Box xcss={styles.separator} />
					<Reveal>
						<ShowMore key="more" onClick={onMoreClick} />
					</Reveal>
				</Fragment>
			) : null}
		</Inline>
	);
};
