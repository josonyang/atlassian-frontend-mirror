import path from 'path';

import { token } from '@atlaskit/tokens';

import testRule from '../../../../__tests__/utils/_test-rule';
import { messages, ruleName } from '../../index';

const plugin = path.resolve(__dirname, '../../../../index.tsx');

testRule({
	plugins: [plugin],
	ruleName,
	config: { color: false, spacing: false, typography: false },
	accept: [
		{
			code: 'color: red; margin: 10px;',
			description: 'should not do any checks when isEnabled contains only false values',
		},
	],
});

testRule({
	plugins: [plugin],
	ruleName,
	config: { color: true, spacing: true, typography: true },
	reject: [
		{
			code: 'margin: 10px; background-color: #FFFFFF; font-size: 12px;',
			description: 'reports for all relevant rule violations when multiple are enabled',
			warnings: [
				{ message: messages.noHardcodedSpacing },
				{ message: messages.noHardcodedColors },
				{ message: messages.noHardcodedTypography },
			],
		},
	],
});

testRule({
	plugins: [plugin],
	ruleName,
	config: { color: true },
	accept: [
		{
			code: 'color: var(--ds-text, #000);',
			description: 'should allow hex colors as fallbacks',
		},
		{
			code: 'color: var(--ds-text, rgb(0, 0, 0));',
			description: 'should allow rgb colors as fallbacks',
		},
		{
			code: 'color: var(--ds-text, rgba(0, 0, 0, 0));',
			description: 'should allow rgba colors as fallbacks',
		},
		{
			code: 'color: var(--ds-text, rgb(--blahblah));',
			description: 'should accept rgba containing a variable as a fallback',
		},
		{
			code: 'border: 1px solid var(--ds-border-brand, blue);',
			description: 'should accept tokens in multi-part properties',
		},
		{
			code: 'border: 1px solid var(--ds-border-brand, blue);',
			description: 'should accept tokens in multi-part properties',
		},
		{
			code: 'background: linear-gradient(var(--ds-skeleton), var(--ds-skeleton-subtle));',
			description: 'should accept tokens in linear-gradient',
		},
		{
			code: 'color: var(--adg3-color-R75);',
			description: 'should allow non-token css variables',
		},
		{
			code: 'background: linear-gradient(var(--color-a), var(--color-b));',
			description: 'should allow non-token variables inside functions',
		},
	],
	reject: [
		{
			code: 'color: #000;',
			description: 'should not allow hex colors on their own',
			message: messages.noHardcodedColors,
		},
		{
			code: 'color: rgb(0, 0, 0);',
			description: 'should not allow rgb colors on their own',
			message: messages.noHardcodedColors,
		},
		{
			code: 'color: hsl(0, 0%, 60%);',
			description: 'should not allow hsl colors on their own',
			message: messages.noHardcodedColors,
		},
		{
			code: 'background: linear-gradient(#e66465, #9198e5);',
			description: 'should not allow raw colors inside functions',
			warnings: [{ message: messages.noHardcodedColors }, { message: messages.noHardcodedColors }],
		},
		{
			code: 'background: linear-gradient(var(--color-a), #9198e5);',
			description: 'should not allow raw colors inside functions',
			message: messages.noHardcodedColors,
		},
		{
			code: 'background: linear-gradient(#e66465, var(--color-b));',
			description: 'should not allow raw colors inside functions',
			message: messages.noHardcodedColors,
		},
		{
			code: 'color: rgb(var(--blahblah));',
			description: 'should reject rgb containing a variable, when on its own',
			message: messages.noHardcodedColors,
		},
		{
			code: 'color: rgba(var(--blahblah), 0.8);',
			description: 'should reject rgba containing a variable, when on its own',
			message: messages.noHardcodedColors,
		},
		{
			code: 'color: red;',
			description: 'should reject named colors',
			message: messages.noHardcodedColors,
		},
		{
			code: 'border: 1px solid blue;',
			description: 'should reject named multi-part properties',
			message: messages.noHardcodedColors,
		},
	],
});

testRule({
	plugins: [plugin],
	ruleName,
	config: { color: true, spacing: true, typography: true },
	accept: [
		{
			code: 'white-space: no-wrap;',
			description: 'should allow property white-space"',
		},
	],
});

