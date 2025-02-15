import type { Node as ProseMirrorNode } from '@atlaskit/editor-prosemirror/model';

import type { SortOrder } from './constants';
import type { SideEffects, SideEffectsJSON } from './utils/side-effects/types';

export type ColumnInfo = Map<number, CellStep>;

export interface AddColumnStepInfo {
	cells: CellStep[];
	sideEffects?: SideEffects;
}

/**
 * Information about the cell
 * from: where the cell will be added removed
 * to: where the original cell ends
 * newCell?: the content of the new cells if it's added
 */
export interface CellStep {
	from: number; // beginning of cell at column
	to: number; // end of cell at column

	// Used to add a cell with a specific content. Useful for reverse a delete add column
	newCell?: ProseMirrorNode;

	mergeWith?: number; // Represent the cell that has to do the merge operation
}

export interface CellStepJson {
	from: number;
	to: number; // end of cell at column

	// Used to add a cell with a specific content. Useful for reverse a delete add column
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	newCell?: { [key: string]: any }; // ToJson type of ProseMirrorNode.toJson()
	mergeWith?: number; // Represent the cell that has to do the merge operation
}

export interface AddColumnStepJson {
	stepType: 'ak-add-column';
	tablePos: number;
	cells: CellStepJson[];
	sideEffects?: SideEffectsJSON;
	isDelete: boolean;
}

export interface TableColumnOrdering {
	columnIndex: number;
	order: SortOrder;
}
