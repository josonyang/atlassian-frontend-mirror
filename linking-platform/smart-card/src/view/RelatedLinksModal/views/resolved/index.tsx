import React from 'react';

import { AnalyticsContext } from '@atlaskit/analytics-next';
import { fg } from '@atlaskit/platform-feature-flags';
import { Stack } from '@atlaskit/primitives/compiled';

import { messages } from '../../../../messages';
import RelatedLinksList from '../../components/related-links-list';

import { type RelatedLinksProps } from './types';

const RelatedLinksResolvedView = ({
	incomingLinks = [],
	outgoingLinks = [],
}: RelatedLinksProps) => {
	const [selected, setSelected] = React.useState('');

	const handleSelectedUpdate = (selectedKey: string) => {
		setSelected(selectedKey);
	};

	return (
		<Stack space="space.150">
			<AnalyticsContext data={{ component: 'relatedLinksIncoming' }}>
				<RelatedLinksList
					urls={incomingLinks}
					title={
						fg('platform-linking-visual-refresh-v2')
							? messages.related_links_found_in_v2
							: messages.related_links_found_in
					}
					testId="incoming-related-links-list"
					selected={selected}
					handleSelectedUpdate={handleSelectedUpdate}
				/>
			</AnalyticsContext>
			<AnalyticsContext data={{ component: 'relatedLinksOutgoing' }}>
				<RelatedLinksList
					urls={outgoingLinks}
					title={
						fg('platform-linking-visual-refresh-v2')
							? messages.related_links_includes_links_to_v2
							: messages.related_links_includes_links_to
					}
					testId="outgoing-related-links-list"
					selected={selected}
					handleSelectedUpdate={handleSelectedUpdate}
				/>
			</AnalyticsContext>
		</Stack>
	);
};

export default RelatedLinksResolvedView;
