/** @jsx jsx */
import React, { useRef } from 'react';

import { css, jsx } from '@emotion/react';

import { B100, N30 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { borderRadius } from './constants';

const readViewContainerStyles = css({
  lineHeight: 1,
});

const editButtonStyles = css({
  display: 'block',
  margin: token('space.0', '0px'),
  padding: token('space.0', '0px'),
  appearance: 'none',
  background: 'transparent',
  border: 0,
  lineHeight: 1,
  outline: '0',
  '&:focus + div': {
    border: `2px solid ${token('color.border.focused', B100)}`,
  },
});

const readViewWrapperStyles = css({
  display: 'inline-block',
  boxSizing: 'border-box',
  width: 'auto',
  maxWidth: '100%',
  border: '2px solid transparent',
  borderRadius: borderRadius,
  transition: 'background 0.2s',
  '&:hover': {
    background: token('color.background.neutral.subtle.hovered', N30),
  },
});

const readViewFitContainerWidthStyles = css({
  width: '100%',
});

const DRAG_THRESHOLD = 5;

interface ReadViewProps {
  editButtonLabel: string;
  onEditRequested: () => void;
  postReadViewClick: () => void;
  editButtonRef: React.RefObject<HTMLButtonElement>;
  readViewFitContainerWidth?: boolean;
  readView: () => React.ReactNode;
}

const ReadView = ({
  editButtonLabel,
  onEditRequested,
  postReadViewClick,
  editButtonRef,
  readViewFitContainerWidth,
  readView,
}: ReadViewProps) => {
  const startX = useRef(0);
  const startY = useRef(0);

  const mouseHasMovedAfterMouseDown = (event: {
    clientX: number;
    clientY: number;
  }) => {
    return (
      Math.abs(startX.current - event.clientX) >= DRAG_THRESHOLD ||
      Math.abs(startY.current - event.clientY) >= DRAG_THRESHOLD
    );
  };

  const onReadViewClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    const element = event.target as HTMLElement;
    /** If a link is clicked in the read view, default action should be taken */
    if (
      element.tagName.toLowerCase() !== 'a' &&
      !mouseHasMovedAfterMouseDown(event)
    ) {
      event.preventDefault();
      onEditRequested();
      postReadViewClick();
    }
  };

  return (
    <div css={readViewContainerStyles}>
      <button
        css={editButtonStyles}
        aria-label={editButtonLabel}
        type="button"
        onClick={onEditRequested}
        ref={editButtonRef}
      />
      <div
        css={[
          readViewWrapperStyles,
          readViewFitContainerWidth && readViewFitContainerWidthStyles,
        ]}
        /**
         * It is not normally acceptable to add click handlers to non-interactive elements
         * as this is an accessibility anti-pattern. However, because this instance is
         * account for clicking on links that may be embedded within inline-edit and not
         * creating an inaccessible custom element, we can add role="presentation" so that
         * there is no negative impacts to assistive technologies.
         * (Why links are embeeded in inline-edit is for another day...)
         */
        role="presentation"
        onClick={onReadViewClick}
        onMouseDown={(e) => {
          startX.current = e.clientX;
          startY.current = e.clientY;
        }}
        data-read-view-fit-container-width={readViewFitContainerWidth}
      >
        {readView()}
      </div>
    </div>
  );
};

export default ReadView;
