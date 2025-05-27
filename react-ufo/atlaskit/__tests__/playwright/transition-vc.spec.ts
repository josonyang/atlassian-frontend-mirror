import { expect, test } from './fixtures';

test.describe('ReactUFO: transition VC', () => {
	const featureFlagsCombos = [[], ['platform_ufo_v3_add_start_entry']];

	for (const featureFlags of featureFlagsCombos) {
		test.describe(`with feature flags ${featureFlags.join(', ')}`, () => {
			test.use({
				examplePage: 'app-with-top-left-nav',
				featureFlags: featureFlags,
			});

			test('interactionMetrics transition VC', async ({
				page,
				waitForReactUFOPayload,
				getSectionVisibleAt,
				getSectionDOMAddedAt,
			}) => {
				const ufoPageLoadPayload = await waitForReactUFOPayload();
				expect(ufoPageLoadPayload).toBeDefined();

				// Click on the projects menu item to trigger a transition
				await page.click('[data-testid="left-nav-item-projects"]');

				// Wait for the transition payload
				const transitionPayload = await waitForReactUFOPayload();
				expect(transitionPayload).toBeDefined();

				const ufoProperties = transitionPayload!.attributes.properties;
				expect(ufoProperties['experience:name']).toBe('projects');

				const { interactionMetrics } = ufoProperties;
				expect(interactionMetrics.type).toBe('transition');

				const ufoVCRev = ufoProperties['ufo:vc:rev'];
				const ttvcV2Revision = ufoVCRev?.find(({ revision }) => revision === 'fy25.02');

				expect(ttvcV2Revision).toBeTruthy();
				expect(ttvcV2Revision!.vcDetails?.['90'].e).toContainEqual(
					'div[testid=main-content-projects]',
				);

				const projectsDOMAddedAt =
					(await getSectionDOMAddedAt('main-content-projects'))! - interactionMetrics.start;

				expect(ttvcV2Revision!.vcDetails?.['90'].t).toMatchTimestamp(projectsDOMAddedAt);

				const ttvcV3Revision = ufoVCRev?.find(({ revision }) => revision === 'fy25.03');
				expect(ttvcV3Revision).toBeTruthy();
				expect(ttvcV3Revision!.vcDetails?.['90'].e).toContainEqual(
					'div[data-testid="main-content-projects"]',
				);
				const projectsVisibleAt =
					(await getSectionVisibleAt('main-content-projects'))! - interactionMetrics.start;
				expect(ttvcV3Revision!.vcDetails?.['90'].t).toMatchTimestamp(projectsVisibleAt);
			});
		});
	}
});
