import type { Step } from '@atlaskit/editor-prosemirror/transform';
import type { AnalyticsWebClient } from '@atlaskit/analytics-listeners';
import type { Manager, Socket as SocketIOSocket } from 'socket.io-client';
import type { InternalError } from './errors/internal-errors';
import type { JSONDocNode } from '@atlaskit/editor-json-transformer';
import type { GetUserType } from './participants/participants-helper';
import type AnalyticsHelper from './analytics/analytics-helper';
import type {
	StepJson,
	CollabSendableSelection,
	Metadata,
	UserPermitType,
	Activity,
} from '@atlaskit/editor-common/collab';
import { type CatchupEventReason } from './helpers/const';

// Re-export values for the /types entry point to this package
export type {
	CollabParticipant,
	CollabEventInitData,
	CollabEventRemoteData,
	CollabEventConnectionData,
	CollabEventConnectingData,
	CollabEventPresenceData,
	ResolvedEditorState,
	CollabConnectedPayload,
	CollabConnectingPayload,
	CollabDisconnectedPayload,
	CollabInitPayload,
	CollabDataPayload,
	CollabTelepointerPayload,
	CollabPresencePayload,
	CollabMetadataPayload,
	CollabLocalStepsPayload,
	CollabCommitStatusEventPayload,
	CollabPermissionEventPayload,
	UserPermitType,
	CollabEvents,
	Metadata,
	StepJson,
	CollabEventTelepointerData,
	CollabSendableSelection,
	CollabEditProvider,
	NewCollabSyncUpErrorAttributes,
	SyncUpErrorFunction,
	CollabEventLocalStepData,
} from '@atlaskit/editor-common/collab';

export interface CollabEventDisconnectedData {
	sid: string;
	reason:
		| 'CLIENT_DISCONNECT'
		| 'SERVER_DISCONNECT'
		| 'SOCKET_CLOSED'
		| 'SOCKET_ERROR'
		| 'SOCKET_TIMEOUT'
		| 'UNKNOWN_DISCONNECT';
}

// types from editor common end

export interface Storage {
	get(key: string): Promise<string>;
	set(key: string, value: string): Promise<void>;
	delete(key: string): Promise<void>;
}

// Initial draft
export interface InitialDraft {
	document: JSONDocNode;
	version: number;
	metadata?: Metadata;
}

export interface Config {
	url: string;
	documentAri: string;
	lifecycle?: Lifecycle;
	storage?: Storage;
	// ESS-1009 Allow to opt-in into 404 response
	need404?: boolean;
	createSocket: (
		path: string,
		auth?: AuthCallback | InitAndAuthData,
		productInfo?: ProductInformation,
	) => SocketIOSocket;
	/**
	 * @deprecated: Use promise based getAnalyticsWebClient instead
	 */
	analyticsClient?: AnalyticsWebClient;
	getAnalyticsWebClient?: Promise<AnalyticsWebClient>;
	featureFlags?: { [key: string]: boolean };
	getUser?: GetUserType;
	/**
	 * If provided, permissionTokenRefresh is called whenever a new JWT token is required.
	 */
	permissionTokenRefresh?: () => Promise<string | null>;
	productInfo?: ProductInformation;
	/**
	 * Throws errors when trying to send data to collab but the client is not offline.
	 * This can lead to potential dataloss and retrying should be considered. Without this flag the provider silently drops the requests.
	 */
	throwOnNotConnected?: boolean;
	// initial draft passed on provider creation
	initialDraft?: InitialDraft;
	isBufferingEnabled?: boolean;
	// specifically for the presence only
	isPresenceOnly?: boolean;
	/**
	 * When a page is being published this number can control the number of failed steps until a catchup is triggered.
	 * The default value is MAX_STEP_REJECTED_ERROR (15).
	 */
	failedStepLimitBeforeCatchupOnPublish?: number;
	/**
	 * Enable checking if a document update from collab-provider is being dropped by the editor,
	 * throwing a non-recoverable error if it's detected.
	 */
	enableErrorOnFailedDocumentApply?: boolean;

	/**
	 * Configure the client side circuit breaker in the event that abnormal behaviour causes the client to flood
	 * NCS with too many steps or too large a volume of data. This can result in either a soft fail or a hard (fatal) fail
	 * depending on the configured rate limit type.
	 */
	rateLimitMaxStepSize?: number;
	rateLimitStepCount?: number;
	rateLimitTotalStepSize?: number;
	rateLimitType?: number;
	/**
	 * There is expected to be temporary divergence between Live Page editor expand behaviour and the standard expand behaviour.
	 *
	 * This is expected to be removed in Q4 as Editor and Live Page teams align on a singular behaviour.
	 *
	 * It is only supported for use by Confluence.
	 *
	 * @default false
	 */
	__livePage?: boolean;
}

