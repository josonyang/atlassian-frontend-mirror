import type { RichMediaLayout } from '@atlaskit/adf-schema';

import type { FeatureFlagKey } from '../../types/feature-flags';
import type { PropsDifference, ShallowPropsDifference } from '../../utils';
import type { SEVERITY } from '../../utils/analytics';

import type { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, INPUT_METHOD } from './enums';
import type { AnnotationAEP, AnnotationErrorAEP } from './inline-comment-events';
import type { OperationalAEP, OperationalAEPWithObjectId, TrackAEP, UIAEP } from './utils';

export enum PLATFORMS {
	NATIVE = 'mobileNative',
	HYBRID = 'mobileHybrid',
	WEB = 'web',
}

export enum MODE {
	RENDERER = 'renderer',
	EDITOR = 'editor',
}

export enum FULL_WIDTH_MODE {
	FIXED_WIDTH = 'fixedWidth',
	FULL_WIDTH = 'fullWidth',
}

export enum BROWSER_FREEZE_INTERACTION_TYPE {
	LOADING = 'loading',
	TYPING = 'typing',
	CLICKING = 'clicking',
	PASTING = 'pasting',
}

type ButtonAEP<ActionSubjectID, Attributes> = UIAEP<
	ACTION.CLICKED,
	ACTION_SUBJECT.BUTTON,
	ActionSubjectID,
	Attributes,
	undefined
>;

type PickerAEP<ActionSubjectID, Attributes> = UIAEP<
	ACTION.OPENED,
	ACTION_SUBJECT.PICKER,
	ActionSubjectID,
	Attributes,
	undefined
>;

type PickerClosedAEP<ActionSubjectID, Attributes> = UIAEP<
	ACTION.CLOSED,
	ACTION_SUBJECT.PICKER,
	ActionSubjectID,
	Attributes,
	undefined
>;

type FeedbackAEP = UIAEP<
	ACTION.OPENED,
	ACTION_SUBJECT.FEEDBACK_DIALOG,
	undefined,
	{ inputMethod: INPUT_METHOD.QUICK_INSERT },
	undefined
>;

type EditorStartAEP = UIAEP<
	ACTION.STARTED,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		platform: PLATFORMS.NATIVE | PLATFORMS.HYBRID | PLATFORMS.WEB;
		featureFlags: FeatureFlagKey[];
		accountLocale?: string;
		browserLocale?: string;
	},
	undefined
>;

type EditorPerfAEP = OperationalAEPWithObjectId<
	| ACTION.EDITOR_MOUNTED
	| ACTION.PROSEMIRROR_RENDERED
	| ACTION.ON_EDITOR_READY_CALLBACK
	| ACTION.ON_CHANGE_CALLBACK,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		duration: number;
		startTime: number;
		nodes?: Record<string, number>;
		ttfb?: number;
		severity?: SEVERITY;
		distortedDuration?: boolean;
	}
>;

type EditorContentRetrievalPerformedAEP = OperationalAEP<
	ACTION.EDITOR_CONTENT_RETRIEVAL_PERFORMED,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		success: boolean;
		errorInfo?: string;
		errorStack?: string;
	}
>;

type EditorRenderedAEP<T> = OperationalAEP<
	ACTION.RE_RENDERED,
	ACTION_SUBJECT.EDITOR | ACTION_SUBJECT.REACT_EDITOR_VIEW,
	undefined,
	{
		propsDifference: PropsDifference<T> | ShallowPropsDifference<T>;
		count: number;
	}
>;

type BrowserFreezePayload = OperationalAEPWithObjectId<
	ACTION.BROWSER_FREEZE,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		freezeTime: number;
		nodeSize: number;
		nodeCount?: Record<string, number>;
		interactionType?: BROWSER_FREEZE_INTERACTION_TYPE;
		severity?: SEVERITY;
	}
>;

type SelectionAEP = TrackAEP<
	ACTION.MATCHED,
	ACTION_SUBJECT.SELECTION,
	undefined,
	undefined,
	undefined
