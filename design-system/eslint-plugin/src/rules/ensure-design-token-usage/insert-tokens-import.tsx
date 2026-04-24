import type { Rule } from 'eslint';
import { insertAtStartOfFile, insertImportDeclaration } from 'eslint-codemod-utils';

export function insertTokensImport(fixer: Rule.RuleFixer): Rule.Fix {
	return insertAtStartOfFile(fixer, `${insertImportDeclaration('@atlaskit/tokens', ['token'])}\n`);
}
