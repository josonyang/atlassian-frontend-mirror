/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';

import { Box, xcss } from '@atlaskit/primitives';

const verticalSpaceStyles = xcss({
	marginBlockEnd: 'space.300',
});

const VerticalSpace = () => <Box xcss={verticalSpaceStyles} />;

export default VerticalSpace;
