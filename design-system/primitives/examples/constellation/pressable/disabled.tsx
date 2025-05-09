import React, { useCallback, useState } from 'react';

import { Inline, Pressable, Stack, xcss } from '@atlaskit/primitives';
import Toggle from '@atlaskit/toggle';

const pressableStyles = xcss({
	fontWeight: 'font.weight.medium',
	backgroundColor: 'color.background.neutral.subtle',
});

const enabledStyles = xcss({
	color: 'color.text.subtle',

	':hover': {
		textDecoration: 'underline',
		backgroundColor: 'color.background.neutral.subtle.hovered',
	},
	':active': {
		color: 'color.text',
		backgroundColor: 'color.background.neutral.subtle.pressed',
	},
});

const disabledStyles = xcss({
	color: 'color.text.disabled',
});

export default function Disabled() {
	const handleClick = useCallback(() => {
		console.log('Clicked');
	}, []);

	const [isDisabled, setIsDisabled] = useState(true);
	const toggleDisabled = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setIsDisabled(event.currentTarget.checked);
	}, []);
	return (
		<Stack space="space.200" alignInline="start">
			<Inline alignBlock="center" space="space.100">
				<Toggle isChecked={isDisabled} id="is-disabled" onChange={toggleDisabled} />
				<label htmlFor="is-disabled">Disabled</label>
			</Inline>
			<Pressable
				isDisabled={isDisabled}
				onClick={handleClick}
				padding="space.0"
				xcss={[pressableStyles, isDisabled ? disabledStyles : enabledStyles]}
			>
				Edit comment
			</Pressable>
		</Stack>
	);
}
