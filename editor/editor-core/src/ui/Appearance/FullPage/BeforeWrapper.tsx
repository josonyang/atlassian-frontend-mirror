/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import type { ReactElement } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

const beforePrimaryToolbarPluginWrapperStyles = css({
	display: 'flex',
	flexGrow: 1,
	justifyContent: 'flex-end',
	alignItems: 'center',
});

type ReactComponents = ReactElement | ReactElement[];

// Duplicate of the wrapper from `editor-plugins/before-primary-toolbar` used
// only in `FullPageToolbar` to decouple the plugin from the main toolbar
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
