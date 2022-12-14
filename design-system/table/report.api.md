<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/table"

> Do not edit this file. This report is auto-generated using [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import { BoxProps } from '@atlaskit/ds-explorations/box';
import { FC } from 'react';
import { jsx } from '@emotion/react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';

// @public (undocumented)
const alignMap: {
  readonly text: 'flexStart';
  readonly number: 'flexEnd';
  readonly icon: 'center';
};

// @public (undocumented)
type BaseCellProps = {
  width?: string;
  align?: keyof typeof alignMap;
  as?: 'td' | 'th';
  scope?: 'col' | 'row';
  testId?: string;
  children?: ReactNode;
} & Pick<
  BoxProps,
  'backgroundColor' | 'className' | 'paddingBlock' | 'paddingInline'
>;

// @public (undocumented)
type BodyProps<Item extends object> =
  | {
      rows: Item[];
      children: (row: Item) => ReactElement;
    }
  | {
      rows?: never;
      children: ReactElement | ReactElement[];
    };

// @public
export const Cell: FC<Omit<BaseCellProps, 'as'>>;

// @public (undocumented)
interface CellProps {
  name: string;
  // (undocumented)
  onClick?: React.MouseEventHandler;
  testId?: string;
}

// @public
export const HeadCell: FC<THProps>;

// @public
export const Row: FC<RowProps>;

// @public (undocumented)
type RowProps = {
  testId?: string;
};

// @public
export const SortableColumn: FC<CellProps>;

// @public (undocumented)
type SortKey<Key extends number | string | symbol> = 'unset' | Key;

// @public
function Table<ItemType extends object = object>({
  children,
  isSelectable,
  sortKey,
  testId,
}: TableProps<ItemType>): jsx.JSX.Element;
export default Table;

// @public (undocumented)
type TableProps<ItemType extends object = {}> = {
  testId?: string;
  sortKey?: SortKey<keyof ItemType>;
  children: ReactElement | ReactElement[];
} & (
  | {
      isSelectable: true;
      defaultSelected?: number;
    }
  | {
      isSelectable?: false;
    }
);

// @public
export function TBody<ObjectType extends object>({
  rows,
  children,
}: BodyProps<ObjectType>): jsx.JSX.Element;

// @public (undocumented)
export const THead: FC<THeadProps>;

// @public (undocumented)
type THeadProps = {
  actions?: (selected: number[]) => ReactNode;
};

// @public (undocumented)
type THProps = Omit<BaseCellProps, 'as'>;

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
