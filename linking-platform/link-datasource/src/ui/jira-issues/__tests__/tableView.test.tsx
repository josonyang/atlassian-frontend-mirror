import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl-next';

import { asMock } from '@atlaskit/link-test-helpers/jest';

import {
  DatasourceTableState,
  useDatasourceTableState,
} from '../../../hooks/useDatasourceTableState';
import { JiraIssuesTableView } from '../tableView';
import { JiraIssueDatasourceParameters } from '../types';

jest.mock('../../../hooks/useDatasourceTableState');

describe('JiraIssuesTableView', () => {
  const setup = (overrides: Partial<DatasourceTableState> = {}) => {
    asMock(useDatasourceTableState).mockReturnValue({
      reset: jest.fn(),
      status: 'resolved',
      onNextPage: jest.fn(),
      hasNextPage: false,
      responseItems: [{ myColumn: 'some-value', myId: 'some-id1' }],
      columns: [
        { key: 'myColumn', title: 'My Column', type: 'string' },
        { key: 'myId', isIdentity: true },
      ],
      defaultVisibleColumnKeys: ['myColumn'],
      ...overrides,
    } as DatasourceTableState);
  };

  const renderComponent = ({
    visibleColumnKeys = ['visible-column-1', 'visible-column-2'],
    onVisibleColumnKeysChange = jest.fn(),
  }: {
    visibleColumnKeys?: string[];
    onVisibleColumnKeysChange?: (visibleColumnKeys: string[]) => void;
  } = {}) =>
    render(
      <IntlProvider locale="en">
        <JiraIssuesTableView
          datasourceId={'some-datasource-id'}
          parameters={{
            cloudId: 'some-cloud-id',
            type: 'jql',
            value: 'some-jql-query',
          }}
          visibleColumnKeys={visibleColumnKeys}
          onVisibleColumnKeysChange={onVisibleColumnKeysChange}
        />
      </IntlProvider>,
    );

  it('should call useDatasourceTableState with the correct arguments', () => {
    setup();
    renderComponent();

    expect(useDatasourceTableState).toHaveBeenCalledWith('some-datasource-id', {
      cloudId: 'some-cloud-id',
      type: 'jql',
      value: 'some-jql-query',
    } as JiraIssueDatasourceParameters);
  });

  it('should call IssueLikeDataTableView with right props', () => {
    setup();
    const { getByTestId } = renderComponent({
      visibleColumnKeys: ['myColumn'],
    });

    expect(getByTestId('myColumn-column-heading')).toHaveTextContent(
      'My Column',
    );
    expect(
      getByTestId('jira-issues-table-view--row-some-id1'),
    ).toHaveTextContent('some-value');
  });

  it('should call onVisibleColumnKeysChange with defaultVisibleColumnKeys if no visibleColumnKeys are received from props', () => {
    setup();
    const onVisibleColumnKeysChange = jest.fn();
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <JiraIssuesTableView
          datasourceId={'some-datasource-id'}
          parameters={{
            cloudId: 'some-cloud-id',
            type: 'jql',
            value: 'some-jql-query',
          }}
          onVisibleColumnKeysChange={onVisibleColumnKeysChange}
        />
      </IntlProvider>,
    );

    expect(getByTestId('myColumn-column-heading')).toHaveTextContent(
      'My Column',
    );
    expect(onVisibleColumnKeysChange).toHaveBeenCalledWith(['myColumn']);
  });

  it('should NOT call onVisibleColumnKeysChange with defaultVisibleColumnKeys if visibleColumnKeys are received from props', () => {
    setup();
    const onVisibleColumnKeysChange = jest.fn();
    renderComponent({
      visibleColumnKeys: ['myColumn'],
      onVisibleColumnKeysChange,
    });

    expect(onVisibleColumnKeysChange).not.toHaveBeenCalled();
  });

  it('should NOT call onVisibleColumnKeysChange with defaultVisibleColumnKeys if no defaultVisibleColumnKeys are returned from hook', () => {
    setup({
      defaultVisibleColumnKeys: [],
    });
    const onVisibleColumnKeysChange = jest.fn();
    renderComponent({
      onVisibleColumnKeysChange,
    });

    expect(onVisibleColumnKeysChange).not.toHaveBeenCalled();
  });

  it('should wait for data AND columns before rendering table', () => {
    setup({
      columns: [],
    });

    const { queryByTestId } = renderComponent({
      visibleColumnKeys: ['myColumn'],
    });

    expect(queryByTestId('jira-issues-table-view')).toBe(null);
    expect(queryByTestId('jira-issues-table-view-spinner')).toBeInTheDocument();
  });

  it('should render table footer', () => {
    setup();
    const { getByTestId } = renderComponent();

    expect(getByTestId('table-footer')).toBeInTheDocument();
  });
});
