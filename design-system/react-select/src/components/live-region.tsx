/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { Fragment, type ReactNode, useMemo } from 'react';

import { jsx } from '@emotion/react';

import { type AriaSelection, defaultAriaLiveMessages } from '../accessibility';
import { type CommonProps, type GroupBase, type OnChangeValue, type Options } from '../types';

import A11yText from './internal/a11y-text';

// ==============================
// Root Container
// ==============================

export interface LiveRegionProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>>
	extends CommonProps<Option, IsMulti, Group> {
	children: ReactNode;
	innerProps: { className?: string };
	// Select state variables
	// eslint-disable-next-line @repo/internal/react/consistent-props-definitions
	ariaSelection: AriaSelection<Option, IsMulti>;
	focusedOption: Option | null;
	focusedValue: Option | null;
	selectValue: Options<Option>;
	focusableOptions: Options<Option>;
	isFocused: boolean;
	id: string;
	isAppleDevice: boolean;
}

// eslint-disable-next-line @repo/internal/react/require-jsdoc
const LiveRegion = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: LiveRegionProps<Option, IsMulti, Group>,
) => {
	const {
		ariaSelection,
		focusedOption,
		focusedValue,
		focusableOptions,
		isFocused,
		selectValue,
		selectProps,
		id,
		isAppleDevice,
	} = props;

	const {
		ariaLiveMessages,
		getOptionLabel,
		inputValue,
		isMulti,
		isOptionDisabled,
		isSearchable,
		label,
		menuIsOpen,
		options,
		screenReaderStatus,
		tabSelectsValue,
		isLoading,
	} = selectProps;
	const ariaLabel = selectProps['aria-label'] || label;
	const ariaLive = selectProps['aria-live'];

	// Update aria live message configuration when prop changes
	const messages = useMemo(
		() => ({
			...defaultAriaLiveMessages,
			...(ariaLiveMessages || {}),
		}),
		[ariaLiveMessages],
	);

	// Update aria live selected option when prop changes
	const ariaSelected = useMemo(() => {
		let message = '';
		if (ariaSelection && messages.onChange) {
			const {
				option,
				options: selectedOptions,
				removedValue,
				removedValues,
				value,
			} = ariaSelection;
			// select-option when !isMulti does not return option so we assume selected option is value
			const asOption = (val: OnChangeValue<Option, IsMulti>): Option | null =>
				!Array.isArray(val) ? (val as Option) : null;

			// If there is just one item from the action then get its label
			const selected = removedValue || option || asOption(value);
			const label = selected ? getOptionLabel(selected) : '';

			// If there are multiple items from the action then return an array of labels
			const multiSelected = selectedOptions || removedValues || undefined;
			const labels = multiSelected ? multiSelected.map(getOptionLabel) : [];

			const onChangeProps = {
				// multiSelected items are usually items that have already been selected
				// or set by the user as a default value so we assume they are not disabled
				isDisabled: selected && isOptionDisabled(selected, selectValue),
				label,
				labels,
				...ariaSelection,
			};

			message = messages.onChange(onChangeProps);
		}
		return message;
	}, [ariaSelection, messages, isOptionDisabled, selectValue, getOptionLabel]);

	const ariaFocused = useMemo(() => {
		let focusMsg = '';
		const focused = focusedOption || focusedValue;
		const isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));

		if (focused && messages.onFocus) {
			const onFocusProps = {
				focused,
				label: getOptionLabel(focused),
				isDisabled: isOptionDisabled(focused, selectValue),
				isSelected,
				options: focusableOptions,
				context: focused === focusedOption ? ('menu' as const) : ('value' as const),
				selectValue,
				isAppleDevice,
			};

			focusMsg = messages.onFocus(onFocusProps);
		}
		return focusMsg;
	}, [
		focusedOption,
		focusedValue,
		getOptionLabel,
		isOptionDisabled,
		messages,
		focusableOptions,
		selectValue,
		isAppleDevice,
	]);

	const ariaResults = useMemo(() => {
		let resultsMsg = '';
		if (menuIsOpen && options.length && !isLoading && messages.onFilter) {
			const resultsMessage = screenReaderStatus({
				count: focusableOptions.length,
			});
			resultsMsg = messages.onFilter({ inputValue, resultsMessage });
		}
		return resultsMsg;
	}, [focusableOptions, inputValue, menuIsOpen, messages, options, screenReaderStatus, isLoading]);

	const isInitialFocus = ariaSelection?.action === 'initial-input-focus';

	const ariaGuidance = useMemo(() => {
		let guidanceMsg = '';
		if (messages.guidance) {
			const context = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
			guidanceMsg = messages.guidance({
				'aria-label': ariaLabel,
				context,
				isDisabled: focusedOption && isOptionDisabled(focusedOption, selectValue),
				isMulti,
				isSearchable,
				tabSelectsValue,
				isInitialFocus,
			});
		}
		return guidanceMsg;
	}, [
		ariaLabel,
		focusedOption,
		focusedValue,
		isMulti,
		isOptionDisabled,
		isSearchable,
		menuIsOpen,
		messages,
		selectValue,
		tabSelectsValue,
		isInitialFocus,
	]);

	const ScreenReaderText = (
		<Fragment>
			<span id="aria-selection">{ariaSelected}</span>
			<span id="aria-focused">{ariaFocused}</span>
			<span id="aria-results">{ariaResults}</span>
			<span id="aria-guidance">{ariaGuidance}</span>
		</Fragment>
	);

	return (
		<Fragment>
			{/* We use 'aria-describedby' linked to this component for the initial focus */}
			{/* action, then for all other actions we use the live region below */}
			<A11yText id={id}>{isInitialFocus && ScreenReaderText}</A11yText>
			<A11yText aria-live={ariaLive} aria-atomic="false" aria-relevant="additions text" role="log">
				{isFocused && !isInitialFocus && ScreenReaderText}
			</A11yText>
		</Fragment>
	);
};

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default LiveRegion;
