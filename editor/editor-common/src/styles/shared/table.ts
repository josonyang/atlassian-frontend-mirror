/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */

import { css } from '@emotion/react';

import {
  tableCellContentDomSelector,
  tableCellSelector,
  tableHeaderSelector,
  TableLayout,
  tablePrefixSelector,
} from '@atlaskit/adf-schema';
import {
  akEditorBreakoutPadding,
  akEditorFullWidthLayoutWidth,
  akEditorSelectedNodeClassName,
  akEditorTableBorder,
  akEditorTableBorderDark,
  akEditorTableNumberColumnWidth,
  akEditorTableToolbar,
  akEditorTableToolbarDark,
  akEditorWideLayoutWidth,
  getTableCellBackgroundDarkModeColors,
  overflowShadow,
} from '@atlaskit/editor-shared-styles';
import { DN20 } from '@atlaskit/theme/colors';
import { themed } from '@atlaskit/theme/components';
import { ThemeProps } from '@atlaskit/theme/types';
import { token } from '@atlaskit/tokens';

import browser from '../../utils/browser';

import { CodeBlockSharedCssClassName } from './code-block';
import { tableCellBackgroundStyleOverride } from './tableCell';

export const tableMarginTop = 24;
export const tableMarginBottom = 16;
export const tableMarginTopWithControl = 14;
export const tableMarginSides = 8;
export const tableCellMinWidth = 48;
export const tableNewColumnMinWidth = 140;
export const tableCellBorderWidth = 1;
export const tableCellPadding = 8;
export const tableResizeHandleWidth = 6;

export const TableSharedCssClassName = {
  TABLE_CONTAINER: `${tablePrefixSelector}-container`,
  TABLE_NODE_WRAPPER: `${tablePrefixSelector}-wrapper`,
  TABLE_LEFT_SHADOW: `${tablePrefixSelector}-with-left-shadow`,
  TABLE_RIGHT_SHADOW: `${tablePrefixSelector}-with-right-shadow`,
  TABLE_STICKY_SHADOW: `${tablePrefixSelector}-sticky-shadow`,
  TABLE_STICKY_WRAPPER: `${tablePrefixSelector}-sticky-wrapper`,
  TABLE_STICKY_SENTINEL_TOP: `${tablePrefixSelector}-sticky-sentinel-top`,
  TABLE_STICKY_SENTINEL_BOTTOM: `${tablePrefixSelector}-sticky-sentinel-bottom`,
  TABLE_SHADOW_SENTINEL_LEFT: `${tablePrefixSelector}-shadow-sentinel-left`,
  TABLE_SHADOW_SENTINEL_RIGHT: `${tablePrefixSelector}-shadow-sentinel-right`,
  TABLE_CELL_NODEVIEW_CONTENT_DOM: tableCellContentDomSelector,
  TABLE_CELL_WRAPPER: tableCellSelector,
  TABLE_HEADER_CELL_WRAPPER: tableHeaderSelector,
  TABLE_ROW_CONTROLS_WRAPPER: `${tablePrefixSelector}-row-controls-wrapper`,
  TABLE_COLUMN_CONTROLS_DECORATIONS: `${tablePrefixSelector}-column-controls-decoration`,
  TABLE_RESIZER_CONTAINER: `${tablePrefixSelector}-resizer-container`,
};

