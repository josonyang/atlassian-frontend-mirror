import { snapshotInformational } from '@af/visual-regression';
import type { Page } from '@playwright/test';

import { BrokenTable, TableWithParagraph } from './table.fixture';

snapshotInformational(BrokenTable, {
	description: 'should render table with correct columns',
	featureFlags: {
		'platform-ssr-table-resize': [true, false],
	},
});

snapshotInformational(TableWithParagraph, {
	description: 'should render table with paragraph and show sort button correctly',
	featureFlags: {
		platform_editor_renderer_table_header_styles: true,
		'platform-ssr-table-resize': [true, false],
	},
	prepare: async (page: Page) => {
		const headerCell = page.locator('th').first();
		const sortButton = page.locator('th .ak-renderer-tableHeader-sorting-icon').first();

		await headerCell.hover();
		await sortButton.waitFor({ state: 'visible' });
	},
});
