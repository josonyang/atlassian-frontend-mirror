import { isImportFromPackage } from './is-import-from-package';

export type AffectedAtlaskitPackages = Record<string, string[]>;

export const getAffectedPackageConfig = (
	source: unknown,
	affectedPackages: AffectedAtlaskitPackages,
): { packageName: string; importNames: string[] } | null => {
	if (typeof source !== 'string') {
		return null;
	}

	const packageName = Object.keys(affectedPackages).find((candidate) =>
		isImportFromPackage(source, candidate),
	);

	if (!packageName) {
		return null;
	}

	return {
		packageName,
		importNames: affectedPackages[packageName],
	};
};
