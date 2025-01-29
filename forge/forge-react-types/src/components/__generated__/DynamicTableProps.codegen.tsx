/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - DynamicTableProps
 *
 * @codegen <<SignedSource::213e682fc5fc702c30fb176cf45969b3>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit/dynamictable/__generated__/index.partial.tsx <<SignedSource::579e3dddf7bd4b762d0fd40744619b89>>
 */
/* eslint @repo/internal/codegen/signed-source-integrity: "warn" */

import type { RowType, StatefulProps } from '@atlaskit/dynamic-table/types';

type NewRowType = Pick<RowType, 'cells' | 'key' | 'isHighlighted'>;

export type DynamicTableProps = Pick<
	StatefulProps,
	| 'defaultPage'
	| 'defaultSortKey'
	| 'defaultSortOrder'
	| 'emptyView'
	| 'head'
	| 'highlightedRowIndex'
	| 'isFixedSize'
	| 'isLoading'
	| 'isRankable'
	| 'label'
	| 'loadingSpinnerSize'
	| 'onRankEnd'
	| 'onRankStart'
	| 'onSetPage'
	| 'page'
	| 'paginationi18n'
	| 'rowsPerPage'
	| 'sortKey'
	| 'sortOrder'
	| 'testId'
> & {
	rows?: NewRowType[];
	caption?: string;
};

/**
 * A dynamic table displays rows of data with built-in pagination, sorting, and re-ordering functionality.
 */
export type TDynamicTable<T> = (props: DynamicTableProps) => T;