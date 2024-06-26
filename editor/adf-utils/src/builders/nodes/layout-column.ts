import { type BlockContent, type LayoutColumnDefinition } from '@atlaskit/adf-schema';

export const layoutColumn =
	(attrs: { width: number }) =>
	(content: BlockContent[]): LayoutColumnDefinition => ({
		type: 'layoutColumn',
		attrs,
		content,
	});
