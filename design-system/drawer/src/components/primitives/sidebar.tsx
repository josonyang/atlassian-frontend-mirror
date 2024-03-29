/** @jsx jsx */

import { FC } from 'react';

import { css, CSSObject, jsx } from '@emotion/react';

import { N500 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { SidebarProps } from '../types';

const defaultStyle: CSSObject = {
  alignItems: 'center',
  boxSizing: 'border-box',
  color: token('color.text.subtle', N500),
  display: 'flex',
  flexShrink: 0,
  flexDirection: 'column',
  height: '100vh',
  paddingBottom: token('space.200', '16px'),
  paddingTop: token('space.300', '24px'),
  width: token('space.800', '64px'),
};

const sidebarCSS = (): CSSObject => defaultStyle;

const Sidebar: FC<SidebarProps> = ({ cssFn, ...props }) => {
  // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @repo/internal/react/no-unsafe-spread-props
  return <div css={css(cssFn(defaultStyle))} {...props} />;
};

export default {
  component: Sidebar,
  cssFn: sidebarCSS,
};
