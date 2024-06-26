import React from 'react';

import {
	type CreateUIAnalyticsEvent,
	withAnalyticsEvents,
	type WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

export type Props = {
	render: (createAnalyticsEvent?: CreateUIAnalyticsEvent) => React.ReactNode;
};

export const WithCreateAnalyticsEvent: React.ComponentType<Props> = withAnalyticsEvents()(
	class WithCreateAnalyticsEvent extends React.Component<Props & WithAnalyticsEventsProps> {
		render() {
			const { render, createAnalyticsEvent } = this.props;
			return render(createAnalyticsEvent);
		}
	},
);
