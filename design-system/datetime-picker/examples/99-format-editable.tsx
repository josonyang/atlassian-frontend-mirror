import React, { useState } from 'react';

import moment from 'moment';

import { DateTimePicker } from '@atlaskit/datetime-picker';
import { Label } from '@atlaskit/form';
import { Box } from '@atlaskit/primitives/compiled';

export default () => {
	const [value, setValue] = useState('2020-06-02T09:30+1000');
	const [invalid, setInvalid] = useState(false);

	const onChange = (value: string) => {
		setValue(value);
		setInvalid(!moment(value).isValid());
	};

	return (
		<Box>
			<Label htmlFor="react-select-datetime--input">Current date and time is: {value}</Label>
			<DateTimePicker
				id="react-select-datetime--input"
				value={value}
				onChange={onChange}
				timePickerProps={{
					label: `Current time`,
					timeIsEditable: true,
				}}
				isInvalid={invalid}
				clearControlLabel="Clear current time"
				datePickerProps={{ shouldShowCalendarButton: true, label: `Current date` }}
			/>
		</Box>
	);
};
