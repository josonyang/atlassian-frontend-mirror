import React from 'react';

import { ErroredClient } from '@atlaskit/link-test-helpers';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box, xcss } from '@atlaskit/primitives';

import VRCardView from '../utils/vr-card-view';

const wrapperStyles = xcss({
	width: '100px',
});

export default () => (
	<Box xcss={wrapperStyles}>
		<VRCardView appearance="inline" truncateInline client={new ErroredClient()} />
	</Box>
);