testRule({
	plugins: [plugin],
	ruleName,
	config: { color: true, nonTokenCssVariables: true },
	accept: [
		{
			code: 'color: var(--ds-text, #000);',
			description: 'should allow hex colors as fallbacks',
		},
		{
			code: 'color: var(--ds-text, rgb(0, 0, 0));',
			description: 'should allow rgb colors as fallbacks',
		},
		{
			code: 'color: var(--ds-text, rgba(0, 0, 0, 0));',
			description: 'should allow rgba colors as fallbacks',
		},
		{
			code: 'color: var(--ds-text, rgb(--blahblah));',
			description: 'should accept rgba containing a variable as a fallback',
		},
		{
			code: 'border: 1px solid var(--ds-border-brand, blue);',
			description: 'should accept tokens in multi-part properties',
		},
		{
			code: 'border: 1px solid var(--ds-border-brand, blue);',
			description: 'should accept tokens in multi-part properties',
		},
		{
			code: 'background: linear-gradient(var(--ds-skeleton), var(--ds-skeleton-subtle));',
			description: 'should accept tokens in linear-gradient',
		},
	],
	reject: [
		{
			code: 'background: linear-gradient(var(--color-a), var(--color-b));',
			description: 'should not allow vars inside functions',
			warnings: [{ message: messages.noNonTokenVars }, { message: messages.noNonTokenVars }],
		},
		{
			code: 'color: #000;',
			description: 'should not allow hex colors on their own',
			message: messages.noHardcodedColors,
		},
		{
			code: 'color: rgb(0, 0, 0);',
			description: 'should not allow rgb colors on their own',
			message: messages.noHardcodedColors,
		},
		{
			code: 'color: hsl(0, 0%, 60%);',
			description: 'should not allow hsl colors on their own',
			message: messages.noHardcodedColors,
		},
		{
			code: 'background: linear-gradient(#e66465, #9198e5);',
			description: 'should not allow raw colors inside functions',
			warnings: [{ message: messages.noHardcodedColors }, { message: messages.noHardcodedColors }],
		},
		{
			code: 'background: linear-gradient(var(--color-a), #9198e5);',
			description: 'should not allow raw colors inside functions',
			warnings: [{ message: messages.noNonTokenVars }, { message: messages.noHardcodedColors }],
		},
		{
			code: 'background: linear-gradient(#e66465, var(--color-b));',
			description: 'should not allow raw colors inside functions',
			warnings: [{ message: messages.noHardcodedColors }, { message: messages.noNonTokenVars }],
		},
		{
			code: 'color: var(--adg3-color-R75);',
			description: 'should reject non-token css variables',
			message: messages.noNonTokenVars,
		},
		{
			code: 'color: rgb(var(--blahblah));',
			description: 'should reject rgb containing a variable, when on its own',
			message: messages.noHardcodedColors,
		},
		{
			code: 'color: rgba(var(--blahblah), 0.8);',
			description: 'should reject rgba containing a variable, when on its own',
			message: messages.noHardcodedColors,
		},
		{
			code: 'color: red;',
			description: 'should reject named colors',
			message: messages.noHardcodedColors,
		},
		{
			code: 'border: 1px solid blue;',
			description: 'should reject named multi-part properties',
			message: messages.noHardcodedColors,
		},
	],
});

testRule({
	plugins: [plugin],
	ruleName,
	config: { spacing: true },
	accept: [
		{
			code: 'gap: var(--ds-space-300);',
			description: 'should accept spacing token values',
		},
		{
			code: `gap: ${token('space.025')};`,
			description: 'should accept spacing token values via calls to token()',
		},
		{
			code: 'z-index: 1;',
			description: 'should accept length values for non-spacing css rules',
		},
		{
			code: 'display: var(--display-type);',
			description: 'should accept css variables for non spacing related rules',
		},
		{
			code: 'margin: var(--ds-space-0) var(--ds-space-100);',
			description: 'should accept compound spacing values with tokens',
		},
	],
	reject: [
		{
			code: 'gap: var(--ds-space-123);',
			description: 'should reject invalid CSS variables in spacing rules',
			warnings: [{ message: messages.noHardcodedSpacing }],
		},
		{
			code: 'margin: 0;',
			description: 'should reject 0 values for spacing rules',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'margin: 1.5;',
			description: 'should reject floating point <length> values without units',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'gap: 12%;',
			description: 'should reject <percentage> values',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'gap: 20px 10cm;',
			description: 'should reject multi-part <length> values',
			warnings: [
				{ message: messages.noHardcodedSpacing },
				{ message: messages.noHardcodedSpacing },
			],
		},
		{
			code: 'margin: 20pt 10mm 50vh 27.6vw;',
			description: 'should reject multi-part <length> values',
			warnings: [
				{ message: messages.noHardcodedSpacing },
				{ message: messages.noHardcodedSpacing },
				{ message: messages.noHardcodedSpacing },
				{ message: messages.noHardcodedSpacing },
			],
		},
		{
			code: 'padding: 20svw 1dvh var(--ds-space-300) 17Q;',
			description: 'should only reject multi-part <length> values',
			warnings: [
				{ message: messages.noHardcodedSpacing },
				{ message: messages.noHardcodedSpacing },
				{ message: messages.noHardcodedSpacing },
			],
		},
		{
			code: 'margin: 15px;',
			description: 'should reject single pixel values',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'gap: 1.2rem;',
			description: 'should reject single rem values',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'padding: 100vh;',
			description: 'should reject viewport units',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'margin: var(--ds-space-0) 7px var(--ds-space-100) 1.2rem;',
			description: 'should reject compound spacing values with mixed tokens and hardcoded values',
			warnings: [
				{ message: messages.noHardcodedSpacing },
				{ message: messages.noHardcodedSpacing },
			],
		},
		// TODO: Handle these when we decide on correct behaviour
		// {
		//   code: 'gap: revert-layer;',
		//   description: 'How should we handle global CSS values?',
		// },
	],
});

