import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/utils';
import type { Node as ESTreeNode } from 'estree';

import { createLintRule } from '../utils/create-rule';

type Options = [{ allowPrimitiveExports?: boolean }?];

/**
 * Returns true if the variable declarator's initializer is a primitive literal
 * (string, number, boolean, template literal, or null/undefined), including
 * when the value is annotated with `as const`.
 */
function isPrimitiveLiteral(declarator: TSESTree.VariableDeclarator): boolean {
	let init = declarator.init;
	if (init == null) {
		return false;
	}
	// Unwrap `as const` (and any other `as X`) to get at the underlying value.
	if (init.type === AST_NODE_TYPES.TSAsExpression) {
		init = (init as TSESTree.TSAsExpression).expression;
	}
	if (init.type === AST_NODE_TYPES.Literal) {
		return (
			typeof (init as TSESTree.Literal).value === 'string' ||
			typeof (init as TSESTree.Literal).value === 'number' ||
			typeof (init as TSESTree.Literal).value === 'boolean' ||
			(init as TSESTree.Literal).value === null
		);
	}
	if (init.type === AST_NODE_TYPES.TemplateLiteral) {
		return true;
	}
	// undefined is represented as an Identifier named "undefined"
	if (
		init.type === AST_NODE_TYPES.Identifier &&
		(init as TSESTree.Identifier).name === 'undefined'
	) {
		return true;
	}
	return false;
}

/**
 * Returns true if the variable declarator's initializer is a function
 * (arrow function or function expression), e.g. `export const build = () => {}`.
 *
 * Such "function-valued" constants are conceptually functions and DO count
 * toward the one-runtime-export limit. Plain data constants (objects, arrays,
 * `new`-expressions, calls, etc.) are intentionally NOT counted — they mirror
 * the `volt-no-multi-exports` codemod, which only ever extracts functions and
 * classes (function-valued consts included) into their own file and leaves data
 * consts, enums, primitives and types in place. Keeping the lint rule aligned
 * means it never flags a file the codemod would refuse to auto-split.
 */
function isFunctionValued(declarator: TSESTree.VariableDeclarator): boolean {
	let init = declarator.init;
	if (init == null) {
		return false;
	}
	// Unwrap `as const` / `as X` wrappers (e.g. `const f = (() => {}) as Fn`).
	if (init.type === AST_NODE_TYPES.TSAsExpression) {
		init = (init as TSESTree.TSAsExpression).expression;
	}
	return (
		init.type === AST_NODE_TYPES.ArrowFunctionExpression ||
		init.type === AST_NODE_TYPES.FunctionExpression
	);
}

const rule: import('eslint').Rule.RuleModule = createLintRule({
	meta: {
		name: 'no-multiple-exports',
		docs: {
			description:
				'Allows at most one runtime export per module so each file maps to a single bundler unit; `export type` / `export interface` are exempt.',
			recommended: true,
			severity: 'warn',
		},
		messages: {
			'no-multiple-exports':
				'Volt Strict Mode: this file has more than one runtime export, but only one is allowed per file (this is the extra export). Fix it by moving each additional function or class export (including function-valued consts like `export const f = () => {}`) into its own file and importing it where needed. Exempt from this rule: `export type`, `export interface`, `export enum`, `type`-only `export { ... }` specifiers, and data-value consts (objects, arrays, and other non-function values); primitive value exports (string/number/boolean/null/undefined/template literal) are also allowed when the `allowPrimitiveExports` option is enabled. See go/volt-one-export-per-file for rationale and migration guidance.',
		},
		schema: [
			{
				type: 'object',
				properties: {
					allowPrimitiveExports: {
						type: 'boolean',
						description:
							'When true, multiple exports of primitive values (strings, numbers, booleans) are allowed. Only complex exports like functions and components are restricted to one per file.',
					},
				},
				additionalProperties: false,
			},
		],
		type: 'problem',
	},
	create(context) {
		const options = (context.options as Options)[0] ?? {};
		const allowPrimitiveExports = options.allowPrimitiveExports ?? false;

		return {
			Program(node) {
				const parts: ESTreeNode[] = [];
				// Track function names already seen so TypeScript overload signatures
				// (multiple `export function foo(…)` declarations with the same name)
				// are counted as a single logical export.
				const exportedFunctionNames = new Set<string>();

				for (const stmt of node.body) {
					if (stmt.type === AST_NODE_TYPES.ExportDefaultDeclaration) {
						parts.push(stmt);
						continue;
					}

					if (stmt.type !== AST_NODE_TYPES.ExportNamedDeclaration) {
						continue;
					}

					const named = stmt as TSESTree.ExportNamedDeclaration;

					// Re-exports from another module are handled by `no-re-exports`.
					if (named.source != null) {
						continue;
					}

					if (named.exportKind === 'type') {
						continue;
					}

					if (named.declaration) {
						const decl = named.declaration;
						if (
							decl.type === AST_NODE_TYPES.TSInterfaceDeclaration ||
							decl.type === AST_NODE_TYPES.TSTypeAliasDeclaration ||
							decl.type === AST_NODE_TYPES.TSEnumDeclaration
						) {
							continue;
						}

						// TypeScript overload signatures: `export function foo(…)` with no body
						// (`TSDeclareFunction`) and the final implementation (`FunctionDeclaration`
						// with a body) all share the same function name. Treat the entire overload
						// group as a single logical export.
						if (
							decl.type === AST_NODE_TYPES.TSDeclareFunction ||
							decl.type === AST_NODE_TYPES.FunctionDeclaration
						) {
							const fnDecl = decl as TSESTree.TSDeclareFunction | TSESTree.FunctionDeclaration;
							const fnName = fnDecl.id?.name;
							if (fnName != null) {
								if (exportedFunctionNames.has(fnName)) {
									// Already counted this function name — it's an overload, skip it.
									continue;
								}
								exportedFunctionNames.add(fnName);
							}
						}

						if (decl.type === AST_NODE_TYPES.VariableDeclaration) {
							for (const declarator of decl.declarations) {
								const variableDeclarator = declarator as TSESTree.VariableDeclarator;
								// Function-valued consts (`const f = () => {}`) are conceptually
								// functions and always count toward the limit.
								if (isFunctionValued(variableDeclarator)) {
									parts.push(declarator as ESTreeNode);
									continue;
								}
								// Primitive value consts count only when the caller has NOT opted
								// into `allowPrimitiveExports` (preserves the option's meaning).
								if (isPrimitiveLiteral(variableDeclarator)) {
									if (!allowPrimitiveExports) {
										parts.push(declarator as ESTreeNode);
									}
									continue;
								}
								// Everything else is a plain data const (object, array, call,
								// `new`, etc.). The `volt-no-multi-exports` codemod leaves these in
								// place (it only extracts functions/classes), so to stay aligned we
								// do NOT count them — a file the codemod won't split must not fail
								// this rule.
							}
						} else {
							parts.push(decl as ESTreeNode);
						}
						continue;
					}

					for (const spec of named.specifiers) {
						if (spec.type !== AST_NODE_TYPES.ExportSpecifier) {
							continue;
						}
						const exportSpec = spec as TSESTree.ExportSpecifier;
						if (exportSpec.exportKind === 'type') {
							continue;
						}
						parts.push(exportSpec as ESTreeNode);
					}
				}
				if (parts.length <= 1) {
					return;
				}

				for (let i = 1; i < parts.length; i++) {
					const part = parts[i];
					context.report({
						node: part,
						messageId: 'no-multiple-exports',
					});
				}
			},
		};
	},
});

export default rule;
