/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable compat/compat */
import { VCObserver } from '../../src/vc/vc-observer';

import { expect, test, viewports } from './fixtures';

test.describe('ReactUFO: fy25.02 - non visual style mutation', () => {
	for (const viewport of viewports) {
		test.describe(`when view port is ${viewport.width}x${viewport.height}`, () => {
			test.use({
				examplePage: 'non-visual-style-mutation',
				viewport,
			});

			test(`VC90 should match when the [content-div] is first visible`, async ({
				page,
				waitForReactUFOPayload,
				getSectionDOMAddedAt,
				getSectionVisibleAt,
			}) => {
				const mainDiv = page.locator('[data-testid="main"]');
				const contentDiv = page.locator('[data-testid="content-div"]');

				await expect(mainDiv).toBeVisible();
				await expect(contentDiv).toBeVisible();

				const mainDivAddedAt = await getSectionDOMAddedAt('main');
				const mainDivVisibleAt = await getSectionVisibleAt('main');

				const reactUFOPayload = await waitForReactUFOPayload();
				expect(reactUFOPayload).toBeDefined();

				const ufoRevisions = reactUFOPayload!.attributes.properties['ufo:vc:rev'];
				expect(ufoRevisions).toBeDefined();

				const fy25_02_rev = ufoRevisions?.find((r) => r.revision === 'fy25.02');
				expect(fy25_02_rev).toBeDefined();
				expect(fy25_02_rev!.clean).toEqual(true);

				for (const checkpoint of VCObserver.VCParts) {
					await test.step(`checking fy25_02_rev vc ${checkpoint} details`, () => {
						expect(fy25_02_rev!.vcDetails![checkpoint].t).toMatchTimestamp(mainDivAddedAt);
						expect(fy25_02_rev!.vcDetails![checkpoint].e).not.toContain(['div[testid=nvs-div]']);
					});
				}

				const vc90Result = fy25_02_rev!['metric:vc90'];
				expect(vc90Result).toBeDefined();

				expect(vc90Result).toMatchTimestamp(mainDivAddedAt);

				// check future bigger revisions
				const applicableRevisions = ufoRevisions?.filter((rev) => rev['revision'] >= 'fy25.03');

				for (const rev of applicableRevisions!) {
					const vc90Result = rev['metric:vc90'];
					const revisionName = rev['revision'];
					expect(vc90Result).toBeDefined();
					expect(rev!.clean).toEqual(true);

					await test.step(`checking revision ${revisionName}`, async () => {
						expect(vc90Result).toMatchTimestamp(mainDivVisibleAt);

						for (const checkpoint of VCObserver.VCParts) {
							await test.step(`checking revision ${revisionName} vc ${checkpoint} details`, () => {
								expect(rev!.vcDetails![checkpoint].t).toMatchTimestamp(mainDivVisibleAt);
								expect(rev!.vcDetails![checkpoint].e).not.toContain(['div[testid=nvs-div]']);
							});
						}
					});
				}
			});

			test('should capture and report a11y violations', async ({ page }) => {
				const mainDiv = page.locator('[data-testid="main"]');
				await expect(mainDiv).toBeVisible();

				await expect(page).toBeAccessible();
			});
		});
	}
});
