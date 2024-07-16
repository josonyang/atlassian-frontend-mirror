export enum EVENT_TYPE {
	OPERATIONAL = 'operational',
	SCREEN = 'screen',
	TRACK = 'track',
	UI = 'ui',
}

export enum ACTION {
	ACTIVATED = 'activated',
	ADDED = 'added',
	BROWSER_FREEZE = 'browserFreeze',
	CANCELLED = 'cancelled',
	CAUGHT_DOM_ERROR = 'caughtDomError',
	CHANGED_BACKGROUND_COLOR = 'changedBackgroundColor',
	CHANGED_ICON = 'changedIcon',
	CHANGED_FULL_WIDTH_MODE = 'changedFullWidthMode',
	CHANGED_LAYOUT = 'changedLayout',
	CHANGED_REPLACEMENT_TEXT = 'changedReplacementText',
	CHANGED_TYPE = 'changedType',
	CHANGED_URL = 'changedUrl',
	CLEARED = 'cleared',
	CLICKED = 'clicked',
	CLOSED = 'closed',
	COMMITTED = 'committed',
	/** used in @atlassian/editor-referentiality */
	CONNECTED_NODES = 'connectedNodes',
	CONVERTED = 'converted',
	COPIED = 'copied',
	CUT = 'cut',
	DEACTIVATED = 'deactivated',
	DECREMENTED = 'decremented',
	DELETED = 'deleted',
	DISCARDED_INVALID_STEPS_FROM_TRANSACTION = 'discardedInvalidStepsFromTransaction',
	/** used in @atlassian/editor-referentiality */
	DISCONNECTED_SOURCE = 'disconnectedSource',
	/** used in @atlassian/editor-referentiality */
	DISCONNECTED_TARGET = 'disconnectedTarget',
	DISMISSED = 'dismissed',
	DISPATCHED_INVALID_TRANSACTION = 'dispatchedInvalidTransaction',
	DISPATCHED_VALID_TRANSACTION = 'dispatchedValidTransaction',
	DRAGGED = 'dragged',
	EDITED = 'edited',
	EDITOR_CRASHED = 'unhandledErrorCaught',
	EDITOR_CRASHED_ADDITIONAL_INFORMATION = 'unhandledErrorCaughtAdditionalInfov2',
	EDITOR_MOUNTED = 'mounted',
	EDITOR_TTI = 'tti',
	EDITOR_CONTENT_RETRIEVAL_PERFORMED = 'contentRetrievalPerformed',
	RE_RENDERED = 'reRendered',
	ENTERED = 'entered',
	ERRORED = 'errored',
	EXPOSED = 'exposed',
	FAILED_TO_UNMOUNT = 'failedToUnmount',
	FIND_NEXT_PERFORMED = 'findNextPerformed',
	FIND_PERFORMED = 'findPerformed',
	FIND_PREV_PERFORMED = 'findPrevPerformed',
	FORMATTED = 'formatted',
	HELP_OPENED = 'helpOpened',
	HIGHLIGHTED = 'highlighted',
	INCREMENTED = 'incremented',
	INDENTED = 'indented',
	INITIALISED = 'initialised',
	/** used in @atlassian/editor-referentiality */
	INITIALISED_FRAGMENT_MARK = 'initialisedFragmentMark',
	INPUT_PERF_SAMPLING = 'inputPerfSampling',
	INPUT_PERF_SAMPLING_AVG = 'inputPerfSamplingAvg',
	INPUT_PERF_SAMPLING_SINGLE_KEYPRESS = 'inputPerfSamplingSingleKeypress',
	INPUT_PERF_SAMPLING_SINGLE_KEYPRESS_AVG = 'inputPerfSamplingSingleKeypressAvg',
	INPUT_PERF_SAMPLING_RENDERED = 'inputPerfSamplingRendered',
	INPUT_PERF_SAMPLING_RENDERED_AVG = 'inputPerfSamplingRenderedAvg',
	INSERTED = 'inserted',
	INVALID_DOCUMENT_ENCOUNTERED = 'invalidDocumentEncountered',
	INVOKED = 'invoked',
	/** used in @atlassian/editor-referentiality */
	GOT_CONNECTIONS = 'gotConnections',
	LANGUAGE_SELECTED = 'languageSelected',
	LIST_ITEM_JOINED = 'listItemJoined',
	MATCHED = 'matched',
	MEDIA_LINK_TRANSFORMED = 'mediaLinkTransformed',
	NODE_CONTENT_SANITIZED = 'nodeContentSanitized',
	OPENED = 'opened',
	OUTDENTED = 'outdented',
	PASTED = 'pasted',
	PASTED_AS_PLAIN = 'pastedAsPlain',
	PASTED_TIMED = 'pastedTimed',
	PROSEMIRROR_RENDERED = 'proseMirrorRendered',
	REACT_NODEVIEW_RENDERED = 'reactNodeViewRendered',
	REPLACED_ALL = 'replacedAll',
	REPLACED_ONE = 'replacedOne',
	RESOLVED = 'resolved',
	SELECTED = 'selected',
	SHOWN = 'shown',
	SLOW_INPUT = 'slowInput',
	STARTED = 'started',
	STOPPED = 'stopped',
	SUBSTITUTED = 'autoSubstituted',
	SYNCHRONY_DISCONNECTED = 'synchronyDisconnected',
	SYNCHRONY_ENTITY_ERROR = 'synchronyEntityError',
	SYNCHRONY_ERROR = 'synchronyError',
	TEXT_LINK_MARK_TRANSFORMED = 'textLinkMarkTransformed',
	DEDUPE_MARKS_TRANSFORMED_V2 = 'dedupeMarksTransformedV2',
	NODES_MISSING_CONTENT_TRANSFORMED = 'nodesMissingContentTransformed',
	INDENTATION_MARKS_TRANSFORMED = 'indentationMarksTransformed',
	INVALID_MEDIA_CONTENT_TRANSFORMED = 'invalidMediaContentTransformed',
	TOGGLE_EXPAND = 'toggleExpand',
	TRANSACTION_DISPATCHED = 'transactionDispatched',
	TRANSACTION_MUTATED_AFTER_DISPATCH = 'transactionMutatedAfterDispatched',
	TYPING_FINISHED = 'typingFinished',
	TYPING_STARTED = 'typingStarted',
	UNLINK = 'unlinked',
	UNSUPPORTED_CONTENT_ENCOUNTERED = 'unsupportedContentEncounteredV2',
	UPDATED = 'updated',
	/** used in @atlassian/editor-referentiality */
	UPDATED_FRAGMENT_MARK_NAME = 'updatedFragmentMarkName',
	/** used in @atlassian/editor-referentiality */
	UPDATED_SOURCE = 'updatedSource',
	/** used in @atlassian/editor-referentiality */
	UPDATED_TARGET = 'updatedTarget',
	UPLOAD_EXTERNAL_FAIL = 'uploadExternalFailed',
	VIEWED = 'viewed',
	VISITED = 'visited',
	WITH_PLUGIN_STATE_CALLED = 'withPluginStateCalled',
	RENDERED = 'rendered',
	ON_EDITOR_READY_CALLBACK = 'onEditorReadyCallback',
	ON_CHANGE_CALLBACK = 'onChangeCalled',
	NEW_COLLAB_SYNC_UP_ERROR_NO_STEPS = 'newCollabSyncUpErrorNoSteps',
	REMOVE_ICON = 'removedIcon',
	UFO_SESSION_COMPLETE = 'ufoSessionComplete',
	INVALID_PROSEMIRROR_DOCUMENT = 'invalidProsemirrorDocument',
	DOCUMENT_PROCESSING_ERROR = 'documentProcessingErrorV2',
	RENDERER_TTI = 'tti',
	CRASHED = 'unhandledErrorCaughtV2',
	SELECT_ALL_CAUGHT = 'selectAllCaught',
	SELECT_ALL_ESCAPED = 'selectAllEscaped',
	SORT_COLUMN = 'sortedColumn',
	SORT_COLUMN_NOT_ALLOWED = 'sortColumnNotAllowed',
	STEPS_TRACKED = 'stepsTracked',
	CREATE_NOT_ALLOWED = 'createNotAllowed',
	UNSUPPORTED_CONTENT_LEVELS_TRACKING_SUCCEEDED = 'unsupportedContentLevelsTrackingSucceeded',
	UNSUPPORTED_CONTENT_LEVELS_TRACKING_ERRORED = 'unsupportedContentLevelsTrackingErrored',
	UNSUPPORTED_TOOLTIP_VIEWED = 'viewed',
	RECORD_VIDEO = 'recordVideo',
	INSERT_VIDEO = 'insertVideo',
	RECORD_VIDEO_FAILED = 'recordVideoFailed',
	ADD_CHILD = 'addChild',
	CHANGE_ACTIVE = 'changeActive',
	REMOVE_CHILD = 'removeChild',
	UPDATE_PARAMETERS = 'updateParameters',
	GET_CHILDERN = 'getChildern',
	MOVED = 'moved',
}

