import { isCss } from '@atlaskit/eslint-utils/is-supported-import';

import {
	createNoTaggedTemplateExpressionRule,
	noTaggedTemplateExpressionRuleSchema,
} from '../utils/create-no-tagged-template-expression-rule';
import { createLintRule } from '../utils/create-rule';

const rule = createLintRule({
	meta: {
		name: 'no-css-tagged-template-expression',
		fixable: 'code',
		type: 'problem',
		docs: {
			description:
				'Disallows any `css` tagged template expressions that originate from Emotion, Styled Components or Compiled',
			recommended: false,
			severity: 'error',
		},
		messages: {
			unexpectedTaggedTemplate: 'Unexpected `css` tagged template expression',
		},
		schema: noTaggedTemplateExpressionRuleSchema,
	},
	create: createNoTaggedTemplateExpressionRule(isCss, 'unexpectedTaggedTemplate'),
});

export default rule;
