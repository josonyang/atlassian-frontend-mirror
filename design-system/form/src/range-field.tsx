import React, { type ReactNode } from 'react';

import Field, { type FieldProps, type Meta } from './field';

type RangeProps = Omit<FieldProps<number>, 'isInvalid' | 'isRequired'>;
export interface RangeFieldProps {
	/* Content to render in the range field. This function is called with props for the field component and other information about the field. */
	children: (args: { fieldProps: RangeProps; error?: string; meta: Meta }) => React.ReactNode;
	/**
	 * Specifies the name of the field. This is important for referencing the form data.
	 */
	name: string;
	/**
	 *  Sets the default value of the field. If a function is provided, it is called with the current default value of the field.
	 */
	defaultValue: number | ((currentDefaultValue?: number) => number);
	/**
	 * Value passed to the `id` attribute of the field. This is randomly generated if it is not specified.
	 */
	id?: string;
	/**
	 * Sets whether the field is disabled. Users cannot edit or focus on the fields. If the parent form component is disabled, then the field will always be disabled.
	 */
	isDisabled?: boolean;
	/**
	 * Displays a label above the range field and identifies the form fields.
	 */
	label?: ReactNode;
}

/**
 * __Range field__
 *
 * A range field is where a user can submit a range input as a part of a form.
 *
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/form/docs/fields#rangefield-reference)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/form/docs/fields#rangefield-reference)
 * - [Usage](https://atlaskit.atlassian.com/packages/design-system/form/docs/fields#rangefield-reference)
 */
const RangeField = ({
	children,
	defaultValue,
	id,
	isDisabled,
	label,
	name,
	...strippedProps
}: RangeFieldProps) => (
	<Field<number>
		// eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
		{...strippedProps}
		defaultValue={defaultValue}
		id={id}
		isDisabled={isDisabled}
		label={label}
		name={name}
		transform={Number}
	>
		{({ fieldProps: { isInvalid, isRequired, ...fieldProps }, ...rest }) =>
			// isInvalid and isRequired are specifically invalid for range inputs
			children({ fieldProps, ...rest })
		}
	</Field>
);

export default RangeField;
