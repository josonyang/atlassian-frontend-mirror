import { type ReactNode } from 'react';

export type NodeBaseProps = {
	iconBefore: ReactNode;
	isLocked?: boolean;
	// isRichNodeDisplay is temporary flag, remove when projects_in_jira_eap_drop2_fast_follow_filters is fully rolled out
	isRichNodeDisplay?: boolean;
	text?: string;
};
