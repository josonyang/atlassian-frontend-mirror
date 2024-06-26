import React from 'react';

import { Inline, xcss } from '@atlaskit/primitives';

import Image from '../../src';
import ExampleImage from '../images/Celebration.png';

const containerStyles = xcss({
	height: '100%',
});

const ImageDefaultExample = () => {
	return (
		<Inline alignBlock="center" alignInline="center" xcss={containerStyles}>
			<Image src={ExampleImage} alt="Simple example" testId="image" />
		</Inline>
	);
};

export default ImageDefaultExample;
