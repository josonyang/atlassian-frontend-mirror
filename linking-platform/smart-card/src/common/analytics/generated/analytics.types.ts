/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Generates Typescript types for analytics events from analytics.spec.yaml
 *
 * @codegen <<SignedSource::050cd99cdd30e3c38674dc47986e3214>>
 * @codegenCommand yarn workspace @atlassian/analytics-tooling run analytics:codegen smart-card
 */
export type PackageMetaDataContextType = {
	packageName: string;
	packageVersion: string;
};
export type CommonContextType = {
	extensionKey: string | null;
	resourceType: string | null;
	destinationObjectType: string | null;
	destinationSubproduct: string | null;
	destinationProduct: string | null;
	location: string | null;
	statusDetails: string | null;
};
export type ResolvedContextType = {
	status:
		| 'pending'
		| 'resolving'
		| 'resolved'
		| 'errored'
		| 'fallback'
		| 'unauthorized'
		| 'forbidden'
		| 'not_found'
		| null;
	statusDetails: string | null;
	displayCategory: 'smartLink' | 'link';
	extensionKey: string | null;
	destinationProduct: string | null;
	destinationSubproduct: string | null;
	destinationCategory: string | null;
	destinationObjectId: string | null;
	destinationObjectType: string | null;
	destinationContainerId: string | null;
	destinationTenantId: string | null;
	canBeDatasource: boolean | null;
	location: string | null;
	resourceType: string | null;
};

export type ButtonClickedAiSummaryAttributesType = {};
export type ButtonClickedCopySummaryAttributesType = {};
export type SummaryViewedAttributesType = {
	fromCache: boolean | null;
};
export type ErrorViewedAiSummaryAttributesType = {};
export type SummarySuccessAttributesType = {};
export type SummaryFailedAttributesType = {
	reason: string | null;
	isSloError: boolean;
};
export type AiInteractionInitiatedAttributesType = {
	aiFeatureName: string;
	proactiveAIGenerated: number;
	userGeneratedAI: number;
};
export type ButtonClickedAutomationActionAttributesType = {};
export type ButtonClickedRelatedLinksAttributesType = {};
export type ModalOpenedRelatedLinksAttributesType = {};
export type ModalClosedRelatedLinksAttributesType = {
	dwellTime: number;
};
export type RelatedLinksSuccessAttributesType = {
	incomingCount: number;
	outgoingCount: number;
};
export type RelatedLinksFailedAttributesType = {
	reason: string;
};
export type SmartLinkIframeDwelledAttributesType = {
	id: string;
	display: 'inline' | 'block' | 'embed' | 'embedPreview' | 'flexible' | 'hoverCardPreview';
	definitionId: string | null;
	dwellTime: number;
	dwellPercentVisible: number;
};
export type SmartLinkIframeFocusedAttributesType = {
	id: string;
	display: 'inline' | 'block' | 'embed' | 'embedPreview' | 'flexible' | 'hoverCardPreview';
	definitionId: string | null;
};
export type ApplicationAccountConnectedAttributesType = {
	definitionId: string | null;
};
export type ApplicationAccountAuthStartedAttributesType = {};
export type SmartLinkQuickActionStartedAttributesType = {
	smartLinkActionType:
		| 'FollowEntityAction'
		| 'GetStatusTransitionsAction'
		| 'StatusUpdateAction'
		| 'UnfollowEntityAction'
		| 'StatusUpdate';
};
export type SmartLinkQuickActionSuccessAttributesType = {
	smartLinkActionType:
		| 'FollowEntityAction'
		| 'GetStatusTransitionsAction'
		| 'StatusUpdateAction'
		| 'UnfollowEntityAction'
		| 'StatusUpdate';
};
export type SmartLinkQuickActionFailedAttributesType = {
	smartLinkActionType:
		| 'FollowEntityAction'
		| 'GetStatusTransitionsAction'
		| 'StatusUpdateAction'
		| 'UnfollowEntityAction'
		| 'StatusUpdate';
	reason: 'PermissionError' | 'ValidationError' | 'UnknownError' | null;
};
export type ConsentModalViewedAttributesType = {
	definitionId: string | null;
};
export type SmartLinkConnectSucceededAttributesType = {
	definitionId: string | null;
};
export type SmartLinkConnectFailedAttributesType = {
	reason: string | null;
	definitionId: string | null;
};
export type SmartLinkResolvedAttributesType = {
	definitionId: string | null;
	duration: number | null;
};
export type SmartLinkUnresolvedAttributesType = {
	definitionId: string | null;
	error: Record<string, unknown> | null;
	reason: string;
};
export type SmartLinkChunkLoadFailedAttributesType = {
	display: 'inline' | 'block' | 'embed' | 'embedPreview' | 'flexible' | 'hoverCardPreview';
	definitionId: string | null;
	error: Record<string, unknown>;
	errorInfo: Record<string, unknown>;
};
export type SmartLinkClickedAttributesType = {
	id: string;
	display: 'inline' | 'block' | 'embed' | 'embedPreview' | 'flexible' | 'hoverCardPreview';
	definitionId: string | null;
	isModifierKeyPressed: boolean | null;
};
export type SmartLinkClickedTitleGoToLinkAttributesType = {
	id: string;
	display: 'inline' | 'block' | 'embed' | 'embedPreview' | 'flexible' | 'hoverCardPreview';
	definitionId: string | null;
	isModifierKeyPressed: boolean | null;
};
export type HoverCardViewedAttributesType = {
	previewDisplay: 'card' | 'embed';
	previewInvokeMethod: 'keyboard' | 'mouse_hover' | 'mouse_click' | null;
	definitionId: string | null;
};
export type HoverCardDismissedAttributesType = {
	previewDisplay: 'card' | 'embed';
	hoverTime: number;
	previewInvokeMethod: 'keyboard' | 'mouse_hover' | 'mouse_click' | null;
	definitionId: string | null;
};
export type ButtonClickedConnectAccountAttributesType = {
	display: 'inline' | 'block' | 'embed' | 'embedPreview' | 'flexible' | 'hoverCardPreview';
	definitionId: string | null;
};
export type SmartLinkClickedTryAnotherAccountAttributesType = {
	display: 'inline' | 'block' | 'embed' | 'embedPreview' | 'flexible' | 'hoverCardPreview';
	definitionId: string | null;
};
export type ConsentModalClosedAttributesType = {
	display: 'inline' | 'block' | 'embed' | 'embedPreview' | 'flexible' | 'hoverCardPreview';
	definitionId: string | null;
};
export type ButtonClickedLearnMoreAttributesType = {};
export type ButtonClickedSmartLinkStatusLozengeAttributesType = {};
export type ButtonClickedSmartLinkStatusListItemAttributesType = {};
export type ButtonClickedSmartLinkStatusOpenPreviewAttributesType = {};
export type ButtonClickedSmartLinkFollowButtonAttributesType = {};
export type ButtonClickedStatusUpdateActionAttributesType = {};
export type ButtonClickedGetStatusTransitionsActionAttributesType = {};

