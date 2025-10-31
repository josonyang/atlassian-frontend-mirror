import React from 'react';

import Button from '@atlaskit/button/new';
import StarStarredIcon from '@atlaskit/icon/core/star-starred';

const ButtonIconBeforeExample = () => {
	return (
		<Button iconBefore={StarStarredIcon} appearance="primary">
			Icon before
		</Button>
	);
};

export default ButtonIconBeforeExample;
