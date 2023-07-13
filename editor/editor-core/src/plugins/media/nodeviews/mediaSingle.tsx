/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { Component, MouseEvent } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { DecorationSource, EditorView, Decoration } from 'prosemirror-view';
import {
  RichMediaLayout as MediaSingleLayout,
  MediaADFAttrs,
  RichMediaAttributes,
} from '@atlaskit/adf-schema';
import {
  WithProviders,
  ProviderFactory,
} from '@atlaskit/editor-common/provider-factory';
import type { ContextIdentifierProvider } from '@atlaskit/editor-common/provider-factory';
import type {
  ExtractInjectionAPI,
  GridType,
} from '@atlaskit/editor-common/types';
import {
  MediaSingle,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
} from '@atlaskit/editor-common/ui';
import { browser } from '@atlaskit/editor-common/utils';
import { CardEvent } from '@atlaskit/media-card';
import { isNodeSelectedOrInRange } from '../../../utils/nodes';
import { MediaClientConfig } from '@atlaskit/media-core';

import {
  getPosHandler,
  getPosHandlerNode,
  ForwardRef,
} from '../../../nodeviews/';
import { setNodeSelection, setTextSelection } from '../../../utils';
import ResizableMediaSingle from '../ui/ResizableMediaSingle';
import { EventDispatcher } from '../../../event-dispatcher';
import { PortalProviderAPI } from '@atlaskit/editor-common/portal-provider';

import { MediaOptions } from '../types';
import { MEDIA_CONTENT_WRAP_CLASS_NAME } from '../pm-plugins/main';
import { MediaSingleNodeProps, MediaSingleNodeViewProps } from './types';
import { MediaNodeUpdater } from './mediaNodeUpdater';
import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { CellSelection } from '@atlaskit/editor-tables/cell-selection';
import { figureWrapper, MediaSingleNodeSelector } from './styles';
import {
  floatingLayouts,
  isRichMediaInsideOfBlockNode,
} from '@atlaskit/editor-common/utils';
import { getAttrsFromUrl } from '@atlaskit/media-client';
import { isMediaBlobUrlFromAttrs } from '../utils/media-common';
import { getMediaFeatureFlag } from '@atlaskit/media-common';
import ReactNodeView from '@atlaskit/editor-common/react-node-view';
import CaptionPlaceholder from '../ui/CaptionPlaceholder';
import { NodeSelection } from 'prosemirror-state';
import { insertAndSelectCaptionFromMediaSinglePos } from '../commands/captions';
import type mediaPlugin from '../index';
import type { Highlights } from '@atlaskit/editor-plugin-grid';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';

export interface MediaSingleNodeState {
  width?: number;
  height?: number;
  viewMediaClientConfig?: MediaClientConfig;
  contextIdentifierProvider?: ContextIdentifierProvider;
  isCopying: boolean;
}

export default class MediaSingleNode extends Component<
  MediaSingleNodeProps,
  MediaSingleNodeState
