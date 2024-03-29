/** @jsx jsx */

import { ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import { token } from '@atlaskit/tokens';

import { cssVar } from '../../../constants';

interface BeforeProps {
  elemBefore?: ReactNode;
}

const beforeElementStyles = css({
  display: 'flex',
  position: 'absolute',
  top: token('space.0', '0px'),
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: `var(${cssVar.borderRadius})`,
});

const Before = ({ elemBefore }: BeforeProps) =>
  elemBefore ? <span css={beforeElementStyles}>{elemBefore}</span> : null;

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default Before;
