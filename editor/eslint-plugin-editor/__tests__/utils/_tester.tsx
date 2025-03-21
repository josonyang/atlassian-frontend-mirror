/* eslint-disable @repo/internal/fs/filename-pattern-match */
/* eslint-disable no-undef */
import { TSESLint } from '@typescript-eslint/utils';
import { RuleTester } from 'eslint';

(RuleTester as any).describe = (text: string, method: Function) => {
	const origHasAssertions = expect.hasAssertions;
	describe(text, () => {
		beforeAll(() => {
			// Stub out expect.hasAssertions beforeEach from jest-presetup.js
			expect.hasAssertions = () => {};
		});
		afterAll(() => {
			expect.hasAssertions = origHasAssertions;
		});

		method();
	});
};

export const tsRuleTester = new TSESLint.RuleTester({
	parser: require.resolve('@typescript-eslint/parser'),
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
});

export const tester = new RuleTester({
	parser: require.resolve('@babel/eslint-parser'),
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
});
