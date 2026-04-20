import type { MediaClientConfig } from '@atlaskit/media-core';
import type { MediaFeatureFlags, SSR } from '@atlaskit/media-common';
import type { MediaViewerExtensions } from '@atlaskit/media-viewer';

export type MediaSSR = { config: MediaClientConfig; mode: SSR };

export interface MediaOptions {
	allowCaptions?: boolean;
	allowLinking?: boolean;
	enableDownloadButton?: boolean;
	enableSyncMediaCard?: boolean;
	/**
	 * Optional fallback fetcher to retrieve the media filename from another service
	 * Workaround for #hot-301450 where media service is missing filenames for DC -> Cloud migrated media
	 * Receives the file ID and should resolve to the filename string.
	 */
	fallbackMediaNameFetcher?: (id: string) => Promise<string>;
	featureFlags?: MediaFeatureFlags;
	/** Extensions for the media viewer header (e.g. comment navigation button). */
	mediaViewerExtensions?: MediaViewerExtensions;
	ssr?: MediaSSR;
}
