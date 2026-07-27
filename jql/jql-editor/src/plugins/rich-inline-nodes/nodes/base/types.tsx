import { type ReactNode } from 'react';

export type NodeBaseProps = {
	iconBefore: ReactNode;
	isLocked?: boolean;
	// isRichNodeDisplay is temporary flag, remove when atlassian_projects_-_native_integration is fully rolled out
	isRichNodeDisplay?: boolean;
	text?: string;
};
