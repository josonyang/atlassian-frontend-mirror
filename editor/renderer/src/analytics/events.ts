import type {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
	OperationalAEP,
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
		platform: PLATFORM.WEB;
		duration: number;
		distortedDuration: boolean;
		ttfb?: number;
		nodes: Record<string, number>;
		severity?: SEVERITY;
	},
	EVENT_TYPE.OPERATIONAL
>;

export type ComponentCrashErrorAEP = OperationalAEP<
	ACTION.CRASHED,
	ACTION_SUBJECT.RENDERER,
	ACTION_SUBJECT_ID,
	{
		platform: PLATFORM.WEB;
		errorMessage?: string;
		errorStack?: string;
		componentStack?: string;
		errorRethrown?: boolean;
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
		platform: PLATFORM.WEB;
		errorStack?: string;
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
		unsupportedContentLevelSeverity: UNSUPPORTED_CONTENT_LEVEL_SEVERITY;
		unsupportedContentLevelPercentage: number;
		unsupportedNodesCount: number;
		supportedNodesCount: number;
		unsupportedNodeTypeCount: Record<string, number>;
	},
	EVENT_TYPE.OPERATIONAL
>;

type RendererUnsupportedContentLevelsTrackingErrored = AEP<
	ACTION.UNSUPPORTED_CONTENT_LEVELS_TRACKING_ERRORED,
	ACTION_SUBJECT.RENDERER,
	undefined,
	{
		platform: PLATFORM.WEB;
		error: string;
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
	{ platform: PLATFORM.WEB; mode: MODE.RENDERER }
>;

type CodeBlockCopyAEP = ButtonAEP<ACTION_SUBJECT_ID.CODEBLOCK_COPY, undefined>;

type CodeBlockWrapAEP = ButtonAEP<ACTION_SUBJECT_ID.CODEBLOCK_WRAP, { wrapped: boolean }>;

type HeadingAnchorLinkButtonAEP = ButtonAEP<ACTION_SUBJECT_ID.HEADING_ANCHOR_LINK, undefined>;

type TableSortColumnNotAllowedAEP = AEP<
	ACTION.SORT_COLUMN_NOT_ALLOWED,
	ACTION_SUBJECT.TABLE,
	undefined,
	{
		platform: PLATFORM.WEB;
		mode: MODE.RENDERER;
	},
	EVENT_TYPE.TRACK
>;

type TableSortColumnAEP = AEP<
	ACTION.SORT_COLUMN,
	ACTION_SUBJECT.TABLE,
	undefined,
	{
		platform: PLATFORM.WEB;
		mode: MODE.RENDERER;
		sortOrder: SortOrder;
		columnIndex: number;
	},
	EVENT_TYPE.TRACK
>;

type VisitLinkAEP = AEP<
	ACTION.VISITED,
	ACTION_SUBJECT.LINK,
	undefined,
	{
		platform: PLATFORM.WEB;
		mode: MODE.RENDERER;
	},
	EVENT_TYPE.TRACK
>;

type VisitMediaLinkAEP = AEP<
	ACTION.VISITED,
	ACTION_SUBJECT.MEDIA,
	ACTION_SUBJECT_ID.LINK,
	{
		platform: PLATFORM.WEB;
		mode: MODE.RENDERER;
	},
	EVENT_TYPE.TRACK
>;

type ExpandAEP = AEP<
	ACTION.TOGGLE_EXPAND,
	ACTION_SUBJECT.EXPAND | ACTION_SUBJECT.NESTED_EXPAND,
	undefined,
	{
		platform: PLATFORM.WEB;
		mode: MODE.RENDERER;
		expanded: boolean;
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
	| AnchorLinkAEP
	| TableSortColumnNotAllowedAEP
	| TableSortColumnAEP
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
