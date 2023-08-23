import { JastBuilder } from '../api';

import {
  computeJqlInsights,
  JqlInsightsAttributes,
} from './jql-insights-listener';

type TestCase = {
  name: string;
  jql: string;
  expected: JqlInsightsAttributes;
};

const testCases: TestCase[] = [
  {
    name: 'Empty JQL',
    jql: '',
    expected: {
      jqlFieldValueCount: {
        issueType: 0,
        project: 0,
        assignee: 0,
        reporter: 0,
        priority: 0,
        status: 0,
        resolution: 0,
        team: 0,
      },
      jqlFieldIsUsed: {
        summary: false,
        due: false,
        resolutionDate: false,
        created: false,
        lastviewed: false,
        updated: false,
        team: false,
      },
      jqlUsedFields: [],
      jqlUsedFieldsCount: 0,
      jqlUsedFieldsOrderBy: [],
      jqlLineCount: 1,
      jqlErrorCount: 0,
      jqlClauseCount: {
        orderBy: 0,
        leaf: 0,
        and: 0,
        not: 0,
        or: 0,
      },
      jqlMaxCompoundClauseDepth: 0,
    },
  },
  {
    name: 'Simple JQL',
    jql: 'status = open ORDER BY created DESC',
    expected: {
      jqlFieldValueCount: {
        issueType: 0,
        project: 0,
        assignee: 0,
        reporter: 0,
        priority: 0,
        status: 1,
        resolution: 0,
        team: 0,
      },
      jqlFieldIsUsed: {
        summary: false,
        due: false,
        resolutionDate: false,
        created: false,
        lastviewed: false,
        updated: false,
        team: false,
      },
      jqlUsedFields: ['status'],
      jqlUsedFieldsCount: 1,
      jqlUsedFieldsOrderBy: ['created'],
      jqlLineCount: 1,
      jqlErrorCount: 0,
      jqlClauseCount: {
        orderBy: 1,
        leaf: 1,
        and: 0,
        not: 0,
        or: 0,
      },
      jqlMaxCompoundClauseDepth: 0,
    },
  },
  {
    name: 'JQL without ORDER BY clause',
    jql: 'status = open',
    expected: {
      jqlFieldValueCount: {
        issueType: 0,
        project: 0,
        assignee: 0,
        reporter: 0,
        priority: 0,
        status: 1,
        resolution: 0,
        team: 0,
      },
      jqlFieldIsUsed: {
        summary: false,
        due: false,
        resolutionDate: false,
        created: false,
        lastviewed: false,
        updated: false,
        team: false,
      },
      jqlUsedFields: ['status'],
      jqlUsedFieldsCount: 1,
      jqlUsedFieldsOrderBy: [],
      jqlLineCount: 1,
      jqlErrorCount: 0,
      jqlClauseCount: {
        orderBy: 0,
        leaf: 1,
        and: 0,
        not: 0,
        or: 0,
      },
      jqlMaxCompoundClauseDepth: 0,
    },
  },
  {
    name: 'JQL without WHERE clause',
    jql: 'ORDER BY created DESC, status ASC, key',
    expected: {
      jqlFieldValueCount: {
        issueType: 0,
        project: 0,
        assignee: 0,
        reporter: 0,
        priority: 0,
        status: 0,
        resolution: 0,
        team: 0,
      },
      jqlFieldIsUsed: {
        summary: false,
        due: false,
        resolutionDate: false,
        created: false,
        lastviewed: false,
        updated: false,
        team: false,
      },
      jqlUsedFields: [],
      jqlUsedFieldsCount: 0,
      jqlUsedFieldsOrderBy: ['created', 'status', 'key'],
      jqlLineCount: 1,
      jqlErrorCount: 0,
      jqlClauseCount: {
        orderBy: 3,
        leaf: 0,
        and: 0,
        not: 0,
        or: 0,
      },
      jqlMaxCompoundClauseDepth: 0,
    },
  },
  {
    name: 'JQL with errors',
    jql: 'status IN ()',
    expected: {
      jqlFieldValueCount: {
        issueType: 0,
        project: 0,
        assignee: 0,
        reporter: 0,
        priority: 0,
        status: 0,
        resolution: 0,
        team: 0,
      },
      jqlFieldIsUsed: {
        summary: false,
        due: false,
        resolutionDate: false,
        created: false,
        lastviewed: false,
        updated: false,
        team: false,
      },
      jqlUsedFields: ['status'],
      jqlUsedFieldsCount: 1,
      jqlUsedFieldsOrderBy: [],
      jqlLineCount: 1,
      jqlErrorCount: 1,
      jqlClauseCount: {
        orderBy: 0,
        leaf: 1,
        and: 0,
        not: 0,
        or: 0,
      },
      jqlMaxCompoundClauseDepth: 0,
    },
  },
  {
    name: 'JQL with compound clauses',
    jql: 'NOT (project = T1 AND (issuetype = bug OR project = T2))',
    expected: {
      jqlFieldValueCount: {
        issueType: 1,
        project: 2,
        assignee: 0,
        reporter: 0,
        priority: 0,
        status: 0,
        resolution: 0,
        team: 0,
      },
      jqlFieldIsUsed: {
        summary: false,
        due: false,
        resolutionDate: false,
        created: false,
        lastviewed: false,
        updated: false,
        team: false,
      },
      jqlUsedFields: ['issuetype', 'project'],
      jqlUsedFieldsCount: 2,
      jqlUsedFieldsOrderBy: [],
      jqlLineCount: 1,
      jqlErrorCount: 0,
      jqlClauseCount: {
        orderBy: 0,
        leaf: 3,
        and: 1,
        not: 1,
        or: 1,
      },
      jqlMaxCompoundClauseDepth: 2,
    },
  },
  {
    name: 'JQL with nested compound clauses',
    jql: '(project = T1 OR project = T2) AND (issuetype = bug OR NOT ! (issuetype = task OR status = open))',
    expected: {
      jqlFieldValueCount: {
        issueType: 2,
        project: 2,
        assignee: 0,
        reporter: 0,
        priority: 0,
        status: 1,
        resolution: 0,
        team: 0,
      },
      jqlFieldIsUsed: {
        summary: false,
        due: false,
        resolutionDate: false,
        created: false,
        lastviewed: false,
        updated: false,
        team: false,
      },
      jqlUsedFields: ['issuetype', 'project', 'status'],
      jqlUsedFieldsCount: 3,
      jqlUsedFieldsOrderBy: [],
      jqlLineCount: 1,
      jqlErrorCount: 0,
      jqlClauseCount: {
        orderBy: 0,
        leaf: 5,
        and: 1,
        not: 2,
        or: 3,
      },
      jqlMaxCompoundClauseDepth: 3,
    },
  },
  {
    name: 'JQL with all fields',
    jql: `issuetype = "bug" AND project = "T1" AND assignee IN (currentUser(), EMPTY) AND reporter = currentUser() AND
    priority = 3 AND status = "Closed" AND resolution = "Done" AND cf[10012] IN (a, b, c) AND
    "Collapsed field[Dropdown]" = 1 AND summary ~ "Urgent" AND duedate > -2w AND resolutiondate < endOfWeek() and
    created <= -2w and lastviewed = now() and updated > startOfMonth() AND "Team[Team]" = 12345678`,
    expected: {
      jqlFieldValueCount: {
        issueType: 1,
        project: 1,
        assignee: 2,
        reporter: 1,
        priority: 1,
        status: 1,
        resolution: 1,
        team: 1,
      },
      jqlFieldIsUsed: {
        summary: true,
        due: true,
        resolutionDate: true,
        created: true,
        lastviewed: true,
        updated: true,
        team: true,
      },
      jqlUsedFields: [
        'assignee',
        'created',
        'duedate',
        'issuetype',
        'lastviewed',
        'other',
        'priority',
        'project',
        'reporter',
        'resolution',
        'resolutiondate',
        'status',
        'summary',
        'updated',
      ],
      jqlUsedFieldsCount: 16,
      jqlUsedFieldsOrderBy: [],
      jqlLineCount: 4,
      jqlErrorCount: 0,
      jqlClauseCount: {
        orderBy: 0,
        leaf: 16,
        and: 1,
        not: 0,
        or: 0,
      },
      jqlMaxCompoundClauseDepth: 1,
    },
  },
];

describe('computeJqlInsights', () => {
  testCases.forEach(testCase => {
    it(testCase.name, () => {
      const jast = new JastBuilder().build(testCase.jql);
      expect(computeJqlInsights(jast)).toEqual(testCase.expected);
    });
  });
});
