## API Report File for "@atlaskit/tabs"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="react" />

import { KeyboardEvent as KeyboardEvent_2 } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';
import { ReactNode } from 'react';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next/withAnalyticsEvents';

// @public (undocumented)
export function Tab({ children, testId }: TabProps): JSX.Element;

// @public (undocumented)
export type TabAttributesType = {
  onClick: () => void;
  id: string;
  'aria-controls': string;
  'aria-posinset': number;
  'aria-selected': boolean;
  'aria-setsize': number;
  onMouseDown: (e: MouseEvent_2<HTMLElement>) => void;
  onKeyDown: (e: KeyboardEvent_2<HTMLElement>) => void;
  role: 'tab';
  tabIndex: number;
};

// @public @deprecated (undocumented)
export interface TabData {
  [key: string]: any;
  content?: ReactNode;
  label?: string;
  testId?: string;
}

// @public (undocumented)
export const TabList: (props: TabListProps) => JSX.Element;

// @public (undocumented)
export type TabListAttributesType = {
  selected: SelectedType;
  tabsId: string;
  onChange: (index: SelectedType) => void;
};

// @public (undocumented)
export interface TabListProps {
  children: ReactNode;
}

// @public (undocumented)
export const TabPanel: ({ children, testId }: TabPanelProps) => JSX.Element;

// @public (undocumented)
export type TabPanelAttributesType = {
  role: 'tabpanel';
  id: string;
  hidden?: boolean;
  'aria-labelledby': string;
  onMouseDown: (e: MouseEvent_2<HTMLElement>) => void;
  tabIndex: number;
};

// @public (undocumented)
export interface TabPanelProps {
  children: ReactNode;
  testId?: string;
}

// @public (undocumented)
export interface TabProps {
  children: ReactNode;
  testId?: string;
}

// @public (undocumented)
const Tabs: (props: TabsProps) => JSX.Element;
export default Tabs;

// @public (undocumented)
export interface TabsProps extends WithAnalyticsEventsProps {
  analyticsContext?: Record<string, any>;
  children: ReactNode;
  defaultSelected?: SelectedType;
  id: string;
  onChange?: OnChangeCallback;
  selected?: SelectedType;
  shouldUnmountTabPanelOnChange?: boolean;
  testId?: string;
}

// @public (undocumented)
export const useTab: () => TabAttributesType;

// @public (undocumented)
export const useTabPanel: () => TabPanelAttributesType;

// (No @packageDocumentation comment for this package)
```