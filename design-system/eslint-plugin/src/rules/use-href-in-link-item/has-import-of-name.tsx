import { type ImportDeclaration } from 'eslint-codemod-utils';

export const hasImportOfName: (node: ImportDeclaration, name: string) => boolean = (
	node: ImportDeclaration,
	name: string,
): boolean => {
	return node.specifiers.some(
		// This should not be an `any`. This is an array of `ImportSpecifier |
		// ImportDefaultSpecifier`. For some reason, filtering this way still
		// results in an error of `specifier.imported` doesn't exist on
		// ImportDefaultSpecifier, which is exactly what I'm filtering for
		(specifier: any) => specifier?.imported?.name === name,
	);
};
