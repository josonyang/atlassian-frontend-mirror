import { Device, snapshot } from '@af/visual-regression';

import UseMediaQueryExample from '../../../../../examples/50-use-media-query-compiled';

snapshot(UseMediaQueryExample, {
	variants: [
		{
			name: 'mobile chrome',
			device: Device.MOBILE_CHROME,
		},
		{
			name: 'desktop chrome',
			device: Device.DESKTOP_CHROME,
		},
	],
});
