import React, { useState } from 'react';

import Tooltip from '@atlaskit/tooltip';

import Toggle from '../src';

export default function Example() {
	const [isAllowed, setIsAllowed] = useState(false);

	return (
		<>
			<label htmlFor="toggle-tooltip">Allow pull requests</label>

			<Tooltip content={isAllowed ? 'Disable pull requests' : 'Enable pull requests'}>
				<Toggle
					id="toggle-tooltip"
					isChecked={isAllowed}
					onChange={() => setIsAllowed((prev) => !prev)}
				/>
			</Tooltip>
		</>
	);
}
