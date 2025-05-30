// Original source from Compiled https://github.com/atlassian-labs/compiled/blob/master/packages/eslint-plugin/src/utils/create-no-tagged-template-expression-rule/get-tagged-template-expression-offset.ts
import type { Rule } from 'eslint';

type Node = Rule.Node;

export const getTaggedTemplateExpressionOffset = (node: Node): number => {
	const { parent } = node;
	switch (parent.type || '') {
		case 'ExportDefaultDeclaration': {
			return parent.loc!.start.column;
		}

		case 'VariableDeclarator': {
			const maybeVariableDeclaration = parent.parent;
			if (maybeVariableDeclaration.type === 'VariableDeclaration') {
				const maybeExportNamedDeclaration = maybeVariableDeclaration.parent;
				if (maybeExportNamedDeclaration.type === 'ExportNamedDeclaration') {
					return maybeExportNamedDeclaration.loc!.start.column;
				} else {
					return maybeVariableDeclaration.loc!.start.column;
				}
			}
			break;
		}

		default:
			break;
	}

	return node.loc!.start.column;
};
