import React, { type ReactElement } from 'react';

import noop from '@atlaskit/ds-lib/noop';
import Flag from '@atlaskit/flag';
import { type AppearanceTypes } from '@atlaskit/flag/types';
import StatusErrorIcon from '@atlaskit/icon/core/status-error';
import StatusInformationIcon from '@atlaskit/icon/core/status-information';
import StatusSuccessIcon from '@atlaskit/icon/core/status-success';
import StatusWarningIcon from '@atlaskit/icon/core/status-warning';
import { Stack } from '@atlaskit/primitives/compiled';

const actions = [
	{ content: 'Understood', onClick: noop },
	{ content: 'No Way!', onClick: noop },
];
const appearances: { [key: string]: { description: string; title: string } } = {
	normal: {
		description: 'We got fun and games. We got everything you want honey, we know the names.',
		title: 'Welcome to the jungle',
	},
	error: {
		description: 'You need to take action, something has gone terribly wrong!',
		title: 'Uh oh!',
	},
	info: {
		description: "This alert needs your attention, but it's not super important.",
		title: 'Hey, did you know...',
	},
	success: {
		description: 'Nothing to worry about, everything is going great!',
		title: 'Good news, everyone',
	},
	warning: {
		description: 'Pay attention to me, things are not going according to plan.',
		title: 'Heads up!',
	},
};

const iconMap = (key: string) => {
	const icons: { [key: string]: ReactElement } = {
		normal: <StatusInformationIcon label="" />,
		info: <StatusInformationIcon label="" />,
		success: <StatusSuccessIcon label="" />,
		warning: <StatusWarningIcon label="" />,
		error: <StatusErrorIcon label="" />,
	};

	return key ? icons[key] : icons;
};

const getIcon = (key: string) => {
	return iconMap(key) as ReactElement;
};

export default () => (
	<Stack space="space.100">
		{Object.keys(appearances).map((type, idx) => (
			<Flag
				actions={actions}
				appearance={type as AppearanceTypes}
				description={appearances[type].description}
				icon={getIcon(type)}
				id={type}
				key={type}
				title={appearances[type].title}
				testId={`flag-${type}`}
			/>
		))}
	</Stack>
);
