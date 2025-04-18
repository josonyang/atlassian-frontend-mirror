import { RequestError, type RequestErrorMetadata } from '../utils/request';
import { PollingError } from '../utils/polling';
import { MediaStoreError } from '../client/media-store';

type MediaHeaders = {
	mediaRegion?: string;
	mediaEnv?: string;
};

const defaultMetadata: RequestErrorMetadata & MediaHeaders = {
	attempts: 5,
	clientExhaustedRetries: true,
	mediaRegion: 'test-media-region',
	mediaEnv: 'test-media-env',
	traceContext: { traceId: 'some-trace', spanId: 'some-span' },
};

export const createServerUnauthorizedError = (
	metadataAndHeaders = defaultMetadata,
	innerError?: Error,
) =>
	new RequestError(
		'serverUnauthorized',
		{
			...metadataAndHeaders,
			statusCode: 403,
		},
		innerError || new Error('inner error message'),
	);

export const createRateLimitedError = (metadataAndHeaders = defaultMetadata) =>
	new RequestError('serverRateLimited', {
		...metadataAndHeaders,
		statusCode: 429,
	});

export const createPollingMaxAttemptsError = (attempts = 1) =>
	new PollingError('pollingMaxAttemptsExceeded', { attempts });

export const createMediaStoreError = () => new MediaStoreError('missingInitialAuth');
