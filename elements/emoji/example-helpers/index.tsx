import type { OnLifecycle } from '../src/components/typeahead/EmojiTypeAheadComponent';
import debug, { enableLogger } from '../src/util/logger';
import type { OnEmojiEvent, OnToneSelected, EmojiUpload } from '../src/types';
import type { OnUploadEmoji } from '../src/components/common/EmojiUploadPicker';

enableLogger(true);

export const onOpen: OnLifecycle = () => debug('picker opened');

export const onClose: OnLifecycle = () => debug('picker closed');

export const onSelection: OnEmojiEvent = (emojiId, emoji) =>
	debug('emoji selected', emojiId, emoji);

export const onToneSelected: OnToneSelected = (variation: number) =>
	debug('tone selected', variation);

export const onUploadEmoji: OnUploadEmoji = (upload: EmojiUpload) =>
	debug('uploaded emoji', upload);

export const onUploadCancelled = () => debug('upload cancelled');

export const lorem = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,
  lorem eu vestibulum sollicitudin, erat nibh ornare purus, et sollicitudin lorem
  felis nec erat. Quisque quis ligula nisi. Cras nec dui vestibulum, pretium massa ut,
  egestas turpis. Quisque finibus eget justo a mollis. Mauris quis varius nisl. Donec
  aliquet enim vel eros suscipit porta. Vivamus quis molestie leo. In feugiat felis mi,
  ac varius odio accumsan ac. Pellentesque habitant morbi tristique senectus et netus et
  malesuada fames ac turpis egestas. Mauris elementum mauris ac leo porta venenatis.
  Integer hendrerit lacus vel faucibus sagittis. Mauris elit urna, tincidunt at aliquet
  sit amet, convallis placerat diam. Mauris id aliquet elit, non posuere nibh. Curabitur
  ullamcorper lectus mi, quis varius libero ultricies nec. Quisque tempus neque ligula,
  a semper massa dignissim nec.
`;
