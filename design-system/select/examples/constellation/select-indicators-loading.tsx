import React from 'react';

import { Label } from '@atlaskit/form';
import Spinner from '@atlaskit/spinner';

import Select from '../../src';
import { type LoadingIndicatorProps, type OptionType } from '../../src/types';
import { cities } from '../common/data';

const LoadingIndicator = (props: LoadingIndicatorProps<OptionType>) => {
	return <Spinner {...props} />;
};

const filterCities = (inputValue: string) =>
	cities.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));

const promiseOptions = (inputValue: string) =>
	new Promise<OptionType[]>((resolve) => {
		setTimeout(() => {
			resolve(filterCities(inputValue));
		}, 1000);
	});

export default () => {
	return (
		<>
			<Label htmlFor="indicators-loading">What city do you live in?</Label>
			<Select
				inputId="indicators-loading"
				cacheOptions
				defaultOptions
				loadOptions={promiseOptions}
				components={{ LoadingIndicator }}
			/>
		</>
	);
};
