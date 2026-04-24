import type { Rule } from 'eslint';

export const isDecendantOfType = (
	node: Rule.Node,
	type: Rule.Node['type'],
	skipNode = true,
): boolean => {
	if (!skipNode && node.type === type) {
		return true;
	}

	if (node.parent) {
		return isDecendantOfType(node.parent, type, false);
	}

	return false;
};
