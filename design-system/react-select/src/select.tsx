import React, {
	type AriaAttributes,
	Component,
	type FocusEventHandler,
	type FormEventHandler,
	type KeyboardEventHandler,
	type MouseEventHandler,
	type ReactNode,
	type RefCallback,
	type TouchEventHandler,
} from 'react';

import { isAppleDevice, isSafari } from '@atlaskit/ds-lib/device-check';
import { fg } from '@atlaskit/platform-feature-flags';

import { type AriaLiveMessages, type AriaSelection } from './accessibility';
import {
	formatGroupLabel as formatGroupLabelBuiltin,
	getOptionLabel as getOptionLabelBuiltin,
	getOptionValue as getOptionValueBuiltin,
	isOptionDisabled as isOptionDisabledBuiltin,
} from './builtins';
import { defaultComponents, type SelectComponentsConfig } from './components';
import { DummyInput, RequiredInput, ScrollManager } from './components/internal';
import { NotifyOpenLayerObserver } from './components/internal/notify-open-layer-observer';
import LiveRegion from './components/live-region';
import { MenuPlacer } from './components/menu';
import { createFilter, type FilterOptionOption } from './filters';
import {
	type ClassNamesConfig,
	defaultStyles,
	type StylesConfig,
	type StylesProps,
} from './styles';
import {
	type ActionMeta,
	type FocusDirection,
	type GetOptionLabel,
	type GetOptionValue,
	type GroupBase,
	type InputActionMeta,
	type MenuPlacement,
	type MenuPosition,
	type OnChangeValue,
	type Options,
	type OptionsOrGroups,
	type PropsValue,
	type SetValueAction,
} from './types';
import {
	classNames,
	cleanValue,
	filterUnsupportedSelectors,
	isDocumentElement,
	isMobileDevice,
	isTouchCapable,
	multiValueAsValue,
	noop,
	notNullish,
	scrollIntoView,
	singleValueAsValue,
	valueTernary,
} from './utils';

export type FormatOptionLabelContext = 'menu' | 'value';
export interface FormatOptionLabelMeta<Option> {
	context: FormatOptionLabelContext;
	inputValue: string;
	selectValue: Options<Option>;
}

export interface SelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
	/**
	 * HTML ID of an element containing an error message related to the input
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 * aria-errormessage is not supported widely by assistive technologies. Do not use!
	 */
	'aria-errormessage'?: AriaAttributes['aria-errormessage'];
	/**
	 * Indicate if the value entered in the field is invalid
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 * Use `isInvalid` instead.
	 */
	'aria-invalid'?: AriaAttributes['aria-invalid'];
	/**
	 * Aria label (for assistive tech)
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 * Use `label` instead.
	 */
	'aria-label'?: AriaAttributes['aria-label'];
	/**
	 * HTML ID of an element that should be used as the label (for assistive tech)
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 * Use `labelId` instead.
	 */
	// eslint-disable-next-line @repo/internal/react/consistent-props-definitions
	'aria-labelledby'?: AriaAttributes['aria-labelledby'];
	/**
	 * HTML ID of an element that should be used as a description (for assistive tech)
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 * Use `descriptionId` instead.
	 */
	'aria-describedby'?: AriaAttributes['aria-describedby'];
	/**
	 * Used to set the priority with which screen reader should treat updates to live regions. The possible settings are: off, polite (default) or assertive
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 * Will be removed in future versions.
	 */
	'aria-live'?: AriaAttributes['aria-live'];
	/**
	 * Customise the messages used by the aria-live component
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 */
	// eslint-disable-next-line @repo/internal/react/consistent-props-definitions
	ariaLiveMessages?: AriaLiveMessages<Option, IsMulti, Group>;
	/**
	 * Focus the control when it is mounted. There are very few cases that this should be used, and using incorrectly may violate accessibility guidelines.
	 */
	autoFocus?: boolean;
	/**
	 * Remove the currently focused option when the user presses backspace when Select isClearable or isMulti
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}. Will soon be handled automatically to support expected keyboard accessibility.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	backspaceRemovesValue: boolean;
	/**
	 * Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices)
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	blurInputOnSelect: boolean;
	/**
	 * When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	captureMenuScroll: boolean;
	/**
	 * Sets a className attribute on the outer component
	 *
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 * If used for testing purposes, use the `testId` prop as a locator instead.
	 * If used for styling purposes, use the `components` API with the xcss prop
	 */
	className?: string;
	/**
	 * If provided, all inner components will be given a prefixed className attribute.
	 *
	 * This is useful when styling via CSS classes instead of the Styles API approach.
	 */
	classNamePrefix?: string | null;
	/**
	 * Provide classNames based on state for each inner component
	 */
	classNames: ClassNamesConfig<Option, IsMulti, Group>;
	/**
	 * Set the `aria-label` for the clear icon button.
	 */
	clearControlLabel?: string;
	/**
	 * Close the select menu when the user selects an option
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	closeMenuOnSelect: boolean;
	/**
	 * If `true`, close the select menu when the user scrolls the document/body.
	 *
	 * If a function, takes a standard javascript `ScrollEvent` you return a boolean:
	 *
	 * `true` => The menu closes
	 *
	 * `false` => The menu stays open
	 *
	 * This is useful when you have a scrollable modal and want to portal the menu out,
	 * but want to avoid graphical issues.
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 */
	closeMenuOnScroll: boolean | ((event: Event) => boolean);
	/**
	 * This complex object includes all the compositional components that are used
	 * in `react-select`. If you wish to overwrite a component, pass in an object
	 * with the appropriate namespace. If you wish to restyle a component, we recommend
	 * using this prop with the `xcss` prop.
	 *
	 */
	components: SelectComponentsConfig<Option, IsMulti, Group>;
	/**
	 * Whether the value of the select, e.g. SingleValue, should be displayed in the control.
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	controlShouldRenderValue: boolean;
	/**
	 * Delimiter used to join multiple values into a single HTML Input value
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 */
	delimiter?: string;
	/**
	 * This sets the aria-describedby attribute. It sets an accessible description for the select, for people who use assistive technology. Use '<HelperMessage>' from '@atlaskit/form' is preferred.
	 */
	descriptionId?: string;
	/**
	 * Clear all values when the user presses escape AND the menu is closed.
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}. Will soon be handled automatically to support expected keyboard accessibility.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	escapeClearsValue: boolean;
	/**
	 * Custom method to filter whether an option should be displayed in the menu
	 */
	filterOption: ((option: FilterOptionOption<Option>, inputValue: string) => boolean) | null;
	/**
	 * Formats group labels in the menu as React components
	 *
	 * An example can be found in the [Replacing builtins](https://react-select.com/advanced#replacing-builtins) documentation.
	 */
	formatGroupLabel: (group: Group) => ReactNode;
	/**
	 * Formats option labels in the menu and control as React components
	 */
	formatOptionLabel?: (
		data: Option,
		formatOptionLabelMeta: FormatOptionLabelMeta<Option>,
	) => ReactNode;
	/**
	 * Resolves option data to a string to be displayed as the label by components
	 *
	 * Note: Failure to resolve to a string type can interfere with filtering and
	 * screen reader support.
	 */
	getOptionLabel: GetOptionLabel<Option>;
	/**
	 * Resolves option data to a string to compare options and specify value attributes
	 */
	getOptionValue: GetOptionValue<Option>;
	/**
	 * Hide the selected option from the menu
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	hideSelectedOptions?: boolean;
	/**
	 * The id to set on the SelectContainer component.
	 */
	id?: string;
	/**
	 * The value of the search input
	 */
	inputValue: string;
	/**
	 * The id of the search input
	 */
	inputId?: string;
	/**
	 * Define an id prefix for the select components e.g. {your-id}-value
	 */
	instanceId?: number | string;
	/**
	 * Is the select value clearable
	 */
	isClearable?: boolean;
	/**
	 * Is the select disabled
	 */
	isDisabled: boolean;
	/**
	 * Is the select invalid
	 */
	isInvalid?: boolean;
	/**
	 * Is the select in a state of loading (async)
	 */
	isLoading: boolean;
	/**
	 * Override the built-in logic to detect whether an option is disabled
	 *
	 * An example can be found in the [Replacing builtins](https://react-select.com/advanced#replacing-builtins) documentation.
	 */
	isOptionDisabled: (option: Option, selectValue: Options<Option>) => boolean;
	/**
	 * Override the built-in logic to detect whether an option is selected
	 */
	isOptionSelected?: (option: Option, selectValue: Options<Option>) => boolean;
	/**
	 * Support multiple selected options
	 */
	isMulti: IsMulti;
	/**
	 * This prop indicates if the component is required.
	 */
	isRequired?: boolean;
	/**
	 * Is the select direction right-to-left
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 */
	isRtl: boolean;
	/**
	 * Whether to enable search functionality
	 */
	isSearchable: boolean;
	/**
	 * This sets the aria-label attribute. It sets an accessible name for the select, for people who use assistive technology. Use of a visible label is highly recommended for greater accessibility support.
	 */
	label?: string;
	/**
	 * This sets the aria-labelledby attribute. It sets an accessible name for the select, for people who use assistive technology. Use of a visible label is highly recommended for greater accessibility support.
	 */
	// This prop is not used for translation, it accepts a space separated list of id's.
	// eslint-disable-next-line @repo/internal/react/consistent-props-definitions
	labelId?: string;
	/**
	 * Async: Text to display when loading options
	 */
	loadingMessage: (obj: { inputValue: string }) => ReactNode;
	/**
	 * Minimum height of the menu before flipping
	 */
	minMenuHeight: number;
	/**
	 * Maximum height of the menu before scrolling
	 */
	maxMenuHeight: number;
	/**
	 * Whether the menu is open
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	menuIsOpen: boolean;
	/**
	 * Default placement of the menu in relation to the control. 'auto' will flip
	 * when there isn't enough space below the control.
	 */
	menuPlacement: MenuPlacement;
	/**
	 * The CSS position value of the menu, when "fixed" extra layout management is required
	 */
	menuPosition: MenuPosition;
	/**
	 * Whether the menu should use a portal, and where it should attach
	 *
	 * An example can be found in the [Portaling](https://react-select.com/advanced#portaling) documentation
	 */
	menuPortalTarget?: HTMLElement | null;
	/**
	 * Whether to block scroll events when the menu is open
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	menuShouldBlockScroll: boolean;
	/**
	 * Whether the menu should be scrolled into view when it opens
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	menuShouldScrollIntoView: boolean;
	/**
	 * Name of the HTML Input (optional - without this, no input will be rendered)
	 */
	name?: string;
	/**
	 * Text to display when there are no options
	 */
	noOptionsMessage: (obj: { inputValue: string }) => ReactNode;
	/**
	 * Handle blur events on the control
	 */
	onBlur?: FocusEventHandler<HTMLInputElement>;
	/**
	 * Handle change events on the select
	 */
	onChange: (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => void;
	/**
	 * Handle focus events on the control
	 */
	onFocus?: FocusEventHandler<HTMLInputElement>;
	/**
	 * Handle change events on the input
	 */
	onInputChange: (newValue: string, actionMeta: InputActionMeta) => void;
	/**
	 * Handle key down events on the select
	 */
	onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
	/**
	 * Handle the menu opening
	 */
	onMenuOpen: () => void;
	/**
	 * Handle the menu closing
	 */
	onMenuClose: () => void;
	/**
	 * Fired when the user scrolls to the top of the menu
	 */
	onMenuScrollToTop?: (event: WheelEvent | TouchEvent) => void;
	/**
	 * Fired when the user scrolls to the bottom of the menu
	 */
	onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
	/**
	 * Allows control of whether the menu is opened when the Select is focused
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}. Will soon be removed to support expected accessibility interactions.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	openMenuOnFocus: boolean;
	/**
	 * Allows control of whether the menu is opened when the Select is clicked
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}. Will soon be removed to support expected accessibility interactions.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	openMenuOnClick: boolean;
	/**
	 * Array of options that populate the select menu
	 */
	options: OptionsOrGroups<Option, Group>;
	/**
	 * Number of options to jump in menu when page{up|down} keys are used
	 */
	pageSize: number;
	/**
	 * Placeholder for the select value
	 */
	placeholder: ReactNode;
	/**
	 * Status to relay to screen readers
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 */
	screenReaderStatus: (obj: { count: number }) => string;
	/**
	 * Style modifier methods
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 * Use the `components` API with the xcss prop for custom styling.
	 */
	styles: StylesConfig<Option, IsMulti, Group>;
	/**
	 * Sets the tabIndex attribute on the input for focus. Since focus is already managed, the only acceptable value to be used is '-1' in rare cases when removing this field from the document tab order is required.
	 *
	 */
	tabIndex: number;
	/**
	 * Select the currently focused option when the user presses tab
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}. Will soon be handled automatically to support expected keyboard accessibility.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	tabSelectsValue: boolean;
	/**
	 * A unique string that appears as data attribute data-testid in the rendered code, serving as a hook for automated tests.
	 * Use this instead of using ARIA properties as locators.
	 *
	 * - Container: `${testId}-select--container`
	 * - Control : `${testId}-select--control`
	 * - Value container: `${testId}-select--value-container`
	 * - Placeholder: `${testId}-select--placeholder`
	 * - Input container: `${testId}-select--input-container`
	 * - Input: `${testId}-select--input`
	 * - Indicators container: `${testId}-select--indicators-container`
	 * - Dropdown indicator: `${testId}-select--dropdown-indicator`
	 * - Clear indicator: `${testId}-select--clear-indicator`
	 * - Loading indicator: `${testId}-select--loading-indicator`
	 * - Listbox container: `${testId}-select--listbox-container`
	 * - Listbox: `${testId}-select--listbox`
	 * - Option group heading: `${testId}-select--group-${groupIndex}-heading`
	 * - Option: `${testId}-select--option-${id}`
	 */
	testId?: string;
	/**
	 * The value of the select; reflected by the selected option
	 */
	value: PropsValue<Option>;
	/**
	 * Sets the form attribute on the input
	 */
	form?: string;
	/**
	 * Marks the value-holding input as required for form validation
	 *
	 * @deprecated {@link https://hello.atlassian.net/browse/ENGHEALTH-14529 Internal documentation for deprecation (no external access)}
	 * Use `isRequired` instead.
	 */
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	required?: boolean;
	/**
	 * This prop affects the height of the select control. Compact is gridSize() * 4, default is gridSize * 5
	 */
	spacing?: 'compact' | 'default';
	appearance: 'default' | 'subtle' | 'none';
	// temp fix to support unofficial props.
	[key: string]: any;
	UNSAFE_is_experimental_generic?: boolean;
}

