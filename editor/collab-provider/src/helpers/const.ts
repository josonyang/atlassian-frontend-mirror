import type { ProviderError } from '../errors/error-types';

export enum EVENT_ACTION {
  CONNECTION = 'connection', // https://data-portal.internal.atlassian.com/analytics/registry/43970
  CATCHUP = 'catchup', // https://data-portal.internal.atlassian.com/analytics/registry/44016
  DOCUMENT_INIT = 'documentInit', // https://data-portal.internal.atlassian.com/analytics/registry/43971
  ADD_STEPS = 'addSteps', // https://data-portal.internal.atlassian.com/analytics/registry/43972
  UPDATE_PARTICIPANTS = 'updateParticipants', // https://data-portal.internal.atlassian.com/analytics/registry/45634
  COMMIT_UNCONFIRMED_STEPS = 'commitUnconfirmedSteps', // https://data-portal.internal.atlassian.com/analytics/registry/46501
  REINITIALISE_DOCUMENT = 'reinitialiseDocument', // https://data-portal.internal.atlassian.com/analytics/registry/50231
  ERROR = 'error', // https://data-portal.internal.atlassian.com/analytics/registry/51790
  PUBLISH_PAGE = 'publishPage', // https://data-portal.internal.atlassian.com/analytics/registry/50235
  GET_CURRENT_STATE = 'getCurrentState', // https://data-portal.internal.atlassian.com/analytics/registry/50783
  INVALIDATE_TOKEN = 'invalidateToken', // https://data-portal.internal.atlassian.com/analytics/registry/50444
  SEND_STEPS_RETRY = 'sendStepsRetry', // https://data-portal.internal.atlassian.com/analytics/registry/53598
  CATCHUP_AFTER_MAX_SEND_STEPS_RETRY = 'catchupAfterMaxSendStepsRetry', // https://data-portal.internal.atlassian.com/analytics/registry/53723
  DROPPED_STEPS = 'droppedStepInCatchup', // https://data-portal.internal.atlassian.com/analytics/registry/53724
}
export enum EVENT_STATUS {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  INFO = 'INFO',
  SUCCESS_10x_SAMPLED = 'SUCCESS_10x_SAMPLED',
}
export enum ADD_STEPS_TYPE {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  ERROR = 'ERROR',
}

export type DocumentUpdateErrorAttributes = {
  isDocTruthy?: boolean;
  editorVersion?: number;
  newVersion?: number;
  docHasContent?: boolean;
  isDocContentValid?: boolean;
};

export type CantSyncUpErrorAttributes = {
  unconfirmedStepsInfo: string;
};

export type ErrorAnalyticsEvent = {
  eventAction: EVENT_ACTION.ERROR;
  attributes: {
    errorMessage: string;
    errorName?: string;
    documentAri?: string;
    mappedError?: ProviderError;
  } & DocumentUpdateErrorAttributes;
  nonPrivacySafeAttributes: {
    error: unknown;
  };
};

type InvalidateTokenAnalyticsEvent = {
  eventAction: EVENT_ACTION.INVALIDATE_TOKEN;
  attributes: {
    eventStatus: EVENT_STATUS.SUCCESS;
    reason?: string;
    usedCachedToken?: boolean;
  };
};

type AddStepsSuccessAnalyticsEvent = {
  eventAction: EVENT_ACTION.ADD_STEPS;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.SUCCESS;
    type: ADD_STEPS_TYPE.ACCEPTED;
    latency?: number;
    stepType?: {
      [key: string]: number;
    };
  };
};

type AddStepsFailureAnalyticsEvent = {
  eventAction: EVENT_ACTION.ADD_STEPS;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.FAILURE;
    type: ADD_STEPS_TYPE.REJECTED | ADD_STEPS_TYPE.ERROR;
    latency?: number;
  };
};

type ReInitDocFailAnalyticsEvent = {
  eventAction: EVENT_ACTION.REINITIALISE_DOCUMENT;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.FAILURE;
    numUnconfirmedSteps: number;
  };
};

type ReInitDocSuccessAnalyticsEvent = {
  eventAction: EVENT_ACTION.REINITIALISE_DOCUMENT;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.SUCCESS;
    numUnconfirmedSteps: number;
  };
};

type ConnectionSuccessAnalyticsEvent = {
  eventAction: EVENT_ACTION.CONNECTION;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.SUCCESS;
    latency?: number;
  };
};

