import type { EditorAppearance } from '@atlaskit/editor-common/types';

export function isFullPage(appearance?: EditorAppearance): appearance is "full-page" | "full-width" {
	return appearance === 'full-page' || appearance === 'full-width';
}
