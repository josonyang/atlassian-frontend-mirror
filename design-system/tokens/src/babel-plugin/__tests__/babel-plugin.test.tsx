import { type TransformOptions, transformSync } from '@babel/core';

import babelPlugin from '../plugin';

// Mock tokens exports to keep values stable
jest.mock('../../artifacts/token-names', () => {
	return {
		__esModule: true,
		default: {
			'test-token': '--test-token',
			'test-token-escape': '--test-token \\u{54} ${ ` \' " \u{54}',
			'test-token-shadow': '--test-token-shadow',
			'test-token-shadow-no-opacity': '--test-token-shadow-no-opacity',
			'space.075': '--ds-space-075',
			'space.100': '--ds-space-100',
			'border.radius.050': '--ds-border-radius-050',
			'font.heading.xlarge': '--ds-font-heading-xlarge',
		},
	};
});

jest.mock('../../artifacts/tokens-raw/atlassian-light', () => ({
	__esModule: true,
	default: [
		{ value: '#ffffff', cleanName: 'test-token' },
		{ value: '#000000', cleanName: 'test-token-escape' },
		{
			value: [
				{
					radius: 8,
					offset: { x: 0, y: 0 },
					color: '#091e423f',
					opacity: 0.16,
				},
				{
					radius: 1,
					offset: { x: 0, y: 0 },
					color: '#091e424f',
					opacity: 0.12,
				},
			],
			cleanName: 'test-token-shadow',
		},
		{
			value: [
				{
					radius: 8,
					offset: { x: 0, y: 0 },
					color: '#091e42',
					opacity: 0.25,
				},
				{
					radius: 1,
					offset: { x: 0, y: 0 },
					color: '#091e42',
					opacity: 0.31,
				},
			],
			cleanName: 'test-token-shadow-no-opacity',
		},
	],
}));

jest.mock('../../artifacts/tokens-raw/atlassian-legacy-light', () => ({
	__esModule: true,
	default: [
		{ value: '#cccccc', cleanName: 'test-token' },
		{ value: '#111111', cleanName: 'test-token-escape' },
	],
}));

jest.mock('../../artifacts/tokens-raw/atlassian-spacing', () => ({
	__esModule: true,
	default: [
		{ value: '6px', cleanName: 'space.075' },
		{ value: '8px', cleanName: 'space.100' },
	],
}));

jest.mock('../../artifacts/tokens-raw/atlassian-shape', () => ({
	__esModule: true,
	default: [{ value: '2px', cleanName: 'border.radius.050' }],
}));

jest.mock('../../artifacts/tokens-raw/atlassian-typography-adg3', () => ({
	__esModule: true,
	default: [
		{
			value:
				'"normal 500 35px/40px ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, system-ui, "Helvetica Neue", sans-serif"',
			cleanName: 'font.heading.xlarge',
		},
	],
}));

const transform =
	(
		shouldUseAutoFallback = false,
		transformTemplateLiterals = false,
		options: TransformOptions = {},
		defaultTheme = 'light',
	) =>
	(code: TemplateStringsArray | string): string => {
		const plugins: any = [
			[
				babelPlugin,
				{
					shouldUseAutoFallback: shouldUseAutoFallback,
					defaultTheme: defaultTheme,
				},
			],
		];
		if (transformTemplateLiterals) {
			plugins.push('@babel/plugin-transform-template-literals');
		}

		const result = transformSync(typeof code === 'string' ? code : code[0], {
			configFile: false,
			babelrc: false,
			plugins: plugins,
			filename: 'foo.tsx',
			...options,
		});

		if (!result?.code) {
			throw new Error();
		}

		return result.code;
	};

