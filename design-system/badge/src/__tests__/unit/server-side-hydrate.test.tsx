import React from 'react';

import { doesHydrateWithSsr } from '@atlassian/ssr-tests';

import Example from '../../../examples/0-basic';

test('should ssr then hydrate correctly', async () => {
	expect(await doesHydrateWithSsr(<Example />)).toBe(true);
});
