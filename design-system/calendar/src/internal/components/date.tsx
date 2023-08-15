/** @jsx jsx */
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { css, jsx } from '@emotion/react';

import noop from '@atlaskit/ds-lib/noop';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';
import { Grid } from '@atlaskit/primitives';
import { ThemeModes } from '@atlaskit/theme/types';

import type { TabIndex } from '../../types';
import { dateCellStyles as getDateCellStyles } from '../styles/date';
import type { DateObj } from '../types';

interface DateProps {
  children: number;
  isDisabled?: boolean;
  isFocused?: boolean;
  isToday?: boolean;
  dayLong: string;
  month: number;
  monthLong: string;
  onClick?: ({ day, month, year }: DateObj) => void;
  isPreviouslySelected?: boolean;
  isSelected?: boolean;
  isSibling?: boolean;
  year: number;
  mode?: ThemeModes;
  shouldSetFocus: boolean;
  tabIndex: TabIndex;
  testId?: string;
}

const Date = memo(
  forwardRef<HTMLButtonElement, DateProps>(function Date(
    {
      children: day,
      isDisabled = false,
      isFocused = false,
      isToday = false,
      dayLong,
      month,
      monthLong,
      onClick = noop,
      isPreviouslySelected = false,
      isSelected = false,
      isSibling = false,
      year,
      mode,
      shouldSetFocus,
      tabIndex,
      testId,
    },
    ref,
  ) {
    const dateRef = useRef({ day, month, year, isDisabled });

    useEffect(() => {
      dateRef.current = {
        day,
        month,
        year,
        isDisabled,
      };
    }, [day, month, year, isDisabled]);

    const focusRef = useRef(null);

    useEffect(() => {
      if (
        getBooleanFF(
          'platform.design-system-team.calendar-keyboard-accessibility_967h1',
        ) &&
        isFocused &&
        shouldSetFocus &&
        focusRef.current
      ) {
        (focusRef.current as HTMLButtonElement).focus();
      }
    }, [isFocused, shouldSetFocus]);

    const handleClick = useCallback(() => {
      const {
        day: dayValue,
        month: monthValue,
        year: yearValue,
        isDisabled: isDisabledValue,
      } = dateRef.current;

      if (!isDisabledValue) {
        onClick({
          day: dayValue,
          month: monthValue,
          year: yearValue,
        });
      }
    }, [onClick]);

    const dateCellStyles = useMemo(() => css(getDateCellStyles(mode)), [mode]);

    return getBooleanFF(
      'platform.design-system-team.calendar-keyboard-accessibility_967h1',
    ) ? (
      <Grid role="gridcell" alignItems="center">
        <button
          // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
          css={dateCellStyles}
          aria-current={isToday ? 'date' : undefined}
          aria-disabled={isDisabled || undefined}
          aria-label={`${day}, ${dayLong} ${monthLong} ${year}`}
          aria-pressed={isSelected ? 'true' : 'false'}
          tabIndex={isFocused ? tabIndex : -1}
          type="button"
          onClick={handleClick}
          ref={focusRef}
          data-disabled={isDisabled || undefined}
          data-focused={isFocused || undefined}
          data-prev-selected={isPreviouslySelected || undefined}
          data-selected={isSelected || undefined}
          data-sibling={isSibling || undefined}
          data-today={isToday || undefined}
          data-testid={
            testId &&
            (isSelected ? `${testId}--selected-day` : `${testId}--day`)
          }
        >
          {day}
        </button>
      </Grid>
    ) : (
      <button
        // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
        css={dateCellStyles}
        aria-selected={isSelected ? 'true' : 'false'}
        tabIndex={isSelected ? 0 : -1}
        type="button"
        role="gridcell"
        onClick={handleClick}
        ref={ref}
        data-disabled={isDisabled || undefined}
        data-focused={isFocused || undefined}
        data-prev-selected={isPreviouslySelected || undefined}
        data-selected={isSelected || undefined}
        data-sibling={isSibling || undefined}
        data-today={isToday || undefined}
        data-testid={
          testId && (isSelected ? `${testId}--selected-day` : `${testId}--day`)
        }
      >
        {day}
      </button>
    );
  }),
);

Date.displayName = 'Date';

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default Date;
