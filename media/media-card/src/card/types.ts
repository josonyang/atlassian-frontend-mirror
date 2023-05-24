import React, { ReactElement, RefObject } from 'react';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

import { CardDimensions } from '../types';

export type InlinePlayerWrapperProps = {
  testId?: string;
  dimensions?: CardDimensions;
  selected: { selected?: boolean | undefined };
  onClick?: (
    event: React.MouseEvent<HTMLDivElement>,
    analyticsEvent?: UIAnalyticsEvent,
  ) => void;
  innerRef?:
    | RefObject<HTMLDivElement>
    | ((instance: HTMLDivElement | null) => void)
    | undefined;
  children?: JSX.Element[] | ReactElement<any, any> | null | any;
};