>;

type SlowInputAEP = OperationalAEPWithObjectId<
	ACTION.SLOW_INPUT,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		time: number;
		nodeSize: number;
		nodeCount?: Record<string, number>;
	}
>;

type InputPerfSamplingAEP = OperationalAEPWithObjectId<
	ACTION.INPUT_PERF_SAMPLING,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		time: number;
		nodeSize: number;
		nodeCount?: Record<string, number>;
		severity?: SEVERITY;
	}
>;

type InputPerfSamplingAvgAEP = OperationalAEPWithObjectId<
	ACTION.INPUT_PERF_SAMPLING_AVG,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		mean: number;
		median: number;
		sampleSize: number;
		nodeCount?: Record<string, number>;
		nodeSize: number;
		severity?: SEVERITY;
	}
>;

type TransactionMutatedAEP = OperationalAEP<
	ACTION.TRANSACTION_MUTATED_AFTER_DISPATCH,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		pluginKey: string;
	}
>;

type WithPluginStateCalledAEP = OperationalAEP<
	ACTION.WITH_PLUGIN_STATE_CALLED,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		plugin: string;
		duration: number;
	}
>;

type ReactNodeViewRenderedAEP = OperationalAEP<
	ACTION.REACT_NODEVIEW_RENDERED,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		node: string;
		duration: number;
	}
>;

type UploadExternalFailedAEP = OperationalAEP<
	ACTION.UPLOAD_EXTERNAL_FAIL,
	ACTION_SUBJECT.EDITOR,
	undefined,
	undefined
>;

type InvalidProsemirrorDocumentErrorAEP = OperationalAEP<
	ACTION.INVALID_PROSEMIRROR_DOCUMENT,
	ACTION_SUBJECT.EDITOR,
	undefined,
	undefined
>;

type DocumentProcessingErrorAEP = OperationalAEP<
	ACTION.DOCUMENT_PROCESSING_ERROR,
	ACTION_SUBJECT.EDITOR,
	undefined,
	| {
			errorMessage?: string;
	  }
	| undefined
>;

type EditorStopAEP = UIAEP<
	ACTION.STOPPED,
	ACTION_SUBJECT.EDITOR,
	ACTION_SUBJECT_ID.SAVE | ACTION_SUBJECT_ID.CANCEL,
	{
		inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT;
		documentSize: number;
		nodeCount?: {
			tables: number;
			headings: number;
			lists: number;
			mediaSingles: number;
			mediaGroups: number;
			panels: number;
			extensions: number;
			decisions: number;
			actions: number;
			codeBlocks: number;
		};
	},
	undefined
>;

type AnnotateButtonAEP = UIAEP<
	ACTION.CLICKED,
	ACTION_SUBJECT.MEDIA,
	ACTION_SUBJECT_ID.ANNOTATE_BUTTON,
	undefined,
	undefined
>;

type ButtonHelpAEP = ButtonAEP<
	ACTION_SUBJECT_ID.BUTTON_HELP,
	{ inputMethod: INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR }
>;

type ButtonFeedbackAEP = ButtonAEP<ACTION_SUBJECT_ID.BUTTON_FEEDBACK, undefined>;

type ButtonUploadMediaAEP = ButtonAEP<ACTION_SUBJECT_ID.UPLOAD_MEDIA, undefined>;

type PickerEmojiAEP = PickerAEP<
	ACTION_SUBJECT_ID.PICKER_EMOJI,
	{
		inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU | INPUT_METHOD.KEYBOARD;
	}
>;

type PickerImageAEP = PickerAEP<
	ACTION_SUBJECT_ID.PICKER_CLOUD,
	{
		inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.INSERT_MENU;
	}
>;

type PickerMediaInsertAEP = PickerAEP<
	ACTION_SUBJECT_ID.PICKER_MEDIA,
	{
		inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.INSERT_MENU;
	}
>;

