import React, { useRef, useState } from 'react';
// These imports are not included in the manifest file to avoid circular package dependencies blocking our Typescript and bundling tooling
// eslint-disable-next-line import/no-extraneous-dependencies
import { getEmojis } from '@atlaskit/util-data-test/get-emojis';
import { onSelection } from '../example-helpers';
import EmojiTypeAheadList from '../src/components/typeahead/EmojiTypeAheadList';
import type { EmojiDescription } from '../src/types';
import { IntlProvider } from 'react-intl-next';

function randomEmojis(): EmojiDescription[] {
	return getEmojis()
		.filter(() => Math.random() < 0.02)
		.slice(0, 50);
}

export default function RefreshableEmojiList() {
	const [emojis, setEmojis] = useState<EmojiDescription[]>(randomEmojis());
	const emojiListRef = useRef<EmojiTypeAheadList | null>(null);

	const updateData = () => {
		setEmojis(randomEmojis());
	};

	const moveUp = () => {
		emojiListRef.current?.selectPrevious();
	};

	const moveDown = () => {
		emojiListRef.current?.selectNext();
	};

	const emojiList = (
		<IntlProvider locale="en">
			<EmojiTypeAheadList emojis={emojis} onEmojiSelected={onSelection} ref={emojiListRef} />
		</IntlProvider>
	);

	return (
		<div>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
			<div style={{ paddingBottom: '10px' }}>
				<button
					onClick={updateData}
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					style={{ height: '30px', marginRight: '10px' }}
				>
					Random refresh
				</button>
				<button
					onClick={moveUp}
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					style={{ height: '30px', marginRight: '10px' }}
				>
					Up
				</button>
				<button
					onClick={moveDown}
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					style={{ height: '30px', marginRight: '10px' }}
				>
					Down
				</button>
			</div>
			{emojiList}
		</div>
	);
}
