import React from 'react';

import { render, screen } from '@testing-library/react';

import context from '../../../../../../__fixtures__/flexible-ui-data-context';
import { getFlexibleCardTestWrapper } from '../../../../../../__tests__/__utils__/unit-testing-library-helpers';
import { type SmartLinkStatus } from '../../../../../../constants';
import ActionBlock from '../index';
import type { ActionBlockProps } from '../types';

jest.mock('../../../../../../state/hooks/use-invoke', () => jest.fn());
jest.mock('../../../../../../state/hooks/use-resolve', () => jest.fn());

describe('ActionBlock', () => {
	const setup = (props?: Partial<ActionBlockProps>, status?: SmartLinkStatus) =>
		render(<ActionBlock {...props} />, {
			wrapper: getFlexibleCardTestWrapper(context, undefined, status),
		});

	it('renders ActionBlock', async () => {
		setup();
		const block = await screen.findByTestId('smart-block-action');
		expect(block).toBeInTheDocument();
	});

	it('renders list of actions', async () => {
		setup();

		const downloadAction = await screen.findByTestId('smart-action-download-action');
		expect(downloadAction).toBeInTheDocument();

		const followAction = await screen.findByTestId('smart-action-follow-action');
		expect(followAction).toBeInTheDocument();

		const previewAction = await screen.findByTestId('smart-action-preview-action');
		expect(previewAction).toBeInTheDocument();

		const aiSummaryAction = await screen.findByTestId(
			'smart-action-ai-summary-action-summarise-action',
		);
		expect(aiSummaryAction).toBeInTheDocument();

		const viewRelatedLinksAction = await screen.findByTestId(
			'smart-action-view-related-links-action',
		);
		expect(viewRelatedLinksAction).toBeInTheDocument();
	});

	it('sorts list of actions', async () => {
		setup();

		const buttons = await screen.findAllByRole('button');
		const copyLinkAction = await screen.findByTestId('smart-action-copy-link-action');
		const downloadAction = await screen.findByTestId('smart-action-download-action');
		const followAction = await screen.findByTestId('smart-action-follow-action');
		const previewAction = await screen.findByTestId('smart-action-preview-action');
		const aiSummaryAction = await screen.findByTestId(
			'smart-action-ai-summary-action-summarise-action',
		);
		const automationAction = await screen.findByTestId('smart-action-automation-action');
		const viewRelatedLinksAction = await screen.findByTestId(
			'smart-action-view-related-links-action',
		);

		expect(buttons.length).toBe(7);
		expect(buttons[0]).toBe(previewAction);
		expect(buttons[1]).toBe(copyLinkAction);
		expect(buttons[2]).toBe(aiSummaryAction);
		expect(buttons[3]).toBe(downloadAction);
		expect(buttons[4]).toBe(followAction);
		expect(buttons[5]).toBe(automationAction);
		expect(buttons[6]).toBe(viewRelatedLinksAction);
	});

	it('should capture and report a11y violations', async () => {
		const { container } = setup();
		await expect(container).toBeAccessible();
	});
});
