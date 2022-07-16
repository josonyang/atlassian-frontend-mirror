## API Report File for "@atlaskit/atlassian-notifications"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="react" />

import { DetailedHTMLProps } from 'react';
import { IframeHTMLAttributes } from 'react';

// @public (undocumented)
export const Notifications: (props: NotificationsProps) => JSX.Element;

// @public (undocumented)
export type NotificationsProps = Omit<IframeProps, 'src'> & {
  _url?: string;
  locale?: string;
  product?: 'confluence' | 'jira' | string;
  subproduct?: 'software' | 'serviceManagement' | 'workManagement' | string;
  testId?: string;
  isNewExperience?: boolean;
};

// (No @packageDocumentation comment for this package)
```