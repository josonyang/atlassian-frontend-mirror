import React from 'react';

import { fireEvent, render, within } from '@testing-library/react';
import { IntlProvider } from 'react-intl-next';
import invariant from 'tiny-invariant';

import {
  fieldValuesResponseForProjectsMapped,
  fieldValuesResponseForStatusesMapped,
} from '@atlaskit/link-test-helpers/datasource';
import { asMock } from '@atlaskit/link-test-helpers/jest';

import {
  FilterOptionsState,
  useFilterOptions,
} from '../../hooks/useFilterOptions';
import { BasicFilterFieldType, SelectOption } from '../../types';
import BasicFilterContainer, { BasicFilterContainerProps } from '../index';

jest.mock('../../hooks/useFilterOptions');
jest.useFakeTimers();

const setup = ({
  cloudId = 'cloudId',
  jql = '',
  openPicker,
  filterType = 'project',
  filterOptions,
  totalCount,
  status,
  fetchFilterOptions,
}: Partial<
  BasicFilterContainerProps &
    FilterOptionsState & {
      openPicker?: boolean;
      filterType?: BasicFilterFieldType;
    }
> = {}) => {
  asMock(useFilterOptions).mockReturnValue({
    filterOptions: filterOptions || [],
    status: status || 'empty',
    totalCount: totalCount || 0,
    fetchFilterOptions: fetchFilterOptions || jest.fn(),
    reset: jest.fn(),
  });

  const renderResult = render(
    <IntlProvider locale="en">
      <BasicFilterContainer cloudId={cloudId as string} jql={jql as string} />
    </IntlProvider>,
  );

  if (openPicker) {
    const triggerButton = renderResult.queryByTestId(
      `jlol-basic-filter-${filterType}-trigger`,
    );

    invariant(triggerButton);
    fireEvent.click(triggerButton);
  }

  return { ...renderResult };
};

