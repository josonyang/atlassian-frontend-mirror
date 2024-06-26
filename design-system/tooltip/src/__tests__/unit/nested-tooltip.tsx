import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';

import Tooltip from '../../Tooltip';

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

it('should allow tooltips to be nested', () => {
	const { getByTestId, queryByTestId } = render(
		<Tooltip content="outer" testId="tooltip--outer">
			<div data-testid="outer">
				<h4>Hi there, I am the outer content</h4>
				<Tooltip content="inner" testId="tooltip--inner">
					<div data-testid="inner">inner</div>
				</Tooltip>
			</div>
		</Tooltip>,
	);

	const outerTrigger = getByTestId('outer');
	const innerTrigger = getByTestId('inner');

	// Trigger showing outer tooltip
	fireEvent.mouseOver(outerTrigger);
	act(() => {
		jest.runAllTimers();
	});
	expect(queryByTestId('tooltip--outer')).toBeInTheDocument();
	expect(queryByTestId('tooltip--inner')).not.toBeInTheDocument();

	// Trigger showing inner tooltip
	act(() => {
		fireEvent.mouseOver(innerTrigger);
		jest.runAllTimers();
	});
	expect(queryByTestId('tooltip--inner')).toBeInTheDocument();
	expect(queryByTestId('tooltip--outer')).not.toBeInTheDocument();

	// Leave both triggers causes both tooltips to not be visible
	fireEvent.mouseOut(innerTrigger);
	// Flushing delay
	act(() => {
		jest.runOnlyPendingTimers();
	});
	// Flushing motion
	act(() => {
		jest.runOnlyPendingTimers();
	});
	expect(queryByTestId('tooltip--inner')).not.toBeInTheDocument();
	expect(queryByTestId('tooltip--outer')).not.toBeInTheDocument();
});
