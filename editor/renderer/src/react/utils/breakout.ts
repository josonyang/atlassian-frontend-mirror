export const calcBreakoutWidthCss = (
	layout: 'full-width' | 'wide' | 'default',
):
	| '100%'
	| 'min(var(--ak-editor--breakout-container-without-gutter-width), var(--ak-editor--full-width-layout-width))'
	| 'min(var(--ak-editor--breakout-container-without-gutter-width), var(--ak-editor--breakout-wide-layout-width))' => {
	if (layout === 'full-width') {
		return 'min(var(--ak-editor--breakout-container-without-gutter-width), var(--ak-editor--full-width-layout-width))';
	}
	if (layout === 'wide') {
		return 'min(var(--ak-editor--breakout-container-without-gutter-width), var(--ak-editor--breakout-wide-layout-width))';
	}
	return '100%';
};
