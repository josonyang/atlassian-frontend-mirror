import React from 'react';

import Button from '@atlaskit/button/new';
import Form, { Field, FormFooter, HelperMessage } from '@atlaskit/form';

import { DateTimePicker } from '../../src';

const DateTimePickerFormExample = () => (
	<Form onSubmit={(formState: unknown) => console.log('form submitted', formState)}>
		{({ formProps }) => (
			<form {...formProps}>
				<Field name="datetime-picker" label="Scheduled run time" isRequired={false}>
					{({ fieldProps }) => (
						<>
							<DateTimePicker
								{...fieldProps}
								clearControlLabel="Clear scheduled run time"
								datePickerProps={{
									shouldShowCalendarButton: true,
									label: 'Date, Scheduled run time',
								}}
								timePickerProps={{ label: 'Time, Scheduled run time' }}
							/>
							<HelperMessage>Help or instruction text goes here</HelperMessage>
						</>
					)}
				</Field>
				<FormFooter>
					<Button type="submit" appearance="primary">
						Submit
					</Button>
				</FormFooter>
			</form>
		)}
	</Form>
);

export default DateTimePickerFormExample;
