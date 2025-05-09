import React from 'react';

import moment from 'moment';

import { DateTimePicker } from '@atlaskit/datetime-picker';
import { Label } from '@atlaskit/form';
import { Box } from '@atlaskit/primitives/compiled';

// 8 AM in GMT+8
const jiraServerValueConvertedToHKTime = '2018-05-02T08:00:00.000+0800';

const logValue = (value: string) => console.log(value);

const parseValue = (value: string, date: string, time: string, timezone: string) => {
	const parsed = moment(value).parseZone();
	const returnObject = {
		dateValue: parsed.isValid() ? parsed.format('YYYY-MM-DD') : date,
		timeValue: parsed.isValid() ? parsed.format('HH:mm') : time,
		zoneValue: parsed.isValid() ? parsed.format('ZZ') : timezone,
	};
	return returnObject;
};

export default () => (
	<Box>
		<Label htmlFor="timezone-compat">Timezone Compatible Datetime</Label>
		<DateTimePicker
			id="timezone-compat"
			onChange={logValue}
			parseValue={parseValue}
			defaultValue={jiraServerValueConvertedToHKTime}
			datePickerProps={{
				shouldShowCalendarButton: true,
				label: 'Timezone Compatible Datetime, date',
			}}
			timePickerProps={{ label: 'Timezone Compatible Datetime, time' }}
		/>
	</Box>
);
