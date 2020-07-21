/** @jsx jsx */
import { Children, createContext, ReactElement, useContext } from 'react';

import { css, jsx } from '@emotion/core';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { easeIn, ExitingPersistence, SlideIn } from '@atlaskit/motion';
import Portal from '@atlaskit/portal';
import { gridSize as getGridSize, layers } from '@atlaskit/theme/constants';

type Props = {
  /** Describes the specific role of this FlagGroup for users viewing the page with a screen reader (defaults to `Flag notifications`). */
  label?: string;
  /** Describes the specific tag on which the screen reader text will be rendered (defaults to `h2`). */
  labelTag?: React.ElementType;
  /** Flag elements to be displayed. */
  children?: Array<ReactElement> | ReactElement;
  /** Handler which will be called when a Flag's dismiss button is clicked.
   * Receives the id of the dismissed Flag as a parameter.
   */
  onDismissed?: (id: number | string, analyticsEvent: UIAnalyticsEvent) => void;
};

const gridSize = getGridSize();
export const flagWidth = gridSize * 50;
export const flagAnimationTime = 400;
const flagBottom = gridSize * 6;
const flagLeft = gridSize * 10;

type FlagGroupAPI = {
  onDismissed?: (id: number | string, analyticsEvent: UIAnalyticsEvent) => void;
  dismissAllowed: (id: number | string) => Boolean;
};

export const FlagGroupContext = createContext<FlagGroupAPI>({
  dismissAllowed: () => false,
});

export function useFlagGroup() {
  return useContext(FlagGroupContext);
}

// transition: none is set on first-of-type to prevent a bug in Firefox
// that causes a broken transition
const baseStyles = `
  bottom: 0;
  position: absolute;
  width: ${flagWidth}px;
  transition: transform ${flagAnimationTime}ms ease-in-out;

  @media (max-width: 560px) {
    width: 100vw;
  }

  &:first-of-type {
    transition: none;
    transform: translate(0,0);
  }

  &:nth-of-type(n + 2) {
    animation-duration: 0ms;
    transform: translateX(0) translateY(100%) translateY(${2 * gridSize}px);
  }

  /* Layer the 'primary' flag above the 'secondary' flag */
  &:nth-of-type(1) {
    z-index: 5;
  }
  &:nth-of-type(2) {
    z-index: 4;
  }

  &:nth-of-type(n + 4) {
    visibility: hidden;
  }
`;

const FlagGroup = (props: Props) => {
  const {
    label = 'Flag notifications',
    labelTag: LabelTag = 'h2',
    children,
    onDismissed,
  } = props;

  const renderChildren = () => {
    return children
      ? Children.map(children, (flag: ReactElement, index: number) => {
          const isDismissAllowed: boolean = index === 0;
          const { id } = flag.props;

          return (
            <SlideIn
              key={id}
              enterFrom={'left'}
              fade={'inout'}
              duration={flagAnimationTime}
              animationTimingFunction={() => easeIn}
            >
              {props => (
                <div
                  {...props}
                  css={css`
                    ${baseStyles}
                    ${isDismissAllowed
                      ? // Transform needed to push up while 1st flag is leaving
                        // Exiting time should match the exiting time of motion so is halved
                        `
                    && + * {
                     transform: translate(0, 0);
                     transition-duration: ${flagAnimationTime / 2}ms
                   }`
                      : ''}
                  `}
                >
                  {flag}
                </div>
              )}
            </SlideIn>
          );
        })
      : false;
  };

  const hasFlags = Array.isArray(children)
    ? children.length > 0
    : Boolean(children);

  let firstFlagId: number | string | null = null;
  if (hasFlags && children) {
    firstFlagId = Array.isArray(children)
      ? children[0].props.id
      : children.props.id;
  }

  const api: FlagGroupAPI = {
    onDismissed: onDismissed,
    dismissAllowed: id => id === firstFlagId,
  };

  return (
    <FlagGroupContext.Provider value={api}>
      <Portal zIndex={layers.flag()}>
        {hasFlags ? (
          <LabelTag
            css={css`
              border: 0;
              clip: rect(1px, 1px, 1px, 1px);
              height: 1px;
              overflow: hidden;
              padding: 0;
              position: absolute;
              white-space: nowrap;
              width: 1px;
            `}
          >
            {label}
          </LabelTag>
        ) : null}
        <div
          css={css`
            bottom: ${flagBottom}px;
            left: ${flagLeft}px;
            position: fixed;
            z-index: ${layers.flag()};
            @media (max-width: 560px) {
              bottom: 0;
              left: 0;
            }
          `}
        >
          <ExitingPersistence appear={false}>
            {renderChildren()}
          </ExitingPersistence>
        </div>
      </Portal>
    </FlagGroupContext.Provider>
  );
};

export default FlagGroup;