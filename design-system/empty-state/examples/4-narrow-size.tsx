import React from 'react';

import EmptyState, { type Width } from '@atlaskit/empty-state';

import exampleImage from './img/example-image.png';

const props = {
	header: 'I am the header',
	description: `Lorem ipsum is a pseudo-Latin text used in web design,
        typography, layout, and printing in place of English to emphasise
        design elements over content. It's also called placeholder (or filler)
        text. It's a convenient tool for mock-ups.`,
	imageUrl: exampleImage,
	width: 'narrow' as Width,
};

export default () => <EmptyState {...props} />;
