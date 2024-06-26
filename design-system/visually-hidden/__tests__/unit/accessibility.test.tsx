import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '@af/accessibility-testing';

import VisuallyHidden from '../../src';

it('Basic VisuallyHidden example should not fail aXe audit', async () => {
	const { container } = render(<VisuallyHidden>Testing</VisuallyHidden>);
	await axe(container);
});
