import React from 'react';

import { Code } from '@atlaskit/code';
import { Text } from '@atlaskit/primitives';

const CodeDefaultExample = () => {
	return (
		<Text as="p">
			To start creating a changeset, run <Code>yarn changeset</Code>. Then you'll be prompted to
			select packages for release.
		</Text>
	);
};

export default CodeDefaultExample;
