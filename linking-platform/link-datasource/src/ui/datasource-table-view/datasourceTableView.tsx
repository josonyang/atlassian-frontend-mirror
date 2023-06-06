/** @jsx jsx */
import { useEffect } from 'react';

import { css, jsx } from '@emotion/react';

import Spinner from '@atlaskit/spinner';
import { token } from '@atlaskit/tokens';

import { useDatasourceTableState } from '../../hooks/useDatasourceTableState';
import { IssueLikeDataTableView } from '../issue-like-table';
import { TableFooter } from '../table-footer';

import { DatasourceTableViewProps } from './types';

const TableViewWrapperStyles = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  position: 'relative',
  padding: token('space.200', '16px'),
  paddingBottom: 0,
  boxSizing: 'border-box',
});

export const DatasourceTableView = ({
  datasourceId,
  parameters,
  visibleColumnKeys,
  onVisibleColumnKeysChange,
}: DatasourceTableViewProps) => {
  const {
    reset,
    status,
    onNextPage,
    responseItems,
    hasNextPage,
    columns,
    defaultVisibleColumnKeys,
    totalCount,
    loadDatasourceDetails,
  } = useDatasourceTableState({
    datasourceId,
    parameters,
    fieldKeys: visibleColumnKeys,
  });

  useEffect(() => {
    if (
      onVisibleColumnKeysChange &&
      (visibleColumnKeys || []).length === 0 &&
      defaultVisibleColumnKeys.length > 0
    ) {
      onVisibleColumnKeysChange(defaultVisibleColumnKeys);
    }
  }, [visibleColumnKeys, defaultVisibleColumnKeys, onVisibleColumnKeysChange]);

  return columns.length > 0 ? (
    <div css={TableViewWrapperStyles}>
      <IssueLikeDataTableView
        testId={'datasource-table-view'}
        hasNextPage={hasNextPage}
        items={responseItems}
        onNextPage={onNextPage}
        onLoadDatasourceDetails={loadDatasourceDetails}
        status={status}
        columns={columns}
        visibleColumnKeys={visibleColumnKeys || defaultVisibleColumnKeys}
        onVisibleColumnKeysChange={onVisibleColumnKeysChange}
      />
      <TableFooter
        issueCount={totalCount}
        onRefresh={reset}
        isLoading={status === 'loading'}
      />
    </div>
  ) : (
    <Spinner testId={'datasource-table-view-spinner'} />
  );
};
