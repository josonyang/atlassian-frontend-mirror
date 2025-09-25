import type {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
	OperationalAEP,
	TABLE_ACTION,
} from '@atlaskit/editor-common/analytics';

import type { AEP } from './enums';

import type { SortOrder } from '@atlaskit/editor-common/types';
import type {
	SEVERITY,
	UNSUPPORTED_CONTENT_LEVEL_SEVERITY,
	UnsupportedContentPayload,
	UnsupportedContentTooltipPayload,
} from '@atlaskit/editor-common/utils';

export enum PLATFORM {
	NATIVE = 'mobileNative',
	HYBRID = 'mobileHybrid',
	WEB = 'web',
}

export enum MODE {
	RENDERER = 'renderer',
	EDITOR = 'editor',
}

type RendererStartAEP = AEP<
	ACTION.STARTED,
	ACTION_SUBJECT.RENDERER,
	undefined,
	{ platform: PLATFORM.WEB },
	EVENT_TYPE.UI
>;

type RendererRenderedAEP = AEP<
	ACTION.RENDERED,
	ACTION_SUBJECT.RENDERER,
	undefined,
	{
		distortedDuration: boolean;
		duration: number;
		nodes: Record<string, number>;
		platform: PLATFORM.WEB;
		severity?: SEVERITY;
		ttfb?: number;
	},
	EVENT_TYPE.OPERATIONAL
>;

export type ComponentCrashErrorAEP = OperationalAEP<
	ACTION.CRASHED,
	ACTION_SUBJECT.RENDERER,
	ACTION_SUBJECT_ID,
	{
		componentStack?: string;
		errorMessage?: string;
		errorRethrown?: boolean;
		errorStack?: string;
		platform: PLATFORM.WEB;
	}
>;

export type ComponentCaughtDomErrorAEP = OperationalAEP<
	ACTION.CAUGHT_DOM_ERROR,
	ACTION_SUBJECT.RENDERER,
	ACTION_SUBJECT_ID,
	{
		errorMessage: string;
		platform: PLATFORM.WEB;
	}
>;

type InvalidProsemirrorDocumentErrorAEP = AEP<
	ACTION.INVALID_PROSEMIRROR_DOCUMENT,
	ACTION_SUBJECT.RENDERER,
	ACTION_SUBJECT_ID,
	{
		errorStack?: string;
		platform: PLATFORM.WEB;
	},
	EVENT_TYPE.OPERATIONAL
>;

type RendererUnsupportedContentLevelsTrackingSucceeded = AEP<
	ACTION.UNSUPPORTED_CONTENT_LEVELS_TRACKING_SUCCEEDED,
	ACTION_SUBJECT.RENDERER,
	undefined,
	{
		appearance?: string;
		platform: PLATFORM.WEB;
		supportedNodesCount: number;
		unsupportedContentLevelPercentage: number;
		unsupportedContentLevelSeverity: UNSUPPORTED_CONTENT_LEVEL_SEVERITY;
		unsupportedNodesCount: number;
		unsupportedNodeTypeCount: Record<string, number>;
	},
	EVENT_TYPE.OPERATIONAL
>;

type RendererUnsupportedContentLevelsTrackingErrored = AEP<
	ACTION.UNSUPPORTED_CONTENT_LEVELS_TRACKING_ERRORED,
	ACTION_SUBJECT.RENDERER,
	undefined,
	{
		error: string;
		platform: PLATFORM.WEB;
	},
	EVENT_TYPE.OPERATIONAL
>;

type RendererSelectAllCaughtAEP = AEP<
	ACTION.SELECT_ALL_CAUGHT,
	ACTION_SUBJECT.RENDERER,
	undefined,
	{ platform: PLATFORM.WEB },
	EVENT_TYPE.TRACK
>;

type RendererSelectAllEscapedAEP = AEP<
	ACTION.SELECT_ALL_ESCAPED,
	ACTION_SUBJECT.RENDERER,
	undefined,
	{ platform: PLATFORM.WEB },
	EVENT_TYPE.TRACK
>;

type UIAEP<Action, ActionSubject, ActionSubjectID, Attributes> = AEP<
	Action,
	ActionSubject,
	ActionSubjectID,
	Attributes,
	EVENT_TYPE.UI
>;

type ButtonAEP<ActionSubjectID, Attributes> = UIAEP<
	ACTION.CLICKED,
	ACTION_SUBJECT.BUTTON,
	ActionSubjectID,
	Attributes
>;

type AnchorLinkAEP = UIAEP<
	ACTION.VIEWED,
	ACTION_SUBJECT.ANCHOR_LINK,
	undefined,
	{ mode: MODE.RENDERER; platform: PLATFORM.WEB }
>;

type CodeBlockCopyAEP = ButtonAEP<ACTION_SUBJECT_ID.CODEBLOCK_COPY, undefined>;

type CodeBlockWrapAEP = ButtonAEP<ACTION_SUBJECT_ID.CODEBLOCK_WRAP, { wrapped: boolean }>;

type HeadingAnchorLinkButtonAEP = ButtonAEP<ACTION_SUBJECT_ID.HEADING_ANCHOR_LINK, undefined>;

