/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { type ReactNode } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { token } from '@atlaskit/tokens';

import { parseXcss } from '../xcss/xcss';

import type { BasePrimitiveProps } from './types';

export type BleedProps = {
	/**
	 * Elements to be rendered inside the Flex.
	 */
	children: ReactNode;

	/**
	 * Bleed along both axes.
	 */
	all?: Space;

	/**
	 * Bleed along the inline axis.
	 */
	inline?: Space;

	/**
	 * Bleed along the block axis.
	 */
	block?: Space;
} & BasePrimitiveProps;

const baseStyles = css({
	boxSizing: 'border-box',
});

type Space = 'space.025' | 'space.050' | 'space.100' | 'space.150' | 'space.200';

const blockBleedMap = {
	'space.025': css({
		marginBlock: token('space.negative.025', '-0.125rem'),
	}),
	'space.050': css({
		marginBlock: token('space.negative.050', '-0.25rem'),
	}),
	'space.100': css({
		marginBlock: token('space.negative.100', '-0.5rem'),
	}),
	'space.150': css({
		marginBlock: token('space.negative.150', '-0.75rem'),
	}),
	'space.200': css({
		marginBlock: token('space.negative.200', '-1rem'),
	}),
} as const;

const inlineBleedMap = {
	'space.025': css({
		marginInline: token('space.negative.025', '-0.125rem'),
	}),
	'space.050': css({
		marginInline: token('space.negative.050', '-0.25rem'),
	}),
	'space.100': css({
		marginInline: token('space.negative.100', '-0.5rem'),
	}),
	'space.150': css({
		marginInline: token('space.negative.150', '-0.75rem'),
	}),
	'space.200': css({
		marginInline: token('space.negative.200', '-1rem'),
	}),
} as const;

/**
 * __Bleed__
 *
 * `Bleed` is a primitive layout component that controls negative whitespace.
 *
 * - [Examples](https://atlassian.design/components/primitives/bleed/examples)
 * - [Code](https://atlassian.design/components/primitives/bleed/code)
 */
const Bleed = React.memo(({ children, testId, inline, block, all, xcss }: BleedProps) => {
	const resolvedStyles = parseXcss(xcss);

	return (
		<div
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
			className={resolvedStyles.static}
			css={[
				baseStyles,
				(inline || all) && inlineBleedMap[(inline || all) as Space],
				(block || all) && blockBleedMap[(block || all) as Space],
				resolvedStyles.emotion,
			]}
			data-testid={testId}
		>
			{children}
		</div>
	);
});

Bleed.displayName = 'Bleed';

export default Bleed;
