import React from 'react';

// eslint-disable-next-line import/order
import { fireEvent, render } from '@testing-library/react';

import '@atlaskit/link-test-helpers/jest';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import { FlagsProvider } from '@atlaskit/flag';
import { CardClient, SmartCardProvider } from '@atlaskit/link-provider';

import { InlineEdit } from '../../../issue-like-table/table-cell-content/inline-edit';

import { DatasourceModal } from './index';

const testIds = {
	readView: 'mock-read-view',
	editView: 'inline-edit-text',
};

const MockReadView = () => {
	return <div data-testid={testIds.readView}>Test</div>;
};

describe('DatasourceModal', () => {
	it('should fire datasourceModalDialog viewed screen event on mount', () => {
		const spy = jest.fn();

		render(
			<AnalyticsListener channel="media" onEvent={spy}>
				<DatasourceModal testId="datasource-modal" onClose={jest.fn()} />
			</AnalyticsListener>,
		);

		expect(spy).toBeFiredWithAnalyticEventOnce(
			{
				payload: {
					eventType: 'screen',
					name: 'datasourceModalDialog',
					action: 'viewed',
					attributes: {},
				},
			},
			'media',
		);
	});

	it('should close on ESC key press', () => {
		const onClose = jest.fn();
		const executeFn = jest.fn();
		const { container } = render(
			<SmartCardProvider client={new CardClient()}>
				<DatasourceModal onClose={onClose}>
					<FlagsProvider>
						<InlineEdit
							ari="fake-ari"
							columnKey="fake-column"
							execute={executeFn}
							datasourceTypeWithValues={{ type: 'string', values: ['Test'] }}
							readView={<p>Test</p>}
						/>
					</FlagsProvider>
				</DatasourceModal>
			</SmartCardProvider>,
		);

		fireEvent.keyDown(container, {
			key: 'Escape',
			code: 'Escape',
			keyCode: 27,
			charCode: 27,
		});

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('when triggering inline-edit, pressing Escape, should cancel editing and keep the modal open', () => {
		const onModalCloseFn = jest.fn();
		const executeFn = jest.fn();
		const { getByTestId } = render(
			<SmartCardProvider client={new CardClient()}>
				<DatasourceModal onClose={onModalCloseFn}>
					<FlagsProvider>
						<InlineEdit
							ari="fake-ari"
							columnKey="fake-column"
							execute={executeFn}
							datasourceTypeWithValues={{ type: 'string', values: ['Test'] }}
							readView={<MockReadView />}
						/>
					</FlagsProvider>
				</DatasourceModal>
			</SmartCardProvider>,
		);
		fireEvent.click(getByTestId(testIds.readView));

		expect(getByTestId(testIds.editView)).toBeInTheDocument();
		fireEvent.keyDown(getByTestId(testIds.editView), {
			key: 'Escape',
			code: 'Escape',
			keyCode: 27,
			charCode: 27,
		});

		expect(getByTestId(testIds.readView)).toBeInTheDocument();

		expect(onModalCloseFn).toHaveBeenCalledTimes(0);
	});
});
