import { token } from '@atlaskit/tokens';
import { css } from '@emotion/react';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

export const ROW_HIGHLIGHT_CLASSNAME = 'media-table-row-highlighted';
export const ROW_CLASSNAME = 'media-table-row';

export const exampleWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .${ROW_HIGHLIGHT_CLASSNAME} {
    background-color: ${token('color.background.warning', colors.Y50)};

    &:hover {
      background-color: ${token(
        'color.background.warning.hovered',
        colors.Y75,
      )};
    }
  }
`;

export const greenOnHoverStyles = css`
  background-color: ${token('color.background.danger.bold', 'red')};
  height: 8px;
  width: 8px;

  .${ROW_CLASSNAME}:hover & {
    background-color: ${token(
      'color.background.success.bold.hovered',
      'green',
    )};
  }
`;
