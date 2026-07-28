import type { Rule } from 'eslint';
import type { Expression, ObjectExpression, Property } from 'estree';

import { getSourceCode } from '@atlaskit/eslint-utils/context-compat';

import { Root } from '../../ast-nodes/root';
import { createLintRule } from '../utils/create-lint-rule';

const COMPILED_PRIMITIVES = '@atlaskit/primitives/compiled';
const COMPILED_PRESSABLE = '@atlaskit/primitives/compiled/pressable';
const LEGACY_PRESSABLE = '@atlaskit/primitives/pressable';
const XCSS = '@atlaskit/primitives/xcss';
const ATLASKIT_CSS = '@atlaskit/css';
const TOKENS = '@atlaskit/tokens';

const BUTTON_PROPERTIES = new Set(['backgroundColor', 'background']);
const LIST_ITEM_PROPERTIES = new Set([
	'backgroundColor',
	'background',
	'borderColor',
	'color',
	'textDecorationColor',
]);

type StyleRecord = {
	base: ObjectExpression;
	hover?: ObjectExpression;
	active?: ObjectExpression;
};

type StyleReference = {
	styles: Map<string, StyleRecord>;
};

type StyleUsage = {
	node: Rule.Node;
	styleName: string;
	styleKey: string;
};

type MotionFamily = 'button' | 'listitem';

type StyleSelectors = {
	hover: string;
	active: string;
};

const CSS_SELECTORS: StyleSelectors = {
	hover: '&:hover',
	active: '&:active',
};

const XCSS_SELECTORS: StyleSelectors = {
	hover: ':hover',
	active: ':active',
};

const getPropertyName = (property: Property): string | undefined => {
	if (property.computed) {
		return;
	}

	if (property.key.type === 'Identifier') {
		return property.key.name;
	}

	return property.key.type === 'Literal' && typeof property.key.value === 'string'
		? property.key.value
		: undefined;
};

const getProperty = (object: ObjectExpression, name: string): Property | undefined =>
	object.properties.find(
		(property): property is Property =>
			property.type === 'Property' && getPropertyName(property) === name,
	);

const getNestedStyle = (base: ObjectExpression, selector: string): ObjectExpression | undefined => {
	const property = getProperty(base, selector);
	return property?.value.type === 'ObjectExpression' ? property.value : undefined;
};

const createStyleRecord = (base: ObjectExpression, selectors = CSS_SELECTORS): StyleRecord => ({
	base,
	hover: getNestedStyle(base, selectors.hover),
	active: getNestedStyle(base, selectors.active),
});

const hasSpread = (object: ObjectExpression): boolean =>
	object.properties.some((property) => property.type === 'SpreadElement');

