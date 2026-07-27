import type { ACTION, ACTION_SUBJECT } from './enums';
import type { OperationalAEP } from './utils';

/**
 * Reasons an agent-authored edit did NOT get the skeleton shimmer / telepointer and instead applied
 * instantly. Success is the ABSENCE of this event, so a neutral action + `reason` attribute is used
 * (rather than an error action) to keep benign, expected degrades out of error dashboards.
 */
export type AgentEditShimmerNotShownReason =
	| 'rebasedConcurrentEdit'
	| 'nothingToShow'
	| 'captureThrew'
	| 'tornDownMidAnimation';

export type AgentEditShimmerNotShownAttributes = {
	// The agent kind only (e.g. `mcp`), upper-cased or raw — never a human/user identifier, so non-PII.
	agentType?: string;
	// Sanitised error name/message; set only for the `captureThrew` reason.
	error?: string;
	reason: AgentEditShimmerNotShownReason;
};

export type AgentEditShimmerNotShownAEP = OperationalAEP<
	ACTION.AGENT_EDIT_SHIMMER_NOT_SHOWN,
	ACTION_SUBJECT.COLLAB,
	undefined,
	AgentEditShimmerNotShownAttributes
>;
