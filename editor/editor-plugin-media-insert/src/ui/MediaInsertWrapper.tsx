import React from 'react';

import { Box, xcss } from '@atlaskit/primitives';

const styles = xcss({
	boxShadow: 'elevation.shadow.overflow',
	width: '340px',
	padding: 'space.200',
	borderRadius: 'border.radius',
	backgroundColor: 'elevation.surface.overlay',
});

export const MediaInsertWrapper = ({ children }: { children?: React.ReactNode }) => {
	return <Box xcss={styles}>{children}</Box>;
};
