import { AGGError, AGGErrors, DirectoryGraphQLError, DirectoryGraphQLErrors } from '../util/errors';

import { type DEPRECATED_ErrorAttributes, type ErrorAttributes } from './types';

const IGNORED_ERROR_REASONS_DIRECTORY = [
	// Error categories from pf-directory
	'NotPermitted',
	'Gone',
	'IdentityUserNotFoundError',
];

const IGNORE_ERROR_TYPES_AGG = [
	'IdentityUserNotFoundError',
	'TEAMS_FORBIDDEN',
	'TEAMS_TEAM_DELETED',
];
const IGNORE_ERROR_CLASSIFICATIONS_AGG = ['Gone'];

function isIgnoredError(error?: DirectoryGraphQLError | AGGError): boolean {
	if (!error) {
		return false;
	}
	if (error instanceof DirectoryGraphQLError) {
		return !!error && IGNORED_ERROR_REASONS_DIRECTORY.includes(error.type);
	} else if (error instanceof AGGError) {
		return (
			(!!error.errorType && IGNORE_ERROR_TYPES_AGG.includes(error.errorType)) ||
			(!!error.classification && IGNORE_ERROR_CLASSIFICATIONS_AGG.includes(error.classification))
		);
	}

	return false;
}

export const DEPRECATED_getErrorAttributes = (
	error?: DirectoryGraphQLErrors | Error | unknown | DirectoryGraphQLError | AGGError | AGGErrors,
): DEPRECATED_ErrorAttributes => {
	if (error instanceof DirectoryGraphQLErrors) {
		return {
			errorMessage: error.message,
			errorCount: error.errors.length,
			errorDetails: error.errors.map(DEPRECATED_getErrorAttributes),
			isSLOFailure: !error.errors.every(isIgnoredError),
			traceId: error.traceId,
		};
	} else if (error instanceof DirectoryGraphQLError) {
		return {
			errorMessage: error.message,
			errorCategory: error.category,
			errorType: error.type,
			errorPath: error.path,
			errorNumber: error.errorNumber,
			isSLOFailure: !isIgnoredError(error),
		};
	} else if (error instanceof AGGErrors) {
		return {
			errorMessage: error.message,
			errorCount: error.errors.length,
			errorDetails: error.errors.map(DEPRECATED_getErrorAttributes),
			isSLOFailure: !error.errors.every(isIgnoredError),
			traceId: error.traceId,
		};
	} else if (error instanceof AGGError) {
		return {
			errorMessage: error.message,
			errorType: error.errorType,
			errorStatusCode: error.statusCode,
			isSLOFailure: !isIgnoredError(error),
			errorCategory: error.classification,
		};
	} else if (error instanceof Error) {
		// Jira custom profile card client error, they wrap the error & put the underlying error in the cause property
		if (error.message.startsWith('Unable to fetch user:')) {
			if (error.hasOwnProperty('cause')) {
				const causeError = (error as any).cause;
				if (causeError instanceof DirectoryGraphQLErrors || causeError instanceof AGGErrors) {
					return DEPRECATED_getErrorAttributes(causeError);
				}
			}
			return {
				errorMessage: error.message,
				isSLOFailure: false,
			};
		}
		return {
			errorMessage: error.message,
			isSLOFailure: true,
		};
	}

	// Unknown
	return {
		errorMessage: 'Unknown error',
		isSLOFailure: true,
	};
};

export const getErrorAttributes = (
	error?: DirectoryGraphQLErrors | Error | unknown | DirectoryGraphQLError | AGGError | AGGErrors,
): ErrorAttributes => {
	const defaultErrorAttributes: Omit<ErrorAttributes, 'errorMessage' | 'isSLOFailure'> = {
		errorCount: null,
		errorDetails: null,
		errorCategory: null,
		errorType: null,
		errorPath: null,
		errorNumber: null,
		errorStatusCode: null,
		traceId: null,
	};

	if (error instanceof DirectoryGraphQLErrors) {
		return {
			...defaultErrorAttributes,
			errorMessage: error.message,
			errorCount: error.errors.length,
			errorDetails: error.errors.map(getErrorAttributes),
			isSLOFailure: !error.errors.every(isIgnoredError),
			traceId: error.traceId ?? null,
		};
	} else if (error instanceof DirectoryGraphQLError) {
		return {
			...defaultErrorAttributes,
			errorMessage: error.message,
			errorCategory: error.category,
			errorType: error.type,
			errorPath: error.path,
			errorNumber: error.errorNumber ?? null,
			isSLOFailure: !isIgnoredError(error),
		};
	} else if (error instanceof AGGErrors) {
		return {
			...defaultErrorAttributes,
			errorMessage: error.message,
			errorCount: error.errors.length,
			errorDetails: error.errors.map(getErrorAttributes),
			isSLOFailure: !error.errors.every(isIgnoredError),
			traceId: error.traceId ?? null,
		};
	} else if (error instanceof AGGError) {
		return {
			...defaultErrorAttributes,
			errorMessage: error.message,
			errorType: error.errorType ?? null,
			errorStatusCode: error.statusCode ?? null,
			isSLOFailure: !isIgnoredError(error),
			errorCategory: error.classification ?? null,
		};
	} else if (error instanceof Error) {
		// Jira custom profile card client error, they wrap the error & put the underlying error in the cause property
		if (error.message.startsWith('Unable to fetch user:')) {
			if (error.hasOwnProperty('cause')) {
				const causeError = (error as any).cause;
				if (causeError instanceof DirectoryGraphQLErrors || causeError instanceof AGGErrors) {
					return getErrorAttributes(causeError);
				}
			}
			return {
				...defaultErrorAttributes,
				errorMessage: error.message,
				isSLOFailure: false,
			};
		}
		return {
			...defaultErrorAttributes,
			errorMessage: error.message,
			isSLOFailure: true,
		};
	}

	// Unknown
	return {
		...defaultErrorAttributes,
		errorMessage: 'Unknown error',
		isSLOFailure: true,
	};
};

export const handleDirectoryGraphQLErrors = (errors: unknown, traceId: string | null): void => {
	throw new DirectoryGraphQLErrors(errors, traceId);
};

export const handleAGGErrors = (errors: unknown, traceId: string | null): void => {
	throw new AGGErrors(errors, traceId);
};
