import type { MentionDescription, MentionProvider } from '@atlaskit/mention';
import type { ContextIdentifierProvider } from '@atlaskit/editor-common/provider-factory';
import type { AnalyticsEventPayload } from '@atlaskit/analytics-next';

export interface TeamInfoAttrAnalytics {
  teamId: String;
  includesYou: boolean;
  memberCount: number;
}

export interface MentionPluginConfig {
  HighlightComponent?: React.ComponentType;
  // flag to indicate display name instead of nick name should be inserted for mentions
  // default: false, which inserts the nick name
  insertDisplayName?: boolean;
}

export interface MentionPluginOptions extends MentionPluginConfig {
  sanitizePrivateContent?: boolean;
  allowZeroWidthSpaceAfter?: boolean;
}

export type MentionPluginState = {
  mentionProvider?: MentionProvider;
  contextIdentifierProvider?: ContextIdentifierProvider;
  mentions?: Array<MentionDescription>;
};

export type FireElementsChannelEvent = <T extends AnalyticsEventPayload>(
  payload: T,
) => void;
