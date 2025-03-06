/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - TextfieldProps
 *
 * @codegen <<SignedSource::4f0a7b04b3a23a5889553b2bfaf7f454>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit/textfield/index.tsx <<SignedSource::03b967815639a5a5aae4f79da283d410>>
 */
/* eslint @repo/internal/codegen/signed-source-integrity: "warn" */

import React from 'react';
import PlatformTextfield from '@atlaskit/textfield';
import type { EventHandlerProps } from './types.codegen';

type PlatformTextfieldProps = React.ComponentProps<typeof PlatformTextfield>;

export type TextfieldProps = Pick<
	PlatformTextfieldProps,
	| 'appearance'
	| 'elemAfterInput'
	| 'elemBeforeInput'
	| 'isCompact'
	| 'autoFocus'
	| 'isReadOnly'
	| 'isMonospaced'
	| 'placeholder'
	| 'testId'
	| 'width'
	| 'type'
	| 'defaultValue'
	| 'min'
	| 'max'
	| 'maxLength'
	| 'minLength'
	| 'pattern'
	| 'id'
	| 'isRequired'
	| 'isDisabled'
	| 'isInvalid'
	| 'value'
	| 'aria-invalid'
	| 'aria-labelledby'
	| 'name'
> &
	Pick<EventHandlerProps, 'onChange' | 'onBlur' | 'onFocus'>;

/**
 * A text field is an input that allows a user to write or edit text.
 */
export type TTextfield<T> = (props: TextfieldProps) => T;