<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/linking-common"

> Do not edit this file. This report is auto-generated using
> [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [API Report File for "@atlaskit/linking-common"](#api-report-file-for-atlaskitlinking-common)
  - [Table of contents](#table-of-contents)
  - [Main Entry Types](#main-entry-types)
  - [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
/// <reference types="react" />

import { AnyAction } from 'redux';
import { JsonLd } from '@atlaskit/json-ld-types';
import { default as React_2 } from 'react';
import { Store } from 'redux';

// @public (undocumented)
export const ACTION_ERROR = 'errored';

// @public (undocumented)
export const ACTION_ERROR_FALLBACK = 'fallback';

// @public (undocumented)
export const ACTION_PENDING = 'pending';

// @public (undocumented)
export const ACTION_PRELOAD = 'preload';

// @public (undocumented)
export const ACTION_RELOADING = 'reloading';

// @public (undocumented)
export const ACTION_RESOLVED = 'resolved';

// @public (undocumented)
export const ACTION_RESOLVING = 'resolving';

// @public (undocumented)
export const ACTION_UPDATE_METADATA_STATUS = 'metadata';

// @public (undocumented)
export class APIError extends Error {
	constructor(kind: APIErrorKind, hostname: string, message: string, type?: ErrorType | undefined);
	// (undocumented)
	readonly hostname: string;
	// (undocumented)
	readonly kind: APIErrorKind;
	// (undocumented)
	readonly message: string;
	// (undocumented)
	readonly type?: ErrorType | undefined;
}

// @public (undocumented)
export type APIErrorKind = 'auth' | 'error' | 'fallback' | 'fatal';

// @public (undocumented)
interface AvailableSite {
	// (undocumented)
	avatarUrl: string;
	// (undocumented)
	cloudId: string;
	// (undocumented)
	displayName: string;
	// (undocumented)
	isVertigo: boolean;
	// (undocumented)
	products: AvailableSitesProductType[];
	// (undocumented)
	url: string;
}

// @public (undocumented)
enum AvailableSitesProductType {
	// (undocumented)
	ATLAS = 'townsquare',
	// (undocumented)
	BEACON = 'beacon',
	// (undocumented)
	COMPASS = 'compass',
	// (undocumented)
	CONFLUENCE = 'confluence.ondemand',
	// (undocumented)
	JIRA_BUSINESS = 'jira-core.ondemand',
	// (undocumented)
	JIRA_INCIDENT_MANAGER = 'jira-incident-manager.ondemand',
	// (undocumented)
	JIRA_PRODUCT_DISCOVERY = 'jira-product-discovery',
	// (undocumented)
	JIRA_SERVICE_DESK = 'jira-servicedesk.ondemand',
	// (undocumented)
	JIRA_SOFTWARE = 'jira-software.ondemand',
	// (undocumented)
	MERCURY = 'mercury',
	// (undocumented)
	OPSGENIE = 'opsgenie',
	// (undocumented)
	STATUS_PAGE = 'statuspage',
	// (undocumented)
	WHITEBOARD = 'atlassian-whiteboard',
}

// @public (undocumented)
export const BaseUrls: {
	dev: string;
	development: string;
	stg: string;
	staging: string;
	prd: string;
	prod: string;
	production: string;
};

// @public (undocumented)
export interface BlockCardAdf {
	// (undocumented)
	attrs: {
		url: string;
	};
	// (undocumented)
	type: 'blockCard';
}

// @public (undocumented)
export interface CardAction<T = JsonLd.Response> extends AnyAction {
	// (undocumented)
	metadataStatus?: MetadataStatus;
	// (undocumented)
	payload?: T;
	// (undocumented)
	type: CardActionType;
	// (undocumented)
	url: string;
}

// @public (undocumented)
export const cardAction: CardBaseActionCreator;

// @public (undocumented)
export type CardActionParams = {
	url: string;
};

// @public (undocumented)
export type CardActionType =
	| 'errored'
	| 'fallback'
	| 'metadata'
	| 'pending'
	| 'reloading'
	| 'resolved'
	| 'resolving';

// @public (undocumented)
export type CardAdf = BlockCardAdf | EmbedCardAdf | InlineCardAdf;

// @public (undocumented)
export type CardAppearance = 'block' | 'embed' | 'inline';

// @public (undocumented)
export type CardBaseActionCreator<T = JsonLd.Response> = (
	type: CardActionType,
	params: CardActionParams,
	payload?: T,
	error?: APIError,
	metadataStatus?: MetadataStatus,
	ignoreStatusCheck?: boolean,
) => CardAction<T>;

// @public (undocumented)
export interface CardState {
	// (undocumented)
	details?: JsonLd.Response;
	// (undocumented)
	error?: APIError;
	// @deprecated (undocumented)
	lastUpdatedAt?: number;
	// (undocumented)
	metadataStatus?: MetadataStatus;
	// (undocumented)
	status: CardType;
}

// @public (undocumented)
export interface CardStore {
	// (undocumented)
	[key: string]: CardState;
}

// @public (undocumented)
export type CardType =
	| 'errored'
	| 'fallback'
	| 'forbidden'
	| 'not_found'
	| 'pending'
	| 'resolved'
	| 'resolving'
	| 'unauthorized';

// @public (undocumented)
export interface Datasource {
	// (undocumented)
	id: string;
	// (undocumented)
	parameters: object;
	// (undocumented)
	views: DatasourceAdfView[];
}

// @public (undocumented)
export interface DatasourceAdf {
	// (undocumented)
	attrs: {
		url?: string;
		datasource: Datasource;
	};
	// (undocumented)
	type: 'blockCard';
}

// @public (undocumented)
export interface DatasourceAdfTableView {
	// (undocumented)
	properties?: {
		columns: {
			key: string;
			width?: number;
		}[];
	};
	// (undocumented)
	type: 'table';
}

// @public (undocumented)
export type DatasourceAdfView = DatasourceAdfTableView;

// @public (undocumented)
export interface EmbedCardAdf {
	// (undocumented)
	attrs: {
		url: string;
		layout: 'wide';
	};
	// (undocumented)
	type: 'embedCard';
}

// @public (undocumented)
export type EnvironmentsKeys = keyof typeof BaseUrls;

// @public (undocumented)
export type ErrorType = 'UnexpectedError' | ServerErrorType;

// @public
export const filterSiteProducts: (
	availableSitesProducts: AvailableSitesProductType[],
) => (site: AvailableSite) => boolean;

// @public (undocumented)
export const getBaseUrl: (envKey?: keyof typeof BaseUrls) => string;

// @public (undocumented)
export const getResolverUrl: (envKey?: EnvironmentsKeys, baseUrlOverride?: string) => string;

// @public (undocumented)
export const getStatus: ({ meta }: { meta: JsonLd.Response['meta'] }) => CardType;

// @public (undocumented)
export const getUrl: (store: Store<CardStore>, url: string) => CardState;

// @public (undocumented)
export interface InlineCardAdf {
	// (undocumented)
	attrs: {
		url: string;
	};
	// (undocumented)
	type: 'inlineCard';
}

// @public (undocumented)
export type InvocationContext = {
	id: string;
};

// @public (undocumented)
export type InvocationSearchPayload = {
	query: string;
	context?: InvocationContext;
};

// @public (undocumented)
export interface InvokePayload<T> {
	// (undocumented)
	action: T;
	// (undocumented)
	context?: string;
	// (undocumented)
	key: string;
}

// @public (undocumented)
export interface LinkingPlatformFeatureFlags {
	// @deprecated
	enableActionableElement?: boolean;
	// @deprecated
	enableFlexibleBlockCard?: boolean;
	enableHoverCardResolutionTracking?: boolean;
	// @deprecated
	enableImprovedPreviewAction?: boolean;
	// @deprecated
	enableLinkPickerForgeTabs?: boolean;
	// @deprecated
	enableResolveMetadataForLinkAnalytics?: boolean;
	// @deprecated
	showAuthTooltip?: string;
	// @deprecated (undocumented)
	showHoverPreview?: boolean;
	// @deprecated
	useLinkPickerAtlassianTabs?: boolean;
	// @deprecated (undocumented)
	useLinkPickerScrollingTabs?: boolean;
	// @deprecated
	useLozengeAction?: string;
}

// @public (undocumented)
export type MetadataStatus = 'errored' | 'pending' | 'resolved';

// @public (undocumented)
export class NetworkError extends Error {
	constructor(error: any);
}

// @public
export function promiseDebounce<Args extends unknown[], ResolveType extends unknown>(
	cb: (...args: Args) => Promise<ResolveType>,
	time: number,
): (...args: Args) => Promise<ResolveType>;

// @public (undocumented)
export const Pulse: ({
	children,
	isDiscovered,
	onAnimationIteration,
	onAnimationStart,
}: PulseProps) => jsx.JSX.Element;

// @public (undocumented)
interface PulseProps {
	// (undocumented)
	children: JSX.Element;
	// (undocumented)
	isDiscovered?: boolean;
	// (undocumented)
	onAnimationIteration?: React.AnimationEventHandler<HTMLSpanElement>;
	// (undocumented)
	onAnimationStart?: React.AnimationEventHandler<HTMLSpanElement>;
}

// @public (undocumented)
export function request<T = JsonLd.Response>(
	method: string,
	url: string,
	data?: any,
	headers?: HeadersInit,
	statuses?: number[],
): Promise<T>;

// @public (undocumented)
export interface ServerActionOpts {
	// (undocumented)
	payload: ServerActionPayload;
	// (undocumented)
	type: string;
}

// @public (undocumented)
export interface ServerActionPayload {
	// (undocumented)
	context?: JsonLd.Primitives.Link | JsonLd.Primitives.Object;
	// (undocumented)
	id: string;
}

// @public (undocumented)
export type ServerErrorType =
	| 'InternalServerError'
	| 'ResolveAuthError'
	| 'ResolveBadRequestError'
	| 'ResolveFailedError'
	| 'ResolveRateLimitError'
	| 'ResolveTimeoutError'
	| 'ResolveUnsupportedError'
	| 'SearchAuthError'
	| 'SearchBadRequestError'
	| 'SearchFailedError'
	| 'SearchRateLimitError'
	| 'SearchTimeoutError'
	| 'SearchUnsupportedError';

// @public (undocumented)
export const Skeleton: ({
	width,
	appearance,
	height,
	borderRadius,
	isShimmering,
	testId,
	style,
}: SkeletonProps) => JSX.Element;

// @public (undocumented)
interface SkeletonProps {
	// (undocumented)
	appearance?: 'blue' | 'darkGray' | 'gray';
	// (undocumented)
	borderRadius?: number | string;
	// (undocumented)
	height?: number | string;
	// (undocumented)
	isShimmering?: boolean;
	// (undocumented)
	style?: React_2.CSSProperties;
	// (undocumented)
	testId?: string;
	// (undocumented)
	width?: number | string;
}

// (No @packageDocumentation comment for this package)
```

<!--SECTION END: Main Entry Types-->

### Peer Dependencies

<!--SECTION START: Peer Dependencies-->

```json
{
	"react": "^16.8.0"
}
```

<!--SECTION END: Peer Dependencies-->
