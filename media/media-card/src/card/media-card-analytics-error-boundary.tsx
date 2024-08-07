import React, { type ErrorInfo, type PropsWithChildren } from 'react';
import { type MediaFeatureFlags, withMediaAnalyticsContext } from '@atlaskit/media-common';
import { type CardDimensions, type CardOnClickCallback } from '../types';
import { UnhandledErrorCard } from './ui/unhandledErrorCard';
import { withAnalyticsEvents, type WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import { type AnalyticsErrorBoundaryCardPayload, fireMediaCardEvent } from '../utils/analytics';

export type MediaCardAnalyticsErrorBoundaryProps = PropsWithChildren<
	{
		dimensions?: CardDimensions;
		data?: { [k: string]: any };
		onClick?: CardOnClickCallback; // it is required for inner component to trigger event from editor
		featureFlags?: MediaFeatureFlags;
	} & WithAnalyticsEventsProps
>;

type MediaCardAnalyticsErrorBoundaryState = {
	hasError: boolean;
};

class WrappedMediaCardAnalyticsErrorBoundary extends React.Component<
	MediaCardAnalyticsErrorBoundaryProps,
	MediaCardAnalyticsErrorBoundaryState
> {
	constructor(props: MediaCardAnalyticsErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static displayName = 'MediaCardAnalyticsErrorBoundary';
	private fireOperationalEvent = (error: Error | string, info?: ErrorInfo) => {
		const { data = {}, createAnalyticsEvent } = this.props;
		const payload: AnalyticsErrorBoundaryCardPayload = {
			eventType: 'operational',
			action: 'failed',
			actionSubject: 'mediaCardRender',
			attributes: {
				browserInfo: window?.navigator?.userAgent ? window.navigator.userAgent : 'unknown',
				error,
				info,
				failReason: 'unexpected-error',
				...data,
			},
		};
		fireMediaCardEvent(payload, createAnalyticsEvent);
	};

	componentDidCatch(error: Error, info?: ErrorInfo): void {
		try {
			this.fireOperationalEvent(error, info);
		} catch (e) {}
		this.setState({ hasError: true });
	}
	handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
		try {
			this.props.onClick?.({ event });
		} catch (e) {}
	};

	render() {
		const { hasError } = this.state;
		const { dimensions, children } = this.props;

		if (hasError) {
			return <UnhandledErrorCard dimensions={dimensions} onClick={this.handleOnClick} />;
		}

		return children;
	}
}

const packageName = process.env._PACKAGE_NAME_ as string;
const packageVersion = process.env._PACKAGE_VERSION_ as string;

// @ts-ignore: [PIT-1685] Fails in post-office due to backwards incompatibility issue with React 18
const MediaCardAnalyticsErrorBoundary: React.ComponentType<
	MediaCardAnalyticsErrorBoundaryProps & WithAnalyticsEventsProps
> = withMediaAnalyticsContext({
	packageVersion,
	packageName,
	componentName: 'mediaCard',
	component: 'mediaCard',
})(withAnalyticsEvents()(WrappedMediaCardAnalyticsErrorBoundary));

export default MediaCardAnalyticsErrorBoundary;
