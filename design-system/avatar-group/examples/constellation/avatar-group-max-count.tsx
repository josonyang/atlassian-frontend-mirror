import React from 'react';

import AvatarGroup from '@atlaskit/avatar-group';
import { cssMap } from '@atlaskit/css';
import { Box } from '@atlaskit/primitives/compiled';

import { appearances, getFreeToUseAvatarImage, RANDOM_USERS } from '../../examples-util/data';

const styles = cssMap({
	container: { maxWidth: '200px' },
});

const data = RANDOM_USERS.map((d, i) => ({
	key: d.email,
	name: d.name,
	href: '#',
	src: getFreeToUseAvatarImage(i),
	appearance: appearances[i % appearances.length],
}));

const AvatarGroupMaxCountExample = () => (
	<Box xcss={styles.container}>
		<AvatarGroup appearance="grid" maxCount={14} data={data} />
	</Box>
);

export default AvatarGroupMaxCountExample;
