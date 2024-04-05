/** @jsx jsx */
import {
  ComponentPropsWithRef,
  createContext,
  ElementType,
  forwardRef,
  ReactNode,
  Ref,
  useContext,
} from 'react';

import { css, jsx } from '@emotion/react';
import invariant from 'tiny-invariant';

import {
  FontSize,
  fontStylesMap,
  FontWeight,
  fontWeightStylesMap,
  inverseColorMap,
  TextColor,
  textColorStylesMap,
} from '../xcss/style-maps.partial';

import { useSurface } from './internal/surface-provider';
import type { BasePrimitiveProps } from './types';

const asAllowlist = ['span', 'p', 'strong', 'em'] as const;
type AsElement = (typeof asAllowlist)[number];

type TextPropsBase<T extends ElementType = 'span'> = {
  /**
   * HTML tag to be rendered. Defaults to `span`.
   */
  as?: AsElement;
  /**
   * Elements rendered within the Text element.
   */
  children: ReactNode;
  /**
   * Token representing text color with a built-in fallback value.
   * Will apply inverse text color automatically if placed within a Box with bold background color.
   * Defaults to `text.color` if not nested in other Text components.
   */
  color?: TextColor | 'inherit';
  /**
   * The [HTML `id` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).
   */
  id?: string;
  /**
   * The number of lines to limit the provided text to. Text will be truncated with an ellipsis.
   *
   * When `maxLines={1}`, `wordBreak` defaults to `break-all` to match the behaviour of `text-overflow: ellipsis`.
   */
  maxLines?: number;
  /**
   * Text alignment.
   */
  align?: TextAlign;
  /**
   * Text size.
   */
  size?: FontSize;
  /**
   * The [HTML `font-weight` attribute](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight).
   */
  weight?: FontWeight;
  /**
   * Forwarded ref.
   */
  ref?: ComponentPropsWithRef<T>['ref'];
};

export type TextProps<T extends ElementType = 'span'> = TextPropsBase<T> &
  Omit<BasePrimitiveProps, 'xcss'>;

// We're doing this because our CSS reset can add top margins to elements such as `p` which is totally insane.
// Long term we should remove those instances from the reset - it should be a reset to 0.
// For now, at least we know <Text> will be unaffected by this.
const resetStyles = css({
  margin: 0,
});

const strongStyles = css({
  fontWeight: 'bold',
});

const emStyles = css({
  fontStyle: 'italic',
});

type TextAlign = keyof typeof textAlignMap;
const textAlignMap = {
  center: css({ textAlign: 'center' }),
  end: css({ textAlign: 'end' }),
  start: css({ textAlign: 'start' }),
};

const truncationStyles = css({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
});

const wordBreakMap = {
  breakAll: css({ wordBreak: 'break-all' }),
};

const HasTextAncestorContext = createContext(false);
const useHasTextAncestor = () => useContext(HasTextAncestorContext);

/**
 * Custom hook designed to abstract the parsing of the color props and make it clearer in the future how color is reconciled between themes and tokens.
 */
const useColor = (
  colorProp: TextColor | undefined | 'inherit',
  hasTextAncestor: boolean,
): TextColor | undefined => {
  const surface = useSurface();

  /**
   * Where the color of the surface is inverted we always override the color
   * as there is no valid choice that is not covered by the override.
   */
  if (inverseColorMap.hasOwnProperty(surface)) {
    return inverseColorMap[surface as keyof typeof inverseColorMap];
  }

  if (colorProp === 'inherit') {
    return undefined;
  }

  if (!colorProp && hasTextAncestor) {
    return undefined;
  }

  return colorProp || 'color.text';
};

/**
 * __Text__
 *
 * Text is a primitive component that has the Atlassian Design System's design guidelines baked in.
 * This includes considerations for text attributes such as color, font size, font weight, and line height.
 * It renders a `span` by default.
 *
 * @internal
 */
const Text = forwardRef(
  <T extends ElementType = 'span'>(
    {
      as: Component = 'span',
      color: colorProp,
      align,
      testId,
      id,
      size = 'medium',
      weight,
      maxLines,
      children,
    }: TextProps<T>,
    ref: Ref<any>,
  ) => {
    invariant(
      asAllowlist.includes(Component),
      `@atlaskit/primitives: Text received an invalid "as" value of "${Component}"`,
    );

    const hasTextAncestor = useHasTextAncestor();
    const color = useColor(colorProp, hasTextAncestor);

    const component = (
      <Component
        ref={ref}
        css={[
          resetStyles,
          fontStylesMap[size],
          color && textColorStylesMap[color],
          maxLines && truncationStyles,
          maxLines === 1 && wordBreakMap.breakAll,
          align && textAlignMap[align],
          weight && fontWeightStylesMap[weight],
          Component === 'em' && emStyles,
          Component === 'strong' && strongStyles,
        ]}
        style={{
          WebkitLineClamp: maxLines,
        }}
        data-testid={testId}
        id={id}
      >
        {children}
      </Component>
    );

    return hasTextAncestor ? (
      // no need to re-apply context if the text is already wrapped
      component
    ) : (
      <HasTextAncestorContext.Provider value={true}>
        {component}
      </HasTextAncestorContext.Provider>
    );
  },
);

export default Text;
