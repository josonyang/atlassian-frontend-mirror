import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { IntlProvider } from 'react-intl-next';

import '@atlaskit/link-test-helpers/jest';

import AISummaryAction from '../index';
import mockContext from '../../../../../../__fixtures__/flexible-ui-data-context';
import { ANALYTICS_CHANNEL } from '../../../../../../utils/analytics';
import { useFlexibleUiContext } from '../../../../../../state/flexible-ui-context';
import { useAISummary } from '../../../../../../state/hooks/use-ai-summary';

import type { AISummaryActionProps } from '../types';
import type { FlexibleUiDataContext } from '../../../../../../state/flexible-ui-context/types';
import type { AISummaryState } from '../../../../../../state/hooks/use-ai-summary/ai-summary-service/types';

jest.mock('../../../../../../state/flexible-ui-context', () => ({
  ...jest.requireActual('../../../../../../state/flexible-ui-context'),
  useFlexibleUiContext: jest.fn(),
}));

jest.mock('../../../../../../state/hooks/use-ai-summary', () => ({
  useAISummary: jest.fn(),
}));

describe('AISummaryAction', () => {
  const testId = 'smart-action-ai-summary-action';

  const setup = (
    props?: AISummaryActionProps,
    overrideContext?: FlexibleUiDataContext,
    overrideAiSummaryState?: AISummaryState,
  ) => {
    const onEvent = jest.fn();
    const mockSummariseUrl = jest.fn();

    const mockAISummaryState = { status: 'ready', content: '' };

    (useFlexibleUiContext as jest.Mock).mockImplementation(
      () => overrideContext || mockContext,
    );

    (useAISummary as jest.Mock).mockImplementation(() => ({
      state: overrideAiSummaryState || mockAISummaryState,
      summariseUrl: mockSummariseUrl.mockResolvedValue(
        overrideAiSummaryState || mockAISummaryState,
      ),
    }));

    const renderResult = render(
      <AnalyticsListener onEvent={onEvent} channel={ANALYTICS_CHANNEL}>
        <IntlProvider locale="en">
          <AISummaryAction {...props} as="stack-item" testId={testId} />
        </IntlProvider>
      </AnalyticsListener>,
    );

    return { ...renderResult, onEvent, mockSummariseUrl };
  };

  it('renders AI summary action if action data is present', async () => {
    const { findByTestId } = setup({ as: 'stack-item' });

    const element = await findByTestId(`${testId}-summarise-action`);

    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Summarize with AI');
  });

  it('does not render AI summary action if action data is not present', async () => {
    const { queryByTestId } = setup(
      {},
      {
        ...mockContext,
        actions: { ...mockContext.actions, AISummaryAction: undefined },
      },
    );

    expect(queryByTestId(`${testId}--summarise-action`)).toBeNull();
  });

  it('invokes the onClick callback when the action is clicked', async () => {
    const onClick = jest.fn();
    const { getByTestId } = setup({ onClick });

    getByTestId(`${testId}-summarise-action`).click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not invoke the onClick callback when the action is clicked and status is loading', async () => {
    const onClick = jest.fn();
    const { getByTestId } = setup({ onClick }, undefined, {
      status: 'loading',
      content: 'some partial content',
    });

    getByTestId(`${testId}-summarise-action`).click();

    expect(onClick).not.toHaveBeenCalled();
  });

  it('invokes the summariseUrl function when the action is clicked', async () => {
    const { getByTestId, mockSummariseUrl } = setup();

    getByTestId(`${testId}-summarise-action`).click();

    expect(mockSummariseUrl).toHaveBeenCalledTimes(1);
  });

  it('does not invoke the summariseUrl function when the action is clicked and status is loading', async () => {
    const { getByTestId, mockSummariseUrl } = setup({}, undefined, {
      status: 'loading',
      content: 'some partial content',
    });

    getByTestId(`${testId}-summarise-action`).click();

    expect(mockSummariseUrl).not.toHaveBeenCalled();
  });

  it('calls onErrorCallback on error', async () => {
    const user = userEvent.setup();

    const onError = jest.fn();

    const { findByTestId } = setup({ as: 'stack-item', onError }, undefined, {
      status: 'error',
      content: '',
      error: 'NETWORK_ERROR',
    });

    const element = await findByTestId(`${testId}-summarise-action`);

    await user.click(element);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        appearance: 'error',
        title: expect.any(Object),
      }),
    );
  });

  it('fires expected analytics event when clicked', async () => {
    const { onEvent, getByTestId } = setup();

    await userEvent.click(getByTestId(`${testId}-summarise-action`));

    expect(onEvent).toBeFiredWithAnalyticEventOnce({
      payload: {
        action: 'clicked',
        actionSubject: 'button',
        eventType: 'ui',
        actionSubjectId: 'aiSummary',
      },
    });
  });

  describe('Copy Summary action', () => {
    it('renders copy summary action if summary generation is complete', async () => {
      const { queryByTestId } = setup({}, undefined, {
        status: 'done',
        content: 'some fake content',
      });

      expect(
        queryByTestId(`${testId}-copy-summary-action`),
      ).toBeInTheDocument();
    });

    it('copies summary if copy summary action is clicked', async () => {
      userEvent.setup();

      const testContent = 'some test content';

      const { getByTestId } = setup(undefined, undefined, {
        status: 'done',
        content: testContent,
      });

      await userEvent.click(getByTestId(`${testId}-copy-summary-action`));

      const text = await navigator.clipboard.readText();

      expect(text).toBe(testContent);
    });

    it('invokes callback if copy summary action is clicked', async () => {
      const onClick = jest.fn();

      const { getByTestId } = setup({ onClick }, undefined, {
        status: 'done',
        content: 'some fake content',
      });

      await userEvent.click(getByTestId(`${testId}-copy-summary-action`));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders expected tooltip', async () => {
      userEvent.setup();

      const { getByTestId, findByRole } = setup(undefined, undefined, {
        status: 'done',
        content: 'some fake content',
      });

      const element = getByTestId(`${testId}-copy-summary-action`);

      await userEvent.hover(element);

      const tooltip = await findByRole('tooltip');
      expect(tooltip.textContent).toBe('Copy summary');
    });

    it('renders updated tooltip after click', async () => {
      userEvent.setup();

      const { getByTestId, findByRole } = setup(undefined, undefined, {
        status: 'done',
        content: 'some fake content',
      });

      const element = getByTestId(`${testId}-copy-summary-action`);

      await userEvent.click(element);
      await userEvent.hover(element);

      const tooltip = await findByRole('tooltip');
      expect(tooltip.textContent).toBe('Copied summary to clipboard');
    });

    it('resets tooltip message after tooltip hides', async () => {
      userEvent.setup();

      const { findAllByText, queryAllByText, getByTestId } = setup(
        undefined,
        undefined,
        {
          status: 'done',
          content: 'some fake content',
        },
      );

      const element = getByTestId(`${testId}-copy-summary-action`);

      await userEvent.click(element);
      await findAllByText('Copied summary to clipboard');

      await userEvent.unhover(element);
      await waitForElementToBeRemoved(() =>
        queryAllByText(`Copied summary to clipboard`),
      );

      await userEvent.hover(element);

      const tooltip = await findAllByText('Copy summary');
      expect(tooltip).toBeTruthy();
    });

    it('fires expected analytics event when clicked', async () => {
      userEvent.setup();

      const { onEvent, getByTestId } = setup(undefined, undefined, {
        status: 'done',
        content: 'some test content',
      });

      await userEvent.click(getByTestId(`${testId}-copy-summary-action`));

      expect(onEvent).toBeFiredWithAnalyticEventOnce({
        payload: {
          action: 'clicked',
          actionSubject: 'button',
          eventType: 'ui',
          actionSubjectId: 'copySummary',
        },
      });
    });
  });
});
