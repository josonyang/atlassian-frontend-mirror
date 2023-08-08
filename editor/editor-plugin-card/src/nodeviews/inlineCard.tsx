import React, { EventHandler, KeyboardEvent, MouseEvent } from 'react';

import PropTypes from 'prop-types';
import rafSchedule from 'raf-schd';

import type { InlineNodeViewComponentProps } from '@atlaskit/editor-common/react-node-view';
import {
  findOverflowScrollParent,
  UnsupportedInline,
} from '@atlaskit/editor-common/ui';
import { Card as SmartCard } from '@atlaskit/smart-card';

import { registerCard } from '../pm-plugins/actions';

import { Card, SmartCardProps } from './genericCard';

// eslint-disable-next-line @repo/internal/react/no-class-components
export class InlineCardComponent extends React.PureComponent<SmartCardProps> {
  private scrollContainer?: HTMLElement;
  private onClick: EventHandler<MouseEvent | KeyboardEvent> = () => {};

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
    rafSchedule(() => {
      // prosemirror-bump-fix
      const pos = getPos();

      if (typeof pos !== 'number') {
        return;
      }

      view.dispatch(
        registerCard({
          title,
          url,
          pos,
        })(view.state.tr),
      );
    })();
  };

  onError = (data: { url?: string; err?: Error }) => {
    const { url, err } = data;
    if (err) {
      throw err;
    }
    this.onResolve({ url });
  };

  render() {
    const { node, cardContext, showServerActions, useAlternativePreloader } =
      this.props;

    const { url, data } = node.attrs;
    const card = (
      <span className="card">
        <SmartCard
          key={url}
          url={url}
          data={data}
          appearance="inline"
          onClick={this.onClick}
          container={this.scrollContainer}
          onResolve={this.onResolve}
          onError={this.onError}
          inlinePreloaderStyle={
            useAlternativePreloader ? 'on-right-without-skeleton' : undefined
          }
          showServerActions={showServerActions}
        />
      </span>
    );
    // [WS-2307]: we only render card wrapped into a Provider when the value is ready,
    // otherwise if we got data, we can render the card directly since it doesn't need the Provider
    return cardContext && cardContext.value ? (
      <cardContext.Provider value={cardContext.value}>
        {card}
      </cardContext.Provider>
    ) : data ? (
      card
    ) : null;
  }
}

const WrappedInlineCard = Card(InlineCardComponent, UnsupportedInline);

export type InlineCardNodeViewProps = Pick<
  SmartCardProps,
  'useAlternativePreloader' | 'showServerActions'
>;

export function InlineCardNodeView(
  props: InlineNodeViewComponentProps & InlineCardNodeViewProps,
) {
  const { useAlternativePreloader, node, view, getPos, showServerActions } =
    props;

  return (
    <WrappedInlineCard
      node={node}
      view={view}
      getPos={getPos}
      showServerActions={showServerActions}
      useAlternativePreloader={useAlternativePreloader}
    />
  );
}