import React from 'react';

import AiChatIcon from '@atlaskit/icon/core/ai-chat';
import type { NewCoreIconProps } from '@atlaskit/icon/types';

export const ChatPillIcon = (
	props: Omit<NewCoreIconProps, 'label' | 'glyph'>,
): React.JSX.Element => <AiChatIcon {...props} label="" />;
