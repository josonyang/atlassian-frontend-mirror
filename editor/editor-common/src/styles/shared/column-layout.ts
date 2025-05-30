// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css } from '@emotion/react';

import { gridMediumMaxWidth } from '@atlaskit/editor-shared-styles';
import { token } from '@atlaskit/tokens';

const columnLayoutSharedStyle = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'[data-layout-section]': {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
		'& > *': {
			flex: 1,
			minWidth: 0,
		},
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
		'& > .unsupportedBlockView-content-wrap': {
			minWidth: 'initial',
		},
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
		[`@media screen and (max-width: ${gridMediumMaxWidth}px)`]: {
			flexDirection: 'column',
		},
	},
});

const columnLayoutResponsiveSharedStyle = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors
	'[data-layout-section]': {
		display: 'flex',
		flexDirection: 'row',
		gap: token('space.100', '8px'),

		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors
		'& > *': {
			flex: 1,
			minWidth: 0,
		},

		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors
		'& > .unsupportedBlockView-content-wrap': {
			minWidth: 'initial',
		},
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'.layout-section-container': {
		containerType: 'inline-size',
		containerName: 'layout-area',
	},
});

const LAYOUT_BREAKPOINT_RENDERER = 629;

/* jest warning: JSDOM version (22) doesn't support the new @container CSS rule */
const columnLayoutResponsiveRendererStyles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors
	'.layout-section-container': {
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors
		'[data-layout-section]': {
			gap: token('space.600', '48px'),
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-container-queries, @atlaskit/ui-styling-standard/no-unsafe-values, @atlaskit/ui-styling-standard/no-imported-style-values
			[`@container layout-area (max-width:${LAYOUT_BREAKPOINT_RENDERER}px)`]: {
				flexDirection: 'column',
				gap: token('space.400', '32px'),
			},
		},
	},
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export {
	columnLayoutSharedStyle,
	columnLayoutResponsiveSharedStyle,
	columnLayoutResponsiveRendererStyles,
};