export interface InitAndAuthData {
	// The initialized status. If false, BE will send document, otherwise not.
	initialized: boolean;
	// ESS-1009 Allow to opt-in into 404 response
	need404?: boolean;
	token?: string;
}

export type AuthCallback = (cb: (data: InitAndAuthData) => void) => void;

interface SimpleEventEmitter {
	on(event: string, fn: Function): SimpleEventEmitter;
}
export interface Socket extends SimpleEventEmitter {
	id: string;
	connect(): Socket;
	emit(event: string, ...args: any[]): Socket;
	close(): Socket;
	io?: Manager;
}

export type LifecycleEvents = 'save' | 'restore';
export type EventHandler = () => void;

export interface Lifecycle {
	on(event: LifecycleEvents, handler: EventHandler): void;
}

// Channel
export type InitPayload = {
	doc: any;
	version: number;
	userId?: string;
	metadata?: Metadata;
	targetClientId?: string;
};

/**
 * @description Incoming payload type from the `broadcast` route in NCS
 * @param {number} timestamp added in NCS
 * @param {string} sessionId socket.id from NCS
 * @param data event specific data from NCS
 */
export type BroadcastIncomingPayload = {
	sessionId?: string;
	timestamp?: number;
	data: PresencePayload | TelepointerPayload | StepsPayload | ActivityPayload | any; // broadcasted data from NCS, any added as a fallback
};

export type PresenceData = {
	sessionId: string;
	userId: string | undefined;
	clientId: number | string;
	permit?: UserPermitType;
};

export type PresencePayload = PresenceData & {
	timestamp: number;
};

export type ActivityPayload = {
	userId: string | undefined;
	activity: Activity;
	sessionId: string;
};

export type TelepointerPayload = PresencePayload & {
	selection: CollabSendableSelection;
};

export enum AcknowledgementResponseTypes {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

export type AcknowledgementSuccessPayload = {
	type: AcknowledgementResponseTypes.SUCCESS;
};

export type AcknowledgementPayload = AcknowledgementSuccessPayload | AcknowledgementErrorPayload;

export type AddStepAcknowledgementSuccessPayload = {
	type: AcknowledgementResponseTypes.SUCCESS;
	version: number;
};

export type AcknowledgementErrorPayload = {
	type: AcknowledgementResponseTypes.ERROR;
	error: InternalError;
};

export type AddStepAcknowledgementPayload =
	| AddStepAcknowledgementSuccessPayload
	| AcknowledgementErrorPayload;

export type StepsPayload = {
	version: number;
	steps: StepJson[];
};

// ESS-2916 Type def for namespace status - lock/unlock
export type NamespaceStatus = {
	isLocked: boolean;
	timestamp: number;
	// waitTimeInMs is set when the isLocked bool set to true. Otherwise, it is null
	waitTimeInMs?: number;
};

export type ChannelEvent = {
	connected: {
		sid: string;
		initialized: boolean;
	};
	init: InitPayload;
	restore: InitPayload;
	reconnected: null;
	'presence:joined': PresencePayload;
	presence: PresencePayload;
	'participant:left': PresencePayload;
	'participant:activity-join': ActivityPayload;
	'participant:activity-ack': ActivityPayload;
	'participant:telepointer': TelepointerPayload;
	'participant:updated': PresencePayload;
	'steps:commit': StepsPayload & { userId: string };
	'steps:added': StepsPayload;
	'metadata:changed': Metadata;
	permission: UserPermitType;
	error: InternalError;
	disconnect: { reason: string };
	status: NamespaceStatus;
};

export interface Catchupv2Response {
	steps?: Step[];
	metadata?: Metadata;
}

export interface ReconcileResponse {
	document: string;
	version: number;
	ari?: string;
	metadata?: Metadata;
}

// CatchupV2
export interface Catchupv2Options {
	getCurrentPmVersion: () => number;
	fetchCatchupv2: (
		fromVersion: number,
		clientId: number | string | undefined,
		catchUpOutofSync: boolean,
		reason?: CatchupEventReason,
	) => Promise<Catchupv2Response>;
	updateMetadata: (metadata: Metadata | undefined) => void;
	analyticsHelper: AnalyticsHelper | undefined;
	clientId: number | string | undefined;
	onStepsAdded: (data: StepsPayload) => void;
	catchUpOutofSync: boolean;
	reason?: CatchupEventReason;
}

export type ProductInformation = {
	product: string;
	subProduct?: string;
};
