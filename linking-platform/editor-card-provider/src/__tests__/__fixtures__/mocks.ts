import { type JsonLd } from '@atlaskit/json-ld-types';
import { type SmartLinkResponse } from '@atlaskit/linking-types';

export interface ErrorResponseBody {
	type: ServerErrorType;
	message: string;
	status: number;
}
export type ServerErrorType =
	| 'ResolveBadRequestError'
	| 'ResolveAuthError'
	| 'ResolveUnsupportedError'
	| 'ResolveFailedError'
	| 'ResolveRateLimitError'
	| 'ResolveTimeoutError'
	| 'SearchBadRequestError'
	| 'SearchAuthError'
	| 'SearchUnsupportedError'
	| 'SearchFailedError'
	| 'SearchTimeoutError'
	| 'SearchRateLimitError'
	| 'InternalServerError';

export const mockContext = {
	'@vocab': 'https://www.w3.org/ns/activitystreams#',
	atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
	schema: 'http://schema.org/',
} as const;

const jsonLdResponse = {
	meta: {
		visibility: 'public',
		access: 'granted',
		auth: [],
		definitionId: 'd1',
		key: 'object-provider',
	},
	data: {
		'@context': {
			'@vocab': 'https://www.w3.org/ns/activitystreams#',
			atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
			schema: 'http://schema.org/',
		},
		'@type': 'Object',
		name: 'I love cheese',
		summary: 'Here is your serving of cheese: 🧀',
		'schema:potentialAction': {
			'@id': 'comment',
			'@type': 'CommentAction',
			identifier: 'object-provider',
			name: 'Comment',
		},
		preview: {
			href: 'https://www.ilovecheese.com',
		},
		url: 'https://some.url',
	},
};

const nounDataResponse = {
	nounData: {
		schemaVersion: '2.0',
		id: 'frl3oZ39Cd6jr7WvWZUQPw',
		updateSequenceNumber: 1736456473,
		displayName: 'Rovo admin – GA',
		url: 'https://www.figma.com/design/frl3oZ39Cd6jr7WvWZUQPw/Rovo-GA-in-Admin-Hub',
		lastUpdatedAt: '2025-01-08T22:26:52.501Z',
		thumbnail: {
			externalUrl:
				'https://s3-alpha.figma.com/thumbnails/67c42edb-8cf1-49b7-8866-452b8dc2bc19?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWCXHUIFXET%2F20250109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250109T000000Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=7e0174016982e5a3fa9c74725f28ca4ab19b7f39ae700553a0aaf0386c07494c',
		},
		'atlassian:design': {
			liveEmbedUrl:
				'https://www.figma.com/embed?embed_host=astra&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Ffrl3oZ39Cd6jr7WvWZUQPw%2FRovo-GA-in-Admin-Hub',
			status: 'UNKNOWN',
			type: 'FILE',
			inspectUrl: 'https://www.figma.com/design/frl3oZ39Cd6jr7WvWZUQPw/Rovo-GA-in-Admin-Hub?m=dev',
			iconUrl: 'https://static.figma.com/app/icon/1/favicon.ico',
		},
	},
};

export const mocks = {
	success: jsonLdResponse as JsonLd.Response,
	datasourceSuccess: {
		...jsonLdResponse,
		datasources: [
			{
				key: 'datasource-jira-issues',
				parameters: {
					jql: 'ORDER BY assignee DESC',
					cloudId: 'a957adff-45b0-4f4f-8669-b640ed9973b6',
				},
				id: 'd8b75300-dfda-4519-b6cd-e49abbd50401',
				ari: 'ari:cloud:linking-platform::datasource/d8b75300-dfda-4519-b6cd-e49abbd50401',
				description: 'For extracting a list of Jira issues using JQL',
				name: 'Jira issues',
			},
		],
	},
	nounDataSuccess: {
		...jsonLdResponse,
		...nounDataResponse,
	} as SmartLinkResponse,
	searchSuccess: {
		meta: {
			visibility: 'public',
			access: 'granted',
			auth: [],
			definitionId: 'd1',
			key: 'object-provider',
		},
		data: {
			'@context': {
				'@vocab': 'https://www.w3.org/ns/activitystreams#',
				atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
				schema: 'http://schema.org/',
			},
			'@type': 'Collection',
			items: [
				{
					'@context': {
						'@vocab': 'https://www.w3.org/ns/activitystreams#',
						atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
						schema: 'http://schema.org/',
					},
					'@type': 'Object',
					name: 'I love cheese',
					summary: 'Here is your serving of cheese: 🧀',
					'schema:potentialAction': {
						'@id': 'comment',
						'@type': 'CommentAction',
						identifier: 'object-provider',
						name: 'Comment',
					},
					preview: {
						href: 'https://www.ilovecheese.com',
					},
					url: 'https://some.url',
				},
			],
		},
	} as JsonLd.Response,
	notFound: {
		meta: {
			visibility: 'not_found',
			access: 'forbidden',
			auth: [],
			definitionId: 'd1',
			key: 'object-provider',
		},
		data: {
			'@context': {
				'@vocab': 'https://www.w3.org/ns/activitystreams#',
				atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
				schema: 'http://schema.org/',
			},
			'@type': 'Object',
			name: 'I love cheese',
			url: 'https://some.url',
		},
	} as JsonLd.Response,
	forbidden: {
		meta: {
			visibility: 'restricted',
			access: 'forbidden',
			auth: [
				{
					key: 'some-flow',
					displayName: 'Flow',
					url: 'https://outbound-auth/flow',
				},
			],
			definitionId: 'd1',
			key: 'object-provider',
		},
		data: {
			'@context': {
				'@vocab': 'https://www.w3.org/ns/activitystreams#',
				atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
				schema: 'http://schema.org/',
			},
			'@type': 'Object',
			name: 'I love cheese',
			url: 'https://some.url',
		},
	} as JsonLd.Response,
	unauthorized: {
		meta: {
			visibility: 'restricted',
			access: 'unauthorized',
			auth: [
				{
					key: 'some-flow',
					displayName: 'Flow',
					url: 'https://outbound-auth/flow',
				},
			],
			definitionId: 'd1',
			key: 'object-provider',
		},
		data: {
			'@context': {
				'@vocab': 'https://www.w3.org/ns/activitystreams#',
				atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
				schema: 'http://schema.org/',
			},
			'@type': 'Object',
			name: 'I love cheese',
			url: 'https://some.url',
		},
	} as JsonLd.Response,
	notSupported: {
		message: 'URL not supported',
		status: 404,
		type: 'ResolveUnsupportedError',
	} as ErrorResponseBody,
	invokeSearchUnsupportedError: {
		error: {
			type: 'SearchUnsupportedError',
			message: 'Search not supported',
			status: 404,
		},
		status: 404,
	},
	invokeSearchTimeoutError: {
		error: {
			type: 'SearchTimeoutError',
			message: 'Server took too long to respond',
			status: 504,
		},
		status: 200,
	},
	invokeSearchFailedError: {
		error: {
			type: 'SearchFailedError',
			message: 'Search failed',
			status: 404,
		},
		status: 200,
	},
	invokeSearchAuthError: {
		error: {
			type: 'SearchAuthError',
			message: 'Authorization failed',
			status: 403,
		},
		status: 403,
	},
	invokeSearchRateLimitError: {
		error: {
			type: 'SearchRateLimitError',
			message: 'Too many requests',
			status: 429,
		},
		status: 200,
	},
	invokeInternalServerError: {
		error: {
			type: 'InternalServerError',
			message: 'Something went wrong',
			status: 504,
		},
		status: 500,
	},
};
