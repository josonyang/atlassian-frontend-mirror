import type { Rule } from 'eslint';

import type { RuleConfig } from '../config';

export type MetaData = {
	context: Rule.RuleContext;
	config: RuleConfig;
};

export { updateTestIdAttributeFix } from './update-test-id-attribute-fix';
export { addColorInheritAttributeFix } from './add-color-inherit-attribute-fix';
export { allowedAttrs } from './allowed-attrs';
export { hasTextChildrenOnly } from './has-text-children-only';
