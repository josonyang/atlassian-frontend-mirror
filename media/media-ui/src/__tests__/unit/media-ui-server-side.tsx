import React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { getExamplesFor } from '@atlaskit/ssr';

test.skip('media-ui server side rendering', async () => {
	const examples = await getExamplesFor('media-ui');
	for (const example of examples) {
		const Example = require(example.filePath).default;

		expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
	}
});
