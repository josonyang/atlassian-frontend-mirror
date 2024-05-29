import React from 'react';

import { token } from '@atlaskit/tokens';

import { Skeleton } from '../../src';

const AvatarSkeletonColorDefaultExample = () => {
  return (
// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
    <div style={{ color: token('color.background.accent.purple.subtler') }}>
      <Skeleton />
    </div>
  );
};

export default AvatarSkeletonColorDefaultExample;
