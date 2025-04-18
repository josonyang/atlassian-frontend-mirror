import type { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, INPUT_METHOD } from './enums';
import type { NonRequiredAttributes, TrackAEP } from './utils';

export enum DELETE_DIRECTION {
	BACKWARD = 'backward',
	FORWARD = 'forward',
}

export enum LIST_TEXT_SCENARIOS {
	JOIN_SIBLINGS = 'joinSiblings',
	JOIN_DESCENDANT_TO_PARENT = 'joinDescendantToParent',
	JOIN_TO_SIBLING_DESCENDANT = 'joinToSiblingDescendant',
	JOIN_PARAGRAPH_WITH_LIST = 'joinParagraphWithList',
	JOIN_PARENT_SIBLING_TO_PARENT_CHILD = 'joinParentSiblingToParentChild',
	JOIN_LIST_ITEM_WITH_PARAGRAPH = 'joinListItemWithParagraph',
}

export enum JOIN_SCENARIOS_WHEN_TYPING_TO_INSERT_LIST {
	NO_JOIN = 'noJoin',
	JOINED_TO_LIST_ABOVE = 'joinedToListAbove',
	JOINED_TO_LIST_BELOW = 'joinedToListBelow',
}

export enum OUTDENT_SCENARIOS {
	SPLIT_LIST = 'splitList',
}

export type CommonListAnalyticsAttributes = {
	itemIndexAtSelectionStart: number;
	itemIndexAtSelectionEnd: number;
	indentLevelAtSelectionStart: number;
	indentLevelAtSelectionEnd: number;
	itemsInSelection: number;
};

export type RestartListsAttributesForListOutdented = {
	outdentScenario?: OUTDENT_SCENARIOS;
	splitListStartNumber?: number;
};

type ListItemJoinedFormatAEP<Attributes> = TrackAEP<
	ACTION.LIST_ITEM_JOINED,
	ACTION_SUBJECT.LIST,
	ACTION_SUBJECT_ID.FORMAT_LIST_BULLET | ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER,
	Attributes,
	undefined
>;

type ListItemJoinedForwardAEP = ListItemJoinedFormatAEP<{
	inputMethod: INPUT_METHOD.KEYBOARD;
	direction: DELETE_DIRECTION.FORWARD;
	scenario:
		| LIST_TEXT_SCENARIOS.JOIN_PARAGRAPH_WITH_LIST
		| LIST_TEXT_SCENARIOS.JOIN_SIBLINGS
		| LIST_TEXT_SCENARIOS.JOIN_DESCENDANT_TO_PARENT
		| LIST_TEXT_SCENARIOS.JOIN_PARENT_SIBLING_TO_PARENT_CHILD
		| LIST_TEXT_SCENARIOS.JOIN_LIST_ITEM_WITH_PARAGRAPH;
}>;

type ListItemJoinedBackwardsAEP = ListItemJoinedFormatAEP<{
	inputMethod: INPUT_METHOD.KEYBOARD;
	direction: DELETE_DIRECTION.BACKWARD;
	scenario:
		| LIST_TEXT_SCENARIOS.JOIN_SIBLINGS
		| LIST_TEXT_SCENARIOS.JOIN_DESCENDANT_TO_PARENT
		| LIST_TEXT_SCENARIOS.JOIN_TO_SIBLING_DESCENDANT;
}>;

type ListConvertedTrackAEP = TrackAEP<
	ACTION.CONVERTED,
	ACTION_SUBJECT.LIST,
	| ACTION_SUBJECT_ID.FORMAT_LIST_BULLET
	| ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER
	| ACTION_SUBJECT_ID.TEXT,
	{
		transformedFrom: ACTION_SUBJECT_ID.FORMAT_LIST_BULLET | ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER;
		inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.KEYBOARD | INPUT_METHOD.FLOATING_TB;
	} & CommonListAnalyticsAttributes,
	undefined
>;

type ListIndentedAEP = TrackAEP<
	ACTION.INDENTED,
	ACTION_SUBJECT.LIST,
	ACTION_SUBJECT_ID.FORMAT_LIST_BULLET | ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER,
	{
		inputMethod: INPUT_METHOD;
	} & CommonListAnalyticsAttributes,
	undefined
>;

type ListOutdentedAEP = TrackAEP<
	ACTION.OUTDENTED,
	ACTION_SUBJECT.LIST,
	ACTION_SUBJECT_ID.FORMAT_LIST_BULLET | ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER,
	{
		inputMethod: INPUT_METHOD;
	} & CommonListAnalyticsAttributes &
		RestartListsAttributesForListOutdented,
	undefined
>;

type ListInsertedAEP = TrackAEP<
	ACTION.INSERTED,
	ACTION_SUBJECT.LIST,
	ACTION_SUBJECT_ID.FORMAT_LIST_BULLET | ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER,
	{
		inputMethod:
			| INPUT_METHOD.FORMATTING
			| INPUT_METHOD.KEYBOARD
			| INPUT_METHOD.TOOLBAR
			| INPUT_METHOD.QUICK_INSERT
			| INPUT_METHOD.FLOATING_TB;
		listStartNumber?: number;
		joinScenario?: JOIN_SCENARIOS_WHEN_TYPING_TO_INSERT_LIST;
	},
	undefined,
	NonRequiredAttributes
>;

type ListContentSanitizedAEP = TrackAEP<
	ACTION.NODE_CONTENT_SANITIZED,
	ACTION_SUBJECT.LIST,
	ACTION_SUBJECT_ID.FORMAT_LIST_BULLET | ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER,
	{
		inputMethod: INPUT_METHOD.FORMATTING;
		nodeSanitized: string;
		marksRemoved: string[];
	},
	undefined
>;

export type ListEventPayload =
	| ListItemJoinedForwardAEP
	| ListItemJoinedBackwardsAEP
	| ListConvertedTrackAEP
	| ListIndentedAEP
	| ListOutdentedAEP
	| ListInsertedAEP
	| ListContentSanitizedAEP;
