// convert line-height to lineHeight
export const convertHyphenatedNameToCamelCase = (prop: string): string => {
	return prop.replace(/-./g, (m) => m[1].toUpperCase());
};
