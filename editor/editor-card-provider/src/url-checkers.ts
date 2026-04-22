/**
 * URL checker utilities for Confluence content types.
 *
 * Exported via the `@atlaskit/editor-card-provider/url-checkers` subpath
 * so consumers don't have to depend on the barrel file.
 */

/**
 * Matches Confluence Slides URLs.
 *
 * Examples:
 *   - /wiki/spaces/TEAM/slide/12345
 *   - /wiki/spaces/~uid/slide/8fb8c642-803d-59fe-8d1c-066610e860c6
 */
// eslint-disable-next-line require-unicode-regexp -- consistent with isConfluenceDatabase in provider.ts
const CONFLUENCE_SLIDE_URL_PATTERN = /\/wiki\/spaces\/~?[\d\w]+\/slide\/[\d\w-]+(\?.*)?$/;

/**
 * Returns `true` when the given URL points to a Confluence Slides page.
 */
export const isConfluenceSlideUrl = (url: string): boolean =>
	CONFLUENCE_SLIDE_URL_PATTERN.test(url);
