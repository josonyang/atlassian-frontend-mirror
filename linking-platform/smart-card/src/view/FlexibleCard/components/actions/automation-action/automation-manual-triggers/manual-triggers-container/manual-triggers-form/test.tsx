import React from 'react';

import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { mockTransformedRules } from '../common/mocks';
import { renderWithDi } from '../common/test-utils';

import UserInputForm, { type UserInputProps } from './main';

describe('UserInputForm', () => {
	test('should render the modal', () => {
		const userInputProps: UserInputProps = {
			selectedRule: {
				rule: mockTransformedRules[2],
				objects: [],
			},
			clearSelectedRule: () => {},
			invokeRule: async (_ruleId, _objects, _userInputs) => {},
		};

		renderWithDi(
			<UserInputForm
				clearSelectedRule={userInputProps.clearSelectedRule}
				selectedRule={userInputProps.selectedRule}
				invokeRule={userInputProps.invokeRule}
			/>,
		);

		expect(screen.getByRole('textbox', { name: 'Text user input' })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Number user input' })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Paragraph user input' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'Boolean user input' })).toBeInTheDocument();
		expect(screen.getByRole('combobox', { name: 'Dropdown user input' })).toBeInTheDocument();
	});

	test('should submit inputs', () => {
		const mockInvokeRule = jest.fn();
		const userInputProps: UserInputProps = {
			selectedRule: {
				rule: mockTransformedRules[2],
				objects: [],
			},
			clearSelectedRule: () => {},
			invokeRule: mockInvokeRule,
		};

		renderWithDi(
			<UserInputForm
				clearSelectedRule={userInputProps.clearSelectedRule}
				selectedRule={userInputProps.selectedRule}
				invokeRule={userInputProps.invokeRule}
			/>,
		);

		act(() => {
			fireEvent(
				screen.getByText('Continue'),
				new MouseEvent('click', {
					bubbles: true,
					cancelable: true,
				}),
			);
		});

		expect(mockInvokeRule).toHaveBeenCalledWith(2, [], expect.any(Object));
	});
	test('should disable the button after click', async () => {
		const userInputProps: UserInputProps = {
			selectedRule: {
				rule: mockTransformedRules[2],
				objects: [],
			},
			clearSelectedRule: () => {},
			invokeRule: jest.fn(),
		};

		renderWithDi(
			<UserInputForm
				clearSelectedRule={userInputProps.clearSelectedRule}
				selectedRule={userInputProps.selectedRule}
				invokeRule={userInputProps.invokeRule}
			/>,
		);

		act(() => {
			fireEvent(
				screen.getByText('Continue'),
				new MouseEvent('click', {
					bubbles: true,
					cancelable: true,
				}),
			);
		});

		expect(screen.getByRole('button', { name: 'Continue' })).toHaveProperty('disabled');
	});
	it('should capture and report a11y violations', async () => {
		const userInputProps: UserInputProps = {
			selectedRule: {
				rule: mockTransformedRules[2],
				objects: [],
			},
			clearSelectedRule: () => {},
			invokeRule: async (_ruleId, _objects, _userInputs) => {},
		};
		const { container } = renderWithDi(
			<UserInputForm
				clearSelectedRule={userInputProps.clearSelectedRule}
				selectedRule={userInputProps.selectedRule}
				invokeRule={userInputProps.invokeRule}
			/>,
		);
		await expect(container).toBeAccessible();
	});
});
