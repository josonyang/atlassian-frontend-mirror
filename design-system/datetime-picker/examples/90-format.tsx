import React from 'react';

import { Label } from '@atlaskit/form';
import Link from '@atlaskit/link';
import { Box, Text } from '@atlaskit/primitives';

import { DatePicker, DateTimePicker, TimePicker } from '../src';

export default () => {
	return (
		<Box>
			<Text as="p">
				Dates & Times can be formatted using any format suported by{' '}
				<Link href="https://date-fns.org/v1.29.0/docs/format" target="_blank">
					date-fns format function
				</Link>
				.
			</Text>
			<Label htmlFor="react-select-time--input">TimePicker - timeFormat (h:mm a)</Label>
			<TimePicker id="react-select-time--input" onChange={console.log} timeFormat="h:mm a" />
			<Label htmlFor="react-select-date--input">DatePicker - dateFormat (DD/MM/YYYY)</Label>
			<DatePicker id="react-select-date--input" onChange={console.log} dateFormat="DD/MM/YYYY" />
			<Label htmlFor="react-select-datetime--input">
				DateTimePicker - dateFormat (HH:mm) & timeFormat (Do MMMM YYYY)
			</Label>
			<DateTimePicker
				id="react-select-datetime--input"
				onChange={console.log}
				timePickerProps={{
					timeFormat: 'HH:mm',
					label: 'Time, DateTimePicker - dateFormat (HH:mm) & timeFormat (Do MMMM YYYY)',
				}}
				datePickerProps={{
					dateFormat: 'Do MMMM YYYY',
					label: 'Date, DateTimePicker - dateFormat (HH:mm) & timeFormat (Do MMMM YYYY)',
				}}
				clearControlLabel="Clear dateTimePicker - dateFormat (HH:mm) & timeFormat (Do MMMM YYYY)"
			/>
		</Box>
	);
};
