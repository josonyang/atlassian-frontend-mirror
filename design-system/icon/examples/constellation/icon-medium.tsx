import React from 'react';

import LikeIcon from '@atlaskit/icon/glyph/like';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box } from '@atlaskit/primitives';

const IconMediumExample = () => {
	return (
		<Box>
			<LikeIcon size="medium" label="" />
		</Box>
	);
};

export default IconMediumExample;
