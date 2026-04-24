import type { Rule } from 'eslint';
import { type ImportDeclaration } from 'eslint-codemod-utils';

export const insertButtonItemImport: (
	fixer: Rule.RuleFixer,
	node: ImportDeclaration,
	uniqueButtonItemName: string,
) => Rule.Fix = (fixer: Rule.RuleFixer, node: ImportDeclaration, uniqueButtonItemName: string) => {
	const insertedImport =
		uniqueButtonItemName !== 'ButtonItem'
			? `, ButtonItem as ${uniqueButtonItemName}`
			: ', ButtonItem';

	return fixer.insertTextAfter(node.specifiers.slice(-1)[0], insertedImport);
};