type PickerMediaInsertClosedAEP = PickerClosedAEP<
	ACTION_SUBJECT_ID.PICKER_MEDIA,
	{
		exitMethod: INPUT_METHOD.KEYBOARD | INPUT_METHOD.MOUSE;
	}
>;

type PickerMediaInsertCancelledAEP = UIAEP<
	ACTION.CANCELLED,
	ACTION_SUBJECT.PICKER,
	ACTION_SUBJECT_ID.PICKER_MEDIA,
	undefined,
	undefined
>;

type DockedPrimaryToolbarRenderedAEP = UIAEP<
	ACTION.RENDERED,
	ACTION_SUBJECT.TOOLBAR,
	ACTION_SUBJECT_ID.DOCKED_PRIMARY_TOOLBAR,
	undefined,
	undefined
>;

type HelpQuickInsertAEP = UIAEP<
	ACTION.HELP_OPENED,
	ACTION_SUBJECT.HELP,
	ACTION_SUBJECT_ID.HELP_QUICK_INSERT,
	{ inputMethod: INPUT_METHOD.QUICK_INSERT },
	undefined
>;

type FullWidthModeAEP = TrackAEP<
	ACTION.CHANGED_FULL_WIDTH_MODE,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		previousMode: FULL_WIDTH_MODE;
		newMode: FULL_WIDTH_MODE;
	},
	undefined
>;

type ExpandToggleAEP = TrackAEP<
	ACTION.TOGGLE_EXPAND,
	ACTION_SUBJECT.EXPAND | ACTION_SUBJECT.NESTED_EXPAND,
	undefined,
	{
		platform: PLATFORMS;
		mode: MODE;
		expanded: boolean;
	},
	undefined
>;

export type ColorPickerAEP = TrackAEP<
	ACTION.UPDATED,
	ACTION_SUBJECT.PICKER,
	ACTION_SUBJECT_ID.PICKER_COLOR,
	{
		color: string;
		label?: string;
		placement: string;
	},
	undefined
>;

type RichMediaLayoutAEP = TrackAEP<
	ACTION.SELECTED,
	ACTION_SUBJECT.MEDIA_SINGLE | ACTION_SUBJECT.EMBEDS,
	ACTION_SUBJECT_ID.RICH_MEDIA_LAYOUT,
	{
		previousLayoutType: RichMediaLayout;
		currentLayoutType: RichMediaLayout;
	},
	undefined
>;

type CodeBlockLanguageSelectedAEP = TrackAEP<
	ACTION.LANGUAGE_SELECTED,
	ACTION_SUBJECT.CODE_BLOCK,
	undefined,
	{
		language: string;
	},
	undefined
>;

type MediaLinkTransformedAEP = OperationalAEP<
	ACTION.MEDIA_LINK_TRANSFORMED,
	ACTION_SUBJECT.EDITOR,
	undefined,
	undefined
>;

type TextLinkCodeMarkTransformedAEP = OperationalAEP<
	ACTION.TEXT_LINK_MARK_TRANSFORMED,
	ACTION_SUBJECT.EDITOR,
	undefined,
	undefined
>;

type DedupeMarksTransformedAEP = OperationalAEP<
	ACTION.DEDUPE_MARKS_TRANSFORMED_V2,
	ACTION_SUBJECT.EDITOR,
	undefined,
	/** UGC WARNING
	 *
	 * DO NOT include `mark` attributes - only the types
	 *
	 */
	{
		discardedMarkTypes: string[];
	}
>;

type IndentationMarksTransformedAEP = OperationalAEP<
	ACTION.INDENTATION_MARKS_TRANSFORMED,
	ACTION_SUBJECT.EDITOR,
	undefined,
	undefined
>;

type NodesMissingContentTransformedAEP = OperationalAEP<
	ACTION.NODES_MISSING_CONTENT_TRANSFORMED,
	ACTION_SUBJECT.EDITOR,
	undefined,
	undefined
>;

type SingleColumLayoutDetectedAEP = OperationalAEP<
	ACTION.SINGLE_COL_LAYOUT_DETECTED,
	ACTION_SUBJECT.EDITOR,
	undefined,
	undefined
