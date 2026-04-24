import type { Rule } from 'eslint';

import type { RuleConfig } from '../config';

export type MetaData = {
	context: Rule.RuleContext;
	config: RuleConfig;
};

export { updateTestIdAttributeFix } from './update-test-id-attribute-fix';
export { allowedAttrs } from './allowed-attrs';
