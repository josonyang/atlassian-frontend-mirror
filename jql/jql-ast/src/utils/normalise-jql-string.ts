export const isSingleQuoted = (maybeQuotedString: string) => {
	if (maybeQuotedString.length < 2) {
		return false;
	}

	return (
		maybeQuotedString[0] === "'" &&
		maybeQuotedString[maybeQuotedString.length - 1] === "'" &&
		maybeQuotedString[maybeQuotedString.length - 2] !== '\\'
	);
};

export const isDoubleQuoted = (maybeQuotedString: string) => {
	if (maybeQuotedString.length < 2) {
		return false;
	}

	return (
		maybeQuotedString[0] === '"' &&
		maybeQuotedString[maybeQuotedString.length - 1] === '"' &&
		maybeQuotedString[maybeQuotedString.length - 2] !== '\\'
	);
};

export const isQuoted = (maybeQuotedString: string) =>
	isSingleQuoted(maybeQuotedString) || isDoubleQuoted(maybeQuotedString);

/**
 * Normalizes a string by removing surrounding quotes and unescaping corresponding escaped quotes
 * @param maybeQuotedString string to remove surrounding quotes from
 * @returns {string} unquoted, unescaped string
 */
export const normaliseJqlString = (maybeQuotedString: string) => {
	if (isQuoted(maybeQuotedString)) {
		return maybeQuotedString.slice(1, -1).replace(/(?:\\(.))/g, '$1');
	}

	if (maybeQuotedString.startsWith('"') || maybeQuotedString.startsWith("'")) {
		return maybeQuotedString.slice(1).replace(/(?:\\(.))/g, '$1');
	}

	return maybeQuotedString;
};
