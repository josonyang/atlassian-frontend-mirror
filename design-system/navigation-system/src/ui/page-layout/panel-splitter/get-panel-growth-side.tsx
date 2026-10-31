/**
 * Returns the physical side the panel grows towards when the splitter is dragged away from it.
 *
 * `position: 'end'` grows towards the inline-end, which is the right in left-to-right languages, and
 * `position: 'start'` grows towards the inline-start.
 */
export function getPanelGrowthSide({
	position,
	textDirection,
}: {
	position: 'start' | 'end';
	textDirection: 'ltr' | 'rtl';
}): 'left' | 'right' {
	const isGrowingTowardsInlineEnd = position === 'end';
	const isInlineEndOnTheRight = textDirection === 'ltr';

	return isGrowingTowardsInlineEnd === isInlineEndOnTheRight ? 'right' : 'left';
}
