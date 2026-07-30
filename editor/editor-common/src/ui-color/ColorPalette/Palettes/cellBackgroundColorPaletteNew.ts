import {
	tableBackgroundBorderColor,
	tableBackgroundColorPaletteNew,
} from '@atlaskit/adf-schema/tableNodes';

import getColorMessage from './getColorMessage';
import paletteMessages from './paletteMessages';
import type { PaletteColor } from './type';

/**
 * Expanded 10-column (30-entry) UI palette that adds lime, orange, and magenta columns
 * and updates the bold row to use `subtler.hovered` design tokens.
 * This is a superset of the default {@link cellBackgroundColorPalette}.
 */
const cellBackgroundColorPaletteNew: Array<PaletteColor> = [];

tableBackgroundColorPaletteNew.forEach((label, color) => {
	// eslint-disable-next-line @atlassian/perf-linting/no-expensive-split-replace -- Ignored via go/ees017 (to be fixed)
	const key = label.toLowerCase().replace(' ', '-');
	const message = getColorMessage(paletteMessages, key);

	cellBackgroundColorPaletteNew.push({
		value: color,
		label,
		border: tableBackgroundBorderColor,
		message,
	});
});

export default cellBackgroundColorPaletteNew;
