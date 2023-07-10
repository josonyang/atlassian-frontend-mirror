/** @jsx jsx */
import Popup from '@atlaskit/popup';
import { jsx } from '@emotion/react';
import React, { FC, useCallback, useMemo, useRef, useEffect } from 'react';
import { useSmartLinkActions } from '../../../state/hooks-external/useSmartLinkActions';
import { useSmartLinkRenderers } from '../../../state/renderers';
import { useSmartCardState as useLinkState } from '../../../state/store';
import HoverCardContent from '../components/HoverCardContent';
import { CARD_GAP_PX, HOVER_CARD_Z_INDEX } from '../styled';
import { HoverCardComponentProps } from '../types';
import { CardDisplay } from '../../../constants';
import { SmartLinkAnalyticsContext } from '../../../utils/analytics/SmartLinkAnalyticsContext';
import { useSmartCardActions } from '../../../state/actions';
import { useSmartLinkAnalytics } from '../../../state/analytics';

const HOVER_CARD_SOURCE = 'smartLinkPreviewHoverCard';

const FADE_IN_DELAY = 500;
const FADE_OUT_DELAY = 300;
const RESOLVE_DELAY = 100;

export const HoverCardComponent: FC<HoverCardComponentProps> = ({
  children,
  url,
  id = '',
  analyticsHandler,
  canOpen = true,
  closeOnChildClick = false,
  hidePreviewButton = false,
  showServerActions = false,
  allowEventPropagation = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const fadeOutTimeoutId = useRef<ReturnType<typeof setTimeout>>();
  const fadeInTimeoutId = useRef<ReturnType<typeof setTimeout>>();
  const resolveTimeOutId = useRef<ReturnType<typeof setTimeout>>();
  const mousePos = useRef<{ x: number; y: number }>();
  const popupOffset = useRef<[number, number]>();
  const parentSpan = useRef<HTMLSpanElement>(null);

  const renderers = useSmartLinkRenderers();
  const linkState = useLinkState(url);
  const analytics = useSmartLinkAnalytics(url, undefined, id);
  const { loadMetadata } = useSmartCardActions(id, url, analytics);

  const setMousePosition = useCallback(
    (event) => {
      if (isOpen && canOpen) {
        return;
      }
      mousePos.current = { x: event.clientX, y: event.clientY };
    },
    [canOpen, isOpen],
  );

  const hideCard = useCallback(() => {
    setIsOpen(false);
  }, []);

  const initHideCard = useCallback(() => {
    if (fadeInTimeoutId.current) {
      clearTimeout(fadeInTimeoutId.current);
      // because fadeInTimeoutId.current is set by mouseOver which triggers multiple times in a hover,
      // we want to clear out the reference to signify that there's no in-progress fade in event
      fadeInTimeoutId.current = undefined;
    }

    if (resolveTimeOutId.current) {
      clearTimeout(resolveTimeOutId.current);
      // because resolveTimeOutId.current is set by mouseOver which triggers multiple times in a hover,
      // we want to clear out the reference to signify that there's no in-progress resolve event
      resolveTimeOutId.current = undefined;
    }
    fadeOutTimeoutId.current = setTimeout(() => hideCard(), FADE_OUT_DELAY);
  }, [hideCard]);

  // clearing out the timeouts in order to avoid memory leaks
  // in case the component unmounts before they execute
  useEffect(() => {
    return () => {
      if (fadeOutTimeoutId.current) {
        clearTimeout(fadeOutTimeoutId.current);
      }

      if (fadeInTimeoutId.current) {
        clearTimeout(fadeInTimeoutId.current);
        // because fadeInTimeoutId.current is set by mouseOver which triggers multiple times in a hover,
        // we want to clear out the reference to signify that there's no in-progress fade in event
        fadeInTimeoutId.current = undefined;
      }

      if (resolveTimeOutId.current) {
        clearTimeout(resolveTimeOutId.current);
        // because resolveTimeOutId.current is set by mouseOver which triggers multiple times in a hover,
        // we want to clear out the reference to signify that there's no in-progress resolve event
        resolveTimeOutId.current = undefined;
      }
    };
  }, []);

  // we want to initiate resolve a bit earlier for standalone cards
  // to minimize the loading state
  const initResolve = useCallback(() => {
    // this check covers both non-SSR (status) & SSR case (metadataStatus)
    const isLinkUnresolved =
      linkState.status === 'pending' || !linkState.metadataStatus;

    if (!resolveTimeOutId.current && isLinkUnresolved) {
      resolveTimeOutId.current = setTimeout(() => {
        loadMetadata();
      }, RESOLVE_DELAY);
    }
  }, [linkState, loadMetadata]);

  const initShowCard = useCallback(
    (event) => {
      // clearing out fadeOutTimeoutId in case it's already counting down to hide the card
      if (fadeOutTimeoutId.current) {
        clearTimeout(fadeOutTimeoutId.current);
      }

      // starting to resolve the hover card if the store doesn't have data about the link yet
      initResolve();

      //Set mouse position in the case it's not already set by onMouseMove, as in the case of scrolling
      setMousePosition(event);

      //If these are undefined then popupOffset is undefined and we fallback to default bottom-start placement
      if ((!isOpen || !canOpen) && parentSpan.current && mousePos.current) {
        const { bottom, left } = parentSpan.current.getBoundingClientRect();
        popupOffset.current = [
          mousePos.current.x - left,
          mousePos.current.y - bottom + CARD_GAP_PX,
        ];
      }

      if (!isOpen && !fadeInTimeoutId.current) {
        // setting a timeout to show a Hover Card after delay runs out
        fadeInTimeoutId.current = setTimeout(() => {
          setIsOpen(true);
        }, FADE_IN_DELAY);
      }
    },
    [canOpen, initResolve, isOpen, setMousePosition],
  );

  const linkActions = useSmartLinkActions({
    url,
    appearance: CardDisplay.HoverCardPreview,
    analyticsHandler,
    origin: HOVER_CARD_SOURCE,
  });

  const filteredActions = useMemo(() => {
    return hidePreviewButton
      ? linkActions.filter((action) => action.id !== 'preview-content')
      : linkActions;
  }, [hidePreviewButton, linkActions]);

  const onActionClick = useCallback(
    (actionId) => {
      if (actionId === 'preview-content') {
        hideCard();
      }
    },
    [hideCard],
  );

  // Stop hover preview content to propagate event to parent.
  const onChildClick = useCallback(
    (e) => {
      if (!allowEventPropagation) {
        e.stopPropagation();
      }
      if (closeOnChildClick) {
        hideCard();
      }
    },
    [allowEventPropagation, closeOnChildClick, hideCard],
  );

  const content = useCallback(
    ({ update }) => {
      const hoverCardContentProps = {
        onMouseEnter: initShowCard,
        onMouseLeave: initHideCard,
        cardActions: filteredActions,
        cardState: linkState,
        onActionClick,
        onResolve: update,
        renderers,
        showServerActions,
        url,
        id,
      };

      return (
        <SmartLinkAnalyticsContext
          url={url}
          display={CardDisplay.HoverCardPreview}
          id={id}
          source={HOVER_CARD_SOURCE}
        >
          <HoverCardContent {...hoverCardContentProps} />
        </SmartLinkAnalyticsContext>
      );
    },
    [
      initHideCard,
      initShowCard,
      filteredActions,
      linkState,
      onActionClick,
      renderers,
      showServerActions,
      url,
      id,
    ],
  );

  const trigger = useCallback(
    (triggerProps) => (
      <span ref={parentSpan}>
        <span
          {...triggerProps}
          onMouseOver={initShowCard}
          onMouseLeave={initHideCard}
          onMouseMove={setMousePosition}
          onClick={onChildClick}
          data-testid="hover-card-trigger-wrapper"
        >
          {children}
        </span>
      </span>
    ),
    [children, initHideCard, initShowCard, onChildClick, setMousePosition],
  );

  return (
    <Popup
      testId="hover-card"
      isOpen={isOpen && canOpen}
      onClose={hideCard}
      placement="bottom-start"
      offset={popupOffset.current}
      autoFocus={false}
      content={content}
      trigger={trigger}
      zIndex={HOVER_CARD_Z_INDEX}
    />
  );
};
