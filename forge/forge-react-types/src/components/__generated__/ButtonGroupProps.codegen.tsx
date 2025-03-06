/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - ButtonGroupProps
 *
 * @codegen <<SignedSource::cfcaf362cef2884ded73338c52c8f437>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit/button/__generated__/button-group.partial.tsx <<SignedSource::83622155981d05f77224a32bab4969b5>>
 */
/* eslint @repo/internal/codegen/signed-source-integrity: "warn" */

import type { ButtonGroupProps as PlatformButtonGroupProps } from '@atlaskit/button';
import type { ButtonProps } from '@atlaskit/button';

export type ButtonGroupProps = Pick<
	PlatformButtonGroupProps,
	'children' | 'testId' | 'label' | 'titleId'
> & { appearance?: ButtonProps['appearance'] };

/**
 * A button group gives users access to frequently performed, related actions.
 */
export type TButtonGroup<T> = (props: ButtonGroupProps) => T;