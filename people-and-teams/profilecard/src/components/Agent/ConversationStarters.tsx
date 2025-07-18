import React from 'react';

// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Stack } from '@atlaskit/primitives';
import {
	AgentConversationStarters,
	type AgentConversationStartersProps,
	type ConversationStarter,
} from '@atlaskit/rovo-agent-components';

export const ConversationStarters = ({
	isAgentDefault,
	onConversationStarterClick,
	userDefinedConversationStarters,
}: AgentConversationStartersProps) => {
	const handleConversationStarterClick = (conversationStarter: ConversationStarter) => {
		onConversationStarterClick(conversationStarter);
	};
	return (
		<Stack space="space.050" alignInline="start">
			<AgentConversationStarters
				isAgentDefault={isAgentDefault}
				onConversationStarterClick={handleConversationStarterClick}
				userDefinedConversationStarters={userDefinedConversationStarters}
			/>
		</Stack>
	);
};
