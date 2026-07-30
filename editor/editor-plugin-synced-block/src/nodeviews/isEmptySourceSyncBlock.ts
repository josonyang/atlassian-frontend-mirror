import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';

/**
 * A source synced block counts as "empty" when it holds exactly one paragraph and that paragraph
 * has no content. This is the only state in which the source placeholder should be shown.
 *
 * Emptiness is deliberately derived from the ProseMirror node rather than the rendered DOM.
 * ProseMirror and other plugins inject non-content children into the paragraph element — the
 * selection marker's cursor widget (`.ProseMirror-widget`), ProseMirror's `.ProseMirror-separator`
 * hack node, and the `.ProseMirror-trailingBreak` — so DOM shape is not a reliable signal of
 * whether the user has typed anything. See EDITOR-8327.
 */
export const isEmptySourceSyncBlock = (node: PMNode): boolean => {
	if (node.childCount !== 1) {
		return false;
	}

	const firstChild = node.firstChild;

	return firstChild?.type.name === 'paragraph' && firstChild.content.size === 0;
};
