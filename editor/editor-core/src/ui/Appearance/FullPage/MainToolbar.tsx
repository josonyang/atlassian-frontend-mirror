import { css } from '@emotion/react';
import { N30 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import {
  akEditorMenuZIndex,
  akEditorSwoopCubicBezier,
  akEditorToolbarKeylineHeight,
  akEditorMobileMaxWidth,
} from '@atlaskit/editor-shared-styles';

export const MAXIMUM_TWO_LINE_TOOLBAR_BREAKPOINT = 868;

export interface MainToolbarProps {
  showKeyline: boolean;
  twoLineEditorToolbar: boolean;
}

const toolbarLineHeight = 56;

const mainToolbarWithKeyline = css`
  box-shadow: 0 ${akEditorToolbarKeylineHeight}px 0 0 ${N30};
`;

const mainToolbarTwoLineStyle = css`
  @media (max-width: ${MAXIMUM_TWO_LINE_TOOLBAR_BREAKPOINT}px) {
    flex-wrap: wrap;
    height: calc(${toolbarLineHeight}px * 2);
  }
`;

const mainToolbar = css`
  position: relative;
  align-items: center;
  box-shadow: none;
  transition: box-shadow 200ms ${akEditorSwoopCubicBezier};
  z-index: ${akEditorMenuZIndex};
  display: flex;
  height: ${toolbarLineHeight}px;
  flex-shrink: 0;
  background-color: white;

  & object {
    height: 0 !important;
  }

  @media (max-width: ${akEditorMobileMaxWidth}px) {
    display: grid;
    height: calc(${toolbarLineHeight}px * 2);
  }
`;

export const mainToolbarStyle = (
  showKeyline: boolean,
  twoLineEditorToolbar: boolean,
) => [
  mainToolbar,
  showKeyline && mainToolbarWithKeyline,
  twoLineEditorToolbar && mainToolbarTwoLineStyle,
];

export const mainToolbarIconBeforeStyle = css`
  margin: ${gridSize() * 2}px;
  height: ${gridSize() * 4}px;
  width: ${gridSize() * 4}px;
  @media (max-width: ${akEditorMobileMaxWidth}px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

const mainToolbarFirstChild = css`
  display: flex;
  flex-grow: 1;

  @media (max-width: ${akEditorMobileMaxWidth}px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

const mainToolbarFirstChildTowLine = css`
  @media (max-width: ${MAXIMUM_TWO_LINE_TOOLBAR_BREAKPOINT}px) {
    flex: 1 1 100%;
    height: ${toolbarLineHeight}px;
    justify-content: flex-end;
    // ED-10241: We add fit-content to ensure that MainToolbar does not
    // shrink more than the size of its contents. This will prevent the
    // find/replace icon from being overlapped during a confluence
    // publish operation
    min-width: fit-content;
  }
`;

export const mainToolbarFirstChildStyle = (twoLineEditorToolbar: boolean) => [
  mainToolbarFirstChild,
  twoLineEditorToolbar && mainToolbarFirstChildTowLine,
];

const mainToolbarSecondChild = css`
  // ED-10241: We add fit-content to ensure that MainToolbar does not
  // shrink more than the size of its contents. This will prevent the
  // find/replace icon from being overlapped during a confluence
  // publish operation
  min-width: fit-content;
`;

const mainToolbarSecondChildTwoLine = css`
  @media (max-width: ${MAXIMUM_TWO_LINE_TOOLBAR_BREAKPOINT}px) {
    display: flex;
    flex-grow: 1;
    flex: 1 1 100%;
    margin: auto;
    height: ${toolbarLineHeight}px;
    min-width: 0;
  }
`;

export const mainToolbarSecondChildStyle = (twoLineEditorToolbar: boolean) => [
  mainToolbarSecondChild,
  twoLineEditorToolbar && mainToolbarSecondChildTwoLine,
];

export const nonCustomToolbarWrapperStyle = css`
  align-items: center;
  display: flex;
  flex-grow: 1;
`;

export const customToolbarWrapperStyle = css`
  align-items: center;
  display: flex;
`;
