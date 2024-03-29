/** @jsx jsx */
import { memo } from 'react';
import { css, jsx } from '@emotion/react';

import type { SVGProps } from '../types';
import { getBackground } from './utils';
import { commonSVGStyles, sizeStyleMap } from './styles';

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
const svgStyles = css(commonSVGStyles);

/**
 * __SVG__
 *
 * An icon is used as a visual representation of common actions and commands to provide context.
 *
 * - [Examples](https://atlaskit.atlassian.com/packages/design-system/icon)
 * - [Code](https://atlaskit.atlassian.com/packages/design-system/icon/docs/custom-svgs)
 */
const SVG = memo(function SVG({
  size = 'medium',
  label,
  primaryColor = 'currentColor',
  secondaryColor,
  testId,
  children,
}: SVGProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        color: primaryColor,
        fill: secondaryColor || getBackground(),
      }}
      css={[svgStyles, sizeStyleMap[size]]}
      data-testid={testId}
      aria-label={label || undefined}
      role={label ? 'img' : 'presentation'}
    >
      {children}
    </svg>
  );
});

export default SVG;
