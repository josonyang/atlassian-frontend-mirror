import React from 'react';

import { Box, Inline, xcss } from '../src';

const blockStyles = xcss({ borderRadius: 'border.radius.050' });

export default () => (
	<Box testId="inline-example" padding="space.100">
		<Inline>
			<Box
				xcss={blockStyles}
				backgroundColor="color.background.discovery.bold"
				padding="space.200"
			/>
			<Box
				xcss={blockStyles}
				backgroundColor="color.background.discovery.bold"
				padding="space.200"
			/>
		</Inline>
	</Box>
);
