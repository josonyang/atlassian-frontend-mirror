import React, { Component } from 'react';
import { Label } from '@atlaskit/form';
import { cities } from '../common/data';
import { AsyncSelect, type OptionsType } from '../../src';

interface State {
	inputValue: string;
}

const filterCities = (inputValue: string) =>
	cities.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));

const promiseOptions = (inputValue: string) =>
	new Promise<OptionsType>((resolve) => {
		setTimeout(() => {
			resolve(filterCities(inputValue));
		}, 1000);
	});

class WithPromises extends Component<{}, State> {
	state = { inputValue: '' };

	handleInputChange = (newValue: string) => {
		const inputValue = newValue.replace(/\W/g, '');
		this.setState({ inputValue });
		return inputValue;
	};

	render() {
		return (
			<>
				<Label htmlFor="async-select-example">What city do you live in?</Label>
				<AsyncSelect
					inputId="async-select-example"
					cacheOptions
					defaultOptions
					loadOptions={promiseOptions}
				/>
			</>
		);
	}
}

export default () => <WithPromises />;
