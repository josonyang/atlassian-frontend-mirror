/**
 * Inspired from:
 * https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
 */
const getDeviceInfo = (nAgt: string, nVersion: string) => {
	let os = '';
	let osVersion: string | null = '';

	let clientStrings = [
		{ s: 'Windows 3.11', r: /Win16/ },
		{ s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
		{ s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
		{ s: 'Windows 98', r: /(Windows 98|Win98)/ },
		{ s: 'Windows CE', r: /Windows CE/ },
		{ s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
		{ s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
		{ s: 'Windows Server 2003', r: /Windows NT 5.2/ },
		{ s: 'Windows Vista', r: /Windows NT 6.0/ },
		{ s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
		{ s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
		{ s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
		{ s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
		{ s: 'Android', r: /Android/ },
		{ s: 'Open BSD', r: /OpenBSD/ },
		{ s: 'Sun OS', r: /SunOS/ },
		{ s: 'Linux', r: /(Linux|X11)/ },
		{ s: 'iOS', r: /(iPhone|iPad|iPod)/ },
		{ s: 'Mac OS X', r: /Mac OS X/ },
		{ s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
		{ s: 'QNX', r: /QNX/ },
		{ s: 'UNIX', r: /UNIX/ },
		{ s: 'BeOS', r: /BeOS/ },
		{ s: 'OS/2', r: /OS\/2/ },
		{
			s: 'Search Bot',
			r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
		},
	];
	for (let client in clientStrings) {
		const clientObj = clientStrings[client];
		if (clientObj.r.test(nAgt)) {
			os = clientObj.s;
			break;
		}
	}

	let match;
	if (/Windows/.test(os)) {
		match = /Windows (.*)/.exec(os);
		osVersion = match && match[1];
		os = 'Windows';
	}

	switch (os) {
		case 'Mac OS X':
			match = /Mac OS X (10[\.\_\d]+)/.exec(nAgt);
			osVersion = match && match[1];
			break;
		case 'Android':
			match = /Android ([\.\_\d]+)/.exec(nAgt);
			osVersion = match && match[1];
			break;
		case 'iOS':
			match = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVersion);
			osVersion = match && match[1] + '.' + match[2] + '.' + (match[3] || 0);
	}
	return `${os} ${osVersion}`;
};

export default getDeviceInfo;
