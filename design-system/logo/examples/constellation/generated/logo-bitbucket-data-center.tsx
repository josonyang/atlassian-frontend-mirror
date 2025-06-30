import React from 'react';

import { BitbucketDataCenterIcon, BitbucketDataCenterLogo } from '@atlaskit/logo';

import LogoTable from '../utils/logo-table';

export default () => (
	<LogoTable
		logo={<BitbucketDataCenterLogo appearance="brand" />}
		icon={<BitbucketDataCenterIcon appearance="brand" />}
	/>
);
