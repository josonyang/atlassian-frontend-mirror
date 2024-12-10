import React, { Component } from 'react';

import PropTypes from 'prop-types';

type AnalyticsDelegateProps = {
	delegateAnalyticsEvent?: (name: string, data: any, isPrivate: boolean) => void;
	children: React.ReactNode;
};

type AnalyticsDelegateContext = {
	onAnalyticsEvent?: (name: string, data: any, isPrivate: boolean) => void;
};

const ContextTypes = {
	onAnalyticsEvent: PropTypes.func,
};

/**
 * Listens to public and private events and delegates to an analytics
 * stack in a different React root.
 */
// eslint-disable-next-line @repo/internal/react/no-class-components
class AnalyticsDelegate extends Component<AnalyticsDelegateProps> {
	static contextTypes = ContextTypes;

	static childContextTypes = ContextTypes;

	getChildContext(): AnalyticsDelegateContext {
		return {
			onAnalyticsEvent: this.onAnalyticsEvent,
		};
	}

	onAnalyticsEvent = (name: string, data: any, isPrivate: boolean): void => {
		const { delegateAnalyticsEvent } = this.props;

		const eventData = { ...data };
		if (delegateAnalyticsEvent) {
			delegateAnalyticsEvent(name, eventData, isPrivate);
		}

		const { onAnalyticsEvent } = this.context as any;
		if (typeof onAnalyticsEvent === 'function') {
			onAnalyticsEvent(name, data, isPrivate);
		}
	};

	render() {
		const { children } = this.props;
		return React.Children.only(children);
	}
}

export default AnalyticsDelegate;
