import { token } from '@atlaskit/tokens';
import { tokens } from '../../../../utils/token';
import { css } from '@emotion/react';
import { N40 } from '@atlaskit/theme/colors';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';

// in editor prosemirror adds padding-left so we need to overwrite it
// renderer overwrites the margin-right so we need to add it here
export const metadataBlockCss = css`
  /* primary element group */
  span[data-smart-element-avatar-group] {
    > ul {
      padding-left: 0px;
      margin-right: 0.5rem;
    }
  }
  [data-smart-element-group] {
    line-height: 1rem;
  }
`;
export const titleBlockCss = css`
  gap: 0.5em;
  ${getBooleanFF(
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design',
  )
    ? `[data-smart-element="Title"] {
          font-weight: 600;
        }`
    : ``}
`;

export const footerBlockCss = css`
  height: 1.5rem;

  .actions-button-group {
    button,
    button:hover,
    button:focus,
    button:active {
      font-size: 0.875rem;
    }
  }
`;

const flexibleBlockCardElevationStyle = css`
  border-radius: 1.5px;
  box-shadow: ${tokens.elevation};
  margin: ${token('space.025', '2px')};
`;

const refreshedFlexibleBlockCardStyle = css`
  & > div {
    border-radius: ${token('border.radius.200', '8px')};
    border: 1px solid ${token('color.border', N40)};
  }
`;

export const flexibleBlockCardStyle = getBooleanFF(
  'platform.linking-platform.smart-card.show-smart-links-refreshed-design',
)
  ? refreshedFlexibleBlockCardStyle
  : flexibleBlockCardElevationStyle;
