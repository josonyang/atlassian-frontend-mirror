/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import {
	type CSSProperties,
	forwardRef,
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import { isValid, parseISO } from 'date-fns';
// This is a deprecated component but we will be able to use the actual hook
// version very soon from converting this to functional. And also React 18 is on
// the horizon
import { useUID } from 'react-uid';

import { usePlatformLeafEventHandler } from '@atlaskit/analytics-next';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import { createLocalizationProvider, type LocalizationProvider } from '@atlaskit/locale';
import { Pressable, xcss } from '@atlaskit/primitives';
import Select, {
	type ActionMeta,
	type DropdownIndicatorProps,
	type GroupType,
	type InputActionMeta,
	mergeStyles,
	type OptionType,
} from '@atlaskit/select';
import { N500, N70 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import VisuallyHidden from '@atlaskit/visually-hidden';

import { EmptyComponent } from '../internal';
import {
	formatDate,
	getParsedISO,
	getPlaceholder,
	isDateDisabled,
	parseDate,
} from '../internal/date-picker-migration';
import { Menu } from '../internal/menu';
import { getSafeCalendarValue, getShortISOString } from '../internal/parse-date';
import { makeSingleValue } from '../internal/single-value';
import {
	type Appearance,
	type DatePickerBaseProps,
	type DateTimePickerSelectProps,
	type Spacing,
} from '../types';

const packageName = process.env._PACKAGE_NAME_ as string;
const packageVersion = process.env._PACKAGE_VERSION_ as string;

export type DatePickerProps = DatePickerBaseProps & {
	icon?: React.ComponentType<DropdownIndicatorProps<OptionType>>;
	selectProps?: DateTimePickerSelectProps & { inputValue?: string };
};

const analyticsAttributes = {
	componentName: 'datePicker',
	packageName,
	packageVersion,
};

const pickerContainerStyles = css({
	position: 'relative',
});

const iconContainerStyles = css({
	display: 'flex',
	height: '100%',
	position: 'absolute',
	alignItems: 'center',
	flexBasis: 'inherit',
	color: token('color.text.subtlest', N70),
	insetBlockStart: 0,
	insetInlineEnd: 0,
	transition: `color 150ms`,
	'&:hover': {
		color: token('color.text.subtle', N500),
	},
});

const iconSpacingWithClearButtonStyles = css({
	marginInlineEnd: token('space.400', '2rem'),
});

const iconSpacingWithoutClearButtonStyles = css({
	marginInlineEnd: token('space.025', '0.125rem'),
});

const calendarButtonStyles = xcss({
	borderRadius: 'border.radius',
	':hover': {
		backgroundColor: 'color.background.neutral.subtle.hovered',
	},
	':active': {
		backgroundColor: 'color.background.neutral.subtle.pressed',
	},
});
/**
 * __Date picker__
 *
 * A date picker allows the user to select a particular date.
 *
 * - [Examples](https://atlassian.design/components/datetime-picker/date-picker/examples)
 * - [Code](https://atlassian.design/components/datetime-picker/date-picker/code)
 * - [Usage](https://atlassian.design/components/datetime-picker/date-picker/usage)
 */
const DatePicker = forwardRef((props: DatePickerProps, forwardedRef) => {
	const containerRef: React.MutableRefObject<HTMLElement | null> = useRef<HTMLElement>(null);
	const calendarRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
	const calendarButtonRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);

	const {
		appearance = 'default' as Appearance,
		autoFocus = false,
		hideIcon = false,
		openCalendarLabel = 'Open calendar',
		defaultIsOpen = false,
		defaultValue = '',
		disabled = [] as string[],
		disabledDateFilter = (_: string) => false,
		icon = CalendarIcon as unknown as React.ComponentType<DropdownIndicatorProps<OptionType>>,
		id = '',
		innerProps = {},
		inputLabel = 'Date picker',
		inputLabelId,
		isDisabled = false,
		isInvalid = false,
		isRequired = false,
		label = '',
		name = '',
		// eslint-disable-next-line @repo/internal/react/use-noop
		onBlur = (_event: React.FocusEvent<HTMLInputElement>) => {},
		// eslint-disable-next-line @repo/internal/react/use-noop
		onChange: onChangeProp = (_value: string) => {},
		// eslint-disable-next-line @repo/internal/react/use-noop
		onFocus = (_event: React.FocusEvent<HTMLInputElement>) => {},
		selectProps = {},
		shouldShowCalendarButton,
		spacing = 'default' as Spacing,
		locale: propLocale = 'en-US',
		value: propValue,
		isOpen: isOpenProp,
		maxDate,
		minDate,
		weekStartDay,
		formatDisplayLabel,
		testId,
		'aria-describedby': ariaDescribedBy,
		placeholder,
		nextMonthLabel,
		previousMonthLabel,
		...rest
	} = props;
	const [isOpen, setIsOpen] = useState(defaultIsOpen);
	const [_, setIsFocused] = useState(false);
	const [clearingFromIcon, setClearingFromIcon] = useState(false);
	const [selectInputValue, setSelectInputValue] = useState(selectProps.inputValue);
	const [value, setValue] = useState(propValue || defaultValue);
	const [calendarValue, setCalendarValue] = useState(
		propValue || defaultValue || getShortISOString(new Date()),
	);
	const [l10n, setL10n] = useState<LocalizationProvider>(createLocalizationProvider(propLocale));
	const [locale, setLocale] = useState(propLocale);
	const [shouldSetFocusOnCurrentDay, setShouldSetFocusOnCurrentDay] = useState(false);
	const [isKeyDown, setIsKeyDown] = useState(false);
	const [wasOpenedFromCalendarButton, setWasOpenedFromCalendarButton] = useState(false);

	// Hack to force update: https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
	const [, forceUpdate] = useReducer((x) => !x, true);

	const onChangePropWithAnalytics = usePlatformLeafEventHandler({
		fn: onChangeProp,
		action: 'selectedDate',
		actionSubject: 'datePicker',
		...analyticsAttributes,
	});

	if (propLocale !== locale) {
		setL10n(createLocalizationProvider(propLocale));
		setLocale(propLocale);
	}

	useEffect(() => {
		// We don't want the focus to move if this is a click event
		if (!isKeyDown) {
			return;
		}
		if (isOpen && wasOpenedFromCalendarButton) {
			setIsKeyDown(false);
			// Focus on the first button within the calendar
			calendarRef?.current?.querySelector('button')?.focus();
		}
	}, [isKeyDown, calendarRef, isOpen, wasOpenedFromCalendarButton]);

	const getValue = () => propValue ?? value;
	const getIsOpen = () => isOpenProp ?? isOpen;

	const onCalendarChange = ({ iso }: { iso: string }) => {
		setCalendarValue(getParsedISO({ iso }));
	};

	const onCalendarSelect = ({ iso }: { iso: string }) => {
		setSelectInputValue('');
		setIsOpen(false);
		setCalendarValue(iso);
		setValue(iso);
		setWasOpenedFromCalendarButton(false);
		onChangePropWithAnalytics(iso);

		// Yes, this is not ideal. The alternative is to be able to place a ref
		// on the inner input of Select itself, which would require a lot of
		// extra stuff in the Select component for only this one thing. While
		// this would be more "React-y", it doesn't seem to pose any other
		// benefits. Performance-wise, we are only searching within the
		// container, so it's quick.
		if (wasOpenedFromCalendarButton) {
			calendarButtonRef.current?.focus();
		} else {
			const innerCombobox: HTMLInputElement | undefined | null =
				containerRef?.current?.querySelector('[role="combobox"]');
			innerCombobox?.focus();
		}
		setIsOpen(false);
	};

	const onInputClick = () => {
		if (!isDisabled && !getIsOpen()) {
			setIsOpen(true);
			setWasOpenedFromCalendarButton(false);
		}
	};

	const onContainerBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		const newlyFocusedElement = event.relatedTarget as HTMLElement;

		if (!containerRef?.current?.contains(newlyFocusedElement)) {
			setIsOpen(false);
			setShouldSetFocusOnCurrentDay(false);
			setWasOpenedFromCalendarButton(false);
			onBlur(event);
		}
	};

	const onContainerFocus = () => {
		setShouldSetFocusOnCurrentDay(false);
	};

	const onSelectBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		const newlyFocusedElement = event.relatedTarget as HTMLElement;

		if (clearingFromIcon) {
			// Don't close menu if blurring after the user has clicked clear
			setClearingFromIcon(false);
		} else if (!containerRef?.current?.contains(newlyFocusedElement)) {
			// Don't close menu if focus is staying within the date picker's
			// container. Makes keyboard accessibility of calendar possible
			setIsOpen(false);
			setIsFocused(false);
			setWasOpenedFromCalendarButton(false);
		}
	};

	const onSelectFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		const value = getValue();

		if (clearingFromIcon) {
			// Don't open menu if focussing after the user has clicked clear
			setClearingFromIcon(false);
		} else {
			// Don't open when focused into via keyboard if the calendar button is present
			setIsOpen(!shouldShowCalendarButton);
			setCalendarValue(value);
			setIsFocused(true);
			setWasOpenedFromCalendarButton(false);
		}

		onFocus(event);
	};

	const onTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		if (inputValue) {
			const parsed = parseDate(inputValue, {
				parseInputValue: rest?.parseInputValue,
				dateFormat: rest?.dateFormat,
				l10n: l10n,
			});
			// Only try to set the date if we have month & day
			if (parsed && isValid(parsed)) {
				// We format the parsed date to YYYY-MM-DD here because
				// this is the format expected by the @atlaskit/calendar component
				setCalendarValue(getShortISOString(parsed));
			}
		}
		setIsOpen(true);
		setWasOpenedFromCalendarButton(false);
	};

	const onInputKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		const value = getValue();

		const keyPressed = event.key.toLowerCase();

		// If the input is focused and the calendar is not visible, handle space and enter clicks
		if (!isOpen && (keyPressed === 'enter' || keyPressed === ' ')) {
			setIsOpen(true);
			setWasOpenedFromCalendarButton(false);
		}

		switch (keyPressed) {
			case 'escape':
				// Yes, this is not ideal. The alternative is to be able to place a ref
				// on the inner input of Select itself, which would require a lot of
				// extra stuff in the Select component for only this one thing. While
				// this would be more "React-y", it doesn't seem to pose any other
				// benefits. Performance-wise, we are only searching within the
				// container, so it's quick.
				if (wasOpenedFromCalendarButton) {
					calendarButtonRef.current?.focus();
				} else {
					const innerCombobox: HTMLInputElement | undefined | null =
						containerRef?.current?.querySelector('[role="combobox"]');
					innerCombobox?.focus();
				}
				setIsOpen(false);
				setShouldSetFocusOnCurrentDay(false);
				setWasOpenedFromCalendarButton(false);
				break;
			case 'backspace':
			case 'delete': {
				const inputCount = 0;

				if (
					value &&
					event.target instanceof HTMLInputElement &&
					event.target.value.length <= inputCount
				) {
					// If being cleared from keyboard, don't change behaviour
					setClearingFromIcon(false);
					setValue('');
				}
				break;
			}
			case 'enter':
				if (!isOpen) {
					return;
				}
				// Prevent form submission when a date is selected
				// using enter. See https://product-fabric.atlassian.net/browse/DSP-2501
				// for more details.
				event.preventDefault();
				if (!isDateDisabled(calendarValue, { disabled })) {
					// Get a safe `calendarValue` in case the value exceeds the maximum
					// allowed by ISO 8601
					const safeCalendarValue = getSafeCalendarValue(calendarValue);
					const valueChanged = safeCalendarValue !== value;
					setSelectInputValue('');
					setIsOpen(false);
					setValue(safeCalendarValue);
					setCalendarValue(safeCalendarValue);
					setWasOpenedFromCalendarButton(wasOpenedFromCalendarButton);
					if (valueChanged) {
						onChangePropWithAnalytics(safeCalendarValue);
					}
				}
				break;
			case 'arrowdown':
			case 'arrowup':
				if (isOpen && !shouldSetFocusOnCurrentDay) {
					setShouldSetFocusOnCurrentDay(true);
				}
				break;
			default:
				break;
		}
	};

	const onCalendarButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		// We want to stop this from triggering other keydown events, particularly
		// for space and enter presses. Otherwise, it opens and then closes
		// immediately.
		if (e.type === 'keydown') {
			e.stopPropagation();
		}

		setIsKeyDown(true);
		setWasOpenedFromCalendarButton(true);
	};

	// This event handler is triggered from both keydown and click. It's weird.
	const onCalendarButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setIsOpen(!isOpen);
		setWasOpenedFromCalendarButton(true);

		e.stopPropagation();
	};

	const onClear = () => {
		setValue('');
		setCalendarValue(defaultValue || getShortISOString(new Date()));

		if (!hideIcon) {
			setClearingFromIcon(true);
		}
		onChangePropWithAnalytics('');
	};

	// `unknown` is used because `value` is unused so it does not matter.
	const onSelectChange = (_value: unknown, action: ActionMeta) => {
		// Used for native clear event in React Select
		// Triggered when clicking ClearIndicator or backspace with no value
		if (action.action === 'clear') {
			onClear();
		}
	};

	const handleSelectInputChange = (selectInputValue: string, actionMeta: InputActionMeta) => {
		if (selectProps.onInputChange) {
			selectProps.onInputChange(selectInputValue, actionMeta);
		}
		setSelectInputValue(selectInputValue);
	};

	const getContainerRef = useCallback(
		(ref: HTMLElement | null) => {
			const oldRef = containerRef.current;
			containerRef.current = ref;

			// Cause a re-render if we're getting the container ref for the first time
			// as the layered menu requires it for dimension calculation
			if (oldRef == null && ref != null) {
				forceUpdate();
			}
		},
		[containerRef],
	);

	const getterValue = getValue();

	let actualSelectInputValue;

	actualSelectInputValue = selectInputValue;

	const menuIsOpen = getIsOpen() && !isDisabled;

	const showClearIndicator = Boolean((getterValue || selectInputValue) && !hideIcon);

	const dropDownIcon = appearance === 'subtle' || hideIcon || showClearIndicator ? null : icon;

	const SingleValue = makeSingleValue({ lang: propLocale });

	const selectComponents = {
		DropdownIndicator: shouldShowCalendarButton ? EmptyComponent : dropDownIcon,
		Menu,
		SingleValue,
		...(!showClearIndicator && { ClearIndicator: EmptyComponent }),
	};

	const { styles: selectStyles = {} } = selectProps;
	const disabledStyle: CSSProperties = isDisabled
		? {
				pointerEvents: 'none',
				color: token('color.icon.disabled', 'inherit'),
			}
		: {};

	const calendarProps = {
		calendarContainerRef: containerRef.current,
		calendarDisabled: disabled,
		calendarDisabledDateFilter: disabledDateFilter,
		calendarMaxDate: maxDate,
		calendarMinDate: minDate,
		calendarRef: calendarRef,
		calendarValue: getterValue && getShortISOString(parseISO(getterValue)),
		calendarView: calendarValue,
		onCalendarChange,
		onCalendarSelect,
		calendarLocale: locale,
		calendarWeekStartDay: weekStartDay,
		shouldSetFocusOnCurrentDay,
	};

	// @ts-ignore -- Argument of type 'StylesConfig<OptionType, false, GroupBase<OptionType>>' is not assignable to parameter of type 'StylesConfig<OptionType, boolean, GroupBase<OptionType>>'.
	const mergedStyles = mergeStyles<OptionType, boolean, GroupType<OptionType>>(selectStyles, {
		control: (base: any) => ({
			...base,
			...disabledStyle,
		}),
		indicatorsContainer: (base) => ({
			...base,
			paddingLeft: token('space.025', '2px'), // ICON_PADDING = 2
			paddingRight: token('space.075', '6px'), // 8 - ICON_PADDING = 6
		}),
	});

	const initialValue = getterValue
		? {
				label: formatDate(getterValue, {
					formatDisplayLabel,
					dateFormat: rest?.dateFormat,
					l10n: l10n,
				}),
				value: getterValue,
			}
		: null;

	// `label` takes precedence of the `inputLabel`
	const fullopenCalendarLabel =
		label || inputLabel ? `${label || inputLabel} , ${openCalendarLabel}` : openCalendarLabel;
	const openCalendarLabelId = `open-calendar-label--${useUID()}`;

	return (
		// These event handlers must be on this element because the events come
		// from different child elements.
		<div
			{...innerProps}
			css={pickerContainerStyles}
			role="presentation"
			onBlur={onContainerBlur}
			onFocus={onContainerFocus}
			onClick={onInputClick}
			onInput={onTextInput}
			onKeyDown={onInputKeyDown}
			ref={getContainerRef}
			data-testid={testId && `${testId}--container`}
		>
			<input
				name={name}
				type="hidden"
				value={getterValue}
				data-testid={testId && `${testId}--input`}
			/>
			<Select
				appearance={appearance}
				aria-describedby={ariaDescribedBy}
				aria-label={label || undefined}
				autoFocus={autoFocus}
				closeMenuOnSelect
				// For some reason, this and the below `styles` type error _only_ show
				// up when you alter some of the properties in the `selectComponents`
				// object. These errors are still present, and I suspect have always
				// been present, without changing the unrelated code. Ignoring as the
				// component still works as expected despite this error. And also
				// because the select refresh team may solve it later.
				components={selectComponents}
				enableAnimation={false}
				inputId={id}
				inputValue={actualSelectInputValue}
				isDisabled={isDisabled}
				isRequired={isRequired}
				menuIsOpen={menuIsOpen}
				onBlur={onSelectBlur}
				onChange={onSelectChange}
				onFocus={onSelectFocus}
				onInputChange={handleSelectInputChange}
				placeholder={getPlaceholder({
					placeholder: placeholder,
					l10n: l10n,
				})}
				styles={mergedStyles}
				value={initialValue}
				{...selectProps}
				// These are below the spread because I don't know what is in
				// selectProps or not and what wil be overwritten
				isClearable
				isInvalid={isInvalid}
				spacing={spacing}
				testId={testId}
				// These aren't part of `Select`'s API, but we're using them here.
				// @ts-ignore --  Property 'calendarContainerRef' does not exist on type 'IntrinsicAttributes & LibraryManagedAttributes<(<Option extends unknown = OptionType, IsMulti extends boolean = false>(props: AtlaskitSelectProps<Option, IsMulti> & { ...; }) => Element), AtlaskitSelectProps<...> & { ...; }>'.
				calendarContainerRef={calendarProps.calendarContainerRef}
				calendarDisabled={calendarProps.calendarDisabled}
				calendarDisabledDateFilter={calendarProps.calendarDisabledDateFilter}
				calendarLocale={calendarProps.calendarLocale}
				calendarMaxDate={calendarProps.calendarMaxDate}
				calendarMinDate={calendarProps.calendarMinDate}
				calendarRef={calendarProps.calendarRef}
				calendarValue={calendarProps.calendarValue}
				calendarView={calendarProps.calendarView}
				calendarWeekStartDay={calendarProps.calendarWeekStartDay}
				nextMonthLabel={nextMonthLabel}
				onCalendarChange={calendarProps.onCalendarChange}
				onCalendarSelect={calendarProps.onCalendarSelect}
				previousMonthLabel={previousMonthLabel}
				shouldSetFocusOnCurrentDay={calendarProps.shouldSetFocusOnCurrentDay}
			/>
			{shouldShowCalendarButton && !isDisabled ? (
				<div
					css={[
						iconContainerStyles,
						value && !hideIcon
							? iconSpacingWithClearButtonStyles
							: iconSpacingWithoutClearButtonStyles,
					]}
				>
					{inputLabelId && (
						<VisuallyHidden id={openCalendarLabelId}>, {openCalendarLabel}</VisuallyHidden>
					)}
					<Pressable
						{...(inputLabelId
							? { 'aria-labelledby': `${inputLabelId} ${openCalendarLabelId}` }
							: { 'aria-label': fullopenCalendarLabel })}
						onClick={onCalendarButtonClick}
						onKeyDown={onCalendarButtonKeyDown}
						ref={calendarButtonRef}
						testId={testId && `${testId}--open-calendar-button`}
						type="button"
						backgroundColor="color.background.neutral.subtle"
						padding="space.050"
						xcss={calendarButtonStyles}
					>
						<CalendarIcon label="" primaryColor={token('color.icon')} />
					</Pressable>
				</div>
			) : null}
		</div>
	);
});

export default DatePicker;
