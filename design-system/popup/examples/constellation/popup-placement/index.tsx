/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import Button from '@atlaskit/button/new';
import { type Placement, placements } from '@atlaskit/popper';
import Popup from '@atlaskit/popup';
import { Box } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';

import { placementGridPositions } from './placement-grid-positions';

const contentStyles = css({
	maxWidth: 220,
	padding: token('space.200', '16px'),
});

const buttonGridStyles = css({
	display: 'grid',
	gap: token('space.100', '8px'),
	gridTemplate: 'repeat(5, 1fr) / repeat(5, 1fr)',
	justifyItems: 'stretch',
});

const PopupPlacementExample = () => {
	const [openPlacement, setOpenPlacement] = useState<Placement | null>(null);

	return (
		<div css={buttonGridStyles}>
			{placements.map((placement) => {
				const isOpen = openPlacement === placement;

				return (
					<Popup
						key={placement}
						placement={placement}
						isOpen={isOpen}
						onClose={() => {
							if (isOpen) {
								setOpenPlacement(null);
							}
						}}
						content={() => (
							<div css={contentStyles}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam massa ac risus
								scelerisque, in iaculis magna semper. Phasellus sagittis congue elit, non suscipit
								nulla rhoncus vitae.
							</div>
						)}
						trigger={(triggerProps) => (
							// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
							<Box xcss={placementGridPositions[placement]}>
								<Button
									{...triggerProps}
									shouldFitContainer
									isSelected={isOpen}
									onClick={() => setOpenPlacement(isOpen ? null : placement)}
								>
									{placement}
								</Button>
							</Box>
						)}
					/>
				);
			})}
		</div>
	);
};

export default PopupPlacementExample;
