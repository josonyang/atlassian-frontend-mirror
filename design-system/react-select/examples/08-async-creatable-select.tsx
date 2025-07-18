import React, { Component } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { Label } from '@atlaskit/form';
import { type Options } from '@atlaskit/react-select';
import AsyncCreatable from '@atlaskit/react-select/async-creatable';

import { cities } from './common/data';

interface State {
	allowCreateWhileLoading: boolean;
	options: any;
}

interface Option {
	readonly label: string;
	readonly value: string;
}

const createOption = (inputValue: string) => ({
	label: inputValue,
	value: inputValue.toLowerCase().replace(/\W/g, ''),
});

// eslint-disable-next-line @repo/internal/react/no-class-components
class AsyncCreatableExample extends Component<{}, State> {
	state = {
		allowCreateWhileLoading: false,
		options: cities,
	};

	loadTimeoutId?: number = undefined;

	componentWillUnmount() {
		clearTimeout(this.loadTimeoutId);
	}

	handleCreateOption = (inputValue: string) => {
		console.log('handleCreateOption here');
		this.setState({
			options: [createOption(inputValue), ...this.state.options],
		});
	};

	// you control how the options are filtered
	filterOptions = (inputValue: string) => {
		return this.state.options.filter((option: { label: string }) =>
			option.label.toLowerCase().includes(inputValue.toLowerCase()),
		);
	};

	// async load function using callback (promises also supported)
	loadOptions = (inputValue: string, callback: (options: Options<Option>) => void) => {
		this.loadTimeoutId = window.setTimeout(() => {
			callback(this.filterOptions(inputValue));
		}, 1000);
	};

	toggleValue = ({ value }: Record<string, any>) => {
		this.setState((state) => ({ ...state, value }));
	};

	render() {
		const { allowCreateWhileLoading } = this.state;
		return (
			<>
				<Label htmlFor="async-creatable-example">Which city do you live in?</Label>
				<AsyncCreatable
					inputId="async-creatable-example"
					loadOptions={this.loadOptions}
					allowCreateWhileLoading={allowCreateWhileLoading}
					onCreateOption={this.handleCreateOption}
					placeholder="Choose a City"
				/>
				<Checkbox
					value="allowCreateWhileLoading"
					label="Allow create while loading"
					name="allowCreateWhileLoading"
					onChange={this.toggleValue}
				/>
			</>
		);
	}
}

export default () => <AsyncCreatableExample />;
