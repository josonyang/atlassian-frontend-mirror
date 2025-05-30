import type {
	AnalyticsEventPayload,
	EditorAnalyticsAPI,
	PASTE_ACTION_SUBJECT_ID,
	PasteContent,
	PasteSource,
	PasteType,
} from '@atlaskit/editor-common/analytics';
import {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
	INPUT_METHOD,
	PasteContents,
	PasteTypes,
} from '@atlaskit/editor-common/analytics';
import type { Command, ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { getLinkDomain, mapSlice } from '@atlaskit/editor-common/utils';
import type { FindRootParentListNode } from '@atlaskit/editor-plugin-list';
import type { InsertMediaAsMediaSingle } from '@atlaskit/editor-plugin-media/types';
import type { Fragment, Node, Schema, Slice } from '@atlaskit/editor-prosemirror/model';
import type { Selection, Transaction } from '@atlaskit/editor-prosemirror/state';
import { findParentNode } from '@atlaskit/editor-prosemirror/utils';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import type { PastePlugin } from '../index';

import { getPasteSource } from './util';
import {
	handleCodeBlock,
	handleExpandPaste,
	handleMarkdown,
	handleMediaSingle,
	handlePasteAsPlainText,
	handlePasteIntoCaption,
	handlePasteIntoTaskOrDecisionOrPanel,
	handlePasteLinkOnSelectedText,
	handlePasteNonNestableBlockNodesIntoList,
	handlePastePanelOrDecisionContentIntoList,
	handlePastePreservingMarks,
	handleRichText,
	handleSelectedTable,
	handleNestedTablePaste,
} from './util/handlers';

type PasteContext = {
	type: PasteType;
	asPlain?: boolean;
	/** Has the hyperlink been pasted while text is selected, making the text into a link? */
	hyperlinkPasteOnText?: boolean;
	/** Did this paste action split a list in half? */
	pasteSplitList?: boolean;
};

type PastePayloadAttributes = {
	pasteSize: number;
	type: PasteType;
	content: PasteContent;
	source: PasteSource;
	/** Has the hyperlink been pasted while text is selected, making the text into a link? */
	hyperlinkPasteOnText: boolean;
	/** How many links are in our pasted content? */
	linksInPasteCount: number;
	/** An identifier for tracing media operations(trouble shooting purpose) */
	mediaTraceId?: string;
	/**
	 * A list of mention ids that were pasted.
	 *
	 * This does not dedupe mentions, so if the same mention is pasted twice, it will appear twice in this list.
	 *
	 * This is used by Live Pages in confluence to provide an mechanism to users for preventing mention notifications
	 * from being sent to users mentioned in Live Pages.
	 * https://product-fabric.atlassian.net/browse/COMMENTS-913
	 */
	mentionIds: string[];
	mentionLocalIds: string[];
	/** Did this paste action split a list in half? */
	pasteSplitList?: boolean;
};

const contentToPasteContent: { [name: string]: PasteContent } = {
	url: PasteContents.url,
	paragraph: PasteContents.text,
	bulletList: PasteContents.bulletList,
	orderedList: PasteContents.orderedList,
	heading: PasteContents.heading,
	blockquote: PasteContents.blockquote,
	codeBlock: PasteContents.codeBlock,
	panel: PasteContents.panel,
	rule: PasteContents.rule,
	mediaSingle: PasteContents.mediaSingle,
	mediaCard: PasteContents.mediaCard,
	mediaGroup: PasteContents.mediaGroup,
	table: PasteContents.table,
	tableCells: PasteContents.tableCells,
	tableHeader: PasteContents.tableHeader,
	tableRow: PasteContents.tableRow,
	decisionList: PasteContents.decisionList,
	decisionItem: PasteContents.decisionItem,
	taskList: PasteContents.taskItem,
	extension: PasteContents.extension,
	bodiedExtension: PasteContents.bodiedExtension,
	blockCard: PasteContents.blockCard,
	layoutSection: PasteContents.layoutSection,
};

const nodeToActionSubjectId: { [name: string]: PASTE_ACTION_SUBJECT_ID } = {
	blockquote: ACTION_SUBJECT_ID.PASTE_BLOCKQUOTE,
	blockCard: ACTION_SUBJECT_ID.PASTE_BLOCK_CARD,
	bodiedExtension: ACTION_SUBJECT_ID.PASTE_BODIED_EXTENSION,
	bulletList: ACTION_SUBJECT_ID.PASTE_BULLET_LIST,
	codeBlock: ACTION_SUBJECT_ID.PASTE_CODE_BLOCK,
	decisionList: ACTION_SUBJECT_ID.PASTE_DECISION_LIST,
	extension: ACTION_SUBJECT_ID.PASTE_EXTENSION,
	heading: ACTION_SUBJECT_ID.PASTE_HEADING,
	mediaGroup: ACTION_SUBJECT_ID.PASTE_MEDIA_GROUP,
	mediaSingle: ACTION_SUBJECT_ID.PASTE_MEDIA_SINGLE,
	orderedList: ACTION_SUBJECT_ID.PASTE_ORDERED_LIST,
	panel: ACTION_SUBJECT_ID.PASTE_PANEL,
	rule: ACTION_SUBJECT_ID.PASTE_RULE,
	table: ACTION_SUBJECT_ID.PASTE_TABLE,
	tableCell: ACTION_SUBJECT_ID.PASTE_TABLE_CELL,
	tableHeader: ACTION_SUBJECT_ID.PASTE_TABLE_HEADER,
	tableRow: ACTION_SUBJECT_ID.PASTE_TABLE_ROW,
	taskList: ACTION_SUBJECT_ID.PASTE_TASK_LIST,
};

type GetContentProps = {
	schema: Schema;
	slice: Slice;
};
export function getContent({ schema, slice }: GetContentProps): PasteContent {
	const {
		nodes: { paragraph },
		marks: { link },
	} = schema;
	const nodeOrMarkName = new Set<string>();
	slice.content.forEach((node: Node) => {
		if (node.type === paragraph && node.content.size === 0) {
			// Skip empty paragraph
			return;
		}

		if (node.type.name === 'text' && link.isInSet(node.marks)) {
			nodeOrMarkName.add('url');
			return;
		}

		// Check node contain link
		if (node.type === paragraph && node.rangeHasMark(0, node.nodeSize - 2, link)) {
			nodeOrMarkName.add('url');
			return;
		}
		nodeOrMarkName.add(node.type.name);
	});

	if (nodeOrMarkName.size > 1) {
		return PasteContents.mixed;
	}

	if (nodeOrMarkName.size === 0) {
		return PasteContents.uncategorized;
	}
	const type = nodeOrMarkName.values().next().value;
	const pasteContent = contentToPasteContent[type];

	return pasteContent ? pasteContent : PasteContents.uncategorized;
}

export function getMediaTraceId(slice: Slice) {
	let traceId;
	mapSlice(slice, (node) => {
		if (node.type.name === 'media' || node.type.name === 'mediaInline') {
			traceId = node.attrs.__mediaTraceId;
		}
		return node;
	});
	return traceId;
}

type GetActionSubjectIdProps = {
	selection: Selection;
	schema: Schema;
};
function getActionSubjectId({
	selection,
	schema,
}: GetActionSubjectIdProps): PASTE_ACTION_SUBJECT_ID {
	const {
		nodes: { paragraph, listItem, taskItem, decisionItem },
	} = schema;
	const parent = findParentNode((node: Node) => {
		if (
			node.type !== paragraph &&
			node.type !== listItem &&
			node.type !== taskItem &&
			node.type !== decisionItem
		) {
			return true;
		}
		return false;
	})(selection);

	if (!parent) {
		return ACTION_SUBJECT_ID.PASTE_PARAGRAPH;
	}
	const parentType = parent.node.type;
	const actionSubjectId = nodeToActionSubjectId[parentType.name];

	return actionSubjectId ? actionSubjectId : ACTION_SUBJECT_ID.PASTE_PARAGRAPH;
}

function createPasteAsPlainPayload(
	actionSubjectId: PASTE_ACTION_SUBJECT_ID,
	text: string,
	linksInPasteCount: number,
): AnalyticsEventPayload {
	return {
		action: ACTION.PASTED_AS_PLAIN,
		actionSubject: ACTION_SUBJECT.DOCUMENT,
		actionSubjectId,
		eventType: EVENT_TYPE.TRACK,
		attributes: {
			inputMethod: INPUT_METHOD.KEYBOARD,
			pasteSize: text.length,
			linksInPasteCount,
		},
	};
}

function createPastePayload(
	actionSubjectId: PASTE_ACTION_SUBJECT_ID,
	attributes: PastePayloadAttributes,
	linkDomain?: string[],
): AnalyticsEventPayload {
	return {
		action: ACTION.PASTED,
		actionSubject: ACTION_SUBJECT.DOCUMENT,
		actionSubjectId,
		eventType: EVENT_TYPE.TRACK,
		attributes: {
			inputMethod: INPUT_METHOD.KEYBOARD,
			...attributes,
		},
		...(linkDomain && linkDomain.length > 0 ? { nonPrivacySafeAttributes: { linkDomain } } : {}),
	};
}

function createPasteAnalyticsPayloadBySelection(
	event: ClipboardEvent,
	slice: Slice,
	pasteContext: PasteContext,
	pluginInjectionApi?: ExtractInjectionAPI<PastePlugin>,
) {
	return (selection: Selection): AnalyticsEventPayload => {
		const text = event.clipboardData
			? event.clipboardData.getData('text/plain') || event.clipboardData.getData('text/uri-list')
			: '';

		const actionSubjectId = getActionSubjectId({
			selection: selection,
			schema: selection.$from.doc.type.schema,
		});

		const pasteSize = slice.size;
		const content = getContent({
			schema: selection.$from.doc.type.schema,
			slice,
		});
		const linkUrls: string[] = [];
		const mediaTraceId = getMediaTraceId(slice);

		// If we have a link among the pasted content, grab the
		// domain and send it up with the analytics event
		if (content === PasteContents.url || content === PasteContents.mixed) {
			mapSlice(slice, (node) => {
				const linkMark = node.marks.find((mark) => mark.type.name === 'link');
				if (linkMark) {
					linkUrls.push(linkMark.attrs.href);
				}
				return node;
			});
		}

		if (pasteContext.asPlain) {
			return createPasteAsPlainPayload(actionSubjectId, text, linkUrls.length);
		}

		const source = getPasteSource(event);

		const mentionIds: string[] = [];
		const mentionLocalIds: string[] = [];
		slice.content.descendants((node) => {
			if (node.type.name === 'mention') {
				mentionIds.push(node.attrs.id);
				mentionLocalIds.push(node.attrs.localId);
			}
		});

		if (pluginInjectionApi?.mention?.actions?.announceMentionsInsertion) {
			const mentionsInserted: {
				type: 'added';
				id: string;
				localId: string;
				taskLocalId?: string;
				method?: 'pasted' | 'typed';
			}[] = [];
			slice.content.descendants((node) => {
				if (node.type.name === 'mention') {
					mentionsInserted.push({
						type: 'added',
						id: node.attrs.id,
						localId: node.attrs.localId,
						method: 'pasted',
					});
				}
				if (node.type.name === 'taskItem') {
					node.content.forEach((nodeContent) => {
						if (nodeContent.type.name === 'mention') {
							mentionsInserted.push({
								type: 'added',
								localId: nodeContent.attrs.localId,
								id: nodeContent.attrs.id,
								taskLocalId: node.attrs.localId,
								method: 'pasted',
							});
						}
					});
					return false;
				}
			});
			pluginInjectionApi?.mention?.actions?.announceMentionsInsertion(mentionsInserted);
		}

		if (pasteContext.type === PasteTypes.plain) {
			return createPastePayload(actionSubjectId, {
				pasteSize: text.length,
				type: pasteContext.type,
				content: PasteContents.text,
				source,
				hyperlinkPasteOnText: false,
				linksInPasteCount: linkUrls.length,
				mentionIds,
				mentionLocalIds,
				pasteSplitList: pasteContext.pasteSplitList,
			});
		}

		const linkDomains = linkUrls.map(getLinkDomain);
		return createPastePayload(
			actionSubjectId,
			{
				type: pasteContext.type,
				pasteSize,
				content,
				source,
				hyperlinkPasteOnText: !!pasteContext.hyperlinkPasteOnText,
				linksInPasteCount: linkUrls.length,
				mediaTraceId,
				mentionIds,
				mentionLocalIds,
				pasteSplitList: pasteContext.pasteSplitList,
			},
			linkDomains,
		);
	};
}

export function createPasteAnalyticsPayload(
	view: EditorView,
	event: ClipboardEvent,
	slice: Slice,
	pasteContext: PasteContext,
): AnalyticsEventPayload {
	return createPasteAnalyticsPayloadBySelection(event, slice, pasteContext)(view.state.selection);
}

// TODO: ED-6612 - We should not dispatch only analytics, it's preferred to wrap each command with his own analytics.
// However, handlers like handleMacroAutoConvert dispatch multiple time,
// so pasteCommandWithAnalytics is useless in this case.
export const sendPasteAnalyticsEvent =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(view: EditorView, event: ClipboardEvent, slice: Slice, pasteContext: PasteContext) => {
		const tr = view.state.tr;
		const payload = createPasteAnalyticsPayload(view, event, slice, pasteContext);

		editorAnalyticsAPI?.attachAnalyticsEvent(payload)(tr);

		view.dispatch(tr);
	};

export const handlePasteAsPlainTextWithAnalytics =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(view: EditorView, event: ClipboardEvent, slice: Slice): Command =>
		injectAnalyticsPayloadBeforeCommand(editorAnalyticsAPI)(
			createPasteAnalyticsPayloadBySelection(event, slice, {
				type: PasteTypes.plain,
				asPlain: true,
			}),
		)(handlePasteAsPlainText(slice, event, editorAnalyticsAPI));

export const handlePasteIntoTaskAndDecisionWithAnalytics = (
	view: EditorView,
	event: ClipboardEvent,
	slice: Slice,
	type: PasteType,
	pluginInjectionApi: ExtractInjectionAPI<PastePlugin> | undefined,
): Command =>
	injectAnalyticsPayloadBeforeCommand(pluginInjectionApi?.analytics?.actions)(
		createPasteAnalyticsPayloadBySelection(event, slice, {
			type,
		}),
	)(
		handlePasteIntoTaskOrDecisionOrPanel(
			slice,
			pluginInjectionApi?.card?.actions?.queueCardsFromChangedTr,
		),
	);

export const handlePasteIntoCaptionWithAnalytics =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(view: EditorView, event: ClipboardEvent, slice: Slice, type: PasteType): Command =>
		injectAnalyticsPayloadBeforeCommand(editorAnalyticsAPI)(
			createPasteAnalyticsPayloadBySelection(event, slice, {
				type,
			}),
		)(handlePasteIntoCaption(slice));

export const handleCodeBlockWithAnalytics =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(view: EditorView, event: ClipboardEvent, slice: Slice, text: string): Command =>
		injectAnalyticsPayloadBeforeCommand(editorAnalyticsAPI)(
			createPasteAnalyticsPayloadBySelection(event, slice, {
				type: PasteTypes.plain,
			}),
		)(handleCodeBlock(text));

export const handleMediaSingleWithAnalytics =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(
		view: EditorView,
		event: ClipboardEvent,
		slice: Slice,
		type: PasteType,
		insertMediaAsMediaSingle: InsertMediaAsMediaSingle | undefined,
	): Command =>
		injectAnalyticsPayloadBeforeCommand(editorAnalyticsAPI)(
			createPasteAnalyticsPayloadBySelection(event, slice, {
				type,
			}),
		)(handleMediaSingle(INPUT_METHOD.CLIPBOARD, insertMediaAsMediaSingle)(slice));

export const handlePastePreservingMarksWithAnalytics = (
	view: EditorView,
	event: ClipboardEvent,
	slice: Slice,
	type: PasteType,
	pluginInjectionApi: ExtractInjectionAPI<PastePlugin> | undefined,
): Command =>
	injectAnalyticsPayloadBeforeCommand(pluginInjectionApi?.analytics?.actions)(
		createPasteAnalyticsPayloadBySelection(event, slice, {
			type,
		}),
	)(handlePastePreservingMarks(slice, pluginInjectionApi?.card?.actions?.queueCardsFromChangedTr));

export const handleMarkdownWithAnalytics = (
	view: EditorView,
	event: ClipboardEvent,
	slice: Slice,
	pluginInjectionApi: ExtractInjectionAPI<PastePlugin> | undefined,
): Command =>
	injectAnalyticsPayloadBeforeCommand(pluginInjectionApi?.analytics?.actions)(
		createPasteAnalyticsPayloadBySelection(event, slice, {
			type: PasteTypes.markdown,
		}),
	)(handleMarkdown(slice, pluginInjectionApi?.card?.actions?.queueCardsFromChangedTr));

export const handleRichTextWithAnalytics = (
	view: EditorView,
	event: ClipboardEvent,
	slice: Slice,
	pluginInjectionApi: ExtractInjectionAPI<PastePlugin> | undefined,
): Command =>
	injectAnalyticsPayloadBeforeCommand(pluginInjectionApi?.analytics?.actions)(
		createPasteAnalyticsPayloadBySelection(
			event,
			slice,
			{
				type: PasteTypes.richText,
			},
			pluginInjectionApi,
		),
	)(handleRichText(slice, pluginInjectionApi?.card?.actions?.queueCardsFromChangedTr));

const injectAnalyticsPayloadBeforeCommand =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(createPayloadByTransaction: (selection: Selection) => AnalyticsEventPayload) => {
		return (mainCommand: Command): Command => {
			return (state, dispatch, view) => {
				let originalTransaction: Transaction = state.tr;
				const fakeDispatch = (tr: Transaction) => {
					originalTransaction = tr;
				};

				const result = mainCommand(state, fakeDispatch, view);

				if (!result) {
					return false;
				}
				if (dispatch && originalTransaction.docChanged) {
					// it needs to know the selection before the changes
					const payload = createPayloadByTransaction(state.selection);
					editorAnalyticsAPI?.attachAnalyticsEvent(payload)(originalTransaction);

					dispatch(originalTransaction);
				}

				return true;
			};
		};
	};

export const handlePastePanelOrDecisionIntoListWithAnalytics =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(
		view: EditorView,
		event: ClipboardEvent,
		slice: Slice,
		findRootParentListNode: FindRootParentListNode | undefined,
	): Command =>
		injectAnalyticsPayloadBeforeCommand(editorAnalyticsAPI)(
			createPasteAnalyticsPayloadBySelection(event, slice, {
				type: PasteTypes.richText,
			}),
		)(handlePastePanelOrDecisionContentIntoList(slice, findRootParentListNode));

export const handlePasteNonNestableBlockNodesIntoListWithAnalytics =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(view: EditorView, event: ClipboardEvent, slice: Slice): Command =>
		injectAnalyticsPayloadBeforeCommand(editorAnalyticsAPI)(
			createPasteAnalyticsPayloadBySelection(event, slice, {
				type: PasteTypes.richText,
				pasteSplitList: true,
			}),
		)(handlePasteNonNestableBlockNodesIntoList(slice));

export const handleExpandWithAnalytics =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(view: EditorView, event: ClipboardEvent, slice: Slice): Command =>
		injectAnalyticsPayloadBeforeCommand(editorAnalyticsAPI)(
			createPasteAnalyticsPayloadBySelection(event, slice, {
				type: PasteTypes.richText,
				pasteSplitList: true,
			}),
		)(handleExpandPaste(slice));

export const handleNestedTablePasteWithAnalytics =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined, isNestingTablesSupported: boolean) =>
	(view: EditorView, event: ClipboardEvent, slice: Slice): Command =>
		injectAnalyticsPayloadBeforeCommand(editorAnalyticsAPI)(
			createPasteAnalyticsPayloadBySelection(event, slice, {
				type: PasteTypes.richText,
				pasteSplitList: true,
			}),
		)(handleNestedTablePaste(slice, isNestingTablesSupported));

