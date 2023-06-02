// TODO: Switch from ERT to ts-morph when this is completed and has reasonable adoption: https://product-fabric.atlassian.net/browse/DSP-10364
import React, { ReactNode } from 'react';

import { As } from '../src/components/internal/base-box';
import {
  BasePrimitiveProps,
  PublicBoxPropsBase,
} from '../src/components/types';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Token {
  // BoxProps['backgroundColor'] uses keyof, which ERT does not understand
  export type BackgroundColor = 'BackgroundColor';
}

type Space =
  | 'space.0'
  | 'space.025'
  | 'space.050'
  | 'space.075'
  | 'space.100'
  | 'space.150'
  | 'space.200'
  | 'space.250'
  | 'space.300'
  | 'space.400'
  | 'space.500'
  | 'space.600'
  | 'space.800'
  | 'space.1000';

export default function Box(
  _: {
    /**
     * The DOM element to render as the Box. Defaults to `div`.
     */
    as?: As;

    /**
     * Tokens representing CSS shorthand for `paddingBlock` and `paddingInline` together.
     */
    padding?: Space;

    /**
     * Tokens representing CSS shorthand `paddingBlock`.
     */
    paddingBlock?: Space;

    /**
     * Tokens representing CSS `paddingBlockStart`.
     */
    paddingBlockStart?: Space;

    /**
     * Tokens representing CSS `paddingBlockEnd`.
     */
    paddingBlockEnd?: Space;

    /**
     * Tokens representing CSS shorthand `paddingInline`.
     */
    paddingInline?: Space;

    /**
     * Tokens representing CSS `paddingInlineStart`.
     */
    paddingInlineStart?: Space;

    /**
     * Tokens representing CSS `paddingInlineEnd`.
     */
    paddingInlineEnd?: Space;

    /**
     * A token alias for background color. See:<br>
     * [https://atlassian.design/components/tokens/all-tokens#color-background](https://atlassian.design/components/tokens/all-tokens#color-background)
     */
    backgroundColor?: Token.BackgroundColor;

    /**
     * Elements to be rendered inside the primitive.
     */
    children?: ReactNode;

    /**
     * Apply a subset of permitted styles, powered by Atlassian Design System tokens.
     */
    xcss?: PublicBoxPropsBase['xcss'];

    /**
     * Forwarded ref element.
     */
    ref?: React.ComponentPropsWithRef<As>['ref'];
  } & BasePrimitiveProps,
) {}