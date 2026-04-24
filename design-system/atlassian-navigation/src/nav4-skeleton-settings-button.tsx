import React from 'react';

import SettingsIcon from '@atlaskit/icon/core/settings';
import { token } from '@atlaskit/tokens';

import { SkeletonIconButton } from './components/SkeletonIconButton';
import type { SkeletonSettingsButtonProps } from './skeleton-settings-button';

/**
 * __Nav 4 skeleton settings button__
 *
 * A nav 4 skeleton settings button
 */
export const Nav4SkeletonSettingsButton = ({
	label = '',
}: SkeletonSettingsButtonProps): React.JSX.Element => (
	<SkeletonIconButton>
		<SettingsIcon label={label} color={token('color.icon')} />
	</SkeletonIconButton>
);
