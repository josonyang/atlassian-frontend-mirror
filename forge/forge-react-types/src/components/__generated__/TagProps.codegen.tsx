/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - TagProps
 *
 * @codegen <<SignedSource::1d48163194ea309ddc6f7353e5123202>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit/tag/__generated__/index.partial.tsx <<SignedSource::1f9f7073797cd01947c622c0400785ae>>
 */
/* eslint @repo/internal/codegen/signed-source-integrity: "warn" */

import React from 'react';
import { SimpleTag as PlatformSimpleTag } from '@atlaskit/tag';

type PlatformSimpleTagProps = React.ComponentProps<typeof PlatformSimpleTag>;

export type SimpleTagProps = Pick<
  PlatformSimpleTagProps,
  'text' | 'appearance' | 'color' | 'elemBefore' | 'href' | 'testId'
>;

/**
 * A tag labels UI objects for quick recognition and navigation.
 */
export type TSimpleTag<T> = (props: SimpleTagProps) => T;