import { panelNodeAdf } from '../__fixtures__/full-width-adf';
import { nodeToReact as looselyLazyNodes } from '../../react/nodes/loosely-lazy';

import { generateRendererComponent } from '../__helpers/rendererComponents';

export const PanelRenderer = generateRendererComponent({
	document: panelNodeAdf,
	appearance: 'full-width',
});

export const PanelRendererWithReactLooselyLazy = generateRendererComponent({
	document: panelNodeAdf,
	appearance: 'full-width',
	nodeComponents: looselyLazyNodes,
});
