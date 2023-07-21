// Internal error codes (generated by collab provider)
import {
  CantSyncUpErrorAttributes,
  DocumentUpdateErrorAttributes,
} from '../helpers/const';

export enum INTERNAL_ERROR_CODE {
  TOKEN_PERMISSION_ERROR = 'TOKEN_PERMISSION_ERROR',
  RECONNECTION_NETWORK_ISSUE = 'RECONNECTION_NETWORK_ISSUE',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  RECONNECTION_ERROR = 'RECONNECTION_ERROR',
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
  CATCHUP_FAILED = 'CATCHUP_FAILED',
  DOCUMENT_RESTORE_ERROR = 'DOCUMENT_RESTORE_ERROR',
  ADD_STEPS_ERROR = 'ADD_STEPS_ERROR',
  DOCUMENT_UPDATE_ERROR = 'DOCUMENT_UPDATE_ERROR',
}

// NCS error coded (generated by NCS)
export enum NCS_ERROR_CODE {
  HEAD_VERSION_UPDATE_FAILED = 'HEAD_VERSION_UPDATE_FAILED',
  VERSION_NUMBER_ALREADY_EXISTS = 'VERSION_NUMBER_ALREADY_EXISTS',
  INSUFFICIENT_EDITING_PERMISSION = 'INSUFFICIENT_EDITING_PERMISSION',
  FORBIDDEN_USER_TOKEN = 'FORBIDDEN_USER_TOKEN',
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
  INIT_DATA_LOAD_FAILED = 'INIT_DATA_LOAD_FAILED',
  ERROR_MAPPING_ERROR = 'ERROR_MAPPING_ERROR',
  NAMESPACE_INVALID = 'NAMESPACE_INVALID',
  NAMESPACE_NOT_FOUND = 'NAMESPACE_NOT_FOUND',
  TENANT_INSTANCE_MAINTENANCE = 'TENANT_INSTANCE_MAINTENANCE',
  LOCKED_DOCUMENT = 'LOCKED_DOCUMENT',
  EMPTY_BROADCAST = 'EMPTY_BROADCAST',
  DYNAMO_ERROR = 'DYNAMO_ERROR',
  INVALID_ACTIVATION_ID = 'INVALID_ACTIVATION_ID',
  INVALID_DOCUMENT_ARI = 'INVALID_DOCUMENT_ARI',
  INVALID_CLOUD_ID = 'INVALID_CLOUD_ID',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
}

// TODO: Import emitted error codes from NCS

