import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import { ElementItem } from '../FlexibleCard/components/blocks/types';
import { AnalyticsFacade } from '../../state/analytics';
import { LinkAction } from '../../state/hooks-external/useSmartLinkActions';
import { CardState } from '@atlaskit/linking-common';
import { CardProviderRenderers } from '@atlaskit/link-provider';
import { AnalyticsHandler } from '../../utils/types';
import { ReactElement, MouseEventHandler } from 'react';
import { JsonLd } from 'json-ld-types';

export interface HoverCardProps extends WithAnalyticsEventsProps {
  /**
   * Unique ID for a hover card. Used for analytics.
   */
  id?: string;

  /**
   * Hover card will display data from this url.
   */
  url: string;

  /**
   * React children component over which the hover card can be triggered.
   */
  children: ReactElement;

  /**
   * Function to be called when user is authorized to view a link.
   */
  onAuthorize?: () => void;

  /**
   * Determines if the hover card is allowed to open. If changed from true to false while the
   * hover card is open, the hover card will be closed.
   */
  canOpen?: boolean;

  /**
   * Determines if the hover card should close when the children passed in are
   * clicked.
   */
  closeOnChildClick?: boolean;
}

export interface HoverCardComponentProps extends HoverCardProps {
  analyticsHandler: AnalyticsHandler;
  analytics: AnalyticsFacade;
  canOpen?: boolean;
  closeOnChildClick?: boolean;
}

export type PreviewDisplay = 'card' | 'embed';
export type PreviewInvokeMethod = 'keyboard' | 'mouse_hover' | 'mouse_click';

export interface MetadataOptions {
  primary: Array<ElementItem>;
  secondary: Array<ElementItem>;
  subtitle: Array<ElementItem>;
}

export type HoverCardContentProps = {
  id?: string;
  analytics: AnalyticsFacade;
  cardActions?: LinkAction[];
  cardState: CardState;
  renderers?: CardProviderRenderers;
  onActionClick: (actionId: string) => void;
  onResolve: () => void;
  url: string;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
};

export type SnippetOrPreviewProps = {
  data: JsonLd.Data.BaseData;
  snippetHeight: number;
};
