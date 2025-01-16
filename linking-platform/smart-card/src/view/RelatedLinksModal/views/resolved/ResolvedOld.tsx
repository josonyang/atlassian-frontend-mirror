/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';

import { AnalyticsContext } from '@atlaskit/analytics-next';
import { Stack } from '@atlaskit/primitives';

import { messages } from '../../../../messages';
import RelatedLinksList from '../../components/related-links-list';

import { type RelatedLinksProps } from './types';

const RelatedLinksResolvedView = ({
	incomingLinks = [],
	outgoingLinks = [],
}: RelatedLinksProps) => {
	return (
		<Stack space="space.150">
			<AnalyticsContext data={{ component: 'relatedLinksIncoming' }}>
				<RelatedLinksList
					urls={incomingLinks}
					title={messages.related_links_found_in}
					testId="incoming-related-links-list"
				/>
			</AnalyticsContext>
			<AnalyticsContext data={{ component: 'relatedLinksOutgoing' }}>
				<RelatedLinksList
					urls={outgoingLinks}
					title={messages.related_links_includes_links_to}
					testId="outgoing-related-links-list"
				/>
			</AnalyticsContext>
		</Stack>
	);
};

export default RelatedLinksResolvedView;
