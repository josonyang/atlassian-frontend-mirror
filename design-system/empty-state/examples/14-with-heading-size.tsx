import React from 'react';

import EmptyState from '@atlaskit/empty-state';
import type { EmptyStateProps } from '@atlaskit/empty-state/types';
import Image from '@atlaskit/image';
import Text from '@atlaskit/primitives/text';

import exampleImage from './img/example-image.png';

const props = {
	header: 'I am a header with small visual size',
	headingSize: 'xsmall' as EmptyStateProps['headingSize'],
	description: (
		<Text size="small">
			I'm suitable for small spaces such as popups. For best results, use me with a small image and
			small description text like this.
		</Text>
	),
	renderImage: () => <Image src={exampleImage} width={48} alt="" />,
};

export default () => <EmptyState {...props} />;
