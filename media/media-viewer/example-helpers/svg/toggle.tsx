import React, { useState } from 'react';

import { Label } from '@atlaskit/form';
import { Box } from '@atlaskit/primitives/compiled';
import Toggle from '@atlaskit/toggle';
import { cssMap } from '@atlaskit/css';

function makeid(length = 12) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

const styles = cssMap({
	centerText: {
		textAlign: 'center',
	},
});

export const ToggleBox = ({
	label,
	onChange,
	centered,
	...props
}: Omit<React.ComponentProps<typeof Toggle>, 'onChange'> & {
	label: string;
	centered?: boolean;
	onChange: (val: boolean) => void;
}) => {
	const [id] = useState(makeid());

	return (
		<Box xcss={centered && styles.centerText}>
			<Label htmlFor={id}>{label}</Label>
			<Toggle
				onChange={(evt) => {
					const { checked } = evt.target;
					onChange(checked);
				}}
				{...props}
				id={id}
			/>
		</Box>
	);
};
