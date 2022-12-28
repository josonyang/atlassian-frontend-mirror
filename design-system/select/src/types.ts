import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import {
  SelectInstance,
  Props as ReactSelectProps,
  FormatOptionLabelMeta,
  OnChangeValue as RSValueType,
  ActionMeta as RSActionMeta,
  GroupBase as GroupType,
  Options as RSOptionsType,
  SelectComponentsConfig as RSSelectComponentsConfig,
  StylesConfig as RSStylesConfig,
  InputActionMeta,
  ClearIndicatorProps,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
  NoticeProps,
  ControlProps as RSControlProps,
  GroupProps as RSGroupProps,
  InputProps,
  MenuProps as RSMenuProps,
  MenuListProps as RSMenuListComponentProps,
  MultiValueProps,
  OptionProps as ReactSelectOptionProps,
  PlaceholderProps as RSPlaceholderProps,
  SingleValueProps,
  ValueContainerProps as RSValueContainerProps,
  MultiValueRemoveProps,
} from 'react-select';

import { AsyncProps } from 'react-select/async';
import { CreatableProps } from 'react-select/creatable';

export type ValidationState = 'default' | 'error' | 'success';
export interface OptionType {
  [key: string]: any;
  label: string;
  value: string | number;
}

export type OptionsType<Option = OptionType> = RSOptionsType<Option>;

export interface OptionProps<
  Option = OptionType,
  IsMulti extends boolean = false,
> extends ReactSelectOptionProps<Option, IsMulti> {
  [key: string]: any;
  Icon?: React.ComponentType<{
    label: string;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    onClick?: (e: MouseEvent) => void;
    primaryColor?: string;
    secondaryColor?: string;
  }>;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

interface CustomSelectProps extends WithAnalyticsEventsProps {
  /** This prop affects the height of the select control. Compact is gridSize() * 4, default is gridSize * 5  */
  spacing?: 'compact' | 'default';
  /** @deprecated Use isInvalid instead. The state of validation if used in a form.  */
  validationState?: ValidationState;
  /** This prop affects the backgroundColor and border of the Select field. 'subtle' makes these transparent while 'none' removes them completely */
  appearance?: 'default' | 'subtle' | 'none';
  /** This prop indicates if the component is in an error state */
  isInvalid?: boolean;
  /** Prop for testing */
  testId?: string;
}

export interface SelectProps<Option, IsMulti extends boolean = false>
  extends ReactSelectProps<Option, IsMulti>,
    CustomSelectProps {}

export interface AsyncSelectProps<Option, IsMulti extends boolean = false>
  extends AsyncProps<Option, IsMulti, GroupType<Option>>,
    CustomSelectProps {}

export interface CreatableSelectProps<Option, IsMulti extends boolean = false>
  extends CreatableProps<Option, IsMulti, GroupType<Option>>,
    CustomSelectProps {}

export type ActionMeta<Option = OptionType> = RSActionMeta<Option>;

export type ControlProps<
  Option,
  IsMulti extends boolean = false,
> = RSControlProps<Option, IsMulti>;

export type ValueType<Option, IsMulti extends boolean = false> = RSValueType<
  Option,
  IsMulti
>;

export type StylesConfig<
  Option = OptionType,
  IsMulti extends boolean = false,
> = RSStylesConfig<Option, IsMulti>;

export type SelectComponentsConfig<
  Option,
  IsMulti extends boolean = false,
> = RSSelectComponentsConfig<Option, IsMulti, GroupType<Option>>;

export type GroupProps<Option, IsMulti extends boolean = false> = RSGroupProps<
  Option,
  IsMulti
>;

export type MenuProps<Option, IsMulti extends boolean = false> = RSMenuProps<
  Option,
  IsMulti
>;

export type MenuListComponentProps<
  Option,
  IsMulti extends boolean = false,
> = RSMenuListComponentProps<Option, IsMulti>;

export type PlaceholderProps<
  Option,
  IsMulti extends boolean = false,
> = RSPlaceholderProps<Option, IsMulti>;

export type ValueContainerProps<
  Option,
  IsMulti extends boolean = false,
> = RSValueContainerProps<Option, IsMulti>;

export type GroupedOptionsType<Option> = ReadonlyArray<GroupType<Option>>;

export type {
  SelectInstance,
  FormatOptionLabelMeta,
  InputActionMeta,
  GroupType,
  InputProps,
  MultiValueProps,
  ReactSelectProps,
  SingleValueProps,
  ClearIndicatorProps,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
  NoticeProps,
  MultiValueRemoveProps,
};

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupType<Option>,
  > {
    [key: string]: any;
  }
}
