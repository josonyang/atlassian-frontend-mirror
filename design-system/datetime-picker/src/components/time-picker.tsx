import React, { CSSProperties } from 'react';

// eslint-disable-next-line no-restricted-imports
import { format, isValid } from 'date-fns';
import pick from 'lodash/pick';

import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import {
  createLocalizationProvider,
  LocalizationProvider,
} from '@atlaskit/locale';
import Select, {
  ActionMeta,
  components,
  CreatableSelect,
  MenuProps,
  mergeStyles,
  OptionType,
  SelectComponentsConfig,
  SelectProps,
  ValueType,
} from '@atlaskit/select';
// eslint-disable-next-line @atlaskit/design-system/no-deprecated-imports
import { gridSize } from '@atlaskit/theme/constants';

import {
  defaultTimeFormat,
  defaultTimes,
  EmptyComponent,
  placeholderDatetime,
} from '../internal';
import ClearIndicator from '../internal/clear-indicator';
import FixedLayer from '../internal/fixed-layer';
import parseTime from '../internal/parse-time';
import { makeSingleValue } from '../internal/single-value';
import { Appearance, Spacing } from '../types';

import { convertTokens } from './utils';

const packageName = process.env._PACKAGE_NAME_ as string;
const packageVersion = process.env._PACKAGE_VERSION_ as string;

interface Option {
  label: string;
  value: string;
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

type TimePickerProps = typeof timePickerDefaultProps & TimePickerBaseProps;

interface State {
  isOpen: boolean;
  /**
   * When being cleared from the icon the TimePicker is blurred.
   * This variable defines whether the default onMenuOpen or onMenuClose
   * events should behave as normal
   */
  clearingFromIcon: boolean;
  value: string;
  isFocused: boolean;
}

const menuStyles: CSSProperties = {
  /* Need to remove default absolute positioning as that causes issues with position fixed */
  position: 'static',
  /* Need to add overflow to the element with max-height, otherwise causes overflow issues in IE11 */
  overflowY: 'auto',
  /* React-Popper has already offset the menu so we need to reset the margin, otherwise the offset value is doubled */
  margin: 0,
};

const FixedLayerMenu = ({ selectProps, ...rest }: { selectProps: any }) => (
  <FixedLayer
    inputValue={selectProps.inputValue}
    containerRef={selectProps.fixedLayerRef}
    content={
      <components.Menu
        {...(rest as MenuProps<OptionType>)}
        menuShouldScrollIntoView={false}
      />
    }
    testId={selectProps.testId}
  />
);

const timePickerDefaultProps = {
  appearance: 'default' as Appearance,
  autoFocus: false,
  defaultIsOpen: false,
  defaultValue: '',
  hideIcon: false,
  id: '',
  innerProps: {},
  isDisabled: false,
  isInvalid: false,
  name: '',
  // These disables are here for proper typing when used as defaults. They
  // should *not* use the `noop` function.
  /* eslint-disable @repo/internal/react/use-noop */
  onBlur: (_event: React.FocusEvent<HTMLInputElement>) => {},
  onChange: (_value: string) => {},
  onFocus: (_event: React.FocusEvent<HTMLInputElement>) => {},
  /* eslint-enable @repo/internal/react/use-noop */
  parseInputValue: (time: string, _timeFormat: string) => parseTime(time),
  selectProps: {},
  spacing: 'default' as Spacing,
  times: defaultTimes,
  timeIsEditable: false,
  locale: 'en-US',
  // Not including a default prop for value as it will
  // Make the component a controlled component
};
class TimePicker extends React.Component<TimePickerProps, State> {
  containerRef: HTMLElement | null = null;

  static defaultProps = timePickerDefaultProps;

  state = {
    isOpen: this.props.defaultIsOpen,
    clearingFromIcon: false,
    value: this.props.defaultValue,
    isFocused: false,
  };

  // All state needs to be accessed via this function so that the state is mapped from props
  // correctly to allow controlled/uncontrolled usage.
  getSafeState = (): State => {
    return {
      ...this.state,
      ...pick(this.props, ['value', 'isOpen']),
    };
  };

  onChange = (
    newValue: ValueType<OptionType> | string,
    action?: ActionMeta<OptionType>,
  ): void => {
    const rawValue = newValue ? (newValue as OptionType).value || newValue : '';
    const value = rawValue.toString();
    let changedState: {} = { value };

    if (action && action.action === 'clear') {
      changedState = {
        ...changedState,
        clearingFromIcon: true,
      };
    }

    this.setState(changedState);
    this.props.onChange(value);
  };

  /**
   * Only allow custom times if timeIsEditable prop is true
   */
  onCreateOption = (inputValue: string): void => {
    if (this.props.timeIsEditable) {
      const { parseInputValue, timeFormat } = this.props;

      let sanitizedInput;
      try {
        sanitizedInput = parseInputValue(
          inputValue,
          timeFormat || defaultTimeFormat,
        ) as Date;
      } catch (e) {
        return; // do nothing, the main validation should happen in the form
      }

      const includesSeconds = !!(timeFormat && /[:.]?(s|ss)/.test(timeFormat));

      const formatFormat = includesSeconds ? 'HH:mm:ss' : 'HH:mm';
      const formattedValue = format(sanitizedInput, formatFormat) || '';

      this.setState({ value: formattedValue });
      this.props.onChange(formattedValue);
    } else {
      this.onChange(inputValue);
    }
  };

