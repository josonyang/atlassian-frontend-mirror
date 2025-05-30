import type { ViewportEntryData } from '../../types';

function isViewportEntryData(data: any): data is ViewportEntryData {
	if (data) {
		const hasElementName = typeof data.elementName === 'string';
		const hasRect = typeof data.rect !== 'undefined';

		if (hasRect && hasElementName) {
			return true;
		}
	}
	return false;
}

export default isViewportEntryData;
