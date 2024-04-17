import { getBooleanFF } from '@atlaskit/platform-feature-flags';

import { expandPlugin as legacyExpandPlugin } from './legacyExpand/plugin';
import { expandPlugin as singlePlayerExpandPlugin } from './singlePlayerExpand/plugin';
import type { ExpandPlugin } from './types';

export const expandPlugin: ExpandPlugin = ({ config: options = {}, api }) => {
  if (
    getBooleanFF('platform.editor.single-player-expand') &&
    options?.__livePage
  ) {
    return singlePlayerExpandPlugin({ config: options, api });
  } else {
    return legacyExpandPlugin({ config: options, api });
  }
};
