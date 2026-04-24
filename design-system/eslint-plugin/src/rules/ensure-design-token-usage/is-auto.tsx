export const isAuto = (
	value: string | number | boolean | RegExp | null | undefined | any[] | bigint,
): boolean => {
	if (typeof value === 'string') {
		if (value === 'auto') {
			return true;
		}
	}
	return false;
};
