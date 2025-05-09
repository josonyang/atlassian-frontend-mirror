import React from 'react';

import Badge from '@atlaskit/badge';

export default function Example() {
	return (
		<React.StrictMode>
			<div>
				<p>with no value</p>
				<Badge />
				<p>with a value greater than max value</p>
				<Badge max={99}>{500}</Badge>
				<p>with a value less than max value</p>
				<Badge max={99}>{50}</Badge>
				<p>with a value equal to max value</p>
				<Badge max={99}>{99}</Badge>
				<p>with max value disabled</p>
				<Badge max={false}>{1000}</Badge>
			</div>
		</React.StrictMode>
	);
}
