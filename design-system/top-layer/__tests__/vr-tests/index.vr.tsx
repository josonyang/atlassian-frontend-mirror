import { snapshot } from '@af/visual-regression';

import Placement from '../../examples/02-placement';
import NestedPopups from '../../examples/03-nested-popovers';
import BasicDialog from '../../examples/04-basic-dialog';
import PopupSurfaceVariants from '../../examples/08-popover-surface-variants';
import AllPlacements from '../../examples/all-placements';

const opts = { drawsOutsideBounds: true } as const;

snapshot(Placement, opts);
snapshot(NestedPopups, opts);
snapshot(BasicDialog, opts);
snapshot(PopupSurfaceVariants, opts);
snapshot(AllPlacements, opts);
