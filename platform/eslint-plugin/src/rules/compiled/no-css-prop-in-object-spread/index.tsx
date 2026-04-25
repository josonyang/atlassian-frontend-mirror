import type { Rule, Scope } from 'eslint';
import type { ObjectExpression, Property, Node } from 'estree';

import { getScope, getSourceCode } from '../../util/context-compat';

/**
 * Returns the `css` Property node from an ObjectExpression, or null if not found.
 */
function getCssProperty(objectExpression: ObjectExpression): Property | null {
	for (const prop of objectExpression.properties) {
		if (prop.type !== 'Property') {
			continue;
		}
		const { key } = prop;
		if (
			(key.type === 'Identifier' && key.name === 'css') ||
			(key.type === 'Literal' && key.value === 'css')
		) {
			return prop;
		}
	}
	return null;
}

export const noCssPropInObjectSpread: Rule.RuleModule = {
	meta: {
		docs: {
			url: 'https://bitbucket.org/atlassian/atlassian-frontend-monorepo/src/master/platform/packages/platform/eslint-plugin/src/rules/compiled/no-css-prop-in-object-spread/',
			description:
				'Disallows `css` property inside objects spread into JSX — the Compiled JSX pragma ignores it',
		},
		fixable: 'code',
		messages: {
			noCssPropInObjectSpread:
				'The `css` property inside an object spread into JSX is a no-op. The Compiled JSX pragma only processes `css` as a direct JSX attribute. Move `css` out of the spread: <El css={...} />',
		},
		type: 'problem',
	},
	create(context: Rule.RuleContext) {
		return {
			JSXSpreadAttribute(node: Node) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const spreadNode = node as any;
				const arg = spreadNode.argument as Node;

				// Case 1: inline object literal — <div {...{ css: styles, id: 'foo' }} />
				if (arg.type === 'ObjectExpression') {
					const objectArg = arg as ObjectExpression;
					const cssProp = getCssProperty(objectArg);
					if (!cssProp) {
						return;
					}
					context.report({
						node,
						messageId: 'noCssPropInObjectSpread',
						fix(fixer) {
							const sourceCode = getSourceCode(context);
							const cssValueText = sourceCode.getText(cssProp.value);
							const remainingProps = objectArg.properties.filter((p) => p !== cssProp);
							const directCssProp = `css={${cssValueText}}`;

							if (remainingProps.length === 0) {
								return fixer.replaceText(node, directCssProp);
							}

							const remainingText = remainingProps
								.map((p) => sourceCode.getText(p as Node))
								.join(', ');
							return fixer.replaceText(node, `${directCssProp} {...{ ${remainingText} }}`);
						},
					});
					return;
				}

				// Case 2: variable reference — <div {...props} />
				if (arg.type === 'Identifier') {
					const scope: Scope.Scope = getScope(context, arg);
					let currentScope: Scope.Scope | null = scope;
					let variable: Scope.Variable | null = null;

					while (currentScope) {
						const found = currentScope.variables.find((v) => v.name === arg.name);
						if (found) {
							variable = found;
							break;
						}
						currentScope = currentScope.upper;
					}

					if (!variable || variable.defs.length === 0) {
						return;
					}

					const def = variable.defs[0];
					if (
						def.type !== 'Variable' ||
						!def.node.init ||
						def.node.init.type !== 'ObjectExpression'
					) {
						return;
					}

					const initObject = def.node.init as ObjectExpression;
					const cssProp = getCssProperty(initObject);
					if (!cssProp) {
						return;
					}

					// Only auto-fix when there is exactly one JSX spread site for this variable
					const spreadCount = variable.references.filter((ref: Scope.Reference) => {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						const refParent = (ref.identifier as any).parent;
						return refParent?.type === 'JSXSpreadAttribute';
					}).length;

					context.report({
						node,
						messageId: 'noCssPropInObjectSpread',
						...(spreadCount === 1
							? {
									fix(fixer) {
										const sourceCode = getSourceCode(context);
										const cssValueText = sourceCode.getText(cssProp.value);
										const fixes: Rule.Fix[] = [];

										const remainingProps = initObject.properties.filter((p) => p !== cssProp);

										if (remainingProps.length === 0) {
											fixes.push(fixer.replaceText(initObject as Node, '{}'));
										} else {
											const propIndex = initObject.properties.indexOf(cssProp);
											const isLast = propIndex === initObject.properties.length - 1;
											const tokenBefore = sourceCode.getTokenBefore(cssProp as Node);
											const tokenAfter = sourceCode.getTokenAfter(cssProp as Node);

											if (!isLast && tokenAfter && tokenAfter.value === ',') {
												const src = sourceCode.getText();
												const afterEnd = tokenAfter.range![1];
												let end = afterEnd;
												while (end < src.length && src[end] === ' ') {
													end++;
												}
												fixes.push(fixer.removeRange([(cssProp as Node).range![0], end]));
											} else if (tokenBefore && tokenBefore.value === ',') {
												fixes.push(
													fixer.removeRange([tokenBefore.range![0], (cssProp as Node).range![1]]),
												);
											} else {
												fixes.push(fixer.remove(cssProp as Node));
											}
										}

										fixes.push(fixer.insertTextBefore(node, `css={${cssValueText}} `));

										return fixes;
									},
								}
							: {}),
					});
				}
			},
		};
	},
};

export default noCssPropInObjectSpread;
