import React from 'react';

import { Label } from '@atlaskit/form';
import { Box } from '@atlaskit/primitives';

import { DateTimePicker, TimePicker } from '../src';

export default () => {
	const times: Array<string> = ['10:00', '10:15', '10:30', '10:45', '11:00'];

	return (
		<Box>
			<Label htmlFor="react-select-timepicker-input">TimePicker - times</Label>
			<TimePicker
				id="react-select-timepicker-input"
				times={times}
				selectProps={{ classNamePrefix: 'timepicker-select' }}
				testId={'timePicker'}
			/>
			<Label htmlFor="react-select-datetimepicker--input">DateTimePicker - times</Label>
			<DateTimePicker
				id="react-select-datetimepicker--input"
				timePickerProps={{ label: 'Time, DateTimePicker - times', times }}
				datePickerProps={{ label: 'Date, DateTimePicker - times' }}
			/>
		</Box>
	);
};
