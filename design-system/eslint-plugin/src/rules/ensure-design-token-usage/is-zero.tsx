export const isZero = (
	value: string | number | boolean | RegExp | null | undefined | any[] | bigint,
): boolean => {
	if (typeof value === 'string') {
		if (value === '0px' || value === '0') {
			return true;
		}
	}
	if (typeof value === 'number') {
		if (value === 0) {
			return true;
		}
	}
	return false;
};
