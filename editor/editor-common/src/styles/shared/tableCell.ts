/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css } from '@emotion/react';

import { tableBackgroundColorNames } from '@atlaskit/adf-schema';
import { hexToEditorBackgroundPaletteColor } from '@atlaskit/editor-palette';
// This is used in order to support usage of DS tokens. Table cell background-color
// is set inline in '@atlaskit/adf-schema' and the color value is stored in ADF so
// it is not possible to use tokens there without polluting ADF.
// As table cell backgrounds are set inline, this should not break mobile as
// hexToEditorBackgroundPaletteColor() outputs a css variable with fallback hex.
const mapBackgroundColors = () => {
	let cssString = '';
	tableBackgroundColorNames.forEach((value, key) => {
		const paletteColorValue = hexToEditorBackgroundPaletteColor(value);
		if (paletteColorValue) {
			cssString += `
        td[colorname='${key}' i],
        th[colorname='${key}' i] {
          background-color: ${paletteColorValue} !important;
        }
      `;
		}
	});
	return cssString;
};
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
export const tableCellBackgroundStyleOverride = () => css(mapBackgroundColors());
