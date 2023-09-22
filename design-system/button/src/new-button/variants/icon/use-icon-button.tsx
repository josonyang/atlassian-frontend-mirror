import React from 'react';

import { Box } from '@atlaskit/primitives';

import useButtonBase, {
  type UseButtonBaseArgs,
  type UseButtonBaseReturn,
} from '../shared/use-button-base';
import { getFadingStyles, iconStyles } from '../shared/xcss';

import { type CommonIconButtonProps } from './types';

type UseIconButtonArgs<TagName extends HTMLElement> =
  UseButtonBaseArgs<TagName> & CommonIconButtonProps;

type UseIconButtonReturn<TagName extends HTMLElement> =
  UseButtonBaseReturn<TagName>;

/**
 * __Use icon button__
 *
 * A React hook that accepts a set of icon Button props,
 * and processes them to return consistent base props for usage
 * across IconButton and LinkIconButton variants.
 *
 * @private
 */
const useIconButton = <TagName extends HTMLElement>({
  analyticsContext,
  appearance,
  autoFocus,
  buttonType,
  icon,
  interactionName,
  isDisabled,
  isSelected,
  // TODO: Will potentially remove children prop from IconButton
  // children,
  onClick,
  onMouseDownCapture,
  onMouseUpCapture,
  onKeyDownCapture,
  onKeyUpCapture,
  onTouchStartCapture,
  onTouchEndCapture,
  onPointerDownCapture,
  onPointerUpCapture,
  onClickCapture,
  overlay,
  ref,
  shouldFitContainer,
  spacing,
}: UseIconButtonArgs<TagName>): UseIconButtonReturn<TagName> => {
  const fadeStyles = getFadingStyles({ hasOverlay: Boolean(overlay) });

  const baseProps = useButtonBase<TagName>({
    analyticsContext,
    appearance,
    autoFocus,
    buttonType,
    /**
     * TODO: Have not finished IconButton yet. It also needs a required accessible
     * label - likely implemented using VisuallyHidden
     */
    children: (
      <Box as="span" xcss={[fadeStyles, iconStyles]}>
        {icon}
      </Box>
    ),
    interactionName,
    isDisabled,
    isSelected,
    isIconButton: true,
    onClick,
    onMouseDownCapture,
    onMouseUpCapture,
    onKeyDownCapture,
    onKeyUpCapture,
    onTouchStartCapture,
    onTouchEndCapture,
    onPointerDownCapture,
    onPointerUpCapture,
    onClickCapture,
    overlay,
    ref,
    shouldFitContainer,
    spacing,
  });

  return baseProps;
};

export default useIconButton;