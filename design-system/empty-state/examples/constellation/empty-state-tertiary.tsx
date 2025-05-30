import React from 'react';

import Button, { LinkButton } from '@atlaskit/button/new';
import EmptyState from '@atlaskit/empty-state';

const EmptyStateTertiaryActionExample = () => {
	return (
		<EmptyState
			header="You don't have access to this work item"
			description="Make sure the work item exists in this project. If it does, ask a project admin for permission to see the project's work items."
			primaryAction={<Button appearance="primary">Request access</Button>}
			secondaryAction={<Button>View permissions</Button>}
			tertiaryAction={
				<LinkButton appearance="subtle" href="http://www.atlassian.com" target="_blank">
					About permissions
				</LinkButton>
			}
		/>
	);
};

export default EmptyStateTertiaryActionExample;
