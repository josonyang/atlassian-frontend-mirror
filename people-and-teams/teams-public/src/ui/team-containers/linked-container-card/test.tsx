import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

import { Text } from '@atlaskit/primitives';

import { fireUIEvent } from '../../../common/utils/analytics';
import { getContainerProperties } from '../../../common/utils/get-container-properties';

import { LinkedContainerCard } from './index';

jest.mock('../../../common/utils/get-container-properties', () => ({
	getContainerProperties: jest.fn(),
}));

jest.mock('../../../common/utils/analytics', () => ({
	...jest.requireActual('../../../common/utils/analytics'),
	fireUIEvent: jest.fn(),
}));

jest.mock('react-intl-next', () => {
	return {
		...jest.requireActual('react-intl-next'),
		useIntl: jest.fn(() => ({
			formatMessage: jest.fn(),
		})),
	};
});

describe('LinkedContainerCard', () => {
	const mockContainerProperties = {
		description: 'Test Description',
		icon: <Text testId="test-icon">Icon</Text>,
	};
	const testLink = 'test-link';

	beforeEach(() => {
		(getContainerProperties as jest.Mock).mockReturnValue(mockContainerProperties);
		jest.clearAllMocks();
	});

	it('should render the title', () => {
		render(
			<Router>
				<LinkedContainerCard
					containerType={'ConfluenceSpace'}
					title="Test Title"
					containerIcon="test-icon-url"
					link={testLink}
					onDisconnectButtonClick={jest.fn()}
				/>
			</Router>,
		);
		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});

	it('should render the description', () => {
		render(
			<Router>
				<LinkedContainerCard
					containerType={'ConfluenceSpace'}
					title="Test Title"
					containerIcon="test-icon-url"
					link={testLink}
					onDisconnectButtonClick={jest.fn()}
				/>
			</Router>,
		);
		expect(screen.getByText('Test Description')).toBeInTheDocument();
	});

	it('should render the icon', () => {
		render(
			<Router>
				<LinkedContainerCard
					containerType={'ConfluenceSpace'}
					title="Test Title"
					containerIcon="test-icon-url"
					link={testLink}
					onDisconnectButtonClick={jest.fn()}
				/>
			</Router>,
		);
		expect(screen.getByTestId('test-icon')).toBeInTheDocument();
	});

	it('should prevent default action on cross icon button click and trigger onDisconnectButtonClick', async () => {
		const mockOnDisconnectButtonClick = jest.fn();
		render(
			<Router>
				<LinkedContainerCard
					containerType={'ConfluenceSpace'}
					title="Test Title"
					containerIcon="test-icon-url"
					link={testLink}
					onDisconnectButtonClick={mockOnDisconnectButtonClick}
				/>
			</Router>,
		);
		const containerElement = screen.getByTestId('linked-container-card-inner');
		await userEvent.hover(containerElement);

		const crossIconButton = screen.getByRole('button');
		await userEvent.click(crossIconButton);
		expect(crossIconButton).toBeInTheDocument();
		expect(mockOnDisconnectButtonClick).toHaveBeenCalledTimes(1);
	});

	it('should show/hide cross icon button on hover/unhover', async () => {
		render(
			<Router>
				<LinkedContainerCard
					containerType={'ConfluenceSpace'}
					title="Test Title"
					containerIcon="test-icon-url"
					link={testLink}
					onDisconnectButtonClick={jest.fn()}
				/>
			</Router>,
		);

		const containerElement = screen.getByTestId('linked-container-card-inner');
		// Check that the close icon is not visible initially
		expect(
			screen.queryByRole('button', { name: /disconnect the container/i }),
		).not.toBeInTheDocument();
		await userEvent.hover(containerElement);
		// Check that the close icon is visible after on hover
		expect(screen.getByRole('button', { name: /disconnect the container/i })).toBeVisible();
		await userEvent.unhover(containerElement);
		// Check that the close icon is not visible after unhover
		expect(
			screen.queryByRole('button', { name: /disconnect the container/i }),
		).not.toBeInTheDocument();
	});

	it('should fire an analytics event when the cross icon button is clicked', async () => {
		render(
			<Router>
				<LinkedContainerCard
					containerType={'ConfluenceSpace'}
					title="Test Title"
					containerIcon="test-icon-url"
					link={testLink}
					onDisconnectButtonClick={jest.fn()}
				/>
			</Router>,
		);

		const containerElement = screen.getByTestId('linked-container-card-inner');
		await userEvent.hover(containerElement);
		const crossIconButton = screen.getByRole('button');
		await userEvent.click(crossIconButton);
		expect(fireUIEvent).toHaveBeenCalledTimes(1);
		expect(fireUIEvent).toHaveBeenCalledWith(expect.any(Function), {
			action: 'clicked',
			actionSubject: 'button',
			actionSubjectId: 'containerUnlinkButton',
		});
	});

	it('should capture and report a11y violations', async () => {
		const { container } = render(
			<Router>
				<LinkedContainerCard
					containerType={'ConfluenceSpace'}
					title="Test Title"
					containerIcon="test-icon-url"
					link={testLink}
					onDisconnectButtonClick={jest.fn()}
				/>
			</Router>,
		);
		await expect(container).toBeAccessible();
	});
});
