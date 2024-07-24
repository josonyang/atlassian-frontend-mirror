/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - TextfieldProps
 *
 * @codegen <<SignedSource::250d3abc9d24d3d90be6bf523851de67>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit2-codegen/textfield/__generated__/index.partial.tsx <<SignedSource::b1cc4fd107a1b6c756f2daaf460121fc>>
 */
import React from 'react';
import PlatformTextfield from '@atlaskit/textfield';
import type { EventHandlerProps } from './types.codegen';

type PlatformTextfieldProps = React.ComponentProps<typeof PlatformTextfield>;

export type TextfieldProps = Pick<
  PlatformTextfieldProps,
  'appearance' | 'elemAfterInput' | 'elemBeforeInput' | 'isCompact' | 'autoFocus' | 'isReadOnly' | 'isMonospaced' | 'placeholder' | 'testId' | 'width' | 'type' | 'defaultValue' | 'min' | 'max' | 'maxLength' | 'minLength' | 'pattern'
 | 'id' | 'isRequired' | 'isDisabled' | 'isInvalid' | 'onChange' | 'onBlur' | 'onFocus' | 'value' | 'aria-invalid' | 'aria-labelledby' | 'name'
> & Pick<EventHandlerProps, 'onChange' | 'onBlur' | 'onFocus'>;