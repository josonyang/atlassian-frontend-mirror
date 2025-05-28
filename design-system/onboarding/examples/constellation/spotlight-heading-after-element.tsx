import React, { useState } from 'react';

import Button, { IconButton } from '@atlaskit/button/new';
import CloseIcon from '@atlaskit/icon/core/migration/close--cross';
import CommentAddIcon from '@atlaskit/icon/core/migration/comment-add--media-services-add-comment';
import {
	Spotlight,
	SpotlightManager,
	SpotlightTarget,
	SpotlightTransition,
} from '@atlaskit/onboarding';
import { N0 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

const SpotlightHeadingAfterElement = () => {
	const [isSpotlightActive, setIsSpotlightActive] = useState(false);
	const start = () => setIsSpotlightActive(true);
	const end = () => setIsSpotlightActive(false);
	return (
		<SpotlightManager>
			<SpotlightTarget name="comment">
				<IconButton icon={CommentAddIcon} label="comment" />
			</SpotlightTarget>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
			<div style={{ marginTop: token('space.200') }}>
				<Button appearance="primary" onClick={() => start()}>
					Show example spotlight
				</Button>
			</div>
			<SpotlightTransition>
				{isSpotlightActive && (
					<Spotlight
						headingAfterElement={
							<IconButton
								icon={CloseIcon}
								appearance="subtle"
								onClick={() => end()}
								label="Close"
							/>
						}
						actions={[
							{
								onClick: () => end(),
								text: 'OK',
							},
						]}
						heading="Add a comment"
						target="comment"
						key="comment"
						targetRadius={3}
						targetBgColor={N0}
					>
						Quickly add a comment to the work item.
					</Spotlight>
				)}
			</SpotlightTransition>
		</SpotlightManager>
	);
};

export default SpotlightHeadingAfterElement;
