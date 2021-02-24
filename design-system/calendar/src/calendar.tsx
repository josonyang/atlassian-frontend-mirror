/** @jsx jsx */
import React, { forwardRef, memo, useMemo } from 'react';

import { jsx } from '@emotion/core';

import { usePlatformLeafEventHandler } from '@atlaskit/analytics-next/usePlatformLeafEventHandler';
import GlobalTheme, { GlobalThemeTokens } from '@atlaskit/theme/components';
import { ThemeModes } from '@atlaskit/theme/types';

import DateComponent from './internal/components/date';
import Heading from './internal/components/heading';
import { blankObject, blankStringArray } from './internal/constants';
import useControlledDateState from './internal/hooks/use-controlled-date-state';
import useFocusing from './internal/hooks/use-focusing';
import useHandleDateChange from './internal/hooks/use-handle-date-change';
import useHandleDateSelect from './internal/hooks/use-handle-date-select';
import useInternalRef from './internal/hooks/use-internal-ref';
import useLocale from './internal/hooks/use-locale';
import useUniqueId from './internal/hooks/use-unique-id';
import { announcerStyle, wrapperStyle } from './internal/styles/container';
import {
  tableStyle,
  tbodyStyle,
  theadStyle,
  thStyle,
} from './internal/styles/table';
import getWeeks from './internal/utils/get-weeks';
import noop from './internal/utils/noop';
import type { CalendarProps } from './types';
import { name as packageName, version as packageVersion } from './version.json';

export interface InternalProps extends CalendarProps {
  mode: ThemeModes;
}

const analyticsAttributes = {
  componentName: 'calendar',
  packageName,
  packageVersion,
};

const CalendarWithMode = forwardRef(function Calendar(
  {
    day = undefined,
    defaultDay = 0,
    defaultDisabled = blankStringArray,
    defaultMonth = 0,
    defaultPreviouslySelected = blankStringArray,
    defaultSelected = blankStringArray,
    defaultYear = 0,
    disabled = undefined,
    innerProps = blankObject,
    month = undefined,
    onBlur = noop,
    onChange = noop,
    onFocus = noop,
    onSelect = noop,
    previouslySelected = undefined,
    selected = undefined,
    today = undefined,
    locale = 'en-US',
    year = undefined,
    analyticsContext,
    weekStartDay = 0,
    testId,
    internalRef,
    mode,
  }: InternalProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    day: [dayValue, setDayValue],
    month: [monthValue, setMonthValue],
    year: [yearValue, setYearValue],
    today: [todayValue],
    disabled: [disabledValue],
    selected: [selectedValue, setSelectedValue],
    previous: [previouslySelectedValue, setPreviouslySelectedValue],
  } = useControlledDateState({
    day,
    defaultDay,
    month,
    defaultMonth,
    year,
    defaultYear,
    today,
    disabled,
    defaultDisabled,
    selected,
    defaultSelected,
    previouslySelected,
    defaultPreviouslySelected,
  });

  const onChangeWithAnalytics = usePlatformLeafEventHandler({
    fn: onChange,
    action: 'changed',
    analyticsData: analyticsContext,
    ...analyticsAttributes,
  });

  const { navigate, handleClickNext, handleClickPrev } = useHandleDateChange({
    day: [dayValue, setDayValue],
    month: [monthValue, setMonthValue],
    year: [yearValue, setYearValue],
    onChange: onChangeWithAnalytics,
  });

  const onSelectWithAnalytics = usePlatformLeafEventHandler({
    fn: onSelect,
    action: 'selected',
    analyticsData: analyticsContext,
    ...analyticsAttributes,
  });

  const { handleClickDay, handleContainerKeyDown } = useHandleDateSelect({
    day: [dayValue, setDayValue],
    month: [monthValue, setMonthValue],
    year: [yearValue, setYearValue],
    selected: [selectedValue, setSelectedValue],
    previous: [, setPreviouslySelectedValue],
    onSelect: onSelectWithAnalytics,
    navigate,
  });

  const { handleContainerBlur, handleContainerFocus } = useFocusing({
    day: [dayValue, setDayValue],
    onFocus,
    onBlur,
  });

  useInternalRef(internalRef, {
    navigate,
  });

  const weeks = useMemo(
    () =>
      getWeeks({
        day: dayValue,
        month: monthValue,
        year: yearValue,
        today: todayValue,
        disabled: disabledValue,
        selected: selectedValue,
        previouslySelected: previouslySelectedValue,
        weekStartDay,
      }),
    [
      dayValue,
      disabledValue,
      monthValue,
      previouslySelectedValue,
      selectedValue,
      todayValue,
      yearValue,
      weekStartDay,
    ],
  );

  const announceId = useUniqueId('announce');
  const { monthsLong, daysShort } = useLocale({ locale, weekStartDay });

  const styles = useMemo(
    () => ({
      wrapper: wrapperStyle(mode),
      th: thStyle(mode),
    }),
    [mode],
  );

  return (
    <div
      {...innerProps}
      onBlur={handleContainerBlur}
      onFocus={handleContainerFocus}
      onKeyDown={handleContainerKeyDown}
      role="presentation"
      data-testid={testId && `${testId}--container`}
      ref={ref}
    >
      <div
        css={announcerStyle}
        id={announceId}
        aria-live="assertive"
        aria-relevant="text"
      >
        {new Date(yearValue, monthValue, dayValue).toString()}
      </div>
      <div
        css={styles.wrapper}
        aria-describedby={announceId}
        aria-label="calendar"
        role="grid"
        tabIndex={0}
      >
        <Heading
          // The month number needs to be translated to index in the month
          // name array e.g. 1 (January) -> 0
          monthLongTitle={monthsLong[monthValue - 1]}
          year={yearValue}
          handleClickNext={handleClickNext}
          handleClickPrev={handleClickPrev}
          testId={testId}
        />
        <table css={tableStyle} role="presentation">
          <thead css={theadStyle}>
            <tr>
              {daysShort.map(shortDay => (
                <th css={styles.th} key={shortDay}>
                  {shortDay}
                </th>
              ))}
            </tr>
          </thead>
          <tbody css={tbodyStyle} data-testid={testId && `${testId}--month`}>
            {weeks.map(week => (
              <tr key={week.id}>
                {week.values.map(
                  ({
                    id,
                    isDisabled,
                    isFocused,
                    isToday,
                    month,
                    isPreviouslySelected,
                    isSelected,
                    isSiblingMonth,
                    year,
                    day,
                  }) => (
                    <DateComponent
                      key={id}
                      disabled={isDisabled}
                      focused={isFocused}
                      isToday={isToday}
                      month={month}
                      onClick={handleClickDay}
                      previouslySelected={isPreviouslySelected}
                      selected={isSelected}
                      sibling={isSiblingMonth}
                      year={year}
                      mode={mode}
                      testId={testId}
                    >
                      {day}
                    </DateComponent>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

const Calendar = memo(
  forwardRef(function Calendar(
    props: CalendarProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    return (
      <GlobalTheme.Consumer>
        {({ mode }: GlobalThemeTokens) => (
          <CalendarWithMode {...props} mode={mode} ref={ref} />
        )}
      </GlobalTheme.Consumer>
    );
  }),
);

Calendar.displayName = 'Calendar';

export default Calendar;