type HoverLabelAEP = UIAEP<
	ACTION.CLICKED,
	ACTION_SUBJECT.SMART_LINK,
	ACTION_SUBJECT_ID.HOVER_LABEL,
	{
		destinationProduct: string | null;
		destinationSubproduct: string | null;
		previewType: 'panel' | 'modal';
	}
>;

type TableSortColumnNotAllowedAEP = AEP<
	ACTION.SORT_COLUMN_NOT_ALLOWED,
	ACTION_SUBJECT.TABLE,
	undefined,
	{
		mode: MODE.RENDERER;
		platform: PLATFORM.WEB;
	},
	EVENT_TYPE.TRACK
>;

type TableSortColumnAEP = AEP<
	ACTION.SORT_COLUMN,
	ACTION_SUBJECT.TABLE,
	undefined,
	{
		columnIndex: number;
		mode: MODE.RENDERER;
		platform: PLATFORM.WEB;
		sortOrder: SortOrder;
	},
	EVENT_TYPE.TRACK
>;

type TableWidthInfoAEP = AEP<
	TABLE_ACTION.TABLE_WIDTH_INFO,
	ACTION_SUBJECT.TABLE,
	undefined,
	{
		editorWidth: number;
		mode: MODE.RENDERER;
		tableWidthInfo: Array<{
			hasScrollbar: boolean;
			isNestedTable: boolean;
			tableWidth: number;
		}>;
	},
	EVENT_TYPE.OPERATIONAL
>;

type VisitLinkAEP = AEP<
	ACTION.VISITED,
	ACTION_SUBJECT.LINK,
	undefined,
	{
		mode: MODE.RENDERER;
		platform: PLATFORM.WEB;
	},
	EVENT_TYPE.TRACK
>;

type VisitMediaLinkAEP = AEP<
	ACTION.VISITED,
	ACTION_SUBJECT.MEDIA,
	ACTION_SUBJECT_ID.LINK,
	{
		mode: MODE.RENDERER;
		platform: PLATFORM.WEB;
	},
	EVENT_TYPE.TRACK
>;

type ExpandAEP = AEP<
	ACTION.TOGGLE_EXPAND,
	ACTION_SUBJECT.EXPAND | ACTION_SUBJECT.NESTED_EXPAND,
	undefined,
	{
		expanded: boolean;
		mode: MODE.RENDERER;
		platform: PLATFORM.WEB;
	},
	EVENT_TYPE.TRACK
>;

type AnnotationActionType =
	| ACTION.INSERTED
	| ACTION.CLOSED
	| ACTION.EDITED
	| ACTION.DELETED
	| ACTION.OPENED
	| ACTION.RESOLVED
	| ACTION.VIEWED
	| ACTION.CREATE_NOT_ALLOWED;

type AnnotationAEPAttributes = AnnotationDraftAEPAttributes | AnnotationResolvedAEPAttributes;

type AnnotationDraftAEPAttributes = {
	//overlap is how many other annotations are within or overlapping with the new selection
	overlap?: number;
};

type AnnotationResolvedAEPAttributes = {
	method?: RESOLVE_METHOD;
};

export type AnnotationDeleteAEP = AEP<
	AnnotationActionType,
	ACTION_SUBJECT.ANNOTATION,
	ACTION_SUBJECT_ID,
	{ inlineNodeNames?: string[] },
	EVENT_TYPE.TRACK
>;

enum RESOLVE_METHOD {
	COMPONENT = 'component',
	CONSUMER = 'consumer',
	ORPHANED = 'orphaned',
}

type AnnotationAEP = AEP<
	AnnotationActionType,
	ACTION_SUBJECT.ANNOTATION,
	ACTION_SUBJECT_ID.INLINE_COMMENT,
	AnnotationAEPAttributes,
	undefined
>;

type MediaLnkTransformedAEP = AEP<
	ACTION.MEDIA_LINK_TRANSFORMED,
	ACTION_SUBJECT.RENDERER,
	undefined,
	undefined,
	EVENT_TYPE.OPERATIONAL
>;

type NestedTableTransformedAEP = OperationalAEP<
	ACTION.NESTED_TABLE_TRANSFORMED,
	ACTION_SUBJECT.RENDERER,
	undefined,
	undefined
>;

export type AnalyticsEventPayload<T = void> =
	| RendererStartAEP
	| RendererRenderedAEP
	| ComponentCrashErrorAEP
	| RendererUnsupportedContentLevelsTrackingSucceeded
	| RendererUnsupportedContentLevelsTrackingErrored
	| RendererSelectAllCaughtAEP
	| RendererSelectAllEscapedAEP
	| CodeBlockCopyAEP
	| CodeBlockWrapAEP
	| HeadingAnchorLinkButtonAEP
	| HoverLabelAEP
	| AnchorLinkAEP
	| TableSortColumnNotAllowedAEP
	| TableSortColumnAEP
	| TableWidthInfoAEP
	| VisitLinkAEP
	| VisitMediaLinkAEP
	| ExpandAEP
	| UnsupportedContentPayload
	| UnsupportedContentTooltipPayload
	| AnnotationAEP
	| AnnotationDeleteAEP
	| MediaLnkTransformedAEP
	| InvalidProsemirrorDocumentErrorAEP
	| NestedTableTransformedAEP;

export type FireAnalyticsCallback = <T = void>(
	payload: AnalyticsEventPayload<T>,
) => void | undefined;