const isColorOnlyBackground = (property: Property, tokenNames: Set<string>): boolean => {
	if (getPropertyName(property) !== 'background') {
		return false;
	}

	if (property.value.type === 'Literal' && typeof property.value.value === 'string') {
		const value = property.value.value.trim().toLowerCase();
		return !/\b(url|image|gradient|var)\s*\(/.test(value) && !value.includes(',');
	}

	return (
		property.value.type === 'CallExpression' &&
		property.value.callee.type === 'Identifier' &&
		tokenNames.has(property.value.callee.name) &&
		property.value.arguments[0]?.type === 'Literal' &&
		typeof property.value.arguments[0].value === 'string' &&
		property.value.arguments[0].value.startsWith('color.')
	);
};

const hasRelevantColorChange = (
	object: ObjectExpression | undefined,
	properties: Set<string>,
	tokenNames: Set<string>,
): boolean => {
	if (!object || hasSpread(object)) {
		return false;
	}

	return object.properties.some((property) => {
		if (property.type !== 'Property') {
			return false;
		}

		const name = getPropertyName(property);
		return (
			(name === 'background' && isColorOnlyBackground(property, tokenNames)) ||
			(name !== undefined && properties.has(name) && name !== 'background')
		);
	});
};

const getIndent = (context: Rule.RuleContext, node: Rule.Node): string => {
	const sourceCode = getSourceCode(context);
	const line = sourceCode.lines[(node.loc?.start.line ?? 1) - 1] ?? '';
	return line.match(/^\s*/)?.[0] ?? '';
};

const insertTransition = (
	context: Rule.RuleContext,
	fixer: Rule.RuleFixer,
	object: ObjectExpression,
	value: string,
): Rule.Fix => {
	const lastProperty = object.properties[object.properties.length - 1] as Rule.Node;
	const isInlineObject = object.loc?.start.line === lastProperty.loc?.start.line;
	return fixer.insertTextAfter(
		lastProperty,
		isInlineObject
			? `, transition: ${value}`
			: `,\n${getIndent(context, lastProperty)}transition: ${value}`,
	);
};

const isExpectedTransition = (
	property: Property | undefined,
	tokenNames: Set<string>,
	tokenName: string,
): boolean =>
	property?.value.type === 'CallExpression' &&
	property.value.callee.type === 'Identifier' &&
	tokenNames.has(property.value.callee.name) &&
	property.value.arguments[0]?.type === 'Literal' &&
	property.value.arguments[0].value === tokenName;

const rule: Rule.RuleModule = createLintRule({
	meta: {
		name: 'use-pressable-motion',
		hasSuggestions: true,
		type: 'suggestion',
		docs: {
			description:
				'Suggests semantic motion tokens when Pressable changes interactive colours through local static styles.',
			removeFromPresets: true,
		},
		messages: {
			missingPressableMotion:
				'Pressable changes interactive colour properties without the matching semantic motion token.',
			missingPressableMotionManual:
				'Pressable changes interactive colour properties without the matching semantic motion token. Update the existing transition manually.',
			useButtonMotion: 'Add button motion tokens for hover and pressed states.',
			useListItemMotion: 'Add list-item motion tokens for hover and pressed states.',
		},
	},

	create(context) {
		const pressableNames = new Set<string>();
		const cssNames = new Set<string>();
		const cssMapNames = new Set<string>();
		const xcssNames = new Set<string>();
		const tokenNames = new Set<string>();
		const styles = new Map<string, StyleReference>();
		const styleUsages: StyleUsage[] = [];
		const collectStyleUsages = (node: Rule.Node, expression: Expression): void => {
			if (expression.type === 'Identifier') {
				styleUsages.push({
					node,
					styleName: expression.name,
					styleKey: 'default',
				});
				return;
			}

			if (
				expression.type === 'MemberExpression' &&
				!expression.computed &&
				expression.object.type === 'Identifier' &&
				expression.property.type === 'Identifier'
			) {
				styleUsages.push({
					node,
					styleName: expression.object.name,
					styleKey: expression.property.name,
				});
				return;
			}

			if (expression.type === 'ArrayExpression') {
				expression.elements.forEach((element) => {
					if (element !== null && element.type !== 'SpreadElement') {
						collectStyleUsages(node, element);
					}
				});
				return;
			}

			if (expression.type === 'LogicalExpression') {
				collectStyleUsages(node, expression.right);
				return;
			}

			if (expression.type === 'ConditionalExpression') {
				collectStyleUsages(node, expression.consequent);
				collectStyleUsages(node, expression.alternate);
			}
		};

		const report = (node: Rule.Node, style: StyleRecord) => {
			const hasHover = hasRelevantColorChange(style.hover, BUTTON_PROPERTIES, tokenNames);
			const hasActive = hasRelevantColorChange(style.active, BUTTON_PROPERTIES, tokenNames);
			const hasListItemHover = hasRelevantColorChange(
				style.hover,
				LIST_ITEM_PROPERTIES,
				tokenNames,
			);
			const hasListItemActive = hasRelevantColorChange(
				style.active,
				LIST_ITEM_PROPERTIES,
				tokenNames,
			);

			if (!hasListItemHover && !hasListItemActive) {
				return;
			}

			const baseTransition = getProperty(style.base, 'transition');
			const activeTransition = style.active ? getProperty(style.active, 'transition') : undefined;
			const hasButtonHoverTransition = isExpectedTransition(
				baseTransition,
				tokenNames,
				'motion.button.hovered',
			);
			const hasButtonActiveTransition = isExpectedTransition(
				activeTransition,
				tokenNames,
				'motion.button.pressed',
			);
			const hasListItemHoverTransition = isExpectedTransition(
				baseTransition,
				tokenNames,
				'motion.listitem.hovered',
			);
			const hasListItemActiveTransition = isExpectedTransition(
				activeTransition,
				tokenNames,
				'motion.listitem.pressed',
			);
			const needsHover = hasListItemHover && !baseTransition;
			const needsActive = hasListItemActive && !activeTransition;
			const hasUnsafeTransition =
				(hasListItemHover &&
					baseTransition !== undefined &&
					!hasButtonHoverTransition &&
					!hasListItemHoverTransition) ||
				(hasListItemActive &&
					activeTransition !== undefined &&
					!hasButtonActiveTransition &&
					!hasListItemActiveTransition);

			if (hasUnsafeTransition) {
				context.report({ node, messageId: 'missingPressableMotionManual' });
				return;
			}

			if (!needsHover && !needsActive) {
				return;
			}

			const createSuggestion = (family: MotionFamily) => ({
				messageId: family === 'button' ? 'useButtonMotion' : 'useListItemMotion',
				fix(fixer: Rule.RuleFixer) {
					const fixes: Rule.Fix[] = [];
					const tokenIdentifier = tokenNames.values().next().value ?? 'token';

					if (needsHover) {
						fixes.push(
							insertTransition(
								context,
								fixer,
								style.base,
								`${tokenIdentifier}('motion.${family}.hovered')`,
							),
						);
					}

					if (needsActive && style.active) {
						fixes.push(
							insertTransition(
								context,
								fixer,
								style.active,
								`${tokenIdentifier}('motion.${family}.pressed')`,
							),
						);
					}

					if (tokenNames.size === 0) {
						const importFix = Root.upsertNamedImportDeclaration(
							{ module: TOKENS, specifiers: ['token'] },
							context,
							fixer,
						);
						if (importFix) {
							fixes.push(importFix);
						}
					}

					return fixes;
				},
			});

			const suggestions = [
				...(hasHover || hasActive ? [createSuggestion('button')] : []),
				createSuggestion('listitem'),
			];

			context.report({
				node,
				messageId: 'missingPressableMotion',
				suggest: suggestions,
			});
		};

		return {
			ImportDeclaration(node: Rule.Node) {
				if (node.type !== 'ImportDeclaration') {
					return;
				}
				if (
					node.source.value === COMPILED_PRIMITIVES ||
					node.source.value === COMPILED_PRESSABLE ||
					node.source.value === LEGACY_PRESSABLE
				) {
					node.specifiers.forEach((specifier) => {
						if (
							specifier.type === 'ImportDefaultSpecifier' ||
							(specifier.type === 'ImportSpecifier' &&
								specifier.imported.type === 'Identifier' &&
								specifier.imported.name === 'Pressable')
						) {
							pressableNames.add(specifier.local.name);
						}
					});
				}

				if (node.source.value === ATLASKIT_CSS) {
					node.specifiers.forEach((specifier) => {
						if (specifier.type !== 'ImportSpecifier' || specifier.imported.type !== 'Identifier') {
							return;
						}
						if (specifier.imported.name === 'css') cssNames.add(specifier.local.name);
						if (specifier.imported.name === 'cssMap') cssMapNames.add(specifier.local.name);
					});
				}

				if (node.source.value === XCSS) {
					node.specifiers.forEach((specifier) => {
						if (
							specifier.type === 'ImportSpecifier' &&
							specifier.imported.type === 'Identifier' &&
							specifier.imported.name === 'xcss'
						) {
							xcssNames.add(specifier.local.name);
						}
					});
				}

				if (node.source.value === TOKENS) {
					node.specifiers.forEach((specifier) => {
						if (
							specifier.type === 'ImportSpecifier' &&
							specifier.imported.type === 'Identifier' &&
							specifier.imported.name === 'token'
						) {
							tokenNames.add(specifier.local.name);
						}
					});
				}
			},

			VariableDeclarator(node: Rule.Node) {
				if (node.type !== 'VariableDeclarator') {
					return;
				}
				if (
					node.id.type !== 'Identifier' ||
					node.init?.type !== 'CallExpression' ||
					node.init.callee.type !== 'Identifier' ||
					node.init.arguments.length !== 1 ||
					node.init.arguments[0].type !== 'ObjectExpression'
				) {
					return;
				}

				const styleObject = node.init.arguments[0];
				if (hasSpread(styleObject)) {
					return;
				}

				if (cssNames.has(node.init.callee.name)) {
					styles.set(node.id.name, {
						styles: new Map([['default', createStyleRecord(styleObject)]]),
					});
					return;
				}

				if (xcssNames.has(node.init.callee.name)) {
					styles.set(node.id.name, {
						styles: new Map([['default', createStyleRecord(styleObject, XCSS_SELECTORS)]]),
					});
					return;
				}

				if (!cssMapNames.has(node.init.callee.name)) {
					return;
				}

				const cssMapStyles = new Map<string, StyleRecord>();
				styleObject.properties.forEach((property) => {
					if (property.type !== 'Property' || property.value.type !== 'ObjectExpression') {
						return;
					}
					const key = getPropertyName(property);
					if (key && !hasSpread(property.value)) {
						cssMapStyles.set(key, createStyleRecord(property.value));
					}
				});
				styles.set(node.id.name, { styles: cssMapStyles });
			},

			JSXElement(node: Rule.Node) {
				if (node.type !== 'JSXElement') {
					return;
				}
				if (node.openingElement.name.type !== 'JSXIdentifier') {
					return;
				}
				if (!pressableNames.has(node.openingElement.name.name)) {
					return;
				}

				const xcss = node.openingElement.attributes.find(
					(attribute) => attribute.type === 'JSXAttribute' && attribute.name.name === 'xcss',
				);
				if (xcss?.type !== 'JSXAttribute' || xcss.value?.type !== 'JSXExpressionContainer') {
					return;
				}

				const expression = xcss.value.expression;
				if (expression.type !== 'JSXEmptyExpression') {
					collectStyleUsages(xcss as Rule.Node, expression);
				}
			},

			'Program:exit'() {
				styleUsages.forEach(({ node, styleName, styleKey }) => {
					const style = styles.get(styleName)?.styles.get(styleKey);
					if (style) {
						report(node, style);
					}
				});
			},
		};
	},
});

export default rule;
