import React from 'react';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

export type Appearance =
  | 'default'
  | 'danger'
  | 'link'
  | 'primary'
  | 'subtle'
  | 'subtle-link'
  | 'warning';

export type Spacing = 'compact' | 'default' | 'none';

// Similar to {...A, ...B}
// 1. Remove all overlapping types from First
// 2. Add properties from Second
// https://codesandbox.io/s/native-button-with-nested-elementsclick-bnpjg?file=/src/index.ts
/* This type is intentionally not exported to prevent it from being explicitly referenced in the resulting button types. The alternative would
 * be making this public API and re-exporting from the root */
type Combine<First, Second> = Omit<First, keyof Second> & Second;

export type CommonButtonProps<TagName extends HTMLElement> = {
  /**
   * The base styling to apply to the button
   */
  appearance?: Appearance;
  /**
   * Set the button to autofocus on mount
   */
  autoFocus?: boolean;
  /**
   * Used to 'overlay' something over a button. This is commonly used to display a loading spinner
   */
  overlay?: React.ReactNode;
  /**
   * Set if the button is disabled
   */
  isDisabled?: boolean;
  /**
   * Change the style to indicate the button is selected
   */
  isSelected?: boolean;
  /**
   * Handler to be called on blur
   */
  onBlur?: React.FocusEventHandler<TagName>;
  /**
   * Handler to be called on click. The second argument can be used to track analytics data. See the tutorial in the analytics-next package for details
   */
  onClick?: (
    e: React.MouseEvent<TagName>,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
  /**
   * Handler to be called on focus
   */
  onFocus?: React.FocusEventHandler<TagName>;
  /**
   * Set the amount of padding in the button
   */
  spacing?: Spacing;
  /**
   * Text content to be rendered in the button
   */
  children: React.ReactNode;
  /**
   * A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
  /**
   * An optional name used to identify this component to press listeners. E.g. interaction tracing
   * @see https://hello.atlassian.net/wiki/spaces/UFO/pages/2010358949/UFO+Integration+into+Design+System+components
   */
  interactionName?: string;
  /**
   * Additional information to be included in the `context` of analytics events that come from button
   */
  analyticsContext?: Record<string, any>;
};

type SupportedElementAttributes =
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type AdditionalHTMLElementPropsExtender<
  Props extends SupportedElementAttributes,
> = Combine<
  Omit<
    Props,
    | 'className'
    | 'style'
    // There is no reason the default role should be overridden.
    | 'role'
    // Handled by `isDisabled`
    | 'disabled'
  >,
  {
    // `data-testid` is controlled through the `testId` prop
    // Being super safe and letting consumers know that this data attribute will not be applied
    'data-testid'?: never;
  }
>;

/**
 * Combines common buttom props with additional HTML attributes.
 */
export type CombinedButtonProps<
  TagName extends HTMLElement,
  HTMLAttributes extends SupportedElementAttributes,
> = Combine<HTMLAttributes, CommonButtonProps<TagName>>;