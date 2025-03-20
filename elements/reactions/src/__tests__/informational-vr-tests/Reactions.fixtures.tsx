import React, { useMemo } from 'react';

import { Reactions, ReactionStatus } from '../../../src/';
import { currentUser, getEmojiProvider } from '@atlaskit/util-data-test/get-emoji-provider';
import { getFallbackEmojis, getMockEmojis } from '@atlaskit/editor-test-helpers/mock-emojis';
import { ReactionSummary } from '../../types';
import { Constants as ExampleConstants } from '../../../examples/utils';
import { IntlProvider } from 'react-intl-next';
import { EmojiProvider } from '@atlaskit/emoji';

const containerAri = `${ExampleConstants.ContainerAriPrefix}1`;
const ari = `${ExampleConstants.AriPrefix}1`;

const useProvider = (useFallback: boolean = false) => {
	return useMemo<Promise<EmojiProvider>>(() => {
		return getEmojiProvider(
			{
				currentUser,
			},
			useFallback ? getFallbackEmojis : getMockEmojis,
		);
	}, [useFallback]);
};
const loadReaction = () => {};
const onSelection = () => {};
const onReactionClick = () => {};

const loadedReactions: ReactionSummary[] = [
	{
		containerAri,
		ari,
		count: 1,
		emojiId: '1f600',
		users: [{ id: currentUser.id, displayName: 'Black Panther' }],
		reacted: true,
	},
	{
		containerAri,
		ari,
		count: 10,
		emojiId: 'atlassian-blue_star',
		users: [
			{
				id: 'spiderman',
				displayName: 'Spiderman',
			},
			{
				id: 'ironman',
				displayName: 'Ironman',
			},
			{
				id: 'captainamerica',
				displayName: 'Captain America',
			},
			{
				id: 'hulk',
				displayName: 'Hulk',
			},
			{
				id: 'thor',
				displayName: 'Thor',
			},
			{
				id: 'blackwidow',
				displayName: 'Black Widow',
			},
			{
				id: 'hawkeye',
				displayName: 'Hawkeye',
			},
			{
				id: 'scarletwitch',
				displayName: 'Scarlet Witch',
			},
			{
				id: 'vision',
				displayName: 'Vision',
			},
			{
				id: 'falcon',
				displayName: 'Falcon',
			},
		],
		reacted: false,
	},
	{
		containerAri,
		ari,
		count: 1,
		emojiId: 'wtf',
		users: [
			{
				id: 'falcon',
				displayName: 'Falcon',
			},
		],
		reacted: false,
	},
];

export const LoadedReactions = () => {
	const emojiProvider = useProvider(false);

	return (
		<IntlProvider locale="en">
			<Reactions
				emojiProvider={emojiProvider}
				reactions={loadedReactions}
				status={ReactionStatus.ready}
				loadReaction={loadReaction}
				onSelection={onSelection}
				onReactionClick={onReactionClick}
				allowAllEmojis
			/>
		</IntlProvider>
	);
};

export const LoadedReactionsWithSummaryView = () => {
	const emojiProvider = useProvider(false);

	return (
		<IntlProvider locale="en">
			<Reactions
				emojiProvider={emojiProvider}
				reactions={loadedReactions}
				status={ReactionStatus.ready}
				loadReaction={loadReaction}
				onSelection={onSelection}
				onReactionClick={onReactionClick}
				allowAllEmojis
				summaryViewEnabled
			/>
		</IntlProvider>
	);
};

export const LoadedReactionsWithSummaryViewAndViewOnly = () => {
	const emojiProvider = useProvider(false);

	return (
		<IntlProvider locale="en">
			<Reactions
				emojiProvider={emojiProvider}
				reactions={loadedReactions}
				status={ReactionStatus.ready}
				loadReaction={loadReaction}
				onSelection={onSelection}
				onReactionClick={onReactionClick}
				allowAllEmojis
				summaryViewEnabled
				isViewOnly
			/>
		</IntlProvider>
	);
};
