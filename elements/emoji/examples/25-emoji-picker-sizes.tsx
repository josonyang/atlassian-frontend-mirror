import React from 'react';
import { EmojiProvider } from '../src/resource';
import { EmojiPicker } from '../src/picker';
import { IntlProvider } from 'react-intl-next';
import { getEmojiResource } from '@atlaskit/util-data-test/get-emoji-resource';

export default function Example() {
  const emojiProvider = getEmojiResource() as Promise<EmojiProvider>;
  return (
    <IntlProvider locale="en">
      <div>
        <h3>Emoji Picker with default size</h3>
        <EmojiPicker emojiProvider={emojiProvider} />
        <h3>Emoji Picker with small size</h3>
        <EmojiPicker emojiProvider={emojiProvider} size="small" />
        <h3>Emoji Picker with medium size</h3>
        <EmojiPicker emojiProvider={emojiProvider} size="medium" />
        <h3>Emoji Picker with large size</h3>
        <EmojiPicker emojiProvider={emojiProvider} size="large" />
      </div>
    </IntlProvider>
  );
}
