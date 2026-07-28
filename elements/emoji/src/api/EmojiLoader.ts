import { fg } from '@atlaskit/platform-feature-flags';

import type { EmojiResponse } from '../types';

import {
	denormaliseEmojiServiceResponse,
	type EmojiLoaderConfig,
	emojiRequest,
} from './EmojiUtils';

/**
 * Shared cache of in-flight/resolved emoji load promises, keyed by the request URL so that
 * multiple loaders created for the same provider config reuse a single request instead of
 * refetching. Only consulted when `cache_emoji_loader_for_the_same_config` is enabled.
 */
const emojiPromiseCache = new Map<string, Promise<EmojiResponse>>();

/**
 * Emoji providers should return JSON in the format defined by EmojiServiceResponse.
 */
export default class EmojiLoader {
	private config: EmojiLoaderConfig;

	constructor(config: EmojiLoaderConfig) {
		this.config = config;
	}

	/**
	 * Returns a promise with an array of Emoji from all providers.
	 */
	loadEmoji(): Promise<EmojiResponse> {
		if (fg('cache_emoji_loader_for_the_same_config')) {
			const cacheKey = this.config.url;
			const cachedPromise = emojiPromiseCache.get(cacheKey);
			if (cachedPromise) {
				return cachedPromise;
			}

			const emojiPromise = this.fetchEmoji();
			// Evict on failure so a rejected promise is not cached, allowing retries to refetch.
			emojiPromise.catch(() => {
				if (emojiPromiseCache.get(cacheKey) === emojiPromise) {
					emojiPromiseCache.delete(cacheKey);
				}
			});
			emojiPromiseCache.set(cacheKey, emojiPromise);
			return emojiPromise;
		}

		return this.fetchEmoji();
	}

	private fetchEmoji(): Promise<EmojiResponse> {
		return emojiRequest(this.config).then((emojiServiceResponse) =>
			denormaliseEmojiServiceResponse(emojiServiceResponse),
		);
	}
}
