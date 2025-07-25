import { type ReactNode } from 'react';

import { type UIAnalyticsEvent, type WithAnalyticsEventsProps } from '@atlaskit/analytics-next';

// Used by RadioGroup
// eslint-disable-next-line @repo/internal/react/consistent-types-definitions
export type OptionPropType = {
	isDisabled?: boolean;
	label?: ReactNode;
	name?: string;
	value?: RadioValue;
	testId?: string;
};

// eslint-disable-next-line @repo/internal/react/consistent-types-definitions
export type OptionsPropType = Array<OptionPropType>;

export type RadioValue = string;

type OwnProps = {
	/**
	 * The `aria-label` attribute associated with the radio element.
	 */
	// eslint-disable-next-line @repo/internal/react/consistent-props-definitions
	ariaLabel?: string;
	/**
	 * Makes a `Radio` field unselectable when true. Overridden by `isDisabled` prop of `RadioGroup`.
	 */
	isDisabled?: boolean;
	/**
	 * Marks this as a required field.
	 */
	isRequired?: boolean;
	/**
	 * Marks this as an invalid field.
	 */
	isInvalid?: boolean;
	/**
	 * Set the field as checked.
	 */
	isChecked?: boolean;
	/**
	 * The label value for the input rendered to the DOM.
	 */
	label?: ReactNode;
	/**
	 * `onChange` event handler, passed into the props of each `Radio` Component instantiated within `RadioGroup`.
	 */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>, analyticsEvent: UIAnalyticsEvent) => void;
	/**
	 * Field value.
	 */
	value?: RadioValue;
	/**
	 * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
	 * we have 2 different testid generated based on the one you pass to the Radio component:
	 * - `{testId}--radio-input` to check if it got changed to checked/unchecked.
	 * - `{testId}--radio-label` to click the input.
	 */
	testId?: string;
	/**
	 * Additional information to be included in the `context` of analytics events that come from radio.
	 */
	analyticsContext?: Record<string, any>;
};

// Expose all props on a html input element
type Combine<First, Second> = Omit<First, keyof Second> & Second;
export type RadioProps = Combine<
	Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		'aria-label' | 'disabled' | 'required' | 'checked' | 'value' | 'crossOrigin'
	>,
	OwnProps
> &
	WithAnalyticsEventsProps;
