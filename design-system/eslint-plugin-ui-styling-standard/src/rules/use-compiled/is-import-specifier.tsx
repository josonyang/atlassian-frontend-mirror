import type * as ESTree from 'eslint-codemod-utils';

export function isImportSpecifier(specifier: ESTree.Node): specifier is ESTree.ImportSpecifier {
	return specifier.type === 'ImportSpecifier';
}
