import React from 'react';

import AvatarGroup from '@atlaskit/avatar-group';
import { Stack } from '@atlaskit/primitives/compiled';

import { appearances } from '../examples-util/appearances';
import { RANDOM_USERS } from '../examples-util/random-users';

const data = RANDOM_USERS.map((d, i) => ({
	key: d.email,
	name: d.name,
	appearance: appearances[i % appearances.length],
}));

const _default: () => JSX.Element = () => {
	return (
		<Stack space="space.150">
			{(['circle', 'square', 'hexagon'] as const).map((appearance) => (
				<AvatarGroup
					moreIndicatorAppearance={appearance}
					onAvatarClick={console.log}
					data={data}
					maxCount={4}
					testId="stack"
				/>
			))}
		</Stack>
	);
};
export default _default;