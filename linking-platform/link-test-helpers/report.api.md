<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/link-test-helpers"

> Do not edit this file. This report is auto-generated using [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import { default as React_2 } from 'react';
import { RenderResult } from '@testing-library/react';

// @public (undocumented)
export function asyncAct(cb: () => Promise<any> | void): Promise<void>;

// @public (undocumented)
export const flushPromises: () => Promise<unknown>;

// @public
export class ManualPromise<T> extends Promise<T> {
  // (undocumented)
  static get [Symbol.species](): PromiseConstructor;
  // (undocumented)
  get [Symbol.toStringTag](): string;
  constructor(value: T);
  // (undocumented)
  reject(err?: unknown): this;
  // (undocumented)
  resolve(value?: T): this;
}

// @public (undocumented)
export const renderWithIntl: (component: React_2.ReactNode) => RenderResult;

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
