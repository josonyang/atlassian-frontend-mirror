import React from 'react';

import { parseISO } from 'date-fns';

import { DatePicker } from '@atlaskit/datetime-picker';
import { Label } from '@atlaskit/form';
import Heading from '@atlaskit/heading';
import { Box } from '@atlaskit/primitives/compiled';

function getRelativeDate(daysAfter: number) {
	const date = new Date();
	date.setDate(date.getDate() + daysAfter);
	// date-fns version 2 uses a new formatting system
	return date.toISOString();
}

// In this example, range can't be earlier than 30 days ago, and can't be on weekends
const earliestDateString = getRelativeDate(-30);
const latestDateString = getRelativeDate(0);

const weekendFilter = (date: string) => {
	const dayOfWeek = parseISO(date).getDay();
	return dayOfWeek === 0 || dayOfWeek === 6;
};

export default () => {
	const [startDate, setStartDate] = React.useState<string>(getRelativeDate(-14));
	const [endDate, setEndDate] = React.useState<string>(getRelativeDate(0));

	return (
		<Box>
			<Heading size="large"> Export Data </Heading>
			<Label id="start" htmlFor="react-select-start-date--input">
				Start date (past 30 days)
			</Label>
			<DatePicker
				id="react-select-start-date--input"
				clearControlLabel="Clear start date (past 30 days)"
				onChange={(date: string) => setStartDate(date)}
				value={startDate}
				minDate={earliestDateString}
				maxDate={endDate || latestDateString}
				disabledDateFilter={weekendFilter}
				testId={'datepicker-1'}
				shouldShowCalendarButton
				inputLabelId="start"
				openCalendarLabel="open calendar"
			/>

			<Label id="end" htmlFor="react-select-end-date--input">
				End date
			</Label>
			<DatePicker
				id="react-select-end-date--input"
				clearControlLabel="Clear end date"
				value={endDate}
				minDate={startDate || earliestDateString}
				maxDate={latestDateString}
				disabledDateFilter={weekendFilter}
				onChange={(date: string) => setEndDate(date)}
				shouldShowCalendarButton
				inputLabelId="end"
				openCalendarLabel="open calendar"
			/>
		</Box>
	);
};