export enum INPUT_METHOD {
	ASCII = 'ascii',
	AUTO = 'auto',
	AUTO_DETECT = 'autoDetect',
	BUTTON = 'button',
	BLUR = 'blur',
	CARD = 'card',
	CLIPBOARD = 'clipboard',
	CONFIG_PANEL = 'configPanel',
	CONTEXT_MENU = 'contextMenu',
	DRAG_AND_DROP = 'dragAndDrop',
	DRAG = 'drag',
	EXTERNAL = 'external',
	EXTENSION_API = 'extensionApi',
	FLOATING_TB = 'floatingToolbar',
	FORMATTING = 'autoformatting',
	INSERT_MENU = 'insertMenu',
	KEYBOARD = 'keyboard',
	MACRO_BROWSER = 'macroBrowser',
	MANUAL = 'manual',
	PICKER = 'picker',
	PICKER_CLOUD = 'cloudPicker',
	PREFILL = 'prefill',
	QUICK_INSERT = 'quickInsert',
	SHORTCUT = 'shortcut',
	TOOLBAR = 'toolbar',
	TYPEAHEAD = 'typeAhead',
	DATASOURCE = 'datasource_config',
	TABLE_CONTEXT_MENU = 'tableContextMenu',
	MOUSE = 'mouse',
}

