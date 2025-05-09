import type { AnnotationMarkAttributes } from '@atlaskit/adf-schema';
import { AnnotationTypes } from '@atlaskit/adf-schema';
import {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
} from '@atlaskit/editor-common/analytics';
import type {
	AnalyticsEventPayload,
	AnalyticsEventPayloadCallback,
	AnnotationDraftAEPAttributes,
} from '@atlaskit/editor-common/analytics';
import { currentMediaNodeWithPos } from '@atlaskit/editor-common/media-single';
import {
	AnnotationSharedClassNames,
	BlockAnnotationSharedClassNames,
} from '@atlaskit/editor-common/styles';
import {
	canApplyAnnotationOnRange,
	getAnnotationIdsFromRange,
	getRangeInlineNodeNames,
	hasAnnotationMark,
	isEmptyTextSelection,
	isParagraph,
	isText,
} from '@atlaskit/editor-common/utils';
import type { Mark, Node, ResolvedPos, Schema, Slice } from '@atlaskit/editor-prosemirror/model';
import type { EditorState, Selection, SelectionBookmark } from '@atlaskit/editor-prosemirror/state';
import {
	AllSelection,
	NodeSelection,
	PluginKey,
	TextSelection,
} from '@atlaskit/editor-prosemirror/state';
import { Decoration } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';

import type { AnnotationInfo, DraftBookmark, InlineCommentInputMethod, TargetType } from '../types';
import { AnnotationSelectionType } from '../types';

import type { InlineCommentPluginState } from './types';

function sum<T>(arr: Array<T>, f: (val: T) => number) {
	return arr.reduce((val, x) => val + f(x), 0);
}
/**
 * Finds the marks in the nodes to the left and right.
 * @param $pos Position to center search around
 */
export const surroundingMarks = ($pos: ResolvedPos) => {
	const { nodeBefore, nodeAfter } = $pos;
	const markNodeBefore =
		nodeBefore && $pos.doc.nodeAt(Math.max(0, $pos.pos - nodeBefore.nodeSize - 1));
	const markNodeAfter = nodeAfter && $pos.doc.nodeAt($pos.pos + nodeAfter.nodeSize);

	return [
		(markNodeBefore && markNodeBefore.marks) || [],
		(markNodeAfter && markNodeAfter.marks) || [],
	];
};

/**
 * Finds annotation marks, and returns their IDs.
 * @param marks Array of marks to search in
 */
const filterAnnotationIds = (marks: readonly Mark[]): Array<string> => {
	if (!marks.length) {
		return [];
	}

	const { annotation } = marks[0].type.schema.marks;
	return marks.filter((mark) => mark.type === annotation).map((mark) => mark.attrs.id);
};

/**
 * Re-orders the annotation array based on the order in the document.
 *
 * This places the marks that do not appear in the surrounding nodes
 * higher in the list. That is, the inner-most one appears first.
 *
 * Undo, for example, can re-order annotation marks in the document.
 * @param annotations annotation metadata
 * @param $from location to look around (usually the selection)
 */
const reorderAnnotations = (annotations: Array<AnnotationInfo>, $from: ResolvedPos) => {
	const idSet = surroundingMarks($from).map(filterAnnotationIds);

	annotations.sort(
		(a, b) => sum(idSet, (ids) => ids.indexOf(a.id)) - sum(idSet, (ids) => ids.indexOf(b.id)),
	);
};

export const getAllAnnotations = (doc: Node): string[] => {
	const allAnnotationIds: Set<string> = new Set();

	doc.descendants((node) => {
		node.marks
			.filter((mark) => mark.type.name === 'annotation')
			// filter out annotations with invalid attributes as they cause errors when interacting with them
			.filter(validateAnnotationMark)
			.forEach((m) => allAnnotationIds.add(m.attrs.id));
		return true;
	});

	return Array.from(allAnnotationIds);
};

/*
 * verifies if annotation mark contains valid attributes
 */
const validateAnnotationMark = (annotationMark: Mark): boolean => {
	const { id, annotationType } = annotationMark.attrs as AnnotationMarkAttributes;
	return validateAnnotationId(id) && validateAnnotationType(annotationType);

	function validateAnnotationId(id: string): boolean {
		if (!id || typeof id !== 'string') {
			return false;
		}
		const invalidIds = ['null', 'undefined'];
		return !invalidIds.includes(id.toLowerCase());
	}

	function validateAnnotationType(type: AnnotationTypes): boolean {
		if (!type || typeof type !== 'string') {
			return false;
		}
		const allowedTypes = Object.values(AnnotationTypes);
		return allowedTypes.includes(type);
	}
};

export const decorationKey = {
	block: 'blockCommentDecoration',
	inline: 'inlineCommentDecoration',
};
/*
 * add decoration for the comment selection in draft state
 * (when creating new comment)
 */
