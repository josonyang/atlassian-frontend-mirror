import { type ChunkHashAlgorithm } from './ChunkHashAlgorithm';

export interface ClientAltBasedAuth {
	readonly id: string;
	readonly token: string;
	readonly baseUrl: string;
}

export interface ClientBasedAuth {
	readonly clientId: string;
	readonly token: string;
	readonly baseUrl: string;
}

export interface AsapBasedAuth {
	readonly asapIssuer: string;
	readonly token: string;
	readonly baseUrl: string;
}

export type Auth = ClientBasedAuth | AsapBasedAuth;

export function isClientBasedAuth(auth: Auth): auth is ClientBasedAuth {
	return !!(auth as ClientBasedAuth).clientId;
}

export function isAsapBasedAuth(auth: Auth): auth is AsapBasedAuth {
	return !!(auth as AsapBasedAuth).asapIssuer;
}

export const authToOwner = (auth: Auth): ClientAltBasedAuth | AsapBasedAuth => {
	if (isAsapBasedAuth(auth)) {
		return auth;
	}

	const clientAuth: ClientAltBasedAuth = {
		id: auth.clientId,
		baseUrl: auth.baseUrl,
		token: auth.token,
	};

	return clientAuth;
};
export interface MediaClientConfig {
	readonly authProvider: AuthProvider;
	readonly initialAuth?: Auth;
	readonly stargateBaseUrl?: string;
	readonly getAuthFromContext?: AuthFromContextProvider;
	/** @deprecated This option has no effect. SHA256 is used for all uploads. */
	readonly useSha256ForUploads?: boolean;
	readonly authProviderTimeoutMs?: number;
	readonly enforceDataSecurityPolicy?: boolean;
}

export interface AuthContext {
	readonly collectionName?: string;
}

export type AuthProvider = (context?: AuthContext) => Promise<Auth>;

export type AuthFromContextProvider = (contextId: string) => Promise<Auth>;

export type MediaApiConfig = {
	authProvider: AuthProvider;
	initialAuth?: Auth;
	chunkHashAlgorithm?: ChunkHashAlgorithm;
	authProviderTimeout?: number;
};
