import React from 'react';

import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl-next';

import { ffTest } from '@atlassian/feature-flags-test-utils';

import ModifiedOnElement from './index';

jest.mock('../../../../../state/flexible-ui-context', () => ({
	useFlexibleUiContext: jest.fn(() => ({
		modifiedOn: '2023-10-01T12:00:00Z',
	})),
}));

const renderModifiedOnElement = (onRender?: (hasData: boolean) => void) => {
	return render(
		<IntlProvider locale="en">
			<ModifiedOnElement onRender={onRender} />
		</IntlProvider>,
	);
};

describe('ModifiedOnElement', () => {
	ffTest.on('platform-linking-additional-flexible-element-props', '', () => {
		it('should render trigger onRender callback when feature flag is enabled', async () => {
			const onRender = jest.fn();

			renderModifiedOnElement(onRender);

			const element = await screen.findByTestId('smart-element-date-time');
			expect(element).toBeTruthy();
			expect(onRender).toHaveBeenCalledWith(expect.any(Boolean));
		});
	});

	ffTest.off('platform-linking-additional-flexible-element-props', '', () => {
		it('should not trigger onRender callback when feature flag is disabled', async () => {
			const onRender = jest.fn();

			renderModifiedOnElement(onRender);

			const element = await screen.findByTestId('smart-element-date-time');
			expect(element).toBeTruthy();
			expect(onRender).not.toHaveBeenCalled();
		});
	});
});
