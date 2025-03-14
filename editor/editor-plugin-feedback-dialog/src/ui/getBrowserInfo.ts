/**
 * Inspired from:
 * https://stackoverflow.com/questions/11219582/how-to-detect-my-browser-version-and-operating-system-using-javascript
 */
const getBrowserInfo = (nAgt: string) => {
	let browserName;
	let browserVersion;
	let nameOffset;
	let verOffset;
	let index;

	// In Opera 15+, version is after "OPR/"
	// Ignored via go/ees005
	// eslint-disable-next-line no-cond-assign
	if ((verOffset = nAgt.indexOf('OPR/')) !== -1) {
		browserName = 'Opera';
		browserVersion = nAgt.substring(verOffset + 4);
		// Ignored via go/ees005
		// eslint-disable-next-line no-cond-assign
	} else if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
		// In older Opera, version is after "Opera" or after "Version"
		browserName = 'Opera';
		// Ignored via go/ees005
		// eslint-disable-next-line no-cond-assign
		if ((verOffset = nAgt.indexOf('Version')) !== -1) {
			browserVersion = nAgt.substring(verOffset + 8);
		} else {
			browserVersion = nAgt.substring(verOffset + 6);
		}
		// Ignored via go/ees005
		// eslint-disable-next-line no-cond-assign
	} else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
		// In MSIE, version is after "MSIE" in userAgent
		browserName = 'Microsoft Internet Explorer';
		browserVersion = nAgt.substring(verOffset + 5);
		// Ignored via go/ees005
		// eslint-disable-next-line no-cond-assign
	} else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
		// In Chrome, version is after "Chrome"
		browserName = 'Chrome';
		browserVersion = nAgt.substring(verOffset + 7);
		// Ignored via go/ees005
		// eslint-disable-next-line no-cond-assign
	} else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
		// In Safari, version is after "Safari" or after "Version"
		browserName = 'Safari';
		// Ignored via go/ees005
		// eslint-disable-next-line no-cond-assign
		if ((verOffset = nAgt.indexOf('Version')) !== -1) {
			browserVersion = nAgt.substring(verOffset + 8);
		} else {
			browserVersion = nAgt.substring(verOffset + 7);
		}
		// Ignored via go/ees005
		// eslint-disable-next-line no-cond-assign
	} else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
		// In Firefox, version is after "Firefox"
		browserName = 'Firefox';
		browserVersion = nAgt.substring(verOffset + 8);
		// Ignored via go/ees005
		// eslint-disable-next-line no-cond-assign
		// Ignored via go/ees005
		// eslint-disable-next-line no-cond-assign
	} else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
		// In most other browsers, "name/version" is at the end of userAgent
		browserName = nAgt.substring(nameOffset, verOffset);
		browserVersion = nAgt.substring(verOffset + 1);
		if (browserName.toLowerCase() === browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	} else {
		browserName = navigator.appName;
		browserVersion = '' + parseFloat(navigator.appVersion);
	}
	// trim the versionStr string at semicolon/space if present
	// Ignored via go/ees005
	// eslint-disable-next-line no-cond-assign
	if ((index = browserVersion.indexOf(';')) !== -1) {
		browserVersion = browserVersion.substring(0, index);
	}
	// Ignored via go/ees005
	// eslint-disable-next-line no-cond-assign
	if ((index = browserVersion.indexOf(' ')) !== -1) {
		browserVersion = browserVersion.substring(0, index);
	}

	return `${browserName} ${browserVersion}`;
};

export default getBrowserInfo;
