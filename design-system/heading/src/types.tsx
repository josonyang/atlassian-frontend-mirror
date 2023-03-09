/* eslint-disable jsdoc/require-asterisk-prefix */
import { ReactNode } from 'react';

export type HeadingProps = {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;
  /**
   * The text of the heading.
   */
  children: ReactNode;
  /**
   The headling level as defined by the Atlasian Design [typography foundations](/foundations/typography/).
   
   The `level` prop affects the actual HTML element rendered in the DOM:
   
   ```
   const levelMap = {
      h900: 'h1',
      h800: 'h1',
      h700: 'h2',
      h600: 'h3',
      h500: 'h4',
      h400: 'h5',
      h300: 'h6',
      h200: 'div',
      h100: 'div',
   }
   ```
   
   It's important to note that the final DOM may be impacted by the parent heading level context because of inferred accessibility level correction.
   Therefore, it is recommended to check the final DOM to confirm the actual rendered HTML element.
   */
  level:
    | 'h900'
    | 'h800'
    | 'h700'
    | 'h600'
    | 'h500'
    | 'h400'
    | 'h300'
    | 'h200'
    | 'h100';
  /**
   * Unique identifier for the heading DOM element.
   */
  id?: string;
  /**
   * Allows the component to be rendered as the specified DOM element, overriding a default element set by `level` prop.
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
  /**
   * Text color of the heading. Use `"inverse"` option for a light text color over a dark background.
   * Defaults to `"default"`.
   */
  color?: 'inverse' | 'default';
};
/* eslint-enable jsdoc/require-asterisk-prefix */