export const defaultProps = {
	backspaceRemovesValue: true,
	blurInputOnSelect: isTouchCapable(),
	captureMenuScroll: !isTouchCapable(),
	classNames: {},
	closeMenuOnSelect: true,
	closeMenuOnScroll: false,
	components: {},
	controlShouldRenderValue: true,
	escapeClearsValue: false,
	filterOption: createFilter(),
	formatGroupLabel: formatGroupLabelBuiltin,
	getOptionLabel: getOptionLabelBuiltin,
	getOptionValue: getOptionValueBuiltin,
	isDisabled: false,
	isLoading: false,
	isMulti: false,
	isRtl: false,
	isSearchable: true,
	isOptionDisabled: isOptionDisabledBuiltin,
	loadingMessage: () => 'Loading...',
	maxMenuHeight: 300,
	minMenuHeight: 140,
	menuIsOpen: false,
	menuPlacement: 'bottom',
	menuPosition: 'absolute',
	menuShouldBlockScroll: false,
	menuShouldScrollIntoView: !isMobileDevice(),
	noOptionsMessage: () => 'No options',
	openMenuOnFocus: false,
	openMenuOnClick: true,
	options: [],
	pageSize: 5,
	placeholder: 'Select...',
	screenReaderStatus: ({ count }: { count: number }) =>
		`${count} result${count !== 1 ? 's' : ''} available`,
	styles: {},
	tabIndex: 0,
	tabSelectsValue: true,
	UNSAFE_is_experimental_generic: false,
};

interface State<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
	ariaSelection: AriaSelection<Option, IsMulti> | null;
	inputIsHidden: boolean;
	isFocused: boolean;
	focusedOption: Option | null;
	focusedOptionId: string | null;
	focusableOptionsWithIds: FocusableOptionWithId<Option>[];
	focusedValue: Option | null;
	focusedValueId: string | null;
	selectValue: Options<Option>;
	clearFocusValueOnUpdate: boolean;
	prevWasFocused: boolean;
	inputIsHiddenAfterUpdate: boolean | null | undefined;
	prevProps: SelectProps<Option, IsMulti, Group> | void;
	instancePrefix: string;
}

interface CategorizedOption<Option> {
	type: 'option';
	data: Option;
	isDisabled: boolean;
	isSelected: boolean;
	label: string;
	value: string;
	index: number;
}

interface FocusableOptionWithId<Option> {
	data: Option;
	id: string;
}

interface CategorizedGroup<Option, Group extends GroupBase<Option>> {
	type: 'group';
	data: Group;
	options: readonly CategorizedOption<Option>[];
	index: number;
}

type CategorizedGroupOrOption<Option, Group extends GroupBase<Option>> =
	| CategorizedGroup<Option, Group>
	| CategorizedOption<Option>;

function toCategorizedOption<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: SelectProps<Option, IsMulti, Group>,
	option: Option,
	selectValue: Options<Option>,
	index: number,
): CategorizedOption<Option> {
	const isDisabled = isOptionDisabled(props, option, selectValue);
	const isSelected = isOptionSelected(props, option, selectValue);
	const label = getOptionLabel(props, option);
	const value = getOptionValue(props, option);

	return {
		type: 'option',
		data: option,
		isDisabled,
		isSelected,
		label,
		value,
		index,
	};
}

function buildCategorizedOptions<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: SelectProps<Option, IsMulti, Group>,
	selectValue: Options<Option>,
): CategorizedGroupOrOption<Option, Group>[] {
	return props.options
		.map((groupOrOption, groupOrOptionIndex) => {
			//@ts-ignore
			if ('options' in groupOrOption) {
				const categorizedOptions = groupOrOption.options
					.map((option, optionIndex) =>
						toCategorizedOption(props, option, selectValue, optionIndex),
					)
					.filter((categorizedOption) => isFocusable(props, categorizedOption));
				return categorizedOptions.length > 0
					? {
							type: 'group' as const,
							data: groupOrOption,
							options: categorizedOptions,
							index: groupOrOptionIndex,
						}
					: undefined;
			}
			const categorizedOption = toCategorizedOption(
				props,
				groupOrOption,
				selectValue,
				groupOrOptionIndex,
			);
			return isFocusable(props, categorizedOption) ? categorizedOption : undefined;
		})
		.filter(notNullish);
}

