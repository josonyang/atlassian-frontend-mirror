import { interactions } from '../common/constants';
import { addCustomTiming, addNewInteraction } from '../index';

describe('addCustomTiming timing name length validation', () => {
	beforeEach(() => {
		interactions.clear();
	});

	afterEach(() => {
		interactions.clear();
	});

	it('truncates long custom timing names', () => {
		const interactionId = 'test-interaction-id';
		addNewInteraction(interactionId, 'test-ufo-name', 'page_load', performance.now(), 1.0, []);
		const longKey = 'a'.repeat(300);

		addCustomTiming(interactionId, [], {
			[longKey]: { startTime: 10, endTime: 20 },
		});

		const interaction = interactions.get(interactionId);
		const [timingKey] = Object.keys(interaction!.customTimings[0].data);
		expect(timingKey).toHaveLength(255);
		expect(timingKey).toBe(longKey.slice(0, 255));
	});
});
