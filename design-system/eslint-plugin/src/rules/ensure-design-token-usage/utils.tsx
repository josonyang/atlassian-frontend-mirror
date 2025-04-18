import type { Rule } from 'eslint';
import {
	callExpression,
	type CallExpression,
	type EslintNode,
	identifier,
	insertAtStartOfFile,
	insertImportDeclaration,
	isNodeOfType,
	literal,
	type ObjectExpression,
	type Property,
	type SpreadElement,
	type TaggedTemplateExpression,
} from 'eslint-codemod-utils';

import { getScope, getSourceCode } from '@atlaskit/eslint-utils/context-compat';
import { spacing as spacingScale } from '@atlaskit/tokens/tokens-raw';

import { findIdentifierInParentScope } from '../utils/find-in-parent';
import { isColorCssPropertyName, isCurrentSurfaceCustomPropertyName } from '../utils/is-color';

import {
	borderWidthValueToToken,
	isBorderRadius,
	isBorderSizeProperty,
	isShapeProperty,
	radiusValueToToken,
} from './shape';
import { type Domains } from './types';

const properties = [
	'padding',
	'paddingBlock',
	'paddingInline',
	'paddingLeft',
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingInline',
	'paddingInlineStart',
	'paddingInlineEnd',
	'paddingBlock',
	'paddingBlockStart',
	'paddingBlockEnd',
	'marginLeft',
	'marginTop',
	'marginRight',
	'marginBottom',
	'marginInline',
	'marginInlineStart',
	'marginInlineEnd',
	'marginBlock',
	'marginBlockStart',
	'marginBlockEnd',
	'margin',
	'gap',
	'rowGap',
	'gridRowGap',
	'columnGap',
	'gridColumnGap',
	'top',
	'left',
	'right',
	'bottom',
	'inlineStart',
	'inlineEnd',
	'blockStart',
	'blockEnd',
	'outline-offset',
];

export type ProcessedCSSLines = [string, string][];

const spacingValueToToken = Object.fromEntries(
	spacingScale.map((token) => [token.value, token.cleanName]),
);

export function insertTokensImport(fixer: Rule.RuleFixer) {
	return insertAtStartOfFile(fixer, `${insertImportDeclaration('@atlaskit/tokens', ['token'])}\n`);
}

export const isSpacingProperty = (propertyName: string) => {
	return properties.includes(propertyName);
};

/**
 * Accomplishes split str by whitespace but preserves expressions in between ${...}
 * even if they might have whitepaces or nested brackets
 * @param str
 * @returns string[]
 * @example
 * Regex has two parts, first attempts to capture anything in between `${...}` in a capture group
 * Whilst allowing nested brackets and non empty characters leading or traling wrapping expression e.g `${gridSize}`, `-${gridSize}px`
 * second part is a white space delimiter
 * For input `-${gridSize / 2}px ${token(...)} 18px -> [`-${gridSize / 2}px`, `${token(...)}`, `18px`]
 */
export const splitShorthandValues = (str: string): string[] => {
	return str.split(/(\S*\$\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\S*)|\s+/g).filter(Boolean);
};

export const getValueFromShorthand = (str: unknown): (string | number)[] => {
	const valueString = String(str);
	const fontFamily = /(Charlie)|(sans-serif$)|(monospace$)/;
	const fontWeightString = /(regular$)|(medium$)|(semibold$)|(bold$)/;
	const fontStyleString = /(inherit$)|(normal$)|(italic$)/;
	if (
		fontFamily.test(valueString) ||
		fontWeightString.test(valueString) ||
		fontStyleString.test(valueString)
	) {
		return [valueString];
	}
	// If we want to filter out NaN just add .filter(Boolean)
	return splitShorthandValues(String(str).trim()).map(removePixelSuffix);
};

const isGridSize = (node: EslintNode): node is CallExpression =>
	isNodeOfType(node, 'CallExpression') &&
	isNodeOfType(node.callee, 'Identifier') &&
	(node.callee.name === 'gridSize' || node.callee.name === 'getGridSize') &&
	// If there are arguments we know it's a custom gridSize function and cannot be certain what it returns
	node.arguments.length === 0;

const isToken = (node: EslintNode): node is CallExpression =>
	isNodeOfType(node, 'CallExpression') &&
	isNodeOfType(node.callee, 'Identifier') &&
	node.callee.name === 'token';

