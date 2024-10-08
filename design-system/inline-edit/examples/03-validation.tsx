import React, { useEffect, useState } from 'react';

import Button from '@atlaskit/button/new';
import { ErrorMessage } from '@atlaskit/form';
import { Box, xcss } from '@atlaskit/primitives';
import TextField from '@atlaskit/textfield';

import InlineEdit from '../src';

const readViewContainerStyles = xcss({
	font: 'font.body',
	paddingBlock: 'space.100',
	paddingInline: 'space.075',
	wordBreak: 'break-word',
});

const editContainerStyles = xcss({
	width: '50%',
});

const InlineEditExample = () => {
	const initialValue = 'Default field value';
	const [editValue, setEditValue] = useState('Field value');

	let validateValue = '';
	let validateTimeoutId: number | undefined;

	useEffect(() => {
		return () => {
			if (validateTimeoutId) {
				window.clearTimeout(validateTimeoutId);
			}
		};
	});

	const validate = (value: string) => {
		validateValue = value;
		return new Promise<{ value: string; error: string } | undefined>((resolve) => {
			validateTimeoutId = window.setTimeout(() => {
				if (value.length <= 6) {
					resolve({ value, error: 'Enter a value longer than 6 characters' });
				}
				resolve(undefined);
			}, 100);
		}).then((validateObject) => {
			if (validateObject && validateObject.value === validateValue) {
				return validateObject.error;
			}
			return undefined;
		});
	};

	const clearInlineEditContent = () => {
		setEditValue('');
	};

	return (
		<Box padding="space.100" xcss={editContainerStyles}>
			<Button testId="clear-button" onClick={clearInlineEditContent}>
				Clear inline edit validation
			</Button>
			<InlineEdit
				testId="validation"
				defaultValue={editValue}
				label="Inline edit validation"
				editButtonLabel={editValue || initialValue}
				editView={({ errorMessage, ...fieldProps }) => (
					<>
						<TextField testId="edit-view" {...fieldProps} autoFocus />
						{fieldProps.isInvalid && (
							<Box id="error-message">
								<ErrorMessage>{errorMessage}</ErrorMessage>
							</Box>
						)}
					</>
				)}
				readView={() => (
					<Box xcss={readViewContainerStyles} testId="read-view">
						{editValue || initialValue}
					</Box>
				)}
				onConfirm={(value) => setEditValue(value)}
				validate={validate}
			/>
		</Box>
	);
};

export default InlineEditExample;
