import {
  UIAnalyticsEvent,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

import type { ArrowKeys, DateObj, ISODate, WeekDay } from './internal/types';

export type ChangeEvent = {
  iso: ISODate;
  type: 'left' | 'up' | 'right' | 'down' | 'prev' | 'next';
} & DateObj;

export type SelectEvent = {
  iso: ISODate;
} & DateObj;

export interface CalendarBaseProps extends WithAnalyticsEventsProps {
  /** The number of the day currently focused. Places border around the date. 0 highlights no date. */
  day?: number;
  /** Default for `day`. */
  defaultDay?: number;
  /** Default for `disabled`. */
  defaultDisabled?: Array<string>;
  /** Default for `month`. */
  defaultMonth?: number;
  /** Default for `previouslySelected`. */
  defaultPreviouslySelected?: Array<string>;
  /** Default for `selected`. */
  defaultSelected?: Array<string>;
  /** Default for `year`. */
  defaultYear?: number;
  /** Takes an array of dates as string in the format 'YYYY-MM-DD'. All dates provided are greyed out.
   This does not prevent these dates being selected. */
  disabled?: Array<string>;
  /** Props to apply to the container. **/
  innerProps?: Object;
  /** The number of the month (from 1 to 12) which the calendar should be on. */
  month?: number;
  /** Function which is called when the calendar is no longer focused. */
  onBlur?: React.FocusEventHandler;
  /** Called when the calendar is navigated. This can be triggered by the keyboard, or by clicking the navigational buttons.
   The 'interface' property indicates the the direction the calendar was navigated whereas the 'iso' property is a string of the format YYYY-MM-DD. */
  onChange?: (event: ChangeEvent, analyticsEvent: UIAnalyticsEvent) => void;
  /** Called when the calendar receives focus. This could be from a mouse event on the container by tabbing into it. */
  onFocus?: React.FocusEventHandler;
  /** Function called when a day is clicked on. Calls with an object that has
  a day, month and year property as numbers, representing the date just clicked.
  It also has an 'iso' property, which is a string of the selected date in the
  format YYYY-MM-DD. */
  onSelect?: (event: SelectEvent, analyticsEvent: UIAnalyticsEvent) => void;
  /** Takes an array of dates as string in the format 'YYYY-MM-DD'. All dates
   provided are given a background color. */
  previouslySelected?: Array<string>;
  /** Takes an array of dates as string in the format 'YYYY-MM-DD'. All dates
   provided are given a background color. */
  selected?: Array<string>;
  /** Value of current day, as a string in the format 'YYYY-MM-DD'. */
  today?: string;
  /** Year to display the calendar for. */
  year?: number;
  locale?: string;
  /** Additional information to be included in the `context` of analytics events */
  analyticsContext?: Record<string, any>;
  /**
   * Start day of the week for the calendar.
   * - `0` sunday (default value)
   * - `1` monday
   * - `2` tuesday
   * - `3` wednesday
   * - `4` thursday
   * - `5` friday
   * - `6` saturday
   */
  weekStartDay?: WeekDay;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   *
   * testId--container - Outermost container containing everything inside calendar
   * testId--month - Container containing all available days for the month
   * testId--previous-month - Button to show next month
   * testId--next-month - Button to show previous month
   * testId--current-month-year - Text containing the current month and year
   * testId--selected-day - The currently selected day (may be missing if a date isn’t selected)
   * */
  testId?: string;
}

export interface CalendarProps extends CalendarBaseProps {
  /** ⚠️ An additional ref which exposes Calendar's internal api's. We kept this for
   * backward compatibility. PLEASE DO NOT USE THIS.
   */
  calendarRef?: React.Ref<CalendarRef>;
}

export interface CalendarRef {
  navigate: (type: ArrowKeys) => void;
}
