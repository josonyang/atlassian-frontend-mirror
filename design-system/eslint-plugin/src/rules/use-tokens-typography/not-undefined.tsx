export function notUndefined<V>(value: V | undefined): value is V {
	return value !== undefined;
}
