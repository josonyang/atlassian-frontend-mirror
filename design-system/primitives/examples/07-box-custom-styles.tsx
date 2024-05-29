import React from 'react';

import Heading from '@atlaskit/heading';

import { Box, Stack, xcss } from '../src';

const solidBorderStyles = xcss({ borderStyle: 'solid' });

export default () => {
  return (
    <Stack space="space.400" alignInline="start">
      <Heading level="h600">Custom width</Heading>
      <Stack space="space.200" testId="box-custom-width">
{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
        <Box xcss={solidBorderStyles} style={{ width: '600px' }}>
          custom width
        </Box>
      </Stack>

      <Stack space="space.200" testId="box-custom-padding">
        <Heading level="h600">Custom padding</Heading>
        <Box
// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
          style={{ paddingLeft: '14px' }}
          backgroundColor="color.background.discovery.bold"
        >
          <Box backgroundColor="elevation.surface">custom padding</Box>
        </Box>
      </Stack>
    </Stack>
  );
};