export type AnalyticsEventAttributes = {
	/**
	 * fired when an ai summary is clicked */
	'ui.button.clicked.aiSummary': ButtonClickedAiSummaryAttributesType;
	/**
	 * fired when the copy ai summary button is clicked */
	'ui.button.clicked.copySummary': ButtonClickedCopySummaryAttributesType;
	/**
	 * fired when a summary is viewed */
	'ui.summary.viewed': SummaryViewedAttributesType;
	/**
	 * fired when a summary error is viewed */
	'ui.error.viewed.aiSummary': ErrorViewedAiSummaryAttributesType;
	/**
	 * fired when a summary request finishes with a successful response */
	'operational.summary.success': SummarySuccessAttributesType;
	/**
	 * fired when a summary request finishes with a failed response */
	'operational.summary.failed': SummaryFailedAttributesType;
	/**
	 * fired when an explicit request is made to use an AI-powered feature */
	'track.aiInteraction.initiated': AiInteractionInitiatedAttributesType;
	/**
	 * fired when the automation action button is clicked */
	'ui.button.clicked.automationAction': ButtonClickedAutomationActionAttributesType;
	/**
	 * fired when the related links action button is clicked */
	'ui.button.clicked.relatedLinks': ButtonClickedRelatedLinksAttributesType;
	/**
	 * fired when related links modal is opened */
	'ui.modal.opened.relatedLinks': ModalOpenedRelatedLinksAttributesType;
	/**
	 * fired when related links modal is closed */
	'ui.modal.closed.relatedLinks': ModalClosedRelatedLinksAttributesType;
	/**
	 * fired when related links are retrieved successfully */
	'operational.relatedLinks.success': RelatedLinksSuccessAttributesType;
	/**
	 * fired when related links retrieval fails */
	'operational.relatedLinks.failed': RelatedLinksFailedAttributesType;
	/**
	 * fired when a user dwells their cursor on a Smart Link's iframe */
	'ui.smartLinkIframe.dwelled': SmartLinkIframeDwelledAttributesType;
	/**
	 * fires when a user clicks or tabs into a Smart Link's iframe. */
	'ui.smartLinkIframe.focused': SmartLinkIframeFocusedAttributesType;
	/**
	 * user connecting their account to view a Smart Link. */
	'track.applicationAccount.connected': ApplicationAccountConnectedAttributesType;
	/**
	 * user starting the Smart Link connect account process. */
	'track.applicationAccount.authStarted': ApplicationAccountAuthStartedAttributesType;
	/**
	 * fires event before an action invoke api call is made */
	'track.smartLinkQuickAction.started': SmartLinkQuickActionStartedAttributesType;
	/**
	 * fires a tracking event after an action invoke api call is successful */
	'track.smartLinkQuickAction.success': SmartLinkQuickActionSuccessAttributesType;
	/**
	 * fires a tracking event after an action invoke api call has failed */
	'track.smartLinkQuickAction.failed': SmartLinkQuickActionFailedAttributesType;
	/**
	 * fires an event which represents the connect account page being opened. */
	'screen.consentModal.viewed': ConsentModalViewedAttributesType;
	/**
	 * fires an event that represents an account successfully being connected via a Smart Link. */
	'operational.smartLink.connectSucceeded': SmartLinkConnectSucceededAttributesType;
	/**
	 * fires an event that represents an account unsuccessfully being connected. */
	'operational.smartLink.connectFailed': SmartLinkConnectFailedAttributesType;
	/**
	 * fires an event which represents a Smart Link request succeeding. */
	'operational.smartLink.resolved': SmartLinkResolvedAttributesType;
	/**
	 * fires an event which represents a Smart Link request failing. */
	'operational.smartLink.unresolved': SmartLinkUnresolvedAttributesType;
	/**
	 * fires an event that represents when a Smart Link renders unsuccessfully. */
	'operational.smartLink.chunkLoadFailed': SmartLinkChunkLoadFailedAttributesType;
	/**
	 * fires an event that represents when a user clicks on a Smart Link. */
	'ui.smartLink.clicked': SmartLinkClickedAttributesType;
	/**
	 * fires an event that represents when a user clicks on a Smart Link. */
	'ui.smartLink.clicked.titleGoToLink': SmartLinkClickedTitleGoToLinkAttributesType;
	/**
	 * fires an event that represents a hover preview being opened. */
	'ui.hoverCard.viewed': HoverCardViewedAttributesType;
	/**
	 * fires an event that represents a hover preview being dismissed. */
	'ui.hoverCard.dismissed': HoverCardDismissedAttributesType;
	/**
	 * fires an event that represents when a user clicks on the authentication call to action with no current authenticated account. (i.e. Connect to Preview). */
	'ui.button.clicked.connectAccount': ButtonClickedConnectAccountAttributesType;
	/**
	 * fires an event that represents when a user clicks on the authentication call to action with a forbidden authenticated account. (i.e. Try another account). */
	'ui.smartLink.clicked.tryAnotherAccount': SmartLinkClickedTryAnotherAccountAttributesType;
	/**
	 * fires an event that represents when a user closed the authentication window without authenticating after opening it. */
	'ui.consentModal.closed': ConsentModalClosedAttributesType;
	/**
	 * fires an event that signifies that a "Learn More" link was clicked on an unauthenticated card */
	'ui.button.clicked.learnMore': ButtonClickedLearnMoreAttributesType;
	/**
	 * fires an event that represent a click was performed on a Status Lozenge */
	'ui.button.clicked.smartLinkStatusLozenge': ButtonClickedSmartLinkStatusLozengeAttributesType;
	/**
	 * fires an event that represent a click was performed on a Status Lozenge's dropdown item */
	'ui.button.clicked.smartLinkStatusListItem': ButtonClickedSmartLinkStatusListItemAttributesType;
	/**
	 * fires an event that represent a click was performed on a Status Lozenge open preview button */
	'ui.button.clicked.smartLinkStatusOpenPreview': ButtonClickedSmartLinkStatusOpenPreviewAttributesType;
	/**
	 * fires an event that represents a click was performed on the follow button. */
	'ui.button.clicked.smartLinkFollowButton': ButtonClickedSmartLinkFollowButtonAttributesType;
	/** */
	'ui.button.clicked.StatusUpdateAction': ButtonClickedStatusUpdateActionAttributesType;
	/** */
	'ui.button.clicked.GetStatusTransitionsAction': ButtonClickedGetStatusTransitionsActionAttributesType;
};

export type EventKey = keyof AnalyticsEventAttributes;