testRule({
	plugins: [plugin],
	ruleName,
	config: { typography: true },
	accept: [
		{
			code: 'font-size: var(--ds-font-body, normal 400 0.875rem/1.25rem ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, system-ui, "Helvetica Neue", sans-serif);',
			description: 'should accept typography token values with full values as fallbacks',
		},
		{
			code: 'font-weight: var(--ds-font-weight-regular, 400);',
			description: 'should accept typography token values with number values as fallbacks',
		},
		{
			code: `font: ${token('font.body')};`,
			description: 'should accept spacing token values via calls to token()',
		},
		{
			code: 'z-index: 1;',
			description: 'should accept length values for non-spacing css rules',
		},
		{
			code: 'display: var(--display-type);',
			description: 'should accept css variables for non spacing related rules',
		},
	],
	reject: [
		{
			code: 'font-size: var(--ds-font-123);',
			description: 'should reject invalid CSS variables in typography rules',
			warnings: [{ message: messages.noHardcodedTypography }],
		},
		{
			code: 'font-weight: 400;',
			description: 'should reject non-token values in typography rules',
			warnings: [{ message: messages.noHardcodedTypography }],
		},
		{
			code: 'font-size: 10;',
			description: 'should reject non-token values in typography rules',
			warnings: [{ message: messages.noHardcodedTypography }],
		},
	],
});

testRule({
	plugins: [plugin],
	ruleName,
	config: { spacing: true },
	fix: true,
	accept: [
		{
			code: 'gap: var(--ds-space-300);',
			description: 'should accept spacing token values',
		},
		{
			code: `gap: ${token('space.025')};`,
			description: 'should accept spacing token values via calls to token()',
		},
		{
			code: 'z-index: 1;',
			description: 'should accept length values for non-spacing css rules',
		},
	],
	reject: [
		{
			code: 'margin: 8px;',
			fixed: 'margin: var(--ds-space-100, 8px);',
			description: 'should autofix pixel values to design tokens',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'padding: 2px;',
			fixed: 'padding: var(--ds-space-025, 2px);',
			description: 'should autofix small pixel values to design tokens',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'gap: 12px;',
			fixed: 'gap: var(--ds-space-150, 12px);',
			description: 'should autofix 12px to space.150',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'margin: 0.5rem;',
			fixed: 'margin: var(--ds-space-100, 0.5rem);',
			description: 'should autofix rem values to design tokens',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'padding: 0.125rem;',
			fixed: 'padding: var(--ds-space-025, 0.125rem);',
			description: 'should autofix small rem values to design tokens',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'gap: 0;',
			fixed: 'gap: var(--ds-space-0, 0);',
			description: 'should autofix unitless zero to space.0',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'margin: -8px;',
			fixed: 'margin: var(--ds-space-negative-100, -8px);',
			description: 'should autofix negative pixel values to negative design tokens',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'padding: -0.5rem;',
			fixed: 'padding: var(--ds-space-negative-100, -0.5rem);',
			description: 'should autofix negative rem values to negative design tokens',
			message: messages.noHardcodedSpacing,
		},
		{
			code: 'margin: 8px 12px;',
			fixed: 'margin: var(--ds-space-100, 8px) var(--ds-space-150, 12px);',
			description: 'should autofix multiple spacing values in shorthand properties',
			warnings: [
				{ message: messages.noHardcodedSpacing },
				{ message: messages.noHardcodedSpacing },
			],
		},
	],
});