describe('Tokens Babel Plugin', () => {
	it('converts 1-argument usage correctly when shouldUseAutoFallback set to false', () => {
		const actual = transform()`
      import { token } from '@atlaskit/tokens';
      token('test-token');
    `;

		expect(actual).toMatchInlineSnapshot('"\\"var(--test-token)\\";"');
	});

	it('converts 1-argument usage correctly when shouldUseAutoFallback set to true', () => {
		const actual = transform(true)`
        import { token } from '@atlaskit/tokens';
        token('test-token');
      `;

		expect(actual).toMatchInlineSnapshot('"\\"var(--test-token, #ffffff)\\";"');
	});

	it('converts 1-argument usage correctly when shouldUseAutoFallback set to true AND fallback is legacy-light', () => {
		const actual = transform(true, false, {}, 'legacy-light')`
        import { token } from '@atlaskit/tokens';
        token('test-token');
      `;

		expect(actual).toMatchInlineSnapshot('"\\"var(--test-token, #cccccc)\\";"');
	});

	it('converts StringLiteral second argument', () => {
		const actual = transform()`
        import { token } from '@atlaskit/tokens';
        token('test-token', 'blue');
      `;

		expect(actual).toMatchInlineSnapshot('"\\"var(--test-token, blue)\\";"');
	});

	it('removes empty StringLiteral second argument', () => {
		const noAutoFallback = transform()`
        import { token } from '@atlaskit/tokens';
        token('test-token', '');
      `;

		// No fallback inserted if user passes in an empty string
		const autoFallback = transform(true)`
        import { token } from '@atlaskit/tokens';
        token('test-token', '');
      `;

		expect(noAutoFallback).toMatchInlineSnapshot('"\\"var(--test-token)\\";"');
		expect(autoFallback).toMatchInlineSnapshot('"\\"var(--test-token)\\";"');
	});

	it('handles aliased imports', () => {
		const actual = transform()`
        import { token as getToken } from '@atlaskit/tokens';
        getToken('test-token');
      `;

		expect(actual).toMatchInlineSnapshot('"\\"var(--test-token)\\";"');
	});

	it("does nothing if there's no import of @atlaskit/tokens", () => {
		const actual = transform()("token('test-token', color.blue);");

		expect(actual).toMatchInlineSnapshot('"token(\'test-token\', color.blue);"');
	});

	it("doesn't remove tokens import if there are still usages left", () => {
		const actual = transform()`
        import { token } from '@atlaskit/tokens';
        a = token;
        token('test-token', 'blue');
      `;

		expect(actual).toMatchInlineSnapshot(`
            "import { token } from '@atlaskit/tokens';
            a = token;
            \\"var(--test-token, blue)\\";"
          `);
	});

	it('converts expression second arguments', () => {
		const actual = transform()`
        import { token } from '@atlaskit/tokens';
        token('test-token', \`\${color.blue}\`);
        token('test-token', color.blue);
        token('test-token', condition ? "blue" : color.red );
        token('test-token', getColor());
      `;

		expect(actual).toMatchInlineSnapshot(`
        "\`var(--test-token, \${\`\${color.blue}\`})\`;
        \`var(--test-token, \${color.blue})\`;
        \`var(--test-token, \${condition ? \\"blue\\" : color.red})\`;
        \`var(--test-token, \${getColor()})\`;"
      `);
	});

	it('converts escape characters correctly', () => {
		const actual = transform()`
        import { token } from '@atlaskit/tokens';
        token('test-token-escape', color.blue);
        token('test-token-escape');
      `;

		expect(actual).toMatchInlineSnapshot(`
        "\`var(--test-token \\\\\\\\u{54} \\\\\${ \\\\\` ' \\" T, \${color.blue})\`;
        \\"var(--test-token \\\\\\\\u{54} \${ \` ' \\\\\\" T)\\";"
      `);
	});

	// If the token name has escape characters they should make it into the final result
	it('works correctly with template literal conversion', () => {
		const actual = transform(false, true)`
        import { token } from '@atlaskit/tokens';
        token('test-token', \`\${color.blue}\`);
        token('test-token', color.blue);
        token('test-token', condition ? "blue" : color.red );
        token('test-token', getColor());
        token('test-token-escape', color.blue);
        token('test-token-escape');
      `;

		expect(actual).toMatchInlineSnapshot(`
        "\\"var(--test-token, \\".concat(\\"\\".concat(color.blue), \\")\\");
        \\"var(--test-token, \\".concat(color.blue, \\")\\");
        \\"var(--test-token, \\".concat(condition ? \\"blue\\" : color.red, \\")\\");
        \\"var(--test-token, \\".concat(getColor(), \\")\\");
        \\"var(--test-token \\\\\\\\u{54} \${ \` ' \\\\\\" T, \\".concat(color.blue, \\")\\");
        \\"var(--test-token \\\\\\\\u{54} \${ \` ' \\\\\\" T)\\";"
      `);
	});

	it('throws if token does not exist', () => {
		expect(
			() => transform()`
        import { token } from '@atlaskit/tokens';
        token('this.token.does.not.exist');
      `,
		).toThrowError("token 'this.token.does.not.exist' does not exist");
	});

	it('throws on empty token() call', () => {
		expect(
			() => transform()`
        import { token } from '@atlaskit/tokens';
        token();
      `,
		).toThrowError('token() requires at least one argument');
	});

	it('throws on non-string token argument', () => {
		expect(
			() => transform()`
        import { token } from '@atlaskit/tokens';
        token(()=>{}, color.blue, color.red);
      `,
		).toThrowError('token() must have a string as the first argument');
	});

	it('throws on too many arguments', () => {
		expect(
			() => transform()`
        import { token } from '@atlaskit/tokens';
        token('test-token', color.blue, color.red);
      `,
		).toThrowError('token() does not accept 3 arguments');
	});

	it('correctly handles assorted usages', () => {
		const actual = transform()`
        import { token } from '@atlaskit/tokens';
        componentStyles = css({
          color: token('test-token'),
          color: \`\${token('test-token')}\`,
        });
      `;

		expect(actual).toMatchInlineSnapshot(`
        "componentStyles = css({
          color: \\"var(--test-token)\\",
          color: \`\${\\"var(--test-token)\\"}\`
        });"
      `);
	});

	it('correctly handles nested scopes', () => {
		const actual = transform()`
import { token } from '@atlaskit/tokens';
const getStyles = css => css\`
  \${true && \`color: \${token('test-token')}\`}
\`;
    `;

		expect(actual).toMatchInlineSnapshot(`
          "const getStyles = css => css\`
            \${true && \`color: \${\\"var(--test-token)\\"}\`}
          \`;"
      `);
	});

	it('Ignores token functions from other packages', () => {
		const actual = transform()`
        import { token } from 'foobar';
        token('test-token');
      `;

		expect(actual).toMatchInlineSnapshot(`
        "import { token } from 'foobar';
        token('test-token');"
      `);
	});

	it('Ignores token functions in node_modules directories', () => {
		const actual = transform(false, false, {
			filename: 'node_modules/foo/bar.tsx',
		})`
        import { token } from '@atlaskit/tokens';
        token('test-token');
      `;

		expect(actual).toMatchInlineSnapshot(`
        "import { token } from '@atlaskit/tokens';
        token('test-token');"
      `);
	});

	it('Ignores token functions in nested node_modules directories', () => {
		const actual = transform(false, false, {
			filename: 'packages/foo/node_modules/bar/bar.tsx',
		})`
        import { token } from '@atlaskit/tokens';
        token('test-token');
      `;

		expect(actual).toMatchInlineSnapshot(`
        "import { token } from '@atlaskit/tokens';
        token('test-token');"
      `);
	});

	it('formats box shadow fallback styles correctly when opacity is included in hex value', () => {
		const actual = transform(true)`
        import { token } from '@atlaskit/tokens';
        token('test-token-shadow');
      `;

		expect(actual).toMatchInlineSnapshot(
			'"\\"var(--test-token-shadow, 0px 0px 8px #091e423f, 0px 0px 1px #091e424f)\\";"',
		);
	});

	it('formats box shadow fallback styles correctly when opacity is NOT included in hex value', () => {
		const actual = transform(true)`
        import { token } from '@atlaskit/tokens';
        token('test-token-shadow-no-opacity');
      `;

		expect(actual).toMatchInlineSnapshot(
			'"\\"var(--test-token-shadow-no-opacity, 0px 0px 8px #091e4240, 0px 0px 1px #091e424f)\\";"',
		);
	});

	describe('Non-color themes (spacing, typography, shape)', () => {
		it('converts 1-argument usage correctly when shouldUseAutoFallback set to false', () => {
			const actual = transform()`
      import { token } from '@atlaskit/tokens';
      token('space.075');
    `;

			expect(actual).toMatchInlineSnapshot(`"\\"var(--ds-space-075)\\";"`);
		});

		it('converts 1-argument usage correctly when shouldUseAutoFallback set to true', () => {
			const actual = transform(true, false, {}, 'legacy-light')`
        import { token } from '@atlaskit/tokens';
        token('space.075');
        token('space.100');
        token('border.radius.050');
        token('font.heading.xlarge');
      `;

			expect(actual).toMatchInlineSnapshot(`
        "\\"var(--ds-space-075, 6px)\\";
        \\"var(--ds-space-100, 8px)\\";
        \\"var(--ds-border-radius-050, 2px)\\";
        \\"var(--ds-font-heading-xlarge, \\\\\\"normal 500 35px/40px ui-sans-serif, -apple-system, BlinkMacSystemFont, \\\\\\"Segoe UI\\\\\\", Ubuntu, system-ui, \\\\\\"Helvetica Neue\\\\\\", sans-serif\\\\\\")\\";"
      `);
		});
	});
});
