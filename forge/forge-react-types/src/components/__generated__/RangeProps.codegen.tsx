/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - RangeProps
 *
 * @codegen <<SignedSource::90b0ddabf2167e8a5baee6fb2a2c151d>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit/range/__generated__/index.partial.tsx <<SignedSource::66f3c55587192848bc42f9fc146e6c7e>>
 */
/* eslint @repo/internal/codegen/signed-source-integrity: "warn" */

import React from 'react';
import PlatformRange from '@atlaskit/range';
import type { EventHandlerProps } from './types.codegen';

type PlatformRangeProps = React.ComponentProps<typeof PlatformRange>;

export type RangeProps = Pick<
  PlatformRangeProps,
  'defaultValue' | 'max' | 'min' | 'step' | 'testId' | 'onChange'
 | 'id' | 'isDisabled' | 'value' | 'aria-invalid' | 'aria-labelledby' | 'name'
> & Pick<EventHandlerProps, 'onBlur' | 'onFocus'>;

/**
 * A range lets users choose an approximate value on a slider.
 */
export type TRange<T> = (props: RangeProps) => T;