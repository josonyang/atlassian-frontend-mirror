import type { RendererAppearance } from '../../ui/Renderer/types';

export const isFullWidthAppearance = (appearance: RendererAppearance): appearance is 'full-width' =>
	appearance === 'full-width';

export const isMaxWidthAppearance = (appearance: RendererAppearance): appearance is 'max' =>
	appearance === 'max';

export const isFullPageAppearance = (appearance: RendererAppearance): appearance is 'full-page' =>
	appearance === 'full-page';

export const isCommentAppearance = (appearance: RendererAppearance): appearance is 'comment' =>
	appearance === 'comment';

export const isFullWidthOrFullPageAppearance = (
	appearance: RendererAppearance,
): appearance is 'full-width' | 'full-page' | 'max' =>
	isFullPageAppearance(appearance) ||
	isFullWidthAppearance(appearance) ||
	isMaxWidthAppearance(appearance);
