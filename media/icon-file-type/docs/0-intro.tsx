import React from 'react';
import { md } from '@atlaskit/docs';
import { DocsContentTabs } from '@atlaskit/media-test-helpers';
import UsageTab from './content/usage';
import PropsDefinitionTab from './content/props-definition';

export default md`
### Description
This package provides the collections of icons for the different types of content used across Atlassian products.

  ${(
		<DocsContentTabs
			tabs={[
				{ name: 'Usage', content: UsageTab },
				{ name: 'Props Definition', content: PropsDefinitionTab },
			]}
		/>
	)}
`;
