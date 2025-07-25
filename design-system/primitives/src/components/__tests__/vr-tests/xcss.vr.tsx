import { snapshot } from '@af/visual-regression';

import Example from '../../../../examples/30-classname-basic';
import MarginExample from '../../../../examples/32-xcss-margin';

snapshot(Example, {
	variants: [
		{
			name: 'default',
			environment: {},
		},
		{
			name: 'light mode',
			environment: {
				colorScheme: 'light',
			},
		},
	],
});

snapshot(MarginExample, {
	variants: [
		{
			name: 'light mode',
			environment: {
				colorScheme: 'light',
			},
		},
	],
});
