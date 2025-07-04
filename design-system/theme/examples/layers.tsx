import React from 'react';

import { layers } from '@atlaskit/theme';

export default () => {
	return (
		<div>
			{Object.entries(layers).map(([key, value]) => (
				<div key={key}>{`layers.${key}() // ${value()}`}</div>
			))}
		</div>
	);
};
