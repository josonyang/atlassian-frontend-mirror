<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/focus-ring"

> Do not edit this file. This report is auto-generated using
> [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import { FC } from 'react';
import type { FocusEventHandler } from 'react';
import type { ReactElement } from 'react';

// @public (undocumented)
export interface FocusEventHandlers {
	// (undocumented)
	onBlur: FocusEventHandler;
	// (undocumented)
	onFocus: FocusEventHandler;
}

// @public
const FocusRing: FC<FocusRingProps>;
export default FocusRing;

// @public (undocumented)
export interface FocusRingProps {
	children: ReactElement;
	focus?: FocusState;
	isInset?: boolean;
}

// @public (undocumented)
export type FocusState = 'off' | 'on';

// @public
export const useFocusRing: (initialState?: FocusState) => {
	readonly focusState: 'off' | 'on';
	readonly focusProps: FocusEventHandlers;
};

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
