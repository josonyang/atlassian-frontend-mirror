import React from 'react';

import { render, screen } from '@atlassian/testing-library';

import FeatureDiscovery from '../index';

// eslint-disable-next-line @atlassian/a11y/require-jest-coverage
describe('FeatureDiscovery', () => {
	it('does not show feature discovery component when localStorage throws error', () => {
		jest.spyOn(localStorage, 'getItem').mockImplementationOnce(() => {
			throw new Error();
		});

		render(
			<FeatureDiscovery testId="wrapper">
				<span data-testid="content" />
			</FeatureDiscovery>,
		);

		expect(screen.queryByTestId('wrapper-discovery')).not.toBeInTheDocument();
		expect(screen.queryByTestId('content')).toBeInTheDocument();
	});
});
