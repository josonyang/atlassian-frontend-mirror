import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormattedMessage, IntlProvider } from 'react-intl-next';

import { SmartCardProvider } from '@atlaskit/link-provider';

import { messages } from '../../../../../../messages';
import FollowAction from '../index';
import type { FollowActionProps } from '../types';

jest.mock('../../../../../../state/flexible-ui-context', () => ({
	...jest.requireActual('../../../../../../state/flexible-ui-context'),
	useFlexibleUiContext: jest.fn().mockReturnValue({
		actions: {
			FollowAction: {
				action: {
					actionType: 'FollowEntityAction',
					resourceIdentifiers: {
						ari: 'some-resource-identifier',
					},
				},
				providerKey: 'object-provider',
				value: true,
				isProject: true,
			},
		},
	}),
}));

jest.mock('../../../../../../state/hooks/use-invoke', () => jest.fn().mockReturnValue(jest.fn()));

describe('Follow Project Action', () => {
	const testId = 'smart-action-follow-action';

	const setup = (props?: Partial<FollowActionProps>) =>
		render(
			<IntlProvider locale="en">
				<SmartCardProvider>
					<FollowAction {...props} />
				</SmartCardProvider>
			</IntlProvider>,
		);

	describe('new stack item follow project', () => {
		it('renders follow stack item action', async () => {
			setup({ as: 'stack-item' });
			const element = await screen.findByTestId(testId);
			expect(element).toBeInTheDocument();
			expect(element).toHaveTextContent('Follow project');
		});

		it('renders stack item tooltip', async () => {
			const user = userEvent.setup();
			setup({ as: 'stack-item' });

			const element = await screen.findByTestId(testId);
			await user.hover(element);

			const tooltip = await screen.findByRole('tooltip');
			expect(tooltip).toHaveTextContent('Follow to get notifications on this project');
		});

		it('renders project icon', async () => {
			setup({ as: 'stack-item' });
			const element = await screen.findByTestId('smart-action-follow-action-projects-icon');
			expect(element).toBeInTheDocument();
		});
	});

	it('invokes onClick callback', async () => {
		userEvent.setup();

		const mockOnClick = jest.fn();

		setup({
			as: 'stack-item',
			onClick: mockOnClick,
		});

		const element = screen.getByTestId(testId);
		await userEvent.click(element);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('invokes error callback on failure', async () => {
		userEvent.setup();

		const mockErrorCallback = jest.fn();
		const mockOnClick = jest.fn().mockImplementation(() => {
			throw new Error('Error');
		});

		setup({
			as: 'stack-item',
			onError: mockErrorCallback,
			onClick: mockOnClick,
		});

		const element = await screen.findByTestId(testId);
		await userEvent.click(element);

		expect(mockErrorCallback).toHaveBeenCalledWith({
			appearance: 'error',
			title: <FormattedMessage {...messages.follow_project_error} />,
		});
	});

	it('should capture and report a11y violations', async () => {
		const { container } = setup();

		await expect(container).toBeAccessible();
	});
});
