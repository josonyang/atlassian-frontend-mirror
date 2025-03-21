import { useCallback, useState } from 'react';

import { type PublicBaseSelectProps } from './select';
import {
	type ActionMeta,
	type GroupBase,
	type InputActionMeta,
	type OnChangeValue,
	type PropsValue,
} from './types';

type StateManagedPropKeys =
	| 'inputValue'
	| 'menuIsOpen'
	| 'onChange'
	| 'onInputChange'
	| 'onMenuClose'
	| 'onMenuOpen'
	| 'value';

type SelectPropsWithOptionalStateManagedProps<
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
> = Omit<PublicBaseSelectProps<Option, IsMulti, Group>, StateManagedPropKeys> &
	Partial<PublicBaseSelectProps<Option, IsMulti, Group>>;

// Export required for downstream consumers
export interface StateManagerAdditionalProps<Option> {
	defaultInputValue?: string;
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	defaultMenuIsOpen?: boolean;
	defaultValue?: PropsValue<Option>;
}

export type StateManagerProps<
	Option = unknown,
	IsMulti extends boolean = boolean,
	Group extends GroupBase<Option> = GroupBase<Option>,
> = SelectPropsWithOptionalStateManagedProps<Option, IsMulti, Group> &
	StateManagerAdditionalProps<Option>;

// TODO: Fill in the hook {description}.
/**
 * {description}.
 */
export default function useStateManager<
	Option,
	IsMulti extends boolean,
	Group extends GroupBase<Option>,
	AdditionalProps,
>({
	defaultInputValue = '',
	defaultMenuIsOpen = false,
	defaultValue = null,
	inputValue: propsInputValue,
	menuIsOpen: propsMenuIsOpen,
	onChange: propsOnChange,
	onInputChange: propsOnInputChange,
	onMenuClose: propsOnMenuClose,
	onMenuOpen: propsOnMenuOpen,
	value: propsValue,
	...restSelectProps
}: StateManagerProps<Option, IsMulti, Group> & AdditionalProps): PublicBaseSelectProps<
	Option,
	IsMulti,
	Group
> &
	Omit<AdditionalProps, keyof StateManagerAdditionalProps<Option> | StateManagedPropKeys> {
	const [stateInputValue, setStateInputValue] = useState(
		propsInputValue !== undefined ? propsInputValue : defaultInputValue,
	);
	const [stateMenuIsOpen, setStateMenuIsOpen] = useState(
		propsMenuIsOpen !== undefined ? propsMenuIsOpen : defaultMenuIsOpen,
	);
	const [stateValue, setStateValue] = useState(
		propsValue !== undefined ? propsValue : defaultValue,
	);

	const onChange = useCallback(
		(value: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => {
			if (typeof propsOnChange === 'function') {
				propsOnChange(value, actionMeta);
			}
			setStateValue(value);
		},
		[propsOnChange],
	);
	const onInputChange = useCallback(
		(value: string, actionMeta: InputActionMeta) => {
			let newValue;
			if (typeof propsOnInputChange === 'function') {
				newValue = propsOnInputChange(value, actionMeta);
			}
			setStateInputValue(newValue !== undefined ? newValue : value);
		},
		[propsOnInputChange],
	);
	const onMenuOpen = useCallback(() => {
		if (typeof propsOnMenuOpen === 'function') {
			propsOnMenuOpen();
		}
		setStateMenuIsOpen(true);
	}, [propsOnMenuOpen]);
	const onMenuClose = useCallback(() => {
		if (typeof propsOnMenuClose === 'function') {
			propsOnMenuClose();
		}
		setStateMenuIsOpen(false);
	}, [propsOnMenuClose]);

	const inputValue = propsInputValue !== undefined ? propsInputValue : stateInputValue;
	const menuIsOpen = propsMenuIsOpen !== undefined ? propsMenuIsOpen : stateMenuIsOpen;
	const value = propsValue !== undefined ? propsValue : stateValue;

	//@ts-ignore react-select unsupported props
	return {
		...restSelectProps,
		inputValue,
		menuIsOpen,
		onChange,
		onInputChange,
		onMenuClose,
		onMenuOpen,
		value,
	};
}
