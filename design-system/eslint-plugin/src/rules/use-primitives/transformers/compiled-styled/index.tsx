/* eslint-disable @repo/internal/react/require-jsdoc */
import type { Rule } from 'eslint';
import { isNodeOfType, type JSXElement, type VariableDeclarator } from 'eslint-codemod-utils';

import { getScope, getSourceCode } from '@atlaskit/eslint-utils/context-compat';

import * as ast from '../../../../ast-nodes';
import { type RuleConfig } from '../../config';
import { isValidCssPropertiesToTransform } from '../../utils';
import { validateStyles } from '../../utils/validate-styles';

import { convertJsxCallSite } from './convert-jsx-call-site';
import { convertStyledComponentToXcss } from './convert-styled-component-call-to-jsx';
import { findValidJsxUsageToTransform } from './find-valid-jsx-usage-to-transform';
import { findValidStyledComponentCall } from './find-valid-styled-component-call';

interface MetaData {
	context: Rule.RuleContext;
	config: RuleConfig;
}

interface Refs {
	styles: VariableDeclarator;
	jsxElement: JSXElement;
}

type Check = {
	success: boolean;
	refs?: Refs;
};

export const CompiledStyled = {
	lint(node: Rule.Node, { context, config }: MetaData) {
		if (!isNodeOfType(node, 'CallExpression')) {
			return;
		}

		// Check whether all criteria needed to make a transformation are met
		const { success, refs } = CompiledStyled._check(node, { context, config });
		if (!success || !refs) {
			return;
		}

		context.report({
			node: refs.styles,
			messageId: 'preferPrimitivesBox',
			suggest: [
				{
					desc: `Convert ${ast.JSXElement.getName(refs.jsxElement)} to Box`,
					fix: CompiledStyled._fix(refs, context),
				},
			],
		});
	},

	_check(node: Rule.Node, { context, config }: MetaData): Check {
		if (!config.patterns.includes('compiled-styled-object')) {
			return { success: false };
		}

		if (!isNodeOfType(node, 'CallExpression')) {
			return { success: false };
		}

		const styledComponentVariableRef = findValidStyledComponentCall(node);
		if (
			!styledComponentVariableRef ||
			!isNodeOfType(styledComponentVariableRef.id, 'Identifier') ||
			!(config.patterns.includes('string-style-property-fix')
				? validateStyles(node, config)
				: isValidCssPropertiesToTransform(node, config))
		) {
			return { success: false };
		}

		const anyOrder = config.patterns.includes('jsx-order-fix');

		const styledComponentJsxRef = findValidJsxUsageToTransform(
			styledComponentVariableRef.id.name,
			getScope(context, node),
			anyOrder,
		);

		if (!styledComponentJsxRef) {
			return { success: false };
		}

		if (!isNodeOfType(styledComponentJsxRef.parent, 'JSXElement')) {
			return { success: false };
		}

		const importDeclaration = ast.Root.findImportsByModule(
			getSourceCode(context).ast.body,
			'@atlaskit/primitives',
		);

		// If there is more than one `@atlaskit/primitives` import, then it becomes difficult to determine which import to transform
		if (importDeclaration.length > 1) {
			return { success: false };
		}

		return {
			success: true,
			refs: {
				styles: styledComponentVariableRef,
				jsxElement: styledComponentJsxRef.parent,
			},
		};
	},

	/**
	 * All required validation steps have been taken care of before this
	 * transformer is called, so it just goes ahead providing all necessary fixes
	 */
	_fix(refs: Refs, context: Rule.RuleContext): Rule.ReportFixer {
		return (fixer) => {
			// generates the new variable name: MyComponent -> myComponentStyles
			const calculatedStylesVariableName =
				isNodeOfType(refs.styles.id, 'Identifier') &&
				`${refs.styles.id.name.replace(
					refs.styles.id.name[0],
					refs.styles.id.name[0].toLowerCase(),
				)}Styles`;
			if (!calculatedStylesVariableName) {
				return [];
			}

			const importFixes = ast.Root.upsertNamedImportDeclaration(
				{
					module: '@atlaskit/primitives',
					specifiers: ['Box', 'xcss'],
				},
				context,
				fixer,
			);

			const stylesFixes = convertStyledComponentToXcss(
				refs.styles,
				calculatedStylesVariableName,
				fixer,
			);
			const jsxFixes = convertJsxCallSite(refs.jsxElement, calculatedStylesVariableName, fixer);

			return [importFixes, ...stylesFixes, ...jsxFixes].filter((fix): fix is Rule.Fix =>
				Boolean(fix),
			); // Some of the transformers can return arrays with undefined, so filter them out
		};
	},
};
