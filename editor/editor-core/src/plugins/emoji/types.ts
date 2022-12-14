import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
  EmojiProvider,
  EmojiDescription,
  EmojiResourceConfig,
} from '@atlaskit/emoji';

export interface EmojiPluginOptions {
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
  headless?: boolean;
}

export type EmojiPluginState = {
  emojiProvider?: EmojiProvider;
  emojiResourceConfig?: EmojiResourceConfig;
  asciiMap?: Map<string, EmojiDescription>;
};
