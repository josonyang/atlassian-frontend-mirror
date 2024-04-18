import { Box } from '@atlaskit/primitives';
import React, { useEffect, useRef, useState } from 'react';
import type { AIMotionWrapperProps } from './types';

export const AIMotionWrapper = ({
  children,
  isFadeIn = false,
  minHeight = 0,
  show,
  showTransition = false,
}: AIMotionWrapperProps) => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const transition = isFadeIn ? 'height, opacity' : 'height';

  useEffect(() => {
    if (show && ref.current) {
      // set the height of the error message container explicitly to the height
      // of its contents (including anything hidden due to overflow) so that we
      // can animate the height of the container
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [children, show]);

  return show ? (
    <Box
      style={{
        height,
        minHeight,
        lineHeight: 0,
        overflow: 'hidden',
        // a fit for purpose state variable to control when the 'visible' styles should be appled
        opacity: height > 0 ? 1 : 0,
        // we only want to transition opacity and height when the error message is initially shown
        // not if its to be shown on mount
        transitionProperty: showTransition ? transition : 'none',
        transitionDuration: '0.3s',
      }}
      ref={ref}
    >
      {children}
    </Box>
  ) : null;
};

export default AIMotionWrapper;
