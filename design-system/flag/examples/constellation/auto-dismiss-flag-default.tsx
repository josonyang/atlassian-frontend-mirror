import React from 'react';

import Button from '@atlaskit/button/new';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { Box } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';

const AutoDismissFlagDefaultExample = () => {
	const [flags, setFlags] = React.useState<Array<number>>([]);

	const addFlag = () => {
		const newFlagId = flags.length + 1;
		const newFlags = flags.slice();
		newFlags.splice(0, 0, newFlagId);

		setFlags(newFlags);
	};

	const handleDismiss = () => {
		setFlags(flags.slice(1));
	};

	return (
		<Box>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
			<p style={{ padding: token('space.200', '16px') }}>
				<Button appearance="primary" onClick={addFlag}>
					Add flag
				</Button>
			</p>
			<FlagGroup onDismissed={handleDismiss}>
				{flags.map((flagId) => {
					return (
						<AutoDismissFlag
							id={flagId}
							icon={
								<SuccessIcon
									primaryColor={token('color.icon.success')}
									label="Success"
									size="medium"
								/>
							}
							key={flagId}
							title={`#${flagId} Your changes were saved`}
							description="I will auto dismiss after 8 seconds."
						/>
					);
				})}
			</FlagGroup>
		</Box>
	);
};

export default AutoDismissFlagDefaultExample;
