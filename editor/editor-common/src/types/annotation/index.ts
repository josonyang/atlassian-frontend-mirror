import type { AnnotationId, AnnotationTypes } from '@atlaskit/adf-schema';
import type { JSONDocNode } from '@atlaskit/editor-json-transformer';
import type {
	AddNodeMarkStep,
	AddMarkStep,
	RemoveMarkStep,
	RemoveNodeMarkStep,
} from '@atlaskit/editor-prosemirror/transform';

import type { AnnotationManager } from '../../annotation';

import type { AnnotationState, AnnotationUpdateEmitter } from './emitter';

export type AnnotationByMatches = {
	originalSelection: string;
	numMatches: number;
	matchIndex: number;
	pos?: number;
	isAnnotationAllowed?: boolean;
};

type ActionResult = { step: RemoveMarkStep | RemoveNodeMarkStep; doc: JSONDocNode } | false;
export type AnnotationActionResult =
	| ({
			step: AddMarkStep | AddNodeMarkStep;
			doc: JSONDocNode;
			/** The list of types of all inline nodes, which were wrapped by annotation. */
			inlineNodeTypes?: string[];
			targetNodeType?: string;
	  } & AnnotationByMatches)
	| false;

export type InlineCommentSelectionComponentProps = {
	/**
	 * Range selected
	 */
	range: Range | null;

	/**
	 * The draft range of a pre-committed annotation
	 */
	draftRange?: Range | null;

	/**
	 * Renderer/Editor DOM element ancestors wrapping the selection.
	 */
	wrapperDOM: HTMLElement;

	/**
	 * If it is possible to add an inline comment on this range
	 */
	isAnnotationAllowed: boolean;

	/**
	 * Creates an annotation mark in the document with the given id.
	 */
	onCreate: (annotationId: AnnotationId) => AnnotationActionResult;

	/**
	 * Indicates that a draft comment was discarded/cancelled
	 */
	onClose: () => void;

	/**
	 * Call this function to surround the range with a HTML tag.
	 */
	applyDraftMode: (options: {
		annotationId?: string;
		keepNativeSelection?: boolean;
	}) => AnnotationActionResult;

	/**
	 * Call this function to remove the draft HTML tags created by the applyDraftMode
	 */
	removeDraftMode: () => void;

	/**
	 * getAnnotationIndexMatch finds the { numMatch, matchIndex } tuple of the current selection
	 */
	getAnnotationIndexMatch?: () => AnnotationByMatches | false;
	/** The list of types of all inline nodes, which were wrapped by annotation. */
	inlineNodeTypes?: string[];
};

type AnnotationInfo = {
	id: AnnotationId;
	type: AnnotationTypes.INLINE_COMMENT;
};

export type InlineCommentViewComponentProps = {
	/**
	 * Existing annotations where the cursor is placed.
	 * These are provided in order, inner-most first.
	 */
	annotations: Array<AnnotationInfo>;

	/**
	 * eventTarget of the tapped annotation. Useful for UI positioning.
	 */
	clickElementTarget?: HTMLElement;

	deleteAnnotation: (annotationInfo: AnnotationInfo) => ActionResult;
	// Ignored via go/ees007
	// eslint-disable-next-line @atlaskit/editor/enforce-todo-comment-format
	// TODO: Remove this message when the editor_inline_comments_on_inline_nodes FF is removed
	/**
	 * Return a list of inline node types, which are wrapped by the annotation,
	 * for annotation with given ID.
	 *
	 * The `undefined` will be returned if `editor_inline_comments_on_inline_nodes` is off.
	 */
	getInlineNodeTypes: (annotationId: string) => string[] | undefined;
};

export type InlineCommentHoverComponentProps = {
	/**
	 * Range selected
	 */
	range: Range;

	/**
	 * Is mouse within the range container
	 */
	isWithinRange: boolean;

	/**
	 * Renderer/Editor DOM element ancestors wrapping the selection.
	 */
	wrapperDOM: HTMLElement;

	/**
	 * If it is possible to add an inline comment on this range
	 */
	isAnnotationAllowed: boolean;

	/**
	 * Creates an annotation mark in the document with the given id.
	 */
	onCreate: (annotationId: AnnotationId) => AnnotationActionResult;

	/**
	 * Indicates that a draft comment was discarded/cancelled
	 */
	onClose: () => void;

	/**
	 * Call this function to surround the range with a HTML tag.
	 */
	applyDraftMode: (options: {
		annotationId?: string;
		keepNativeSelection?: boolean;
	}) => AnnotationActionResult;

	/**
	 * Call this function to remove the draft HTML tags created by the applyDraftMode
	 */
	removeDraftMode: () => void;

	/**
	 * getAnnotationIndexMatch finds the { numMatch, matchIndex } tuple of the current selection
	 */
	getAnnotationIndexMatch?: () => AnnotationByMatches | false;
};

interface AnnotationTypeProvider<Type> {
	getState: (annotationIds: string[], isNestedRender: boolean) => Promise<AnnotationState<Type>[]>;
	updateSubscriber?: AnnotationUpdateEmitter;
	allowDraftMode?: boolean;
	allowCommentsOnMedia?: boolean;
}

export type InlineCommentAnnotationProvider =
	AnnotationTypeProvider<AnnotationTypes.INLINE_COMMENT> & {
		selectionComponent?: React.ComponentType<
			React.PropsWithChildren<InlineCommentSelectionComponentProps>
		>;
		viewComponent?: React.ComponentType<React.PropsWithChildren<InlineCommentViewComponentProps>>;
		hoverComponent?: React.ComponentType<InlineCommentHoverComponentProps>;
	};

export type AnnotationProviders = {
	inlineComment: InlineCommentAnnotationProvider;

	annotationManager?: AnnotationManager;
};
