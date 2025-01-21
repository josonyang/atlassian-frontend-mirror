import React, { useMemo } from 'react';

import { type JsonLd } from 'json-ld-types';
import { useIntl } from 'react-intl-next';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import LockLockedIcon from '@atlaskit/icon/core/lock-locked';
import LegacyLockIcon from '@atlaskit/icon/glyph/lock';
import { extractProvider } from '@atlaskit/link-extractors';
import { fg } from '@atlaskit/platform-feature-flags';
import { R300 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { extractRequestAccessContextImproved } from '../../../extractors/common/context/extractAccessContext';
import extractHostname from '../../../extractors/common/hostname/extractHostname';
import { messages } from '../../../messages';
import { toMessage } from '../../../utils/intl-utils';
import { getForbiddenJsonLd } from '../../../utils/jsonld';
import { type ActionItem } from '../../FlexibleCard/components/blocks/types';
import Text from '../../FlexibleCard/components/elements/text';
import { ForbiddenAction } from '../actions/ForbiddenAction';

import { type FlexibleBlockCardProps } from './types';
import UnresolvedView from './unresolved-view';
import { withFlexibleUIBlockCardStyle } from './utils/withFlexibleUIBlockCardStyle';

/**
 * This view represent a Block Card with the 'Forbidden' status.
 * It should have a "Try another account" button that will allow a user to connect another account and view the block card.
 *
 * @see SmartLinkStatus
 * @see FlexibleCardProps
 */
const ForbiddenView = ({
	testId = 'smart-block-forbidden-view',
	...props
}: FlexibleBlockCardProps) => {
	const { createAnalyticsEvent } = useAnalyticsEvents();

	const intl = useIntl();

	const { cardState, onAuthorize, url } = props;
	const details = cardState?.details;
	const cardMetadata = details?.meta ?? getForbiddenJsonLd().meta;
	const provider = extractProvider(details?.data as JsonLd.Data.BaseData);
	const providerName = provider?.text || '';

	const messageContext = useMemo(() => {
		const hostname = <b>{extractHostname(url)}</b>;

		return { product: providerName, hostname };
	}, [providerName, url]);

	const requestAccessContext = useMemo(() => {
		return extractRequestAccessContextImproved({
			jsonLd: cardMetadata,
			url,
			product: providerName,
			createAnalyticsEvent,
		});
	}, [cardMetadata, providerName, url, createAnalyticsEvent]);

	const title = useMemo(() => {
		const descriptor = toMessage(
			messages.invalid_permissions,
			requestAccessContext?.titleMessageKey,
		);
		return intl.formatMessage(descriptor, { product: providerName });
	}, [intl, providerName, requestAccessContext?.titleMessageKey]);

	const actions = useMemo<ActionItem[]>(() => {
		let actionFromAccessContext: ActionItem[] = [];
		const tryAnotherAccountAction = onAuthorize
			? [ForbiddenAction(onAuthorize, 'try_another_account')]
			: [];

		if (requestAccessContext) {
			const { action, callToActionMessageKey } = requestAccessContext;

			actionFromAccessContext =
				action && callToActionMessageKey
					? [
							ForbiddenAction(
								action.promise,
								callToActionMessageKey,
								messageContext,
								requestAccessContext?.buttonDisabled,
							),
						]
					: [];
		}

		return [...tryAnotherAccountAction, ...actionFromAccessContext];
	}, [onAuthorize, requestAccessContext, messageContext]);

	return (
		<UnresolvedView {...props} actions={actions} showPreview={true} testId={testId} title={title}>
			{fg('platform-smart-card-icon-migration') ? (
				<LockLockedIcon
					label="forbidden-lock-icon"
					color={token('color.icon.danger')}
					LEGACY_fallbackIcon={LegacyLockIcon}
					LEGACY_size="small"
					testId={`${testId}-lock-icon`}
				/>
			) : (
				// eslint-disable-next-line @atlaskit/design-system/no-legacy-icons -- TODO - https://product-fabric.atlassian.net/browse/DSP-19497
				<LegacyLockIcon
					label="forbidden-lock-icon"
					size="small"
					primaryColor={token('color.icon.danger', R300)}
					testId={`${testId}-lock-icon`}
				/>
			)}
			<Text
				maxLines={3}
				message={{
					descriptor: toMessage(
						messages.invalid_permissions_description,
						requestAccessContext?.descriptiveMessageKey,
					),
					values: messageContext,
				}}
			/>
		</UnresolvedView>
	);
};
export default withFlexibleUIBlockCardStyle(ForbiddenView);
