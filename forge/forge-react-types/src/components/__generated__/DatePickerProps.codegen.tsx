/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - DatePickerProps
 *
 * @codegen <<SignedSource::d146cd7a368d85498c033934001b9a6c>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit/datepicker/__generated__/index.partial.tsx <<SignedSource::5dcbe693f00f3a2725b9e64932a3309c>>
 */
/* eslint @repo/internal/codegen/signed-source-integrity: "warn" */

import type { DateTimePickerSelectProps } from '@atlaskit/datetime-picker';

export interface FieldProps {
	id: string;
	isRequired: boolean;
	isDisabled: boolean;
	isInvalid: boolean;
	onChange: (event: unknown) => void;
	onBlur: (event: unknown) => void;
	onFocus: (event: unknown) => void;
	value: any;
	'aria-invalid': 'true' | 'false';
	'aria-labelledby': string;
	name: string;
}

type Appearance = 'default' | 'subtle' | 'none';
type Spacing = 'compact' | 'default';

export type DatePickerProps = {
	appearance?: Appearance;
	autoFocus?: boolean;
	defaultIsOpen?: boolean;
	defaultValue?: string;
	disabled?: string[];
	maxDate?: string;
	minDate?: string;
	isDisabled?: boolean;
	isOpen?: boolean;
	nextMonthLabel?: string;
	previousMonthLabel?: string;
	spacing?: Spacing;
	value?: string;
	isInvalid?: boolean;
	dateFormat?: string;
	placeholder?: string;
	locale?: string;
	testId?: string;
	weekStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	onChange?: (value: string) => void;
	selectProps?: DateTimePickerSelectProps;
	shouldShowCalendarButton?: boolean;
} & Partial<Omit<FieldProps, 'onChange'>>;

/**
 * A date picker allows the user to select a particular date.
 *
 * @see [DatePicker](https://developer.atlassian.com/platform/forge/ui-kit/components/date-picker/) in UI Kit documentation for more information
 */
export type TDatePicker<T> = (props: DatePickerProps) => T;