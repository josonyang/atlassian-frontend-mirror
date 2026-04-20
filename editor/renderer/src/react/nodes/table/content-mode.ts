import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';

import type { RendererAppearance } from '../../../ui/Renderer/types';

type ContentModeOptions = {
	allowTableResizing?: boolean;
	isTableNested?: boolean;
	rendererAppearance?: RendererAppearance;
	tableNode: PMNode | undefined;
};

export const isContentModeSupported = ({
	allowTableResizing,
	rendererAppearance,
}: Pick<ContentModeOptions, 'allowTableResizing' | 'rendererAppearance'>): boolean => {
	return (
		!!allowTableResizing &&
		(rendererAppearance === 'full-page' ||
			rendererAppearance === 'full-width' ||
			rendererAppearance === 'max')
	);
};