> {
  static defaultProps: Partial<MediaSingleNodeProps> = {
    mediaOptions: {},
  };
  static displayName = 'MediaSingleNode';

  state: MediaSingleNodeState = {
    width: undefined,
    height: undefined,
    viewMediaClientConfig: undefined,
    isCopying: false,
  };

  mediaSingleWrapperRef = React.createRef<HTMLDivElement>();
  captionPlaceHolderRef = React.createRef<HTMLSpanElement>();

  createMediaNodeUpdater = (props: MediaSingleNodeProps): MediaNodeUpdater => {
    const node = this.props.node.firstChild;

    return new MediaNodeUpdater({
      ...props,
      isMediaSingle: true,
      node: node ? (node as PMNode) : this.props.node,
      dispatchAnalyticsEvent: this.props.dispatchAnalyticsEvent,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps: MediaSingleNodeProps) {
    if (nextProps.mediaProvider !== this.props.mediaProvider) {
      this.setViewMediaClientConfig(nextProps);
    }

    // Forced updates not required on mobile
    if (nextProps.isCopyPasteEnabled === false) {
      return;
    }

    // We need to call this method on any prop change since attrs can get removed with collab editing
    // the method internally checks if we already have all attrs
    this.createMediaNodeUpdater(nextProps).updateMediaSingleFileAttrs();
  }

  setViewMediaClientConfig = async (props: MediaSingleNodeProps) => {
    const mediaProvider = await props.mediaProvider;
    if (mediaProvider) {
      const viewMediaClientConfig = mediaProvider.viewMediaClientConfig;

      this.setState({
        viewMediaClientConfig,
      });
    }
  };

  updateMediaNodeAttributes = async (props: MediaSingleNodeProps) => {
    const mediaNodeUpdater = this.createMediaNodeUpdater(props);
    const { addPendingTask } = this.props.mediaPluginState;

    // we want the first child of MediaSingle (type "media")
    const node = this.props.node.firstChild;
    if (!node) {
      return;
    }

    const updatedDimensions = await mediaNodeUpdater.getRemoteDimensions();
    if (updatedDimensions) {
      mediaNodeUpdater.updateDimensions(updatedDimensions);
    }

    if (node.attrs.type === 'external' && node.attrs.__external) {
      const updatingNode = mediaNodeUpdater.handleExternalMedia(
        this.props.getPos,
      );
      addPendingTask(updatingNode);
      await updatingNode;
      return;
    }

    const contextId = mediaNodeUpdater.getNodeContextId();
    if (!contextId) {
      await mediaNodeUpdater.updateContextId();
    }

    const hasDifferentContextId =
      await mediaNodeUpdater.hasDifferentContextId();

    if (hasDifferentContextId) {
      this.setState({ isCopying: true });
      try {
        const copyNode = mediaNodeUpdater.copyNode({
          traceId: node.attrs.__mediaTraceId,
        });
        addPendingTask(copyNode);
        await copyNode;
      } catch (e) {
        // if copyNode fails, let's set isCopying false so we can show the eventual error
        this.setState({ isCopying: false });
      }
    }
  };

  async componentDidMount() {
    const { contextIdentifierProvider } = this.props;

    await Promise.all([
      this.setViewMediaClientConfig(this.props),
      this.updateMediaNodeAttributes(this.props),
    ]);

    this.setState({
      contextIdentifierProvider: await contextIdentifierProvider,
    });
  }

  selectMediaSingle = ({ event }: CardEvent) => {
    const propPos = this.props.getPos();

    if (typeof propPos !== 'number') {
      return;
    }

    // We need to call "stopPropagation" here in order to prevent the browser from navigating to
    // another URL if the media node is wrapped in a link mark.
    event.stopPropagation();

    const { state } = this.props.view;

    if (event.shiftKey) {
      // don't select text if there is current selection in a table (as this would override selected cells)
      if (state.selection instanceof CellSelection) {
        return;
      }

      setTextSelection(
        this.props.view,
        state.selection.from < propPos ? state.selection.from : propPos,
        // + 3 needed for offset of the media inside mediaSingle and cursor to make whole mediaSingle selected
        state.selection.to > propPos ? state.selection.to : propPos + 3,
      );
    } else {
      setNodeSelection(this.props.view, propPos);
    }
  };

  updateSize = (width: number | null, layout: MediaSingleLayout) => {
    const { state, dispatch } = this.props.view;
    const pos = this.props.getPos();
    if (typeof pos === 'undefined') {
      return;
    }
    const tr = state.tr.setNodeMarkup(pos, undefined, {
      ...this.props.node.attrs,
      layout,
      width,
    });
    tr.setMeta('scrollIntoView', false);
    /**
     * Any changes to attributes of a node count the node as "recreated" in Prosemirror[1]
     * This makes it so Prosemirror resets the selection to the child i.e. "media" instead of "media-single"
     * The recommended fix is to reset the selection.[2]
     *
     * [1] https://discuss.prosemirror.net/t/setnodemarkup-loses-current-nodeselection/976
     * [2] https://discuss.prosemirror.net/t/setnodemarkup-and-deselect/3673
     */
    tr.setSelection(NodeSelection.create(tr.doc, pos));
    return dispatch(tr);
  };

  // Workaound for iOS 16 Caption selection issue
  // @see https://product-fabric.atlassian.net/browse/MEX-2012
  onMediaSingleClicked = (event: MouseEvent) => {
    if (!browser.ios) {
      return;
    }

    if (this.mediaSingleWrapperRef.current !== event.target) {
      return;
    }

    this.captionPlaceHolderRef.current?.click();
  };

  render() {
    const {
      selected,
      getPos,
      node,
      mediaOptions,
      fullWidthMode,
      view: { state },
      view,
    } = this.props;

    const { layout, width: mediaSingleWidth } =
      node.attrs as RichMediaAttributes;
    const childNode = node.firstChild!;
    const attrs = childNode.attrs as MediaADFAttrs;
    let { width, height } = attrs;

    if (attrs.type === 'external') {
      if (isMediaBlobUrlFromAttrs(attrs)) {
        const urlAttrs = getAttrsFromUrl(attrs.url);
        if (urlAttrs) {
          const { width: urlWidth, height: urlHeight } = urlAttrs;
          width = width || urlWidth;
          height = height || urlHeight;
        }
      }
      const { width: stateWidth, height: stateHeight } = this.state;

      if (width === null) {
        width = stateWidth || DEFAULT_IMAGE_WIDTH;
      }

      if (height === null) {
        height = stateHeight || DEFAULT_IMAGE_HEIGHT;
      }
    }

    if (!width || !height) {
      width = DEFAULT_IMAGE_WIDTH;
      height = DEFAULT_IMAGE_HEIGHT;
    }

    const mediaSingleProps = {
      layout,
      width,
      height,
      containerWidth: this.props.width,
      lineLength: this.props.lineLength,
      pctWidth: mediaSingleWidth,
      fullWidthMode,
      hasFallbackContainer: false,
    };

    let canResize = !!this.props.mediaOptions.allowResizing;

    if (!this.props.mediaOptions.allowResizingInTables) {
      // If resizing not allowed in tables, check parents for tables
      const pos = getPos();
      if (pos) {
        const $pos = state.doc.resolve(pos);
        const { table } = state.schema.nodes;
        const disabledNode = !!findParentNodeOfTypeClosestToPos($pos, [table]);
        canResize = canResize && !disabledNode;
      }
    }

    const lineLength =
      this.getLineLength(view, getPos()) || this.props.lineLength;

    const isSelected = selected();

    const shouldShowPlaceholder =
      getMediaFeatureFlag('captions', mediaOptions.featureFlags) &&
      node.childCount !== 2 &&
      isSelected &&
      state.selection instanceof NodeSelection;

    const MediaChildren = (
      <figure
        ref={this.mediaSingleWrapperRef}
        css={figureWrapper}
        className={MediaSingleNodeSelector}
        onClick={this.onMediaSingleClicked}
      >
        <div ref={this.props.forwardRef} />
        {shouldShowPlaceholder && (
          <CaptionPlaceholder
            ref={this.captionPlaceHolderRef}
            onClick={this.clickPlaceholder}
          />
        )}
      </figure>
    );

    return canResize ? (
      <ResizableMediaSingle
        {...mediaSingleProps}
        lineLength={lineLength}
        view={this.props.view}
        getPos={getPos}
        updateSize={this.updateSize}
        displayGrid={this.displayGrid}
        gridSize={12}
        viewMediaClientConfig={this.state.viewMediaClientConfig}
        allowBreakoutSnapPoints={
          mediaOptions && mediaOptions.allowBreakoutSnapPoints
        }
        selected={isSelected}
        dispatchAnalyticsEvent={this.props.dispatchAnalyticsEvent}
      >
        {MediaChildren}
      </ResizableMediaSingle>
    ) : (
      <MediaSingle {...mediaSingleProps}>{MediaChildren}</MediaSingle>
    );
  }

  private displayGrid = (
    visible: boolean,
    gridType: GridType,
    highlight: number[] | string[],
  ) => {
    const { pluginInjectionApi, view } = this.props;

    pluginInjectionApi?.dependencies?.grid?.actions?.displayGrid(view)({
      visible,
      gridType,
      highlight: highlight as Highlights,
    });
  };

  private clickPlaceholder = () => {
    const { view, getPos, node } = this.props;

    if (typeof getPos === 'boolean') {
      return;
    }

    insertAndSelectCaptionFromMediaSinglePos(getPos(), node)(
      view.state,
      view.dispatch,
    );
  };

  private getLineLength = (
    view: EditorView,
    pos: number | undefined,
  ): number | null => {
    if (typeof pos !== 'number') {
      return null;
    }
    if (isRichMediaInsideOfBlockNode(view, pos)) {
      const $pos = view.state.doc.resolve(pos);
      const domNode = view.nodeDOM($pos.pos);

      if (
        $pos.nodeAfter &&
        floatingLayouts.indexOf($pos.nodeAfter.attrs.layout) > -1 &&
        domNode &&
        domNode.parentElement
      ) {
        return domNode.parentElement.offsetWidth;
      }

      if (domNode instanceof HTMLElement) {
        return domNode.offsetWidth;
      }
    }

    return null;
  };
}

const MediaSingleNodeWrapper = ({
  pluginInjectionApi,
  mediaProvider,
  contextIdentifierProvider,
  node,
  getPos,
  mediaOptions,
  view,
  fullWidthMode,
  selected,
  eventDispatcher,
  dispatchAnalyticsEvent,
  forwardRef,
}: Omit<MediaSingleNodeProps, 'width' | 'lineLength' | 'mediaPluginState'>) => {
  const { widthState, mediaState } = useSharedPluginState(pluginInjectionApi, [
    'width',
    'media',
  ]);
  return (
    <MediaSingleNode
      width={widthState!.width}
      lineLength={widthState!.lineLength}
      node={node}
      getPos={getPos}
      mediaProvider={mediaProvider}
      contextIdentifierProvider={contextIdentifierProvider}
      mediaOptions={mediaOptions}
      view={view}
      fullWidthMode={fullWidthMode}
      selected={selected}
      eventDispatcher={eventDispatcher}
      mediaPluginState={mediaState ?? undefined}
      dispatchAnalyticsEvent={dispatchAnalyticsEvent}
      forwardRef={forwardRef}
      pluginInjectionApi={pluginInjectionApi}
    />
  );
};

class MediaSingleNodeView extends ReactNodeView<MediaSingleNodeViewProps> {
  lastOffsetLeft = 0;
  forceViewUpdate = false;
  selectionType: number | null = null;

  createDomRef(): HTMLElement {
    const domRef = document.createElement('div');
    if (
      this.reactComponentProps.mediaOptions &&
      this.reactComponentProps.mediaOptions.allowMediaSingleEditable
    ) {
      // workaround Chrome bug in https://product-fabric.atlassian.net/browse/ED-5379
      // see also: https://github.com/ProseMirror/prosemirror/issues/884
      domRef.contentEditable = 'true';
    }
    return domRef;
  }

  getContentDOM() {
    const dom = document.createElement('div');
    dom.classList.add(MEDIA_CONTENT_WRAP_CLASS_NAME);
    return { dom };
  }

  viewShouldUpdate(nextNode: PMNode) {
    if (this.forceViewUpdate) {
      this.forceViewUpdate = false;
      return true;
    }

    if (this.node.attrs !== nextNode.attrs) {
      return true;
    }

    if (this.selectionType !== this.checkAndUpdateSelectionType()) {
      return true;
    }

    if (this.node.childCount !== nextNode.childCount) {
      return true;
    }

    return super.viewShouldUpdate(nextNode);
  }

  checkAndUpdateSelectionType = () => {
    const getPos = this.getPos as getPosHandlerNode;
    const { selection } = this.view.state;
    const isNodeSelected = isNodeSelectedOrInRange(
      selection.$anchor.pos,
      selection.$head.pos,
      getPos(),
      this.node.nodeSize,
    );

    this.selectionType = isNodeSelected;

    return isNodeSelected;
  };

  isNodeSelected = () => {
    this.checkAndUpdateSelectionType();
    return this.selectionType !== null;
  };

  getNodeMediaId(node: PMNode): string | undefined {
    if (node.firstChild) {
      return node.firstChild.attrs.id;
    }
    return undefined;
  }

  update(
    node: PMNode,
    decorations: readonly Decoration[],
    _innerDecorations?: DecorationSource,
    isValidUpdate?: (currentNode: PMNode, newNode: PMNode) => boolean,
  ) {
    if (!isValidUpdate) {
      isValidUpdate = (currentNode, newNode) =>
        this.getNodeMediaId(currentNode) === this.getNodeMediaId(newNode);
    }
    return super.update(node, decorations, _innerDecorations, isValidUpdate);
  }

  render(props: MediaSingleNodeViewProps, forwardRef?: ForwardRef) {
    const {
      eventDispatcher,
      fullWidthMode,
      providerFactory,
      mediaOptions,
      dispatchAnalyticsEvent,
      pluginInjectionApi,
    } = this.reactComponentProps;

    // getPos is a boolean for marks, since this is a node we know it must be a function
    const getPos = this.getPos as getPosHandlerNode;

    return (
      <WithProviders
        providers={['mediaProvider', 'contextIdentifierProvider']}
        providerFactory={providerFactory}
        renderNode={({ mediaProvider, contextIdentifierProvider }) => {
          return (
            <MediaSingleNodeWrapper
              pluginInjectionApi={pluginInjectionApi}
              mediaProvider={mediaProvider}
              contextIdentifierProvider={contextIdentifierProvider}
              node={this.node}
              getPos={getPos}
              mediaOptions={mediaOptions}
              view={this.view}
              fullWidthMode={fullWidthMode}
              selected={this.isNodeSelected}
              eventDispatcher={eventDispatcher}
              dispatchAnalyticsEvent={dispatchAnalyticsEvent!}
              forwardRef={forwardRef!}
            />
          );
        }}
      />
    );
  }

  ignoreMutation() {
    // DOM has changed; recalculate if we need to re-render
    if (this.dom) {
      const offsetLeft = (this.dom as HTMLElement).offsetLeft;

      if (offsetLeft !== this.lastOffsetLeft) {
        this.lastOffsetLeft = offsetLeft;
        this.forceViewUpdate = true;

        this.update(this.node, [], undefined, () => true);
      }
    }

    return true;
  }
}

export const ReactMediaSingleNode =
  (
    portalProviderAPI: PortalProviderAPI,
    eventDispatcher: EventDispatcher,
    providerFactory: ProviderFactory,
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
    mediaOptions: MediaOptions = {},
    pluginInjectionApi?: ExtractInjectionAPI<typeof mediaPlugin>,
  ) =>
  (node: PMNode, view: EditorView, getPos: getPosHandler) => {
    const hasIntlContext = true;
    return new MediaSingleNodeView(
      node,
      view,
      getPos,
      portalProviderAPI,
      eventDispatcher,
      {
        eventDispatcher,
        fullWidthMode: mediaOptions.fullWidthEnabled,
        providerFactory,
        mediaOptions,
        dispatchAnalyticsEvent,
        isCopyPasteEnabled: mediaOptions.isCopyPasteEnabled,
        pluginInjectionApi,
      },
      undefined,
      undefined,
      undefined,
      hasIntlContext,
    ).init();
  };
