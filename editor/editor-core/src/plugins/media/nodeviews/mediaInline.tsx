import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorView, NodeView } from '@atlaskit/editor-prosemirror/view';
import React, { useEffect, useState } from 'react';
import type { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import type {
  getPosHandler as ProsemirrorGetPosHandler,
  getPosHandler,
  getPosHandlerNode,
} from '../types';
import { SelectionBasedNodeView } from '@atlaskit/editor-common/selection-based-node-view';

import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import { MediaInlineCard } from '@atlaskit/media-card';
import type { MediaClientConfig } from '@atlaskit/media-core/auth';
import type { FileIdentifier } from '@atlaskit/media-client';
import { WithProviders } from '@atlaskit/editor-common/provider-factory';
import type {
  MediaProvider,
  ProviderFactory,
  ContextIdentifierProvider,
} from '@atlaskit/editor-common/provider-factory';
import type { PortalProviderAPI } from '@atlaskit/editor-common/portal-provider';

import { MediaInlineNodeSelector } from './styles';
import type { MediaPluginState } from '../pm-plugins/types';
import { MediaNodeUpdater } from './mediaNodeUpdater';
import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import { MediaInlineCardLoadingView } from '@atlaskit/media-ui';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type { MediaNextEditorPluginType } from '../next-plugin-type';

export interface MediaInlineProps {
  mediaProvider: Promise<MediaProvider>;
  identifier: FileIdentifier;
  node: PMNode;
  isSelected: boolean;
  view: EditorView;
  getPos: ProsemirrorGetPosHandler;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
  contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
  mediaPluginState: MediaPluginState;
}

export const createMediaNodeUpdater = (
  props: MediaInlineProps,
): MediaNodeUpdater => {
  const node = props.node;
  return new MediaNodeUpdater({
    ...props,
    isMediaSingle: true,
    node: node ? (node as PMNode) : props.node,
    dispatchAnalyticsEvent: props.dispatchAnalyticsEvent,
    contextIdentifierProvider: props.contextIdentifierProvider,
  });
};

/**
 * Handles updating the media inline node attributes
 * but also handling copy-paste for cross-editor of the same instance
 * using the contextid
 *
 */
export const updateMediaNodeAttributes = async (
  props: MediaInlineProps,
  mediaNodeUpdater: MediaNodeUpdater,
) => {
  const { addPendingTask } = props.mediaPluginState;

  const node = props.node;
  if (!node) {
    return;
  }

  const contextId = mediaNodeUpdater.getNodeContextId();
  if (!contextId) {
    await mediaNodeUpdater.updateContextId();
  }

  const hasDifferentContextId = await mediaNodeUpdater.hasDifferentContextId();

  if (hasDifferentContextId) {
    // Copy paste flow (different pages)
    try {
      const copyNode = mediaNodeUpdater.copyNode({
        traceId: node.attrs.__mediaTraceId,
      });
      addPendingTask(copyNode);
      await copyNode;
    } catch (e) {
      return;
    }
  }
  await mediaNodeUpdater.updateMediaSingleFileAttrs();
};

export const handleNewNode = (props: MediaInlineProps) => {
  const { node, mediaPluginState, getPos } = props;
  mediaPluginState.handleMediaNodeMount(node, () => getPos());
};

export const MediaInline: React.FC<MediaInlineProps> = (props) => {
  const [viewMediaClientConfig, setViewMediaClientConfig] = useState<
    MediaClientConfig | undefined
  >();

  const [isContextIdUnsync, setIsContextIdUnsync] = useState<boolean>(true);

  useEffect(() => {
    const mediaNodeUpdater = createMediaNodeUpdater(props);
    mediaNodeUpdater.hasDifferentContextId().then(setIsContextIdUnsync);

    handleNewNode(props);
    updateMediaNodeAttributes(props, mediaNodeUpdater);
    updateViewMediaClientConfig(props);

    return () => {
      const { mediaPluginState } = props;
      mediaPluginState.handleMediaNodeUnmount(props.node);
    };
  }, [props]);

  const updateViewMediaClientConfig = async (props: MediaInlineProps) => {
    const mediaProvider = await props.mediaProvider;
    if (mediaProvider) {
      const viewMediaClientConfig = mediaProvider.viewMediaClientConfig;
      setViewMediaClientConfig(viewMediaClientConfig);
    }
  };

  const { id, collection } = props.node.attrs;
  const identifier: FileIdentifier = {
    id,
    mediaItemType: 'file',
    collectionName: collection!,
  };

  /*
   * Show the loading view if
   * 1. The media provider is not ready
   * 2. Context Id is not synced
   * to prevent calling the media API (in mounting of `MediaInlineCard`)
   * before the prerequisites meet
   */
  if (!viewMediaClientConfig || isContextIdUnsync) {
    return <MediaInlineCardLoadingView message="" isSelected={false} />;
  }

  return (
    <MediaInlineCard
      isSelected={props.isSelected}
      identifier={identifier}
      mediaClientConfig={viewMediaClientConfig}
    />
  );
};

type MediaInlineSharedStateProps = Omit<
  MediaInlineProps,
  'mediaPluginState'
> & {
  api: ExtractInjectionAPI<MediaNextEditorPluginType> | undefined;
};

const MediaInlineSharedState = ({
  identifier,
  mediaProvider,
  node,
  isSelected,
  getPos,
  contextIdentifierProvider,
  api,
  view,
}: MediaInlineSharedStateProps) => {
  const { mediaState } = useSharedPluginState(api, ['media']);

  if (!mediaState) {
    return null;
  }

  return (
    <MediaInline
      identifier={identifier}
      mediaProvider={mediaProvider}
      mediaPluginState={mediaState}
      node={node}
      isSelected={isSelected}
      view={view}
      getPos={getPos}
      contextIdentifierProvider={contextIdentifierProvider}
    />
  );
};

export interface MediaInlineNodeViewProps {
  providerFactory: ProviderFactory;
  api: ExtractInjectionAPI<MediaNextEditorPluginType> | undefined;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
}
export class MediaInlineNodeView extends SelectionBasedNodeView<MediaInlineNodeViewProps> {
  createDomRef() {
    const domRef = document.createElement('span');
    domRef.contentEditable = 'false';
    return domRef;
  }

  getContentDOM() {
    const dom = document.createElement('span');
    dom.classList.add(MediaInlineNodeSelector);
    return { dom };
  }

  ignoreMutation() {
    return true;
  }

  viewShouldUpdate(nextNode: PMNode) {
    if (this.node.attrs !== nextNode.attrs) {
      return true;
    }

    return super.viewShouldUpdate(nextNode);
  }

  render(props: MediaInlineNodeViewProps) {
    const { providerFactory, api } = props;
    const { view } = this;
    const getPos = this.getPos as getPosHandlerNode;
    return (
      <WithProviders
        providers={['mediaProvider', 'contextIdentifierProvider']}
        providerFactory={providerFactory}
        renderNode={({ mediaProvider, contextIdentifierProvider }) => {
          if (!mediaProvider) {
            return null;
          }
          return (
            <MediaInlineSharedState
              identifier={this.node.attrs.id}
              mediaProvider={mediaProvider}
              node={this.node}
              isSelected={this.nodeInsideSelection()}
              view={view}
              getPos={getPos}
              contextIdentifierProvider={contextIdentifierProvider}
              api={api}
            />
          );
        }}
      />
    );
  }
}

export const ReactMediaInlineNode =
  (
    portalProviderAPI: PortalProviderAPI,
    eventDispatcher: EventDispatcher,
    providerFactory: ProviderFactory,
    api: ExtractInjectionAPI<MediaNextEditorPluginType> | undefined,
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
  ) =>
  (node: PMNode, view: EditorView, getPos: getPosHandler): NodeView => {
    return new MediaInlineNodeView(
      node,
      view,
      getPos,
      portalProviderAPI,
      eventDispatcher,
      {
        providerFactory,
        dispatchAnalyticsEvent,
        api,
      },
    ).init();
  };
