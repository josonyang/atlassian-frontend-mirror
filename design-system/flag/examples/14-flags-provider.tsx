import React, { useRef } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import noop from '@atlaskit/ds-lib/noop';
import { type CreateFlagArgs, FlagsProvider, useFlags } from '@atlaskit/flag';
import Info from '@atlaskit/icon/glyph/info';
import { token } from '@atlaskit/tokens';

const actions = [
	{
		content: 'Nice one!',
		onClick: noop,
	},
];

const getFlagData = (
	description: string,
	index: number,
	useId: boolean = true,
	isAutoDismiss: boolean = false,
): CreateFlagArgs => {
	const flagData: CreateFlagArgs = {
		actions,
		description: description,
		icon: <Info label="Info" primaryColor={token('color.icon.information')} />,
		title: `${index + 1}: Whoa a new flag!`,
		isAutoDismiss: isAutoDismiss,
	};
	if (useId) {
		flagData.id = index;
	}
	return flagData;
};

const FlagGroupExample = () => {
	const flagCount = useRef(0);

	const { showFlag } = useFlags();

	const addFlag = () => {
		showFlag(getFlagData('Added from the context 🤯', flagCount.current++));
	};

	const addFlagNoId = () => {
		showFlag(getFlagData('I was not given an id 🕵️‍♀️', flagCount.current++, false));
	};

	const addAutoDismissFlag = () => {
		showFlag(
			getFlagData(
				'I will automatically dismiss after 8 seconds ⏰',
				flagCount.current++,
				false,
				true,
			),
		);
	};

	return (
		<ButtonGroup label="Сhoose a flag">
			<Button onClick={addFlag}>Add Flag</Button>
			<Button onClick={addFlagNoId}>Add Flag without id</Button>
			<Button onClick={addAutoDismissFlag}>Add AutoDismissFlag</Button>
		</ButtonGroup>
	);
};

export default () => (
	<FlagsProvider>
		<FlagGroupExample />
	</FlagsProvider>
);