export const addDraftDecoration = (
	start: number,
	end: number,
	targetType: TargetType = 'inline',
) => {
	if (targetType === 'block') {
		return Decoration.node(
			start,
			end,
			{
				class: `${BlockAnnotationSharedClassNames.draft}`,
			},
			{
				key: decorationKey.block,
			},
		);
	}
	return Decoration.inline(
		start,
		end,
		{
			class: `${AnnotationSharedClassNames.draft}`,
		},
		{ key: decorationKey.inline },
	);
};

export const getAnnotationViewKey = (annotations: AnnotationInfo[]): string => {
	const keys = annotations.map((mark) => mark.id).join('_');
	return `view-annotation-wrapper_${keys}`;
};

export const isCurrentBlockNodeSelected = (state: EditorState, node: Node): boolean => {
	const { selection } = state;
	if (selection instanceof NodeSelection) {
		if (selection.node === node) {
			return true;
		}
		if (node.type.name === 'media' && selection.node.firstChild === node) {
			return true;
		}
	}

	return false;
};

export const findAnnotationsInSelection = (selection: Selection, doc: Node): AnnotationInfo[] => {
	const { empty, $anchor, anchor } = selection;
	// Only detect annotations on caret selection
	if (!empty || !doc) {
		if (fg('editor_inline_comments_on_inline_nodes')) {
			if (
				selection instanceof NodeSelection &&
				['inlineCard', 'emoji', 'date', 'mention', 'status'].includes(selection.node.type.name)
			) {
				// Inline comments on these nodes are supported -- so we continue to find annotations
			} else {
				return [];
			}
		} else {
			return [];
		}
	}

	const node = doc.nodeAt(anchor);
	const nodeBefore = $anchor.nodeBefore;

	if (!node && !nodeBefore) {
		return [];
	}

	// Inline comment on mediaInline is not supported as part of comments on media project
	// Hence, we ignore annotations associated with the node when the cursor is right after/before the node
	if ([nodeBefore, node].some((node) => node?.type.name === 'mediaInline')) {
		return [];
	}

	const annotationMark = doc.type.schema.marks.annotation;
	const anchorAnnotationMarks = node?.marks || [];

	let marks: readonly Mark[] = [];
	if (annotationMark.isInSet(anchorAnnotationMarks)) {
		marks = anchorAnnotationMarks;
	}
	if (nodeBefore && annotationMark.isInSet(nodeBefore.marks)) {
		const existingMarkIds = marks.map((m) => m.attrs.id);
		marks = marks.concat(...nodeBefore.marks.filter((m) => !existingMarkIds.includes(m.attrs.id)));
	}

	const annotations = marks
		.filter((mark) => mark.type.name === 'annotation')
		.map((mark) => ({
			id: mark.attrs.id,
			type: mark.attrs.annotationType,
		}));

	reorderAnnotations(annotations, $anchor);
	return annotations;
};

export const resolveDraftBookmark = (
	editorState: EditorState,
	bookmark?: SelectionBookmark,
	supportedBlockNodes: string[] = [],
): DraftBookmark => {
	const { doc } = editorState;

	const resolvedBookmark = bookmark ? bookmark.resolve(doc) : editorState.selection;

	const { from, to, head } = resolvedBookmark;
	let draftBookmark = { from, to, head, isBlockNode: false };
	if (resolvedBookmark instanceof NodeSelection) {
		// It's possible that annotation is only allowed in child node instead parent (e.g. mediaSingle vs media),
		// thus, we traverse the node to find the first node that supports annotation and return its position
		let nodeFound = false;
		doc.nodesBetween(from, to, (node, pos) => {
			// if we find the node, breakout the traversal to make sure we always record the first supported node
			if (nodeFound) {
				return false;
			}
			const nodeEndsAt = pos + node.nodeSize;

			if (supportedBlockNodes.includes(node.type.name)) {
				draftBookmark = {
					from: pos,
					to: nodeEndsAt,
					head: nodeEndsAt,
					isBlockNode: node.isBlock,
				};
				nodeFound = true;
				return false;
			}
		});
	}

	return draftBookmark;
};
/**
 * get selection from position to apply new comment for
 * @return bookmarked positions if they exists, otherwise current selection positions
 */
export function getSelectionPositions(
	editorState: EditorState,
	// when cleaning up platform_editor_usesharedpluginstateselector, can change this prop to bookmark
	inlineCommentState?: Partial<InlineCommentPluginState> | null | undefined,
): Selection {
	const { bookmark } = inlineCommentState || {};
	// get positions via saved bookmark if it is available
	// this is to make comments box positioned relative to temporary highlight rather then current selection
	if (bookmark) {
		return bookmark.resolve(editorState.doc);
	}
	return editorState.selection;
}

