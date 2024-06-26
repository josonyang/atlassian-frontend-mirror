import { type SelectProps as AKSelectProps, type OptionType } from '@atlaskit/select';

import { type Validator } from '../../../common/types';

export type SelectProps<T = OptionType> = AKSelectProps<T> & {
	/** Name passed to the <Field> */
	name: string;
	/** This should be properly internationalization-ed */
	label: string;
	/**
	 * Optional text below the field explaining any requirements for a valid value.
	 * eg. "Must be 4 or more letters"
	 */
	validationHelpText?: string;

	testId?: string;
	/** Will display a red astrix next to the field title if true */
	isRequired?: boolean;
	/** Validators for this field */
	validators?: Validator[];
};

export type SitePickerOptionValue = {
	avatarUrl?: string;
	cloudId: string;
	url: string;
};

export type SitePickerOptionType = {
	label: string;
	value: SitePickerOptionValue;
};
