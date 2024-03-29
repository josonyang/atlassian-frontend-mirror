import { css } from '@emotion/react';

import { token } from '@atlaskit/tokens';

export const tabsWrapperStyles = css`
  margin-top: ${token('space.150', '12px')};
  margin-left: ${token('space.negative.100', '-8px')};
  margin-right: ${token('space.negative.100', '-8px')};
`;

export const spinnerContainerStyles = css`
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-grow: 1;
`;

export const flexColumnStyles = css`
  display: flex;
  flex-direction: column;
`;