export const inlineCommentPluginKey = new PluginKey<InlineCommentPluginState>(
	'inlineCommentPluginKey',
);

export const getPluginState = (state: EditorState) => {
	return inlineCommentPluginKey.getState(state);
};

/**
 * get number of unique annotations within current selection
 */
const getAnnotationsInSelectionCount = (state: EditorState): number => {
	const { from, to } = state.selection;
	const annotations = getAnnotationIdsFromRange({ from, to }, state.doc, state.schema);
	return annotations.length;
};

/**
 * get payload for the open/close analytics event
 */
export const getDraftCommandAnalyticsPayload = (
	drafting: boolean,
	inputMethod: InlineCommentInputMethod,
) => {
	const payload: AnalyticsEventPayloadCallback = (state: EditorState): AnalyticsEventPayload => {
		let attributes: Partial<AnnotationDraftAEPAttributes> = {};

		if (drafting) {
			attributes = {
				inputMethod,
				overlap: getAnnotationsInSelectionCount(state),
			} as AnnotationDraftAEPAttributes;
		}

		if (fg('editor_inline_comments_on_inline_nodes')) {
			const { bookmark } = getPluginState(state) || {};
			attributes.inlineNodeNames = getRangeInlineNodeNames({
				doc: state.doc,
				pos: resolveDraftBookmark(state, bookmark),
			});
		}

		return {
			action: drafting ? ACTION.OPENED : ACTION.CLOSED,
			actionSubject: ACTION_SUBJECT.ANNOTATION,
			actionSubjectId: ACTION_SUBJECT_ID.INLINE_COMMENT,
			eventType: EVENT_TYPE.TRACK,
			attributes,
		};
	};
	return payload;
};

export const isSelectionValid = (
	state: EditorState,
	_supportedNodes: string[] = [],
): AnnotationSelectionType => {
	const { selection } = state;
	const { disallowOnWhitespace } = getPluginState(state) || {};
	const allowedInlineNodes = ['emoji', 'status', 'date', 'mention', 'inlineCard'];
	const isSelectionEmpty = selection.empty;
	const isTextOrAllSelection =
		selection instanceof TextSelection || selection instanceof AllSelection;
	const isValidNodeSelection =
		selection instanceof NodeSelection && allowedInlineNodes.includes(selection.node.type.name);
	const isValidSelection = isTextOrAllSelection || isValidNodeSelection;

	// Allow media so that it can enter draft mode
	if (currentMediaNodeWithPos(state)?.node) {
		return AnnotationSelectionType.VALID;
	}

	if (isSelectionEmpty || !isValidSelection) {
		return AnnotationSelectionType.INVALID;
	}

	const containsInvalidNodes = hasInvalidNodes(state);

	// A selection that only covers 1 pos, and is an invalid node
	// e.g. a text selection over a mention
	if (containsInvalidNodes && selection.to - selection.from === 1) {
		return AnnotationSelectionType.INVALID;
	}

	if (containsInvalidNodes) {
		return AnnotationSelectionType.DISABLED;
	}

	if (disallowOnWhitespace && hasInvalidWhitespaceNode(selection, state.schema)) {
		return AnnotationSelectionType.INVALID;
	}

	if (!(selection instanceof NodeSelection) && isEmptyTextSelection(selection, state.schema)) {
		return AnnotationSelectionType.INVALID;
	}

	return AnnotationSelectionType.VALID;
};

export const hasInvalidNodes = (state: EditorState): boolean => {
	const { selection, doc, schema } = state;
	return !canApplyAnnotationOnRange(
		{
			from: selection.from,
			to: selection.to,
		},
		doc,
		schema,
	);
};

export const isSupportedBlockNode = (node: Node, supportedBlockNodes: string[] = []) => {
	return (
		supportedBlockNodes.indexOf(node.type.name) >= 0 ||
		(node.type.name === 'mediaSingle' && supportedBlockNodes.indexOf('media') >= 0)
	);
};

/**
 * Checks if any of the nodes in a given selection are completely whitespace
 * This is to conform to Confluence annotation specifications
 */
