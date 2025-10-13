import React, { useCallback, useState } from 'react';

import { defineMessages, useIntl } from 'react-intl-next';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/new';
import { fg } from '@atlaskit/platform-feature-flags';
import { componentWithFG } from '@atlaskit/platform-feature-flags-react';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box, Inline, xcss } from '@atlaskit/primitives';
import { AgentDropdownMenu, ChatPillIcon } from '@atlaskit/rovo-agent-components';
import { useAnalyticsEvents as useAnalyticsEventsNext } from '@atlaskit/teams-app-internal-analytics';

import { type ProfileClient, type RovoAgentProfileCardInfo } from '../../types';
import { fireEvent } from '../../util/analytics';

import { AgentActions as AgentActionsCompiled } from './ActionsCompiled';
import { AgentDeleteConfirmationModal } from './AgentDeleteConfirmationModal';

type AgentActionsProps = {
	agent: RovoAgentProfileCardInfo;
	onEditAgent: () => void;
	onCopyAgent: () => void;
	onDuplicateAgent: () => void;
	onDeleteAgent: () => void;
	onChatClick: (event: React.MouseEvent) => void;
	onViewFullProfileClick: () => void;
	resourceClient: ProfileClient;
	hideMoreActions?: boolean;
};

const chatToAgentButtonContainer = xcss({
	width: '100%',
});

const chatToAgentButtonWrapper = xcss({
	display: 'flex',
	justifyContent: 'center',
	lineHeight: '20px',
	fontWeight: 'font.weight.medium',
});

const chatPillButtonInlineStyles = xcss({ paddingInline: 'space.025' });

const chatPillTextStyles = xcss({
	wordBreak: 'break-word',
	textAlign: 'left',
	whiteSpace: 'pre-wrap',
});

const chatPillIconWrapper = xcss({
	minWidth: '20px',
	height: '20px',
});

const actionsWrapperStyles = xcss({
	borderTopWidth: 'border.width',
	borderTopStyle: 'solid',
	borderColor: 'color.border',
	padding: 'space.200',
	marginBlockStart: 'space.200',
	color: 'color.text',
});

const _AgentActions = ({
	onEditAgent,
	onDeleteAgent,
	onDuplicateAgent,
	onCopyAgent,
	onChatClick,
	onViewFullProfileClick,
	agent,
	resourceClient,
	hideMoreActions,
}: AgentActionsProps) => {
	const { formatMessage } = useIntl();
	const { createAnalyticsEvent } = useAnalyticsEvents();
	const { fireEvent: fireEventNext } = useAnalyticsEventsNext();

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const isForgeAgent = agent.creator_type === 'FORGE' || agent.creator_type === 'THIRD_PARTY';

	const loadAgentPermissions = useCallback(async () => {
		const {
			permissions: { AGENT_CREATE, AGENT_UPDATE, AGENT_DEACTIVATE },
		} = await resourceClient.getRovoAgentPermissions(agent.id);

		return {
			...(fg('agent_studio_fe_permissions_settings_m1') && {
				isCreateEnabled: AGENT_CREATE.permitted,
			}),
			isEditEnabled: AGENT_UPDATE.permitted,
			isDeleteEnabled: AGENT_DEACTIVATE.permitted,
		};
	}, [agent.id, resourceClient]);

	const handleDeleteAgent = useCallback(() => {
		if (fg('ptc-enable-profile-card-analytics-refactor')) {
			fireEventNext('ui.button.clicked.deleteAgentButton', {
				agentId: agent.id,
				source: 'agentProfileCard',
			});
		} else {
			fireEvent(createAnalyticsEvent, {
				action: 'clicked',
				actionSubject: 'button',
				actionSubjectId: 'deleteAgentButton',
				attributes: {
					agentId: agent.id,
					source: 'agentProfileCard',
				},
			});
		}

		setIsDeleteModalOpen(true);
	}, [agent.id, createAnalyticsEvent, fireEventNext]);

	return (
		<>
			<Inline space="space.100" xcss={actionsWrapperStyles}>
				<Box xcss={chatToAgentButtonContainer}>
					<Button
						shouldFitContainer
						onClick={(e: React.MouseEvent) => {
							e.stopPropagation();
							onChatClick(e);
						}}
					>
						<Box xcss={chatToAgentButtonWrapper}>
							<Inline space="space.050" xcss={chatPillButtonInlineStyles}>
								<Box xcss={chatPillIconWrapper}>
									<ChatPillIcon />
								</Box>
								<Box xcss={chatPillTextStyles}>{formatMessage(messages.actionChatToAgent)}</Box>
							</Inline>
						</Box>
					</Button>
				</Box>

				{!hideMoreActions && (
					<AgentDropdownMenu
						agentId={agent.id}
						onDeleteAgent={handleDeleteAgent}
						onEditAgent={onEditAgent}
						onDuplicateAgent={onDuplicateAgent}
						onCopyAgent={onCopyAgent}
						isForgeAgent={isForgeAgent}
						loadAgentPermissions={loadAgentPermissions}
						loadPermissionsOnMount
						onViewAgentFullProfileClick={onViewFullProfileClick}
						doesAgentHaveIdentityAccountId={!!agent.identity_account_id}
						shouldTriggerStopPropagation
						dropdownMenuTestId="agent-dropdown-menu"
					/>
				)}
			</Inline>
			<AgentDeleteConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={() => {
					setIsDeleteModalOpen(false);
				}}
				onSubmit={onDeleteAgent}
				agentId={agent.id}
				agentName={agent.name}
			/>
		</>
	);
};

const messages = defineMessages({
	actionChatToAgent: {
		id: 'ptc-directory.agent-profile.action.dropdown.chat-with-agent',
		defaultMessage: 'Chat with Agent',
		description: 'Text for the "chat with agent" action to chat to the agent',
	},
});

export const AgentActions = componentWithFG(
	'profilecard_primitives_compiled',
	AgentActionsCompiled,
	_AgentActions,
);
