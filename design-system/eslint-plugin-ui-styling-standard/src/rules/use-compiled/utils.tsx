import type { Rule } from 'eslint';
import type * as ESTree from 'eslint-codemod-utils';

import { getSourceCode } from '@atlaskit/eslint-utils/context-compat';

export function getFirstImportFromSource(
	context: Rule.RuleContext,
	source: string,
): ESTree.ImportDeclaration | undefined {
	return getSourceCode(context)
		.ast.body.filter(isImportDeclaration)
		.find((node) => node.source.value === source);
}

function isImportDeclaration(node: ESTree.Node): node is ESTree.ImportDeclaration {
	return node.type === 'ImportDeclaration';
}

export { isImportSpecifier } from './is-import-specifier';
export { isImportDefaultSpecifier } from './is-import-default-specifier';
export { isImportNamespaceSpecifier } from './is-import-namespace-specifier';
