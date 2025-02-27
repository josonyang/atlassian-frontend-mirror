/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';

import { css as cssUnbounded } from '@compiled/react';

import { css, jsx } from '@atlaskit/css';
import { fg } from '@atlaskit/platform-feature-flags';
import { token } from '@atlaskit/tokens';

const triggerWrapperStylesWithPadding = css({
	display: 'flex',
	paddingRight: token('space.025', '2px'),
});

const triggerWrapperStyles = css({
	display: 'flex',
});

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- This rule thinks this isn't a `css()` call due to the name mapping
const triggerWrapperStylesUnbounded = cssUnbounded({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors
	button: {
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors
		'&:not([disabled])::after': {
			border: 'none', // remove blue border when an item has been selected
		},
	},
});

export function ToolbarDropdownTriggerWrapper({ children }: { children?: React.ReactNode }) {
	return (
		<div
			css={[
				// eslint-disable-next-line @atlaskit/platform/ensure-feature-flag-prefix
				fg('platform-visual-refresh-icons')
					? triggerWrapperStylesWithPadding
					: triggerWrapperStyles,
				triggerWrapperStylesUnbounded,
			]}
		>
			{children}
		</div>
	);
}
