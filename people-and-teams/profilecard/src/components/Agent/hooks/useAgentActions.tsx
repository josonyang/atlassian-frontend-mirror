import { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { getATLContextUrl } from '@atlaskit/atlassian-context';
import { fg } from '@atlaskit/platform-feature-flags';
import { useRovoPostMessageToPubsub } from '@atlaskit/rovo-triggers';
import { navigateToTeamsApp } from '@atlaskit/teams-app-config/navigation';
import { useAnalyticsEvents as useAnalyticsEventsNext } from '@atlaskit/teams-app-internal-analytics';

import { fireEvent } from '../../../util/analytics';
import { encodeParamsToUrl } from '../../../util/url';

export const firstCharUpper = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const ROVO_PARAM_PREFIX = 'rovoChat';
const createRovoParams = (params: {
	agentId?: string;
	cloudId?: string;
	pathway?: string;
	conversationId?: string;
	prompt?: string;
}) => {
	const rovoParams: Record<string, string> = {};
	Object.entries(params).forEach(([key, value]) => {
		rovoParams[`${ROVO_PARAM_PREFIX}${firstCharUpper(key)}`] = encodeURIComponent(value);
	});
	return rovoParams;
};

export const useAgentUrlActions = ({ cloudId, source }: { cloudId: string; source: string }) => {
	const { publishWithPostMessage } = useRovoPostMessageToPubsub();
	const { createAnalyticsEvent } = useAnalyticsEvents();
	const { fireEvent: fireEventNext } = useAnalyticsEventsNext();

	const onEditAgent = useCallback(
		(agentId: string) => {
			const url = `${getATLContextUrl('home')}/chat/agents/${agentId}/edit`;
			const urlWithParams = encodeParamsToUrl(url, {
				cloudId,
				...createRovoParams({ cloudId }),
			});
			window.open(urlWithParams, '_blank', 'noopener, noreferrer');

			if (fg('ptc-enable-profile-card-analytics-refactor')) {
				fireEventNext('ui.button.clicked.editAgentButton', {
					agentId,
					source,
				});
			} else {
				fireEvent(createAnalyticsEvent, {
					action: 'clicked',
					actionSubject: 'button',
					actionSubjectId: 'editAgentButton',
					attributes: { agentId, source },
				});
			}
		},
		[cloudId, createAnalyticsEvent, fireEventNext, source],
	);

	const onCopyAgent = (agentId: string) => {
		navigator.clipboard.writeText(`${window.location.origin}/people/agent/${agentId}`);

		if (fg('ptc-enable-profile-card-analytics-refactor')) {
			fireEventNext('ui.button.clicked.copyAgentLinkButton', {
				agentId,
				source,
			});
		} else {
			fireEvent(createAnalyticsEvent, {
				action: 'clicked',
				actionSubject: 'button',
				actionSubjectId: 'copyAgentLinkButton',
				attributes: { agentId, source },
			});
		}
	};

	const onDuplicateAgent = useCallback(
		(agentId: string) => {
			const baseUrl = `${getATLContextUrl('home')}/chat/agents/new`;
			const urlWithParams = encodeParamsToUrl(baseUrl, {
				cloudId,
				...createRovoParams({ cloudId, agentId, pathway: 'agents-create' }),
			});

			window.open(urlWithParams, '_blank', 'noopener, noreferrer');

			if (fg('ptc-enable-profile-card-analytics-refactor')) {
				fireEventNext('ui.button.clicked.duplicateAgentButton', {
					agentId,
					source,
				});
			} else {
				fireEvent(createAnalyticsEvent, {
					action: 'clicked',
					actionSubject: 'button',
					actionSubjectId: 'duplicateAgentButton',
					attributes: { agentId, source },
				});
			}
		},
		[cloudId, createAnalyticsEvent, fireEventNext, source],
	);

	const onConversationStarter = ({ agentId, prompt }: { agentId: string; prompt: string }) => {
		const startConversationInNewTab = () => {
			const baseUrl = `${getATLContextUrl('home')}/chat`;
			const urlWithParams = encodeParamsToUrl(baseUrl, {
				cloudId,
				...createRovoParams({ cloudId, agentId, prompt, pathway: 'chat' }),
			});
			window.open(urlWithParams, '_blank', 'noopener, noreferrer');
		};

		publishWithPostMessage({
			targetWindow: window,
			payload: {
				type: 'chat-new',
				source: 'AgentProfileCard',
				data: {
					name: prompt.slice(0, 50),
					prompt,
					agentId,
					dialogues: [],
				},
			},
			onAcknowledgeTimeout: () => {
				startConversationInNewTab();
			},
		});
	};

	const onOpenChat = (agentId: string, agentName: string) => {
		const openChatInNewTab = () => {
			const baseUrl = `${getATLContextUrl('home')}/chat`;
			const urlWithParams = encodeParamsToUrl(baseUrl, {
				cloudId,
				...createRovoParams({ cloudId, agentId }),
			});
			window.open(urlWithParams, '_blank', 'noopener, noreferrer');
		};

		publishWithPostMessage({
			targetWindow: window,
			payload: {
				type: 'chat-new',
				source: 'AgentProfileCard',
				data: {
					agentId,
					dialogues: [],
					name: `Chat with ${agentName}`,
				},
			},
			onAcknowledgeTimeout: () => {
				openChatInNewTab();
			},
		});
	};

	const onViewFullProfile = (agentId: string) => {
		const { onNavigate } = navigateToTeamsApp({
			type: 'AGENT',
			payload: {
				agentId,
			},
			cloudId,
			shouldOpenInSameTab: false,
		});

		if (fg('platform-adopt-teams-nav-config')) {
			onNavigate();
		} else {
			window.open(
				`${window.location.origin}/people/agent/${agentId}`,
				'_blank',
				'noopener, noreferrer',
			);
		}

		if (fg('ptc-enable-profile-card-analytics-refactor')) {
			fireEventNext('ui.button.clicked.viewAgentFullProfileButton', {
				agentId,
				source,
			});
		} else {
			fireEvent(createAnalyticsEvent, {
				action: 'clicked',
				actionSubject: 'button',
				actionSubjectId: 'viewAgentFullProfileButton',
				attributes: { agentId, source },
			});
		}
	};

	return {
		onEditAgent,
		onCopyAgent,
		onDuplicateAgent,
		onOpenChat,
		onConversationStarter,
		onViewFullProfile,
	};
};
