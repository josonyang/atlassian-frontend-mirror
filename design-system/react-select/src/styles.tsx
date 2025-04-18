import {
	containerCSS,
	type ContainerProps,
	indicatorsContainerCSS,
	type IndicatorsContainerProps,
	valueContainerCSS,
	type ValueContainerProps,
} from './components/containers';
import { css as controlCSS, type ControlProps } from './components/control';
import {
	groupCSS,
	groupHeadingCSS,
	type GroupHeadingProps,
	type GroupProps,
} from './components/group';
import {
	clearIndicatorCSS,
	type ClearIndicatorProps,
	dropdownIndicatorCSS,
	type DropdownIndicatorProps,
	loadingIndicatorCSS,
	type LoadingIndicatorProps,
} from './components/indicators';
import { inputCSS, type InputProps } from './components/input';
import {
	loadingMessageCSS,
	menuCSS,
	menuListCSS,
	type MenuListProps,
	menuPortalCSS,
	type MenuProps,
	noOptionsMessageCSS,
	type NoticeProps,
	type PortalStyleArgs,
} from './components/menu';
import {
	multiValueCSS,
	multiValueLabelCSS,
	type MultiValueProps,
	multiValueRemoveCSS,
} from './components/multi-value';
import { optionCSS, type OptionProps } from './components/option';
import { placeholderCSS, type PlaceholderProps } from './components/placeholder';
import { css as singleValueCSS, type SingleValueProps } from './components/single-value';
import { type CSSObjectWithLabel, type GroupBase } from './types';

export interface StylesProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
	clearIndicator: ClearIndicatorProps<Option, IsMulti, Group>;
	container: ContainerProps<Option, IsMulti, Group>;
	control: ControlProps<Option, IsMulti, Group>;
	dropdownIndicator: DropdownIndicatorProps<Option, IsMulti, Group>;
	group: GroupProps<Option, IsMulti, Group>;
	groupHeading: GroupHeadingProps<Option, IsMulti, Group>;
	indicatorsContainer: IndicatorsContainerProps<Option, IsMulti, Group>;
	input: InputProps<Option, IsMulti, Group>;
	loadingIndicator: LoadingIndicatorProps<Option, IsMulti, Group>;
	loadingMessage: NoticeProps<Option, IsMulti, Group>;
	menu: MenuProps<Option, IsMulti, Group>;
	menuList: MenuListProps<Option, IsMulti, Group>;
	menuPortal: PortalStyleArgs;
	multiValue: MultiValueProps<Option, IsMulti, Group>;
	multiValueLabel: MultiValueProps<Option, IsMulti, Group>;
	multiValueRemove: MultiValueProps<Option, IsMulti, Group>;
	noOptionsMessage: NoticeProps<Option, IsMulti, Group>;
	option: OptionProps<Option, IsMulti, Group>;
	placeholder: PlaceholderProps<Option, IsMulti, Group>;
	singleValue: SingleValueProps<Option, IsMulti, Group>;
	valueContainer: ValueContainerProps<Option, IsMulti, Group>;
}

export const defaultStyles: {
	[K in keyof StylesProps<any, any, any>]: (
		props: StylesProps<unknown, boolean, GroupBase<unknown>>[K],
	) => CSSObjectWithLabel;
} = {
	clearIndicator: clearIndicatorCSS,
	container: containerCSS,
	control: controlCSS,
	dropdownIndicator: dropdownIndicatorCSS,
	group: groupCSS,
	groupHeading: groupHeadingCSS,
	indicatorsContainer: indicatorsContainerCSS,
	input: inputCSS,
	loadingIndicator: loadingIndicatorCSS,
	loadingMessage: loadingMessageCSS,
	menu: menuCSS,
	menuList: menuListCSS,
	menuPortal: menuPortalCSS,
	multiValue: multiValueCSS,
	multiValueLabel: multiValueLabelCSS,
	multiValueRemove: multiValueRemoveCSS,
	noOptionsMessage: noOptionsMessageCSS,
	option: optionCSS,
	placeholder: placeholderCSS,
	singleValue: singleValueCSS,
	valueContainer: valueContainerCSS,
};

export type StylesConfig<
	Option = unknown,
	IsMulti extends boolean = boolean,
	Group extends GroupBase<Option> = GroupBase<Option>,
> = {
	[K in keyof StylesProps<Option, IsMulti, Group>]?: (
		base: CSSObjectWithLabel,
		props: StylesProps<Option, IsMulti, Group>[K],
	) => CSSObjectWithLabel;
};

export type ClassNamesConfig<
	Option = unknown,
	IsMulti extends boolean = boolean,
	Group extends GroupBase<Option> = GroupBase<Option>,
> = {
	[K in keyof StylesProps<Option, IsMulti, Group>]?: (
		props: StylesProps<Option, IsMulti, Group>[K],
	) => string;
};

// Merge Utility
// Allows consumers to extend a base Select with additional styles

export function mergeStyles<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
	source: StylesConfig<Option, IsMulti, Group>,
	target: StylesConfig<Option, IsMulti, Group> = {},
) {
	// initialize with source styles
	const styles = { ...source };

	// massage in target styles
	Object.keys(target).forEach((keyAsString) => {
		const key = keyAsString as keyof StylesConfig<Option, IsMulti, Group>;
		if (source[key]) {
			styles[key] = (rsCss: any, props: any) => {
				return target[key]!(source[key]!(rsCss, props), props);
			};
		} else {
			styles[key] = target[key] as any;
		}
	});

	return styles;
}
