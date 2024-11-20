import React from 'react';

import { Label } from '@atlaskit/form';
import TextArea from '@atlaskit/textarea';

export default function TextAreaAppearanceStandard() {
	return (
		<>
			<Label htmlFor="standard-appearance">Standard appearance</Label>
			<TextArea
				appearance="standard"
				id="standard-appearance"
				name="standard-appearance"
				placeholder="Enter your details here"
			/>
		</>
	);
}
