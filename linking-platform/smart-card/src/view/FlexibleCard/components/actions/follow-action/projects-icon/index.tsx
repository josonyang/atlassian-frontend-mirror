import React from 'react';

import { type IconProps } from '@atlaskit/icon';
import ProjectIcon from '@atlaskit/icon/core/project';
import LegacyProjectsIcon from '@atlaskit/legacy-custom-icons/project-icon';
import { token } from '@atlaskit/tokens';

export const ProjectsIcon = (props: IconProps) => (
	<ProjectIcon
		color={token('color.icon', '#44546F')}
		LEGACY_fallbackIcon={LegacyProjectsIcon}
		LEGACY_margin="10px"
		spacing="spacious"
		{...props}
	/>
);
