<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/collab-provider"

> Do not edit this file. This report is auto-generated using
> [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import type { AnalyticsWebClient } from '@atlaskit/analytics-listeners';
import { CollabConnectedPayload } from '@atlaskit/editor-common/collab';
import { CollabDataPayload } from '@atlaskit/editor-common/collab';
import { CollabDisconnectedPayload } from '@atlaskit/editor-common/collab';
import { CollabEditProvider } from '@atlaskit/editor-common/collab';
import { CollabEventConnectingData } from '@atlaskit/editor-common/collab';
import { CollabEventConnectionData } from '@atlaskit/editor-common/collab';
import { CollabEventInitData } from '@atlaskit/editor-common/collab';
import { CollabEventLocalStepData } from '@atlaskit/editor-common/collab';
import { CollabEventPresenceData } from '@atlaskit/editor-common/collab';
import { CollabEventRemoteData } from '@atlaskit/editor-common/collab';
import { CollabEvents } from '@atlaskit/editor-common/collab';
import { CollabEventTelepointerData } from '@atlaskit/editor-common/collab';
import { CollabInitPayload } from '@atlaskit/editor-common/collab';
import { CollabLocalStepsPayload } from '@atlaskit/editor-common/collab';
import { CollabMetadataPayload } from '@atlaskit/editor-common/collab';
import { CollabParticipant } from '@atlaskit/editor-common/collab';
import { CollabPresencePayload } from '@atlaskit/editor-common/collab';
import { CollabSendableSelection } from '@atlaskit/editor-common/collab';
import { CollabTelepointerPayload } from '@atlaskit/editor-common/collab';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import type { JSONDocNode } from '@atlaskit/editor-json-transformer';
import type { Manager } from 'socket.io-client';
import type { Metadata as Metadata_2 } from '@atlaskit/editor-common/collab';
import { NewCollabSyncUpErrorAttributes } from '@atlaskit/editor-common/collab';
import { PROVIDER_ERROR_CODE } from '@atlaskit/editor-common/collab';
import { ProviderError } from '@atlaskit/editor-common/collab';
import { ProviderParticipant } from '@atlaskit/editor-common/collab';
import { ResolvedEditorState } from '@atlaskit/editor-common/collab';
import type { Step } from '@atlaskit/editor-prosemirror/transform';
import { SyncUpErrorFunction } from '@atlaskit/editor-common/collab';
import type { Transaction } from '@atlaskit/editor-prosemirror/state';

// @public (undocumented)
type AuthCallback = (cb: (data: InitAndAuthData) => void) => void;

// @public (undocumented)
type BaseEvents = Pick<CollabEditProvider<CollabEvents>, 'send' | 'sendMessage' | 'setup'>;

export { CollabConnectedPayload };

export { CollabDataPayload };

export { CollabDisconnectedPayload };

export { CollabEditProvider };

export { CollabEventConnectingData };

export { CollabEventConnectionData };

// @public (undocumented)
export interface CollabEventDisconnectedData {
	// (undocumented)
	reason:
		| 'CLIENT_DISCONNECT'
		| 'SERVER_DISCONNECT'
		| 'SOCKET_CLOSED'
		| 'SOCKET_ERROR'
		| 'SOCKET_TIMEOUT'
		| 'UNKNOWN_DISCONNECT';
	// (undocumented)
	sid: string;
}

export { CollabEventInitData };

export { CollabEventLocalStepData };

export { CollabEventPresenceData };

export { CollabEventRemoteData };

export { CollabEvents };

export { CollabEventTelepointerData };

export { CollabInitPayload };

export { CollabLocalStepsPayload };

export { CollabMetadataPayload };

export { CollabParticipant };

export { CollabPresencePayload };

export { CollabSendableSelection };

export { CollabTelepointerPayload };

// @public (undocumented)
interface Config {
	analyticsClient?: AnalyticsWebClient;
	// (undocumented)
	cacheToken?: boolean;
	// (undocumented)
	createSocket: (
		path: string,
		auth?: AuthCallback | InitAndAuthData,
		productInfo?: ProductInformation,
	) => Socket;
	// (undocumented)
	documentAri: string;
	enableErrorOnFailedDocumentApply?: boolean;
	failedStepLimitBeforeCatchupOnPublish?: number;
	// (undocumented)
	featureFlags?: {
		[key: string]: boolean;
	};
	// (undocumented)
	getAnalyticsWebClient?: Promise<AnalyticsWebClient>;
	// (undocumented)
	getUser?: GetUserType;
	// (undocumented)
	initialDraft?: InitialDraft;
	// (undocumented)
	isBufferingEnabled?: boolean;
	// (undocumented)
	lifecycle?: Lifecycle;
	// (undocumented)
	need404?: boolean;
	permissionTokenRefresh?: () => Promise<null | string>;
	// (undocumented)
	productInfo?: ProductInformation;
	rateLimitMaxStepSize?: number;
	// (undocumented)
	rateLimitStepCount?: number;
	// (undocumented)
	rateLimitTotalStepSize?: number;
	// (undocumented)
	rateLimitType?: number;
	// (undocumented)
	storage?: Storage_2;
	throwOnNotConnected?: boolean;
	// (undocumented)
	url: string;
}

// @public (undocumented)
class Emitter<T = any> {
	protected emit<K extends keyof T>(evt: K, data: T[K]): this;
	off<K extends keyof T>(evt: K, handler: (args: T[K]) => void): this;
	on<K extends keyof T>(evt: K, handler: (args: T[K]) => void): this;
	unsubscribeAll<K extends keyof T>(evt?: K): this;
}

// @public (undocumented)
type EventHandler = () => void;

// @public (undocumented)
type GetUserType =
	| ((userId: string) => Promise<Pick<ProviderParticipant, 'avatar' | 'email' | 'name' | 'userId'>>)
	| undefined;

// @public (undocumented)
interface InitAndAuthData {
	// (undocumented)
	initialized: boolean;
	// (undocumented)
	need404?: boolean;
	// (undocumented)
	token?: string;
}

// @public (undocumented)
interface InitialDraft {
	// (undocumented)
	document: JSONDocNode;
	// (undocumented)
	metadata?: Metadata_2;
	// (undocumented)
	timestamp?: number;
	// (undocumented)
	version: number;
}

// @public (undocumented)
interface Lifecycle {
	// (undocumented)
	on(event: LifecycleEvents, handler: EventHandler): void;
}

// @public (undocumented)
type LifecycleEvents = 'restore' | 'save';

export { NewCollabSyncUpErrorAttributes };

// @public (undocumented)
type ProductInformation = {
	product: string;
	subProduct?: string;
};

// @public (undocumented)
export class Provider extends Emitter<CollabEvents> implements BaseEvents {
	constructor(config: Config);
	destroy(): this;
	// @deprecated
	disconnect(): this;
	getCurrentState: () => Promise<ResolvedEditorState>;
	getFinalAcknowledgedState: () => Promise<ResolvedEditorState>;
	getMetadata: () => Metadata_2;
	// (undocumented)
	getParticipants: () => ProviderParticipant[];
	// (undocumented)
	getUnconfirmedSteps: () => readonly Step[] | undefined;
	// @deprecated
	initialize(getState: () => EditorState): this;
	send(_tr: Transaction | null, _oldState: EditorState | null, newState: EditorState): void;
	sendMessage(data: CollabTelepointerPayload): void;
	// @deprecated
	setEditorWidth(editorWidth: string, broadcast?: boolean): void;
	setMetadata(metadata: Metadata_2): void;
	// @deprecated
	setTitle(title: string, broadcast?: boolean): void;
	setup({
		getState,
		onSyncUpError,
	}: {
		getState: () => EditorState;
		onSyncUpError?: SyncUpErrorFunction;
	}): this;
	// @deprecated
	unsubscribeAll(): this;
}

export { PROVIDER_ERROR_CODE };

export { ProviderError };

export { ProviderParticipant };

export { ResolvedEditorState };

// @public (undocumented)
interface SimpleEventEmitter {
	// (undocumented)
	on(event: string, fn: Function): SimpleEventEmitter;
}

// @public (undocumented)
export interface Socket extends SimpleEventEmitter {
	// (undocumented)
	close(): Socket;
	// (undocumented)
	connect(): Socket;
	// (undocumented)
	emit(event: string, ...args: any[]): Socket;
	// (undocumented)
	id: string;
	// (undocumented)
	io?: Manager;
}

// @public (undocumented)
interface Storage_2 {
	// (undocumented)
	delete(key: string): Promise<void>;
	// (undocumented)
	get(key: string): Promise<string>;
	// (undocumented)
	set(key: string, value: string): Promise<void>;
}

export { SyncUpErrorFunction };

// (No @packageDocumentation comment for this package)
```

<!--SECTION END: Main Entry Types-->

### Peer Dependencies

<!--SECTION START: Peer Dependencies-->

```json
{}
```

<!--SECTION END: Peer Dependencies-->
