import { codeBlock } from '@atlaskit/adf-schema';
import { convertToInlineCss } from '@atlaskit/editor-common/lazy-node-view';
import { CodeBlockSharedCssClassName } from '@atlaskit/editor-common/styles';
import type { NodeSpec, DOMOutputSpec, Node } from '@atlaskit/editor-prosemirror/model';
import { token } from '@atlaskit/tokens';

const codeBlockClassNames = {
	container: CodeBlockSharedCssClassName.CODEBLOCK_CONTAINER,
	start: CodeBlockSharedCssClassName.CODEBLOCK_START,
	end: CodeBlockSharedCssClassName.CODEBLOCK_END,
	contentWrapper: CodeBlockSharedCssClassName.CODEBLOCK_CONTENT_WRAPPER,
	content: CodeBlockSharedCssClassName.CODEBLOCK_CONTENT,
};

const MATCH_NEWLINES = new RegExp('\n', 'gu');

// Based on: `packages/editor/editor-plugin-code-block/src/nodeviews/code-block.ts`
const toDOM = (node: Node, formattedAriaLabel: string): DOMOutputSpec => {
	let totalLineCount = 1;

	node.forEach((node) => {
		const text = node.text;
		if (text) {
			totalLineCount += (node.text.match(MATCH_NEWLINES) || []).length;
		}
	});

	const maxDigits = totalLineCount.toString().length;

	const content = node.textContent
		.split('\n')
		.map((_, i) => i + 1)
		.join('\n');

	return [
		'pre',
		{
			class: codeBlockClassNames.container,
			style: `--lineNumberGutterWidth:${maxDigits}ch;`,
			'data-language': node.attrs.language || '',
		},
		['div', { class: codeBlockClassNames.start, contenteditable: 'false' }],
		[
			'div',
			{
				class: codeBlockClassNames.contentWrapper,
			},
			[
				'div',
				{
					// Based on packages/editor/editor-common/src/styles/shared/code-block.ts
					// But we can't reuse that class as it adds a ::before that intefers with this approach
					style: convertToInlineCss({
						backgroundColor: token('color.background.neutral'),
						position: 'relative',
						width: 'var(--lineNumberGutterWidth, 2rem)',
						padding: token('space.100'),
						flexShrink: 0,
						fontSize: '0.875rem',
						boxSizing: 'content-box',
					}),
					contenteditable: 'false',
				},
				[
					'div',
					{
						class: 'code-block-gutter-pseudo-element',
						style: convertToInlineCss({
							textAlign: 'right',
							color: token('color.text.subtlest'),
							fontFamily: token('font.family.code'),
							whiteSpace: 'pre-wrap',
						}),
						'data-label': content,
					},
				],
			],
			[
				'div',
				{
					class: codeBlockClassNames.content,
				},
				[
					'code',
					{
						'data-language': node.attrs.language || '',
						spellcheck: 'false',
						'data-testid': 'code-block--code',
						'aria-label': formattedAriaLabel,
					},
					0,
				],
			],
		],
		['div', { class: codeBlockClassNames.end, contenteditable: 'false' }],
	];
};

export const codeBlockNodeWithFixedToDOM = (): NodeSpec => {
	return {
		...codeBlock,
		toDOM: (node) => toDOM(node, ''),
	};
};