// NCS Errors
// - Step rejection errors
type HeadVersionUpdateFailedError = {
  message: string; // Version number does not match current head version.
  data: {
    code: NCS_ERROR_CODE.HEAD_VERSION_UPDATE_FAILED;
    meta: {
      currentVersion: any; // But likely a number
      incomingVersion: number;
    };
    status: number; // 409
  };
};
type VersionAlreadyPresentInDynamoError = {
  message: string; // Version already exists
  data: {
    code: NCS_ERROR_CODE.VERSION_NUMBER_ALREADY_EXISTS;
    meta: string; // Incoming version number already exists. Therefore, new ProseMirror steps will be rejected.
    status: number; // 409
  };
};
// - Permission errors
type InsufficientEditingPermissionError = {
  message: string; // No permission
  data: {
    code: NCS_ERROR_CODE.INSUFFICIENT_EDITING_PERMISSION;
    meta: {
      description: string; // The user does not have permission for collaborative editing of this resource or the resource was deleted
      reason?: string; // Usually empty
    };
    status: number; // 401
  };
};
type ForbiddenUserTokenError = {
  message: string; // Various issues with the user context token
  data: {
    code: NCS_ERROR_CODE.FORBIDDEN_USER_TOKEN;
    meta: string; // Forbidden to access pass due to invalid user token
    status: number; // 403
  };
};
// - Page missing / TTL errors
type NCSDocumentNotFoundError = {
  message: string; // The requested document is not found
  data: {
    code: NCS_ERROR_CODE.DOCUMENT_NOT_FOUND;
    status: number; // 404
  };
};
// - Server errors
type FailedToLoadInitDataError = {
  message: string; // Failed to load initialisation data after connection established
  data: {
    code: NCS_ERROR_CODE.INIT_DATA_LOAD_FAILED;
    status: number; // 500
  };
};
type ErrorMappingError = {
  message: string; // 'Internal Server Error'
  data: {
    code: NCS_ERROR_CODE.ERROR_MAPPING_ERROR;
    status: number; // 500
  };
};
// - Less common back-end errors
type InvalidNamespaceDefinedError = {
  message: string;
  data: {
    code: NCS_ERROR_CODE.NAMESPACE_INVALID;
    meta: string;
    status: number; // 400
  };
};
type SocketNamespaceNotFoundError = {
  message: string;
  data: {
    code: NCS_ERROR_CODE.NAMESPACE_NOT_FOUND;
    meta: string;
    status: number; // 500
  };
};
type TenantInstanceMaintenanceError = {
  message: string;
  data: {
    code: NCS_ERROR_CODE.TENANT_INSTANCE_MAINTENANCE;
    meta: {
      description: string;
      reason: string;
    };
    status: number; // 423
  };
};
type NamespaceLockedError = {
  message: string;
  data: {
    code: NCS_ERROR_CODE.LOCKED_DOCUMENT;
    meta: string;
    status: number; // 400
  };
};
type EmptyBroadcastError = {
  message: string;
  data: {
    code: NCS_ERROR_CODE.EMPTY_BROADCAST;
    meta: string;
    status: number; // 400
  };
};
type DynamoError = {
  message: string; // Error while updating metadata
  data: {
    code: NCS_ERROR_CODE.DYNAMO_ERROR;
    meta: string; // No value returned from metadata while updating
    status: number; // 500
  };
};
type InvalidActivationIdError = {
  message: string;
  data: {
    code: NCS_ERROR_CODE.INVALID_ACTIVATION_ID;
    meta: string;
    status: number; // 400
  };
};
type InvalidDocumentAriError = {
  message: string;
  data: {
    code: NCS_ERROR_CODE.INVALID_DOCUMENT_ARI;
    meta: string;
    status: number; // 400
  };
};
type InvalidCloudIdError = {
  message: string;
  data: {
    code: NCS_ERROR_CODE.INVALID_CLOUD_ID;
    meta: string;
    status: number; // 401
  };
};
type NCSErrors =
  | HeadVersionUpdateFailedError
  | VersionAlreadyPresentInDynamoError
  | InsufficientEditingPermissionError
  | ForbiddenUserTokenError
  | NCSDocumentNotFoundError
  | FailedToLoadInitDataError
  | ErrorMappingError
  | InvalidNamespaceDefinedError
  | SocketNamespaceNotFoundError
  | TenantInstanceMaintenanceError
  | NamespaceLockedError
  | EmptyBroadcastError
  | DynamoError
  | InvalidActivationIdError
  | InvalidDocumentAriError
  | InvalidCloudIdError
  | InternalDocumentUpdateFailure;

// Provider Errors
type DocumentRecoveryError = {
  message: string;
  data: {
    code: INTERNAL_ERROR_CODE.DOCUMENT_RESTORE_ERROR;
    status: number; // 500
  };
};
type AddStepsError = {
  message: string;
  data: {
    code: INTERNAL_ERROR_CODE.ADD_STEPS_ERROR;
    status: number; // 500
  };
};

// Channel Errors
export type CatchUpFailedError = {
  message: string;
  data: {
    code: INTERNAL_ERROR_CODE.CATCHUP_FAILED;
    status: number; // ?
  };
};
export type TokenPermissionError = {
  message: string; // 'Insufficient editing permissions'
  data: {
    code: INTERNAL_ERROR_CODE.TOKEN_PERMISSION_ERROR;
    status: number; // 403
    meta: {
      originalError?: unknown;
      reason?: string; // RESOURCE_DELETED
    };
  };
};
export type ReconnectionError = {
  message: string; // 'Caught error during reconnection'
  data: {
    code: INTERNAL_ERROR_CODE.RECONNECTION_ERROR;
    status: number; // 500
  };
};
export type ConnectionError = {
  message: string;
  data: {
    code: INTERNAL_ERROR_CODE.CONNECTION_ERROR;
    // some error data stuff
  };
};
export type ReconnectionNetworkError = {
  message: string; // Reconnection failed 8 times when browser was offline, likely there was a network issue
  data: {
    code: INTERNAL_ERROR_CODE.RECONNECTION_NETWORK_ISSUE;
  };
};
export type DocumentNotFoundError = {
  message: string; // The requested document is not found
  data: {
    code: INTERNAL_ERROR_CODE.DOCUMENT_NOT_FOUND;
    status: number; // 404
  };
};

