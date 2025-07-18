import { expect, type Page, test } from '@af/integration-testing';
test.describe('DatasourceTableView', () => {
	const withFeatureFlags = async (page: Page, featureFlags: string[] = []) => {
		const url = new URL(page.url());
		featureFlags.forEach((flagKey) => url.searchParams.append('featureFlag', flagKey));
		await page.goto(url.toString());
	};

	test('persists column picker when new column added', async ({ page }) => {
		await page.visitExample('linking-platform', 'link-datasource', 'basic-jira-issues-table', {
			'react-18-mode': 'legacy',
		});
		await page.getByTestId('column-picker-trigger-button').click();
		await page.getByText('Due Date0').click();

		await expect(page.locator('#react-select-2-option-10')).toBeVisible();
	});

	test('can search in column picker', async ({ page }) => {
		await page.visitExample('linking-platform', 'link-datasource', 'basic-jira-issues-table', {
			'react-18-mode': 'legacy',
		});
		await page.getByTestId('column-picker-trigger-button').click();
		page.keyboard.type('Due');

		await expect(page.locator('#react-select-2-option-11')).toContainText('Due');
		await expect(page.locator('#react-select-2-option-12')).toContainText('Due');
		await expect(page.locator('#react-select-2-option-13')).toContainText('Due');
	});

	test('persists column order after loading next page', async ({ page }) => {
		await page.visitExample('linking-platform', 'link-datasource', 'issue-like-table', {
			'react-18-mode': 'legacy',
		});

		const header = page.getByTestId('link-datasource--head');

		const headerContentBeforeNextPageCall = header;

		// confirming first page has loaded
		const totalRowsAfterInitialLoad = await page
			.locator('[data-testid="link-datasource--body"] tr')
			.all();
		expect(totalRowsAfterInitialLoad.length).toEqual(21);

		const lastRow = page.locator('[data-testid="link-datasource--body"] tr:last-of-type');
		lastRow.scrollIntoViewIfNeeded();

		// waiting for loading to be complete
		const tableLastRow = await page
			.getByTestId(
				'link-datasource--row-ari:cloud:jira:DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b:issue/211',
			)
			.elementHandle();
		await tableLastRow?.waitForElementState('stable');

		// confirming second page has loaded
		const totalRowsAfterSecondPageLoad = await page
			.locator('[data-testid="link-datasource--body"] tr')
			.all();
		expect(totalRowsAfterSecondPageLoad.length).toEqual(42);

		const headerContentAfterNextPageCall = await header.textContent();

		await expect(headerContentBeforeNextPageCall).toHaveText(headerContentAfterNextPageCall!);
	});

	test('datasource table reload after auth connection action', async ({ page }) => {
		await page.visitExample('linking-platform', 'link-datasource', 'issue-like-table-3p-unauth', {
			'react-18-mode': 'legacy',
		});

		await expect(page.getByTestId('datasource--access-required-with-auth')).toBeVisible();

		// Start waiting for new page before clicking.
		const pageContext = page.context();
		const authPagePromise = pageContext.waitForEvent('page');

		await page.getByRole('button').click();

		const authPage = await authPagePromise;
		await authPage.close();

		await expect(page.getByRole('table')).toBeVisible();
		await expect(page.getByTestId('datasource--access-required-with-auth')).toBeHidden();
	});

	test('toggles edit mode on string column', async ({ page }) => {
		await page.visitExample('linking-platform', 'link-datasource', 'basic-jira-issues-table', {
			'react-18-mode': 'legacy',
		});

		await expect(page.getByTestId('inline-edit-text')).toBeHidden();
		await page.getByText('FIRST! This level contains five Dragon coins').click();
		await expect(page.getByTestId('inline-edit-text')).toBeVisible();
	});

	// eslint-disable-next-line playwright/no-skipped-test
	test.skip('shows flag after edit fail', async ({ page }) => {
		await page.visitExample('linking-platform', 'link-datasource', 'basic-jira-issues-table', {
			'react-18-mode': 'legacy',
		});

		await page.getByText('FIRST! This level contains five Dragon coins').click();
		await page.getByTestId('inline-edit-text').fill('new value');
		await page.getByTestId('inline-edit-text').evaluate((e) => e.blur());

		await expect(page.getByRole('alert')).toBeVisible();
	});

	test('Load actions and permissions when scrolling new pages into view', async ({ page }) => {
		await page.visitExample('linking-platform', 'link-datasource', 'basic-jira-issues-table', {
			'react-18-mode': 'legacy',
		});

		await page.getByText('FIRST! This level contains five Dragon coins').click();
		await expect(page.getByTestId('inline-edit-text')).toBeVisible();
		await page.getByTestId('inline-edit-text').fill('new value');
		await page.getByTestId('inline-edit-text').blur();
		// scroll to next page
		await page.keyboard.press('Space');
		await page.keyboard.press('Space');
		// First item will DONUT-11720 this finds the second item loaded in the next page
		await page.getByText('DONUT-11721').scrollIntoViewIfNeeded();

		await page.getByText('FIRST! This level contains five Dragon coins').click();
		await expect(page.getByTestId('inline-edit-text')).toBeVisible();
		await page.getByTestId('inline-edit-text').fill('new value 2');
		await page.getByTestId('inline-edit-text').blur();

		await expect(page.getByTestId('inline-edit-text')).toBeHidden();
	});

	test('can update statuses column', async ({ page }) => {
		await page.visitExample('linking-platform', 'link-datasource', 'basic-jira-issues-table', {
			'react-18-mode': 'legacy',
		});

		await page.getByTestId('link-datasource-render-type--status').first().click();
		await page.getByTestId('inline-edit-status-option-In Progress').first().click();

		await expect(page.getByTestId('inline-edit-status')).toBeHidden();
		await expect(page.getByTestId('link-datasource-render-type--status--text').first()).toHaveText(
			'in progress',
			{ ignoreCase: true },
		);
	});
	test('can update priority column', async ({ page }) => {
		page.setViewportSize({ width: 1920, height: 1080 });
		await page.visitExample('linking-platform', 'link-datasource', 'basic-jira-issues-table', {
			'react-18-mode': 'legacy',
		});

		// Check priority value before
		// We're unable to use link-datasource-render-type--icon--text as other columns also are the same type
		await expect(page.getByTestId('datasource-table-view--cell-10').first()).toHaveText('Major', {
			ignoreCase: true,
		});

		await page.getByTestId('datasource-table-view--cell-10').first().click();
		await page.getByTestId('inline-edit-priority-option-Trivial').first().click();

		await expect(page.getByTestId('inline-edit-icon')).toBeHidden();

		// Check priority value after
		await expect(page.getByTestId('datasource-table-view--cell-10').first()).toHaveText('Trivial', {
			ignoreCase: true,
		});
	});

	test('can filter options with type-ahead in statuses column', async ({ page }) => {
		await page.visitExample('linking-platform', 'link-datasource', 'basic-jira-issues-table', {
			'react-18-mode': 'legacy',
		});

		await page.getByTestId('link-datasource-render-type--status').first().click();
		await page.getByRole('combobox').fill('in p');

		await expect(page.getByRole('listbox').getByRole('option')).toHaveCount(1);
		await expect(page.getByRole('listbox').getByRole('option')).toHaveText('in progress', {
			ignoreCase: true,
		});
	});

	test('can filter options with type-ahead in assignee column', async ({ page }) => {
		await page.visitExample('linking-platform', 'link-datasource', 'basic-jira-issues-table', {
			'react-18-mode': 'legacy',
		});
		await withFeatureFlags(page, ['platform-datasources-enable-two-way-sync-assignee']);

		await page
			.getByTestId(
				'datasource-table-view--row-ari:cloud:jira:DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b:issue/10',
			)
			.getByTestId('link-datasource-render-type--user--avatar')
			.click();
		await page.getByRole('combobox').fill('mike');

		await expect(page.getByRole('listbox').getByRole('option')).toHaveCount(1);
		await expect(page.getByRole('listbox').getByRole('option')).toHaveText('Mike Dao', {
			ignoreCase: true,
		});
	});
});
