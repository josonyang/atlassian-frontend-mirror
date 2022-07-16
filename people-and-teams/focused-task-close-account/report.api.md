## API Report File for "@atlaskit/focused-task-close-account"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { MessageDescriptor } from 'react-intl-next';
import { default as React_2 } from 'react';

// @public (undocumented)
export class DeactivateUserOverviewScreen extends React_2.Component<
  DeactivateUserOverviewScreenProps
> {
  // (undocumented)
  static defaultProps: Partial<DeactivateUserOverviewScreenProps>;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  renderBillingListElement: () => JSX.Element;
  // (undocumented)
  renderLoseAccessListElement: () => JSX.Element;
  // (undocumented)
  renderPersonalDataListElement: () => JSX.Element;
  // (undocumented)
  selectAdminOrSelfCopy: (
    adminCopy: MessageDescriptor,
    selfCopy: MessageDescriptor,
  ) => MessageDescriptor;
}

// @public (undocumented)
export class DeleteUserContentPreviewScreen extends React_2.Component<
  DeleteUserContentPreviewScreenProps,
  DeleteUserContentPreviewScreenState
> {
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  handleClickSection: (userName: string, position: number) => () => void;
  // (undocumented)
  isCardSelected: (position: number) => boolean;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  selectAdminOrSelfCopy: (
    adminCopy: MessageDescriptor,
    selfCopy: MessageDescriptor,
  ) => MessageDescriptor;
  // (undocumented)
  state: DeleteUserContentPreviewScreenState;
}

// @public (undocumented)
export class DeleteUserOverviewScreen extends React_2.Component<
  DeleteUserOverviewScreenProps
> {
  // (undocumented)
  static defaultProps: Partial<DeleteUserOverviewScreenProps>;
  // (undocumented)
  displayFirstListElement: () => JSX.Element | null;
  // (undocumented)
  displayFourthListElement: () => JSX.Element;
  // (undocumented)
  displaySecondListElement: () => JSX.Element;
  // (undocumented)
  displayThirdListElement: () => JSX.Element;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  selectAdminOrSelfCopy: (
    adminCopy: MessageDescriptor,
    selfCopy: MessageDescriptor,
  ) => MessageDescriptor;
}

// @public (undocumented)
export class FocusedTaskCloseAccount extends React_2.Component<Props, State> {
  // (undocumented)
  nextScreen: () => void;
  // (undocumented)
  previousScreen: () => void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  renderCurrentScreen: () => React_2.ReactNode;
  // (undocumented)
  state: State;
}

// (No @packageDocumentation comment for this package)
```