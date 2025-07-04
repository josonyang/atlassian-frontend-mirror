/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type Ref } from 'react';

import { css, jsx } from '@compiled/react';

import { removeProps } from '../../utils';

const dummyInputStyles = css({
	width: 1,
	padding: 0,
	position: 'relative',
	background: 0,
	border: 0,
	caretColor: 'transparent',
	color: 'transparent',
	gridArea: '1 / 1 / 2 / 3',
	insetInlineStart: -100,
	opacity: 0,
	outline: 0,
	transform: 'scale(.01)',
});

export default function DummyInput({
	innerRef,
	...props
}: JSX.IntrinsicElements['input'] & {
	readonly innerRef: Ref<HTMLInputElement>;
}) {
	// Remove animation props not meant for HTML elements
	const filteredProps = removeProps(props, 'onExited', 'in', 'enter', 'exit', 'appear');

	// eslint-disable-next-line  @atlaskit/ui-styling-standard/no-classname-prop
	return <input ref={innerRef} className="-dummyInput" {...filteredProps} css={dummyInputStyles} />;
}