/**
 * When we try to apply state updates to the editor, if that fails to apply the user can enter an invalid state where no
 * changes can be saved to NCS.
 */
export type InternalDocumentUpdateFailure = {
  message: 'The provider failed to apply changes to the editor';
  data: {
    code: INTERNAL_ERROR_CODE.DOCUMENT_UPDATE_ERROR;
    meta: {
      newVersion?: number;
      editorVersion?: number;
    };
    status: 500;
  };
};

/**
 * The client is trying to send too many messages or messages that are too large. This not expected to be a standard
 * operating condition and should only ever indicate a frontend bug.
 */
export type RateLimitError = {
  message: string;
  data: {
    code: NCS_ERROR_CODE.RATE_LIMIT_ERROR;
    meta: {
      rateLimitType: number;
      maxStepSize: number;
      stepSizeCounter: number;
      stepCounter: number;
    };
    status: 500;
  };
};

/**
 * A union of all possible internal errors, that are mapped to another error if being emitted to the editor.
 */
export type InternalError =
  | NCSErrors
  | DocumentRecoveryError
  | AddStepsError
  | CatchUpFailedError
  | TokenPermissionError
  | ReconnectionError
  | ConnectionError
  | ReconnectionNetworkError
  | DocumentNotFoundError
  | InternalDocumentUpdateFailure
  | RateLimitError;

/*
 * This is what a generic ProviderError type would look like:
 * type ProviderError = {
 *   // Unique code, identifies the specific emitted error
 *   // Also exposed as a PROVIDER_ERROR_CODE enum to allow subscribers to use them
 *   code: PROVIDER_ERROR_CODE;
 *   // Informative message describing what went wrong
 *   message: string;
 *   // Flag indicating whether an error is recoverable or not
 *   // used by consumers to disable the provider and show an error message
 *   recoverable: boolean;
 *   // A reason code used to give more detail about why a certain error was thrown
 *   reason?: string;
 * }
 */

type ValidEventAttributeType = boolean | string | number;
// Custom Errors
export class CustomError extends Error {
  extraEventAttributes?: { [key: string]: ValidEventAttributeType };
  constructor(
    message: string,
    error?: unknown,
    extraEventAttributes?: { [key: string]: ValidEventAttributeType },
  ) {
    super(message);

    if (typeof (error as Error)?.message === 'string') {
      this.message = (error as Error).message;
    }
    if (extraEventAttributes) {
      this.extraEventAttributes = extraEventAttributes;
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
    };
  }

  getExtraErrorEventAttributes = () => this.extraEventAttributes;
}

export class NotConnectedError extends CustomError {
  name = 'NotConnectedError';
}

export class NotInitializedError extends CustomError {
  name = 'NotInitializedError';
}

export class ProviderInitialisationError extends CustomError {
  name = 'ProviderInitialisationError';
}

export class SendTransactionError extends CustomError {
  name = 'SendTransactionError';
}

export class DestroyError extends CustomError {
  name = 'DestroyError';
}

export class SetTitleError extends CustomError {
  name = 'SetTitleError';
}

export class SetEditorWidthError extends CustomError {
  name = 'SetEditorWidthError';
}

export class SetMetadataError extends CustomError {
  name = 'SetMetadataError';
}

export class GetCurrentStateError extends CustomError {
  name = 'GetCurrentStateError';
}

export class GetFinalAcknowledgedStateError extends CustomError {
  name = 'GetFinalAcknowledgedStateError';
}

export class UpdateDocumentError extends CustomError {
  name = 'UpdateDocumentError';
  constructor(message: string, extraAttributes: DocumentUpdateErrorAttributes) {
    super(message, undefined, extraAttributes);
  }
}

export class CantSyncUpError extends CustomError {
  name = 'CantSyncUpError';
  constructor(message: string, extraAttributes: CantSyncUpErrorAttributes) {
    super(message, undefined, extraAttributes);
  }
}
