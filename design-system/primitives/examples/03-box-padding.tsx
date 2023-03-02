import React from 'react';

import Heading from '@atlaskit/heading';

import { Box, Inline, Stack } from '../src';

const spacingValues = [
  'space.0',
  'space.025',
  'space.050',
  'space.075',
  'space.100',
  'space.150',
  'space.200',
  'space.250',
  'space.300',
  'space.400',
  'space.500',
  'space.600',
  'space.800',
  'space.1000',
] as const;

/**
 * Box permutations
 */
export default () => {
  return (
    <Stack space="400" alignInline="start" testId="box-padding">
      <Stack space="200" testId="box-with-background-and-padding">
        <Heading level="h600">padding</Heading>
        <Inline space="200" alignBlock="center">
          {spacingValues.map(space => (
            <Box key={space} backgroundColor="discovery.bold" padding={space}>
              <Box backgroundColor="elevation.surface">{space}</Box>
            </Box>
          ))}
        </Inline>
      </Stack>

      <Stack space="200" testId="box-with-background-and-paddingBlock">
        <Heading level="h600">paddingBlock</Heading>
        <Inline space="200" alignBlock="center">
          {spacingValues.map(space => (
            <Box
              key={space}
              backgroundColor="discovery.bold"
              paddingBlock={space}
            >
              <Box backgroundColor="elevation.surface">{space}</Box>
            </Box>
          ))}
        </Inline>
      </Stack>

      <Stack space="200" testId="box-with-background-and-paddingBlockStart">
        <Heading level="h600">paddingBlockStart</Heading>
        <Inline space="200" alignBlock="center">
          {spacingValues.map(space => (
            <Box
              key={space}
              backgroundColor="discovery.bold"
              paddingBlockStart={space}
            >
              <Box backgroundColor="elevation.surface">{space}</Box>
            </Box>
          ))}
        </Inline>
      </Stack>

      <Stack space="200" testId="box-with-background-and-paddingBlockEnd">
        <Heading level="h600">paddingBlockEnd</Heading>
        <Inline space="200" alignBlock="center">
          {spacingValues.map(space => (
            <Box
              key={space}
              backgroundColor="discovery.bold"
              paddingBlockEnd={space}
            >
              <Box backgroundColor="elevation.surface">{space}</Box>
            </Box>
          ))}
        </Inline>
      </Stack>

      <Inline space="600">
        <Stack space="200" testId="box-with-background-and-paddingInline">
          <Heading level="h600">paddingInline</Heading>
          <Stack space="200" alignInline="center">
            {spacingValues.map(space => (
              <Box
                key={space}
                backgroundColor="discovery.bold"
                paddingInline={space}
              >
                <Box backgroundColor="elevation.surface">{space}</Box>
              </Box>
            ))}
          </Stack>
        </Stack>

        <Stack space="200" testId="box-with-background-and-paddingInlineStart">
          <Heading level="h600">paddingInlineStart</Heading>
          <Stack space="200" alignInline="center">
            {spacingValues.map(space => (
              <Box
                key={space}
                backgroundColor="discovery.bold"
                paddingInlineStart={space}
              >
                <Box backgroundColor="elevation.surface">{space}</Box>
              </Box>
            ))}
          </Stack>
        </Stack>

        <Stack space="200" testId="box-with-background-and-paddingInlineEnd">
          <Heading level="h600">paddingInlineEnd</Heading>
          <Stack space="200" alignInline="center">
            {spacingValues.map(space => (
              <Box
                key={space}
                backgroundColor="discovery.bold"
                paddingInlineEnd={space}
              >
                <Box backgroundColor="elevation.surface">{space}</Box>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Inline>
    </Stack>
  );
};