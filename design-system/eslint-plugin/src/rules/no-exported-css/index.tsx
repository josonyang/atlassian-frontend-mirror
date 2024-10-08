import type { Rule } from 'eslint';

import { isCss } from '@atlaskit/eslint-utils/is-supported-import';

import { createNoExportedRule } from '../utils/create-no-exported-rule/main';
import { createLintRule } from '../utils/create-rule';

const noExportedCssRule: Rule.RuleModule = createLintRule({
	meta: {
		name: 'no-exported-css',
		type: 'problem',
		docs: {
			description:
				'Forbid exporting `css` function calls. Exporting `css` function calls can result in unexpected behaviour at runtime, and is not statically analysable.',
			removeFromPresets: true, // effectively disable this rule here, this is overriden by `@atlaskit/ui-styling-standard` instead
		},
		messages: {
			unexpected:
				"`css` can't be exported - this will cause unexpected behaviour at runtime. Instead, please move your `css(...)` code to the same file where these styles are being used.",
		},
		schema: [
			{
				type: 'object',
				properties: {
					importSources: {
						type: 'array',
						items: [
							{
								type: 'string',
							},
						],
					},
				},
				additionalProperties: false,
			},
		],
	},
	create: createNoExportedRule(isCss, 'unexpected'),
});

export default noExportedCssRule;
