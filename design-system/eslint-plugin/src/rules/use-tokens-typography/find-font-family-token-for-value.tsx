export function findFontFamilyTokenForValue(
	value: string,
):
	| 'font.family.brand.heading'
	| 'font.family.brand.body'
	| 'font.family.body'
	| 'font.family.code'
	| undefined {
	if (/charlie[\s-]?display/i.test(value)) {
		return 'font.family.brand.heading';
	} else if (/charlie[\s-]?text/i.test(value)) {
		return 'font.family.brand.body';
	} else if (/sans[\s-]?serif/i.test(value)) {
		return 'font.family.body';
	} else if (/monospace/i.test(value)) {
		return 'font.family.code';
	}
}
