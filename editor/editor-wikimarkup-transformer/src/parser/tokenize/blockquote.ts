import { rawContentProcessor } from './quote-macro';
import { type Token, type TokenParser } from './';

// bq. foobarbaz
// Ignored via go/ees005
// eslint-disable-next-line require-unicode-regexp
const BLOCKQUOTE_REGEXP = /^bq\.(.*)/;

export const blockquote: TokenParser = ({ input, position, schema, context }) => {
	const match = input.substring(position).match(BLOCKQUOTE_REGEXP);

	if (!match) {
		return fallback(input, position);
	}

	const [, rawContent] = match;
	return rawContentProcessor('', rawContent, match[0].length, schema, context);
};

function fallback(input: string, position: number): Token {
	return {
		type: 'text',
		text: input.substr(position, 1),
		length: 1,
	};
}
