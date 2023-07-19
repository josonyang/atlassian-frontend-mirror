import React from 'react';

import { Code } from '@atlaskit/code';
import { Box, Inline, Stack, xcss } from '@atlaskit/primitives';
import { Radio } from '@atlaskit/radio';

const listItemStyles = xcss({ listStyle: 'none' });

const InlineLink = () => (
  <Box as="li" xcss={listItemStyles}>
    <a href="http://atlassian.com">Atlassian</a>
  </Box>
);

export default function Example() {
  return (
    <Stack space="space.200">
      <Box>
        <Code>Inline</Code> rendering as <Code>div</Code>:
        <Inline space="space.200">
          <Radio label="Option 1" />
          <Radio label="Option 2" />
          <Radio label="Option 3" />
          <Radio label="Option 4" />
        </Inline>
      </Box>
      <Box>
        <Code>Inline</Code> rendering as <Code>span</Code>:
        <Inline as="span" space="space.200">
          <Radio label="Option 1" />
          <Radio label="Option 2" />
          <Radio label="Option 3" />
          <Radio label="Option 4" />
        </Inline>
      </Box>
      <Box>
        <Code>Inline</Code> rendering as <Code>ul</Code>:
        <Inline as="ul" separator="·" space="space.100">
          <InlineLink />
          <InlineLink />
          <InlineLink />
          <InlineLink />
        </Inline>
      </Box>
      <Box>
        <Code>Inline</Code> rendering as <Code>ol</Code>:
        <Inline as="ul" separator="·" space="space.100">
          <InlineLink />
          <InlineLink />
          <InlineLink />
          <InlineLink />
        </Inline>
      </Box>
    </Stack>
  );
}
