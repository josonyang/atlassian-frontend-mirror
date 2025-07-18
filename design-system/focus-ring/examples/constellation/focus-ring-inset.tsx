/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useEffect, useRef } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import FocusRing from '@atlaskit/focus-ring';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box, xcss } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';

const buttonStyles = css({
	display: 'block',
	margin: `${token('space.150')} 0`,
	padding: token('space.100'),
	border: 'none',
	borderRadius: '3px',
});

const spacerStyles = xcss({
	padding: 'space.100',
});

export default () => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	useEffect(() => {
		if (buttonRef.current) {
			buttonRef.current.focus();
		}
	}, []);

	return (
		<Box xcss={spacerStyles}>
			<FocusRing isInset>
				<button type="button" ref={buttonRef} css={buttonStyles}>
					Keyboard focus to show ring
				</button>
			</FocusRing>
		</Box>
	);
};
