import React from 'react';

import noop from '@atlaskit/ds-lib/noop';
import Flag from '@atlaskit/flag';
import WarningIcon from '@atlaskit/icon/core/migration/status-warning--warning';
import { token } from '@atlaskit/tokens';

const FlagWarningExample = () => {
	return (
		<Flag
			appearance="warning"
			icon={
				<WarningIcon
					label="Warning"
					LEGACY_secondaryColor={token('color.background.warning.bold')}
					color={token('color.icon')}
					spacing="spacious"
				/>
			}
			id="warning"
			key="warning"
			title="This page is visible to people outside your organization"
			description="Are you sure you want to publish?"
			actions={[
				{ content: 'Publish', onClick: noop },
				{ content: 'Go back', onClick: noop },
			]}
		/>
	);
};

export default FlagWarningExample;