export const handleSelectedTableWithAnalytics =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(view: EditorView, event: ClipboardEvent, slice: Slice): Command =>
		injectAnalyticsPayloadBeforeCommand(editorAnalyticsAPI)(
			createPasteAnalyticsPayloadBySelection(event, slice, {
				type: PasteTypes.richText,
			}),
		)(handleSelectedTable(editorAnalyticsAPI)(slice));

export const handlePasteLinkOnSelectedTextWithAnalytics =
	(editorAnalyticsAPI: EditorAnalyticsAPI | undefined) =>
	(view: EditorView, event: ClipboardEvent, slice: Slice, type: PasteType): Command =>
		injectAnalyticsPayloadBeforeCommand(editorAnalyticsAPI)(
			createPasteAnalyticsPayloadBySelection(event, slice, {
				type,
				hyperlinkPasteOnText: true,
			}),
		)(handlePasteLinkOnSelectedText(slice));

export const createPasteMeasurePayload = ({
	view,
	duration,
	content,
	distortedDuration,
}: {
	view: EditorView;
	duration: number;
	content: Array<string>;
	distortedDuration: boolean;
}): AnalyticsEventPayload => {
	const pasteIntoNode = getActionSubjectId({
		selection: view.state.selection,
		schema: view.state.schema,
	});
	return {
		action: ACTION.PASTED_TIMED,
		actionSubject: ACTION_SUBJECT.EDITOR,
		eventType: EVENT_TYPE.OPERATIONAL,
		attributes: {
			pasteIntoNode,
			content,
			time: duration,
			distortedDuration,
		},
	};
};

export const getContentNodeTypes = (content: Fragment): string[] => {
	let nodeTypes = new Set<string>();

	if (content.size) {
		content.forEach((node) => {
			if (node.content && node.content.size) {
				nodeTypes = new Set([...nodeTypes, ...getContentNodeTypes(node.content)]);
			}
			nodeTypes.add(node.type.name);
		});
	}

	return Array.from(nodeTypes);
};
