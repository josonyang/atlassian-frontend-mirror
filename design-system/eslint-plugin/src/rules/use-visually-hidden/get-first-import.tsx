import type { SourceCode } from 'eslint';

/**
 * Returns the first import in the esprima AST.
 */
export const getFirstImport: (
	source: SourceCode,
) => import('estree').ImportDeclaration | undefined = (source: SourceCode) => {
	return source.ast.body.find((node) => node.type === 'ImportDeclaration');
};
