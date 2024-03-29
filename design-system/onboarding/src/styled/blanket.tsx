/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { DN90A, N100A } from '@atlaskit/theme/colors';
import { themed, useGlobalTheme } from '@atlaskit/theme/components';
import { layers } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';

const backgroundColor = themed({
  light: token('color.blanket', N100A),
  dark: token('color.blanket', DN90A),
});

// IE11 and Edge: z-index needed because fixed position calculates z-index relative
// to body instead of nearest stacking context (Portal in our case).
const blanketStyles = css({
  position: 'fixed',
  zIndex: layers.spotlight(),
  inset: 0,
  transition: 'opacity 220ms',
});

type BlanketProps = {
  isTinted?: boolean;
  style?: React.CSSProperties;
};

/**
 * __Blanket__
 *
 * A replacement for `@atlaskit/blanket`.
 *
 * We use this for spotlights instead of `@atlaskit/blanket`
 * because spotlights must sit on top of other layered elements,
 * such as modals, which have their own blankets.
 *
 * @internal
 */
const Blanket = (props: BlanketProps) => {
  const theme = useGlobalTheme();
  return (
    <div
      css={blanketStyles}
      style={
        {
          ...props.style,
          backgroundColor: props.isTinted
            ? backgroundColor({ theme })
            : 'transparent',
        } as React.CSSProperties
      }
    />
  );
};

export default Blanket;
