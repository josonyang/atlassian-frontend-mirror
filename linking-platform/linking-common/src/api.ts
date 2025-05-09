import { type JsonLd } from '@atlaskit/json-ld-types';

const ALLOWED_RESPONSE_STATUS_CODES = [200, 401, 404];

export class NetworkError extends Error {
	constructor(error: any) {
		super(error);
	}
}

export async function request<T = JsonLd.Response>(
	method: string,
	url: string,
	data?: any,
	headers?: HeadersInit,
	statuses: number[] = ALLOWED_RESPONSE_STATUS_CODES,
): Promise<T> {
	const requestConfig: RequestInit = {
		method,
		credentials: 'include' as RequestCredentials,
		headers: {
			Accept: 'application/json',
			'Cache-Control': 'no-cache',
			'Content-Type': 'application/json',
			...headers,
		},
		...(data ? { body: JSON.stringify(data) } : {}),
	};
	try {
		const response = await fetch(url, requestConfig);
		if (response.ok || statuses?.includes(response.status)) {
			if (statuses.includes(204)) {
				const text = await response.text();
				return text ? JSON.parse(text) : undefined;
			} else {
				return await response.json();
			}
		}

		throw response;
	} catch (error) {
		if (typeof error === 'string' || error instanceof TypeError) {
			throw new NetworkError(error);
		}
		throw error;
	}
}
