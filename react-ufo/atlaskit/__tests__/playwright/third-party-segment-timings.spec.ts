import { expect, test } from './fixtures';

test.describe('ReactUFO: UFOThirdPartySegment segment3pTimings', () => {
	test.use({
		examplePage: 'third-party-segment-timings',
		featureFlags: ['platform_ufo_3p_segment_timings'],
	});

	test('segment3pTimings from iframe analytics appear as label/data rows in interactionMetrics', async ({
		waitForReactUFOPayload,
		page,
	}) => {
		const mainDiv = page.locator('[data-testid="main"]');
		await expect(mainDiv).toBeVisible();

		const reactUFOPayload = await waitForReactUFOPayload();
		expect(reactUFOPayload).toBeDefined();

		const ufoProperties = reactUFOPayload!.attributes.properties;
		expect(typeof ufoProperties.interactionMetrics).toBe('object');

		const { interactionMetrics } = ufoProperties;

		const segment3pTimings = (interactionMetrics as { segment3pTimings?: Record<string, unknown> })
			.segment3pTimings;
		expect(segment3pTimings).toBeDefined();
		expect(typeof segment3pTimings).toBe('object');

		const segmentIds = Object.keys(segment3pTimings!);
		expect(segmentIds).toHaveLength(1);

		const [segmentId] = segmentIds;
		expect(typeof segmentId).toBe('string');
		expect(segmentId.length).toBeGreaterThan(0);

		const rows = segment3pTimings![segmentId] as Array<{
			label: string;
			data: Record<string, unknown>;
		}>;
		expect(Array.isArray(rows)).toBe(true);
		expect(rows.length).toBeGreaterThanOrEqual(2);

		const lcp = rows.find((r) => r.label === 'lcp-snapshot');
		expect(lcp).toBeDefined();
		expect(lcp!.data.start).toBe(250);
		expect(lcp!.data.size).toBe(1200);
		expect(typeof lcp!.data.elapsed).toBe('number');

		const fcp = rows.find((r) => r.label === 'fcp-snapshot');
		expect(fcp).toBeDefined();
		expect(fcp!.data.start).toBe(120);
		expect(typeof fcp!.data.elapsed).toBe('number');
	});
});
