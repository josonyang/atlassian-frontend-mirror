import React from 'react';

import { Box, Inline, xcss } from '@atlaskit/primitives';

import Badge from '../src';

const wrapperStyles = xcss({
	backgroundColor: 'color.background.accent.red.subtlest',
	display: 'flex',
	blockSize: 'size.600',
	inlineSize: 'size.600',
	padding: 'space.100',
});

export default () => {
	return (
		<Box xcss={wrapperStyles}>
			<Inline alignBlock="stretch" alignInline="center" grow="fill">
				{/* this Badge should not stretch vertically */}
				<Badge appearance="primary">{77}</Badge>
			</Inline>
		</Box>
	);
};
