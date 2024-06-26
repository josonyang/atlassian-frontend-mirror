<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/page"

> Do not edit this file. This report is auto-generated using
> [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
/// <reference types="react" />

import { jsx } from '@emotion/react';
import type { ReactNode } from 'react';

// @public
type BaseGridProps = {
	children?: React.ReactNode;
	layout?: GridLayout;
	testId?: string;
};

// @public
export const Grid: ({
	spacing: spacingProp,
	columns: columnsProp,
	layout,
	testId,
	children,
	theme,
}: GridProps) => JSX.Element;

// @public
export const GridColumn: ({ medium, children, testId }: GridColumnProps) => jsx.JSX.Element;

// @public (undocumented)
type GridColumnProps = {
	medium?: number;
	children?: ReactNode;
	testId?: string;
};

// @public (undocumented)
type GridLayout = 'fixed' | 'fluid';

// @public
type GridProps = BaseGridProps & {
	spacing?: GridSpacing;
	columns?: number;
	theme?: ThemeProps;
};

// @public (undocumented)
type GridSpacing = keyof typeof spacingMapping;

// @public
const Page: ({
	isBannerOpen,
	bannerHeight,
	banner,
	navigation,
	children,
	testId,
}: PageProps) => jsx.JSX.Element;
export default Page;

// @public (undocumented)
type PageProps = {
	banner?: ReactNode;
	navigation?: ReactNode;
	children?: ReactNode;
	isBannerOpen?: boolean;
	bannerHeight?: number;
	testId?: string;
};

// @public (undocumented)
const spacingMapping: {
	readonly comfortable: number;
	readonly cosy: number;
	readonly compact: number;
};

// @public
type ThemeProps = {
	columns: number;
	spacing: GridSpacing;
	isNestedGrid?: boolean;
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
