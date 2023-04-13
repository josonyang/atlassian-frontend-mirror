import { css } from '@emotion/react';
import { N30 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

export { shortcutStyle } from '@atlaskit/editor-shared-styles/shortcut';
export { scrollbarStyles } from '@atlaskit/editor-shared-styles/scrollbar';

export const buttonGroupStyle = css`
  display: inline-flex;
  align-items: center;

  & > div {
    display: flex;
  }
`;

export const separatorStyles = css`
  background: ${token('color.border', N30)};
  width: 1px;
  height: 24px;
  display: inline-block;
  margin: 0 8px;
  user-select: none;
`;

export const wrapperStyle = css`
  display: flex;
  align-items: center;

  > div,
  > span {
    display: flex;
  }

  > div > div {
    display: flex;
  }

  margin-left: 0;
  min-width: auto;
`;

export const wrapperSmallStyle = css`
  margin-left: 4px;
  min-width: 40px;
`;

export const expandIconWrapperStyle = css`
  margin-left: -8px;
`;

export const triggerWrapperStyles = css`
  display: flex;
`;

export const buttonContentStyle = css`
  display: flex;
  min-width: 80px;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  flex-direction: column;
  padding: 6px;
`;

export const buttonContentReducedSpacingStyle = css`
  padding: 8px;
`;

export const clickSelectWrapperStyle = css`
  user-select: all;
`;

export const centeredToolbarContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
`;
