import type { Rule } from 'eslint';
import {
	type CallExpression,
	type ExportDefaultDeclaration,
	type ExportNamedDeclaration,
	type Identifier,
	type ImportDeclaration,
	isNodeOfType,
	type Node,
	type VariableDeclaration,
} from 'eslint-codemod-utils';

import {
	addToListOfRanges,
	canAutoMigrateNewIconBasedOnSize,
	canMigrateColor,
	createAutoMigrationError,
	createCantFindSuitableReplacementError,
	createCantMigrateColorError,
	createCantMigrateFunctionUnknownError,
	createCantMigrateIdentifierError,
	createCantMigrateIdentifierMapOrArrayError,
	createCantMigrateReExportError,
	createCantMigrateSizeUnknown,
	createCantMigrateSpreadPropsError,
	createGuidance,
	createHelpers,
	type ErrorListAuto,
	type ErrorListManual,
	getMigrationMapObject,
	getUpcomingIcons,
	type GuidanceList,
	isInRangeList,
	isSize,
	locToString,
	type RangeList,
	type Size,
} from './helpers';

type ReturnObject = {
	checkImportDeclarations: (node: ImportDeclaration & Rule.NodeParentExtension) => void;
	checkVariableDeclarations: (node: VariableDeclaration & Rule.NodeParentExtension) => void;
	checkExportDefaultDeclaration: (
		node: ExportDefaultDeclaration & Rule.NodeParentExtension,
	) => void;
	checkExportNamedVariables: (node: ExportNamedDeclaration & Rule.NodeParentExtension) => void;
	checkArrayOrMap: (node: Identifier) => void;
	checkIconAsProp: (node: Identifier) => void;
	checkIconReference: (node: Identifier & Rule.NodeParentExtension) => void;
	checkJSXElement: (node: Rule.Node) => void;
	checkCallExpression: (node: CallExpression & Rule.NodeParentExtension) => void;
	throwErrors: () => void;
};

