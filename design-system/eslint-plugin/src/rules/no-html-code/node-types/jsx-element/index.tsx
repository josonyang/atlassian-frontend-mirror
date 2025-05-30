import type { Rule } from 'eslint';
import { type ImportDeclaration, isNodeOfType } from 'eslint-codemod-utils';

import { getSourceCode } from '@atlaskit/eslint-utils/context-compat';

import * as ast from '../../../../ast-nodes';
import { isSupportedForLint } from '../supported';

interface MetaData {
	context: Rule.RuleContext;
}

function isImportDeclaration(node: any): node is ImportDeclaration {
	return node.type === 'ImportDeclaration';
}

export const JSXElement = {
	lint(node: Rule.Node, { context }: MetaData) {
		if (!isSupportedForLint(node)) {
			return;
		}

		const nodeName = ast.JSXElement.getName(node);
		const sourceCode = getSourceCode(context);
		const importDeclarations = sourceCode.ast.body.filter(isImportDeclaration);

		let existingCodeName: string | null = null;
		const usedNames = new Set();

		// Check for existing imports
		for (const declaration of importDeclarations) {
			for (const specifier of declaration.specifiers) {
				usedNames.add(specifier.local.name);
			}

			if (declaration.source.value === '@atlaskit/code') {
				declaration.specifiers
					.filter(
						(specifier) =>
							isNodeOfType(specifier, 'ImportSpecifier') &&
							isNodeOfType(specifier.parent!, 'ImportDeclaration'),
					)
					.forEach((specifier) => {
						if (isNodeOfType(specifier, 'ImportSpecifier') && specifier.imported.name === 'Code') {
							existingCodeName = specifier.local.name;
						}
					});
			}
		}

		const generateUniqueName = (baseName: string) => {
			let index = 1;
			let newName = baseName;
			while (usedNames.has(newName)) {
				newName = `${baseName}${index}`;
				index++;
			}
			return newName;
		};

		const codeName = existingCodeName || generateUniqueName('Code');

		context.report({
			node: node.openingElement,
			messageId: 'noHtmlCode',
			data: {
				name: nodeName,
			},
			suggest: [
				{
					desc: 'Replace with Code component from @atlaskit/code',
					fix(fixer) {
						const openingTagRange = node.openingElement.range;
						const closingTagRange = node.closingElement?.range;
						const attributesText = node.openingElement.attributes
							.map((attr) => sourceCode.getText(attr))
							.join(' ');

						const fixers = [];

						// Replace <code> with <Code> and retain attributes
						if (openingTagRange) {
							if (node.openingElement.selfClosing) {
								fixers.push(
									fixer.replaceTextRange(
										[openingTagRange[0] + 1, openingTagRange[1] - 1],
										`${codeName}${attributesText ? ` ${attributesText}` : ''} /`,
									),
								);
							} else {
								fixers.push(
									fixer.replaceTextRange(
										[openingTagRange[0] + 1, openingTagRange[1] - 1],
										`${codeName}${attributesText ? ` ${attributesText}` : ''}`,
									),
								);
							}
						}
						if (closingTagRange && !node.openingElement.selfClosing) {
							fixers.push(
								fixer.replaceTextRange([closingTagRange[0] + 2, closingTagRange[1] - 1], codeName),
							);
						}

						// Add import if not present
						if (!existingCodeName) {
							const importStatement = `import { ${codeName} } from '@atlaskit/code';\n`;
							fixers.push(fixer.insertTextBefore(sourceCode.ast, importStatement));
						}

						return fixers;
					},
				},
			],
		});
	},
};