export enum TRIGGER_METHOD {
	BUTTON = 'button',
	KEYBOARD = 'keyboard', // single key, e.g. Esc, Enter
	SHORTCUT = 'shortcut', // combination of keys, e.g. Mod + F
	TOOLBAR = 'toolbar',
}

export enum ACTION_SUBJECT {
	COLLAB = 'collab',
	TOOLBAR_BUTTON = 'toolbarButton',
	BUTTON = 'button',
	CONFIG_PANEL = 'configPanel',
	CONTENT_COMPONENT = 'contentComponent',
	DATE = 'date',
	DATE_SEGMENT = 'dateSegment',
	DOCUMENT = 'document',
	EDITOR = 'editor',
	ELEMENT_BROWSER = 'elementBrowser',
	EMBEDS = 'embeds',
	EXPAND = 'expand',
	EXTENSION = 'extension',
	FEATURE = 'feature',
	FEEDBACK_DIALOG = 'feedbackDialog',
	FIND_REPLACE_DIALOG = 'findReplaceDialog',
	FLOATING_CONTEXTUAL_BUTTON = 'floatingContextualButton',
	FLOATING_TOOLBAR_PLUGIN = 'floatingToolbarPlugin',
	HELP = 'help',
	LAYOUT = 'layout',
	LIST = 'list',
	MEDIA = 'media',
	MEDIA_SINGLE = 'mediaSingle',
	NESTED_EXPAND = 'nestedExpand',
	PANEL = 'panel',
	PICKER = 'picker',
	PLUS_MENU = 'plusMenu',
	PLUGIN_SLOT = 'pluginSlot',
	REACT_NODE_VIEW = 'reactNodeView',
	SELECTION = 'selection',
	SMART_LINK = 'smartLink',
	HYPERLINK = 'hyperlink',
	TABLE = 'table',
	TABLES_PLUGIN = 'tablesPlugin',
	TEXT = 'text',
	TOOLBAR = 'toolbar',
	TYPEAHEAD = 'typeAhead',
	TYPEAHEAD_ITEM = 'typeAheadItem',
	ANNOTATION = 'annotation',
	SEARCH_RESULT = 'searchResult',
	CREATE_LINK_INLINE_DIALOG = 'createLinkInlineDialog',
	CODE_BLOCK = 'codeBlock',
	REACT_EDITOR_VIEW = 'reactEditorView',
	RENDERER = 'renderer',
	ANCHOR_LINK = 'anchorLink',
	LINK = 'link',
	TOOLTIP = 'tooltip',
	LOOM = 'loom',
	MULTI_BODIED_EXTENSION = 'multiBodiedExtension',
	BODIED_EXTENSION = 'bodiedExtension',
	DROP_TARGET = 'dropTarget',
	DRAG = 'drag',
	ELEMENT = 'element',
	CONTEXT_MENU = 'contextMenu',
	INLINE_DIALOG = 'inlineDialog',
}

