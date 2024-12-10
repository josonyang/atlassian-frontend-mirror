import React, { Component } from 'react';

import PropTypes from 'prop-types';

import index, { type Matcher } from '../matchEvent';

type AnalyticsData = {
	[key: string]: any;
};

type AnalyticsDecoratorProps = {
	match: Matcher;
	matchPrivate: boolean;
	data?: AnalyticsData;
	getData?: (name: string, data: AnalyticsData) => AnalyticsData;
	children: React.ReactNode;
};

type AnalyticsDecoratorContext = {
	onAnalyticsEvent?: (name: string, data: AnalyticsData, isPrivate: boolean) => void;
	getParentAnalyticsData?: (name: string, isPrivate: boolean) => AnalyticsData;
};

export const ContextTypes = {
	onAnalyticsEvent: PropTypes.func,
	getParentAnalyticsData: PropTypes.func,
};

/**
 * The Decorator component extends analytics event data
 * for any events fired by its descendents,
 * then passes the event up the hierarchy
 */
// eslint-disable-next-line @repo/internal/react/no-class-components
export class AnalyticsDecorator extends Component<AnalyticsDecoratorProps> {
	static defaultProps = {
		match: '*',
		matchPrivate: false,
	};

	static contextTypes = ContextTypes;

	static childContextTypes = ContextTypes;

	getChildContext(): AnalyticsDecoratorContext {
		return {
			onAnalyticsEvent: this.onAnalyticsEvent,
			getParentAnalyticsData: this.getParentAnalyticsData,
		};
	}

	getDecoratedAnalyticsData = (
		name: string,
		srcData: AnalyticsData,
		isPrivate: boolean,
	): AnalyticsData => {
		const { data, getData, match, matchPrivate } = this.props;
		const decoratedData = { ...srcData };
		if (matchPrivate === isPrivate && index(match, name)) {
			if (typeof data === 'object') {
				Object.assign(decoratedData, data);
			}
			if (typeof getData === 'function') {
				Object.assign(decoratedData, getData(name, decoratedData));
			}
		}
		return decoratedData;
	};

	onAnalyticsEvent = (name: string, srcData: AnalyticsData, isPrivate: boolean): void => {
		const { onAnalyticsEvent } = this.context as any;
		if (typeof onAnalyticsEvent !== 'function') {
			return;
		}
		const decoratedData = this.getDecoratedAnalyticsData(name, srcData, isPrivate);
		onAnalyticsEvent(name, decoratedData, isPrivate);
	};

	getParentAnalyticsData = (name: string, isPrivate: boolean): AnalyticsData => {
		const parentData = this.getDecoratedAnalyticsData(name, {}, isPrivate);
		const { getParentAnalyticsData } = this.context as any;
		if (typeof getParentAnalyticsData === 'function') {
			Object.assign(parentData, getParentAnalyticsData(name, isPrivate));
		}
		return parentData;
	};

	render() {
		const { children } = this.props;
		return React.Children.only(children);
	}
}

export default AnalyticsDecorator;
