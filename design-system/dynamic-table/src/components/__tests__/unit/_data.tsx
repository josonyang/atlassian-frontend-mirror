import { type HeadType, type RowType } from '../../../types';

import testData from './_data-json.json';

export const sortKey = 'first_name';
export const secondSortKey = 'last_name';
export const thirdSortKey = 'party';

// Presidents data
export const head: HeadType = {
	cells: [
		{
			key: sortKey,
			content: 'First name',
			isSortable: true,
		},
		{
			key: secondSortKey,
			content: 'Last name',
		},
		{
			key: thirdSortKey,
			content: 'Party',
			isSortable: true,
		},
	],
};

export const rows = testData;

export const row = rows[0];

export const rowsWithKeys: Array<RowType> = rows.map((tRow: RowType, rowIndex: number) => {
	return {
		key: `${rowIndex}`,
		...tRow,
	};
});

export const rowWithKey = rowsWithKeys[0];

export const cellWithKey = rowWithKey.cells[0];
