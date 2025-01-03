import React from 'react';

import { DatePicker } from '@atlaskit/datetime-picker';
import { Label } from '@atlaskit/form';
import Heading from '@atlaskit/heading';
import { Box } from '@atlaskit/primitives';

export default () => {
	return (
		<Box>
			<Heading size="large">DatePicker</Heading>
			<Label id="open" htmlFor="react-select-is-open--input">
				Always open
			</Label>
			{/* This should be ignored for the sake of the example */}
			{/* eslint-disable-next-line @atlaskit/design-system/use-datetime-picker-calendar-button */}
			<DatePicker id="react-select-is-open--input" clearControlLabel="Clear always open" isOpen />
			<Label id="open-calendar" htmlFor="react-select-is-open-calendar--input">
				Always open with calendar button
			</Label>
			<DatePicker
				id="react-select-is-open-calendar--input"
				clearControlLabel="Clear always open with calendar button"
				isOpen
				shouldShowCalendarButton
				inputLabelId="open-calendar"
				openCalendarLabel="open calendar"
			/>
		</Box>
	);
};
