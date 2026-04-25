import type { EditorAppearance } from '@atlaskit/editor-common/types';

export function isChromeless(appearance?: EditorAppearance): appearance is 'chromeless' {
	return appearance === 'chromeless';
}
