import React, { useMemo } from 'react';

import { FormattedMessage } from 'react-intl-next';

import ButtonOld from '@atlaskit/button';
import Button from '@atlaskit/button/new';
import { fg } from '@atlaskit/platform-feature-flags';

import { messages } from '../../../../messages';
import { toMessage } from '../../../../utils/intl-utils';
import UnresolvedView from '../unresolved-view';

import { ForbiddenSVG } from './forbidden-svg';
import { type ForbiddenViewProps } from './types';

const ForbiddenView = ({
	context,
	onAuthorize,
	accessContext,
	testId = 'embed-card-forbidden-view',
	...unresolvedViewProps
}: ForbiddenViewProps) => {
	const { icon, image, text = '' } = context ?? {};
	const {
		accessType,
		hostname,
		titleMessageKey,
		descriptiveMessageKey,
		callToActionMessageKey,
		action,
	} = accessContext ?? {};

	const values = useMemo(() => {
		const product = context?.text ?? '';
		return {
			context: product,
			product,
			hostname: <b>{hostname}</b>,
		};
	}, [hostname, context?.text]);

	/**
	 * if there is a request access context, but no action to perform, do not show any button.
	 * By default, a "Try another account" button shows, but with request access context, we don't
	 * want to encourage users to try another account, if their request is already pending, etc.
	 */
	const button = useMemo(() => {
		const onEmbedCardClick = action?.promise ?? onAuthorize;
		if (!onEmbedCardClick) {
			return null;
		}

		const ButtonComponent = fg('platform-smart-card-remove-legacy-button') ? Button : ButtonOld;

		return (
			<ButtonComponent
				testId={`button-${action?.id || 'connect-other-account'}`}
				appearance="primary"
				onClick={onEmbedCardClick}
				isDisabled={accessType === 'PENDING_REQUEST_EXISTS'}
			>
				<FormattedMessage
					{...toMessage(messages.try_another_account, callToActionMessageKey)}
					values={values}
				/>
			</ButtonComponent>
		);
	}, [accessType, action?.id, action?.promise, callToActionMessageKey, onAuthorize, values]);

	return (
		<UnresolvedView
			{...unresolvedViewProps}
			icon={icon}
			image={image ?? <ForbiddenSVG />}
			testId={testId}
			text={text}
			title={
				<FormattedMessage
					{...toMessage(messages.invalid_permissions, titleMessageKey)}
					values={values}
				/>
			}
			description={
				<FormattedMessage
					{...toMessage(messages.invalid_permissions_description, descriptiveMessageKey)}
					values={values}
				/>
			}
			button={button}
		/>
	);
};

export default ForbiddenView;
