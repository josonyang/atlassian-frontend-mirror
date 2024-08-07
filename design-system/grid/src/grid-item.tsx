/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type CSSProperties, type FC, useMemo } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import {
	type Breakpoint,
	type ResponsiveObject,
	UNSAFE_BREAKPOINTS_ORDERED_LIST,
	UNSAFE_buildAboveMediaQueryCSS,
} from '@atlaskit/primitives/responsive';

import { GRID_COLUMNS } from './config';
import type { GridItemProps, SpanObject, StartObject } from './types';

// when in doubt simply span all columns
const baseGridItemStyles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	gridColumn: `1 / span ${GRID_COLUMNS}`,
});

const hideMediaQueries = UNSAFE_buildAboveMediaQueryCSS({
	display: 'none',
});
const gridSpanMediaQueries = UNSAFE_buildAboveMediaQueryCSS((breakpoint) => ({
	display: 'block', // override the display that might be cascaded in from `hideMediaQueries`
	gridColumnEnd: `span var(--grid-item-${breakpoint}-span, 12)`,
}));
const gridStartMediaQueries = UNSAFE_buildAboveMediaQueryCSS((breakpoint) => ({
	gridColumnStart: `var(--grid-item-${breakpoint}-start, 'auto')`,
}));

/**
 * Build a set of responsive css variables given a responsive object
 *
 */
function buildCSSVarsFromConfig<
	T extends ResponsiveObject<any> = SpanObject | StartObject,
	K extends string = 'start' | 'span',
>({
	responsiveObject,
	key,
	prefix,
	isValidBreakpointValue = () => true,
}: {
	responsiveObject: T;
	key: K;
	prefix: string;
	/**
	 * Is the value valid to assign to a CSS variable?  We have scenarios where the value should not map across into a CSS Var.
	 *
	 * By default this is not required as regardless of this check, `undefined` values are always treated as invalid and ignored.
	 *
	 * @example
	 * `span="none"` should not exist as `grid-column-end: span none` is invalid
	 * ```ts
	 * buildCSSVarsFromConfig(
	 *   { xxs: 'none', md: 6 },
	 *   'span',
	 *   (value) => value !== 'none'`
	 * )
	 * ```
	 */
	isValidBreakpointValue?: (value: T[Breakpoint]) => boolean;
}): CSSProperties {
	/**
	 * This coerces an object of `{ xxs: 12, sm: 'auto', … }` down to `[['xxs', 12], ['sm', 'auto], …]`.  Split out for readability.
	 */
	const entries = Object.entries(responsiveObject) as [keyof T, T[keyof T]][];

	return entries.reduce((acc, [breakpoint, value]) => {
		if (typeof value === 'undefined' || !isValidBreakpointValue(value)) {
			return acc;
		}

		return {
			...acc,
			[`--${prefix}-${String(breakpoint)}-${key}` as const]: value,
		};
	}, {});
}

/**
 * __Grid item__
 *
 * A grid item is designed to be nested in a `Grid`. Grid items can span one or many columns.
 *
 * - [Code](https://atlassian.design/components/grid)
 *
 * @example
 * ```jsx
 * import Grid, { GridItem } from '@atlaskit/grid';
 *
 * const App = () => (
 *   <Grid>
 *     <GridItem span="6">half-width content</GridItem>
 *     <GridItem span="6">half-width content</GridItem>
 *   </Grid>
 * );
 * ```
 */
export const GridItem: FC<GridItemProps> = ({
	testId,
	children,
	start: startProp = 'auto',
	span: spanProp = 12,
}) => {
	// If `prop` isn't a responsive object, we set the value against the `xs` breakpoint, eg. `span={6}` is the same as `span={{ xxs: 6 }}`
	const span: SpanObject = typeof spanProp === 'object' ? spanProp : { xxs: spanProp };
	const spanDependencyComparison = JSON.stringify(span); // to compare `span` changes in a `useMemo` deps array (used a few times)
	const spanStyles = useMemo(
		() =>
			buildCSSVarsFromConfig({
				responsiveObject: span,
				key: 'span',
				prefix: 'grid-item',
				// We don't want a css var like `--grid-item-xs-span: none` as it's invalid and unused.
				isValidBreakpointValue: (value) => value !== 'none',
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps -- `span` will change references easily, but we still need to allow content or key changes to update
		[spanDependencyComparison],
	);

	// If `prop` isn't a responsive object, we set the value against the `xs` breakpoint, eg. `start={6}` is the same as `start={{ xxs: 6 }}`
	const start: StartObject = typeof startProp === 'object' ? startProp : { xxs: startProp };
	const startDependencyComparison = JSON.stringify(start); // to compare `start` changes in a `useMemo` deps array (used a few times)
	const startStyles = useMemo(
		() =>
			buildCSSVarsFromConfig({
				responsiveObject: start,
				key: 'start',
				prefix: 'grid-item',
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps -- `start` will change references easily, but we still need to allow content or key changes to update
		[startDependencyComparison],
	);

	/**
	 * Generate all media queries for breakpoints that are available during this render.  This is to avoid rendering media queries for all breakpoints if none are used.
	 */
	const mediaQueryStyles = useMemo(
		() =>
			UNSAFE_BREAKPOINTS_ORDERED_LIST.reduce(
				(acc, breakpoint) => {
					const styles: ReturnType<typeof css>[] = [];

					if (breakpoint in span) {
						if (span[breakpoint] === 'none') {
							styles.push(hideMediaQueries[breakpoint]);
						} else {
							styles.push(gridSpanMediaQueries[breakpoint]);
						}
					}
					if (breakpoint in start) {
						styles.push(gridStartMediaQueries[breakpoint]);
					}

					if (!styles.length) {
						return acc;
					}

					return [...acc, ...styles];
				},
				[] as ReturnType<typeof css>[],
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps -- `start` and `span` will change references easily, but we still need to allow content or key changes to update.  This _should_ be more performant than running on every render as I don't expect this to change.
		[spanDependencyComparison, startDependencyComparison],
	);

	return (
		<div
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
			style={{ ...startStyles, ...spanStyles }}
			css={[baseGridItemStyles, ...mediaQueryStyles]}
			data-testid={testId}
		>
			{children}
		</div>
	);
};
