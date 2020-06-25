import React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { Card as SmartCard, CardPlatform } from '@atlaskit/smart-card';
import PropTypes from 'prop-types';
import { EditorView } from 'prosemirror-view';
import rafSchedule from 'raf-schd';
import { SmartCardProps, Card } from './genericCard';
import {
  UnsupportedBlock,
  DEFAULT_EMBED_CARD_HEIGHT,
  DEFAULT_EMBED_CARD_WIDTH,
  MediaSingle as RichMediaWrapper,
  ProviderFactory,
  findOverflowScrollParent,
} from '@atlaskit/editor-common';
import { RichMediaLayout } from '@atlaskit/adf-schema';
import { SelectionBasedNodeView } from '../../../nodeviews/';
import { registerCard } from '../pm-plugins/actions';
import ResizableEmbedCard from '../ui/ResizableEmbedCard';
import { createDisplayGrid } from '../../../plugins/grid';
import WithPluginState from '../../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../../width';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { floatingLayouts } from '../../../utils/rich-media-utils';
import { EventDispatcher } from '../../../event-dispatcher';

export class EmbedCardComponent extends React.PureComponent<SmartCardProps> {
  private scrollContainer?: HTMLElement;

  onClick = () => {};

  static contextTypes = {
    contextAdapter: PropTypes.object,
  };

  UNSAFE_componentWillMount() {
    const { view } = this.props;
    const scrollContainer = findOverflowScrollParent(view.dom as HTMLElement);
    this.scrollContainer = scrollContainer || undefined;
  }

  onResolve = (data: { url?: string; title?: string }) => {
    const { getPos, view } = this.props;
    if (!getPos || typeof getPos === 'boolean') {
      return;
    }

    const { title, url } = data;

    // don't dispatch immediately since we might be in the middle of
    // rendering a nodeview
    rafSchedule(() =>
      view.dispatch(
        registerCard({
          title,
          url,
          pos: getPos(),
        })(view.state.tr),
      ),
    )();
  };

  updateSize = (width: number | null, layout: RichMediaLayout) => {
    const { state, dispatch } = this.props.view;
    const pos = typeof this.props.getPos === 'function' && this.props.getPos();
    if (typeof pos !== 'number') {
      return;
    }
    const tr = state.tr.setNodeMarkup(pos, undefined, {
      ...this.props.node.attrs,
      width,
      layout,
    });
    tr.setMeta('scrollIntoView', false);
    dispatch(tr);
    return true;
  };

  private getLineLength = (
    view: EditorView,
    pos: number | boolean,
    originalLineLength: number,
  ): number => {
    if (typeof pos !== 'number' || isNaN(pos) || !view) {
      return originalLineLength;
    }

    const { expand, nestedExpand, layoutColumn } = view.state.schema.nodes;
    const $pos = view.state.doc.resolve(pos);
    const isInsideOfBlockNode = !!findParentNodeOfTypeClosestToPos($pos, [
      expand,
      nestedExpand,
      layoutColumn,
    ]);

    if (isInsideOfBlockNode) {
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

    return originalLineLength;
  };

  render() {
    const {
      node,
      selected,
      cardContext,
      platform,
      allowResizing,
      fullWidthMode,
    } = this.props;
    let {
      url,
      width: nodeWidth,
      layout,
      originalHeight: height,
      originalWidth: width,
    } = node.attrs;

    if (!width || !height) {
      width = DEFAULT_EMBED_CARD_WIDTH;
      height = DEFAULT_EMBED_CARD_HEIGHT;
    }

    const cardProps = {
      layout,
      width,
      height,
      pctWidth: nodeWidth,
      fullWidthMode: fullWidthMode,
    };
    const cardInner = (
      <>
        <WithPluginState
          editorView={this.props.view}
          plugins={{
            widthState: widthPluginKey,
          }}
          render={({ widthState }) => {
            const smartCard = (
              <SmartCard
                url={url}
                appearance="embed"
                isSelected={selected}
                onClick={this.onClick}
                onResolve={this.onResolve}
                showActions={platform === 'web'}
                isFrameVisible
                inheritDimensions={true}
                platform={platform}
                container={this.scrollContainer}
              />
            );

            if (!allowResizing) {
              return (
                <RichMediaWrapper {...cardProps} nodeType="embedCard">
                  {smartCard}
                </RichMediaWrapper>
              );
            }

            return (
              <ResizableEmbedCard
                {...cardProps}
                view={this.props.view}
                getPos={this.props.getPos}
                lineLength={this.getLineLength(
                  this.props.view,
                  typeof this.props.getPos === 'function' &&
                    this.props.getPos(),
                  widthState && widthState.lineLength,
                )}
                gridSize={12}
                containerWidth={widthState.width}
                displayGrid={createDisplayGrid(
                  this.props.eventDispatcher as EventDispatcher,
                )}
                selected={selected}
                updateSize={this.updateSize}
              >
                {smartCard}
              </ResizableEmbedCard>
            );
          }}
        />
      </>
    );

    return (
      <>
        {cardContext ? (
          <cardContext.Provider value={cardContext.value}>
            {cardInner}
          </cardContext.Provider>
        ) : (
          cardInner
        )}
      </>
    );
  }
}

const WrappedBlockCard = Card(EmbedCardComponent, UnsupportedBlock);

export interface EmbedCardNodeViewProps {
  eventDispatcher?: EventDispatcher<any>;
  platform?: CardPlatform;
  allowResizing?: boolean;
  providerFactory?: ProviderFactory;
  fullWidthMode?: boolean;
}

export class EmbedCard extends SelectionBasedNodeView<EmbedCardNodeViewProps> {
  viewShouldUpdate(nextNode: PMNode) {
    if (this.node.attrs !== nextNode.attrs) {
      return true;
    }

    return super.viewShouldUpdate(nextNode);
  }

  render() {
    const {
      eventDispatcher,
      allowResizing,
      platform,
      fullWidthMode,
    } = this.reactComponentProps;

    return (
      <WrappedBlockCard
        node={this.node}
        selected={this.insideSelection()}
        view={this.view}
        eventDispatcher={eventDispatcher}
        getPos={this.getPos}
        allowResizing={allowResizing}
        platform={platform}
        fullWidthMode={fullWidthMode}
      />
    );
  }
}
