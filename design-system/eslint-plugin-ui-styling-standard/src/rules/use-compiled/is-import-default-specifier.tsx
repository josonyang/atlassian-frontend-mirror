import type * as ESTree from 'eslint-codemod-utils';

export function isImportDefaultSpecifier(
	specifier: ESTree.Node,
): specifier is ESTree.ImportDefaultSpecifier {
	return specifier.type === 'ImportDefaultSpecifier';
}
