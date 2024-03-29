/* eslint-disable @repo/internal/react/require-jsdoc */
/** @jsx jsx */
import { FC, forwardRef, HTMLProps, ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import { token } from '@atlaskit/tokens';

const containerStyles = css({
  marginBottom: token('space.300', '24px'),
  position: 'relative',
});

type ContainerProps = HTMLProps<HTMLDivElement> & { testId?: string };

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { children, testId, ...rest } = props;
    return (
      // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
      <div css={containerStyles} {...rest} data-testid={testId} ref={ref}>
        {children}
      </div>
    );
  },
);

const spinnerBackdropStyles = css({
  display: 'flex',
  position: 'absolute',
  inset: 0,
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
});

type SpinnerBackdropProps = {
  testId?: string;
  children: ReactNode;
};

export const SpinnerBackdrop: FC<SpinnerBackdropProps> = ({
  children,
  testId,
}) => (
  <div
    css={spinnerBackdropStyles}
    data-testid={testId && `${testId}--spinner-backdrop`}
  >
    {children}
  </div>
);

const spinnerContainerStyles = css({
  position: 'relative',
  // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
  top: 0,
});

export const SpinnerContainer = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(({ children }, ref) => (
  <div css={spinnerContainerStyles} ref={ref}>
    {children}
  </div>
));
