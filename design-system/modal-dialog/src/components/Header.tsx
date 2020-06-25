/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/core';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';

import {
  Header,
  Title,
  titleIconWrapperStyles,
  TitleText,
} from '../styled/Content';
import { AppearanceType, KeyboardOrMouseEvent } from '../types';

const TitleIcon = ({ appearance }: { appearance?: 'danger' | 'warning' }) => {
  if (!appearance) return null;

  const Icon = appearance === 'danger' ? ErrorIcon : WarningIcon;

  return (
    <span css={titleIconWrapperStyles(appearance)}>
      <Icon label={`${appearance} icon`} />
    </span>
  );
};

export interface HeaderProps extends HeaderComponentProps {
  /**
    Boolean OR Function indicating which element to focus when the component mounts
    TRUE will automatically find the first "tabbable" element within the modal
    Providing a function should return the element you want to focus
  */
  /** Component to render the header of the modal. */
  component?: React.ElementType<HeaderComponentProps>;
}

export interface HeaderComponentProps {
  /** refer by aria-labelledby attribute for a11y */
  id?: string;
  /** A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests */
  testId?: string;
  /** Appearance of the primary button. Also adds an icon to the heading, if provided. */
  appearance?: AppearanceType;

  /** The modal heading */
  heading?: React.ReactNode;
  /** Function to close the dialog */
  onClose: (e: KeyboardOrMouseEvent) => void;
  /** Whether or not to display a line under the header */
  showKeyline?: boolean;
  /**
   * Makes heading multiline.
   * If false and heading is longer than one line overflow will be not displayed.
   */
  isHeadingMultiline?: boolean;
}

export default class ModalHeader extends React.Component<HeaderProps, {}> {
  static defaultProps = {
    isHeadingMultiline: true,
  };

  render() {
    const {
      id,
      appearance,
      component,
      heading,
      onClose,
      showKeyline,
      isHeadingMultiline,
      testId,
    } = this.props;
    const warning = 'You can provide `component` OR `heading`, not both.';

    if (!component && !heading) return null;
    if (component && heading) {
      console.warn(warning); // eslint-disable-line no-console
      return null;
    }
    if (component) {
      return React.createElement(component, {
        id,
        testId,
        appearance,
        onClose,
        showKeyline,
        isHeadingMultiline,
      });
    }

    return (
      <Header showKeyline={showKeyline}>
        <Title>
          <TitleIcon appearance={appearance} />
          <TitleText
            isHeadingMultiline={isHeadingMultiline}
            id={id}
            data-testid={testId && `${testId}-heading`}
          >
            {heading}
          </TitleText>
        </Title>
      </Header>
    );
  }
}
