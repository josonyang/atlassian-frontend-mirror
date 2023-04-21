/** @jsx jsx */
import { jsx } from '@emotion/react';

import { Box, Inline, Stack, xcss } from '@atlaskit/primitives';

const blockStyles = xcss({
  display: 'flex',
  textAlign: 'center',
  borderRadius: 'radius.050',
  justifyContent: 'center',
  color: 'inverse',
});

export default function Example() {
  return (
    <Inline space="space.200">
      <Stack space="space.100" grow="hug">
        <Box
          xcss={blockStyles}
          backgroundColor="discovery.bold"
          padding="space.200"
        >
          This content is hugged
        </Box>
      </Stack>
      <Stack space="space.100" grow="fill">
        <Box
          xcss={blockStyles}
          backgroundColor="discovery.bold"
          padding="space.200"
        >
          Available space is filled
        </Box>
      </Stack>
    </Inline>
  );
}