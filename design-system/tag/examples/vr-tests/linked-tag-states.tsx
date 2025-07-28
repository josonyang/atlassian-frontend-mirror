import React from 'react';

import { SimpleTag as Tag } from '@atlaskit/tag';

export default () => (
	<div>
		<Tag text="Linked Tag" testId="linkTag-hover" href="/components/tag" />
		<Tag text="Linked Tag" testId="linkTag-focus" href="/components/tag" />
	</div>
);
