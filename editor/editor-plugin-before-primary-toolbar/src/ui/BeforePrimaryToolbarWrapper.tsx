/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { token } from '@atlaskit/tokens';

import { type ReactComponents } from '../types/ReactComponents';

const beforePrimaryToolbarPluginWrapperStyles = css({
	display: 'flex',
	marginRight: token('space.100', '8px'),
	flexGrow: 1,
	justifyContent: 'flex-end',
	alignItems: 'center',
});

export const BeforePrimaryToolbarWrapper = (props: {
	beforePrimaryToolbarComponents: ReactComponents | undefined;
}) => (
	<div
		css={beforePrimaryToolbarPluginWrapperStyles}
		data-testid={'before-primary-toolbar-components-plugin'}
	>
		{props.beforePrimaryToolbarComponents}
	</div>
);
