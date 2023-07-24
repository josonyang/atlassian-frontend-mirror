import React from 'react';

import { Inline, Stack } from '@atlaskit/primitives';

import Block from '../shared/block';

export default function Example() {
  return (
    <Stack space="space.500">
      {(['space.100', 'space.200'] as const).map(space => (
        <Inline key={space} space={space}>
          <Block />
          <Block />
          <Block />
        </Inline>
      ))}
    </Stack>
  );
}
