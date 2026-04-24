import tokens from '@atlaskit/tokens/token-names';

export const generateTypeDefs: (typedTokens: string[], tokenNames?: string[]) => string = (
	typedTokens: string[],
	tokenNames?: string[],
) => {
	return typedTokens
		.map((t, i) => {
			return `'${Array.isArray(tokenNames) ? tokenNames[i] : t}': 'var(${tokens[t as keyof typeof tokens]})'`;
		})
		.join(';\n\t');
};
