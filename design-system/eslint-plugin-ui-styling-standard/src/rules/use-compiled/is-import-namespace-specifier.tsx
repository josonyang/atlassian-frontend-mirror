import type * as ESTree from 'eslint-codemod-utils';

export function isImportNamespaceSpecifier(
	specifier: ESTree.Node,
): specifier is ESTree.ImportNamespaceSpecifier {
	return specifier.type === 'ImportNamespaceSpecifier';
}
