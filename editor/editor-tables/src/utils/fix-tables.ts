import { type Node } from '@atlaskit/editor-prosemirror/model';
import { type EditorState, type Transaction } from '@atlaskit/editor-prosemirror/state';

import { fixTablesKey } from '../pm-plugins/plugin-key';
import {
	TableMap,
	type TableProblemCollision,
	type TableProblemLongRowspan,
	type TableProblemMissing,
	TableProblemTypes,
} from '../table-map';

import { removeColSpan } from './colspan';
import { tableNodeTypes } from './table-node-types';

export type ReportFixedTable = ({
	state,
	tr,
	reason,
}: {
	state: EditorState;
	tr: Transaction;
	reason: string;
}) => void;

// Helper for iterating through the nodes in a document that changed
// compared to the given previous document. Useful for avoiding
// duplicate work on each transaction.
function changedDescendants(
	old: Node,
	cur: Node,
	offsetStart: number,
	f: (child: Node, offset: number) => void,
): void {
	let offset = offsetStart;
	const oldSize = old.childCount;
	const curSize = cur.childCount;
	// eslint-disable-next-line no-labels
	outer: for (let i = 0, j = 0; i < curSize; i++) {
		const child = cur.child(i);
		for (let scan = j, e = Math.min(oldSize, i + 3); scan < e; scan++) {
			if (old.child(scan) === child) {
				j = scan + 1;
				offset += child.nodeSize;
				// eslint-disable-next-line no-continue, no-labels
				continue outer;
			}
		}
		f(child, offset);
		if (j < oldSize && old.child(j).sameMarkup(child)) {
			changedDescendants(old.child(j), child, offset + 1, f);
		} else {
			child.nodesBetween(0, child.content.size, f, offset + 1);
		}
		offset += child.nodeSize;
	}
}

// :: (EditorState, ?EditorState) → ?Transaction
// Inspect all tables in the given state's document and return a
// transaction that fixes them, if necessary. If `oldState` was
// provided, that is assumed to hold a previous, known-good state,
// which will be used to avoid re-scanning unchanged parts of the
// document.
export function fixTables(
	state: EditorState,
	oldState?: EditorState,
	reportFixedTable?: ReportFixedTable,
): Transaction | undefined {
	let tr: Transaction | undefined;
	const check = (node: Node, pos: number) => {
		if (node.type.spec.tableRole === 'table') {
			tr = fixTable(state, node, pos, tr, reportFixedTable);
		}
	};
	if (!oldState) {
		state.doc.descendants(check);
	} else if (oldState.doc !== state.doc) {
		changedDescendants(oldState.doc, state.doc, 0, check);
	}
	return tr;
}

// : (EditorState, Node, number, ?Transaction) → ?Transaction
// Fix the given table, if necessary. Will append to the transaction
// it was given, if non-null, or create a new one if necessary.
export function fixTable(
	state: EditorState,
	table: Node,
	tablePos: number,
	transaction?: Transaction,
	reportFixedTable?: ReportFixedTable,
): Transaction | undefined {
	let tr = transaction;
	const map = TableMap.get(table);
	if (!map.problems) {
		return tr;
	}
	if (!tr) {
		tr = state.tr;
	}

	// Track which rows we must add cells to, so that we can adjust that
	// when fixing collisions.
	const mustAdd = [];
	for (let i = 0; i < map.height; i++) {
		mustAdd.push(0);
	}

	for (let i = 0; i < map.problems.length; i++) {
		const prob = map.problems[i];

		if (reportFixedTable) {
			reportFixedTable({ state, tr, reason: prob.type || 'unknown' });
		}

		if (prob.type === TableProblemTypes.COLLISION) {
			const collision = prob as TableProblemCollision;
			const cell = table.nodeAt(prob.pos);
			if (!cell) {
				throw new Error(`fixTable: unable to find cell at pos ${prob.pos}`);
			}
			for (let j = 0; j < cell.attrs.rowspan; j++) {
				mustAdd[collision.row + j] += collision.n;
			}
			tr.setNodeMarkup(
				tr.mapping.map(tablePos + 1 + prob.pos),
				undefined,
				removeColSpan(cell.attrs, cell.attrs.colspan - collision.n, collision.n),
			);
		} else if (prob.type === TableProblemTypes.MISSING) {
			const missing = prob as TableProblemMissing;
			mustAdd[missing.row] += missing.n;
		} else if (prob.type === TableProblemTypes.OVERLONG_ROWSPAN) {
			const overlong = prob as TableProblemLongRowspan;
			const cell = table.nodeAt(overlong.pos);
			if (!cell) {
				throw new Error(`fixTable: unable to find cell at pos ${prob.pos}`);
			}
			tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + overlong.pos), undefined, {
				...cell.attrs,
				rowspan: cell.attrs.rowspan - overlong.n,
			});
		} else if (prob.type === TableProblemTypes.COLWIDTH_MISMATCH) {
			const cell = table.nodeAt(prob.pos);
			if (!cell) {
				throw new Error(`fixTable: unable to find cell at pos ${prob.pos}`);
			}
			tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), undefined, {
				...cell.attrs,
				colwidth: prob.colwidth,
			});
		}
	}
	let first;
	let last;
	for (let i = 0; i < mustAdd.length; i++) {
		if (mustAdd[i]) {
			if (first == null) {
				first = i;
			}
			last = i;
		}
	}
	// Add the necessary cells, using a heuristic for whether to add the
	// cells at the start or end of the rows (if it looks like a 'bite'
	// was taken out of the table, add cells at the start of the row
	// after the bite. Otherwise add them at the end).
	for (let i = 0, pos = tablePos + 1; i < map.height; i++) {
		const row = table.child(i);
		const end = pos + row.nodeSize;
		const add = mustAdd[i];
		if (add > 0) {
			let tableNodeType = 'cell';
			if (row.firstChild) {
				tableNodeType = row.firstChild.type.spec.tableRole;
			}
			const nodes: Node[] = [];
			for (let j = 0; j < add; j++) {
				// Ignored via go/ees005
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				nodes.push(tableNodeTypes(state.schema)[tableNodeType].createAndFill()!);
			}
			const side = (i === 0 || first === i - 1) && last === i ? pos + 1 : end - 1;
			tr.insert(tr.mapping.map(side), nodes);
		}
		pos = end;
	}
	return tr.setMeta(fixTablesKey, { fixTables: true });
}
