import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { AnalyticsListener, UIAnalyticsEvent } from '@atlaskit/analytics-next';

import Button from '../../../old-button/button';

const packageName = process.env._PACKAGE_NAME_ as string;
const packageVersion = process.env._PACKAGE_VERSION_ as string;

it('should fire an event on the public channel and the internal channel', () => {
	const onPublicEvent = jest.fn();
	const onAtlaskitEvent = jest.fn();
	function WithBoth() {
		return (
			<AnalyticsListener onEvent={onAtlaskitEvent} channel="atlaskit">
				<AnalyticsListener onEvent={onPublicEvent}>
					<Button
						testId="button"
						onClick={(event: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
							analyticsEvent.fire();
						}}
					>
						Save
					</Button>
				</AnalyticsListener>
			</AnalyticsListener>
		);
	}
	render(<WithBoth />);
	const button: HTMLElement = screen.getByTestId('button');

	fireEvent.click(button);

	const expected: UIAnalyticsEvent = new UIAnalyticsEvent({
		payload: {
			action: 'clicked',
			actionSubject: 'button',
			attributes: {
				componentName: 'button',
				packageName,
				packageVersion,
			},
		},
		context: [
			{
				componentName: 'button',
				packageName,
				packageVersion,
			},
		],
	});

	function assert(eventMock: jest.Mock<any, any>) {
		expect(eventMock).toHaveBeenCalledTimes(1);
		expect(eventMock.mock.calls[0][0].payload).toEqual(expected.payload);
		expect(eventMock.mock.calls[0][0].context).toEqual(expected.context);
	}
	assert(onPublicEvent);
	assert(onAtlaskitEvent);
});

it('should allow the addition of additional context', () => {
	function App({
		onEvent,
		channel,
		analyticsContext,
	}: {
		onEvent: (...args: any[]) => void;
		channel: string | undefined;
		analyticsContext?: Record<string, any>;
	}) {
		return (
			<AnalyticsListener onEvent={onEvent} channel={channel}>
				<Button
					testId="button"
					analyticsContext={analyticsContext}
					onClick={(event: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
						analyticsEvent.fire();
					}}
				>
					Save
				</Button>
			</AnalyticsListener>
		);
	}

	const onEvent = jest.fn();
	const extraContext = { hello: 'world' };
	render(<App onEvent={onEvent} channel="atlaskit" analyticsContext={extraContext} />);
	const button: HTMLElement = screen.getByTestId('button');

	fireEvent.click(button);

	const expected: UIAnalyticsEvent = new UIAnalyticsEvent({
		payload: {
			action: 'clicked',
			actionSubject: 'button',
			attributes: {
				componentName: 'button',
				packageName,
				packageVersion,
			},
		},
		context: [
			{
				componentName: 'button',
				packageName,
				packageVersion,
				...extraContext,
			},
		],
	});
	expect(onEvent).toHaveBeenCalledTimes(1);
	expect(onEvent.mock.calls[0][0].payload).toEqual(expected.payload);
	expect(onEvent.mock.calls[0][0].context).toEqual(expected.context);
});

it('should not error if there is no analytics provider', () => {
	const error = jest.spyOn(console, 'error');
	const onClick = jest.fn();
	render(
		<Button testId="button" onClick={onClick}>
			Save
		</Button>,
	);

	const button: HTMLElement = screen.getByTestId('button');
	fireEvent.click(button);

	expect(error).not.toHaveBeenCalled();
	error.mockRestore();
});
