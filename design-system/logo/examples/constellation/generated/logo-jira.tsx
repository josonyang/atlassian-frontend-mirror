import React from 'react';

import { JiraIcon, JiraLogo } from '@atlaskit/logo';

import LogoTable from '../utils/logo-table';

export default () => (
	<LogoTable
		logo={<JiraLogo appearance="brand" shouldUseNewLogoDesign />}
		icon={<JiraIcon appearance="brand" shouldUseNewLogoDesign />}
	/>
);