const getRawExpressionForToken = (node: CallExpression, context: Rule.RuleContext): string => {
	const args = node.arguments;
	const call = `\${token(${args
		.map((argNode) => {
			if (isNodeOfType(argNode, 'Literal')) {
				return argNode.raw;
			}

			if (isNodeOfType(argNode, 'Identifier')) {
				return argNode.name;
			}

			if (isNodeOfType(argNode, 'MemberExpression')) {
				return getValue(argNode, context);
			}
		})
		.join(', ')})}`;
	return call;
};

const isFontSize = (node: EslintNode): node is CallExpression =>
	isNodeOfType(node, 'CallExpression') &&
	isNodeOfType(node.callee, 'Identifier') &&
	(node.callee.name === 'fontSize' || node.callee.name === 'getFontSize');

const isFontSizeSmall = (node: EslintNode): node is CallExpression =>
	isNodeOfType(node, 'CallExpression') &&
	isNodeOfType(node.callee, 'Identifier') &&
	node.callee.name === 'fontSizeSmall';

const getValueFromCallExpression = (node: EslintNode, context: Rule.RuleContext) => {
	if (!isNodeOfType(node, 'CallExpression')) {
		return null;
	}

	if (isGridSize(node)) {
		return 8;
	}

	if (isBorderRadius(node)) {
		return 3;
	}

	if (isFontSize(node)) {
		return 14;
	}

	if (isFontSizeSmall(node)) {
		return 11;
	}

	if (isToken(node)) {
		return getRawExpressionForToken(node, context);
	}

	return null;
};

export const getValue = (
	node: EslintNode,
	context: Rule.RuleContext,
): string | number | (string | number)[] | null | undefined => {
	if (isNodeOfType(node, 'Literal')) {
		return getValueFromShorthand(node.value);
	}

	if (isNodeOfType(node, 'BinaryExpression')) {
		return getValueFromBinaryExpression(node, context);
	}

	if (isNodeOfType(node, 'UnaryExpression')) {
		return getValueFromUnaryExpression(node, context);
	}

	if (isNodeOfType(node, 'CallExpression')) {
		return getValueFromCallExpression(node, context);
	}

	if (isNodeOfType(node, 'Identifier')) {
		return getValueFromIdentifier(node, context);
	}

	if (isNodeOfType(node, 'TemplateLiteral')) {
		return getValueFromTemplateLiteral(node, context);
	}

	return null;
};

export const getRawExpression = (node: EslintNode, context: Rule.RuleContext): string | null => {
	if (
		!(
			// if not one of our recognized types or doesn't have a range prop, early return
			(
				isNodeOfType(node, 'Literal') ||
				isNodeOfType(node, 'Identifier') ||
				isNodeOfType(node, 'BinaryExpression') ||
				isNodeOfType(node, 'UnaryExpression') ||
				isNodeOfType(node, 'TemplateLiteral') ||
				isNodeOfType(node, 'CallExpression')
			)
		) ||
		!Array.isArray(node.range)
	) {
		return null;
	}
	const [start, end] = node.range;

	return getSourceCode(context).getText().substring(start, end).replaceAll('\n', '');
};

const getValueFromIdentifier = (
	node: EslintNode,
	context: Rule.RuleContext,
): number | null | any[] | string | undefined => {
	if (!isNodeOfType(node, 'Identifier')) {
		return null;
	}

	if (node.name === 'gridSize') {
		return 8;
	}

	const scope = getScope(context, node);
	const variable = findIdentifierInParentScope({
		scope,
		identifierName: node.name,
	});

	if (!variable) {
		return null;
	}

	const definition = variable.defs[0];

	if (
		isNodeOfType(definition.node, 'ImportSpecifier') &&
		isNodeOfType(definition.node.parent!, 'ImportDeclaration') &&
		definition.node.parent.source.value === '@atlassian/jira-common-styles/src/main.tsx'
	) {
		return definition.node.imported.name === 'gridSize' ? 8 : null;
	}

	if (!isNodeOfType(definition.node, 'VariableDeclarator')) {
		return null;
	}

	if (!definition.node.init) {
		return null;
	}

	return getValue(definition.node.init, context);
};

const getValueFromUnaryExpression = (
	node: EslintNode,
	context: Rule.RuleContext,
): number | null => {
	if (!isNodeOfType(node, 'UnaryExpression')) {
		return null;
	}

	const value = getValue(node.argument, context);

	if (!value) {
		return null;
	}

	// eslint-disable-next-line no-eval
	return eval(`${node.operator}(${value})`);
};

