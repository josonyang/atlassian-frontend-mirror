import type { Rule } from 'eslint';
import { type JSXElement } from 'eslint-codemod-utils';

import * as ast from '../../../ast-nodes';

// Rename data-testid prop to testId if present
export function updateTestIdAttributeFix(
	node: JSXElement,
	fixer: Rule.RuleFixer,
): Rule.Fix | undefined {
	const testIdAttr = ast.JSXElement.getAttributeByName(node, 'data-testid');
	if (testIdAttr) {
		return ast.JSXAttribute.updateName(testIdAttr, 'testId', fixer);
	}
}
