// eslint-disable-next-line import/no-extraneous-dependencies
import type { Locator, Page } from '@playwright/test';

import { snapshotInformational } from '@af/visual-regression';

import JiraIssuesTable from '../../examples/vr/jira-issues-table-vr';

snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page
      .getByTestId('datasource-table-view--row-DONUT-11720')
      .getByTestId('datasource-table-view--cell-6')
      .first()
      .hover();
  },
  drawsOutsideBounds: true,
  description: 'Hovering over "label, another, third" Labels',
});
snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page
      .getByTestId('datasource-table-view--row-DONUT-11740')
      .getByTestId('datasource-table-view--cell-0')
      .getByRole('img')
      .hover();
  },
  drawsOutsideBounds: true,
  description: 'Hovering over "bug" Icon',
});
snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page
      .getByTestId('datasource-table-view--row-DONUT-11740')
      .getByTestId('datasource-table-view--cell-3')
      .hover();
  },
  drawsOutsideBounds: true,
  description: 'Hovering over "Unassigned" Assignee',
});
snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page
      .getByTestId('datasource-table-view--row-DONUT-11770')
      .getByTestId('datasource-table-view--cell-4')
      .hover();
  },
  drawsOutsideBounds: true,
  description: 'Hovering over People',
});
snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page
      .getByTestId('datasource-table-view--row-DONUT-11720')
      .getByTestId('datasource-table-view--cell-7')
      .getByTestId('link-datasource-render-type--status')
      .hover();
  },
  drawsOutsideBounds: true,
  description: 'Hovering over "TO DO" Status',
});
snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page
      .getByTestId('datasource-table-view--row-DONUT-11740')
      .getByTestId('datasource-table-view--cell-8')
      .hover();
  },
  drawsOutsideBounds: true,
  description: 'Hovering over Date',
});
snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page
      .getByTestId('datasource-table-view--row-DONUT-11730')
      .getByTestId('datasource-table-view--cell-9')
      .hover();
  },
  drawsOutsideBounds: true,
  description: 'Hovering over Description',
});

snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page.getByTestId(`labels-column-heading`).hover();
  },
  drawsOutsideBounds: true,
  description: `Hovering over labels header`,
});

snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page.getByTestId(`priority-column-heading`).hover();
  },
  drawsOutsideBounds: true,
  description: `Hovering over priority header`,
});

snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page.getByTestId(`status-column-heading`).hover();
  },
  drawsOutsideBounds: true,
  description: `Hovering over status header`,
});

snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page.getByTestId(`description-column-heading`).hover();
  },
  drawsOutsideBounds: true,
  description: `Double lined date of creation header text is truncated with ellipses`,
});

snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    await page.getByTestId(`summary-column-dropdown`).click();
  },
  drawsOutsideBounds: true,
  description: `Click summary column dropdown to see its items`,
});

snapshotInformational(JiraIssuesTable, {
  prepare: async (page: Page, _component: Locator) => {
    page.setViewportSize({ height: 800, width: 1500 });
    for (const key of ['summary', 'description', 'labels']) {
      await page.getByTestId(`${key}-column-dropdown`).click();
      await page
        .getByTestId(`${key}-column-dropdown-item-toggle-wrapping`)
        .click();
    }

    await page.getByTestId(`summary-column-dropdown`).click();
  },
  drawsOutsideBounds: true,
  description: `Toggle wrapping on several columns`,
});