/**
 * @example
 * ```js
 * `2 ${variable} 0`
 *
 * // results in [2, NaN, 0]
 * ```
 * ```js
 * const variable = 4;
 * `2 ${variable} 0`
 *
 * // results in [2, 4, 0]
 * ```
 */
export const getValueFromTemplateLiteralRaw = (
	node: EslintNode,
	context: Rule.RuleContext,
): string[] | string | null => {
	if (!isNodeOfType(node, `TemplateLiteral`)) {
		return null;
	}

	const combinedString = node.quasis
		.map((q, i) => {
			return `${q.value.raw}${node.expressions[i] ? getValue(node.expressions[i], context) : ''}`;
		})
		.join('')
		.trim();

	const fontFamily = /(sans-serif$)|(monospace$)/;
	if (fontFamily.test(combinedString)) {
		return combinedString;
	}

	return combinedString.split(' ');
};

const getValueFromTemplateLiteral = (
	node: EslintNode,
	context: Rule.RuleContext,
): number[] | string[] | string | null => {
	const value = getValueFromTemplateLiteralRaw(node, context);

	return Array.isArray(value) ? (value.map(removePixelSuffix) as any[]) : value;
};

const getValueFromBinaryExpression = (
	node: EslintNode,
	context: Rule.RuleContext,
): number | null => {
	if (!isNodeOfType(node, 'BinaryExpression')) {
		return null;
	}

	const { left, right, operator } = node;

	const leftValue = getValue(left, context);
	const rightValue = getValue(right, context);
	const final =
		rightValue && leftValue
			? // eslint-disable-next-line no-eval
				eval(`${leftValue}${operator}${rightValue}`)
			: null;

	return final;
};

const emRegex = /(.*\d+)em$/;
const percentageRegex = /(%$)/;

export const emToPixels = <T extends unknown>(value: T, fontSize: number | null | undefined) => {
	if (typeof value === 'string') {
		const emMatch = value.match(emRegex);
		if (emMatch && typeof fontSize === 'number') {
			return Number(emMatch[1]) * fontSize;
		} else if (value.match(percentageRegex)) {
			return value;
		} else {
			return null;
		}
	}
	return value;
};

const percentageOrEmOrAuto = /(%$)|(\d+em$)|(auto$)/;

export const removePixelSuffix = (value: string | number): string | number => {
	if (typeof value === 'string' && (percentageOrEmOrAuto.test(value) || isCalc(value))) {
		return value;
	}

	return Number(typeof value === 'string' ? value.replace('px', '') : value);
};

const invalidSpacingUnitRegex = /(\d+rem$)|(vw$)|(vh$)/;

export const isValidSpacingValue = (
	value: string | number | boolean | RegExp | null | undefined | any[] | bigint,
	fontSize?: number | null | undefined,
) => {
	if (typeof value === 'string') {
		if (invalidSpacingUnitRegex.test(value)) {
			return false;
		}
	} else if (Array.isArray(value)) {
		// could be array due to shorthand
		for (const val in value) {
			if (invalidSpacingUnitRegex.test(val)) {
				return false;
			}
		}
	}

	if (emRegex.test(value as string) && typeof fontSize !== 'number') {
		return false;
	}
	return true;
};

const calcRegex = /(^calc)/;

export const isCalc = (
	value: string | number | boolean | RegExp | null | undefined | any[] | bigint,
) => {
	if (typeof value === 'string') {
		if (calcRegex.test(value)) {
			return true;
		}
	}
	return false;
};

export const isZero = (
	value: string | number | boolean | RegExp | null | undefined | any[] | bigint,
) => {
	if (typeof value === 'string') {
		if (value === '0px' || value === '0') {
			return true;
		}
	}
	if (typeof value === 'number') {
		if (value === 0) {
			return true;
		}
	}
	return false;
};

export const isAuto = (
	value: string | number | boolean | RegExp | null | undefined | any[] | bigint,
) => {
	if (typeof value === 'string') {
		if (value === 'auto') {
			return true;
		}
	}
	return false;
};

// convert line-height to lineHeight
export const convertHyphenatedNameToCamelCase = (prop: string) => {
	return prop.replace(/-./g, (m) => m[1].toUpperCase());
};

/**
 * @param node
 * @returns The furthest parent node that is on the same line as the input node.
 */
