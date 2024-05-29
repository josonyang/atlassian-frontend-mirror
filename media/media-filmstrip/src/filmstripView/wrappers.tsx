/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { type ReactNode, type MouseEvent, forwardRef } from 'react';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import ArrowRight from '@atlaskit/icon/glyph/arrow-right';
import { MediaFilmStripListItemSelector } from '.';
import { css } from '@emotion/react';
import { N20, N40, B400, B50 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

const filmStripViewStyles = css({
  position: 'relative',
  padding: `${token('space.025', '3px')} 0`,
  borderRadius: '3px',
  '&:hover .arrow': {
    opacity: 1,
  },
  '.ellipsed-text': {
    whiteSpace: 'initial',
  },
});

const filmStripListWrapperStyles = css({
  width: 'inherit',
  overflow: 'hidden',
  padding: `${token('space.025', '2px')} ${token('space.025', '3px')}`,
});

const filmStripListStyles = css({
  margin: 0,
  padding: 0,
  transitionProperty: 'transform',
  transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
  whiteSpace: 'nowrap',
  display: 'inline-block',
});

const filmStripListItemStyles = css({
  listStyleType: 'none',
  margin: 0,
  padding: `0 ${token('space.050', '4px')}`,
  ':first-child': {
    paddingLeft: 0,
  },
  display: 'inline-block',
  verticalAlign: 'middle',
  fontSize: 0,
});

const arrowWrapperStyles = css({
  position: 'absolute',
  // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: token('elevation.surface.overlay', N20),
  borderRadius: '100%',
  display: 'flex',
  cursor: 'pointer',
  transition: 'opacity 0.3s',
  boxShadow: token(
    'elevation.shadow.overlay',
    '0 1px 6px 0 rgba(0, 0, 0, 0.6)',
  ),
  color: token('color.icon', 'black'),
  width: '30px',
  height: '30px',
  justifyContent: 'center',
  opacity: 0,
  '&:hover': {
    color: token('color.text.subtle', 'black'),
    backgroundColor: token('elevation.surface.overlay.hovered', N40),
  },
  '&:active': {
    color: token('color.text.selected', B400),
    backgroundColor: token('color.background.selected', B50),
  },
  svg: {
    height: '30px',
    width: '20px',
  },
});

const arrowLeftWrapperStyles = css(arrowWrapperStyles, {
  left: token('space.100', '8px'),
  svg: {
    paddingRight: token('space.025', '2px'),
  },
});

const arrowRightWrapperStyles = css(arrowWrapperStyles, {
  right: token('space.100', '8px'),
  svg: {
    paddingLeft: token('space.025', '2px'),
  },
});

const shadowStyles = css({
  position: 'absolute',
  zIndex: 10,
  height: '100%',
  top: 0,
  width: '2px',
  backgroundColor: token('color.border', 'rgba(0, 0, 0, 0.2)'),
});

const shadowLeftStyles = css(shadowStyles, {
  left: 0,
});

const shadowRightStyles = css(shadowStyles, {
  right: 0,
});

const ShadowLeft = ({ children }: { children: ReactNode }) => (
  <div css={shadowLeftStyles}>{children}</div>
);

type OnClick = {
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
};

export const ArrowLeftWrapper = ({
  children,
  onClick,
}: {
  children: ReactNode;
} & OnClick) => (
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
  <div css={arrowLeftWrapperStyles} className="arrow" onClick={onClick}>
    {children}
  </div>
);

export const ShadowRight = ({ children }: { children: ReactNode }) => (
  <div css={shadowRightStyles}>{children}</div>
);

export const ArrowRightWrapper = ({
  children,
  onClick,
}: {
  children: ReactNode;
} & OnClick) => (
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
  <div css={arrowRightWrapperStyles} className="arrow" onClick={onClick}>
    {children}
  </div>
);

export const LeftArrow: React.FC<OnClick> = ({ onClick }: OnClick) => (
  <ShadowLeft>
    <ArrowLeftWrapper onClick={onClick}>
      <ArrowLeft label="left" />
    </ArrowLeftWrapper>
  </ShadowLeft>
);

export const RightArrow: React.FC<OnClick> = ({ onClick }: OnClick) => (
  <ShadowRight>
    <ArrowRightWrapper onClick={onClick}>
      <ArrowRight label="right" />
    </ArrowRightWrapper>
  </ShadowRight>
);
export const FilmStripViewWrapper = ({
  children,
  'data-testid': dataTestId,
}: {
  children: ReactNode;
  'data-testid': string | undefined;
}) => (
  <div css={filmStripViewStyles} data-testid={dataTestId}>
    {children}
  </div>
);

type FilmStripListWrapperProps = {
  children: ReactNode;
  onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
  onTouchStart: (event: React.TouchEvent<Element>) => void;
  onTouchMove: (event: React.TouchEvent<Element>) => void;
  onTouchEnd: (event: React.TouchEvent<Element>) => void;
  'data-testid': string | undefined;
};
export const FilmStripListWrapper = forwardRef(
  (
    {
      children,
      onWheel,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      'data-testid': dataTestId,
    }: FilmStripListWrapperProps,
    ref,
  ) => (
    <div
      css={filmStripListWrapperStyles}
      ref={ref as React.RefObject<HTMLDivElement>}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      data-testid={dataTestId}
    >
      {children}
    </div>
  ),
);

type FilmStripListProps = {
  children: ReactNode;
  style: {
    transform: string;
    transitionProperty: string;
    transitionDuration: string;
  };
};

export const FilmStripList = React.forwardRef(
  ({ children, style }: FilmStripListProps, ref) => (
    <ul
      css={filmStripListStyles}
      ref={ref as React.RefObject<HTMLUListElement>}
// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
      style={style}
    >
      {children}
    </ul>
  ),
);

export const FilmStripListItem = ({
  children,
  index,
}: {
  children: ReactNode;
  index: React.Key;
}) => (
  <li
    css={filmStripListItemStyles}
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
    className={MediaFilmStripListItemSelector}
    data-testid="media-filmstrip-list-item"
    key={index}
  >
    {children}
  </li>
);
