import { ContainerProps } from '../types';

export type HoverCardDelayProps = Pick<
  ContainerProps,
  'hideHoverCardPreviewButton' | 'showServerActions'
> & {
  isHoverPreview?: boolean;
  isAuthTooltip?: boolean;
  testId?: string;
  url: string;
};