type ConnectionFailureAnalyticsEvent = {
  eventAction: EVENT_ACTION.CONNECTION;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.FAILURE;
    latency?: number;
  };
};

type CatchUpSuccessAnalyticsEvent = {
  eventAction: EVENT_ACTION.CATCHUP;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.SUCCESS;
    latency?: number;
  };
};

type CatchUpFailureAnalyticsEvent = {
  eventAction: EVENT_ACTION.CATCHUP;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.FAILURE;
    latency?: number;
  };
};

type CatchUpDroppedStepsEvent = {
  eventAction: EVENT_ACTION.DROPPED_STEPS;
  attributes: {
    documentAri: string;
    numOfDroppedSteps: number;
  };
};

type DocumentInitSuccessAnalyticsEvent = {
  eventAction: EVENT_ACTION.DOCUMENT_INIT;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.SUCCESS;
    latency?: number;
    resetReason?: string; // Record whether document init required a page reset
  };
};

type UpdateParticipantsSuccessAnalyticsEvent = {
  eventAction: EVENT_ACTION.UPDATE_PARTICIPANTS;
  attributes: {
    documentAri?: string;
    eventStatus: EVENT_STATUS.SUCCESS;
    participants: number;
  };
};

type CommitUnconfirmedStepsSuccessAnalyticsEvent = {
  eventAction: EVENT_ACTION.COMMIT_UNCONFIRMED_STEPS;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.SUCCESS;
    latency?: number;
    numUnconfirmedSteps?: number;
  };
};

type CommitUnconfirmedStepsFailureAnalyticsEvent = {
  eventAction: EVENT_ACTION.COMMIT_UNCONFIRMED_STEPS;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.FAILURE;
    latency?: number;
    numUnconfirmedSteps?: number;
  };
};

type PublishPageSuccessAnalyticsEvent = {
  eventAction: EVENT_ACTION.PUBLISH_PAGE;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.SUCCESS;
    latency?: number;
  };
};

type PublishPageFailureAnalyticsEvent = {
  eventAction: EVENT_ACTION.PUBLISH_PAGE;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.FAILURE;
    latency?: number;
  };
};

type GetCurrentStateSuccessAnalyticsEvent = {
  eventAction: EVENT_ACTION.GET_CURRENT_STATE;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.SUCCESS;
    latency?: number;
  };
};

type GetCurrentStateFailureAnalyticsEvent = {
  eventAction: EVENT_ACTION.GET_CURRENT_STATE;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.FAILURE;
    latency?: number;
  };
};

type SendStepsRetryAnalyticsEvent = {
  eventAction: EVENT_ACTION.SEND_STEPS_RETRY;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.INFO;
    count: number;
  };
};

type CatchupAfterMaxSendStepsRetryAnalyticsEvent = {
  eventAction: EVENT_ACTION.CATCHUP_AFTER_MAX_SEND_STEPS_RETRY;
  attributes: {
    documentAri: string;
    eventStatus: EVENT_STATUS.INFO;
  };
};

export type ActionAnalyticsEvent =
  | AddStepsSuccessAnalyticsEvent
  | AddStepsFailureAnalyticsEvent
  | ReInitDocFailAnalyticsEvent
  | ReInitDocSuccessAnalyticsEvent
  | ConnectionSuccessAnalyticsEvent
  | ConnectionFailureAnalyticsEvent
  | CatchUpSuccessAnalyticsEvent
  | CatchUpFailureAnalyticsEvent
  | DocumentInitSuccessAnalyticsEvent
  | UpdateParticipantsSuccessAnalyticsEvent
  | CommitUnconfirmedStepsSuccessAnalyticsEvent
  | CommitUnconfirmedStepsFailureAnalyticsEvent
  | PublishPageSuccessAnalyticsEvent
  | PublishPageFailureAnalyticsEvent
  | GetCurrentStateSuccessAnalyticsEvent
  | GetCurrentStateFailureAnalyticsEvent
  | InvalidateTokenAnalyticsEvent
  | SendStepsRetryAnalyticsEvent
  | CatchupAfterMaxSendStepsRetryAnalyticsEvent
  | CatchUpDroppedStepsEvent;

export const ACK_MAX_TRY = 60;

export const CONFLUENCE = 'confluence';
