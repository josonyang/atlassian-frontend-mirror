import { token } from '@atlaskit/tokens';
import { css } from '@emotion/react';
import { B75, N200 } from '@atlaskit/theme/colors';
import {
  SelectionStyle,
  getSelectionStyles,
  akEditorSelectedNodeClassName,
} from '@atlaskit/editor-shared-styles';

export const placeholderTextStyles = css`
  .ProseMirror span[data-placeholder] {
    color: ${token('color.text.subtlest', N200)};
    display: inline;
  }

  .ProseMirror span.pm-placeholder {
    display: inline;
    color: ${token('color.text.subtlest', N200)};
  }
  .ProseMirror span.pm-placeholder__text {
    display: inline;
    color: ${token('color.text.subtlest', N200)};
  }

  .ProseMirror span.pm-placeholder.${akEditorSelectedNodeClassName} {
    ${getSelectionStyles([SelectionStyle.Background])}
  }

  .ProseMirror span.pm-placeholder__text[data-placeholder]::after {
    color: ${token('color.text.subtlest', N200)};
    cursor: text;
    content: attr(data-placeholder);
    display: inline;
  }

  .ProseMirror {
    .ProseMirror-fake-text-cursor {
      display: inline;
      pointer-events: none;
      position: relative;
    }

    .ProseMirror-fake-text-cursor::after {
      content: '';
      display: inline;
      top: 0;
      position: absolute;
      border-right: 1px solid ${token('color.border', 'rgba(0, 0, 0, 0.4)')};
    }

    .ProseMirror-fake-text-selection {
      display: inline;
      pointer-events: none;
      position: relative;
      background-color: ${token('color.background.selected', B75)};
    }
  }
`;
