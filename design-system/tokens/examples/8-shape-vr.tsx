/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';

import { Box, Inline, xcss } from '@atlaskit/primitives';
import { type CSSToken, token } from '@atlaskit/tokens';

const radiusBoxStyles = xcss({
	borderWidth: 'border.width',
	borderColor: 'color.border',
	borderStyle: 'solid',
	width: 'size.400',
	height: 'size.400',
	alignItems: 'center',
	justifyContent: 'center',
});

const RadiusBox = ({ radius }: { radius: CSSToken }) => (
	<Box xcss={radiusBoxStyles} style={{ borderRadius: radius }} />
);

export default () => {
	return (
		<div data-testid="shape">
			<h1>Shape scale</h1>
			<Inline space="space.100" alignBlock="end">
				<RadiusBox radius={token('border.radius.050', '2px')} />
				<RadiusBox radius={token('border.radius.100', '4px')} />
				<RadiusBox radius={token('border.radius.200', '8px')} />
				<RadiusBox radius={token('border.radius.300', '12px')} />
				<RadiusBox radius={token('border.radius.400', '16px')} />
				<RadiusBox radius={token('border.radius.circle', '100rem')} />
			</Inline>
		</div>
	);
};
