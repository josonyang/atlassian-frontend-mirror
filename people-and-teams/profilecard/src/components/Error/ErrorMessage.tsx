import React, { useEffect } from 'react';

import { type AnalyticsEventPayload } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/new';
import CrossCircleIcon from '@atlaskit/icon/core/cross-circle';
import IconError from '@atlaskit/icon/glyph/cross-circle';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Text } from '@atlaskit/primitives';

import { ErrorTitle, ErrorWrapper } from '../../styled/Error';
import { type ProfileCardErrorType } from '../../types';
import { profileCardRendered } from '../../util/analytics';

interface Props {
	reload?: () => void | undefined;
	errorType?: ProfileCardErrorType;
	fireAnalytics: (payload: AnalyticsEventPayload) => void;
}

const ErrorMessage = (props: Props) => {
	const errorType = props.errorType || { reason: 'default' };
	const errorReason = errorType.reason;

	const { fireAnalytics, reload } = props;

	const hasRetry = !!reload;

	useEffect(() => {
		fireAnalytics(
			profileCardRendered('user', 'error', {
				hasRetry,
				errorType: errorReason,
			}),
		);
	}, [errorReason, fireAnalytics, hasRetry]);

	const errorContent = () => {
		if (errorReason === 'NotFound') {
			return <ErrorTitle>The user is no longer available for the site</ErrorTitle>;
		}

		return (
			<ErrorTitle>
				Oops, looks like we’re having issues
				<br />
				{reload && (
					<Text color="color.text.subtlest">Try again and we’ll give it another shot</Text>
				)}
			</ErrorTitle>
		);
	};

	return (
		<ErrorWrapper testId="profilecard-error">
			<CrossCircleIcon label="icon error" LEGACY_fallbackIcon={IconError} LEGACY_size="xlarge" />
			{errorContent()}
			{reload && <Button onClick={reload}>Try again</Button>}
		</ErrorWrapper>
	);
};

export default ErrorMessage;
