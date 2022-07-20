/** @jsx jsx */
import Popup from '@atlaskit/popup';
import { jsx } from '@emotion/core';
import React, { FC, useCallback, useRef } from 'react';
import { useSmartLinkActions } from '../../../state/hooks-external/useSmartLinkActions';
import { useSmartLinkRenderers } from '../../../state/renderers';
import { useSmartCardState as useLinkState } from '../../../state/store';
import HoverCardContent from '../components/HoverCardContent';
import { HoverCardContainer } from '../styled';
import { HoverCardComponentProps } from '../types';
import { SMART_CARD_ANALYTICS_DISPLAY } from '../utils';

export const hoverCardClassName = 'smart-links-hover-preview';

export const HoverCardComponent: FC<HoverCardComponentProps> = ({
  children,
  url,
  analyticsHandler,
  analytics,
}) => {
  const delay = 300;
  const [isOpen, setIsOpen] = React.useState(false);
  const fadeOutTimeoutId = useRef<NodeJS.Timeout>();
  const fadeInTimeoutId = useRef<NodeJS.Timeout>();
  const cardOpenTime = useRef<number>();

  const renderers = useSmartLinkRenderers();
  const linkState = useLinkState(url);
  const hoverDisplay = 'card';
  const invokeMethod = 'mouse_hover';

  const hideCard = useCallback(() => {
    //Check its previously open to avoid firing events when moving between the child and hover card components
    if (isOpen === true && cardOpenTime.current) {
      const hoverTime = Date.now() - cardOpenTime.current;
      analytics.ui.hoverCardDismissedEvent('card', hoverTime, 'mouse_hover');
    }
    setIsOpen(false);
  }, [analytics.ui, isOpen]);

  const initHideCard = useCallback(() => {
    if (fadeInTimeoutId.current) {
      clearTimeout(fadeInTimeoutId.current);
    }
    fadeOutTimeoutId.current = setTimeout(() => hideCard(), delay);
  }, [hideCard]);

  const initShowCard = useCallback(() => {
    if (fadeOutTimeoutId.current) {
      clearTimeout(fadeOutTimeoutId.current);
    }
    fadeInTimeoutId.current = setTimeout(() => {
      //Check if its previously closed to avoid firing events when moving between the child and hover card components
      if (isOpen === false) {
        cardOpenTime.current = Date.now();
        analytics.ui.hoverCardViewedEvent(hoverDisplay, invokeMethod);
      }
      setIsOpen(true);
    }, delay);
  }, [delay, isOpen, analytics.ui]);

  const linkActions = useSmartLinkActions({
    url,
    appearance: SMART_CARD_ANALYTICS_DISPLAY,
    analyticsHandler,
  });
  const onActionClick = useCallback(
    (actionId) => {
      if (actionId === 'preview-content') {
        hideCard();
      }
    },
    [hideCard],
  );

  // Stop hover preview content to propagate event to parent.
  const onClick = useCallback((e) => e.stopPropagation(), []);

  return (
    <Popup
      testId="hover-card"
      isOpen={isOpen}
      onClose={hideCard}
      placement="bottom-start"
      content={({ update }) => (
        <div
          onMouseEnter={initShowCard}
          onMouseLeave={initHideCard}
          onClick={onClick}
          css={HoverCardContainer}
          // class name for trello to exclude click events
          className={hoverCardClassName}
        >
          <HoverCardContent
            analytics={analytics}
            cardActions={linkActions}
            cardState={linkState}
            onActionClick={onActionClick}
            onResolve={update}
            renderers={renderers}
            url={url}
          />
        </div>
      )}
      trigger={(triggerProps) => (
        <span
          {...triggerProps}
          onMouseEnter={initShowCard}
          onMouseLeave={initHideCard}
        >
          {children}
        </span>
      )}
      zIndex={511} // Temporary fix for Confluence inline comment on editor mod has z-index of 500, Jira issue view has z-index of 510
    />
  );
};