  onMenuOpen = () => {
    // Don't open menu after the user has clicked clear
    if (this.getSafeState().clearingFromIcon) {
      this.setState({ clearingFromIcon: false });
    } else {
      this.setState({ isOpen: true });
    }
  };

  onMenuClose = () => {
    // Don't close menu after the user has clicked clear
    if (this.getSafeState().clearingFromIcon) {
      this.setState({ clearingFromIcon: false });
    } else {
      this.setState({ isOpen: false });
    }
  };

  setContainerRef = (ref: HTMLElement | null) => {
    const oldRef = this.containerRef;
    this.containerRef = ref;
    // Cause a re-render if we're getting the container ref for the first time
    // as the layered menu requires it for dimension calculation
    if (oldRef == null && ref != null) {
      this.forceUpdate();
    }
  };

  onBlur = (event: React.FocusEvent<HTMLElement>) => {
    this.setState({ isFocused: false });
    this.props.onBlur(event);
  };

  onFocus = (event: React.FocusEvent<HTMLElement>) => {
    this.setState({ isFocused: true });
    this.props.onFocus(event);
  };

  onSelectKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const keyPressed = key.toLowerCase();
    if (
      this.getSafeState().clearingFromIcon &&
      (keyPressed === 'backspace' || keyPressed === 'delete')
    ) {
      // If being cleared from keyboard, don't change behaviour
      this.setState({ clearingFromIcon: false });
    }
  };

  render() {
    const {
      appearance,
      autoFocus,
      formatDisplayLabel,
      hideIcon,
      id,
      innerProps,
      isDisabled,
      locale,
      name,
      placeholder,
      selectProps,
      spacing,
      testId,
      isInvalid,
      timeIsEditable,
      timeFormat,
      times,
    } = this.props;
    const ICON_PADDING = 2;

    const l10n: LocalizationProvider = createLocalizationProvider(locale);

    const { value = '', isOpen } = this.getSafeState();

    const { styles: selectStyles = {}, ...otherSelectProps } = selectProps;
    const SelectComponent = timeIsEditable ? CreatableSelect : Select;

    /**
     * There are multiple props that can change how the time is formatted.
     * The priority of props used is:
     *   1. formatDisplayLabel
     *   2. timeFormat
     *   3. locale
     */
    const formatTime = (time: string): string => {
      if (formatDisplayLabel) {
        return formatDisplayLabel(time, timeFormat || defaultTimeFormat);
      }

      const date = parseTime(time);

      if (!(date instanceof Date)) {
        return '';
      }

      if (!isValid(date)) {
        return time;
      }

      if (timeFormat) {
        return format(date, convertTokens(timeFormat));
      }

      return l10n.formatTime(date);
    };

    const options: Array<Option> = times.map((time: string): Option => {
      return {
        label: formatTime(time),
        value: time,
      };
    });

    const labelAndValue = value && {
      label: formatTime(value),
      value,
    };

    const SingleValue = makeSingleValue({ lang: this.props.locale });

    const selectComponents: SelectComponentsConfig<OptionType> = {
      DropdownIndicator: EmptyComponent,
      Menu: FixedLayerMenu,
      SingleValue,
      ...(hideIcon
        ? { ClearIndicator: EmptyComponent }
        : { ClearIndicator: ClearIndicator }),
    };

    const renderIconContainer = Boolean(!hideIcon && value);

    const mergedStyles = mergeStyles(selectStyles, {
      control: (base) => ({
        ...base,
      }),
      menu: (base: any) => ({
        ...base,
        ...menuStyles,
        // Fixed positioned elements no longer inherit width from their parent, so we must explicitly set the
        // menu width to the width of our container
        width: this.containerRef
          ? this.containerRef.getBoundingClientRect().width
          : 'auto',
      }),
      indicatorsContainer: (base) => ({
        ...base,
        paddingLeft: renderIconContainer ? ICON_PADDING : 0,
        paddingRight: renderIconContainer ? gridSize() - ICON_PADDING : 0,
      }),
    });

    return (
      <div
        {...innerProps}
        ref={this.setContainerRef}
        data-testid={testId && `${testId}--container`}
      >
        <input
          name={name}
          type="hidden"
          value={value}
          data-testid={testId && `${testId}--input`}
          onKeyDown={this.onSelectKeyDown}
        />
        <SelectComponent
          appearance={appearance}
          autoFocus={autoFocus}
          components={selectComponents}
          inputId={id}
          isClearable
          isDisabled={isDisabled}
          menuIsOpen={isOpen && !isDisabled}
          menuPlacement="auto"
          openMenuOnFocus
          onBlur={this.onBlur}
          onCreateOption={this.onCreateOption}
          onChange={this.onChange}
          options={options}
          onFocus={this.onFocus}
          onMenuOpen={this.onMenuOpen}
          onMenuClose={this.onMenuClose}
          placeholder={placeholder || l10n.formatTime(placeholderDatetime)}
          styles={mergedStyles}
          value={labelAndValue}
          spacing={spacing}
          // @ts-ignore caused by prop not part of @atlaskit/select
          fixedLayerRef={this.containerRef}
          isInvalid={isInvalid}
          testId={testId}
          {...otherSelectProps}
        />
      </div>
    );
  }
}

export { TimePicker as TimePickerWithoutAnalytics };

export default withAnalyticsContext({
  componentName: 'timePicker',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onChange: createAndFireEvent('atlaskit')({
      action: 'selectedTime',
      actionSubject: 'timePicker',

      attributes: {
        componentName: 'timePicker',
        packageName,
        packageVersion,
      },
    }),
  })(TimePicker),
);
