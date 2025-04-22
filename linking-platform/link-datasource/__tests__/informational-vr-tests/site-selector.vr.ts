// eslint-disable-next-line import/no-extraneous-dependencies
import type { Locator, Page } from '@playwright/test';

import { snapshotInformational } from '@af/visual-regression';

import SiteSelector from '../../examples/vr/site-selector-vr';

snapshotInformational(SiteSelector, {
	prepare: async (page: Page, component: Locator) => {
		await page.locator('.jira-datasource-modal--site-selector__control').first().click();
	},
	description: 'platform-linking-visual-refresh-sllv is disabled',
	drawsOutsideBounds: true,
	featureFlags: {
		'platform-linking-visual-refresh-sllv': false,
	},
});

snapshotInformational(SiteSelector, {
	prepare: async (page: Page, component: Locator) => {
		await page.getByTestId('jira-datasource-modal--site-selector__control').click();
	},
	description: 'platform-linking-visual-refresh-sllv is enabled',
	drawsOutsideBounds: true,
	featureFlags: {
		'platform-linking-visual-refresh-sllv': true,
	},
});
