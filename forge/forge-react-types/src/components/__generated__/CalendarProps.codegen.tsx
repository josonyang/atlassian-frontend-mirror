/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - CalendarProps
 *
 * @codegen <<SignedSource::f5a5568104eee5eb1fc1238a8248e9e5>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit/calendar/__generated__/index.partial.tsx <<SignedSource::500d3df7d07464aeb6502c6c1e32094f>>
 */
/* eslint @repo/internal/codegen/signed-source-integrity: "warn" */

import React from 'react';
import PlatformCalendar from '@atlaskit/calendar';

type PlatformCalendarProps = React.ComponentProps<typeof PlatformCalendar>;

export type CalendarProps = Pick<
  PlatformCalendarProps,
  'day' | 'defaultDay' | 'defaultMonth' | 'defaultYear' | 'defaultPreviouslySelected' | 'defaultSelected' | 'disabled' | 'maxDate' | 'minDate' | 'nextMonthLabel' | 'onBlur' | 'onChange' | 'onFocus' | 'onSelect' | 'previouslySelected' | 'previousMonthLabel' | 'selected' | 'today' | 'year' | 'locale' | 'testId' | 'weekStartDay' | 'tabIndex'
>;