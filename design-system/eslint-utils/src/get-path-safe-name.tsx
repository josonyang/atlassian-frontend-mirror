/**
 * If it's a nested rule, ensure the url is clean and safe for urls, file paths, etc.
 */
export function getPathSafeName(ruleName: string): string {
	return ruleName.replace('/', '-');
}
