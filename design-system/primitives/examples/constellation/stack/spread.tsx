import React, { useCallback, useState } from 'react';

import Button from '@atlaskit/button';
import Heading from '@atlaskit/heading';
import Lozenge from '@atlaskit/lozenge';
import { Inline, Stack } from '@atlaskit/primitives';

export default function Example() {
  const [spread, setSpread] = useState<'space-between' | undefined>(undefined);
  const changeSpread = useCallback(() => {
    setSpread(spread === 'space-between' ? undefined : 'space-between');
  }, [spread]);

  return (
    <Stack space="space.500">
      <div>
        <Button appearance="primary" onClick={changeSpread}>
          Toggle spread
        </Button>
      </div>
      <Stack space="space.200">
        <Heading level="h400">
          <div style={{ whiteSpace: 'nowrap' }}>The Golden Goddesses:</div>
        </Heading>
        <Inline space="space.100">
          <Stack space="space.1000">
            <Lozenge appearance="removed" isBold>
              Din
            </Lozenge>
            <Lozenge appearance="inprogress" isBold>
              Nayru
            </Lozenge>
            <Lozenge appearance="success" isBold>
              Farore
            </Lozenge>
          </Stack>
          <Stack space="space.100" spread={spread}>
            <Lozenge appearance="removed" isBold>
              Din
            </Lozenge>
            <Lozenge appearance="inprogress" isBold>
              Nayru
            </Lozenge>
            <Lozenge appearance="success" isBold>
              Farore
            </Lozenge>
          </Stack>
        </Inline>
      </Stack>
    </Stack>
  );
}