export const createChecks = (context: Rule.RuleContext): ReturnObject => {
	//create global variables to be shared by the checks
	const { getPrimaryColor, getConfigFlag } = createHelpers(context);
	const legacyIconImports: { [key: string]: { packageName: string; exported: boolean } } = {};
	const newButtonImports = new Set<string>();

	const errorsManual: ErrorListManual = {};
	const errorsAuto: ErrorListAuto = {};

	let guidance: GuidanceList = {};

	// Extract parameters
	const shouldErrorForManualMigration = getConfigFlag('shouldErrorForManualMigration', true);
	const shouldErrorForAutoMigration = getConfigFlag('shouldErrorForAutoMigration', true);
	const isQuietMode = getConfigFlag('quiet', false);

	// Sorted list of ranges
	let errorRanges: RangeList = [];

	/**
	 * Adds the legacy Icon and new button imports to the correct global arrays to be used by the other checks
	 * @param node The import node found by ESLint
	 */
	const checkImportDeclarations = (node: ImportDeclaration & Rule.NodeParentExtension): void => {
		const moduleSource = node.source.value;

		// Find the imports for legacy icons
		if (
			moduleSource &&
			typeof moduleSource === 'string' &&
			['@atlaskit/icon/glyph/', '@atlaskit/icon-object/glyph/'].find((val) =>
				moduleSource.startsWith(val),
			) &&
			node.specifiers.length > 0
		) {
			for (const spec of node.specifiers) {
				if (spec.local.name) {
					legacyIconImports[spec.local.name] = {
						packageName: moduleSource,
						exported: false,
					};
				}
			}
		}

		// Find the imports for new button and IconButton
		if (
			typeof moduleSource === 'string' &&
			moduleSource.startsWith('@atlaskit/button/new') &&
			node.specifiers.length
		) {
			for (const spec of node.specifiers) {
				if (spec.type === 'ImportDefaultSpecifier') {
					newButtonImports.add(spec.local.name);
				} else if (spec.type === 'ImportSpecifier' && spec.imported.name === 'IconButton') {
					newButtonImports.add(spec.local.name);
				}
			}
		}
	};

	/**
	 * Adds the legacy Icon and new button variable reassignments to the correct global arrays to be used by the other checks
	 * @param node The variable reassignment node found by ESLint
	 */
	const checkVariableDeclarations = (
		node: VariableDeclaration & Rule.NodeParentExtension,
	): void => {
		if (isNodeOfType(node, 'VariableDeclaration')) {
			const isExported = node.parent && isNodeOfType(node.parent, 'ExportNamedDeclaration');
			for (const decl of node.declarations) {
				if (
					isNodeOfType(decl, 'VariableDeclarator') &&
					Object.keys(decl).includes('init') &&
					Object.keys(decl).includes('id') &&
					decl.init &&
					decl.id &&
					'name' in decl.id &&
					decl.id.name &&
					isNodeOfType(decl.init, 'Identifier')
				) {
					if (Object.keys(legacyIconImports).includes(decl.init.name)) {
						legacyIconImports[decl.id.name] = {
							packageName: legacyIconImports[decl.init.name].packageName,
							exported: legacyIconImports[decl.init.name].exported || isExported,
						};
					} else if (newButtonImports.has(decl.init.name)) {
						newButtonImports.add(decl.id.name);
					}
				}
			}
		}
	};

	/**
	 * Checks if the default export is a re-export of a legacy icon and stores the errors in the global array
	 * @param node The default export node found by ESLint
	 */
	const checkExportDefaultDeclaration = (
		node: ExportDefaultDeclaration & Rule.NodeParentExtension,
	): void => {
		let exportName = '';
		let packageName = '';
		if (
			Object.keys(node).includes('declaration') &&
			node.declaration &&
			isNodeOfType(node.declaration, 'Identifier') &&
			Object.keys(legacyIconImports).includes(node.declaration.name)
		) {
			packageName = legacyIconImports[node.declaration.name].packageName;
			exportName = 'Default export';
		} else if (
			Object.keys(node).includes('declaration') &&
			node.declaration &&
			isNodeOfType(node.declaration, 'AssignmentExpression') &&
			isNodeOfType(node.declaration.left, 'Identifier') &&
			isNodeOfType(node.declaration.right, 'Identifier') &&
			Object.keys(legacyIconImports).includes(node.declaration.right.name)
		) {
			packageName = legacyIconImports[node.declaration.right.name].packageName;
			exportName = node.declaration.left.name;
		} else {
			return;
		}
		createCantMigrateReExportError(node, packageName, exportName, errorsManual);
		addToListOfRanges(node, errorRanges);
		guidance[locToString(node)] = createGuidance(packageName);
	};

	/**
	 * Checks if the named exports are re-exports of a legacy icon and stores the errors in the global array
	 * @param node The named export node found by ESLint
	 */
	const checkExportNamedVariables = (
		node: ExportNamedDeclaration & Rule.NodeParentExtension,
	): void => {
		// export {default as AddIcon} from '@atlaskit/icon/glyph/add';
		if (
			node.source &&
			isNodeOfType(node.source, 'Literal') &&
			Object.keys(node.source).includes('value')
		) {
			const moduleSource = node.source.value;
			if (
				typeof moduleSource === 'string' &&
				['@atlaskit/icon/glyph/', '@atlaskit/icon-object/glyph/'].find((val) =>
					moduleSource.startsWith(val),
				) &&
				node.specifiers.length
			) {
				for (const spec of node.specifiers) {
					createCantMigrateReExportError(spec, moduleSource, spec.exported.name, errorsManual);
					addToListOfRanges(spec, errorRanges);
					guidance[locToString(spec)] = createGuidance(moduleSource);
				}
			}
		} else if (node.declaration && isNodeOfType(node.declaration, 'VariableDeclaration')) {
			// export const Icon = AddIcon;
			for (const decl of node.declaration.declarations) {
				if (
					isNodeOfType(decl, 'VariableDeclarator') &&
					Object.keys(decl).includes('init') &&
					decl.init &&
					isNodeOfType(decl.init, 'Identifier') &&
					Object.keys(legacyIconImports).includes(decl.init.name)
				) {
					createCantMigrateReExportError(
						node,
						legacyIconImports[decl.init.name].packageName,
						decl.init.name,
						errorsManual,
					);
					addToListOfRanges(node, errorRanges);
					guidance[locToString(node)] = createGuidance(
						legacyIconImports[decl.init.name].packageName,
					);
				}
			}
		} else if (!node.source && node.specifiers && node.specifiers.length > 0) {
			/**
			 * case where multiple consts are re-exported:
			 * const AddIcon = LegacyIcon;
			 * const crossIcon = LegacyIcon2;
			 * export { AddIcon, CrossIcon as default }
			 */
			for (const spec of node.specifiers) {
				if (Object.keys(legacyIconImports).includes(spec.local.name)) {
					//update legacy imports to be exported
					legacyIconImports[spec.local.name] = {
						packageName: legacyIconImports[spec.local.name].packageName,
						exported: true,
					};
					createCantMigrateReExportError(
						spec,
						legacyIconImports[spec.local.name].packageName,
						spec.exported.name,
						errorsManual,
					);
					addToListOfRanges(spec, errorRanges);
					guidance[locToString(spec)] = createGuidance(
						legacyIconImports[spec.local.name].packageName,
					);
				}
			}
		}
	};

	/**
	 * Checks if a legacy icon is referenced in an array or map and stores the errors in the global array
	 * @param node The array/map node found by ESLint
	 */
	const checkArrayOrMap = (node: Identifier): void => {
		if (!isNodeOfType(node, 'Identifier')) {
			return;
		}
		if (
			node.name &&
			Object.keys(legacyIconImports).includes(node.name) &&
			legacyIconImports[node.name].packageName
		) {
			createCantMigrateIdentifierMapOrArrayError(
				node,
				legacyIconImports[node.name].packageName,
				node.name,
				errorsManual,
			);
			addToListOfRanges(node, errorRanges);
			guidance[locToString(node)] = createGuidance(legacyIconImports[node.name].packageName);
		}
	};

	/**
	 * Checks if a legacy icon is referenced as a prop to a component and stores the errors in the global array
	 * @param node The property node found by ESLint
	 */
	const checkIconAsProp = (node: Identifier): void => {
		if (!isNodeOfType(node, 'Identifier')) {
			return;
		}
		if (!node.parent || !node.parent.parent || !node.parent.parent.parent) {
			return;
		}
		if (
			!isNodeOfType(node.parent, 'JSXExpressionContainer') ||
			!isNodeOfType(node.parent.parent, 'JSXAttribute') ||
			!isNodeOfType(node.parent.parent.parent, 'JSXOpeningElement')
		) {
			return;
		}

		if (
			Object.keys(legacyIconImports).includes(node.name) &&
			isNodeOfType(node.parent.parent.name, 'JSXIdentifier') &&
			node.parent.parent.name.name !== 'LEGACY_fallbackIcon'
		) {
			const migrationMapObject = getMigrationMapObject(legacyIconImports[node.name].packageName);
			const upcomingIcon = getUpcomingIcons(legacyIconImports[node.name].packageName);
			const newIcon = migrationMapObject?.newIcon;
			const isNewIconMigratable = canAutoMigrateNewIconBasedOnSize(
				upcomingIcon ? upcomingIcon.sizeGuidance.medium : migrationMapObject?.sizeGuidance?.medium,
			);
			const isInNewButton =
				isNodeOfType(node.parent.parent.parent.name, 'JSXIdentifier') &&
				newButtonImports.has(node.parent.parent.parent.name.name);
			if (
				(newIcon && isInNewButton && isNewIconMigratable) ||
				(upcomingIcon && isInNewButton && isNewIconMigratable)
			) {
				createAutoMigrationError(
					node,
					legacyIconImports[node.name].packageName,
					node.name,
					errorsAuto,
				);
				addToListOfRanges(node, errorRanges);
				guidance[locToString(node)] = createGuidance(
					legacyIconImports[node.name].packageName,
					isInNewButton,
					'medium',
				);
			} else if ((!newIcon && !upcomingIcon) || !isNewIconMigratable) {
				createCantFindSuitableReplacementError(
					node,
					legacyIconImports[node.name].packageName,
					node.name,
					errorsManual,
				);
				addToListOfRanges(node, errorRanges);
				guidance[locToString(node)] = createGuidance(
					legacyIconImports[node.name].packageName,
					isInNewButton,
				);
			} else if (!isInNewButton) {
				createCantMigrateFunctionUnknownError(
					node,
					legacyIconImports[node.name].packageName,
					node.name,
					errorsManual,
				);
				addToListOfRanges(node, errorRanges);
				guidance[locToString(node)] = createGuidance(
					legacyIconImports[node.name].packageName,
					isInNewButton,
				);
			}
		}
	};

	const checkIconReference = (node: Identifier & Rule.NodeParentExtension): void => {
		//check the reference to see if it's a legacy icon, if not exit early
		if (!Object.keys(legacyIconImports).includes(node.name)) {
			return;
		}
		//if this is an import statement then exit early
		if (
			node.parent &&
			(isNodeOfType(node.parent, 'ImportSpecifier') ||
				isNodeOfType(node.parent, 'ImportDefaultSpecifier'))
		) {
			return;
		}
		//if in Fallback prop, do not error
		if (
			node.parent &&
			node.parent.parent &&
			isNodeOfType(node.parent.parent, 'JSXAttribute') &&
			isNodeOfType(node.parent.parent.name, 'JSXIdentifier') &&
			node.parent.parent.name.name === 'LEGACY_fallbackIcon'
		) {
			return;
		}
		// manually error
		createCantMigrateIdentifierError(
			node,
			legacyIconImports[node.name].packageName,
			node.name,
			errorsManual,
		);
	};

	/**
	 * Checks if a legacy icon is being rendered and stores the errors in the global array
	 * @param node The JSX node found by ESLint
	 */
	const checkJSXElement = (node: Rule.Node): void => {
		if (!('openingElement' in node) || !isNodeOfType(node.openingElement.name, 'JSXIdentifier')) {
			return;
		}

		// Determine if element is rendered inside LEGACY_fallbackIcon prop - if so, don't perform any checks
		if (
			node.parent &&
			isNodeOfType(node.parent, 'ArrowFunctionExpression') &&
			node.parent?.parent?.parent &&
			isNodeOfType(node.parent.parent.parent, 'JSXAttribute') &&
			node.parent.parent.parent.name?.name === 'LEGACY_fallbackIcon'
		) {
			return;
		}

		const name = node.openingElement.name.name;
		// Legacy icons rendered as JSX elements
		if (Object.keys(legacyIconImports).includes(name)) {
			// Determine if inside a new button - if so:
			// - Assume spread props are safe - still error if props explicitly set to unmigratable values
			let insideNewButton = false;
			if (
				node.parent &&
				isNodeOfType(node.parent, 'ArrowFunctionExpression') &&
				node.parent?.parent?.parent &&
				isNodeOfType(node.parent.parent.parent, 'JSXAttribute') &&
				isNodeOfType(node.parent.parent.parent.name, 'JSXIdentifier') &&
				node.parent?.parent?.parent?.parent &&
				isNodeOfType(node.parent.parent.parent.parent, 'JSXOpeningElement') &&
				isNodeOfType(node.parent.parent.parent.parent.name, 'JSXIdentifier') &&
				newButtonImports.has(node.parent.parent.parent.parent.name.name)
			) {
				insideNewButton = true;
			}

			// Find size prop on node
			let size: Size | null = 'medium';
			let primaryColor: string | null = null;
			let afterSpreadSet = new Set<string>();
			let requiredAttributesAfterSpread = new Set(['size', 'primaryColor', 'secondaryColor']);
			let hasSpread = false;
			let hasPrimaryColorProp = false;

			for (const attr of node.openingElement.attributes) {
				// Detect spread props
				if (isNodeOfType(attr, 'JSXSpreadAttribute')) {
					// In case there are more spread props
					afterSpreadSet.clear();
					hasSpread = true;
					continue;
				}

				if (
					!isNodeOfType(attr, 'JSXAttribute') ||
					!isNodeOfType(attr.name, 'JSXIdentifier') ||
					!attr.value
				) {
					continue;
				}

				// Register props that aren't being spread
				afterSpreadSet.add(attr.name.name);

				// Extract values of props
				switch (attr.name.name) {
					case 'size':
						if (isNodeOfType(attr.value, 'Literal') && isSize(attr.value.value)) {
							size = attr.value.value;
						} else if (
							isNodeOfType(attr.value, 'JSXExpressionContainer') &&
							isNodeOfType(attr.value.expression, 'Literal') &&
							isSize(attr.value.expression.value)
						) {
							size = attr.value.expression.value;
						} else {
							size = null;
						}
						break;

					case 'primaryColor':
						primaryColor = getPrimaryColor(attr);
						hasPrimaryColorProp = true;
						break;
				}
			}

			let hasManualMigration = false;
			if (
				(primaryColor && !canMigrateColor(primaryColor)) ||
				(hasPrimaryColorProp && !primaryColor)
			) {
				createCantMigrateColorError(
					node,
					primaryColor ? `the value of '${primaryColor}'` : 'a statically unknown value',
					errorsManual,
					legacyIconImports[name].packageName,
					name,
				);
				hasManualMigration = true;
			}

			// If size can't be determined (i.e. size is a variable or function call, etc)
			// then we need to error; icon can't be auto-migrated safely
			if (size === null) {
				createCantMigrateSizeUnknown(node, errorsManual, legacyIconImports[name].packageName, name);
				hasManualMigration = true;
			}
			// Do a set comparison - is requiredAttributesAfterSpread a subset of afterSpreadSet?
			if (
				hasSpread === true &&
				!Array.from(requiredAttributesAfterSpread).every((val) => afterSpreadSet.has(val)) &&
				!insideNewButton
			) {
				const missingProps = Array.from(requiredAttributesAfterSpread).filter(
					(val) => !afterSpreadSet.has(val),
				);
				createCantMigrateSpreadPropsError(
					node,
					missingProps,
					errorsManual,
					legacyIconImports[name].packageName,
					name,
				);
				hasManualMigration = true;
			}
			// Check if it is an exported component?
			if (legacyIconImports[name].exported) {
				createCantMigrateReExportError(
					node,
					legacyIconImports[name].packageName,
					name,
					errorsManual,
				);
				hasManualMigration = true;
			}
			const migrationMapObject = getMigrationMapObject(legacyIconImports[name].packageName);
			const upcomingIcon = getUpcomingIcons(legacyIconImports[name].packageName);
			const newIcon = migrationMapObject?.newIcon;
			const isNewIconMigratable = canAutoMigrateNewIconBasedOnSize(
				upcomingIcon
					? upcomingIcon.sizeGuidance[size ?? 'medium']
					: migrationMapObject?.sizeGuidance[size ?? 'medium'],
			);
			if (!hasManualMigration && (newIcon || upcomingIcon) && isNewIconMigratable) {
				createAutoMigrationError(node, legacyIconImports[name].packageName, name, errorsAuto);
			} else if (((!newIcon && !upcomingIcon) || !isNewIconMigratable) && size) {
				createCantFindSuitableReplacementError(
					node,
					legacyIconImports[name].packageName,
					name,
					errorsManual,
					upcomingIcon ? true : migrationMapObject ? true : false,
				);
			}
			addToListOfRanges(node, errorRanges);
			guidance[locToString(node)] = createGuidance(
				legacyIconImports[name].packageName,
				insideNewButton,
				size && isSize(size) ? size : undefined,
			);
		}
	};

	/**
	 * Checks if a legacy icon is being passed into a function call and stores the errors in the global array
	 * @param node The function call node found by ESLint
	 */
	const checkCallExpression = (node: CallExpression & Rule.NodeParentExtension): void => {
		if (Object.keys(node).includes('arguments') && node.arguments.length) {
			for (const arg of node.arguments) {
				if (
					isNodeOfType(arg, 'Identifier') &&
					Object.keys(legacyIconImports).includes(arg.name) &&
					legacyIconImports[arg.name].packageName
				) {
					createCantMigrateFunctionUnknownError(
						node,
						legacyIconImports[arg.name].packageName,
						arg.name,
						errorsManual,
					);
					addToListOfRanges(node, errorRanges);
					guidance[locToString(node)] = createGuidance(legacyIconImports[arg.name].packageName);
				}
			}
		}
	};

	/**
	 * Throws the relevant errors in the correct order based on configs.
	 */
	const throwErrors = (): void => {
		if (shouldErrorForManualMigration) {
			for (const [key, errorList] of Object.entries(errorsManual)) {
				const node: Node | null = 'node' in errorList.errors[0] ? errorList.errors[0].node : null;
				const cantMigrateIdentifierError = errorList.errors.find(
					(x) => 'messageId' in x && x.messageId === 'cantMigrateIdentifier',
				);
				if (node) {
					let isInRange = false;
					if (cantMigrateIdentifierError && isInRangeList(node, errorRanges)) {
						isInRange = true;
					}
					if (
						(isInRange && errorList.errors.length - 1 > 0) ||
						(!isInRange && errorList.errors.length > 0)
					) {
						const guidanceMessage = Object.keys(guidance).includes(key) ? guidance[key] : '';
						context.report({
							node,
							messageId: 'noLegacyIconsManualMigration',
							data: {
								iconName: errorList.iconName,
								importSource: errorList.importSource,
								guidance: isQuietMode
									? guidanceMessage
									: `${guidanceMessage}For more information see the below errors.\n`,
							},
						});
						if (!isQuietMode) {
							for (const error of errorList.errors) {
								if (
									'messageId' in error &&
									(error.messageId !== 'cantMigrateIdentifier' ||
										(error.messageId === 'cantMigrateIdentifier' && !isInRange))
								) {
									context.report(error);
								}
							}
						}
					}
				}
			}
		}
		if (shouldErrorForAutoMigration) {
			for (const [key, error] of Object.entries(errorsAuto)) {
				// If there's a manual error that exists for this same component,
				// don't throw the auto error
				if (Object.keys(errorsManual).includes(key)) {
					const cantMigrateIdentifierError = errorsManual[key].errors.find(
						(x) => 'messageId' in x && x.messageId === 'cantMigrateIdentifier',
					);
					if (
						!cantMigrateIdentifierError ||
						(cantMigrateIdentifierError && errorsManual[key].errors.length > 1)
					) {
						delete errorsAuto[key];
						continue;
					}
				}
				const node = 'node' in error ? error.node : null;
				if (node) {
					const guidanceMessage = Object.keys(guidance).includes(key) ? guidance[key] : '';
					if (Object.keys(error).includes('data') && error.data) {
						error.data.guidance = guidanceMessage;
					}
					context.report(error);
				}
			}
		}
	};

	return {
		checkImportDeclarations,
		checkVariableDeclarations,
		checkExportDefaultDeclaration,
		checkExportNamedVariables,
		checkArrayOrMap,
		checkIconAsProp,
		checkJSXElement,
		checkCallExpression,
		throwErrors,
		checkIconReference,
	};
};
