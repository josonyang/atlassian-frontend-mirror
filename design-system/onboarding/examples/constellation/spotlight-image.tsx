import React, { useState } from 'react';

import Button from '@atlaskit/button/new';
import { N0 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { Spotlight, SpotlightManager, SpotlightTarget, SpotlightTransition } from '../../src';
import spotlightImage from '../assets/this-is-new-jira.png';

const SpotlightImageExample = () => {
	const [isSpotlightActive, setIsSpotlightActive] = useState(false);
	const start = () => setIsSpotlightActive(true);
	const end = () => setIsSpotlightActive(false);
	return (
		<SpotlightManager>
			<SpotlightTarget name="switch">
				<Button>Switch projects</Button>
			</SpotlightTarget>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
			<div style={{ marginTop: token('space.200', '16px') }}>
				<Button appearance="primary" onClick={() => start()}>
					Show example spotlight
				</Button>
			</div>

			<SpotlightTransition>
				{isSpotlightActive && (
					<Spotlight
						image={spotlightImage}
						actions={[
							{
								onClick: () => end(),
								text: 'OK',
							},
						]}
						target="switch"
						key="switch"
						targetRadius={3}
						targetBgColor={N0}
					>
						Select the project name and icon to quickly switch between your most recent projects.
					</Spotlight>
				)}
			</SpotlightTransition>
		</SpotlightManager>
	);
};

export default SpotlightImageExample;
