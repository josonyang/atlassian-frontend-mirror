import { FabricChannel } from '@atlaskit/analytics-listeners/types';

import { AnalyticsQueue } from './analytics-queue';
import type { FireAnalyticsEvent } from './types/events';

export const editorAnalyticsChannel = FabricChannel.editor;

export const fireAnalyticsEvent: FireAnalyticsEvent =
	(createAnalyticsEvent, options) =>
	({ payload, channel = editorAnalyticsChannel }) => {
		if (!createAnalyticsEvent) {
			return;
		}

		if (options?.immediate) {
			createAnalyticsEvent(payload)?.fire(channel);
			return;
		}

		const queue = AnalyticsQueue.get();
		queue.schedule(() => createAnalyticsEvent(payload)?.fire(channel));
	};
