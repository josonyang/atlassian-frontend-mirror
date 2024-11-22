import React from 'react';

import { LinkButton } from '@atlaskit/button/new';

type MyRouterLinkConfig = {
	to: string;
	replace?: boolean;
};

const LinkButtonWithRoutingExample = () => {
	return (
		<LinkButton<MyRouterLinkConfig>
			href={{
				to: '/about',
				replace: true,
			}}
		>
			Link button
		</LinkButton>
	);
};

export default LinkButtonWithRoutingExample;
