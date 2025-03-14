import React from 'react';

import AkTextfield from '@atlaskit/textfield';

import { CreateField } from '../../../controllers/create-field';

import { type TextFieldProps } from './types';

export const TEST_ID = 'link-create-text-field';

/**
 * A text field utilising the Atlaskit Textfield and CreateField.
 * Validation is handled by the form as it is on form submission. Any errors returned by
 * the handleSubmit function passed to the form <Form> that have a key matching the `name`
 * of this text field are shown above the field.
 */
export const TextField = ({
	id,
	name,
	label,
	isRequired,
	validators,
	validationHelpText,
	testId = TEST_ID,
	...restProps
}: TextFieldProps): JSX.Element => {
	return (
		<CreateField
			id={id}
			name={name}
			label={label}
			isRequired={isRequired}
			validators={validators}
			validationHelpText={validationHelpText}
			testId={testId}
		>
			{({ fieldId, ...fieldProps }) => {
				return (
					<AkTextfield id={fieldId} aria-label={label ?? name} {...fieldProps} {...restProps} />
				);
			}}
		</CreateField>
	);
};
