// TODO: remove this once ESLint rule has been fixed
/* eslint-disable @atlaskit/design-system/no-unsafe-design-token-usage */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import Stack from '@atlaskit/primitives/stack';

import { token } from '../src';

const fonts = [
  'font.heading.xxlarge',
  'font.heading.xlarge',
  'font.heading.large',
  'font.heading.medium',
  'font.heading.small',
  'font.heading.xsmall',
  'font.heading.xxsmall',
] as const;

const body = [
  'font.body.large',
  'font.body',
  'font.body.small',
  'font.ui',
  'font.ui.small',
  'font.code',
] as const;

export default () => {
  return (
    <Stack space="space.100" testId="typography">
      {fonts.map((f) => (
        <span key={f} style={{ font: token(f) }}>
          {f}
        </span>
      ))}
      {body.map((f) => (
        <span key={f} style={{ font: token(f) }}>
          {f}
        </span>
      ))}
    </Stack>
  );
};
