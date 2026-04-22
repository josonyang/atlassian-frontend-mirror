import React, { useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
// eslint-disable-next-line @atlaskit/platform/prefer-crypto-random-uuid -- Use crypto.randomUUID instead
import uuid from 'uuid';

import { AnalyticsContext } from '@atlaskit/analytics-next';
import type { SmartLinkResponse } from '@atlaskit/linking-types';
import { fg } from '@atlaskit/platform-feature-flags';

import type { CardProps } from './types';
import { context } from './utils/analytics/analytics';
import CardErrorBoundary from './view/CardWithUrl/card-error-boundary';
import { CardWithUrl, CardWithUrlContent } from './view/CardWithUrl/component';
import { LoadingCardLink } from './view/CardWithUrl/component-lazy/LoadingCardLink';

export type CardSSRProps = CardProps & {
	hideIconLoadingSkeleton?: boolean;
	placeholderData?: SmartLinkResponse;
	url: string;
};

// SSR friendly version of smart-card
// simplifies the logic around rendering and loading placeholders and
// only contains whats necessary to render the card on SSR mode
const CardSSROld = (props: CardSSRProps): React.JSX.Element => {
	// eslint-disable-next-line @atlaskit/platform/prefer-crypto-random-uuid -- Use crypto.randomUUID instead
	const [id] = useState(() => props.id ?? uuid());
	const cardProps = {
		...props,
		id,
	};

	const ErrorFallbackComponent = cardProps.fallbackComponent;

	const errorBoundaryFallbackComponent = () => {
		if (ErrorFallbackComponent) {
			return <ErrorFallbackComponent />;
		}

		return <LoadingCardLink {...cardProps} />;
	};

	const Component = cardProps.appearance === 'inline' ? 'span' : 'div';

	return (
		<AnalyticsContext data={context}>
			<ErrorBoundary FallbackComponent={errorBoundaryFallbackComponent}>
				{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766 */}
				<Component className="loader-wrapper">
					<CardWithUrlContent {...cardProps} />
				</Component>
			</ErrorBoundary>
		</AnalyticsContext>
	);
};

// SSR friendly version of smart-card
// simplifies the logic around rendering and loading placeholders and
// only contains whats necessary to render the card on SSR mode
const CardSSRNew = (props: CardSSRProps): React.JSX.Element => {
	// eslint-disable-next-line @atlaskit/platform/prefer-crypto-random-uuid -- Use crypto.randomUUID instead
	const [id] = useState(() => props.id ?? uuid());
	const propsWithId = { ...props, id };

	return (
		<AnalyticsContext data={context}>
			<CardErrorBoundary {...propsWithId}>
				<CardWithUrl {...propsWithId} />
			</CardErrorBoundary>
		</AnalyticsContext>
	);
};

export const CardSSR = (props: CardSSRProps): React.JSX.Element => {
	if (fg('platform_sl_event_ui_seen')) {
		return <CardSSRNew {...props} />;
	}
	return <CardSSROld {...props} />;
};