export enum ACTION_SUBJECT_ID {
	ACTION = 'action',
	ALL = 'all',
	ALT_TEXT = 'altText',
	ANNOTATE_BUTTON = 'annotateButton',
	AVATAR_GROUP_PLUGIN = 'AvatarGroupInPlugin',
	BLOCK_QUOTE = 'blockQuote',
	BORDER = 'border',
	BUTTON_CATEGORY = 'categoryButton',
	BUTTON_FEEDBACK = 'feedbackButton',
	BUTTON_HELP = 'helpButton',
	CANCEL = 'cancel',
	CAPTION = 'caption',
	CARD_BLOCK = 'blockCard',
	CARD_INLINE = 'inlineCard',
	CELL = 'cell',
	CODE_BLOCK = 'codeBlock',
	CODEBLOCK_COPY = 'codeBlockCopy',
	CODEBLOCK_WRAP = 'codeBlockWrap',
	CREATE_INLINE_COMMENT_FROM_HIGHLIGHT_ACTIONS_MENU = 'createInlineCommentFromHighlightActionsMenu',
	DATE = 'date',
	DATE_DAY = 'day',
	DATE_MONTH = 'month',
	DATE_YEAR = 'year',
	DECISION = 'decision',
	DIVIDER = 'divider',
	EDIT_LINK = 'editLink',
	EDIT_DATASOURCE = 'editDatasource',
	ELEMENT_DRAG_HANDLE = 'elementDragHandle',
	ELEMENT_DROP_TARGET = 'elementDropTarget',
	EMBEDS = 'embeds',
	EMOJI = 'emoji',
	EXPAND = 'expand',
	EXTENSION = 'extension',
	EXTENSION_API = 'extensionApi',
	EXTENSION_BLOCK = 'extension',
	EXTENSION_BODIED = 'bodiedExtension',
	EXTENSION_INLINE = 'inlineExtension',
	FORMAT_BACKGROUND_COLOR = 'backgroundColor',
	FORMAT_BLOCK_QUOTE = 'blockQuote',
	FORMAT_CLEAR = 'clearFormatting',
	FORMAT_CODE = 'code',
	FORMAT_COLOR = 'color',
	FORMAT_HEADING = 'heading',
	FORMAT_INDENT = 'indentation',
	FORMAT_ITALIC = 'italic',
	FORMAT_LIST_BULLET = 'bulletedList',
	FORMAT_LIST_NUMBER = 'numberedList',
	FORMAT_STRIKE = 'strike',
	FORMAT_STRONG = 'strong',
	FORMAT_SUB = 'subscript',
	FORMAT_SUPER = 'superscript',
	FORMAT_UNDERLINE = 'underline',
	FRAGMENT_MARK = 'fragmentMark',
	GOTO_SMART_LINK_SETTINGS = 'goToSmartLinkSettings',
	HELP_QUICK_INSERT = 'helpQuickInsert',
	HYPERLINK = 'hyperlink',
	INLINE_COMMENT = 'inlineComment',
	LAYOUT = 'layout',
	LINE_BREAK = 'lineBreak',
	LINK = 'link',
	LINK_PREVIEW = 'linkPreview',
	LINK_SEARCH_INPUT = 'linkSearchInput',
	MEDIA = 'media',
	MEDIA_GROUP = 'mediaGroup',
	MEDIA_INLINE = 'mediaInline',
	MEDIA_INLINE_IMAGE = 'mediaInlineImage',
	MEDIA_LINK = 'mediaLink',
	MEDIA_SINGLE = 'mediaSingle',
	MENTION = 'mention',
	NESTED_EXPAND = 'nestedExpand',
	NODE = 'node',
	OPEN_LINK = 'openLink',
	PANEL = 'panel',
	PASTE_BLOCK_CARD = 'blockCard',
	PASTE_BLOCKQUOTE = 'blockQuote',
	PASTE_BODIED_EXTENSION = 'bodiedExtension',
	PASTE_BULLET_LIST = 'bulletList',
	PASTE_CODE_BLOCK = 'codeBlock',
	PASTE_DECISION_LIST = 'decisionList',
	PASTE_EXPAND = 'expand',
	PASTE_EXTENSION = 'extension',
	PASTE_HEADING = 'heading',
	PASTE_MEDIA_GROUP = 'mediaGroup',
	PASTE_MEDIA_SINGLE = 'mediaSingle',
	PASTE_NESTED_EXPAND = 'nestedExpand',
	PASTE_ORDERED_LIST = 'orderedList',
	PASTE_PANEL = 'panel',
	PASTE_PARAGRAPH = 'paragraph',
	PASTE_RULE = 'rule',
	PASTE_TABLE = 'table',
	PASTE_TABLE_CELL = 'tableCell',
	PASTE_TABLE_HEADER = 'tableHeader',
	PASTE_TABLE_ROW = 'tableRow',
	PASTE_TASK_LIST = 'taskList',
	PICKER_CLOUD = 'cloudPicker',
	PICKER_COLOR = 'colorPicker',
	PICKER_EMOJI = 'emojiPicker',
	PLACEHOLDER_TEXT = 'placeholderText',
	POST_QUERY_SEARCH_RESULTS = 'postQuerySearchResults',
	PRE_QUERY_SEARCH_RESULTS = 'preQuerySearchResults',
	PRODUCT_NAME = 'productName',
	PUNC = 'punctuation',
	QUICK_SEARCH = 'quickSearch',
	RANGE = 'range',
	REACT_NODE_VIEW = 'reactNodeView',
	RECENT_ACTIVITIES = 'recentActivities',
	RESIZED = 'resized',
	RICH_MEDIA_LAYOUT = 'richMediaLayout',
	SAVE = 'save',
	SECTION = 'section',
	SMART_LINK = 'smartLink',
	SMART_LINK_TOOLBAR = 'smartLinkToolbar',
	STATUS = 'status',
	SYMBOL = 'symbol',
	TABLE = 'table',
	TEXT = 'text',
	TYPEAHEAD_EMOJI = 'emojiTypeAhead',
	TYPEAHEAD_LINK = 'linkTypeAhead',
	TYPEAHEAD_MENTION = 'mentionTypeAhead',
	TYPEAHEAD_QUICK_INSERT = 'quickInsertTypeAhead',
	UNKNOWN_NODE = 'unknownNode',
	UNLINK = 'unlink',
	HEADING_ANCHOR_LINK = 'headingAnchorLink',
	UNSUPPORTED_ERROR = 'unsupportedUnhandled',
	UNSUPPORTED_NODE_ATTRIBUTE = 'unsupportedNodeAttribute',
	UNSUPPORTED_BLOCK = 'unsupportedBlock',
	UNSUPPORTED_INLINE = 'unsupportedInline',
	UNSUPPORTED_MARK = 'unsupportedMark',
	ON_UNSUPPORTED_INLINE = 'onUnsupportedInline',
	ON_UNSUPPORTED_BLOCK = 'onUnsupportedBlock',
	MULTI_BODIED_EXTENSION = 'multiBodiedExtension',
}

export enum FLOATING_CONTROLS_TITLE {
	CODE_BLOCK = 'codeBlockFloatingControls',
	EXTENSION = 'extensionFloatingControls',
	HYPERLINK = 'hyperlinkFloatingControls',
	MEDIA = 'mediaFloatingControls',
	PANEL = 'panelFloatingControls',
	TABLE = 'tableFloatingControls',
	EXPAND = 'expandToolbar',
}

export enum CONTENT_COMPONENT {
	INLINE_COMMENT = 'inlineComment',
	FLOATING_CONTEXTUAL_BUTTON = 'floatingContextualButton',
	FLOATING_INSERT_BUTTON = 'floatingInsertButton',
	FLOATING_TOOLBAR = 'floatingToolbar',
}
