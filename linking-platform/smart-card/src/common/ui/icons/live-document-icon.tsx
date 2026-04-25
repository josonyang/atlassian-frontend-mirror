// This file is the FG-OFF fallback for platform_sl_icons_refactor.
// Delete this file when platform_sl_icons_refactor is cleaned up.
import type { FC } from 'react';

import LiveDocIconSmall from '@atlaskit/icon-object/glyph/page-live-doc/16';
import LiveDocIconLarge from '@atlaskit/icon-object/glyph/page-live-doc/24';

import type { SmartLinkSize } from '../../../constants';

import { renderIconPerSize } from './utils';

const LiveDocumentIconWithColor: FC<
	{
		label: string;
		testId?: string;
	} & {
		size?: SmartLinkSize;
	}
> = renderIconPerSize(LiveDocIconSmall, LiveDocIconLarge);
LiveDocumentIconWithColor.displayName = 'LiveDocumentIconWithColor';

export default LiveDocumentIconWithColor;
