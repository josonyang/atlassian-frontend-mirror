import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { bind } from 'bind-event-listener';

import Button from '@atlaskit/button/standard-button';
import { KEY_DOWN } from '@atlaskit/ds-lib/keycodes';
import mergeRefs from '@atlaskit/ds-lib/merge-refs';
import noop from '@atlaskit/ds-lib/noop';
import useControlledState from '@atlaskit/ds-lib/use-controlled';
import useFocus from '@atlaskit/ds-lib/use-focus-event';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import Popup, { TriggerProps } from '@atlaskit/popup';
// eslint-disable-next-line @atlaskit/design-system/no-deprecated-imports
import { gridSize as gridSizeFn, layers } from '@atlaskit/theme/constants';

import FocusManager from './internal/components/focus-manager';
import MenuWrapper from './internal/components/menu-wrapper';
import SelectionStore from './internal/context/selection-store';
import useRegisterItemWithFocusManager from './internal/hooks/use-register-item-with-focus-manager';
import useGeneratedId, { PREFIX } from './internal/utils/use-generated-id';
import type { DropdownMenuProps, Placement } from './types';

const gridSize = gridSizeFn();

const MAX_HEIGHT = `calc(100vh - ${gridSize * 2}px)`;
type mainAxes = 'top' | 'bottom' | 'left' | 'right' | 'auto';
type crossAxes = 'start' | 'end';
const opposites = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
  start: 'end',
  auto: 'auto',
  end: 'start',
};
export const KEY_SPACE = ' ';
export const KEY_ENTER = 'Enter';

const getFallbackPlacements = (
  placement: Placement,
): Placement[] | undefined => {
  const placementPieces = placement.split('-');
  const mainAxis = placementPieces[0] as mainAxes;

  // Left, right and auto placements can rely on standard popper sliding behaviour
  if (!['top', 'bottom'].includes(mainAxis)) {
    return undefined;
  }

  // Top and bottom placements need to flip to the right/left to ensure
  // long lists don't extend off the screen
  else if (
    placementPieces.length === 2 &&
    ['start', 'end'].includes(placementPieces[1])
  ) {
    const crossAxis = placementPieces[1] as crossAxes;
    return [
      `${mainAxis}`,
      `${mainAxis}-${opposites[crossAxis]}`,
      `${opposites[mainAxis]}-${crossAxis}`,
      `${opposites[mainAxis]}`,
      `${opposites[mainAxis]}-${opposites[crossAxis]}`,
      'auto',
    ] as Placement[];
  } else {
    return [
      `${mainAxis}-start`,
      `${mainAxis}-end`,
      `${opposites[mainAxis]}`,
      `${opposites[mainAxis]}-start`,
      `${opposites[mainAxis]}-end`,
      `auto`,
    ] as Placement[];
  }
};

/**
 * __Dropdown menu__
 *
 * A dropdown menu displays a list of actions or options to a user.
 *
 * - [Examples](https://atlassian.design/components/dropdown-menu/examples)
 * - [Code](https://atlassian.design/components/dropdown-menu/code)
 * - [Usage](https://atlassian.design/components/dropdown-menu/usage)
 */