export const findParentNodeForLine = (node: Rule.Node): Rule.Node => {
	if (!node.parent) {
		return node;
	}
	if (node.loc?.start.line !== node.parent.loc?.start.line) {
		return node;
	} else {
		return findParentNodeForLine(node.parent);
	}
};

/**
 * Returns an array of domains that are relevant to the provided property based on the rule options.
 * @param propertyName camelCase CSS property
 * @param targetOptions Array containing the types of properties that should be included in the rule.
 * @example
 * ```
 * propertyName: padding, targetOptions: ['spacing'] -> returns ['spacing']
 * propertyName: backgroundColor, targetOptions: ['spacing'] -> returns []
 * propertyName: backgroundColor, targetOptions: ['color', 'spacing'] -> returns ['color']
 * ```
 */
export function getDomainsForProperty(propertyName: string, targetOptions: Domains): Domains {
	const domains: Domains = [];
	if (
		(isColorCssPropertyName(propertyName) || isCurrentSurfaceCustomPropertyName(propertyName)) &&
		targetOptions.includes('color')
	) {
		domains.push('color');
	}

	if (isSpacingProperty(propertyName) && targetOptions.includes('spacing')) {
		domains.push('spacing');
	}

	if (isShapeProperty(propertyName) && targetOptions.includes('shape')) {
		domains.push('shape');
	}

	return domains;
}

/**
 * Function that removes JS comments from a string of code,
 * sometimes makers will have single or multiline comments in their tagged template literals styles, this can mess with our parsing logic.
 */
