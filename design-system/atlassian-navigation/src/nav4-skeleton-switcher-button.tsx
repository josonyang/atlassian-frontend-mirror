import React from 'react';

import AppSwitcherIcon from '@atlaskit/icon/core/app-switcher';
import { token } from '@atlaskit/tokens';

import { SkeletonIconButton } from './components/SkeletonIconButton';
import type { SkeletonSwitcherButtonProps } from './skeleton-switcher-button';

/**
 * __Nav 4 skeleton switcher button__
 *
 * A nav 4 skeleton switcher button
 */
export const Nav4SkeletonSwitcherButton = ({
	label = '',
}: SkeletonSwitcherButtonProps): React.JSX.Element => (
	<SkeletonIconButton>
		<AppSwitcherIcon label={label} spacing="spacious" color={token('color.icon')} />
	</SkeletonIconButton>
);
