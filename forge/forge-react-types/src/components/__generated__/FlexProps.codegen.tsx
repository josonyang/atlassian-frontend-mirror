/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - FlexProps
 *
 * @codegen <<SignedSource::a7674fb0691e3265f6e0940ae4f938e1>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit/flex/__generated__/index.partial.tsx <<SignedSource::0e480e44e57f21f761bec4613ac4988d>>
 */
/* eslint @repo/internal/codegen/signed-source-integrity: "warn" */

import React from 'react';
import { Flex as PlatformFlex } from '@atlaskit/primitives';

type PlatformFlexProps = React.ComponentProps<typeof PlatformFlex>;

export type FlexProps = Pick<
  PlatformFlexProps,
  'children' | 'justifyContent' | 'alignItems' | 'columnGap' | 'gap' | 'rowGap' | 'direction' | 'wrap' | 'testId' | 'role'
>;

/**
 * Primitives are token-backed low-level building blocks.
 */
export type TFlex<T> = (props: FlexProps) => T;