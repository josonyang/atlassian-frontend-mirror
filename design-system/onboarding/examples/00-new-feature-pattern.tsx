/**
 * @jsxRuntime classic
 * @jsx jsx
 */

import { useCallback, useState } from 'react';

import { css, jsx } from '@compiled/react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import {
	Spotlight,
	SpotlightManager,
	SpotlightPulse,
	SpotlightTarget,
	SpotlightTransition,
} from '@atlaskit/onboarding';
import { borderRadius } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';

const wrapperStyles = css({
	display: 'flex',
	height: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
});

const NewFeature = () => {
	const [isSpotlightVisible, setIsSpotlightVisible] = useState(false);

	const toggleIsSpotlightVisible = useCallback(() => {
		setIsSpotlightVisible((isSpotlightVisible) => !isSpotlightVisible);
	}, [setIsSpotlightVisible]);

	return (
		<div css={wrapperStyles}>
			<SpotlightManager blanketIsTinted={false}>
				<ButtonGroup label="Choose the option">
					<SpotlightTarget name="button">
						<SpotlightPulse radius={borderRadius()}>
							<Button onClick={toggleIsSpotlightVisible}>I am a new feature</Button>
						</SpotlightPulse>
					</SpotlightTarget>
					<Button>Another element</Button>
				</ButtonGroup>
				<SpotlightTransition>
					{isSpotlightVisible && (
						<Spotlight
							target="button"
							heading="Switch it up"
							actionsBeforeElement="1/3"
							targetBgColor={token('elevation.surface.raised')}
							pulse={false}
							actions={[
								{
									onClick: toggleIsSpotlightVisible,
									text: 'Got it',
								},
							]}
						>
							It is now easier to create a work item. Click on the plus button to create a new work
							item.
						</Spotlight>
					)}
				</SpotlightTransition>
			</SpotlightManager>
		</div>
	);
};

export default NewFeature;
