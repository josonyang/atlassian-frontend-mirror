/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type FC, type ReactNode } from 'react';

import { css, jsx } from '@compiled/react';

import { token } from '@atlaskit/tokens';

const bodyStyles = css({
	position: 'relative',
	border: 'none',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'&:after': {
		position: 'absolute',
		inset: 0,
		boxShadow: `inset 0 -2px 0 0 ${token('color.border', '#eee')}`,
		content: "''",
		pointerEvents: 'none',
	},
});

/**
 * __TBody__
 * @primitive
 */
export const TBody: FC<{ children: ReactNode }> = ({ children }) => (
	<tbody css={bodyStyles}>{children}</tbody>
);
