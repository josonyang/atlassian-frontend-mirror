/* eslint-disable @atlaskit/platform/ensure-feature-flag-prefix */
import type { AriaAttributes } from 'react';

import { fg } from '@atlaskit/platform-feature-flags';

import {
	type ActionMeta,
	type GroupBase,
	type InitialInputFocusedActionMeta,
	type OnChangeValue,
	type Options,
	type OptionsOrGroups,
} from '../types';

export type OptionContext = 'menu' | 'value';

export type GuidanceContext = 'menu' | 'input' | 'value';

export type AriaSelection<Option, IsMulti extends boolean> =
	| InitialInputFocusedActionMeta<Option, IsMulti>
	| (ActionMeta<Option> & {
			value: OnChangeValue<Option, IsMulti>;
			option?: Option;
			options?: Options<Option>;
	  });

export interface AriaGuidanceProps {
	/**
	 * String value of selectProp aria-label
	 */
	'aria-label': AriaAttributes['aria-label'];
	/**
	 * String indicating user's current context and available keyboard interactivity
	 */
	context: GuidanceContext;
	/**
	 * Boolean value of selectProp isSearchable
	 */
	isSearchable: boolean;
	/**
	 * Boolean value of selectProp isMulti
	 */
	isMulti: boolean;
	/**
	 * Boolean value of selectProp isDisabled
	 */
	isDisabled: boolean | null;
	/**
	 * Boolean value of selectProp tabSelectsValue
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	tabSelectsValue: boolean;
	/**
	 * Boolean value indicating if user focused the input for the first time
	 */
	isInitialFocus: boolean;
}

export type AriaOnChangeProps<Option, IsMulti extends boolean> = AriaSelection<Option, IsMulti> & {
	/**
	 * String derived label from selected or removed option/value
	 */
	label: string;
	/**
	 * Array of labels derived from multiple selected or cleared options
	 */
	// eslint-disable-next-line @repo/internal/react/consistent-props-definitions
	labels: string[];
	/**
	 * Boolean indicating if the selected menu option is disabled
	 */
	isDisabled: boolean | null;
};

export interface AriaOnFilterProps {
	/**
	 * String indicating current inputValue of the input
	 */
	inputValue: string;
	/**
	 * String derived from selectProp screenReaderStatus
	 */
	resultsMessage: string;
}

export interface AriaOnFocusProps<Option, Group extends GroupBase<Option>> {
	/**
	 * String indicating whether the option was focused in the menu or as (multi-) value
	 */
	context: OptionContext;
	/**
	 * Option that is being focused
	 */
	focused: Option;
	/**
	 * Boolean indicating whether focused menu option has been disabled
	 */
	isDisabled: boolean;
	/**
	 * Boolean indicating whether focused menu option is an already selected option
	 */
	isSelected: boolean;
	/**
	 * String derived label from focused option/value
	 */
	label: string;
	/**
	 * Options provided as props to Select used to determine indexing
	 */
	options: OptionsOrGroups<Option, Group>;
	/**
	 * selected option(s) of the Select
	 */
	selectValue: Options<Option>;
	/**
	 * Boolean value of selectProp isMulti
	 */
	isMulti: boolean;
}

export type AriaGuidance = (props: AriaGuidanceProps) => string;
export type AriaOnChange<Option, IsMulti extends boolean> = (
	props: AriaOnChangeProps<Option, IsMulti>,
) => string;
export type AriaOnFilter = (props: AriaOnFilterProps) => string;
export type AriaOnFocus<Option, Group extends GroupBase<Option> = GroupBase<Option>> = (
	props: AriaOnFocusProps<Option, Group>,
) => string;

export interface AriaLiveMessages<
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
> {
	/**
	 * Guidance message used to convey component state and specific keyboard interactivity
	 */
	guidance?: (props: AriaGuidanceProps) => string;
	/**
	 * OnChange message used to convey changes to value but also called when user selects disabled option
	 */
	onChange?: (props: AriaOnChangeProps<Option, IsMulti>) => string;
	/**
	 * OnFilter message used to convey information about filtered results displayed in the menu
	 */
	onFilter?: (props: AriaOnFilterProps) => string;
	/**
	 * OnFocus message used to convey information about the currently focused option or value
	 */
	onFocus?: (props: AriaOnFocusProps<Option, Group>) => string;
}

export const defaultAriaLiveMessages = {
	guidance: (props: AriaGuidanceProps) => {
		const { isSearchable, isMulti, tabSelectsValue, context, isInitialFocus } = props;
		switch (context) {
			case 'menu':
				return `Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu${
					tabSelectsValue ? ', press Tab to select the option and exit the menu' : ''
				}.`;
			case 'input':
				return isInitialFocus
					? `${props['aria-label'] || 'Select'} is focused ${
							isSearchable ? ',type to refine list' : ''
						}, press Down to open the menu, ${
							isMulti ? ' press left to focus selected values' : ''
						}`
					: '';
			case 'value':
				return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
			default:
				return '';
		}
	},

	onChange: <Option, IsMulti extends boolean>(props: AriaOnChangeProps<Option, IsMulti>) => {
		const { action, label = '', labels, isDisabled } = props;
		switch (action) {
			case 'deselect-option':
			case 'pop-value':
			case 'remove-value':
				return (label.length && fg('design_system_select-a11y-improvement')) ||
					!fg('design_system_select-a11y-improvement')
					? `option ${label}, deselected`
					: ''; // TODO: this should be handled on backspace|delete if no value, but doing it here first
			case 'clear':
				return 'All selected options have been cleared.';
			case 'initial-input-focus':
				return (label.length && fg('design_system_select-a11y-improvement')) ||
					!fg('design_system_select-a11y-improvement')
					? `option${labels.length > 1 ? 's' : ''} ${labels.join(',')}, selected.`
					: '';
			case 'select-option':
				return isDisabled
					? `option ${label} is disabled. Select another option.`
					: `option ${label}, selected.`;
			default:
				return '';
		}
	},

	onFocus: <Option, Group extends GroupBase<Option>>(props: AriaOnFocusProps<Option, Group>) => {
		const { context, focused, options, label = '', selectValue, isDisabled, isSelected } = props;

		const getArrayIndex = (arr: OptionsOrGroups<Option, Group>, item: Option) =>
			arr && arr.length ? `(${arr.indexOf(item) + 1} of ${arr.length})` : '';

		if (context === 'value' && selectValue) {
			return `value ${label} focused, ${getArrayIndex(selectValue, focused)}.`;
		}

		// No longer needed after fg('design_system_select-a11y-improvement') is cleaned up
		if (context === 'menu' && !fg('design_system_select-a11y-improvement')) {
			const disabled = isDisabled ? ' disabled' : '';
			const status = `${isSelected ? ' selected' : ' not selected'}${disabled}`;
			return `${label}${status}, ${getArrayIndex(options, focused)}, completion selected`;
		}
		return '';
	},

	onFilter: (props: AriaOnFilterProps) => {
		const { inputValue, resultsMessage } = props;
		return `${resultsMessage}${inputValue ? ' for search term ' + inputValue : ''}.`;
	},
};
