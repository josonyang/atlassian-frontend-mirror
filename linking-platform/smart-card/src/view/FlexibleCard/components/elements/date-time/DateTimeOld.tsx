/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import { selectUnit } from '@formatjs/intl-utils';
import { FormattedMessage, type MessageDescriptor, useIntl } from 'react-intl-next';

import { token } from '@atlaskit/tokens';

import { messages } from '../../../../../messages';
import { getTruncateStyles } from '../../utils';

import { type DateTimeProps, type DateTimeType } from './types';

const styles = css(
	{
		color: token('color.text.subtlest', '#626F86'),
		font: token('font.body.UNSAFE_small'),
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	getTruncateStyles(1),
);

type DateTypeVariation = 'relative' | 'absolute';

const typeToDescriptorMap: Record<DateTimeType, Record<DateTypeVariation, MessageDescriptor>> = {
	created: {
		relative: messages.created_on_relative,
		absolute: messages.created_on_absolute,
	},
	modified: {
		relative: messages.modified_on_relative,
		absolute: messages.modified_on_absolute,
	},
	sent: {
		relative: messages.sent_on_relative,
		absolute: messages.sent_on_absolute,
	},
};

/**
 * A base element that displays an ISO Timestamp in text.
 * @internal
 * @param {DateTimeProps} DateTimeProps - The props necessary for the DateTime element.
 * @see CreatedOn
 * @see ModifiedOn
 * @see SentOn
 */
const DateTimeOld = ({
	date,
	name,
	overrideCss,
	type,
	testId = 'smart-element-date-time',
	text,
}: DateTimeProps) => {
	const { formatRelativeTime, formatDate } = useIntl();
	if (!type || !date) {
		return null;
	}
	const isLongerThenWeek = Math.abs(date.getTime() - Date.now()) > 1000 * 60 * 60 * 24 * 7;
	let context: string;
	let typeVariant: DateTypeVariation;
	if (isLongerThenWeek) {
		typeVariant = 'absolute';
		context = formatDate(date, {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	} else {
		const { value, unit } = selectUnit(date, Date.now());
		typeVariant = 'relative';
		context = formatRelativeTime(value, unit, {
			numeric: 'auto',
		});
	}

	return (
		<span
			// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
			css={[styles, overrideCss]}
			data-separator
			data-smart-element={name}
			data-smart-element-date-time
			data-testid={testId}
		>
			{text ? (
				`${text} ${context}`
			) : (
				<FormattedMessage {...typeToDescriptorMap[type][typeVariant]} values={{ context }} />
			)}
		</span>
	);
};

export default DateTimeOld;
