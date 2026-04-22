import type { FC, RefAttributes } from 'react';

import { fg } from '@atlaskit/platform-feature-flags';

import type { DateTimePickerProps } from '../index';
import { componentWithCondition } from '../internal/ff-component';

import DateTimePickerNew from './date-time-picker-fc-new';
import DateTimePickerOld from './date-time-picker-fc-old';

/**
 * __Date time picker__
 *
 * A date time picker allows the user to select an associated date and time.
 *
 * - [Examples](https://atlassian.design/components/datetime-picker/examples)
 * - [Code](https://atlassian.design/components/datetime-picker/code)
 * - [Usage](https://atlassian.design/components/datetime-picker/usage)
 */
const _default_1: FC<Omit<Omit<DateTimePickerProps, "ref"> & RefAttributes<HTMLElement>, "ref"> & RefAttributes<HTMLElement>> = componentWithCondition(
    () => fg('dst-a11y_fix-dtp-value-calculation'),
    DateTimePickerNew,
    DateTimePickerOld
);
export default _default_1;
