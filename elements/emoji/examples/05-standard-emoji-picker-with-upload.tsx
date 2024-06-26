import React, { useMemo, useState } from 'react';
import { EmojiPicker } from '../src/picker';
// These imports are not included in the manifest file to avoid circular package dependencies blocking our Typescript and bundling tooling
// eslint-disable-next-line import/no-extraneous-dependencies
import { getEmojiResource } from '@atlaskit/util-data-test/get-emoji-resource';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getEmojiResourceWithStandardAndAtlassianEmojis } from '@atlaskit/util-data-test/get-emoji-resource-standard-atlassian';
// eslint-disable-next-line import/no-extraneous-dependencies
import { loggedUser } from '@atlaskit/util-data-test/logged-user';
import { onSelection } from '../example-helpers';
import type { EmojiProvider } from '../src/resource';
import { IntlProvider } from 'react-intl-next';

const EmojiPickerWithUpload = () => {
	const [siteEmojiEnabled, setSiteEmojiEnabled] = useState(true);

	const emojiProvider = useMemo<Promise<EmojiProvider>>(() => {
		return siteEmojiEnabled
			? getEmojiResource({
					uploadSupported: true,
					currentUser: { id: loggedUser },
				})
			: getEmojiResourceWithStandardAndAtlassianEmojis({
					uploadSupported: true,
					currentUser: { id: loggedUser },
				});
	}, [siteEmojiEnabled]);

	return (
		<IntlProvider locale="en">
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
			<div style={{ padding: '10px' }}>
				<EmojiPicker emojiProvider={emojiProvider} onSelection={onSelection} />

				<button onClick={() => setSiteEmojiEnabled(true)}>EmojiProvider with Site emoji</button>
				<button onClick={() => setSiteEmojiEnabled(false)}>EmojiProvider without Site emoji</button>
			</div>
		</IntlProvider>
	);
};

export default EmojiPickerWithUpload;
