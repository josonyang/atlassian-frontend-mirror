import type { Rule } from 'eslint';

import { getCreateLintRule, type LintRule } from '@atlaskit/eslint-utils/create-rule';

import { getRuleUrl } from './get-rule-url';
export const createLintRule: (rule: LintRule) => Rule.RuleModule = getCreateLintRule(getRuleUrl);

export { getRuleUrl } from './get-rule-url';
