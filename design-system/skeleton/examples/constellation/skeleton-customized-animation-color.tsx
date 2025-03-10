import React from 'react';

import Skeleton from '@atlaskit/skeleton';
import { token } from '@atlaskit/tokens';

export default () => (
	<Skeleton
		width="200px"
		height="16px"
		color={token('color.background.accent.gray.subtle')}
		ShimmeringEndColor={token('color.background.accent.gray.bolder')}
		testId="skeleton"
	/>
);
