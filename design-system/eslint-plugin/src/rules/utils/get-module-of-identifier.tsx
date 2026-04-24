import type { SourceCode } from 'eslint';

/**
 * Returns the module name of an identifier, if one exists.
 *
 * getModuleOfIdentifier(source, 'Button'); // "@atlaskit/button"
 */
export const getModuleOfIdentifier: (
	source: SourceCode,
	identifierName: string,
) =>
	| {
			moduleName: string;
			importName: string;
	  }
	| undefined = (
	source: SourceCode,
	identifierName: string,
): { moduleName: string; importName: string } | undefined => {
	for (const node of source.ast.body) {
		if (node.type === 'ImportDeclaration') {
			for (const spec of node.specifiers) {
				if (spec.type === 'ImportDefaultSpecifier' && spec.local.name === identifierName) {
					return {
						moduleName: node.source.value + '',
						importName: identifierName,
					};
				}

				if (
					spec.type === 'ImportSpecifier' &&
					'name' in spec.imported &&
					spec.local.name === identifierName
				) {
					return {
						moduleName: node.source.value + '',
						importName: spec.imported.name,
					};
				}
			}
		}
	}

	return undefined;
};
