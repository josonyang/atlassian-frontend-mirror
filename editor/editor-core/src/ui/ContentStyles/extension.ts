import { css } from '@emotion/react';

import {
  akEditorDeleteBackground,
  akEditorDeleteBorder,
  akEditorSelectedBorderSize,
  akEditorSelectedNodeClassName,
  blockNodesVerticalMargin,
  getSelectionStyles,
  SelectionStyle,
} from '@atlaskit/editor-shared-styles';
import { token } from '@atlaskit/tokens';

// eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage, @atlaskit/design-system/no-css-tagged-template-expression, @atlaskit/design-system/no-exported-css -- Needs manual remediation
export const extensionStyles = css`
  .multiBodiedExtensionView-content-wrap {
    &.danger > span > .multiBodiedExtension--container {
      box-shadow: 0 0 0 ${akEditorSelectedBorderSize}px
        ${token('color.border.danger', akEditorDeleteBorder)};
      background-color: ${token(
        'color.background.danger',
        akEditorDeleteBackground,
      )};
    }
    &:not(.danger).${akEditorSelectedNodeClassName} {
      & > span > .multiBodiedExtension--container {
        ${getSelectionStyles([
          SelectionStyle.BoxShadow,
          SelectionStyle.Blanket,
        ])}
      }
    }
    .multiBodiedExtension--container {
      width: 100%;
      max-width: 100%; // ensure width can't go over 100%;
    }
  }

  .inlineExtensionView-content-wrap {
    &.danger > span > .extension-container {
      box-shadow: 0 0 0 ${akEditorSelectedBorderSize}px
        ${token('color.border.danger', akEditorDeleteBorder)};
      background-color: ${token(
        'color.background.danger',
        akEditorDeleteBackground,
      )};
    }

    &:not(.danger).${akEditorSelectedNodeClassName} {
      & > span > .extension-container {
        ${getSelectionStyles([SelectionStyle.BoxShadow])}
      }
    }
  }

  .extensionView-content-wrap,
  .multiBodiedExtensionView-content-wrap,
  .bodiedExtensionView-content-wrap {
    margin: ${blockNodesVerticalMargin} 0;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }

    &:not(.danger).${akEditorSelectedNodeClassName} {
      & > span > .extension-container {
        ${getSelectionStyles([SelectionStyle.BoxShadow])}
      }
    }

    &.danger > span > .extension-container {
      box-shadow: 0 0 0 ${akEditorSelectedBorderSize}px
        ${token('color.border.danger', akEditorDeleteBorder)};
      background-color: ${token(
        'color.background.danger',
        akEditorDeleteBackground,
      )};
    }

    &.inline {
      word-wrap: break-all;
    }
  }

  .extensionView-content-wrap .extension-container {
    overflow: hidden;
  }

  .bodiedExtensionView-content-wrap
    .extensionView-content-wrap
    .extension-container {
    width: 100%;
    max-width: 100%; // ensure width can't go over 100%;
  }

  [data-mark-type='fragment'] {
    & > .extensionView-content-wrap,
    & > .bodiedExtensionView-content-wrap {
      margin: ${blockNodesVerticalMargin} 0;
    }

    & > [data-mark-type='dataConsumer'] {
      & > .extensionView-content-wrap,
      & > .bodiedExtensionView-content-wrap {
        margin: ${blockNodesVerticalMargin} 0;
      }
    }

    &:first-child {
      & > .extensionView-content-wrap,
      & > .bodiedExtensionView-content-wrap {
        margin-top: 0;
      }

      & > [data-mark-type='dataConsumer'] {
        & > .extensionView-content-wrap,
        & > .bodiedExtensionView-content-wrap {
          margin-top: 0;
        }
      }
    }

    &:nth-last-of-type(-n + 2):not(:first-of-type) {
      & > .extensionView-content-wrap,
      & > .bodiedExtensionView-content-wrap {
        margin-bottom: 0;
      }

      & > [data-mark-type='dataConsumer'] {
        & > .extensionView-content-wrap,
        & > .bodiedExtensionView-content-wrap {
          margin-bottom: 0;
        }
      }
    }
  }
`;
