import { css } from '@emotion/react';
import { token } from '@atlaskit/tokens';
import * as colors from '@atlaskit/theme/colors';
import { DEFAULT_BORDER_COLOR } from '@atlaskit/editor-common/ui-color';
import { N20A, N50, N60A, N90, N800, N0 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

// menuItemDimensions and itemSpacing are copied from
// packages/editor/editor-core/src/plugins/floating-toolbar/ui/DropdownMenu.tsx

export const menuItemDimensions = {
  width: 175,
  height: 32,
};

export const itemSpacing = gridSize() / 2;

export const contextualMenuArrow = css`
  display: flex;
  &::after {
    content: '›';
    margin-left: 4px;
    line-height: 20px;
    color: ${token('color.icon', N90)};
  }
`;

export const contextualMenuColorIcon = (color?: string) => css`
  ${contextualMenuArrow}
  &::before {
    content: '';
    display: block;
    border: 1px solid ${DEFAULT_BORDER_COLOR};
    border-radius: ${token('border.radius.100', '3px')};
    width: 20px;
    height: 20px;
    ${color && `background: ${color}`}
  }
`;

export const contextualSubMenu = (index: number) => css`
  border-radius: ${token('border.radius.100', '3px')};
  background: ${token('elevation.surface.overlay', 'white')};
  box-shadow: ${token(
    'elevation.shadow.overlay',
    `0 4px 8px -2px ${N60A}, 0 0 1px ${N60A}`,
  )};
  display: flex;
  position: absolute;
  top: ${index * (menuItemDimensions.height + itemSpacing * 2)}px;
  left: ${menuItemDimensions.width}px;
  padding: 8px;

  > div {
    padding: 0;
  }
`;

export const buttonStyle = (selected: boolean) => css`
  height: 26px;
  width: 26px;
  padding: 0;
  border-radius: 4px;
  background-color: ${selected
    ? token('color.text', N800)
    : token('color.background.neutral', N20A)};
  border: 1px solid ${DEFAULT_BORDER_COLOR};
  cursor: pointer;
  display: block;
`;

/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
export const buttonWrapperStyle = css`
  border: 1px solid transparent;
  margin: 1px;
  font-size: 0;
  display: flex;
  align-items: center;
  padding: 1px;
  border-radius: 6px;
  &:focus-within,
  &:focus,
  &:hover {
    border-color: ${N50} !important;
  }
`;

export const line = (size: number, selected: boolean) => css`
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: ${size}px;
    background-color: ${selected
      ? token('color.icon.inverse', N0)
      : token('color.icon', '#44546F')};
    border-radius: 90px;
    transform: translate(-50%, -50%) rotate(135deg);
  }
`;

export const toolbarButtonWrapper = ({
  enabled,
  isOpen,
}: {
  enabled: boolean;
  isOpen: boolean;
}) => css`
  display: flex;
  .image-border-toolbar-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding: 0;
    & > span {
      margin: 0;
    }
  }
  .image-border-toolbar-dropdown {
    padding: 0;
    & > span {
      margin: 0;
    }
    width: 16px !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    margin-left: 1px;
  }

  &:hover {
    .image-border-toolbar-btn {
      ${!enabled &&
      ` background: ${token(
        'color.background.neutral.subtle.hovered',
        colors.N30A,
      )};`}
    }

    .image-border-toolbar-dropdown {
      ${!isOpen &&
      `background: ${token(
        'color.background.neutral.subtle.hovered',
        colors.N30A,
      )};`}
    }
  }
`;