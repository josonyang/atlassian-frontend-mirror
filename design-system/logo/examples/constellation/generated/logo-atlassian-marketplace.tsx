import React from 'react';

import { AtlassianMarketplaceIcon, AtlassianMarketplaceLogo } from '@atlaskit/logo';

import LogoTable from '../utils/logo-table';

export default () => (
	<LogoTable
		logo={<AtlassianMarketplaceLogo appearance="brand" />}
		icon={<AtlassianMarketplaceIcon appearance="brand" />}
	/>
);
