import { type Expression, type TaggedTemplateExpression } from 'eslint-codemod-utils';

export const isCssInJsTemplateNode = (node?: Expression | null): node is TaggedTemplateExpression =>
	node?.type === 'TaggedTemplateExpression' &&
	node.tag.type === 'MemberExpression' &&
	node.tag.object.type === 'Identifier' &&
	node.tag.object.name === 'styled';
