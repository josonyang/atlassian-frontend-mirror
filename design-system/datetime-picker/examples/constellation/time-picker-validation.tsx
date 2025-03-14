import React from 'react';

import Button from '@atlaskit/button/new';
import { TimePicker } from '@atlaskit/datetime-picker';
import Form, { ErrorMessage, Field, FormFooter, ValidMessage } from '@atlaskit/form';

const validateField = (value?: string) => {
	if (!value) {
		return 'REQUIRED';
	}
};

const TimePickerValidationExample = () => (
	<Form onSubmit={(formState) => console.log('form submitted', formState)}>
		{({ formProps }) => (
			<form {...formProps}>
				<Field
					name="datetime-picker"
					label="Scheduled run time"
					validate={validateField}
					isRequired
				>
					{({ fieldProps, error, meta: { valid } }) => (
						<>
							<TimePicker clearControlLabel="Clear scheduled run time" {...fieldProps} />
							{valid && <ValidMessage>You have entered a valid datetime</ValidMessage>}
							{error === 'REQUIRED' && <ErrorMessage>This field is required</ErrorMessage>}
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

export default TimePickerValidationExample;
