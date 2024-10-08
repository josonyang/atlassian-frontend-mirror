import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('icon file type snapshots', () => {
	it('should match light mode icons', async () => {
		const { __BASEURL__, page } = global as any;
		const url = getExampleUrl('media', 'icon-file-type', 'icon-examples', __BASEURL__);

		await loadPage(page, url);

		const element = await page.$('[data-testid="light-root"]');

		expect(await element?.screenshot()).toMatchProdImageSnapshot();
	});
});
