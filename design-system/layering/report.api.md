<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/layering"

> Do not edit this file. This report is auto-generated using [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
/// <reference types="react" />

import { FC } from 'react';
import { MutableRefObject } from 'react';

// @public
export const UNSAFE_LAYERING: FC;

// @public
export function UNSAFE_useLayering(): {
  currentLevel: number;
  topLevelRef: MutableRefObject<null | number>;
  isLayerDisabled: () => boolean;
};

// @public
export function useCloseOnEscapePress({
  onClose,
  isDisabled,
}: UseCloseOnEscapePressOpts): void;

// @public (undocumented)
interface UseCloseOnEscapePressOpts {
  // (undocumented)
  isDisabled?: boolean;
  // (undocumented)
  onClose: (e: KeyboardEvent) => void;
}

// (No @packageDocumentation comment for this package)
```

<!--SECTION END: Main Entry Types-->

### Peer Dependencies

<!--SECTION START: Peer Dependencies-->

```json
{
  "react": "^16.8.0"
}
```

<!--SECTION END: Peer Dependencies-->