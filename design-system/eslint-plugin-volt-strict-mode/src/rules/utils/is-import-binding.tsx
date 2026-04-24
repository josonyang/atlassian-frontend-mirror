import type { TSESLint } from '@typescript-eslint/utils';

export function isImportBinding(variable: TSESLint.Scope.Variable): boolean {
	return variable.defs.some((d) => d.type === 'ImportBinding');
}