>;

type InvalidMediaContentTransformedAEP = OperationalAEP<
	ACTION.INVALID_MEDIA_CONTENT_TRANSFORMED,
	ACTION_SUBJECT.EDITOR,
	undefined,
	undefined
>;

type CollabStepsTrackerPayloadAEP = OperationalAEP<
	ACTION.STEPS_TRACKED | ACTION.STEPS_FILTERED,
	ACTION_SUBJECT.COLLAB,
	undefined,
	{
		steps: unknown[];
	}
>;

type BlocksDragInitAEP = OperationalAEP<
	ACTION.BLOCKS_DRAG_INIT,
	ACTION_SUBJECT.EDITOR,
	undefined,
	{
		duration: number;
		startTime: number;
		nodesCount: number;
	}
>;

type HeadingAnchorLinkButtonAEP = ButtonAEP<ACTION_SUBJECT_ID.HEADING_ANCHOR_LINK, undefined>;

type CodeBlockWordWrapToggleAEP = TrackAEP<
	ACTION.TOGGLE_CODE_BLOCK_WRAP,
	ACTION_SUBJECT.CODE_BLOCK,
	undefined,
	{
		platform: PLATFORMS;
		mode: MODE;
		wordWrapEnabled: boolean;
		codeBlockNodeSize: number;
	},
	undefined
>;

export type RequestToEditAEP = UIAEP<
	ACTION.REQUEST_TO_EDIT | ACTION.DISMISSED,
	ACTION_SUBJECT.REQUEST_TO_EDIT_POP_UP,
	undefined,
	{
		platform: PLATFORMS;
		mode: MODE;
	},
	undefined
>;

type CopyLinkToAnchorButtonAEP = ButtonAEP<
	ACTION_SUBJECT_ID.COPY_LINK_TO_ANCHOR,
	{
		inputMethod: INPUT_METHOD;
		extensionKey?: string;
		extensionType?: string;
		isLivePage?: boolean;
	}
>;

export type GeneralEventPayload<T = void> =
	| AnnotateButtonAEP
	| AnnotationAEP
	| AnnotationErrorAEP
	| BrowserFreezePayload
	| ButtonFeedbackAEP
	| ButtonHelpAEP
	| ButtonUploadMediaAEP
	| ColorPickerAEP
	| EditorPerfAEP
	| EditorRenderedAEP<T>
	| EditorStartAEP
	| EditorStopAEP
	| ExpandToggleAEP
	| FeedbackAEP
	| FullWidthModeAEP
	| HelpQuickInsertAEP
	| InputPerfSamplingAEP
	| InputPerfSamplingAvgAEP
	| PickerEmojiAEP
	| PickerImageAEP
	| PickerMediaInsertAEP
	| PickerMediaInsertClosedAEP
	| PickerMediaInsertCancelledAEP
	| ReactNodeViewRenderedAEP
	| RichMediaLayoutAEP
	| SelectionAEP
	| SlowInputAEP
	| TransactionMutatedAEP
	| UploadExternalFailedAEP
	| WithPluginStateCalledAEP
	| CodeBlockLanguageSelectedAEP
	| EditorContentRetrievalPerformedAEP
	| MediaLinkTransformedAEP
	| TextLinkCodeMarkTransformedAEP
	| DedupeMarksTransformedAEP
	| IndentationMarksTransformedAEP
	| NodesMissingContentTransformedAEP
	| InvalidProsemirrorDocumentErrorAEP
	| DocumentProcessingErrorAEP
	| InvalidMediaContentTransformedAEP
	| HeadingAnchorLinkButtonAEP
	| CollabStepsTrackerPayloadAEP
	| BlocksDragInitAEP
	| CodeBlockWordWrapToggleAEP
	| RequestToEditAEP
	| SingleColumLayoutDetectedAEP
	| CopyLinkToAnchorButtonAEP
	| DockedPrimaryToolbarRenderedAEP;
