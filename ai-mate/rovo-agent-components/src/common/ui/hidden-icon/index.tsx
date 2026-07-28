import React from 'react';

import EyeOpenStrikethroughIcon from '@atlaskit/icon/core/eye-open-strikethrough';
import type { NewCoreIconProps } from '@atlaskit/icon/types';

export const HiddenIcon = (props: Omit<NewCoreIconProps, 'glyph'>): React.JSX.Element => (
	<EyeOpenStrikethroughIcon {...props} />
);
