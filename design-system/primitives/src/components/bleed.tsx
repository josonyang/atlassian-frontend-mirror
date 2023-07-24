/* eslint-disable @atlaskit/design-system/use-primitives */
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { memo, ReactNode } from 'react';

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

type Space =
  | 'space.025'
  | 'space.050'
  | 'space.100'
  | 'space.150'
  | 'space.200';

const blockBleedMap = {
  'space.025': css({
    marginBlock: `calc(-1 * ${token('space.050', '2px')})`,
  }),
  'space.050': css({
    marginBlock: `calc(-1 * ${token('space.050', '4px')})`,
  }),
  'space.100': css({
    marginBlock: `calc(-1 * ${token('space.100', '8px')})`,
  }),
  'space.200': css({
    marginBlock: `calc(-1 * ${token('space.200', '16px')})`,
  }),
  'space.150': css({
    marginBlock: `calc(-1 * ${token('space.150', '12px')})`,
  }),
} as const;

const inlineBleedMap = {
  'space.025': css({
    marginInline: `calc(-1 * ${token('space.025', '2px')})`,
  }),
  'space.050': css({
    marginInline: `calc(-1 * ${token('space.050', '4px')})`,
  }),
  'space.100': css({
    marginInline: `calc(-1 * ${token('space.100', '8px')})`,
  }),
  'space.200': css({
    marginInline: `calc(-1 * ${token('space.200', '16px')})`,
  }),
  'space.150': css({
    marginInline: `calc(-1 * ${token('space.150', '12px')})`,
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
const Bleed = memo(
  ({ children, testId, inline, block, all, xcss }: BleedProps) => {
    const xcssStyles = xcss && parseXcss(xcss);
    return (
      <div
        css={[
          baseStyles,
          (inline || all) && inlineBleedMap[(inline || all) as Space],
          (block || all) && blockBleedMap[(block || all) as Space],
          // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
          xcssStyles,
        ]}
        data-testid={testId}
      >
        {children}
      </div>
    );
  },
);

Bleed.displayName = 'Bleed';

export default Bleed;
