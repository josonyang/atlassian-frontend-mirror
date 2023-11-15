export enum KudosType {
  INDIVIDUAL = 'individual',
  TEAM = 'team',
}

export enum FlagEventType {
  KUDOS_CREATED = 'kudos-created',
  JIRA_KUDOS_CREATED = 'jira-kudos-created',
  JIRA_KUDOS_FAILED = 'jira-kudos-failed',
  DIRTY = 'dirty',
  CLOSE = 'close',
}

type FlagEventTypeValue = `${FlagEventType}`;

export const isFlagEventTypeValue = (
  value: string,
): value is FlagEventTypeValue => {
  return Object.values(FlagEventType).includes(value as FlagEventType);
};

type FlagType = 'error' | 'warning' | 'success' | 'info';

interface FlagAction {
  content: string | JSX.Element;
  href?: string;
  onClick?: () => void;
}

export interface Flag {
  id: string | number;
  title: string | JSX.Element;
  description: string | JSX.Element;
  icon?: JSX.Element;
  actions?: FlagAction[];
  type?: FlagType;
}

export interface KudosRecipient {
  type: KudosType;
  recipientId: string;
}

export interface FlagEvent {
  eventType: FlagEventType;
  kudosUuid?: string;
  jiraKudosUrl?: string;
  jiraKudosFormUrl?: string;
}

export interface GiveKudosDrawerProps {
  testId?: string;
  isOpen: boolean;
  onClose: () => void;
  analyticsSource: string;
  recipient?: KudosRecipient;
  teamCentralBaseUrl: string;
  cloudId: string;
  addFlag?: (flag: any) => void;
}
