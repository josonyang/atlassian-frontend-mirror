import React, { useState } from 'react';

import { Status } from '@atlaskit/avatar';

const AvatarStatusWidthExample = () => {
	const [width, setWidth] = useState(60);

	return (
		<div>
			<input
				min="10"
				max="130"
				onChange={(e) => setWidth(parseInt(e.target.value, 10))}
				step="10"
				title="Width"
				type="range"
				value={width}
			/>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
			<div style={{ maxWidth: width, border: '1px dotted blue' }}>
				<Status status="approved" />
			</div>
		</div>
	);
};

export default AvatarStatusWidthExample;
