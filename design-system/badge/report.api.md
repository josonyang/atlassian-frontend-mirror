<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/badge"

> Do not edit this file. This report is auto-generated using
> [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import type { CSSProperties } from 'react';
import { default as React_2 } from 'react';
import type { ReactNode } from 'react';

// @public
const Badge: React_2.NamedExoticComponent<BadgeProps>;
export default Badge;

// @public (undocumented)
export interface BadgeProps {
	appearance?: ThemeAppearance;
	children?: ReactNode | number;
	max?: false | number;
	style?: Pick<CSSProperties, 'backgroundColor' | 'color'>;
	testId?: string;
}

// @public (undocumented)
type ThemeAppearance =
	| 'added'
	| 'default'
	| 'important'
	| 'primary'
	| 'primaryInverted'
	| 'removed';

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