export function hasInvalidWhitespaceNode(
	selection: TextSelection | AllSelection | NodeSelection,
	schema: Schema,
) {
	let foundInvalidWhitespace = false;

	const content = selection.content().content;

	let hasCommentableInlineNodeDescendants = false;
	let hasCommentableTextNodeDescendants = false;
	content.descendants((node) => {
		if (fg('editor_inline_comments_on_inline_nodes')) {
			const isAllowedInlineNode = ['emoji', 'status', 'date', 'mention', 'inlineCard'].includes(
				node.type.name,
			);
			if (isAllowedInlineNode) {
				hasCommentableInlineNodeDescendants = true;
				return false;
			}
		}
		if (node.type === schema.nodes.inlineCard && fg('editor_inline_comments_on_inline_nodes')) {
			return false;
		}
		if (isText(node, schema)) {
			if (fg('editor_inline_comments_on_inline_nodes')) {
				if (node.textContent.trim() !== '') {
					hasCommentableTextNodeDescendants = true;
				}
			}
			return false;
		}

		if (!fg('editor_inline_comments_on_inline_nodes')) {
			if (node.textContent.trim() === '') {
				// Trailing new lines do not result in the annotation spanning into
				// the trailing new line so can be ignored when looking for invalid
				// whitespace nodes.
				const nodeIsTrailingNewLine =
					// it is the final node
					// Ignored via go/ees005
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					node.eq(content.lastChild!) &&
					// and there are multiple nodes
					// Ignored via go/ees005
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					!node.eq(content.firstChild!) &&
					// and it is a paragraph node
					isParagraph(node, schema);

				if (!nodeIsTrailingNewLine) {
					foundInvalidWhitespace = true;
				}
			}
		}

		return !foundInvalidWhitespace;
	});
	if (fg('editor_inline_comments_on_inline_nodes')) {
		if (hasCommentableInlineNodeDescendants) {
			return false;
		}
		return !hasCommentableTextNodeDescendants;
	}

	return foundInvalidWhitespace;
}

/*
 * verifies that the annotation exists by the given id
 */
export function annotationExists(annotationId: string, state: EditorState): boolean {
	const commentsPluginState = getPluginState(state);
	return (
		!!commentsPluginState?.annotations &&
		Object.keys(commentsPluginState.annotations).includes(annotationId)
	);
}

/*
 * remove annotations that dont exsist in plugin state from slice
 */
export function stripNonExistingAnnotations(slice: Slice, state: EditorState) {
	if (!slice.content.size) {
		return false;
	}
	slice.content.forEach((node) => {
		stripNonExistingAnnotationsFromNode(node, state);
		node.content.descendants((node) => {
			stripNonExistingAnnotationsFromNode(node, state);
			return true;
		});
	});
}

/*
 * remove annotations that dont exsist in plugin state
 * from node
 */
function stripNonExistingAnnotationsFromNode(node: Node, state: EditorState) {
	if (hasAnnotationMark(node, state)) {
		(node.marks as Mark[]) = node.marks.filter((mark) => {
			if (mark.type.name === 'annotation') {
				return annotationExists(mark.attrs.id, state);
			}
			return true;
		});
	}
	return node;
}

/**
 * Compares two sets of annotationInfos to see if the annotations have changed
 * This function assumes annotations will have unique id's for simplicity
 */
export function isSelectedAnnotationsChanged(
	oldSelectedAnnotations: AnnotationInfo[],
	newSelectedAnnotations: AnnotationInfo[],
): boolean {
	return (
		newSelectedAnnotations.length !== oldSelectedAnnotations.length ||
		// assuming annotations have unique id's for simplicity
		newSelectedAnnotations.some(
			(annotation) =>
				!oldSelectedAnnotations.find(
					(pluginStateAnnotation) =>
						annotation.id === pluginStateAnnotation.id &&
						annotation.type === pluginStateAnnotation.type,
				),
		)
	);
}

/**
 * Checks if the selectedAnnotations are the same as the annotations on the selected block node
 */
export const isBlockNodeAnnotationsSelected = (
	selection: Selection,
	selectedAnnotations: AnnotationInfo[] = [],
) => {
	if (selectedAnnotations.length && selection instanceof NodeSelection) {
		const node =
			selection.node.type.name === 'mediaSingle' ? selection.node.firstChild : selection.node;
		const annotationMarks: AnnotationInfo[] =
			node?.marks
				.filter((mark) => mark.type.name === 'annotation')
				.map((mark) => ({
					id: mark.attrs.id,
					type: mark.attrs.annotationType,
				})) || [];

		return !selectedAnnotations.some(
			(annotation) =>
				!annotationMarks.find(
					(existingAnnotation) =>
						existingAnnotation.id === annotation.id && existingAnnotation.type === annotation.type,
				),
		);
	}

	return false;
};

export const hasAnyUnResolvedAnnotationInPage = (state: EditorState): boolean => {
	const annotations = getPluginState(state)?.annotations;
	if (annotations) {
		/**
		 * annotations type is { [key: string]: boolean };
		 * Here, key represents mark.attr.id and it is used to find where annotation to be presented in the document.
		 * When value is false, it means it is unresolved annotation.
		 *
		 * But sometimes annotation map has entry with key undefined somehow.
		 * And it is not valid mark attribute id, so it won't be presented anywhere in the document.
		 */
		const unresolvedAnnotationKeys = Object.keys(annotations).filter(
			(key) => key !== 'undefined' && annotations[key] === false,
		);

		return unresolvedAnnotationKeys.length > 0;
	}
	return false;
};
