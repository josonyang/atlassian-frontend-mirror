/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable compat/compat */
import { expect } from '@af/integration-testing';

import { test } from './fixtures';

test.describe('Editor Metrics - TTVC: heatmap', () => {
	test.use({
		examplePage: 'vc-observer-attribute-mutation',
	});

	test('it should properly map the side nav mutation:attribute time', async ({
		page,
		getMetrics,
		waitForTicks,
	}) => {
		const firstTickAt = await waitForTicks(1);
		const secondTickAt = await waitForTicks(2);

		await waitForTicks(2);

		const metrics = await getMetrics();
		const heatmap = await metrics!.calculateLastHeatmap(10);

		const { head, previousEntries } = heatmap!.map[2][2];

		expect(head?.elementName).toEqual('div[data-testid="content-attr-to-change"]');

		expect(head?.source).toEqual('mutation:attribute:no-layout-shift');
		expect(head?.time).toBeLessThanOrEqual(secondTickAt);

		expect(previousEntries[previousEntries.length - 1].source).toEqual('layout-shift');
		expect(previousEntries[previousEntries.length - 1].time).toBeLessThanOrEqual(firstTickAt);
	});
});
