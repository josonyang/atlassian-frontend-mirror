import React, { useState } from 'react';

import Button from '@atlaskit/button/standard-button';
import { SmartCardProvider } from '@atlaskit/link-provider';
import {
  defaultInitialVisibleColumnKeys,
  mockBasicFilterAGGFetchRequests,
  mockDatasourceFetchRequests,
} from '@atlaskit/link-test-helpers/datasource';
import {
  DatasourceAdfTableViewColumn,
  InlineCardAdf,
} from '@atlaskit/linking-common/types';

import SmartLinkClient from '../examples-helpers/smartLinkCustomClient';
import {
  JIRA_LIST_OF_LINKS_DATASOURCE_ID,
  JiraIssuesConfigModal,
} from '../src';
import {
  JiraIssueDatasourceParameters,
  JiraIssuesDatasourceAdf,
} from '../src/ui/jira-issues-modal/types';

mockDatasourceFetchRequests();
mockBasicFilterAGGFetchRequests();

export default () => {
  const [generatedAdf, setGeneratedAdf] = useState<string>('');
  const [showModal, setShowModal] = useState(true);
  const [parameters, setParameters] = useState<
    JiraIssueDatasourceParameters | undefined
  >(undefined);
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<
    string[] | undefined
  >(defaultInitialVisibleColumnKeys);
  const [columnCustomSizes, setColumnCustomSizes] = useState<
    { [key: string]: number } | undefined
  >();
  const [wrappedColumnKeys, setWrappedColumnKeys] = useState<
    string[] | undefined
  >();

  const toggleIsOpen = () => setShowModal(prevOpenState => !prevOpenState);
  const closeModal = () => setShowModal(false);

  const onInsert = (adf: InlineCardAdf | JiraIssuesDatasourceAdf) => {
    if (adf.type === 'blockCard') {
      setParameters(adf.attrs.datasource.parameters);
      const columnsProp = adf.attrs.datasource.views[0]?.properties?.columns;
      setVisibleColumnKeys(columnsProp?.map(c => c.key));
      const columnsWithWidth = columnsProp?.filter(
        (
          c,
        ): c is Omit<DatasourceAdfTableViewColumn, 'width'> &
          Required<Pick<DatasourceAdfTableViewColumn, 'width'>> => !!c.width,
      );

      if (columnsWithWidth) {
        const keyWidthPairs: [string, number][] = columnsWithWidth.map<
          [string, number]
        >(c => [c.key, c.width]);
        setColumnCustomSizes(Object.fromEntries<number>(keyWidthPairs));
      } else {
        setColumnCustomSizes(undefined);
      }

      const wrappedColumnKeys = columnsProp
        ?.filter(c => c.isWrapped)
        .map(c => c.key);
      setWrappedColumnKeys(wrappedColumnKeys);
    }
    setGeneratedAdf(JSON.stringify(adf, null, 2));
    closeModal();
  };

  return (
    <SmartCardProvider client={new SmartLinkClient()}>
      <Button appearance="primary" onClick={toggleIsOpen}>
        Toggle Modal
      </Button>
      <div>Generated ADF:</div>
      <pre>
        <code data-testid="generated-adf">{generatedAdf}</code>
      </pre>
      {showModal && (
        <JiraIssuesConfigModal
          datasourceId={JIRA_LIST_OF_LINKS_DATASOURCE_ID}
          visibleColumnKeys={visibleColumnKeys}
          columnCustomSizes={columnCustomSizes}
          wrappedColumnKeys={wrappedColumnKeys}
          parameters={parameters}
          onCancel={closeModal}
          onInsert={onInsert}
        />
      )}
    </SmartCardProvider>
  );
};
