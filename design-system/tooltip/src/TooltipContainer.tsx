/** @jsx jsx */
import { forwardRef } from 'react';

import { css, jsx } from '@emotion/react';

import { N0, N800 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import TooltipPrimitive, { TooltipPrimitiveProps } from './TooltipPrimitive';

export interface TooltipContainerProps extends TooltipPrimitiveProps {}

const baseStyles = css({
  boxSizing: 'border-box',
  maxWidth: '240px',
  padding: `${token('space.025', '2px')} ${token('space.075', '6px')}`,
  insetBlockStart: token('space.0', '0px'),
  insetInlineStart: token('space.0', '0px'),
  borderRadius: token('border.radius', '3px'),
  fontSize: token('font.size.075', '12px'),
  lineHeight: 1.3,
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  backgroundColor: token('color.background.neutral.bold', N800),
  color: token('color.text.inverse', N0),
});

const truncateStyles = css({
  maxWidth: '420px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const TooltipContainer = forwardRef<HTMLDivElement, TooltipContainerProps>(
  function TooltipContainer(
    {
      style,
      className,
      children,
      truncate,
      placement,
      testId,
      onMouseOut,
      onMouseOver,
      id,
    },
    ref,
  ) {
    return (
      <TooltipPrimitive
        ref={ref}
        style={style}
        className={className}
        placement={placement}
        testId={testId}
        id={id}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        css={[baseStyles, truncate ? truncateStyles : null]}
      >
        {children}
      </TooltipPrimitive>
    );
  },
);

TooltipContainer.displayName = 'TooltipContainer';

export default TooltipContainer;
