/** @jsx jsx */
import { ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import { N30A, N40A } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

type DummyProps = {
  hasMargin?: boolean;
  children?: ReactNode;
};

const dummyStyles = {
  base: css({
    background: token('color.background.neutral', N30A),
  }),
  nested: css({
    background: token('color.background.neutral.hovered', N40A),
  }),
  margin: css({
    marginBottom: token('space.100', '8px'),
  }),
};

export const Dummy = ({ children, hasMargin = false }: DummyProps) => (
  <div css={[dummyStyles.base, hasMargin && dummyStyles.margin]}>
    {children}
  </div>
);

export const DummyNested = ({ children, hasMargin = false }: DummyProps) => (
  <div css={[dummyStyles.nested, hasMargin && dummyStyles.margin]}>
    {children}
  </div>
);
