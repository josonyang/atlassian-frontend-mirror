import React from 'react';

import NotificationIcon from '@atlaskit/icon/core/notification';
import { token } from '@atlaskit/tokens';

import { SkeletonIconButton } from './components/SkeletonIconButton';
import type { SkeletonNotificationButtonProps } from './skeleton-notification-button';
/**
 * __Nav 4 skeleton notification button__
 *
 * A nav 4 skeleton notification button.
 *
 */
export const Nav4SkeletonNotificationButton = ({
	label = '',
}: SkeletonNotificationButtonProps): React.JSX.Element => (
	<SkeletonIconButton>
		<NotificationIcon label={label} color={token('color.icon')} />
	</SkeletonIconButton>
);
