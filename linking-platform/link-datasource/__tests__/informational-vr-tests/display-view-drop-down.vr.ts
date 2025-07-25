// eslint-disable-next-line import/no-extraneous-dependencies
import type { Locator, Page } from '@playwright/test';

import { snapshotInformational } from '@af/visual-regression';

import WithConfluenceSearchModal from '../../examples/with-confluence-search-modal';
import { JiraModalNoSuspense as WithJiraIssuesModal } from '../../examples/with-issues-modal';

async function openDropDown(page: Page) {
	await page.getByTestId('datasource-modal--view-drop-down--trigger').click();
}

snapshotInformational(WithJiraIssuesModal, {
	description: 'jira issues modal with drop down closed',
	drawsOutsideBounds: true,
	featureFlags: {
		'replace-legacy-button-in-sllv': true,
	},
});
snapshotInformational(WithJiraIssuesModal, {
	prepare: async (page: Page, _component: Locator) => {
		await openDropDown(page);
	},
	description: 'jira issues modal with an open drop down',
	drawsOutsideBounds: true,
	featureFlags: {
		'replace-legacy-button-in-sllv': true,
	},
});

snapshotInformational(WithJiraIssuesModal, {
	prepare: async (page: Page, _component: Locator) => {
		await openDropDown(page);
		await page.getByTestId('dropdown-item-inline-link').click();
	},
	description: 'jira issues modal after selecting Inline link from the drop down',
	drawsOutsideBounds: true,
	featureFlags: {
		'replace-legacy-button-in-sllv': true,
	},
});
snapshotInformational(WithJiraIssuesModal, {
	prepare: async (page: Page, _component: Locator) => {
		await openDropDown(page);
		await page.getByTestId('dropdown-item-inline-link').click();
		await openDropDown(page);
	},
	description: 'jira issues modal after selecting Inline link with open drop down',
	drawsOutsideBounds: true,
	featureFlags: {
		'replace-legacy-button-in-sllv': true,
	},
});
snapshotInformational(WithConfluenceSearchModal, {
	description: 'confluence search modal with drop down closed',
	drawsOutsideBounds: true,
	featureFlags: {
		'replace-legacy-button-in-sllv': true,
	},
});
snapshotInformational(WithConfluenceSearchModal, {
	prepare: async (page: Page, _component: Locator) => {
		await openDropDown(page);
	},
	description: 'confluence search modal with an open drop down',
	drawsOutsideBounds: true,
	featureFlags: {
		'replace-legacy-button-in-sllv': true,
	},
});
snapshotInformational(WithConfluenceSearchModal, {
	prepare: async (page: Page, _component: Locator) => {
		await openDropDown(page);
		await page.getByTestId('dropdown-item-inline-link').click();
	},
	description: 'confluence search modal after selecting Inline link from the drop down',
	drawsOutsideBounds: true,
	featureFlags: {
		'replace-legacy-button-in-sllv': true,
	},
});
snapshotInformational(WithConfluenceSearchModal, {
	prepare: async (page: Page, _component: Locator) => {
		await openDropDown(page);
		await page.getByTestId('dropdown-item-inline-link').click();
		await openDropDown(page);
	},
	description: 'confluence search modal after selecting Inline link with open drop down',
	drawsOutsideBounds: true,
	featureFlags: {
		'replace-legacy-button-in-sllv': true,
	},
});
