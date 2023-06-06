import React, { forwardRef, memo, SyntheticEvent } from 'react';

import {
  UIAnalyticsEvent,
  usePlatformLeafEventHandler,
} from '@atlaskit/analytics-next';
import Box from '@atlaskit/ds-explorations/box';
import noop from '@atlaskit/ds-lib/noop';
import useControlled from '@atlaskit/ds-lib/use-controlled';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large';
import Inline from '@atlaskit/primitives/inline';

import Navigator from './internal/components/navigator';
import PageComponent from './internal/components/page';
import renderDefaultEllipsis from './internal/components/render-ellipsis';
import { emptyObject } from './internal/constants';
import collapseRange from './internal/utils/collapse-range';
import { PaginationPropTypes } from './types';

const analyticsAttributes = {
  componentName: 'pagination',
  packageName: process.env._PACKAGE_NAME_ as string,
  packageVersion: process.env._PACKAGE_VERSION_ as string,
};

interface OnChangeData {
  event: SyntheticEvent;
  selectedPageIndex: number;
}

function InnerPagination<T>(
  {
    components = emptyObject,
    defaultSelectedIndex = 0,
    selectedIndex,
    label = 'pagination',
    pageLabel = 'page',
    previousLabel = 'previous',
    nextLabel = 'next',
    style = emptyObject,
    max = 7,
    onChange = noop,
    pages,
    getPageLabel,
    renderEllipsis = renderDefaultEllipsis,
    analyticsContext,
    testId,
  }: PaginationPropTypes<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  const [selectedIndexValue, setSelectedIndexValue] = useControlled(
    selectedIndex,
    () => defaultSelectedIndex || 0,
  );

  const onChangeWithAnalytics = usePlatformLeafEventHandler<OnChangeData>({
    fn: (value: OnChangeData, analyticsEvent: UIAnalyticsEvent) => {
      const { event, selectedPageIndex } = value;
      if (selectedIndex === undefined) {
        setSelectedIndexValue(selectedPageIndex);
      }
      if (onChange) {
        onChange(event, pages[selectedPageIndex], analyticsEvent);
      }
    },
    action: 'changed',
    actionSubject: 'pageNumber',
    analyticsData: analyticsContext,
    ...analyticsAttributes,
  });

  const transform = (page: T, currPageIndex: number, testId?: string) => {
    const selectedPage = pages[selectedIndexValue];
    const pageIndexLabel = `${pageLabel} ${
      getPageLabel ? getPageLabel(page, currPageIndex) : page
    }`;

    return (
      <PageComponent
        key={`page-${
          getPageLabel ? getPageLabel(page, currPageIndex) : currPageIndex
        }`}
        component={components!.Page}
        onClick={(event) =>
          onChangeWithAnalytics({ event, selectedPageIndex: currPageIndex })
        }
        aria-current={page === selectedPage ? 'page' : undefined}
        aria-label={pageIndexLabel}
        isSelected={page === selectedPage}
        page={page}
        testId={
          testId &&
          `${testId}--${
            page === selectedPage ? 'current-' : ''
          }page-${currPageIndex}`
        }
      >
        {getPageLabel ? getPageLabel(page, currPageIndex) : page}
      </PageComponent>
    );
  };

  return (
    <Box
      testId={testId}
      UNSAFE_style={style}
      ref={ref}
      aria-label={label}
      as="nav"
    >
      <Inline space="space.0" alignBlock="center">
        <Navigator
          key="left-navigator"
          component={components!.Previous}
          onClick={(event: SyntheticEvent) =>
            onChangeWithAnalytics({
              event,
              selectedPageIndex: selectedIndexValue - 1,
            })
          }
          isDisabled={selectedIndexValue === 0}
          iconBefore={<ChevronLeftLargeIcon label="" />}
          aria-label={previousLabel}
          pages={pages}
          testId={testId && `${testId}--left-navigator`}
        />
        {collapseRange(
          pages,
          selectedIndexValue,
          {
            max: max!,
            ellipsis: renderEllipsis!,
            transform,
          },
          testId,
        )}
        <Navigator
          key="right-navigator"
          component={components!.Next}
          onClick={(event: SyntheticEvent) =>
            onChangeWithAnalytics({
              event,
              selectedPageIndex: selectedIndexValue + 1,
            })
          }
          isDisabled={selectedIndexValue === pages.length - 1}
          iconBefore={<ChevronRightLargeIcon label="" />}
          aria-label={nextLabel}
          pages={pages}
          testId={testId && `${testId}--right-navigator`}
        />
      </Inline>
    </Box>
  );
}

const Pagination = forwardRef(InnerPagination);

export default memo(Pagination) as typeof InnerPagination;