const DropdownMenu = <T extends HTMLElement = HTMLElement>({
  autoFocus = false,
  children,
  defaultOpen = false,
  isLoading = false,
  isOpen,
  onOpenChange = noop,
  placement = 'bottom-start',
  shouldFlip = true,
  shouldRenderToParent = false,
  spacing,
  statusLabel,
  testId,
  trigger,
  zIndex = layers.modal(),
}: DropdownMenuProps<T>) => {
  const [isLocalOpen, setLocalIsOpen] = useControlledState(
    isOpen,
    () => defaultOpen,
  );

  const [isTriggeredUsingKeyboard, setTriggeredUsingKeyboard] = useState(false);
  const fallbackPlacements = useMemo(
    () => getFallbackPlacements(placement),
    [placement],
  );

  const handleTriggerClicked = useCallback(
    // TODO: event is an `any` and is being cast incorrectly
    // This means that the public type for `onOpenChange` is incorrect
    // current: (event: React.MouseEvent | React.KeyboardEvent) => void;
    // correct: (event: React.MouseEvent | KeyboardEvent) => void;
    // https://product-fabric.atlassian.net/browse/DSP-4692
    (event) => {
      const newValue = !isLocalOpen;
      const { clientX, clientY, type, detail } = event;
      if (type === 'keydown') {
        setTriggeredUsingKeyboard(true);
      } else if (clientX === 0 || clientY === 0) {
        // Hitting enter/space is registered as a click
        // with both clientX and clientY === 0
        setTriggeredUsingKeyboard(true);
      } else if (detail === 0) {
        // Fix for Safari. clientX and clientY !== 0 in Safari
        setTriggeredUsingKeyboard(true);
      }

      setLocalIsOpen(newValue);
      onOpenChange({ isOpen: newValue, event });
    },
    [onOpenChange, isLocalOpen, setLocalIsOpen],
  );

  const handleOnClose = useCallback(
    (event) => {
      if (
        event.key !== 'Escape' &&
        event.target.closest(`[id^=${PREFIX}] [aria-haspopup]`)
      ) {
        // Check if it is within dropdown and it is a trigger button
        // if it is a nested dropdown, clicking trigger won't close the dropdown
        return;
      }
      const newValue = false;
      setLocalIsOpen(newValue);

      onOpenChange({ isOpen: newValue, event });
    },
    [onOpenChange, setLocalIsOpen],
  );

  const { isFocused, bindFocus } = useFocus();

  // When a trigger is focused, we want to open the dropdown if
  // the user presses the DownArrow
  useEffect(() => {
    // Only need to listen for keydown when focused
    if (!isFocused) {
      return noop;
    }

    // Being safe: we don't want to open the dropdown if it is already open
    // Note: This shouldn't happen as the trigger should not be able to get focus
    if (isLocalOpen) {
      return noop;
    }

    return bind(window, {
      type: 'keydown',
      listener: function openOnKeyDown(e: KeyboardEvent) {
        if (e.key === KEY_DOWN) {
          // prevent page scroll
          e.preventDefault();
          handleTriggerClicked(e);
        } else if (
          (e.key === KEY_SPACE || e.key === KEY_ENTER) &&
          e.detail === 0
        ) {
          // This allows us to focus on the first element if the dropdown was triggered by a custom trigger with a custom onClick
          setTriggeredUsingKeyboard(true);
        }
      },
    });
  }, [isFocused, isLocalOpen, handleTriggerClicked]);

  const id = useGeneratedId();
  const itemRef = useRegisterItemWithFocusManager();

  return (
    <SelectionStore>
      <Popup
        id={isLocalOpen ? id : undefined}
        shouldFlip={shouldFlip}
        isOpen={isLocalOpen}
        onClose={handleOnClose}
        zIndex={zIndex}
        placement={placement}
        fallbackPlacements={fallbackPlacements}
        testId={testId && `${testId}--content`}
        shouldUseCaptureOnOutsideClick
        shouldRenderToParent={shouldRenderToParent}
        trigger={({
          ref,
          'aria-controls': ariaControls,
          'aria-expanded': ariaExpanded,
          'aria-haspopup': ariaHasPopup,
          // DSP-13312 TODO: remove spread props in future major release
          ...rest
        }: TriggerProps) => {
          if (typeof trigger === 'function') {
            return trigger({
              'aria-controls': ariaControls,
              'aria-expanded': ariaExpanded,
              'aria-haspopup': ariaHasPopup,
              ...rest,
              ...bindFocus,
              triggerRef: mergeRefs([ref, itemRef]),
              isSelected: isLocalOpen,
              onClick: handleTriggerClicked,
              testId: testId && `${testId}--trigger`,
            });
          }

          return (
            <Button
              {...bindFocus}
              ref={mergeRefs([ref, itemRef])}
              aria-controls={ariaControls}
              aria-expanded={ariaExpanded}
              aria-haspopup={ariaHasPopup}
              isSelected={isLocalOpen}
              iconAfter={<ExpandIcon size="medium" label="" />}
              onClick={handleTriggerClicked}
              testId={testId && `${testId}--trigger`}
            >
              {trigger}
            </Button>
          );
        }}
        content={({ setInitialFocusRef, update }) => (
          <FocusManager>
            <MenuWrapper
              spacing={spacing}
              maxHeight={MAX_HEIGHT}
              maxWidth={800}
              onClose={handleOnClose}
              onUpdate={update}
              isLoading={isLoading}
              statusLabel={statusLabel}
              setInitialFocusRef={
                isTriggeredUsingKeyboard || autoFocus
                  ? setInitialFocusRef
                  : undefined
              }
              testId={testId && `${testId}--menu-wrapper`}
            >
              {children}
            </MenuWrapper>
          </FocusManager>
        )}
      />
    </SelectionStore>
  );
};

export default DropdownMenu;
