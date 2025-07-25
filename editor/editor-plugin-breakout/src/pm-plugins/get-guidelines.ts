import memoizeOne from 'memoize-one';

import type { GuidelineConfig } from '@atlaskit/editor-common/guideline';
import {
	EXPAND_CONTAINER_PADDING,
	LAYOUT_COLUMN_PADDING,
	resizerHandleThumbWidth,
} from '@atlaskit/editor-common/styles';
import type { EditorContainerWidth } from '@atlaskit/editor-common/types';
import { type NodeType } from '@atlaskit/editor-prosemirror/model';
import {
	akEditorGutterPaddingDynamic,
	akEditorGutterPadding,
	akEditorGutterPaddingReduced,
	akEditorFullPageNarrowBreakout,
	akEditorCalculatedWideLayoutWidth,
	akEditorFullWidthLayoutWidth,
	akEditorDefaultLayoutWidth,
} from '@atlaskit/editor-shared-styles';
import { fg } from '@atlaskit/platform-feature-flags';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';

const WIDTHS = {
	MIN: akEditorDefaultLayoutWidth,
	WIDE: akEditorCalculatedWideLayoutWidth,
	MAX: akEditorFullWidthLayoutWidth,
};

export const GUIDELINE_KEYS = {
	lineLengthLeft: 'grid_left',
	lineLengthRight: 'grid_right',
	wideLeft: 'wide_left',
	wideRight: 'wide_right',
	fullWidthLeft: 'full_width_left',
	fullWidthRight: 'full_width_right',
} as const;

const AK_NESTED_DND_GUTTER_OFFSET = 8;
const roundToNearest = (value: number, interval: number = 0.5): number =>
	Math.round(value / interval) * interval;

export const getGuidelines = memoizeOne(
	(
		isResizing: boolean,
		newWidth: number,
		getEditorWidth: () => EditorContainerWidth | undefined,
		nodeType?: NodeType | undefined,
	) => {
		const guidelines: GuidelineConfig[] = [];
		if (!isResizing) {
			return guidelines;
		}

		let innerPaddingOffset = 0;
		if (nodeType) {
			switch (nodeType.name) {
				case 'expand':
					innerPaddingOffset =
						EXPAND_CONTAINER_PADDING + resizerHandleThumbWidth + AK_NESTED_DND_GUTTER_OFFSET;
					break;
				case 'layoutSection':
					innerPaddingOffset = LAYOUT_COLUMN_PADDING + AK_NESTED_DND_GUTTER_OFFSET;
					break;
				default:
					break;
			}
		}
		const { width, lineLength } = getEditorWidth() || {};

		const padding =
			width &&
			width <= akEditorFullPageNarrowBreakout &&
			expValEquals('platform_editor_preview_panel_responsiveness', 'isEnabled', true)
				? akEditorGutterPaddingReduced
				: akEditorGutterPaddingDynamic();

		const fullWidth = width
			? Math.min(WIDTHS.MAX, width - 2 * padding - akEditorGutterPadding)
			: undefined;

		if (fg('platform_editor_breakout_resizing_hello_release')) {
			guidelines.push({
				key: GUIDELINE_KEYS.lineLengthLeft,
				position: { x: -roundToNearest(WIDTHS.MIN / 2 + innerPaddingOffset) },
				active: newWidth === WIDTHS.MIN,
			});
			guidelines.push({
				key: GUIDELINE_KEYS.lineLengthRight,
				position: { x: roundToNearest(WIDTHS.MIN / 2 + innerPaddingOffset) },
				active: newWidth === WIDTHS.MIN,
			});
		} else {
			if (lineLength) {
				guidelines.push({
					key: GUIDELINE_KEYS.lineLengthLeft,
					position: { x: -roundToNearest(lineLength / 2 + innerPaddingOffset) },
					active: newWidth === lineLength,
				});
				guidelines.push({
					key: GUIDELINE_KEYS.lineLengthRight,
					position: { x: roundToNearest(lineLength / 2 + innerPaddingOffset) },
					active: newWidth === lineLength,
				});
			}
		}

		guidelines.push({
			key: GUIDELINE_KEYS.wideLeft,
			position: { x: -roundToNearest(WIDTHS.WIDE / 2 + innerPaddingOffset) },
			active: newWidth === WIDTHS.WIDE,
		});
		guidelines.push({
			key: GUIDELINE_KEYS.wideRight,
			position: { x: roundToNearest(WIDTHS.WIDE / 2 + innerPaddingOffset) },
			active: newWidth === WIDTHS.WIDE,
		});

		if (fullWidth) {
			guidelines.push({
				key: GUIDELINE_KEYS.fullWidthLeft,
				position: { x: -roundToNearest(fullWidth / 2 + innerPaddingOffset) },
				active: newWidth === fullWidth,
			});
			guidelines.push({
				key: GUIDELINE_KEYS.fullWidthRight,
				position: { x: roundToNearest(fullWidth / 2 + innerPaddingOffset) },
				active: newWidth === fullWidth,
			});
		}

		return guidelines;
	},
);
