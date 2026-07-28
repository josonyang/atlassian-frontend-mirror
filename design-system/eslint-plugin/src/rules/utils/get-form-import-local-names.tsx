import { type ImportDeclaration, isNodeOfType } from 'eslint-codemod-utils';

export const FORM_PACKAGE = '@atlaskit/form';

export type TrackedFormImport =
	| 'Form'
	| 'Field'
	| 'MessageWrapper'
	| 'ErrorMessage'
	| 'HelperMessage'
	| 'ValidMessage'
	| 'CheckboxField'
	| 'RangeField'
	| 'CharacterCounterField';

export type FormImportLocalNames = Partial<Record<TrackedFormImport, string[]>>;

const namedBarrelImports = new Set<TrackedFormImport>([
	'Field',
	'MessageWrapper',
	'ErrorMessage',
	'HelperMessage',
	'ValidMessage',
	'CheckboxField',
	'RangeField',
	'CharacterCounterField',
]);

const namedMessagesImports = new Set<TrackedFormImport>([
	'MessageWrapper',
	'ErrorMessage',
	'HelperMessage',
	'ValidMessage',
]);

const defaultImportSources: Record<TrackedFormImport, string[]> = {
	Form: ['@atlaskit/form/form', '@atlaskit/form/Form'],
	Field: ['@atlaskit/form/field', '@atlaskit/form/Field'],
	MessageWrapper: [],
	ErrorMessage: [],
	HelperMessage: [],
	ValidMessage: [],
	CheckboxField: ['@atlaskit/form/checkbox-field', '@atlaskit/form/CheckboxField'],
	RangeField: ['@atlaskit/form/range-field', '@atlaskit/form/RangeField'],
	CharacterCounterField: [
		'@atlaskit/form/character-counter-field',
		'@atlaskit/form/CharacterCounterField',
	],
};

const appendImport = (
	imports: FormImportLocalNames,
	importName: TrackedFormImport,
	localName: string,
) => {
	const existing = imports[importName] ?? [];
	existing.push(localName);
	imports[importName] = existing;
};

export const getFormImportLocalNames = (node: ImportDeclaration): FormImportLocalNames => {
	const source = node.source.value;

	if (typeof source !== 'string' || !node.specifiers.length) {
		return {};
	}

	const imports: FormImportLocalNames = {};

	if (source === FORM_PACKAGE) {
		node.specifiers.forEach((spec) => {
			if (isNodeOfType(spec, 'ImportDefaultSpecifier')) {
				appendImport(imports, 'Form', spec.local.name);
				return;
			}

			if (
				isNodeOfType(spec, 'ImportSpecifier') &&
				'name' in spec.imported &&
				namedBarrelImports.has(spec.imported.name as TrackedFormImport)
			) {
				appendImport(imports, spec.imported.name as TrackedFormImport, spec.local.name);
			}
		});

		return imports;
	}

	if (source === '@atlaskit/form/messages' || source === '@atlaskit/form/Messages') {
		node.specifiers.forEach((spec) => {
			if (
				isNodeOfType(spec, 'ImportSpecifier') &&
				'name' in spec.imported &&
				namedMessagesImports.has(spec.imported.name as TrackedFormImport)
			) {
				appendImport(imports, spec.imported.name as TrackedFormImport, spec.local.name);
			}
		});

		return imports;
	}

	(Object.entries(defaultImportSources) as Array<[TrackedFormImport, string[]]>).forEach(
		([importName, importSources]) => {
			if (!importSources.includes(source)) {
				return;
			}

			node.specifiers.forEach((spec) => {
				if (isNodeOfType(spec, 'ImportDefaultSpecifier')) {
					appendImport(imports, importName, spec.local.name);
				}
			});
		},
	);

	return imports;
};
