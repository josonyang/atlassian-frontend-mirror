import type { Rule } from 'eslint';
import { type ImportDeclaration } from 'eslint-codemod-utils';

export const insertButtonItemDefaultImport: (
	fixer: Rule.RuleFixer,
	node: ImportDeclaration,
) => Rule.Fix = (fixer: Rule.RuleFixer, node: ImportDeclaration) =>
	fixer.insertTextBefore(node, `import ButtonItem from '@atlaskit/menu/button-item';\n`);
