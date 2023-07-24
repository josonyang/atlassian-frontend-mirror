import React, { useCallback, useState } from 'react';

import Button from '@atlaskit/button';
import { Inline, Stack } from '@atlaskit/primitives';

import Block from '../shared/block';

export default function Example() {
  const [spread, setSpread] = useState<'space-between' | undefined>(undefined);
  const toggleSpread = useCallback(() => {
    setSpread(spread === 'space-between' ? undefined : 'space-between');
  }, [spread]);

  return (
    <Stack alignInline="start" space="space.500">
      <Button appearance="primary" onClick={toggleSpread}>
        Toggle spread
      </Button>
      <Inline space="space.100" grow="fill" spread={spread}>
        <Block />
        <Block />
        <Block />
      </Inline>
    </Stack>
  );
}
