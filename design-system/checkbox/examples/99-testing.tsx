import React, { PureComponent } from 'react';

import { Checkbox } from '@atlaskit/checkbox';

const BasicUsageExample = class extends PureComponent {
	render() {
		return (
			<div>
				<Checkbox
					value="Basic checkbox"
					label="Basic checkbox"
					name="checkbox-basic"
					testId="the-checkbox"
				/>
			</div>
		);
	}
};

export default BasicUsageExample;
