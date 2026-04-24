// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled
import { css, type CSSObject, type SerializedStyles } from '@emotion/react';

import { UNSAFE_BREAKPOINTS_ORDERED_LIST } from './constants';
import { media } from './media';
import type { Breakpoint, ResponsiveCSSObject } from './types';

/**
 * Build a map of breakpoints to css with media queries and nested styles.
 *
 * @internal Not intended to be used outside of DST at this stage.
 * @experimental Not intended to be used outside of DST at this stage.
 *
 * @example
 * A map to build optional `display:none` for consumption on a div.
 * ```ts
 * const hideMediaQueries = buildAboveMediaQueryCSS({ display: 'none' });
 *
 * const Component = ({ hideAtBreakpoints: ('xs' | 'sm')[], children: ReactNode }) => {
 *   return <div css={hideAtBreakpoints.map(b => hideMediaQueries[b])}>{children}</div>;
 * }
 * ```
 *
 * This roughly builds a map that will look roughly like this (if done manually):
 * ```ts
 * {
 *   xxs: css({ '@media all': { display: 'none' } }),
 *   xs: css({ '@media (min-width: 30rem)': { display: 'none' } }),
 *   sm: css({ '@media (min-width: 48rem)': { display: 'none' } }),
 * }
 * ```
 */
export const UNSAFE_buildAboveMediaQueryCSS = (
	/**
	 * The desired CSS to place inside of the media query.
	 * This can either be a css object directly or functional with `breakpoint` as the arg to return a css object.
	 */
	input: CSSObject | ((breakpoint: Breakpoint) => CSSObject),
): Required<Partial<Record<Breakpoint, SerializedStyles>>> => {
	return UNSAFE_BREAKPOINTS_ORDERED_LIST.reduce(
		(acc, breakpoint) => ({
			...acc,
			[breakpoint]: css({
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
				[media.above[breakpoint]]: typeof input === 'function' ? input(breakpoint) : input,
			}),
		}),
		{} as Required<ResponsiveCSSObject>,
	);
};
