/* eslint-disable @repo/internal/dom-events/no-unsafe-event-listeners */
import React from 'react';

import { findDOMNode } from 'react-dom';

import Spinner from '@atlaskit/spinner';
import { token } from '@atlaskit/tokens';

import { LARGE, LOADING_CONTENTS_OPACITY } from '../internal/constants';
import {
  Container,
  SpinnerBackdrop,
  SpinnerContainer,
} from '../styled/loading-container-advanced';
import type { SpinnerSizeType } from '../types';

// there is a bug with findDOMNode and Suspense in React < 16.9: https://github.com/facebook/react/issues/14188
const safeFindDOMNode: typeof findDOMNode = (component) => {
  try {
    return findDOMNode(component);
  } catch (e) {
    return null;
  }
};

export interface LoadingContainerAdvancedProps {
  children: React.ReactElement<any>;
  isLoading?: boolean;
  spinnerSize?: SpinnerSizeType;
  contentsOpacity: number | string;
  targetRef?: () => HTMLDivElement | undefined;
  testId?: string;
}

export default class LoadingContainerAdvanced extends React.Component<
  LoadingContainerAdvancedProps,
  {}
> {
  children?: HTMLElement;
  spinnerRef?: HTMLDivElement;
  static defaultProps = {
    isLoading: true,
    spinnerSize: LARGE,
    contentsOpacity: token('opacity.loading', `${LOADING_CONTENTS_OPACITY}`),
  };
  componentDidMount = () => {
    if (this.props.isLoading && this.hasTargetNode()) {
      this.attachListeners();

      this.updateTargetAppearance();
      this.updateSpinnerPosition();
    }
  };

  UNSAFE_componentWillReceiveProps = (
    nextProps: LoadingContainerAdvancedProps,
  ) => {
    if (!nextProps.isLoading || !this.hasTargetNode(nextProps)) {
      this.detachListeners();
    } else if (!this.props.isLoading) {
      this.attachListeners();
    }
  };

  componentDidUpdate = () => {
    if (this.hasTargetNode()) {
      this.updateTargetAppearance();

      if (this.props.isLoading) {
        this.updateSpinnerPosition();
      }
    }
  };

  componentWillUnmount = () => {
    this.detachListeners();
  };

  getTargetNode = (nextProps: LoadingContainerAdvancedProps = this.props) => {
    const { targetRef } = nextProps;
    // targetRef prop may be defined but it is not guaranteed it returns an element
    const targetElement = targetRef ? targetRef() : this.children;
    // @ts-ignore - targetElement is not assignable to type 'ReactInstance'
    const targetNode = safeFindDOMNode(targetElement);

    return targetNode;
  };

  getThisNode = () => safeFindDOMNode(this);

  // @ts-ignore - this.spinnerRef is not assignable to type 'ReactInstance'
  getSpinnerNode = () => safeFindDOMNode(this.spinnerRef);

  hasTargetNode = (nextProps?: LoadingContainerAdvancedProps) =>
    !!this.getTargetNode(nextProps);

  isVerticallyVisible = (
    elementRect: { top: number; bottom: number },
    viewportHeight: number,
  ) => {
    const { top, bottom } = elementRect;
    if (bottom <= 0) {
      return false;
    }
    return top < viewportHeight;
  };

  isFullyVerticallyVisible = (
    elementRect: { top: number; bottom: number },
    viewportHeight: number,
  ) => {
    const { top, bottom } = elementRect;
    return top >= 0 && bottom <= viewportHeight;
  };

  attachListeners() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }

  detachListeners() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.updateSpinnerPosition();
  };

  handleScroll = () => {
    this.updateSpinnerPosition();
  };

  translateSpinner = (
    spinnerNode: HTMLElement,
    transformY: number,
    isFixed?: boolean,
  ) => {
    spinnerNode.style.position = isFixed ? 'fixed' : '';
    spinnerNode.style.transform =
      transformY !== 0 ? `translate3d(0, ${transformY}px, 0)` : '';
  };

  updateTargetAppearance = () => {
    const targetNode = this.getTargetNode() as HTMLElement;

    const { isLoading, contentsOpacity } = this.props;
    if (
      targetNode &&
      targetNode.style &&
      typeof targetNode.style === 'object'
    ) {
      targetNode.style.pointerEvents = isLoading ? 'none' : '';
      targetNode.style.opacity = isLoading ? contentsOpacity.toString() : '';
    }
  };

  updateSpinnerPosition() {
    const viewportHeight = window.innerHeight;
    const targetNode = this.getTargetNode() as HTMLElement;
    const spinnerNode = this.getSpinnerNode() as HTMLElement;

    if (!targetNode || !spinnerNode) {
      return;
    }

    const targetRect = targetNode.getBoundingClientRect();
    const spinnerRect = spinnerNode.getBoundingClientRect();
    const spinnerHeight = spinnerRect.height;
    const isInViewport = this.isVerticallyVisible(targetRect, viewportHeight);
    const { top, bottom, height } = targetRect;

    if (isInViewport) {
      // The spinner may follow the element only if there is enough space:
      // Let's say the element can fit at least three spinners (vertically)
      const canFollow = height >= spinnerHeight * 3;
      if (
        canFollow &&
        !this.isFullyVerticallyVisible(targetRect, viewportHeight)
      ) {
        if (top >= 0) {
          // Only the head of the element is visible
          const viewportSpaceTakenByElement = viewportHeight - top;
          const diff =
            viewportSpaceTakenByElement / 2 + top - spinnerHeight / 2;
          const y =
            viewportSpaceTakenByElement < spinnerHeight * 3
              ? top + spinnerHeight
              : diff;
          this.translateSpinner(spinnerNode, y, true);
        } else if (top < 0 && bottom > viewportHeight) {
          // The element takes all viewport, nor its head nor tail are visible
          const y = viewportHeight / 2 - spinnerHeight / 2;
          this.translateSpinner(spinnerNode, y, true);
        } else {
          // Only the tail of the element is visible
          const diff = bottom / 2 - spinnerHeight / 2;
          const y = diff < spinnerHeight ? diff - (spinnerHeight - diff) : diff;
          this.translateSpinner(spinnerNode, y, true);
        }
        return;
      }
    } else {
      // If both the element and the spinner are off screen - quit
      if (!this.isVerticallyVisible(spinnerRect, viewportHeight)) {
        return;
      }
    }

    // Three options here:
    // 1) the element is fully visible
    // 2) the element is too small for the spinner to follow
    // 3) the spinner might still be visible while the element isn't
    const thisNode = this.getThisNode() as HTMLElement;
    if (thisNode && typeof thisNode.getBoundingClientRect === 'function') {
      const thisTop = thisNode.getBoundingClientRect().top;
      const y = (top - thisTop) / 2;
      this.translateSpinner(spinnerNode, y, false);
    }
  }

  render() {
    const { children, isLoading, spinnerSize, testId } = this.props;

    return (
      <Container testId={testId && `${testId}--loading--container--advanced`}>
        {/* eslint-disable-next-line @repo/internal/react/no-clone-element */}
        {React.cloneElement(children, {
          ref: (el: HTMLElement) => {
            this.children = el;
          },
        })}
        {isLoading && (
          <SpinnerBackdrop testId={testId}>
            <SpinnerContainer
              ref={(el: HTMLDivElement) => (this.spinnerRef = el)}
            >
              <Spinner
                size={spinnerSize}
                testId={testId && `${testId}--loadingSpinner`}
              />
            </SpinnerContainer>
          </SpinnerBackdrop>
        )}
      </Container>
    );
  }
}
