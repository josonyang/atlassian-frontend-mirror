import { type WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import { type DropdownIndicatorProps, type OptionType, type SelectProps } from '@atlaskit/select';

export type Appearance = 'default' | 'subtle' | 'none';
export type Spacing = 'compact' | 'default';

export interface DatePickerBaseProps extends WithAnalyticsEventsProps {
	/**
	 * Set the appearance of the picker.
	 * `subtle` will remove the borders, background, and icon.
	 * **NOTE:** Appearance values will be ignored if styles are parsed through `selectProps`.
	 */
	appearance?: Appearance;
	/**
	 * Used to associate accessible descriptions to the date picker.
	 */
	'aria-describedby'?: string;
	/**
	 * Set the picker to autofocus on mount.
	 */
	autoFocus?: boolean;
	/**
	 * The default for `isOpen`. Will be `false` if not provided.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	defaultIsOpen?: boolean;
	/**
	 * The default for `value`.
	 */
	defaultValue?: string;
	/**
	 * An array of ISO dates that should be disabled on the calendar. This does not affect what users can type into the picker.
	 */
	disabled?: string[];
	/**
	 * A filter function for disabling dates on the calendar. This does not affect what users can type into the picker.
	 *
	 * The function is called with a date string in the format `YYYY-MM-DD` and should return `true` if the date should be disabled.
	 */
	disabledDateFilter?: (date: string) => boolean;
	/**
	 * Accessible name for the Date Picker Select, rendered as `aria-label`. This will override any other method of providing a label.
	 */
	label?: string;
	/**
	 * The latest enabled date. Dates after this are disabled on the calendar. This does not affect what users can type into the picker.
	 */
	maxDate?: string;
	/**
	 * The earliest enabled date. Dates before this are disabled on the calendar. This does not affect what users can type into the picker.
	 */
	minDate?: string;
	/**
	 * The icon shown in the picker.
	 */
	icon?: React.ComponentType<DropdownIndicatorProps<OptionType>>;
	/**
	 * Set the id of the field.
	 * Associates a `<label></label>` with the field.
	 */
	id?: string;
	/**
	 * Props to apply to the container.
	 */
	innerProps?: React.AllHTMLAttributes<HTMLElement>;
	/**
	 * Set if the picker is disabled.
	 */
	isDisabled?: boolean;
	/**
	 * Set if the picker is open.
	 */
	isOpen?: boolean;
	/**
	 * The name of the field.
	 */
	name?: string;
	/**
	 * The aria-label attribute associated with the next-month arrow.
	 */
	nextMonthLabel?: string;
	/**
	 * Called when the field is blurred.
	 */
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	/**
	 * Called when the value changes. The only argument is an ISO time or empty string.
	 */
	onChange?: (value: string) => void;
	/**
	 * Called when the field is focused.
	 */
	onFocus?: React.FocusEventHandler<HTMLInputElement>;
	/**
	 * A function for parsing input characters and transforming them into a Date object.
	 * By default parses the date string based off the locale.
	 */
	parseInputValue?: (date: string, dateFormat: string) => Date;
	/**
	 * A function for formatting the date displayed in the input. By default composes together [`date-fns`'s parse method](https://date-fns.org/v1.29.0/docs/parse) and [`date-fns`'s format method](https://date-fns.org/v1.29.0/docs/format) to return a correctly formatted date string.
	 */
	formatDisplayLabel?: (value: string, dateFormat: string) => string;
	/**
	 * The aria-label attribute associated with the previous-month arrow.
	 */
	previousMonthLabel?: string;
	/**
	 * Props to apply to the select. This can be used to set options such as placeholder text.
	 *  See [the `Select` documentation for further information](/components/select).
	 */
	selectProps?: SelectProps<any>;
	/**
	 * The spacing for the select control.
	 *
	 * Compact is `gridSize() * 4`, default is `gridSize * 5`.
	 */
	spacing?: Spacing;
	/**
	 * The ISO time used as the input value.
	 */
	value?: string;
	/**
	 * Set if the picker has an invalid value.
	 */
	isInvalid?: boolean;
	/**
	 * Hides icon for dropdown indicator.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	hideIcon?: boolean;
	/**
	 * Format the date with a string that is accepted by [date-fn's format function](https://date-fns.org/v1.29.0/docs/format).
	 */
	dateFormat?: string;
	/**
	 * Placeholder text displayed in input.
	 */
	placeholder?: string;
	/**
	 * Locale used to format the date and calendar. See [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).
	 */
	locale?: string;
	/**
	 * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
	 *  - `{testId}--container` wrapping element of date-picker
	 *  - `{testId}--calendar--container` nested calendar component
	 */
	testId?: string;
	/**
	 * Start day of the week for the calendar.
	 * - `0` sunday (default value)
	 * - `1` monday
	 * - `2` tuesday
	 * - `3` wednesday
	 * - `4` thursday
	 * - `5` friday
	 * - `6` saturday
	 */
	weekStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TimePickerBaseProps extends WithAnalyticsEventsProps {
	/**
	 * Set the appearance of the picker.
	 * `subtle` will remove the borders, background, and icon.
	 *
	 * __NOTE:__ Appearance values will be ignored if styles are parsed through `selectProps`.
	 */
	appearance?: Appearance;
	/**
	 * Used to associate accessible descriptions to the time picker.
	 */
	'aria-describedby'?: string;
	/**
	 * Set the picker to autofocus on mount.
	 */
	autoFocus?: boolean;
	/**
	 * The default for `isOpen`.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	defaultIsOpen?: boolean;
	/**
	 * The default for `value`.
	 */
	defaultValue?: string;
	/**
	 * A function for formatting the displayed time value in the input. By default parses with an internal time parser, and formats using the [date-fns format function]((https://date-fns.org/v1.29.0/docs/format))
	 */
	formatDisplayLabel?: (time: string, timeFormat: string) => string;
	/**
	 * Set the id of the field.
	 * Associates a `<label></label>` with the field.
	 */
	id?: string;
	/**
	 * Props to apply to the container. *
	 */
	innerProps?: React.AllHTMLAttributes<HTMLElement>;
	/**
	 * Set if the field is disabled.
	 */
	isDisabled?: boolean;
	/**
	 * Set if the dropdown is open. Will be `false` if not provided.
	 */
	isOpen?: boolean;
	/**
	 * Accessible name for the Time Picker Select, rendered as `aria-label`. This will override any other method of providing a label.
	 */
	label?: string;
	/**
	 * The name of the field.
	 */
	name?: string;
	/**
	 * Called when the field is blurred.
	 */
	onBlur?: React.FocusEventHandler<HTMLElement>;
	/**
	 * Called when the value changes. The only argument is an ISO time or empty string.
	 */
	onChange?: (value: string) => void;
	/**
	 * Called when the field is focused.
	 */
	onFocus?: React.FocusEventHandler<HTMLElement>;
	/**
	 * A function for parsing input characters and transforming them into either a string or a Date object.
	 * By default parses the string based off the locale.
	 */
	parseInputValue?: (time: string, timeFormat: string) => string | Date;
	/**
	 * Props to apply to the select.
	 */
	selectProps?: SelectProps<any>;
	/**
	 * The spacing for the select control.
	 *
	 * Compact is `gridSize() * 4`, default is `gridSize * 5`.
	 */
	spacing?: Spacing;
	/**
	 * The times shown in the dropdown.
	 */
	times?: string[];
	/**
	 * Set if users can edit the input, allowing them to add custom times.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	timeIsEditable?: boolean;
	/**
	 * The ISO time that should be used as the input value.
	 */
	value?: string;
	/**
	 * Set if the picker has an invalid value.
	 */
	isInvalid?: boolean;
	/**
	 * Hides icon for dropdown indicator.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	hideIcon?: boolean;
	/**
	 * Time format that is accepted by [date-fns's format function](https://date-fns.org/v1.29.0/docs/format).
	 */
	timeFormat?: string;
	/**
	 * Placeholder text displayed in input.
	 */
	placeholder?: string;
	/**
	 * Locale used to format the time. See [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).
	 */
	locale?: string;
	/**
	 * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests:
	 *  - `{testId}--container` wrapping element of time-picker
	 */
	testId?: string;
}

export interface DateTimePickerBaseProps extends WithAnalyticsEventsProps {
	/**
	 * Set the appearance of the picker.
	 *
	 * `subtle` will remove the borders and background.
	 */
	appearance?: Appearance;
	/**
	 * Used to associate accessible descriptions to both the date and time
	 * picker. If you want to associate individual accessible descriptions, this
	 * should be done through the `datePickerSelectProps` and
	 * `timePickerSelectProps`.
	 */
	'aria-describedby'?: string;
	/**
	 * Set the picker to autofocus on mount.
	 */
	autoFocus?: boolean;
	/**
	 * The default for `value`.
	 */
	defaultValue?: string;
	/**
	 * Set the id of the field.
	 */
	id?: string;
	/**
	 * Props to apply to the container. *
	 */
	innerProps?: React.AllHTMLAttributes<HTMLElement>;
	/**
	 * Set if the field is disabled.
	 */
	isDisabled?: boolean;
	/**
	 * The name of the field.
	 */
	name?: string;
	/**
	 * Called when the field is blurred.
	 */
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	/**
	 * Called when the value changes and the date / time is a complete value, or empty. The only value is an ISO string or empty string.
	 */
	onChange?: (value: string) => void;
	/**
	 * Called when the field is focused.
	 */
	onFocus?: React.FocusEventHandler<HTMLInputElement>;
	/**
	 * The ISO time that should be used as the input value.
	 */
	value?: string;
	/**
	 * Set if users can edit the input, allowing them to add custom times.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	timeIsEditable?: boolean;
	/**
	 * Set if the picker has an invalid value.
	 */
	isInvalid?: boolean;
	/**
	 * Format the date with a string that is accepted by [date-fns's format function](https://date-fns.org/v1.29.0/docs/format).
	 */
	dateFormat?: string;
	/**
	 * Props applied to the `DatePicker`.
	 */
	datePickerProps?: DatePickerBaseProps;
	/**
	 * Props applied to the `TimePicker`.
	 */
	timePickerProps?: TimePickerBaseProps;
	/**
	 * Function used to parse datetime values into their date, time and timezone sub-values. *
	 */
	parseValue?: (
		dateTimeValue: string,
		date: string,
		time: string,
		timezone: string,
	) => { dateValue: string; timeValue: string; zoneValue: string };
	/**
	 * [Select props](/components/select) to pass onto the `DatePicker` component's `Select`. This can be used to set options such as placeholder text.
	 */
	datePickerSelectProps?: SelectProps<any>;
	/**
	 * [Select props](/components/select) to pass onto the `TimePicker` component's `Select`. This can be used to set options such as placeholder text.
	 */
	timePickerSelectProps?: SelectProps<any>;
	/**
	 * The times shown by the `TimePicker`.
	 */
	times?: Array<string>;
	/**
	 * The format that times are displayed in. Values should be those accepted by [date-fns's format function](https://date-fns.org/v1.29.0/docs/format).
	 */
	timeFormat?: string;
	/**
	 * The spacing for the select control.
	 *
	 * Compact is `gridSize() * 4`, default is `gridSize() * 5`.
	 */
	spacing?: Spacing;
	/**
	 * Locale used for formatting dates and times. See [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).
	 */
	locale?: string;
	/**
	 * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
	 *  - `{testId}--datepicker--container` wrapping element of date-picker
	 *  - `{testId}--timepicker--container` wrapping element of time-picker
	 */
	testId?: string;
}
