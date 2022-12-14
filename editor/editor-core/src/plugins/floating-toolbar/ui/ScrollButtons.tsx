/** @jsx jsx */
import React, { useEffect, useState, useRef } from 'react';
import { css, jsx } from '@emotion/react';
import { Node } from 'prosemirror-model';
import { IntlShape } from 'react-intl-next';
import { N30 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import { gridSize } from '@atlaskit/theme/constants';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large';
import Button from './Button';
import messages from './messages';
import rafSchedule from 'raf-schd';

const akGridSize = gridSize();

const toolbarScrollButtons = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${akGridSize / 2}px;
  padding: ${akGridSize / 2}px ${akGridSize}px;
  border-left: solid ${token('color.border', N30)} 1px;
  flex-shrink: 0;
  align-items: center;
`;

const LeftIcon = ChevronLeftLargeIcon as React.ComponentClass<any>;
const RightIcon = ChevronRightLargeIcon as React.ComponentClass<any>;

export interface Props {
  intl: IntlShape;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  node: Node;
  disabled: boolean;
}

export default ({ intl, scrollContainerRef, node, disabled }: Props) => {
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const [needScroll, setNeedScroll] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scheduledSetCanScroll = rafSchedule(() => {
    const { scrollLeft, scrollWidth, offsetWidth } =
      scrollContainerRef.current!;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + offsetWidth < scrollWidth - 1); // -1 to account for half pixel
  });

  const onScroll = () => scheduledSetCanScroll();

  const scrollLeft = () => {
    const { width: scrollContainerWidth = 0 } =
      scrollContainerRef.current?.getBoundingClientRect() || {};

    const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;

    // scroll to current position - scroll container width
    let scrollTo = scrollLeft - scrollContainerWidth;

    scrollContainerRef.current?.scrollTo({
      top: 0,
      left: scrollTo,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    const { width: scrollContainerWidth = 0 } =
      scrollContainerRef.current?.getBoundingClientRect() || {};

    const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;

    // scroll to current position + scroll container width
    let scrollTo = scrollLeft + scrollContainerWidth;

    scrollContainerRef.current?.scrollTo({
      top: 0,
      left: scrollTo,
      behavior: 'smooth',
    });
  };

  const resizeObserver = new ResizeObserver((t) => {
    const widthNeededToShowAllItems =
      scrollContainerRef.current?.scrollWidth || 0;
    const availableSpace = (
      scrollContainerRef.current?.parentNode as HTMLElement
    )?.offsetWidth;

    if (availableSpace >= widthNeededToShowAllItems) {
      setNeedScroll(false);
    } else {
      setNeedScroll(true);
      onScroll();
    }
  });

  useEffect(() => {
    const scrollContainerRefCurrent = scrollContainerRef.current;
    onScroll();
    if (scrollContainerRefCurrent) {
      // enable/disable scroll buttons depending on scroll position
      scrollContainerRefCurrent.addEventListener('scroll', onScroll);

      // watch for toolbar resize and show/hide scroll buttons if needed
      resizeObserver.observe(scrollContainerRefCurrent);

      // reset scroll position when switching from one node with toolbar to another
      scrollContainerRefCurrent.scrollTo({
        left: 0,
      });
    }

    return () => {
      if (scrollContainerRefCurrent) {
        scrollContainerRefCurrent.removeEventListener('scroll', onScroll);
        resizeObserver.unobserve(scrollContainerRefCurrent);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, scrollContainerRef]);

  return needScroll ? (
    <div
      ref={buttonsContainerRef}
      css={toolbarScrollButtons}
      className="scroll-buttons"
    >
      <Button
        title={intl.formatMessage(messages.floatingToolbarScrollLeft)}
        icon={
          <LeftIcon
            label={intl.formatMessage(messages.floatingToolbarScrollLeft)}
          />
        }
        onClick={scrollLeft}
        disabled={!canScrollLeft || disabled}
      />
      <Button
        title={intl.formatMessage(messages.floatingToolbarScrollRight)}
        icon={
          <RightIcon
            label={intl.formatMessage(messages.floatingToolbarScrollRight)}
          />
        }
        onClick={scrollRight}
        disabled={!canScrollRight || disabled}
      />
    </div>
  ) : null;
};
