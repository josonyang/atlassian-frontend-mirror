import { css } from '@emotion/react';

import {
  RECENT_SEARCH_WIDTH_IN_PX,
  RECENT_SEARCH_WIDTH_WITHOUT_ITEMS_IN_PX,
} from '../../ui';

export const inputWrapper = css`
  display: flex;
  line-height: 0;
  padding: 5px 0;
  align-items: center;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0;

  width: ${RECENT_SEARCH_WIDTH_WITHOUT_ITEMS_IN_PX}px;
  line-height: initial;
`;

export const containerWithProvider = css`
  width: ${RECENT_SEARCH_WIDTH_IN_PX}px;
`;
