import { DRAG_HANDLE_WIDTH, dragHandleGap } from '../ui/consts';

export const getTopPosition = (dom: HTMLElement) => {
	const table = dom.querySelector('table');
	if (table) {
		return `${dom.offsetTop + (table?.offsetTop || 0)}px`;
	} else {
		return `${dom.offsetTop}px`;
	}
};

export const getLeftPosition = (
	dom: HTMLElement,
	type: string,
	innerContainer?: HTMLElement | null,
	macroInteractionUpdates?: boolean,
) => {
	if (!innerContainer) {
		return `${dom.offsetLeft - dragHandleGap(type) - DRAG_HANDLE_WIDTH}px`;
	}

	// There is a showMacroInteractionDesignUpdates prop in extension node wrapper that can add a relative span under the top level div
	// We need to adjust the left offset position of the drag handle to account for the relative span
	const relativeSpan: HTMLElement | null = macroInteractionUpdates
		? dom.querySelector('span.relative')
		: null;
	const leftAdjustment = relativeSpan ? relativeSpan.offsetLeft : 0;

	return getComputedStyle(innerContainer).transform === 'none'
		? `${innerContainer.offsetLeft + leftAdjustment - dragHandleGap(type) - DRAG_HANDLE_WIDTH}px`
		: `${innerContainer.offsetLeft + leftAdjustment - innerContainer.offsetWidth / 2 - dragHandleGap(type) - DRAG_HANDLE_WIDTH}px`;
};
