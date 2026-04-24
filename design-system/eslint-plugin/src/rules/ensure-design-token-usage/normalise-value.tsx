/**
 * Translate a raw value into the same value format for further parsing:
 *
 * -> for pixels this '8px'
 * -> for weights     '400'
 * -> for family      'Arial'.
 *
 * @internal
 */
export function normaliseValue(propertyName: string, value: string | number): string {
	const isFontStringProperty = /fontWeight|fontFamily|fontStyle/.test(propertyName);
	const isLineHeight = /lineHeight/.test(propertyName);
	const propertyValue = typeof value === 'string' ? value.trim() : value;

	let lookupValue;

	if (isFontStringProperty) {
		lookupValue = `${propertyValue}`;
	} else if (isLineHeight) {
		lookupValue = value === 1 ? `${propertyValue}` : `${propertyValue}px`;
	} else {
		lookupValue = typeof propertyValue === 'string' ? propertyValue : `${propertyValue}px`;
	}

	return lookupValue;
}
