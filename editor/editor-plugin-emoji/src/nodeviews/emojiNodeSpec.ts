import { emoji } from '@atlaskit/adf-schema';
import { convertToInlineCss } from '@atlaskit/editor-common/lazy-node-view';
import type { DOMOutputSpec, Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { token } from '@atlaskit/tokens';

const isSSR = Boolean(process.env.REACT_SSR);

/**
 * Wrapper for ADF emoji node spec to augment toDOM implementation
 * with fallback UI for lazy node view rendering / window virtualization
 * @nodeSpecException:toDOM patch
 * @returns
 */
export const emojiNodeSpec = () => {
	if (isSSR) {
		return emoji;
	}

	return {
		...emoji,
		toDOM: (node: PMNode): DOMOutputSpec => emojiToDom(node),
	};
};

export function emojiToDom(node: PMNode): DOMOutputSpec {
	// From packages/elements/emoji/src/components/common/EmojiPlaceholder.tsx
	const { shortName, id, text } = node.attrs;
	const attrs: Record<string, string> = {
		'data-emoji-short-name': shortName,
		'data-emoji-id': id,
		'data-emoji-text': text,
		contenteditable: 'false',
		style: convertToInlineCss({
			content: "''",
			fill: token('color.background.neutral'),
			minWidth: `20px`,
			width: `20px`,
			height: `20px`,
			position: 'relative',
			margin: '-1px 0',
			display: 'inline-block',
			background: token('color.background.neutral'),
			borderRadius: token('border.radius.100', '3px'),
			overflow: 'hidden',
			verticalAlign: 'middle',
			whiteSpace: 'nowrap',
			textAlign: 'center',
		}),
		'aria-busy': 'true',
		'aria-label': shortName,
		class: 'emoji-common-placeholder',
	};

	return ['span', attrs];
}
