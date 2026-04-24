import { getBrowserInfo } from '@atlaskit/editor-common/browser';

export function getUAPrefix(): "" | "ua-chrome" | "ua-ie" | "ua-firefox" | "ua-safari" {
	const browser = getBrowserInfo();
	if (browser.chrome) {
		return 'ua-chrome';
	} else if (browser.ie) {
		return 'ua-ie';
	} else if (browser.gecko) {
		return 'ua-firefox';
	} else if (browser.safari) {
		return 'ua-safari';
	}
	return '';
}
