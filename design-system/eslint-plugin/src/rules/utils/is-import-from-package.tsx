/**
 * Returns true when an import source is either the package root or one of its subpath entrypoints.
 */
export function isImportFromPackage(source: unknown, packageName: string): source is string {
	return (
		typeof source === 'string' && (source === packageName || source.startsWith(`${packageName}/`))
	);
}
