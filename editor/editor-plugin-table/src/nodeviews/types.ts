import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import type { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import { type PortalProviderAPI } from '@atlaskit/editor-common/portal';
import type { GetEditorContainerWidth, GetEditorFeatureFlags } from '@atlaskit/editor-common/types';
import type { Node as PmNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import type { PluginInjectionAPI } from '../types';

export type TableOptions = {
	isFullWidthModeEnabled?: boolean;
	wasFullWidthModeEnabled?: boolean;
	isDragAndDropEnabled?: boolean;
	isTableScalingEnabled?: boolean;
	isCommentEditor?: boolean;
	isChromelessEditor?: boolean;
};

export interface Props {
	node: PmNode;
	view: EditorView;
	allowColumnResizing?: boolean;
	allowTableResizing?: boolean;
	allowTableAlignment?: boolean;
	allowControls?: boolean;
	cellMinWidth?: number;
	portalProviderAPI: PortalProviderAPI;
	eventDispatcher: EventDispatcher;
	getPos: () => number | undefined;
	options?: TableOptions;
	getEditorContainerWidth: GetEditorContainerWidth;
	getEditorFeatureFlags: GetEditorFeatureFlags;
	dispatchAnalyticsEvent: DispatchAnalyticsEvent;
	pluginInjectionApi?: PluginInjectionAPI;
}
