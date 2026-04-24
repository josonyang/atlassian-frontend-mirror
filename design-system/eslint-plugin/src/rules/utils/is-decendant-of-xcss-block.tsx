import type { Rule, Scope } from 'eslint';

import { isXcss } from '@atlaskit/eslint-utils/is-supported-import';

export const isDecendantOfXcssBlock = (
	node: Rule.Node,
	referencesInScope: Scope.Reference[],
	importSources: string[],
): boolean => {
	// xcss contains types for all properties that accept tokens, so ignore xcss for linting as it will report false positives
	if (node.type === 'CallExpression' && isXcss(node.callee, referencesInScope, importSources)) {
		return true;
	}

	if (node.parent) {
		return isDecendantOfXcssBlock(node.parent, referencesInScope, importSources);
	}

	return false;
};
