import type { Rule } from 'eslint';
import { isNodeOfType } from 'eslint-codemod-utils';

export const isChildOfType = (node: Rule.Node, type: Rule.Node['type']): boolean =>
	isNodeOfType(node.parent, type);
