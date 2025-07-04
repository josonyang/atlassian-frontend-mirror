import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, fireEvent } from '@testing-library/react';
import AnalyticsListener from '@atlaskit/analytics-next/AnalyticsListener';
import { createIntl, createIntlCache } from 'react-intl-next';

import { messages } from '../../../../../../messages';
import { WhatsNewResultsEmpty } from '../..';

const cache = createIntlCache();
const intl = createIntl(
	{
		locale: 'en',
		messages: {},
	},
	cache,
);
const messageClearFilterLink = intl.formatMessage(
	messages.help_whats_new_no_results_clear_filter_button_label,
);

const mockOnClearFilter = jest.fn();
const analyticsSpy = jest.fn();

describe('WhatsNewResultsEmpty', () => {
	it('should capture and report a11y violations', async () => {
		const { container } = render(
			<WhatsNewResultsEmpty intl={intl} onClearFilter={mockOnClearFilter} />,
		);

		await expect(container).toBeAccessible();
	});

	it('Should match snapshot', () => {
		const { asFragment } = render(
			<WhatsNewResultsEmpty intl={intl} onClearFilter={mockOnClearFilter} />,
		);

		expect(asFragment()).toMatchSnapshot();
	});

	it('Execute the function prop "onClearFilter" when the user clicks the link to open clear the filter', () => {
		const { queryByText } = render(
			<AnalyticsListener channel="help" onEvent={analyticsSpy}>
				<WhatsNewResultsEmpty intl={intl} onClearFilter={mockOnClearFilter} />
			</AnalyticsListener>,
		);

		const button = queryByText(messageClearFilterLink);
		expect(button).not.toBeNull();

		if (button) {
			expect(mockOnClearFilter).toHaveBeenCalledTimes(0);
			fireEvent.click(button);
			expect(mockOnClearFilter).toHaveBeenCalledTimes(1);
		}
	});
});
