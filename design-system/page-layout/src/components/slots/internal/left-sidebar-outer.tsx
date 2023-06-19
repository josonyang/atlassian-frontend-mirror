/** @jsx jsx */
import {
  forwardRef,
  MouseEventHandler,
  ReactNode,
  Ref,
  useContext,
} from 'react';

import { css, jsx } from '@emotion/react';

import { easeOut, prefersReducedMotion } from '@atlaskit/motion';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';
import { UNSAFE_media as media } from '@atlaskit/primitives/responsive';
import { token } from '@atlaskit/tokens';

import {
  COLLAPSED_LEFT_SIDEBAR_WIDTH,
  LEFT_SIDEBAR_FLYOUT_WIDTH,
  LEFT_SIDEBAR_WIDTH,
  MAX_MOBILE_SIDEBAR_FLYOUT_WIDTH,
  MOBILE_COLLAPSED_LEFT_SIDEBAR_WIDTH,
  TRANSITION_DURATION,
} from '../../../common/constants';
import { useIsSidebarDragging } from '../../../common/hooks';
import { getPageLayoutSlotSelector } from '../../../common/utils';
import { SidebarResizeContext } from '../../../controllers';

import SlotFocusRing from './slot-focus-ring';

type LeftSidebarOuterProps = {
  children: ReactNode;
  isFixed?: boolean;
  testId?: string;
  id?: string;
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onClick?: MouseEventHandler;
};

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
const prefersReducedMotionStyles = css(prefersReducedMotion());

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- With a feature flag, this does not apply
const mobileStyles = getBooleanFF(
  'platform.design-system-team.responsive-page-layout-left-sidebar_p8r7g',
)
  ? css({
      // eslint-disable-next-line @repo/internal/styles/no-nested-styles
      [media.below.md]: {
        width: MOBILE_COLLAPSED_LEFT_SIDEBAR_WIDTH,
        cursor: 'pointer',
        opacity: 1,
        transition: `width ${TRANSITION_DURATION}ms ${easeOut} 0s`,
        '&::after': {
          display: 'inline-block',
          maxWidth: MAX_MOBILE_SIDEBAR_FLYOUT_WIDTH,
          content: "''",
        },
      },
    })
  : undefined;

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- With a feature flag, this does not apply
const mobileFlyoutStyles = getBooleanFF(
  'platform.design-system-team.responsive-page-layout-left-sidebar_p8r7g',
)
  ? css({
      // eslint-disable-next-line @repo/internal/styles/no-nested-styles
      [media.below.md]: {
        cursor: 'revert',
      },
    })
  : undefined;

const outerStyles = css({
  width: LEFT_SIDEBAR_WIDTH,
  marginLeft: token('space.0', '0px'),
  position: 'relative',
  zIndex: 1,
  transition: `width ${TRANSITION_DURATION}ms ${easeOut} 0s`,
  ':hover': {
    '--ds--resize-button--opacity': 1,
  },
});

const draggingStyles = css({
  cursor: 'ew-resize',
  // Make sure drag to resize does not animate as the user drags
  transition: 'none',
});

/**
 * In fixed mode this element's child is taken out of the document flow.
 * It doesn't take up the width as expected,
 * so the pseudo element forces it to take up the necessary width.
 */
const fixedStyles = css({
  '::after': {
    display: 'inline-block',
    width: `${LEFT_SIDEBAR_WIDTH}`,
    content: "''",
  },
});

const flyoutStyles = css({
  width: LEFT_SIDEBAR_FLYOUT_WIDTH,
});

const flyoutFixedStyles = css({
  width: COLLAPSED_LEFT_SIDEBAR_WIDTH,
});

const selector = getPageLayoutSlotSelector('left-sidebar');

const LeftSidebarOuter = (
  {
    children,
    isFixed = false, // NOTE: We explicitly require this via props because of `LeftSidebarWithoutResize`
    testId,
    onMouseLeave,
    onMouseOver,
    onClick,
    id,
  }: LeftSidebarOuterProps,
  ref: Ref<HTMLDivElement>,
) => {
  const isDragging = useIsSidebarDragging();
  const {
    leftSidebarState: { isFlyoutOpen },
  } = useContext(SidebarResizeContext);

  return (
    <SlotFocusRing isSidebar>
      {({ className }) => (
        /**
         * On desktop, the `onMouseOver|onMouseLeave` handlers controls the temporary flyout behavior.
         * This is an intentionally mouse-only experience, it may even be disruptive with keyboard navigation.
         *
         * On mobile, the `onClick` handler controls the toggled flyout behaviour.
         * This is not intended to be how you use this with a keyboard, there is a ResizeButton for this intentionally instead.
         */
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
          css={[
            // mobile breakpoint styles
            mobileStyles,
            isFlyoutOpen && mobileFlyoutStyles,

            // generic styles
            outerStyles,
            isFixed && fixedStyles,
            isFlyoutOpen && flyoutStyles,
            isFlyoutOpen && isFixed && flyoutFixedStyles,
            isDragging && draggingStyles,
            prefersReducedMotionStyles,
          ]}
          className={className}
          data-testid={testId}
          id={id}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          ref={ref}
          aria-hidden="true"
          {...selector}
        >
          {children}
        </div>
      )}
    </SlotFocusRing>
  );
};

export default forwardRef(LeftSidebarOuter);
