import type { Node, Schema } from '@atlaskit/editor-prosemirror/model';
import type { Transaction } from '@atlaskit/editor-prosemirror/state';
import { ReplaceAroundStep, ReplaceStep } from '@atlaskit/editor-prosemirror/transform';
import { expValEqualsNoExposure } from '@atlaskit/tmp-editor-statsig/exp-val-equals-no-exposure';

interface ApplyTaskListNormalisationFixesOptions {
	doc: Node;
	schema: Schema;
	tr: Transaction;
	transactions: readonly Transaction[];
}

function getAffectedTaskListsFromTransactions(
	transactions: readonly Transaction[],
	doc: Node,
	schema: Schema,
): Map<number, Node> {
	const { taskList } = schema.nodes;
	if (!taskList) {
		return new Map();
	}

	const result = new Map<number, Node>();

	for (const tr of transactions) {
		for (const step of tr.steps) {
			// ReplaceStep and ReplaceAroundStep both have from/to — other step types are skipped.
			if (!(step instanceof ReplaceStep) && !(step instanceof ReplaceAroundStep)) {
				continue;
			}
			// Check both the start and end of each changed range, mapped to post-transaction positions.
			for (const rawPos of [step.from, step.to]) {
				const mappedPos = Math.min(tr.mapping.map(rawPos), doc.content.size - 1);
				const $pos = doc.resolve(mappedPos);
				// Walk ancestors from inner to outer, recording the outermost taskList node.
				// Once we find a taskList and then exit list structure (hit a non-taskList ancestor),
				// break early — prevents container nodes (e.g. panel) from causing us to
				// return an outer taskList in a different structural context.
				let rootTaskListPos: number | null = null;
				let rootTaskListNode: Node | null = null;
				for (let depth = $pos.depth; depth >= 0; depth--) {
					const node = $pos.node(depth);
					if (node.type === taskList) {
						rootTaskListPos = $pos.before(depth);
						rootTaskListNode = node;
					} else if (rootTaskListNode !== null && node.type !== schema.nodes.taskItem) {
						// We've exited the taskList structure — stop walking.
						break;
					}
				}
				if (rootTaskListPos !== null && rootTaskListNode !== null) {
					result.set(rootTaskListPos, rootTaskListNode);
				}
			}
		}
	}

	return result;
}

export function applyTaskListNormalisationFixes({
	doc,
	schema,
	tr,
	transactions,
}: ApplyTaskListNormalisationFixesOptions): Transaction {
	const { taskList, taskItem } = schema.nodes;
	if (!taskList || !taskItem) {
		return tr;
	}

	const affectedTaskLists = getAffectedTaskListsFromTransactions(transactions, doc, schema);
	if (affectedTaskLists.size === 0) {
		return tr;
	}

	// Sort by position descending so we process deeper/later positions first,
	// preventing earlier insertions from shifting later positions.
	const sortedEntries = [...affectedTaskLists.entries()].sort(([a], [b]) => b - a);

	for (const [taskListPos] of sortedEntries) {
		// Re-resolve the taskList node from the current transaction doc (post-operation state).
		const mappedTaskListPos = tr.mapping.map(taskListPos);
		const currentTaskListNode = tr.doc.nodeAt(mappedTaskListPos);
		if (!currentTaskListNode) {
			continue;
		}

		if (!expValEqualsNoExposure('platform_editor_flexible_list_indentation', 'isEnabled', true)) {
			// Collect positions of all taskList nodes (at any depth) whose direct children
			// include a taskList — this is the invalid structure. The taskList schema requires
			// taskItem as children, not nested taskLists directly.
			// Process in reverse order so higher-position insertions don't shift lower positions.
			const invalidTaskListPositions: number[] = [];
			currentTaskListNode.descendants((node, offsetPos) => {
				if (node.type === taskList) {
					// A taskList as the FIRST child of another taskList is invalid — it means a
					// delete or paste removed the leading taskItem, leaving a bare nested list.
					// A taskList that follows a taskItem is valid (that's normal indentation).
					const firstChild = node.firstChild;
					if (firstChild && firstChild.type === taskList) {
						const pos = mappedTaskListPos + 1 + offsetPos + 1;
						invalidTaskListPositions.push(pos);
					}
				}
				return true;
			});

			// Process in reverse (highest positions first).
			for (let i = invalidTaskListPositions.length - 1; i >= 0; i--) {
				const remappedPos = tr.mapping.map(invalidTaskListPositions[i]);
				const emptyTaskItem = taskItem.createAndFill();
				if (emptyTaskItem) {
					tr.insert(remappedPos, emptyTaskItem);
				}
			}
		}
	}

	return tr;
}
