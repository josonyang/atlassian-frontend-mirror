import '@atlaskit/link-test-helpers/jest';

import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl-next';

import { AnalyticsListener } from '@atlaskit/analytics-next';

import mockContext from '../../../../../../__fixtures__/flexible-ui-data-context';
import * as useInvokeClientAction from '../../../../../../state/hooks/use-invoke-client-action';
import { ANALYTICS_CHANNEL } from '../../../../../../utils/analytics';
import PreviewAction from '../index';
import { type PreviewActionProps } from '../types';

jest.mock('../../../../../../state/flexible-ui-context', () => ({
	...jest.requireActual('../../../../../../state/flexible-ui-context'),
	useFlexibleUiContext: jest.fn().mockReturnValue(mockContext),
}));

describe('PreviewAction', () => {
	const testId = 'smart-action-preview-action';

	const setup = (props?: Partial<PreviewActionProps>) => {
		const onEvent = jest.fn();

		return render(
			<AnalyticsListener onEvent={onEvent} channel={ANALYTICS_CHANNEL}>
				<IntlProvider locale="en">
					<PreviewAction {...props} />
				</IntlProvider>
			</AnalyticsListener>,
		);
	};

	it('renders action', async () => {
		setup();
		const element = await screen.findByTestId(testId);
		expect(element).toBeInTheDocument();
		expect(element).toHaveTextContent('Open preview');
	});

	it('invokes action', async () => {
		const invoke = jest.fn();
		const spy = jest.spyOn(useInvokeClientAction, 'default').mockReturnValue(invoke);

		setup();

		const element = await screen.findByTestId(testId);
		await userEvent.click(element);

		expect(invoke).toHaveBeenCalledTimes(1);

		spy.mockRestore();
	});

	describe('with tooltip', () => {
		it('renders tooltip', async () => {
			const user = userEvent.setup();
			setup();

			const element = await screen.findByTestId(testId);
			await user.hover(element);

			const tooltip = await screen.findByRole('tooltip');
			expect(tooltip).toHaveTextContent('Open preview');
		});

		it('renders stack item tooltip', async () => {
			const user = userEvent.setup();
			setup({ as: 'stack-item' });

			const element = await screen.findByTestId(testId);
			await user.hover(element);

			const tooltip = await screen.findByRole('tooltip');
			expect(tooltip).toHaveTextContent('Open a full screen preview of this link');
		});
	});
	it('should capture and report a11y violations', async () => {
		const { container } = setup({ as: 'stack-item' });
		await expect(container).toBeAccessible();
	});
});