function buildFocusableOptionsFromCategorizedOptions<Option, Group extends GroupBase<Option>>(
	categorizedOptions: readonly CategorizedGroupOrOption<Option, Group>[],
) {
	return categorizedOptions.reduce<Option[]>((optionsAccumulator, categorizedOption) => {
		if (categorizedOption.type === 'group') {
			optionsAccumulator.push(...categorizedOption.options.map((option) => option.data));
		} else {
			optionsAccumulator.push(categorizedOption.data);
		}
		return optionsAccumulator;
	}, []);
}

function buildFocusableOptionsWithIds<Option, Group extends GroupBase<Option>>(
	categorizedOptions: readonly CategorizedGroupOrOption<Option, Group>[],
	optionId: string,
) {
	return categorizedOptions.reduce<FocusableOptionWithId<Option>[]>(
		(optionsAccumulator, categorizedOption) => {
			if (categorizedOption.type === 'group') {
				optionsAccumulator.push(
					...categorizedOption.options.map((option) => ({
						data: option.data,
						id: `${optionId}-${categorizedOption.index}-${option.index}`,
					})),
				);
			} else {
				optionsAccumulator.push({
					data: categorizedOption.data,
					id: `${optionId}-${categorizedOption.index}`,
				});
			}
			return optionsAccumulator;
		},
		[],
	);
}

function buildFocusableOptions<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: SelectProps<Option, IsMulti, Group>,
	selectValue: Options<Option>,
) {
	return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
}

function isFocusable<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: SelectProps<Option, IsMulti, Group>,
	categorizedOption: CategorizedOption<Option>,
) {
	const { inputValue = '' } = props;
	const { data, isSelected, label, value } = categorizedOption;

	return (
		(!shouldHideSelectedOptions(props) || !isSelected) &&
		filterOption(props, { label, value, data }, inputValue)
	);
}

function getNextFocusedValue<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	state: State<Option, IsMulti, Group>,
	nextSelectValue: Options<Option>,
) {
	const { focusedValue, selectValue: lastSelectValue } = state;
	const lastFocusedIndex = lastSelectValue.indexOf(focusedValue!);
	if (lastFocusedIndex > -1) {
		const nextFocusedIndex = nextSelectValue.indexOf(focusedValue!);
		if (nextFocusedIndex > -1) {
			// the focused value is still in the selectValue, return it
			return focusedValue;
		} else if (lastFocusedIndex < nextSelectValue.length) {
			// the focusedValue is not present in the next selectValue array by
			// reference, so return the new value at the same index
			return nextSelectValue[lastFocusedIndex];
		}
	}
	return null;
}

function getNextFocusedOption<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	state: State<Option, IsMulti, Group>,
	options: Options<Option>,
) {
	const { focusedOption: lastFocusedOption } = state;
	return lastFocusedOption && options.indexOf(lastFocusedOption) > -1
		? lastFocusedOption
		: options[0];
}

const getFocusedOptionId = <Option,>(
	focusableOptionsWithIds: FocusableOptionWithId<Option>[],
	focusedOption: Option,
) => {
	const focusedOptionId = focusableOptionsWithIds.find(
		(option) => option.data === focusedOption,
	)?.id;
	return focusedOptionId || null;
};

const getOptionLabel = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: SelectProps<Option, IsMulti, Group>,
	data: Option,
): string => {
	return props.getOptionLabel(data);
};
const getOptionValue = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: SelectProps<Option, IsMulti, Group>,
	data: Option,
): string => {
	return props.getOptionValue(data);
};

function isOptionDisabled<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: SelectProps<Option, IsMulti, Group>,
	option: Option,
	selectValue: Options<Option>,
): boolean {
	return typeof props.isOptionDisabled === 'function'
		? props.isOptionDisabled(option, selectValue)
		: false;
}
function isOptionSelected<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: SelectProps<Option, IsMulti, Group>,
	option: Option,
	selectValue: Options<Option>,
): boolean {
	if (selectValue.indexOf(option) > -1) {
		return true;
	}
	if (typeof props.isOptionSelected === 'function') {
		return props.isOptionSelected(option, selectValue);
	}
	const candidate = getOptionValue(props, option);
	return selectValue.some((i) => getOptionValue(props, i) === candidate);
}
function filterOption<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	props: SelectProps<Option, IsMulti, Group>,
	option: FilterOptionOption<Option>,
	inputValue: string,
) {
	return props.filterOption ? props.filterOption(option, inputValue) : true;
}

const shouldHideSelectedOptions = <
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
>(
	props: SelectProps<Option, IsMulti, Group>,
) => {
	const { hideSelectedOptions, isMulti } = props;
	if (hideSelectedOptions === undefined) {
		return isMulti;
	}
	return hideSelectedOptions;
};

let instanceId = 1;

// eslint-disable-next-line @repo/internal/react/no-class-components
export default class Select<
	Option = unknown,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
