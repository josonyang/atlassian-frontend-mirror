import React from 'react';
import { ExampleWrapper } from '../example-helpers/ExampleWrapper';
import UserPicker from '../src';

const Example = () => {
	return (
		<ExampleWrapper>
			{({ options, onInputChange }) => (
				<UserPicker
					fieldId="example"
					options={options}
					onChange={console.log}
					onInputChange={onInputChange}
					subtle
				/>
			)}
		</ExampleWrapper>
	);
};
export default Example;
