import React from 'react';

import Button from '@atlaskit/button/new';
import Form, { CheckboxField, Field, FormFooter } from '@atlaskit/form';
import { Radio, RadioGroup } from '@atlaskit/radio';
import { type OptionsPropType } from '@atlaskit/radio/types';

const colorItems: OptionsPropType = [
	{ name: 'color', value: 'red', label: 'Red' },
	{ name: 'color', value: 'blue', label: 'Blue' },
	{ name: 'color', value: 'yellow', label: 'Yellow' },
	{ name: 'color', value: 'green', label: 'Green' },
];
const fruitItems: OptionsPropType = [
	{ name: 'fruit', value: 'apple', label: 'Apple' },
	{ name: 'fruit', value: 'orange', label: 'Orange' },
	{ name: 'fruit', value: 'peach', label: 'Peach' },
	{ name: 'fruit', value: 'pair', label: 'Pair' },
];
const cityItems: OptionsPropType = [
	{ name: 'city', value: 'sydney', label: 'Sydney' },
	{ name: 'city', value: 'mountain-view', label: 'Mountain View' },
	{ name: 'city', value: 'new-york-city', label: 'New York City' },
	{ name: 'city', value: 'gallifrey', label: 'Gallifrey', isDisabled: true },
];
const weatherItems: OptionsPropType = [
	{ name: 'weather', value: 'sunny', label: 'Sunny', isDisabled: true },
	{ name: 'weather', value: 'cloudy', label: 'Cloudy', isDisabled: true },
	{ name: 'weather', value: 'windy', label: 'Windy' },
];

export default function FormExample() {
	return (
		<div>
			<Form onSubmit={(data: object) => console.log('form data', data)}>
				{({ formProps }: { formProps: object }) => {
					return (
						<form {...formProps} name="form-example">
							<CheckboxField name="standalone">
								{({ fieldProps }: { fieldProps: object }) => (
									<Radio {...fieldProps} label="standalone radio" />
								)}
							</CheckboxField>
							<Field label="Required radio group" name="color" defaultValue="blue" isRequired>
								{({ fieldProps }: { fieldProps: object }) => (
									<RadioGroup {...fieldProps} options={colorItems} />
								)}
							</Field>
							<Field label="Regular radio group" name="fruit" defaultValue="peach">
								{({ fieldProps }: { fieldProps: object }) => (
									<RadioGroup {...fieldProps} options={fruitItems} />
								)}
							</Field>
							<Field
								label="Radio group with individual field disabled"
								name="city"
								defaultValue="sydney"
							>
								{({ fieldProps }: { fieldProps: object }) => (
									<RadioGroup {...fieldProps} isDisabled={undefined} options={cityItems} />
								)}
							</Field>
							<Field
								label="Radio group with individual field enabled"
								name="weather"
								defaultValue="windy"
							>
								{({ fieldProps }: { fieldProps: object }) => (
									<RadioGroup {...fieldProps} isDisabled={undefined} options={weatherItems} />
								)}
							</Field>
							<FormFooter>
								<Button type="submit" appearance="primary">
									Submit
								</Button>
							</FormFooter>
						</form>
					);
				}}
			</Form>
		</div>
	);
}
