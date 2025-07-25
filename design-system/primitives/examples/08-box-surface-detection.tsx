import React from 'react';

import Heading from '@atlaskit/heading';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box, xcss } from '@atlaskit/primitives';

const containerStyles = xcss({
	position: 'relative',
	width: 'size.1000',
	overflow: 'clip',
});

const headerStyles = xcss({
	position: 'absolute',
	insetBlockStart: 'space.0',
	insetInlineEnd: 'space.0',
	insetInlineStart: 'space.0',
	borderBlockEnd: '1px solid',
	borderColor: 'color.border',
	boxShadow: 'elevation.shadow.overflow',
});

export default () => {
	return (
		<Box backgroundColor="elevation.surface.raised" padding="space.200" xcss={containerStyles}>
			<Box
				backgroundColor="utility.elevation.surface.current"
				padding="space.200"
				xcss={headerStyles}
			>
				<Heading size="small">Header overlay</Heading>
			</Box>
			<p>Some text that is partially covered by the header.</p>
		</Box>
	);
};
