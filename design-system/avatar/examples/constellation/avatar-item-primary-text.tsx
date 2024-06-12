import React from 'react';

import Avatar, { AvatarItem } from '../../src';

const AvatarPrimaryTextExample = () => {
	return (
		<AvatarItem
			avatar={<Avatar name="Mike Cannon-Brookes" presence="online" />}
			primaryText="Mike Cannon-Brookes"
		/>
	);
};

export default AvatarPrimaryTextExample;