const tableSharedStyle = (props: ThemeProps) => css`
  ${tableCellBackgroundStyleOverride()}
  .${TableSharedCssClassName.TABLE_CONTAINER} {
    position: relative;
    margin: 0 auto ${tableMarginBottom}px;
    box-sizing: border-box;

    /**
     * Fix block top alignment inside table cells.
     */
    .decisionItemView-content-wrap:first-of-type > div {
      margin-top: 0;
    }
  }
  .${TableSharedCssClassName.TABLE_CONTAINER}[data-number-column='true'] {
    padding-left: ${akEditorTableNumberColumnWidth - 1}px;
    clear: both;
  }
  .${TableSharedCssClassName.TABLE_NODE_WRAPPER} > table {
    margin: ${tableMarginTop}px 0 0 0;
  }

  .${TableSharedCssClassName.TABLE_CONTAINER} > table,
  .${TableSharedCssClassName.TABLE_STICKY_WRAPPER} > table {
    margin: ${tableMarginTop}px ${tableMarginSides}px 0 0;
  }

  /* avoid applying styles to nested tables (possible via extensions) */
  .${TableSharedCssClassName.TABLE_CONTAINER} > table,
  .${TableSharedCssClassName.TABLE_NODE_WRAPPER} > table,
  .${TableSharedCssClassName.TABLE_STICKY_WRAPPER} > table {
    border-collapse: collapse;
    border: ${tableCellBorderWidth}px solid
      ${themed({
        light: token(
          'color.background.accent.gray.subtler',
          akEditorTableBorder,
        ),
        dark: token(
          'color.background.accent.gray.subtler',
          akEditorTableBorderDark,
        ),
      })(props)};
    table-layout: fixed;
    font-size: 1em;
    width: 100%;

    &[data-autosize='true'] {
      table-layout: auto;
    }

    & {
      * {
        box-sizing: border-box;
      }
      hr {
        box-sizing: content-box;
      }

      tbody {
        border-bottom: none;
      }
      th td {
        background-color: ${token('color.background.neutral.subtle', 'white')};
      }
      th,
      td {
        min-width: ${tableCellMinWidth}px;
        font-weight: normal;
        vertical-align: top;
        border: 1px solid
          ${themed({
            light: token(
              'color.background.accent.gray.subtler',
              akEditorTableBorder,
            ),
            dark: token(
              'color.background.accent.gray.subtler',
              akEditorTableBorderDark,
            ),
          })(props)};
        border-right-width: 0;
        border-bottom-width: 0;
        padding: ${tableCellPadding}px;
        /* https://stackoverflow.com/questions/7517127/borders-not-shown-in-firefox-with-border-collapse-on-table-position-relative-o */
        ${browser.gecko || browser.ie || (browser.mac && browser.chrome)
          ? 'background-clip: padding-box;'
          : ''}

        ${themed({ dark: getTableCellBackgroundDarkModeColors })(props)};

        > :first-child:not(style),
        > style:first-child + * {
          margin-top: 0;
        }

        > .ProseMirror-gapcursor:first-child + *,
        > style:first-child + .ProseMirror-gapcursor + * {
          margin-top: 0;
        }

        > .ProseMirror-gapcursor:first-child + span + *,
        > style:first-child + .ProseMirror-gapcursor + span + * {
          margin-top: 0;
        }

        th p:not(:first-of-type),
        td p:not(:first-of-type) {
          margin-top: 12px;
        }
      }
      th {
        background-color: ${themed({
          light: token('color.background.neutral', akEditorTableToolbar),
          dark: token('color.background.neutral', akEditorTableToolbarDark),
        })(props)};
        text-align: left;

        /* only apply this styling to codeblocks in default background headercells */
        /* TODO this needs to be overhauled as it relies on unsafe selectors */
        &:not([style]):not(.danger) {
          .${CodeBlockSharedCssClassName.CODEBLOCK_CONTAINER}:not(.danger) {
            background-color: ${themed({
              light: token('elevation.surface.raised', 'rgb(235, 237, 240)'),
              dark: token('elevation.surface.raised', 'rgb(36, 47, 66)'),
            })(props)};

            :not(.${akEditorSelectedNodeClassName}) {
              box-shadow: 0px 0px 0px 1px
                ${token('color.border', 'transparent')};
            }

            .${CodeBlockSharedCssClassName.CODEBLOCK_CONTENT_WRAPPER} {
              background-image: ${overflowShadow({
                background: themed({
                  light: token(
                    'color.background.neutral',
                    'rgb(235, 237, 240)',
                  ),
                  dark: token('color.background.neutral', 'rgb(36, 47, 66)'),
                })(props),
                leftCoverWidth: token('space.300', '24px'),
              })};

              background-color: ${themed({
                light: token('color.background.neutral', 'rgb(235, 237, 240)'),
                dark: token('color.background.neutral', 'rgb(36, 47, 66)'),
              })(props)};
            }

            .${CodeBlockSharedCssClassName.CODEBLOCK_LINE_NUMBER_GUTTER} {
              background-color: ${themed({
                light: token('color.background.neutral', 'rgb(226, 229, 233)'),
                dark: token('color.background.neutral', DN20),
              })(props)};
            }

            /* this is only relevant to the element taken care of by renderer */
            > [data-ds--code--code-block] {
              background-image: ${overflowShadow({
                background: themed({
                  light: token(
                    'color.background.neutral',
                    'rgb(235, 237, 240)',
                  ),
                  dark: token('color.background.neutral', 'rgb(36, 47, 66)'),
                })(props),
                leftCoverWidth: token('space.300', '24px'),
              })}!important;

              background-color: ${themed({
                light: token('color.background.neutral', 'rgb(235, 237, 240)'),
                dark: token('color.background.neutral', 'rgb(36, 47, 66)'),
              })(props)}!important;

              // selector lives inside @atlaskit/code
              --ds--code--line-number-bg-color: ${themed({
                light: token('color.background.neutral', 'rgb(226, 229, 233)'),
                dark: token('color.background.neutral', DN20),
              })(props)};
            }
          }
        }
      }
    }
  }
`;

export const calcTableWidth = (
  layout: TableLayout,
  containerWidth?: number,
  addControllerPadding: boolean = true,
): number | 'inherit' => {
  switch (layout) {
    case 'full-width':
      return containerWidth
        ? Math.min(
            containerWidth -
              (addControllerPadding ? akEditorBreakoutPadding : 0),
            akEditorFullWidthLayoutWidth,
          )
        : akEditorFullWidthLayoutWidth;
    case 'wide':
      if (containerWidth) {
        return Math.min(
          containerWidth - (addControllerPadding ? akEditorBreakoutPadding : 0),
          akEditorWideLayoutWidth,
        );
      }

      return akEditorWideLayoutWidth;
    default:
      return 'inherit';
  }
};

export { tableSharedStyle };
