import React from 'react';

import { Label } from '@atlaskit/form';
import { RadioSelect } from '@atlaskit/select';

import { cities } from '../common/data';

const SelectRadioExample = () => (
	<>
		<Label htmlFor="radio-select-example">What city do you live in?</Label>
		<RadioSelect
			inputId="radio-select-example"
			testId="react-select"
			options={[
				...cities,
				{
					label: "Super long name that no one will ever read because it's way too long",
					value: 'test',
				},
			]}
			placeholder="Choose a city"
		/>
	</>
);

export default SelectRadioExample;
