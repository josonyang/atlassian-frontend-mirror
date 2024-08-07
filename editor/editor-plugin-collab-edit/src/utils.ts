import { AnalyticsStep, SetAttrsStep } from '@atlaskit/adf-schema/steps';
import type { AnalyticsEventPayload, EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '@atlaskit/editor-common/analytics';
import type { CollabEditOptions, CollabParticipant } from '@atlaskit/editor-common/collab';
import { ZERO_WIDTH_JOINER } from '@atlaskit/editor-common/whitespace';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import {
	type EditorState,
	type ReadonlyTransaction,
	Transaction,
} from '@atlaskit/editor-prosemirror/state';
import { Selection, TextSelection } from '@atlaskit/editor-prosemirror/state';
import { ReplaceStep } from '@atlaskit/editor-prosemirror/transform';
import type { Step } from '@atlaskit/editor-prosemirror/transform';
import type { DecorationSet, EditorView } from '@atlaskit/editor-prosemirror/view';
import { Decoration } from '@atlaskit/editor-prosemirror/view';
import { avatarColors } from '@atlaskit/editor-shared-styles/consts';

export const findPointers = (id: string, decorations: DecorationSet): Decoration[] =>
	decorations
		.find()
		.reduce((arr, deco: any) => (deco.spec.pointer.sessionId === id ? arr.concat(deco) : arr), []);

function style(options: { color: string }) {
	const color = (options && options.color) || 'black';
	return `border-right: 2px solid ${color}; margin-right: -2px;`;
}

export function getAvatarColor(str: string) {
	let hash = 0;

	for (let i = 0; i < str.length; i++) {
		/* eslint-disable no-bitwise */
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash = hash & hash;
		/* eslint-enable no-bitwise */
	}

	const index = Math.abs(hash) % avatarColors.length;

	return { index, color: avatarColors[index] };
}

export const createTelepointers = (
	from: number,
	to: number,
	sessionId: string,
	isSelection: boolean,
	initial: string,
) => {
	let decorations: Decoration[] = [];
	const avatarColor = getAvatarColor(sessionId);
	const color = avatarColor.index.toString();
	if (isSelection) {
		const className = `telepointer color-${color} telepointer-selection`;
		decorations.push(
			(Decoration as any).inline(
				from,
				to,
				{ class: className, 'data-initial': initial },
				{ pointer: { sessionId } },
			),
		);
	}

	const spaceJoinerBefore = document.createElement('span');
	spaceJoinerBefore.textContent = ZERO_WIDTH_JOINER;
	const spaceJoinerAfter = document.createElement('span');
	spaceJoinerAfter.textContent = ZERO_WIDTH_JOINER;

	const cursor = document.createElement('span');
	cursor.textContent = ZERO_WIDTH_JOINER;
	cursor.className = `telepointer color-${color} telepointer-selection-badge`;
	cursor.style.cssText = `${style({ color: avatarColor.color })};`;
	cursor.setAttribute('data-initial', initial);
	return decorations
		.concat(
			(Decoration as any).widget(to, spaceJoinerAfter, {
				pointer: { sessionId },
				key: `telepointer-${sessionId}-zero`,
			}),
		)
		.concat(
			(Decoration as any).widget(to, cursor, {
				pointer: { sessionId },
				key: `telepointer-${sessionId}`,
			}),
		)
		.concat(
			(Decoration as any).widget(to, spaceJoinerBefore, {
				pointer: { sessionId },
				key: `telepointer-${sessionId}-zero`,
			}),
		);
};

export const replaceDocument = (
	doc: any,
	state: EditorState,
	version?: number,
	options?: CollabEditOptions,
	reserveCursor?: boolean,
) => {
	const { schema, tr } = state;

	let content: Array<PMNode> = (doc.content || []).map((child: any) => schema.nodeFromJSON(child));
	let hasContent = !!content.length;

	if (hasContent) {
		tr.setMeta('addToHistory', false);
		tr.replaceWith(0, state.doc.nodeSize - 2, content!);
		const selection = state.selection;
		if (reserveCursor) {
			// If the cursor is still in the range of the new document,
			// keep where it was.
			if (selection.to < tr.doc.content.size - 2) {
				const $from = tr.doc.resolve(selection.from);
				const $to = tr.doc.resolve(selection.to);
				const newselection = new TextSelection($from, $to);
				tr.setSelection(newselection);
			}
		} else {
			tr.setSelection(Selection.atStart(tr.doc));
		}
		tr.setMeta('replaceDocument', true);

		if (typeof version !== undefined && options && options.useNativePlugin) {
			const collabState = { version, unconfirmed: [] };
			tr.setMeta('collab$', collabState);
		}
	}

	return tr;
};

export const scrollToCollabCursor = (
	editorView: EditorView,
	participants: CollabParticipant[],
	sessionId: string | undefined,
	// analytics: AnalyticsEvent | undefined,
	index: number,
	editorAnalyticsAPI: EditorAnalyticsAPI | undefined,
) => {
	const selectedUser = participants[index];
	if (
		selectedUser &&
		selectedUser.cursorPos !== undefined &&
		selectedUser.sessionId !== sessionId
	) {
		const { state } = editorView;
		let tr = state.tr;
		const analyticsPayload: AnalyticsEventPayload = {
			action: ACTION.MATCHED,
			actionSubject: ACTION_SUBJECT.SELECTION,
			eventType: EVENT_TYPE.TRACK,
		};
		tr.setSelection(Selection.near(tr.doc.resolve(selectedUser.cursorPos)));
		editorAnalyticsAPI?.attachAnalyticsEvent(analyticsPayload)(tr);
		tr.scrollIntoView();
		editorView.dispatch(tr);
		if (!editorView.hasFocus()) {
			editorView.focus();
		}
	}
};

export const getPositionOfTelepointer = (
	sessionId: string,
	decorationSet: DecorationSet,
): undefined | number => {
	let scrollPosition;
	decorationSet.find().forEach((deco: any) => {
		if (deco.type.spec.pointer.sessionId === sessionId) {
			scrollPosition = deco.from;
		}
	});
	return scrollPosition;
};

export const isReplaceStep = (step: Step) => step instanceof ReplaceStep;

export const originalTransactionHasMeta = (
	transaction: Transaction | ReadonlyTransaction,
	metaTag: string,
): boolean => {
	const hasMetaTag = Boolean(transaction.getMeta(metaTag));
	if (hasMetaTag) {
		return true;
	}
	const appendedTransaction = transaction.getMeta('appendedTransaction');
	if (appendedTransaction instanceof Transaction) {
		return originalTransactionHasMeta(appendedTransaction, metaTag);
	}
	return false;
};

/**
 * This list contains step attributes that do not result from a user action.
 * All steps that contain ONLY the blocked attribute are considered automated steps
 * and should not be recognised as organic change.
 *
 * `attr_colwidth` is an exception to above explanation. Resizing the column
 * currently creates too many steps and is therefore also on this list.
 *
 * Steps analycs dashboard: https://atlassian-discover.cloud.databricks.com/dashboardsv3/01ef4d3c8aa916c8b0cb5332a9f37caf/published?o=4482001201517624
 */
const blockedAttrsList = ['__contextId', 'localId', '__autoSize', 'attr_colwidth'];

/**
 * Takes the transaction and editor state and checks if the transaction is considered organic change
 * @param tr Transaction
 * @returns boolean
 */
export const isOrganicChange = (tr: ReadonlyTransaction) => {
	// If document has not been marked as `docChanged` by PM, skip the rest of the logic
	if (!tr.docChanged) {
		return false;
	}

	return tr.steps.some((step: Step) => {
		// If a step is an instance of AnalyticsStep, it is not considered organic
		if (step instanceof AnalyticsStep) {
			return false;
		}
		// If a step is not an instance of SetAttrsStep, it is considered organic
		if (!(step instanceof SetAttrsStep)) {
			return true;
		}

		const allAttributes = Object.keys(step.attrs);
		// If a step is an instance of SetAttrsStep, it checks if the attributes in the step
		// are not in the `blockedAttributes`. If one of the attributes not on the list, it considers the change
		// organic but only if the entire document is not equal to the previous state.
		return (
			allAttributes.some((attr) => {
				if (!blockedAttrsList.includes(attr)) {
					return true;
				}
			}) && !tr.doc.eq(tr.before)
		);
	});
};