> extends Component<SelectProps<Option, IsMulti, Group>, State<Option, IsMulti, Group>> {
	static defaultProps = defaultProps;
	state: State<Option, IsMulti, Group> = {
		ariaSelection: null,
		focusedOption: null,
		focusedOptionId: null,
		focusableOptionsWithIds: [],
		focusedValue: null,
		focusedValueId: null,
		inputIsHidden: false,
		isFocused: false,
		selectValue: [],
		clearFocusValueOnUpdate: false,
		prevWasFocused: false,
		inputIsHiddenAfterUpdate: undefined,
		prevProps: undefined,
		instancePrefix: '',
	};

	// Misc. Instance Properties
	// ------------------------------

	blockOptionHover = false;
	isComposing = false;
	commonProps: any; // TODO
	initialTouchX = 0;
	initialTouchY = 0;
	openAfterFocus = false;
	scrollToFocusedOptionOnUpdate = false;
	userIsDragging?: boolean;

	// Refs
	// ------------------------------

	controlRef: HTMLDivElement | null = null;
	getControlRef: RefCallback<HTMLDivElement> = (ref) => {
		this.controlRef = ref;
	};
	focusedOptionRef: HTMLDivElement | null = null;
	getFocusedOptionRef: RefCallback<HTMLDivElement> = (ref) => {
		this.focusedOptionRef = ref;
	};
	menuListRef: HTMLDivElement | null = null;
	getMenuListRef: RefCallback<HTMLDivElement> = (ref) => {
		this.menuListRef = ref;
	};
	inputRef: HTMLInputElement | null = null;
	getInputRef: RefCallback<HTMLInputElement> = (ref) => {
		this.inputRef = ref;
	};

	// Lifecycle
	// ------------------------------

	constructor(props: SelectProps<Option, IsMulti, Group>) {
		super(props);
		this.state.instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId);
		this.state.selectValue = cleanValue(props.value);
		// Set focusedOption if menuIsOpen is set on init (e.g. defaultMenuIsOpen)
		if (props.menuIsOpen) {
			const focusableOptionsWithIds: FocusableOptionWithId<Option>[] =
				this.getFocusableOptionsWithIds();
			const focusableOptions = this.buildFocusableOptions();
			const optionIndex = focusableOptions.indexOf(this.state.selectValue[0]);
			this.state.focusableOptionsWithIds = focusableOptionsWithIds;
			this.state.focusedOption = focusableOptions[optionIndex];
			this.state.focusedOptionId = getFocusedOptionId(
				focusableOptionsWithIds,
				focusableOptions[optionIndex],
			);
		}
	}

	static getDerivedStateFromProps(
		props: SelectProps<unknown, boolean, GroupBase<unknown>>,
		state: State<unknown, boolean, GroupBase<unknown>>,
	) {
		const {
			prevProps,
			clearFocusValueOnUpdate,
			inputIsHiddenAfterUpdate,
			ariaSelection,
			isFocused,
			prevWasFocused,
			instancePrefix,
		} = state;
		const { options, value, menuIsOpen, inputValue, isMulti } = props;
		const selectValue = cleanValue(value);
		let newMenuOptionsState = {};
		if (
			prevProps &&
			(value !== prevProps.value ||
				options !== prevProps.options ||
				menuIsOpen !== prevProps.menuIsOpen ||
				inputValue !== prevProps.inputValue)
		) {
			const focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [];

			const focusableOptionsWithIds = menuIsOpen
				? buildFocusableOptionsWithIds(
						buildCategorizedOptions(props, selectValue),
						`${instancePrefix}-option`,
					)
				: [];

			const focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
			const focusedOption = getNextFocusedOption(state, focusableOptions);
			const focusedOptionId = getFocusedOptionId(focusableOptionsWithIds, focusedOption);

			newMenuOptionsState = {
				selectValue,
				focusedOption,
				focusedOptionId,
				focusableOptionsWithIds,
				focusedValue,
				clearFocusValueOnUpdate: false,
			};
		}
		// some updates should toggle the state of the input visibility
		const newInputIsHiddenState =
			inputIsHiddenAfterUpdate != null && props !== prevProps
				? {
						inputIsHidden: inputIsHiddenAfterUpdate,
						inputIsHiddenAfterUpdate: undefined,
					}
				: {};

		let newAriaSelection = ariaSelection;

		let hasKeptFocus = isFocused && prevWasFocused;

		if (isFocused && !hasKeptFocus) {
			// If `value` or `defaultValue` props are not empty then announce them
			// when the Select is initially focused
			newAriaSelection = {
				value: valueTernary(isMulti, selectValue, selectValue[0] || null),
				options: selectValue,
				action: 'initial-input-focus',
			};

			hasKeptFocus = !prevWasFocused;
		}

		// If the 'initial-input-focus' action has been set already
		// then reset the ariaSelection to null
		if (ariaSelection?.action === 'initial-input-focus') {
			newAriaSelection = null;
		}

		return {
			...newMenuOptionsState,
			...newInputIsHiddenState,
			prevProps: props,
			ariaSelection: newAriaSelection,
			prevWasFocused: hasKeptFocus,
		};
	}
	componentDidMount() {
		this.startListeningComposition();
		this.startListeningToTouch();

		if (this.props.closeMenuOnScroll && document && document.addEventListener) {
			// Listen to all scroll events, and filter them out inside of 'onScroll'
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.addEventListener('scroll', this.onScroll, true);
		}

		if (this.props.autoFocus) {
			this.focusInput();
		}

		// Scroll focusedOption into view if menuIsOpen is set on mount (e.g. defaultMenuIsOpen)
		if (
			this.props.menuIsOpen &&
			this.state.focusedOption &&
			this.menuListRef &&
			this.focusedOptionRef
		) {
			scrollIntoView(this.menuListRef, this.focusedOptionRef);
		}
	}
	componentDidUpdate(prevProps: SelectProps<Option, IsMulti, Group>) {
		const { isDisabled, menuIsOpen } = this.props;
		const { isFocused } = this.state;

		if (
			// ensure focus is restored correctly when the control becomes enabled
			(isFocused && !isDisabled && prevProps.isDisabled) ||
			// ensure focus is on the Input when the menu opens
			(isFocused && menuIsOpen && !prevProps.menuIsOpen)
		) {
			this.focusInput();
		}

		if (isFocused && isDisabled && !prevProps.isDisabled) {
			// ensure select state gets blurred in case Select is programmatically disabled while focused
			this.setState({ isFocused: false }, this.onMenuClose);
		} else if (
			!isFocused &&
			!isDisabled &&
			prevProps.isDisabled &&
			this.inputRef === document.activeElement
		) {
			// ensure select state gets focused in case Select is programatically re-enabled while focused (Firefox)
			this.setState({ isFocused: true });
		}

		// scroll the focused option into view if necessary
		if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
			scrollIntoView(this.menuListRef, this.focusedOptionRef);
			this.scrollToFocusedOptionOnUpdate = false;
		}
	}
	componentWillUnmount() {
		this.stopListeningComposition();
		this.stopListeningToTouch();
		// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
		document.removeEventListener('scroll', this.onScroll, true);
	}

	// ==============================
	// Consumer Handlers
	// ==============================

	onMenuOpen() {
		this.props.onMenuOpen();
	}
	onMenuClose() {
		this.onInputChange('', {
			action: 'menu-close',
			prevInputValue: this.props.inputValue,
		});

		this.props.onMenuClose();
	}
	onInputChange(newValue: string, actionMeta: InputActionMeta) {
		this.props.onInputChange(newValue, actionMeta);
	}

	// ==============================
	// Methods
	// ==============================

	focusInput() {
		if (!this.inputRef) {
			return;
		}
		this.inputRef.focus();
	}
	blurInput() {
		if (!this.inputRef) {
			return;
		}
		this.inputRef.blur();
	}

	// aliased for consumers
	focus = this.focusInput;
	blur = this.blurInput;

	openMenu(focusOption: 'first' | 'last') {
		const { selectValue, isFocused } = this.state;
		const focusableOptions = this.buildFocusableOptions();
		let openAtIndex = focusOption === 'first' ? 0 : focusableOptions.length - 1;

		if (!this.props.isMulti) {
			const selectedIndex = focusableOptions.indexOf(selectValue[0]);
			if (selectedIndex > -1) {
				openAtIndex = selectedIndex;
			}
		}

		const focusedOption = focusableOptions[openAtIndex];

		// only scroll if the menu isn't already open
		this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);

		this.setState(
			{
				inputIsHiddenAfterUpdate: false,
				focusedValue: null,
				focusedOption: focusedOption,
				focusedOptionId: this.getFocusedOptionId(focusedOption),
			},
			() => this.onMenuOpen(),
		);

		isSafari() &&
			focusedOption &&
			this.updateInputLabel(this.calculateInputLabel(focusedOption, openAtIndex));
	}

	updateInputLabel(inputLabel?: string) {
		if (inputLabel) {
			this.inputRef?.setAttribute('aria-label', inputLabel);
			setTimeout(() => {
				const normalizedLabel = this.props['aria-label'] || this.props.label;
				if (normalizedLabel) {
					this.inputRef?.setAttribute('aria-label', normalizedLabel);
				} else {
					this.inputRef?.removeAttribute('aria-label');
				}
			}, 500);
		}
	}

	calculateInputLabel(focusedOption: Option, optionIndex: number) {
		const { options } = this.props;

		const isOptionsGrouped = options?.every(
			(obj): obj is Group => typeof obj === 'object' && obj !== null && 'options' in obj,
		);

		let inputLabel = this.getOptionLabel(focusedOption);

		const isOptionFocused = (option: Option) => {
			return this.getOptionLabel(option) === inputLabel;
		};

		const groupData = options?.find((option): option is Group => {
			const groupCandidate = option as Group;
			return groupCandidate.options?.some(isOptionFocused) ?? false;
		});

		if (isOptionsGrouped) {
			const groupOptionIndex = groupData?.options.findIndex(isOptionFocused) ?? 0;
			const totalLength = options?.reduce((acc: number, currentGroup) => {
				const group = currentGroup as Group;
				acc += group?.options?.length;
				return acc;
			}, 0);
			inputLabel = `${inputLabel}, ${groupData?.label} (${groupOptionIndex + 1} of ${totalLength})`;
		} else {
			inputLabel = `${inputLabel} (${optionIndex + 1} of ${options?.length})`;
		}

		return inputLabel;
	}

	focusValue(direction: 'previous' | 'next') {
		const { selectValue, focusedValue } = this.state;

		// Only multiselects support value focusing
		if (!this.props.isMulti) {
			return;
		}

		this.setState({
			focusedOption: null,
		});

		let focusedIndex = selectValue.indexOf(focusedValue!);
		if (!focusedValue) {
			focusedIndex = -1;
		}

		const lastIndex = selectValue.length - 1;
		let nextFocus = -1;
		if (!selectValue.length) {
			return;
		}

		switch (direction) {
			case 'previous':
				if (focusedIndex === 0) {
					// don't cycle from the start to the end
					nextFocus = 0;
				} else if (focusedIndex === -1) {
					// if nothing is focused, focus the last value first
					nextFocus = lastIndex;
				} else {
					nextFocus = focusedIndex - 1;
				}
				break;
			case 'next':
				if (focusedIndex > -1 && focusedIndex < lastIndex) {
					nextFocus = focusedIndex + 1;
				}
				break;
		}
		this.setState({
			inputIsHidden: nextFocus !== -1,
			focusedValue: selectValue[nextFocus],
			focusedValueId: `${this.getElementId('selected-value')}-${nextFocus}-remove`,
			focusedOption: null,
			focusedOptionId: null,
		});
	}

	focusOption(direction: FocusDirection = 'first') {
		const { pageSize } = this.props;
		const { focusedOption } = this.state;
		const options = this.getFocusableOptions();

		if (!options.length) {
			return;
		}
		let nextFocus = 0; // handles 'first'
		let focusedIndex = options.indexOf(focusedOption!);
		if (!focusedOption) {
			focusedIndex = -1;
		}

		if (direction === 'up') {
			nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
		} else if (direction === 'down') {
			nextFocus = (focusedIndex + 1) % options.length;
		} else if (direction === 'pageup') {
			nextFocus = focusedIndex - pageSize;
			if (nextFocus < 0) {
				nextFocus = 0;
			}
		} else if (direction === 'pagedown') {
			nextFocus = focusedIndex + pageSize;
			if (nextFocus > options.length - 1) {
				nextFocus = options.length - 1;
			}
		} else if (direction === 'last') {
			nextFocus = options.length - 1;
		}
		this.scrollToFocusedOptionOnUpdate = true;
		this.setState({
			focusedOption: options[nextFocus],
			focusedValue: null,
			focusedValueId: null,
			focusedOptionId: this.getFocusedOptionId(options[nextFocus]),
		});
	}
	onChange = (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => {
		const { onChange, name } = this.props;
		actionMeta.name = name;

		this.ariaOnChange(newValue, actionMeta);
		onChange(newValue, actionMeta);
	};
	setValue = (
		newValue: OnChangeValue<Option, IsMulti>,
		action: SetValueAction,
		option?: Option,
	) => {
		const { closeMenuOnSelect, isMulti, inputValue } = this.props;
		this.onInputChange('', { action: 'set-value', prevInputValue: inputValue });
		if (closeMenuOnSelect) {
			this.setState({
				inputIsHiddenAfterUpdate: !isMulti,
			});
			this.onMenuClose();
		}
		// when the select value should change, we should reset focusedValue
		this.setState({ clearFocusValueOnUpdate: true });
		this.onChange(newValue, { action, option });
	};
	selectOption = (newValue: Option) => {
		const { blurInputOnSelect, isMulti, name } = this.props;
		const { selectValue } = this.state;
		const deselected = isMulti && this.isOptionSelected(newValue, selectValue);
		const isDisabled = this.isOptionDisabled(newValue, selectValue);

		if (deselected) {
			const candidate = this.getOptionValue(newValue);
			this.setValue(
				multiValueAsValue(selectValue.filter((i) => this.getOptionValue(i) !== candidate)),
				'deselect-option',
				newValue,
			);
		} else if (!isDisabled) {
			// Select option if option is not disabled
			if (isMulti) {
				this.setValue(multiValueAsValue([...selectValue, newValue]), 'select-option', newValue);
			} else {
				this.setValue(singleValueAsValue(newValue), 'select-option');
			}
		} else {
			this.ariaOnChange(singleValueAsValue(newValue), {
				action: 'select-option',
				option: newValue,
				name,
			});
			return;
		}

		if (blurInputOnSelect) {
			this.blurInput();
		}
	};
	removeValue = (removedValue: Option) => {
		const { isMulti } = this.props;
		const { selectValue } = this.state;
		const candidate = this.getOptionValue(removedValue);
		const newValueArray = selectValue.filter((i) => this.getOptionValue(i) !== candidate);
		const newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);

		this.onChange(newValue, { action: 'remove-value', removedValue });
		this.focusInput();
	};
	clearValue = () => {
		const { selectValue } = this.state;
		this.onChange(valueTernary(this.props.isMulti, [], null), {
			action: 'clear',
			removedValues: selectValue,
		});
	};
	popValue = () => {
		const { isMulti } = this.props;
		const { selectValue } = this.state;
		const lastSelectedValue = selectValue[selectValue.length - 1];
		const newValueArray = selectValue.slice(0, selectValue.length - 1);
		const newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);

		this.onChange(newValue, {
			action: 'pop-value',
			removedValue: lastSelectedValue,
		});
	};

	// ==============================
	// Getters
	// ==============================
	getFocusedOptionId = (focusedOption: Option) => {
		return getFocusedOptionId(this.state.focusableOptionsWithIds, focusedOption);
	};

	getFocusableOptionsWithIds = () => {
		return buildFocusableOptionsWithIds(
			buildCategorizedOptions(this.props, this.state.selectValue),
			this.getElementId('option'),
		);
	};

	getValue = () => this.state.selectValue;

	cx = (...args: any) => classNames(this.props.classNamePrefix, ...args);

	getCommonProps() {
		const { clearValue, cx, getStyles, getClassNames, getValue, selectOption, setValue, props } =
			this;
		const { isMulti, isRtl, options } = props;
		const hasValue = this.hasValue();

		return {
			clearValue,
			cx,
			getStyles,
			getClassNames,
			getValue,
			hasValue,
			isMulti,
			isRtl,
			options,
			selectOption,
			selectProps: props,
			setValue,
		};
	}

	getOptionLabel = (data: Option): string => {
		return getOptionLabel(this.props, data);
	};
	getOptionValue = (data: Option): string => {
		return getOptionValue(this.props, data);
	};
	getStyles = <Key extends keyof StylesProps<Option, IsMulti, Group>>(
		key: Key,
		props: StylesProps<Option, IsMulti, Group>[Key],
	) => {
		const base = defaultStyles[key](props as any);
		base.boxSizing = 'border-box';
		const custom = this.props.styles[key];
		if (!custom) {
			return base;
		}
		const customStyles = filterUnsupportedSelectors(custom(base, props as any));
		return customStyles;
	};
	getClassNames = <Key extends keyof StylesProps<Option, IsMulti, Group>>(
		key: Key,
		props: StylesProps<Option, IsMulti, Group>[Key],
	) => this.props.classNames[key]?.(props as any);
	getElementId = (
		element:
			| 'group'
			| 'input'
			| 'listbox'
			| 'option'
			| 'placeholder'
			| 'live-region'
			| 'multi-message'
			| 'single-value'
			| 'selected-value',
	) => {
		return `${this.state.instancePrefix}-${element}`;
	};

	getComponents = () => {
		return defaultComponents(this.props);
	};

	buildCategorizedOptions = () => buildCategorizedOptions(this.props, this.state.selectValue);
	getCategorizedOptions = () => (this.props.menuIsOpen ? this.buildCategorizedOptions() : []);
	buildFocusableOptions = () =>
		buildFocusableOptionsFromCategorizedOptions(this.buildCategorizedOptions());
	getFocusableOptions = () => (this.props.menuIsOpen ? this.buildFocusableOptions() : []);

	// ==============================
	// Helpers
	// ==============================

	ariaOnChange = (value: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => {
		this.setState({ ariaSelection: { value, ...actionMeta } });
	};

	hasValue() {
		const { selectValue } = this.state;
		return selectValue.length > 0;
	}
	hasOptions() {
		return !!this.getFocusableOptions().length;
	}
	isClearable(): boolean {
		const { isClearable, isMulti } = this.props;

		// single select, by default, IS NOT clearable
		// multi select, by default, IS clearable
		if (isClearable === undefined) {
			return isMulti;
		}

		return isClearable;
	}
	isOptionDisabled(option: Option, selectValue: Options<Option>): boolean {
		return isOptionDisabled(this.props, option, selectValue);
	}
	isOptionSelected(option: Option, selectValue: Options<Option>): boolean {
		return isOptionSelected(this.props, option, selectValue);
	}
	filterOption(option: FilterOptionOption<Option>, inputValue: string) {
		return filterOption(this.props, option, inputValue);
	}
	formatOptionLabel(data: Option, context: FormatOptionLabelContext): ReactNode {
		if (typeof this.props.formatOptionLabel === 'function') {
			const { inputValue } = this.props;
			const { selectValue } = this.state;
			return this.props.formatOptionLabel(data, {
				context,
				inputValue,
				selectValue,
			});
		} else {
			return this.getOptionLabel(data);
		}
	}
	formatGroupLabel(data: Group) {
		return this.props.formatGroupLabel(data);
	}
	calculateDescription() {
		const descriptionProp = this.props['aria-describedby'] || this.props.descriptionId;
		const { isMulti } = this.props;
		const hasValue = this.state.selectValue.length > 0;

		// Determine base description based on selection state
		const baseDescriptionId = hasValue
			? isMulti
				? ''
				: this.getElementId('single-value')
			: this.getElementId('placeholder');

		// Fast path for single select with no description prop
		if (!isMulti && !descriptionProp) {
			return { 'aria-describedby': baseDescriptionId };
		}

		// Build the describedby string efficiently
		let describedBy = baseDescriptionId;
		// Add description prop if it exists
		if (descriptionProp) {
			describedBy = describedBy ? `${descriptionProp} ${describedBy}` : descriptionProp;
		}

		// For multi-select, always add multi-message ID
		if (isMulti) {
			const multiMessage = this.getElementId('multi-message');
			describedBy = describedBy ? `${describedBy} ${multiMessage}` : multiMessage;
		}

		return { 'aria-describedby': describedBy };
	}

	// ==============================
	// Mouse Handlers
	// ==============================

	onMenuMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
		if (event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
		this.focusInput();
	};
	onMenuMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
		this.blockOptionHover = false;
	};
	onControlMouseDown = (
		event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
	) => {
		// Event captured by dropdown indicator
		if (event.defaultPrevented) {
			// react-dnd will fire preventDefault in mouseDown, which make select is not clickable.
			// temp workaround to check if select is within dnd, we don't do the early return.
			if (!this.controlRef?.closest('[data-rbd-draggable-context-id]')) {
				return;
			}
		}
		const { openMenuOnClick } = this.props;
		if (!this.state.isFocused) {
			if (openMenuOnClick) {
				this.openAfterFocus = true;
			}
			this.focusInput();
		} else if (!this.props.menuIsOpen) {
			if (openMenuOnClick) {
				this.openMenu('first');
			}
		} else {
			if (
				(event.target as HTMLElement).tagName !== 'INPUT' &&
				(event.target as HTMLElement).tagName !== 'TEXTAREA'
			) {
				this.onMenuClose();
			}
		}
		if (
			(event.target as HTMLElement).tagName !== 'INPUT' &&
			(event.target as HTMLElement).tagName !== 'TEXTAREA'
		) {
			event.preventDefault();
		}
	};
	onDropdownIndicatorMouseDown = (
		event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
	) => {
		// ignore mouse events that weren't triggered by the primary button
		if (
			event &&
			event.type === 'mousedown' &&
			(event as React.MouseEvent<HTMLDivElement>).button !== 0
		) {
			return;
		}
		if (this.props.isDisabled) {
			return;
		}
		const { isMulti, menuIsOpen } = this.props;
		this.focusInput();
		if (menuIsOpen) {
			this.setState({ inputIsHiddenAfterUpdate: !isMulti });
			this.onMenuClose();
		} else {
			this.openMenu('first');
		}
		event.preventDefault();
	};
	onClearIndicatorMouseDown = (
		event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
	) => {
		// ignore mouse events that weren't triggered by the primary button
		if (
			event &&
			event.type === 'mousedown' &&
			(event as React.MouseEvent<HTMLDivElement>).button !== 0
		) {
			return;
		}
		this.clearValue();
		event.preventDefault();
		this.openAfterFocus = false;
		if (event.type === 'touchend') {
			this.focusInput();
		} else {
			setTimeout(() => this.focusInput());
		}
	};
	onScroll = (event: Event) => {
		if (typeof this.props.closeMenuOnScroll === 'boolean') {
			if (event.target instanceof HTMLElement && isDocumentElement(event.target)) {
				this.props.onMenuClose();
			}
		} else if (typeof this.props.closeMenuOnScroll === 'function') {
			if (this.props.closeMenuOnScroll(event)) {
				this.props.onMenuClose();
			}
		}
	};

	// ==============================
	// Composition Handlers
	// ==============================

	startListeningComposition() {
		if (document && document.addEventListener) {
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.addEventListener('compositionstart', this.onCompositionStart, false);
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.addEventListener('compositionend', this.onCompositionEnd, false);
		}
	}
	stopListeningComposition() {
		if (document && document.removeEventListener) {
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.removeEventListener('compositionstart', this.onCompositionStart);
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.removeEventListener('compositionend', this.onCompositionEnd);
		}
	}
	onCompositionStart = () => {
		this.isComposing = true;
	};
	onCompositionEnd = () => {
		this.isComposing = false;
	};

	// ==============================
	// Touch Handlers
	// ==============================

	startListeningToTouch() {
		if (document && document.addEventListener) {
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.addEventListener('touchstart', this.onTouchStart, false);
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.addEventListener('touchmove', this.onTouchMove, false);
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.addEventListener('touchend', this.onTouchEnd, false);
		}
	}
	stopListeningToTouch() {
		if (document && document.removeEventListener) {
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.removeEventListener('touchstart', this.onTouchStart);
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.removeEventListener('touchmove', this.onTouchMove);
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.removeEventListener('touchend', this.onTouchEnd);
		}
	}
	onTouchStart = ({ touches }: TouchEvent) => {
		const touch = touches && touches.item(0);
		if (!touch) {
			return;
		}

		this.initialTouchX = touch.clientX;
		this.initialTouchY = touch.clientY;
		this.userIsDragging = false;
	};
	onTouchMove = ({ touches }: TouchEvent) => {
		const touch = touches && touches.item(0);
		if (!touch) {
			return;
		}

		const deltaX = Math.abs(touch.clientX - this.initialTouchX);
		const deltaY = Math.abs(touch.clientY - this.initialTouchY);
		const moveThreshold = 5;

		this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
	};
	onTouchEnd = (event: TouchEvent) => {
		if (this.userIsDragging) {
			return;
		}

		// close the menu if the user taps outside
		// we're checking on event.target here instead of event.currentTarget, because we want to assert information
		// on events on child elements, not the document (which we've attached this handler to).
		if (
			this.controlRef &&
			!this.controlRef.contains(event.target as Node) &&
			this.menuListRef &&
			!this.menuListRef.contains(event.target as Node)
		) {
			this.blurInput();
		}

		// reset move vars
		this.initialTouchX = 0;
		this.initialTouchY = 0;
	};
	onControlTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
		if (this.userIsDragging) {
			return;
		}
		this.onControlMouseDown(event);
	};
	onClearIndicatorTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
		if (this.userIsDragging) {
			return;
		}

		this.onClearIndicatorMouseDown(event);
	};
	onDropdownIndicatorTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
		if (this.userIsDragging) {
			return;
		}

		this.onDropdownIndicatorMouseDown(event);
	};

	// ==============================
	// Focus Handlers
	// ==============================

	handleInputChange: FormEventHandler<HTMLInputElement> = (event) => {
		const { inputValue: prevInputValue } = this.props;
		const inputValue = event.currentTarget.value;
		this.setState({ inputIsHiddenAfterUpdate: false });
		this.onInputChange(inputValue, { action: 'input-change', prevInputValue });
		if (!this.props.menuIsOpen) {
			this.onMenuOpen();
		}
	};
	onInputFocus: FocusEventHandler<HTMLInputElement> = (event) => {
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
		this.setState({
			inputIsHiddenAfterUpdate: false,
			isFocused: true,
		});
		if (this.openAfterFocus || this.props.openMenuOnFocus) {
			this.openMenu('first');
		}
		this.openAfterFocus = false;
	};
	onInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
		const { inputValue: prevInputValue } = this.props;
		if (this.menuListRef && this.menuListRef.contains(document.activeElement)) {
			this.inputRef!.focus();
			return;
		}
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
		this.onInputChange('', { action: 'input-blur', prevInputValue });
		if (fg('platform_dst_select_menu_close_on_blur')) {
			// when fg is enabled, we only call onMenuClose when this.props.menuIsOpen is true.
			this.props.menuIsOpen && this.onMenuClose();
		} else {
			this.onMenuClose();
		}

		this.setState({
			focusedValue: null,
			isFocused: false,
		});
	};
	onOptionHover = (focusedOption: Option) => {
		if (this.blockOptionHover || this.state.focusedOption === focusedOption) {
			return;
		}
		const options = this.getFocusableOptions();
		const focusedOptionIndex = options.indexOf(focusedOption!);
		this.setState({
			focusedOption,
			focusedOptionId: focusedOptionIndex > -1 ? this.getFocusedOptionId(focusedOption) : null,
		});
	};
	shouldHideSelectedOptions = () => {
		return shouldHideSelectedOptions(this.props);
	};

	// If the hidden input gets focus through form submit,
	// redirect focus to focusable input.
	onValueInputFocus: FocusEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();

		this.focus();
	};

	// ==============================
	// Keyboard Handlers
	// ==============================

	onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
		const {
			isMulti,
			backspaceRemovesValue,
			escapeClearsValue,
			inputValue,
			isClearable,
			isDisabled,
			menuIsOpen,
			onKeyDown,
			tabSelectsValue,
			openMenuOnFocus,
		} = this.props;
		const { focusedOption, focusedValue, selectValue } = this.state;

		if (isDisabled) {
			return;
		}

		if (typeof onKeyDown === 'function') {
			onKeyDown(event);
			if (event.defaultPrevented) {
				return;
			}
		}

		// Block option hover events when the user has just pressed a key
		this.blockOptionHover = true;
		switch (event.key) {
			case 'ArrowLeft':
				if (!isMulti || inputValue) {
					return;
				}
				this.focusValue('previous');
				break;
			case 'ArrowRight':
				if (!isMulti || inputValue) {
					return;
				}
				this.focusValue('next');
				break;
			case 'Delete':
			case 'Backspace':
				if (inputValue) {
					return;
				}
				if (focusedValue) {
					this.removeValue(focusedValue);
				} else {
					if (!backspaceRemovesValue) {
						return;
					}
					if (isMulti) {
						this.popValue();
					} else if (isClearable) {
						this.clearValue();
					}
				}
				break;
			case 'Tab':
				if (this.isComposing) {
					return;
				}

				if (
					event.shiftKey ||
					!menuIsOpen ||
					!tabSelectsValue ||
					!focusedOption ||
					// don't capture the event if the menu opens on focus and the focused
					// option is already selected; it breaks the flow of navigation
					(openMenuOnFocus && this.isOptionSelected(focusedOption, selectValue))
				) {
					return;
				}
				this.selectOption(focusedOption);
				break;
			case 'Enter':
				if (event.keyCode === 229) {
					// ignore the keydown event from an Input Method Editor(IME)
					// ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
					break;
				}

				if (focusedValue) {
					this.removeValue(focusedValue);
				}
				if (menuIsOpen) {
					if (!focusedOption) {
						return;
					}
					if (this.isComposing) {
						return;
					}
					this.selectOption(focusedOption);
					break;
				}
				return;
			case 'Escape':
				if (menuIsOpen) {
					this.setState({
						inputIsHiddenAfterUpdate: false,
					});
					this.onInputChange('', {
						action: 'menu-close',
						prevInputValue: inputValue,
					});
					this.onMenuClose();
				} else if (isClearable && escapeClearsValue) {
					this.clearValue();
				}
				break;
			case ' ': // space
				if (inputValue) {
					return;
				}
				if (!menuIsOpen) {
					this.openMenu('first');
					break;
				}
				if (!focusedOption) {
					return;
				}
				this.selectOption(focusedOption);
				break;
			case 'ArrowUp':
				if (menuIsOpen) {
					this.focusOption('up');
				} else {
					this.openMenu('last');
				}
				break;
			case 'ArrowDown':
				if (menuIsOpen) {
					this.focusOption('down');
				} else {
					this.openMenu('first');
				}
				break;
			case 'PageUp':
				if (!menuIsOpen) {
					return;
				}
				this.focusOption('pageup');
				break;
			case 'PageDown':
				if (!menuIsOpen) {
					return;
				}
				this.focusOption('pagedown');
				break;
			case 'Home':
				if (!menuIsOpen) {
					return;
				}
				this.focusOption('first');
				break;
			case 'End':
				if (!menuIsOpen) {
					return;
				}
				this.focusOption('last');
				break;
			default:
				return;
		}
		event.preventDefault();
	};

	// ==============================
	// Renderers
	// ==============================
	renderInput() {
		const {
			form,
			inputId,
			inputValue,
			isDisabled,
			isInvalid,
			isRequired,
			isSearchable,
			label,
			labelId,
			menuIsOpen,
			required,
			tabIndex = 0,
			testId,
		} = this.props;
		const { Input } = this.getComponents();
		const { inputIsHidden } = this.state;
		const { commonProps } = this;

		const id = inputId || this.getElementId('input');

		// aria attributes makes the JSX "noisy", separated for clarity
		const ariaAttributes = {
			'aria-autocomplete': 'both' as const,
			'aria-errormessage': this.props['aria-errormessage'],
			'aria-expanded': menuIsOpen,
			// TODO: aria-haspopup is implied as listbox with role="combobox" and was deprecated for aria 1.2, we still might need to keep it for back compat
			'aria-haspopup': this.props['UNSAFE_is_experimental_generic']
				? ('dialog' as AriaAttributes['aria-haspopup'])
				: ('listbox' as AriaAttributes['aria-haspopup']),
			'aria-invalid': this.props['aria-invalid'] || isInvalid,
			'aria-label': this.props['aria-label'] || label,
			'aria-labelledby': this.props['aria-labelledby'] || labelId,
			'aria-required': required || isRequired,
			role: 'combobox',
			'aria-activedescendant': this.props['UNSAFE_is_experimental_generic']
				? undefined
				: this.state.focusedOptionId || this.state.focusedValueId || undefined,
			...(menuIsOpen && {
				'aria-controls': this.getElementId('listbox'),
			}),
			// TODO: Might need to remove this
			...(!isSearchable && {
				'aria-readonly': true,
			}),
			...this.calculateDescription(),
		};

		if (!isSearchable) {
			// use a dummy input to maintain focus/blur functionality
			return (
				<DummyInput
					id={id}
					innerRef={this.getInputRef}
					onBlur={this.onInputBlur}
					onChange={noop}
					onFocus={this.onInputFocus}
					disabled={isDisabled}
					tabIndex={tabIndex}
					inputMode="none"
					form={form}
					value=""
					data-testid={testId && `${testId}-select--input`}
					{...ariaAttributes}
				/>
			);
		}

		return (
			<Input
				{...commonProps}
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect="off"
				id={id}
				testId={testId}
				innerRef={this.getInputRef}
				isDisabled={isDisabled}
				isHidden={inputIsHidden}
				onBlur={this.onInputBlur}
				onChange={this.handleInputChange}
				onFocus={this.onInputFocus}
				spellCheck="false"
				tabIndex={tabIndex}
				form={form}
				type="text"
				value={inputValue}
				{...ariaAttributes}
			/>
		);
	}
	renderPlaceholderOrValue() {
		const {
			MultiValue,
			MultiValueContainer,
			MultiValueLabel,
			MultiValueRemove,
			SingleValue,
			Placeholder,
		} = this.getComponents();
		const { commonProps } = this;
		const { controlShouldRenderValue, isDisabled, isMulti, inputValue, placeholder, testId } =
			this.props;
		const { selectValue, focusedValue, isFocused } = this.state;

		if (!this.hasValue() || !controlShouldRenderValue) {
			return inputValue ? null : (
				<Placeholder
					{...commonProps}
					key="placeholder"
					isDisabled={isDisabled}
					isFocused={isFocused}
					innerProps={{
						id: this.getElementId('placeholder'),
						...(testId && {
							'data-testid': `${testId}-select--placeholder`,
						}),
					}}
				>
					{placeholder}
				</Placeholder>
			);
		}

		if (isMulti) {
			return selectValue.map((opt, index) => {
				const isOptionFocused = opt === focusedValue;
				const key = `${this.getOptionLabel(opt)}-${this.getOptionValue(opt)}`;

				return (
					<MultiValue
						{...commonProps}
						components={{
							Container: MultiValueContainer,
							Label: MultiValueLabel,
							Remove: MultiValueRemove,
						}}
						isFocused={isOptionFocused}
						isDisabled={isDisabled}
						key={key}
						index={index}
						removeProps={{
							onClick: () => this.removeValue(opt),
							onTouchEnd: () => this.removeValue(opt),
							onMouseDown: (e) => {
								e.preventDefault();
							},
							...(testId && {
								'data-testid': `${testId}-select--multivalue-${index}-remove`,
							}),
							id: `${this.getElementId('selected-value')}-${index}-remove`,
						}}
						data={opt}
						innerProps={{
							...(testId && {
								'data-testid': `${testId}-select--multivalue-${index}`,
							}),
							id: `${this.getElementId('selected-value')}-${index}`,
						}}
					>
						{this.formatOptionLabel(opt, 'value')}
					</MultiValue>
				);
			});
		}

		if (inputValue) {
			return null;
		}

		const singleValue = selectValue[0];
		return (
			<SingleValue
				{...commonProps}
				data={singleValue}
				isDisabled={isDisabled}
				innerProps={{ id: this.getElementId('single-value') }}
			>
				{this.formatOptionLabel(singleValue, 'value')}
			</SingleValue>
		);
	}
	renderClearIndicator() {
		const { ClearIndicator } = this.getComponents();
		const { commonProps } = this;
		const { clearControlLabel, isDisabled, isLoading, spacing, testId } = this.props;
		const { isFocused } = this.state;

		if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
			return null;
		}

		const innerProps = {
			onMouseDown: this.onClearIndicatorMouseDown,
			onTouchEnd: this.onClearIndicatorTouchEnd,
			...(testId && {
				'data-testid': `${testId}-select--clear-indicator`,
			}),
		};
		const isCompact = spacing === 'compact';

		return (
			<ClearIndicator
				clearControlLabel={clearControlLabel}
				{...commonProps}
				innerProps={innerProps}
				isFocused={isFocused}
				isCompact={isCompact}
			/>
		);
	}
	renderLoadingIndicator() {
		const { LoadingIndicator } = this.getComponents();
		const { commonProps } = this;
		const { isDisabled, isLoading, spacing, testId } = this.props;
		const { isFocused } = this.state;

		if (!LoadingIndicator || !isLoading) {
			return null;
		}
		const isCompact = spacing === 'compact';

		const innerProps = { 'aria-hidden': 'true' };
		return (
			<LoadingIndicator
				data-testid={testId && `${testId}-select--loading-indicator`}
				{...commonProps}
				innerProps={innerProps}
				isDisabled={isDisabled}
				isFocused={isFocused}
				isCompact={isCompact}
			/>
		);
	}

	renderDropdownIndicator() {
		const { DropdownIndicator } = this.getComponents();
		if (!DropdownIndicator) {
			return null;
		}
		const { commonProps } = this;
		const { isDisabled, spacing, testId } = this.props;
		const { isFocused } = this.state;
		const isCompact = spacing === 'compact';

		const innerProps = {
			onMouseDown: this.onDropdownIndicatorMouseDown,
			onTouchEnd: this.onDropdownIndicatorTouchEnd,
			'aria-hidden': 'true',
			...(testId && {
				'data-testid': `${testId}-select--dropdown-indicator`,
			}),
		};

		return (
			<DropdownIndicator
				{...commonProps}
				innerProps={innerProps}
				isDisabled={isDisabled}
				isFocused={isFocused}
				isCompact={isCompact}
			/>
		);
	}
	renderMenu() {
		const {
			Group,
			GroupHeading,
			Menu,
			MenuList,
			MenuPortal,
			LoadingMessage,
			NoOptionsMessage,
			Option,
		} = this.getComponents();
		const { commonProps } = this;
		const { focusedOption } = this.state;
		const {
			captureMenuScroll,
			inputValue,
			isLoading,
			loadingMessage,
			minMenuHeight,
			maxMenuHeight,
			menuIsOpen,
			menuPlacement,
			menuPosition,
			menuPortalTarget,
			menuShouldBlockScroll,
			menuShouldScrollIntoView,
			noOptionsMessage,
			onMenuScrollToTop,
			onMenuScrollToBottom,
			testId,
		} = this.props;

		if (!menuIsOpen) {
			return null;
		}

		// TODO: Internal Option Type here
		const render = (props: CategorizedOption<Option>, id: string, headingId?: string) => {
			const { type, data, isDisabled, isSelected, label, value } = props;

			const isFocused = focusedOption === data;
			const onHover = isDisabled ? undefined : () => this.onOptionHover(data);
			const onSelect = isDisabled ? undefined : () => this.selectOption(data);
			const optionId = `${this.getElementId('option')}-${id}`;
			const innerProps = {
				id: optionId,
				onClick: onSelect,
				onMouseMove: onHover,
				onMouseOver: onHover,
				role: this.props['UNSAFE_is_experimental_generic'] ? 'listitem' : 'option',
				'aria-selected': this.props['UNSAFE_is_experimental_generic'] ? undefined : isSelected,
				// We don't want aria-disabled if it's false. It's just noisy.
				'aria-disabled': !isDisabled ? undefined : isDisabled,
				'aria-describedby': headingId,
				...(testId && {
					'data-testid': `${testId}-select--option-${id}`,
				}),
			};

			return (
				<Option
					{...commonProps}
					innerProps={innerProps}
					data={data}
					isDisabled={isDisabled}
					isSelected={isSelected}
					key={optionId}
					label={label}
					type={type}
					value={value}
					isFocused={isFocused}
					innerRef={isFocused ? this.getFocusedOptionRef : undefined}
				>
					{this.formatOptionLabel(props.data, 'menu')}
				</Option>
			);
		};

		let menuUI: ReactNode;

		if (this.hasOptions()) {
			const items = this.getCategorizedOptions();
			menuUI = items.map((item) => {
				if (item.type === 'group') {
					const { data, options, index: groupIndex } = item;
					const groupId = `${this.getElementId('group')}-${groupIndex}`;
					const headingId = `${groupId}-heading`;

					return (
						<Group
							{...commonProps}
							key={groupId}
							data={data}
							options={options}
							Heading={GroupHeading}
							headingProps={{
								id: headingId,
								data: item.data,
								...(testId && {
									'data-testid': `${testId}-select--group-${groupIndex}-heading`,
								}),
							}}
							label={this.formatGroupLabel(item.data)}
						>
							{item.options.map((option) =>
								render(option, `${groupIndex}-${option.index}`, headingId),
							)}
						</Group>
					);
				} else if (item.type === 'option') {
					return render(item, `${item.index}`);
				}
			});
		} else if (isLoading) {
			const message = loadingMessage({ inputValue });
			if (message === null) {
				return null;
			}
			menuUI = <LoadingMessage {...commonProps}>{message}</LoadingMessage>;
		} else {
			const message = noOptionsMessage({ inputValue });
			if (message === null) {
				return null;
			}
			menuUI = (
				<NoOptionsMessage
					{...commonProps}
					innerProps={{
						...(testId && {
							'data-testid': `${testId}-select--no-options`,
						}),
					}}
				>
					{message}
				</NoOptionsMessage>
			);
		}
		const menuPlacementProps = {
			minMenuHeight,
			maxMenuHeight,
			menuPlacement,
			menuPosition,
			menuShouldScrollIntoView,
		};

		const menuElement = (
			<MenuPlacer {...commonProps} {...menuPlacementProps}>
				{({ ref, placerProps: { placement, maxHeight } }) => (
					<Menu
						{...commonProps}
						{...menuPlacementProps}
						innerRef={ref}
						innerProps={{
							onMouseDown: this.onMenuMouseDown,
							onMouseMove: this.onMenuMouseMove,
							id: this.props.components.Menu ? this.getElementId('listbox') : undefined,
							...(testId && {
								'data-testid': `${testId}-select--listbox-container`,
							}),
						}}
						isLoading={isLoading}
						placement={placement}
					>
						<ScrollManager
							captureEnabled={captureMenuScroll}
							onTopArrive={onMenuScrollToTop}
							onBottomArrive={onMenuScrollToBottom}
							lockEnabled={menuShouldBlockScroll}
						>
							{(scrollTargetRef) => (
								<MenuList
									{...commonProps}
									innerRef={(instance) => {
										this.getMenuListRef(instance);
										scrollTargetRef(instance);
									}}
									innerProps={{
										role: this.props['UNSAFE_is_experimental_generic'] ? 'dialog' : 'listbox',
										...(this.props['UNSAFE_is_experimental_generic'] && {
											'aria-labelledby': this.inputRef?.id || this.getElementId('input'),
										}),
										'aria-multiselectable':
											!commonProps.isMulti || this.props['UNSAFE_is_experimental_generic']
												? undefined
												: commonProps.isMulti,
										id: this.getElementId('listbox'),
										...(testId && {
											'data-testid': `${testId}-select--listbox`,
										}),
										// add aditional label on listbox for safari to announce first option
										...(isSafari() &&
											!this.props['UNSAFE_is_experimental_generic'] && {
												'aria-describedby': this.inputRef?.id || this.getElementId('input'),
											}),
									}}
									isLoading={isLoading}
									maxHeight={maxHeight}
									focusedOption={focusedOption}
								>
									{this.props['UNSAFE_is_experimental_generic'] ? (
										<div role="list">{menuUI}</div>
									) : (
										menuUI
									)}
								</MenuList>
							)}
						</ScrollManager>
					</Menu>
				)}
			</MenuPlacer>
		);

		// positioning behaviour is almost identical for portalled and fixed,
		// so we use the same component. the actual portalling logic is forked
		// within the component based on `menuPosition`
		return menuPortalTarget || menuPosition === 'fixed' ? (
			<MenuPortal
				{...commonProps}
				appendTo={menuPortalTarget}
				controlElement={this.controlRef}
				menuPlacement={menuPlacement}
				menuPosition={menuPosition}
			>
				{menuElement}
			</MenuPortal>
		) : (
			menuElement
		);
	}
	renderFormField() {
		const { delimiter, isDisabled, isMulti, required, name } = this.props;
		const { selectValue } = this.state;

		if (required && !this.hasValue() && !isDisabled) {
			return <RequiredInput name={name} onFocus={this.onValueInputFocus} />;
		}

		if (!name || isDisabled) {
			return;
		}

		if (isMulti) {
			if (delimiter) {
				const value = selectValue.map((opt) => this.getOptionValue(opt)).join(delimiter);
				return <input name={name} type="hidden" value={value} />;
			} else {
				const input =
					selectValue.length > 0 ? (
						selectValue.map((opt, i) => (
							<input key={`i-${i}`} name={name} type="hidden" value={this.getOptionValue(opt)} />
						))
					) : (
						<input name={name} type="hidden" value="" />
					);

				return <div>{input}</div>;
			}
		} else {
			const value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';
			return <input name={name} type="hidden" value={value} />;
		}
	}

	renderLiveRegion() {
		const { commonProps } = this;
		const { ariaSelection, isFocused, selectValue } = this.state;

		const focusableOptions = this.getFocusableOptions();

		return (
			<LiveRegion
				{...commonProps}
				id={this.getElementId('live-region')}
				ariaSelection={ariaSelection}
				isFocused={isFocused}
				selectValue={selectValue}
				focusableOptions={focusableOptions}
			/>
		);
	}

	renderMultiselectMessage() {
		// In the future, when we actually support touch devices, we'll need to update this to not be keyboard specific.
		// Also, since this is rendered onscreen, it should be transtlated automatically.
		const msg = `, multiple selections available, ${this.state.selectValue.length ? 'Use left or right arrow keys to navigate selected items' : ''}`;
		return (
			// eslint-disable-next-line @atlaskit/design-system/use-primitives-text

			<span id={this.getElementId('multi-message')} hidden>
				{msg}
			</span>
		);
	}

	handleOpenLayerObserverCloseSignal = () => {
		this.onMenuClose();
	};

	render() {
		const { Control, IndicatorsContainer, SelectContainer, ValueContainer } = this.getComponents();

		const {
			className,
			id,
			isDisabled,
			menuIsOpen,
			isInvalid,
			testId,
			appearance = 'default',
			spacing = 'default',
		} = this.props;
		const { isFocused } = this.state;
		const commonProps = (this.commonProps = this.getCommonProps());
		const isCompact = spacing === 'compact';
		return (
			<SelectContainer
				{...commonProps}
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
				className={className}
				innerProps={{
					id: id,
					onKeyDown: this.onKeyDown,
					...(testId && {
						'data-testid': testId && `${testId}-select--container`,
					}),
				}}
				isDisabled={isDisabled}
				isFocused={isFocused}
			>
				{this.renderLiveRegion()}
				{commonProps.isMulti && this.renderMultiselectMessage()}
				<Control
					{...commonProps}
					innerRef={this.getControlRef}
					innerProps={{
						onMouseDown: this.onControlMouseDown,
						onTouchEnd: this.onControlTouchEnd,
						...(testId && {
							'data-testid': `${testId}-select--control`,
						}),
					}}
					appearance={appearance}
					isInvalid={isInvalid}
					isDisabled={isDisabled}
					isFocused={isFocused}
					menuIsOpen={menuIsOpen}
					isCompact={isCompact}
				>
					<ValueContainer
						{...commonProps}
						isDisabled={isDisabled}
						isCompact={isCompact}
						innerProps={{
							...(testId && {
								'data-testid': `${testId}-select--value-container`,
							}),
							...(commonProps.isMulti &&
								commonProps.hasValue &&
								!isAppleDevice() && {
									// Required to keep JAWS from popping out of forms mode when using LEFT/RIGHT arrow keys.
									// This is Jedi Master level ARIA and not taken lightly. Do not modify without consulting
									// DST Accessibility.
									role: 'application',
								}),
						}}
					>
						{this.renderPlaceholderOrValue()}
						{this.renderInput()}
					</ValueContainer>
					<IndicatorsContainer
						{...commonProps}
						isDisabled={isDisabled}
						innerProps={{
							...(testId && {
								'data-testid': `${testId}-select--indicators-container`,
							}),
						}}
					>
						{this.renderClearIndicator()}
						{this.renderLoadingIndicator()}
						{this.renderDropdownIndicator()}
					</IndicatorsContainer>
				</Control>
				{this.renderMenu()}
				{this.renderFormField()}
				<NotifyOpenLayerObserver
					isOpen={this.props.menuIsOpen}
					onClose={this.handleOpenLayerObserverCloseSignal}
				/>
			</SelectContainer>
		);
	}
}

export type PublicBaseSelectProps<
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
> = JSX.LibraryManagedAttributes<typeof Select, SelectProps<Option, IsMulti, Group>>;
