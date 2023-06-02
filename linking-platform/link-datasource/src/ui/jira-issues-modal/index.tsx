import React, { lazy, Suspense } from 'react';

import { JiraIssuesConfigModalProps } from './types';

export const JIRA_LIST_OF_LINKS_DATASOURCE_ID =
  'd8b75300-dfda-4519-b6cd-e49abbd50401';

const LazyJiraIssuesConfigModal = lazy(() =>
  import(
    /* webpackChunkName: "@atlaskit-internal_linkdatasource-jiraissuesmodal" */ './modal'
  ).then(module => ({ default: module.JiraIssuesConfigModal })),
);

//
const JiraIssuesConfigModalWithWrappers = (
  props: JiraIssuesConfigModalProps,
) => {
  return (
    <Suspense
      fallback={<div data-testid={'jira-jql-datasource-table-suspense'} />}
    >
      <LazyJiraIssuesConfigModal {...props} />
    </Suspense>
  );
};

export default JiraIssuesConfigModalWithWrappers;