/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import type { AISummaryState } from '../../src/state/hooks/use-ai-summary/ai-summary-service/types';
import { getErrorMessage } from '../../src/view/FlexibleCard/components/actions/ai-summary-action/utils';
import { getJsonLdResponse } from '../utils/flexible-ui';
import { JiraIssue } from '../../examples-helpers/_jsonLDExamples';
import { TitleBlock, SnippetBlock, Card, Provider } from '@atlaskit/smart-card';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import { CardClient } from '@atlaskit/link-provider';
import VRTestWrapper from '../utils/vr-test-wrapper';
import { DiProvider, injectable } from 'react-magnetic-di';
import useAISummaryAction from '../../src/state/hooks/use-ai-summary-action';
import { ActionFooter } from '../../src/view/FlexibleCard/components/blocks/action-block/action-footer';

class MaximumResolvedCustomClient extends CardClient {
	fetchData(url: string) {
		return Promise.resolve(getJsonLdResponse(url, JiraIssue.meta, JiraIssue.data));
	}
}

const mockState: AISummaryState = {
	status: 'error',
	content: '',
	error: 'NETWORK_ERROR',
};

const mockUseAiSummary = injectable(useAISummaryAction, () => ({
	summariseUrl: () => Promise.resolve(mockState),
	state: mockState,
}));

const mockActionFooter = injectable(ActionFooter, (props) => {
	const message = getErrorMessage(mockState.error);

	return <ActionFooter {...props} message={message} />;
});

const dependencies = [mockUseAiSummary, mockActionFooter];

export default () => (
	<VRTestWrapper>
		<DiProvider use={dependencies}>
			<Provider client={new MaximumResolvedCustomClient()} isAdminHubAIEnabled={true} product="JSM">
				<Card
					appearance="block"
					url={'https://product-fabric.atlassian.net/wiki/spaces/EM'}
					showHoverPreview={true}
					isSelected={true}
				>
					<TitleBlock hideTitleTooltip={true} />
					<SnippetBlock />
				</Card>
			</Provider>
		</DiProvider>
	</VRTestWrapper>
);
