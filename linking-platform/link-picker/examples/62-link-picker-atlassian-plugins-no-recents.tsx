import React, { SyntheticEvent, useState } from 'react';

import { useSmartLinkLifecycleAnalytics } from '@atlaskit/link-analytics';
import { CardClient, SmartCardProvider } from '@atlaskit/link-provider';
import { token } from '@atlaskit/tokens';
import { useAtlassianPlugins } from '@atlassian/link-picker-atlassian-plugin';
import { mockEndpoints } from '@atlassian/recent-work-client/mocks';

import { PageHeader, PageWrapper } from '../example-helpers/common';
import { mockAvailableSites } from '../example-helpers/mock-available-sites';
import { MOCK_NO_RESULTS as mockRecentData } from '../example-helpers/mock-recents-data';
import { LinkPicker, type LinkPickerProps } from '../src';

type OnSubmitPayload = Parameters<LinkPickerProps['onSubmit']>[0];

const smartCardClient = new CardClient('staging');

mockAvailableSites();
mockEndpoints(undefined, undefined, mockRecentData);

function LinkPickerAtlassianPlugins() {
	const [link, setLink] = useState<OnSubmitPayload>({
		url: '',
		displayText: null,
		title: null,
		meta: {
			inputMethod: 'manual',
		},
	});
	const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(true);
	const linkAnalytics = useSmartLinkLifecycleAnalytics();

	const handleSubmit: LinkPickerProps['onSubmit'] = (payload, analytic) => {
		setLink(payload);
		linkAnalytics.linkCreated(payload, analytic);
		setIsLinkPickerVisible(false);
	};

	const handleClick = (e: SyntheticEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsLinkPickerVisible(true);
	};

	const handleCancel = () => setIsLinkPickerVisible(false);

	const plugins = useAtlassianPlugins([
		{
			tabConfig: {
				tabKey: 'confluence',
				tabTitle: 'Confluence',
			},
			aggregatorUrl: 'https://atl-jb-atjong-3.jira-dev.com/gateway/api/xpsearch-aggregator',
			cloudId: '242c8d59-775f-43df-8833-004468c2398e',
			activityClientEndpoint: 'https://atl-jb-atjong-3.jira-dev.com/gateway/api/graphql',
			products: ['confluence'],
		},
		{
			tabConfig: {
				tabKey: 'jira',
				tabTitle: 'Jira',
			},
			cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
			products: ['jira'],
			aggregatorUrl: 'https://pug.jira-dev.com/gateway/api/xpsearch-aggregator',
			activityClientEndpoint: 'https://pug.jira-dev.com/gateway/api/graphql',
		},
	]);

	const linkPicker = isLinkPickerVisible && (
		<LinkPicker
			plugins={plugins}
			url={link.url}
			displayText={link.displayText}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
		/>
	);

	return (
		<PageWrapper>
			<PageHeader>
				<p>
					Integration with <b>link-picker-plugins</b>.
				</p>
			</PageHeader>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
			<div style={{ paddingBottom: token('space.250', '20px') }}>
				<a id="test-link" href={link.url} target="_blank" onClick={handleClick}>
					{link.displayText || link.url}
				</a>
			</div>
			{linkPicker}
		</PageWrapper>
	);
}

export default function LinkPickerAtlassianPluginsWrapper() {
	return (
		<SmartCardProvider client={smartCardClient}>
			<LinkPickerAtlassianPlugins />
		</SmartCardProvider>
	);
}