describe('Testing BasicFilterContainer', () => {
  it('should render options with those selected ordered first on menu reopen', async () => {
    const { findByTestId } = setup({
      filterType: 'status',
      filterOptions: fieldValuesResponseForStatusesMapped as SelectOption[],
      openPicker: true,
      status: 'resolved',
    });

    const selectMenu = await findByTestId(
      'jlol-basic-filter-popup-select--menu',
    );

    const triggerButton = await findByTestId(
      `jlol-basic-filter-status-trigger`,
    );

    const initialLozengeOptions = within(selectMenu).queryAllByTestId(
      'jlol-basic-filter-popup-select-option--lozenge',
    );
    const secondOption = initialLozengeOptions[1];

    // Select second option ('Awaiting approval' lozenge)
    fireEvent.click(secondOption);

    // Close menu
    fireEvent.click(triggerButton);

    // Check that the ordering has NOT yet have changed
    const expectedTextContentsOnClose = [
      'Authorize',
      'Awaiting approval',
      'Awaiting implementation',
      'Canceled',
      'Closed',
    ];

    expectedTextContentsOnClose.forEach((expectedTextContent, index) => {
      expect(initialLozengeOptions[index]).toHaveTextContent(
        expectedTextContent,
      );
    });

    // Reopen menu
    fireEvent.click(triggerButton);

    const selectMenu2 = await findByTestId(
      'jlol-basic-filter-popup-select--menu',
    );
    const updatedLozengeOptions = within(selectMenu2).queryAllByTestId(
      'jlol-basic-filter-popup-select-option--lozenge',
    );

    // Check that the ordering has been updated on reopen
    const expectedTextContentsOnReopen = [
      'Awaiting approval',
      'Authorize',
      'Awaiting implementation',
      'Canceled',
      'Closed',
    ];

    expectedTextContentsOnReopen.forEach((expectedTextContent, index) => {
      expect(updatedLozengeOptions[index]).toHaveTextContent(
        expectedTextContent,
      );
    });
  });

  it('should apply selection for each filter correctly', async () => {
    const { findByTestId, container, rerender } = setup({
      filterType: 'status',
      filterOptions: fieldValuesResponseForStatusesMapped as SelectOption[],
      openPicker: true,
      status: 'resolved',
    });

    const statusSelectMenu = await findByTestId(
      'jlol-basic-filter-popup-select--menu',
    );

    const [firstStatus] = within(statusSelectMenu).queryAllByTestId(
      'jlol-basic-filter-popup-select-option--lozenge',
    );
    fireEvent.click(firstStatus);

    // Close menu
    const statusTriggerButton = await findByTestId(
      `jlol-basic-filter-status-trigger`,
    );
    fireEvent.click(statusTriggerButton);

    expect(container).toHaveTextContent('ProjectTypeStatus: AuthorizeAssignee');

    asMock(useFilterOptions).mockReturnValue({
      filterOptions: fieldValuesResponseForProjectsMapped,
      status: 'resolved',
      fetchFilterOptions: jest.fn(),
      reset: jest.fn(),
    });

    rerender(
      <IntlProvider locale="en">
        <BasicFilterContainer cloudId={'cloudId'} jql={''} />
      </IntlProvider>,
    );

    const projectTriggerButton = await findByTestId(
      `jlol-basic-filter-project-trigger`,
    );
    fireEvent.click(projectTriggerButton);

    const projectSelectMenu = await findByTestId(
      'jlol-basic-filter-popup-select--menu',
    );

    const [firstProject] = within(projectSelectMenu).queryAllByTestId(
      'jlol-basic-filter-popup-select-option--icon-label',
    );
    fireEvent.click(firstProject);
    // Close menu
    fireEvent.click(projectTriggerButton);

    expect(container).toHaveTextContent(
      'Project: My IT TESTTypeStatus: AuthorizeAssignee',
    );
  });

  it('should reset filter labels when the cloudId changes', async () => {
    const { findByTestId, rerender } = setup({
      filterType: 'status',
      filterOptions: fieldValuesResponseForStatusesMapped as SelectOption[],
      openPicker: true,
      status: 'resolved',
    });

    const selectMenu = await findByTestId(
      'jlol-basic-filter-popup-select--menu',
    );

    const triggerButton = await findByTestId(
      `jlol-basic-filter-status-trigger`,
    );

    const [firstOption] = within(selectMenu).queryAllByTestId(
      'jlol-basic-filter-popup-select-option--lozenge',
    );
    fireEvent.click(firstOption);

    const [_, secondOption] = within(selectMenu).queryAllByTestId(
      'jlol-basic-filter-popup-select-option--lozenge',
    );
    fireEvent.click(secondOption);

    // Close menu
    fireEvent.click(triggerButton);

    expect(triggerButton).toHaveTextContent('Authorize+1');

    rerender(
      <IntlProvider locale="en">
        <BasicFilterContainer cloudId={'newCloudId'} jql={''} />
      </IntlProvider>,
    );

    expect(triggerButton).toHaveTextContent('Status');
  });

  it('should reset search term when the cloudId changes', async () => {
    const { findByTestId, rerender, container } = setup({
      filterType: 'status',
      filterOptions: fieldValuesResponseForStatusesMapped as SelectOption[],
      openPicker: true,
      status: 'resolved',
    });

    const input = container.parentElement?.querySelector(
      '#jlol-basic-filter-popup-select--input',
    );
    invariant(input);

    fireEvent.change(input, { target: { value: 'hello' } });

    expect(
      container.parentElement?.querySelector('[data-value="hello"]'),
    ).not.toBeNull();

    const triggerButton = await findByTestId(
      `jlol-basic-filter-status-trigger`,
    );
    // Close menu
    fireEvent.click(triggerButton);

    rerender(
      <IntlProvider locale="en">
        <BasicFilterContainer cloudId={'newCloudId'} jql={''} />
      </IntlProvider>,
    );

    fireEvent.click(triggerButton);

    expect(
      container.parentElement?.querySelector('[data-value="hello"]'),
    ).toBeNull();
  });
});
