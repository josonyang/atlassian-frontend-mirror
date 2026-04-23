import { snapshot } from '@af/visual-regression';

import AllPlacements from '../../examples/all-placements';

const opts = { drawsOutsideBounds: true } as const;

snapshot(AllPlacements, { ...opts, description: 'all-placements-default-offset' });