export function cleanComments(str: string): string {
	return str.replace(/\/\*([\s\S]*?)\*\//g, '').replace(/\/\/(.*)/g, '');
}

/**
 * Returns an array of tuples representing a processed css within `TaggedTemplateExpression` node.
 * Each element of the array is a tuple `[string, string]`,
 * where the first element is the processed css line with computed values
 * and the second element of the tuple is the original css line from source.
 * @param node TaggedTemplateExpression node.
 * @param context Rule.RuleContext.
 * @example
 * ```
 * `[['padding: 8', 'padding: ${gridSize()}'], ['margin: 6', 'margin: 6px' ]]`
 * ```
 */
export function processCssNode(
	node: TaggedTemplateExpression & Rule.NodeParentExtension,
	context: Rule.RuleContext,
): ProcessedCSSLines | undefined {
	const combinedString = node.quasi.quasis
		.map((q, i) => {
			return `${q.value.raw}${
				node.quasi.expressions[i] ? getValue(node.quasi.expressions[i], context) : ''
			}`;
		})
		.join('');

	const rawString = node.quasi.quasis
		.map((q, i) => {
			return `${q.value.raw}${
				node.quasi.expressions[i]
					? getRawExpression(node.quasi.expressions[i], context)
						? `\${${getRawExpression(node.quasi.expressions[i], context)}}`
						: null
					: ''
			}`;
		})
		.join('');
	const cssProperties = splitCssProperties(cleanComments(combinedString));
	const unalteredCssProperties = splitCssProperties(cleanComments(rawString));
	if (cssProperties.length !== unalteredCssProperties.length) {
		// this means something went wrong with the parsing, the original lines can't be reconciled with the processed lines
		return undefined;
	}
	return cssProperties.map((cssProperty, index): [string, string] => [
		cssProperty,
		unalteredCssProperties[index],
	]);
}

/**
 * Returns a token node for a given value including fallbacks.
 * @param propertyName camelCase CSS property
 * @param value string representing pixel value, or font family, or number representing font weight
 * @example
 * ```
 * propertyName: padding, value: '8px' => token('space.100', '8px')
 * propertyName: fontWeight, value: 400 => token('font.weight.regular', '400')
 * ```
 */
export function getTokenNodeForValue(propertyName: string, value: string) {
	const token = findTokenNameByPropertyValue(propertyName, value);
	const fallbackValue =
		propertyName === 'fontFamily' ? { value: `${value}`, raw: `\`${value}\`` } : `${value}`;

	return callExpression({
		callee: identifier({ name: 'token' }),
		arguments: [
			literal({
				value: `'${token ?? ''}'`,
			}),
			literal(fallbackValue),
		],
		optional: false,
	});
}

export function getFontSizeValueInScope(cssProperties: ProcessedCSSLines): number | undefined {
	const fontSizeNode = cssProperties.find(([style]) => {
		const [rawProperty, value] = style.split(':');
		return /font-size/.test(rawProperty) ? value : null;
	});
	if (!fontSizeNode) {
		return undefined;
	}
	const [_, fontSizeValue] = fontSizeNode[0].split(':');
	if (!fontSizeValue) {
		return undefined;
	}
	return getValueFromShorthand(fontSizeValue)[0] as number;
}

/**
 * Attempts to remove all non-essential words & characters from a style block.
 * Including selectors and queries.
 * @param styleString string of css properties
 */
export function splitCssProperties(styleString: string): string[] {
	return (
		styleString
			.split('\n')
			.filter((line) => !line.trim().startsWith('@'))
			// sometimes makers will end a css line with `;` that's output from a function expression
			// since we'll rely on `;` to split each line, we need to ensure it's there
			.map((line) => (line.endsWith(';') ? line : `${line};`))
			.join('\n')
			.replace(/\n/g, '')
			.split(/;|(?<!\$){|(?<!\${.+?)}/) // don't split on template literal expressions i.e. `${...}`
			// filters lines that are completely null, this could be from function expressions that output both property and value
			.filter((line) => line.trim() !== 'null' && line.trim() !== 'null;')
			.map((el) => el.trim() || '')
			// we won't be able to reason about lines that don't have colon (:)
			.filter((line) => line.split(':').length === 2)
			.filter(Boolean)
	);
}

/**
 * Returns whether the current string is a token value.
 * @param originalVaue string representing a css property value e.g 1em, 12px.
 */
export function isTokenValueString(originalValue: string): boolean {
	return originalValue.startsWith('${token(') && originalValue.endsWith('}');
}

export function includesTokenString(originalValue: string): boolean {
	return originalValue.includes('${token(');
}

/**
 * Translate a raw value into the same value format for further parsing:
 *
 * -> for pixels this '8px'
 * -> for weights     '400'
 * -> for family      'Arial'.
 *
 * @internal
 */
export function normaliseValue(propertyName: string, value: string | number): string {
	const isFontStringProperty = /fontWeight|fontFamily|fontStyle/.test(propertyName);
	const isLineHeight = /lineHeight/.test(propertyName);
	const propertyValue = typeof value === 'string' ? value.trim() : value;

	let lookupValue;

	if (isFontStringProperty) {
		lookupValue = `${propertyValue}`;
	} else if (isLineHeight) {
		lookupValue = value === 1 ? `${propertyValue}` : `${propertyValue}px`;
	} else {
		lookupValue = typeof propertyValue === 'string' ? propertyValue : `${propertyValue}px`;
	}

	return lookupValue;
}

export function findTokenNameByPropertyValue(
	propertyName: string,
	value: string,
): string | undefined {
	const lookupValue = normaliseValue(propertyName, value);
	const tokenName = isShapeProperty(propertyName)
		? isBorderSizeProperty(propertyName)
			? borderWidthValueToToken[lookupValue]
			: radiusValueToToken[lookupValue]
		: spacingValueToToken[lookupValue];

	if (!tokenName) {
		return undefined;
	}

	return tokenName;
}

/**
 * Returns a stringifiable node with the token expression corresponding to its matching token.
 * If no token found for the pair the function returns undefined.
 * @param propertyName string camelCased css property.
 * @param value The computed value e.g '8px' -> '8'.
 */
export function getTokenReplacement(propertyName: string, value: string) {
	const tokenName = findTokenNameByPropertyValue(propertyName, value);

	if (!tokenName) {
		return undefined;
	}

	const fallbackValue = normaliseValue(propertyName, value);

	return getTokenNodeForValue(propertyName, fallbackValue);
}

export function getPropertyNodeFromParent(
	property: string,
	parentNode: ObjectExpression & Rule.NodeParentExtension,
) {
	const propertyNode = parentNode.properties.find((node) => {
		if (!isNodeOfType(node, 'Property')) {
			return;
		}

		if (!isNodeOfType(node.key, 'Identifier')) {
			return;
		}

		return node.key.name === property;
	});

	return propertyNode;
}

export function getValueForPropertyNode(
	propertyNode: Property | SpreadElement,
	context: Rule.RuleContext,
): string | number | null | undefined {
	const propertyValueRaw = isNodeOfType(propertyNode!, 'Property')
		? getValue(propertyNode.value, context)
		: null;

	const propertyValue = Array.isArray(propertyValueRaw) ? propertyValueRaw[0] : propertyValueRaw;

	return propertyValue;
}
