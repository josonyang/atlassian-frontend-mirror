/**
 * Takes a template literal and returns [key, value] array of the css properties
 */
export const makeTemplateLiteralIntoEntries: (templateString: string) => string[][] = (
	templateString: string,
) => {
	return templateString
		.replace(/\n/g, '')
		.split(/;|{|}/)
		.filter((el) => !el.match(/\@/))
		.map((el) =>
			el
				.trim()
				.split(':')
				.map((e) => e.trim()),
		);
};
