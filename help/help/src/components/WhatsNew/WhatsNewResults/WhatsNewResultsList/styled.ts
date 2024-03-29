/** @jsx jsx */

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { fontSizeSmall } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';
import * as colors from '@atlaskit/theme/colors';

export const truncate = (width: string = '100%') => css`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${width};
`;

export const WhatsNewResultsListContainer = styled.div`
  position: relative;
`;

export const WhatsNewResultsListGroupWrapper = styled.div`
  padding: ${token('space.100', '8px')} 0 ${token('space.100', '8px')} 0;
`;

export const WhatsNewResultsListGroupTitle = styled.div`
  color: ${token('color.text.subtlest', colors.N200)};
  font-size: ${fontSizeSmall()}px;
  font-weight: bold;
  padding: 0 ${token('space.100', '8px')} ${token('space.100', '8px')}
    ${token('space.100', '8px')};
  text-transform: uppercase;
`;

export const ToggleShowWhatsNewResultsContainer = styled.div`
  padding: ${token('space.100', '8px')} 0;
  span {
    margin: 0;
  }
`;
