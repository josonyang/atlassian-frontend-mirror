/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled
import { css, jsx } from '@emotion/react';
import { Field } from 'react-final-form';

import { Label, RequiredAsterisk } from '@atlaskit/form';
import { token } from '@atlaskit/tokens';

import { Message } from '../../../common/ui/message';
import { shouldShowValidationErrors } from '../../../common/utils/form';
import { type CreateFieldProps } from '../types';

const fieldWrapperStyles = css({
	marginTop: token('space.100', '8px'),
});

export function CreateFieldOld({
	id,
	name,
	label,
	isRequired,
	validators,
	validationHelpText,
	testId,
	children,
}: CreateFieldProps) {
	const fieldId = id ? id : `link-create-field-${name}`;

	return (
		<Field
			name={name}
			validate={(value) => {
				return (validators ?? []).find((validator) => {
					return !validator.isValid(value);
				})?.errorMessage;
			}}
		>
			{({ input, meta }) => {
				const isInvalid = shouldShowValidationErrors(meta);
				const { submitError, error } = meta;
				const hasError = !!submitError || !!error;
				const showErrorMessage = hasError && isInvalid;
				const describedById = `${fieldId}-description`;
				const errorMessageId = `${fieldId}-error`;
				const ariaErrorMessage = showErrorMessage ? errorMessageId : undefined;

				return (
					<div css={fieldWrapperStyles} data-testid={testId}>
						{label && (
							<Label htmlFor={fieldId} id={`${fieldId}-label`} testId={`${testId}-label`}>
								{label}
								{isRequired && <RequiredAsterisk />}
							</Label>
						)}

						{children({
							...input,
							fieldId,
							isInvalid,
							isRequired,
							'aria-errormessage': ariaErrorMessage,
							'aria-describedby': describedById,
						})}
						<div id={describedById}>
							{!hasError && validationHelpText && (
								<Message testId={`${testId}-helper-message`}>{validationHelpText}</Message>
							)}
							<div aria-live="polite">
								{showErrorMessage && (
									<Message
										id={errorMessageId}
										appearance="error"
										testId={`${testId}-error-message`}
									>
										{submitError || error}
									</Message>
								)}
							</div>
						</div>
					</div>
				);
			}}
		</Field>
	);
}
