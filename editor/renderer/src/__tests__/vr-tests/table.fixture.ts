import { tableAdf, tableWithNumberedColumnAdf } from '../__fixtures__/full-width-adf';
import { overflowTableFullWidth, overflowTableWide } from '../__fixtures__/overflow.adf';
import tableWithWrappedNodesAdf from '../__fixtures__/table-with-wrapped-nodes.adf.json';
import tableComplexSelectionsAdf from '../__fixtures__/table-complex-selections.adf.json';
import { tableColorAdf } from '../__fixtures__/table-color';

import { generateRendererComponent } from '../__helpers/rendererComponents';
import type { ComponentType } from 'react';

export const TableRenderer: ComponentType<any> = generateRendererComponent({
	document: tableAdf,
	appearance: 'full-width',
});

export const TableRendererWithNumberedColumnFullWidth: ComponentType<any> =
	generateRendererComponent({
		document: tableWithNumberedColumnAdf,
		appearance: 'full-width',
	});

export const WideTableRendererFullWidth: ComponentType<any> = generateRendererComponent({
	document: overflowTableWide,
	appearance: 'full-width',
});

export const FullWidthTableRendererFullWidth: ComponentType<any> = generateRendererComponent({
	document: overflowTableFullWidth,
	appearance: 'full-width',
	UNSTABLE_allowTableAlignment: true,
	UNSTABLE_allowTableResizing: true,
});

export const TableRendererWideOverflow: ComponentType<any> = generateRendererComponent({
	document: overflowTableWide,
	appearance: 'full-page',
	UNSTABLE_allowTableResizing: true,
});

export const TableRendererFullWidthOverflow: ComponentType<any> = generateRendererComponent({
	document: overflowTableFullWidth,
	appearance: 'full-page',
	UNSTABLE_allowTableResizing: true,
});

export const TableRendererWrappedNodes: ComponentType<any> = generateRendererComponent({
	document: tableWithWrappedNodesAdf,
	appearance: 'full-page',
});

export const TableRendererComplexNodes: ComponentType<any> = generateRendererComponent({
	document: tableComplexSelectionsAdf,
	appearance: 'full-page',
});

export const TableRendererBackgroundColor: ComponentType<any> = generateRendererComponent({
	document: tableColorAdf,
	appearance: 'full-page',
});

export const TableRendereWithNumberedColumnFullPage: ComponentType<any> = generateRendererComponent(
	{
		document: tableWithNumberedColumnAdf,
		appearance: 'full-page',
	},
);

export const TableRendererFullWidthComment: ComponentType<any> = generateRendererComponent({
	document: overflowTableFullWidth,
	appearance: 'comment',
});

export const TableRendererWideComment: ComponentType<any> = generateRendererComponent({
	document: overflowTableWide,
	appearance: 'comment',
});

export const TableRendererComment: ComponentType<any> = generateRendererComponent({
	document: tableAdf,
	appearance: 'comment',
});

export const TableRendererWithNumberedColumnComment: ComponentType<any> = generateRendererComponent(
	{
		document: tableWithNumberedColumnAdf,
		appearance: 'comment',
	},
);

export const TableRendererWithoutAppearance: ComponentType<any> = generateRendererComponent({
	document: tableAdf,
	appearance: undefined,
});

export const TableRendererFullWidthWithoutAppearance: ComponentType<any> =
	generateRendererComponent({
		document: overflowTableFullWidth,
		appearance: undefined,
	});

export const TableRendererWideWithoutAppearance: ComponentType<any> = generateRendererComponent({
	document: overflowTableWide,
	appearance: undefined,
});

export const TableRendererWithNumberedColumnWithoutAppearance: ComponentType<any> =
	generateRendererComponent({
		document: tableWithNumberedColumnAdf,
		appearance: undefined,
	});
