/**
 * Resolves a CSS length value to a pixel number using a hidden DOM probe.
 *
 * Used by the JS positioning fallback: consumer offsets can be numbers,
 * `${n}px` strings, tokenised `var(--ds-space-100, 8px)` strings, `calc()`
 * expressions, viewport units, etc. Parsing arbitrary CSS in JS is fragile
 * (and impossible for `calc(var(...))` without a layout context), so we let
 * the browser do the math.
 *
 * The probe is appended to `container` so it inherits the same containing
 * block, font size, and custom-property scope as the popover. We use `width`
 * because it accepts any CSS length, including negative `calc()` results
 * (negative widths are clamped to 0 — see note below).
 *
 * Cost: one synchronous reflow per call. The fallback only resolves on
 * placement/offset changes, not on every scroll/resize update, so this is
 * not a hot path.
 */
export function resolveCssLengthToPixels({
	value,
	container,
}: {
	value: number | string;
	container: HTMLElement;
}): number {
	if (typeof value === 'number') {
		return value;
	}

	// Fast path: bare `${n}px` strings come from the consumer normalisation
	// in `getPlacement`. Avoid a reflow when we can.
	const pxMatch = value.match(/^(-?\d+(?:\.\d+)?)px$/);
	if (pxMatch) {
		return Number(pxMatch[1]);
	}

	const probe = container.ownerDocument.createElement('div');
	probe.style.position = 'absolute';
	probe.style.visibility = 'hidden';
	probe.style.pointerEvents = 'none';
	probe.style.height = '0';
	probe.style.padding = '0';
	probe.style.border = '0';
	// `width` clamps negatives to 0; use `margin-left` instead so signs are
	// preserved. `getComputedStyle` returns the resolved pixel value for
	// margin-* properties even when the source was a token / calc / var.
	probe.style.marginLeft = value;
	container.appendChild(probe);
	const resolved = parseFloat(getComputedStyle(probe).marginLeft);
	container.removeChild(probe);
	return Number.isFinite(resolved) ? resolved : 0;
}
