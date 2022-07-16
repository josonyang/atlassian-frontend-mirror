## API Report File for "@atlaskit/inline-edit"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="react" />

import { FieldProps } from '@atlaskit/form';
import { default as React_2 } from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';

// @public (undocumented)
const InlineEdit: <FieldValue extends unknown = string>(
  props: InlineEditProps<FieldValue>,
) => JSX.Element;
export default InlineEdit;

// @public (undocumented)
export const InlineEditableTextfield: (
  props: InlineEditableTextfieldProps,
) => JSX.Element;

// @public (undocumented)
export interface InlineEditableTextfieldProps extends CommonProps {
  isCompact?: boolean;
  onConfirm: (value: string, analyticsEvent: UIAnalyticsEvent) => void;
  placeholder: string;
  testId?: string;
}

// @public (undocumented)
export interface InlineEditProps<FieldValue> extends CommonProps {
  editView: (
    fieldProps: ExtendedFieldProps<FieldValue>,
    ref: React_2.RefObject<any>,
  ) => React_2.ReactNode;
  isEditing?: boolean;
  onConfirm: (value: any, analyticsEvent: UIAnalyticsEvent) => void;
  onEdit?: () => void;
  readView: () => React_2.ReactNode;
}

// (No @packageDocumentation comment for this package)
```