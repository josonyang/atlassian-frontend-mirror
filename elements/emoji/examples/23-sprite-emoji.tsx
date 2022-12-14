import React from 'react';
import { getEmojiRepository } from '@atlaskit/util-data-test/get-emoji-repository';
import { Emoji } from '../src/element';
import { IntlProvider } from 'react-intl-next';
import { EmojiDescription } from '../src';

const emojiService = getEmojiRepository();

export const RenderSpriteEmojis = () => {
  const handshakeEmoji = emojiService.findByShortName(
    ':handshake:',
  ) as EmojiDescription;

  return <Emoji emoji={handshakeEmoji} showTooltip fitToHeight={24} />;
};

export default function Example() {
  return (
    <IntlProvider locale="en">
      <RenderSpriteEmojis />
    </IntlProvider>
  );
}
