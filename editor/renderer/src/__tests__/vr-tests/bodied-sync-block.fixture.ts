import { generateRendererComponent } from '../__helpers/rendererComponents';
import { layoutAndMediaAdf } from './__fixtures__/layout-and-media-adf';
import { annotationInlineCommentProvider } from '../__helpers/rendererWithAnnotations';
import type { ComponentType } from 'react';

export const BodiedSyncBlockWithLayoutAndMediaRenderer: ComponentType<any> =
	generateRendererComponent({
		document: layoutAndMediaAdf,
		appearance: 'full-page',
		allowAnnotations: true,
		annotationProvider: { inlineComment: annotationInlineCommentProvider },
	});
