import type { IntlShape } from 'react-intl-next/src/types';

import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import {
  addColumnAfter,
  addColumnBefore,
  addRowAfter,
  addRowBefore,
  backspace,
  bindKeymapWithCommand,
  decreaseMediaSize,
  deleteColumn,
  deleteRow,
  escape,
  increaseMediaSize,
  moveColumnLeft,
  moveColumnRight,
  moveLeft,
  moveRight,
  moveRowDown,
  moveRowUp,
  nextCell,
  previousCell,
  startColumnResizing,
  toggleTable,
} from '@atlaskit/editor-common/keymaps';
import type { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { GetEditorContainerWidth } from '@atlaskit/editor-common/types';
import { chainCommands } from '@atlaskit/editor-prosemirror/commands';
import { keymap } from '@atlaskit/editor-prosemirror/keymap';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';

import { goToNextCell, moveCursorBackward } from '../commands';
import {
  addRowAroundSelection,
  changeColumnWidthByStepWithAnalytics,
  deleteSelectedRowsOrColumnsWithAnalyticsViaShortcut,
  deleteTableIfSelectedWithAnalytics,
  emptyMultipleCellsWithAnalytics,
} from '../commands-with-analytics';
import {
  activateNextResizeArea,
  initiateKeyboardColumnResizing,
  stopKeyboardColumnResizing,
} from '../commands/column-resize';
import {
  addColumnAfter as addColumnAfterCommand,
  addColumnBefore as addColumnBeforeCommand,
  createTable,
} from '../commands/insert';
import { moveSourceWithAnalyticsViaShortcut } from '../pm-plugins/drag-and-drop/commands-with-analytics';
import type { PluginInjectionAPIWithA11y } from '../types';

export function keymapPlugin(
  getEditorContainerWidth: GetEditorContainerWidth,
  editorAnalyticsAPI: EditorAnalyticsAPI | undefined | null,
  dragAndDropEnabled?: boolean,
  isTableScalingEnabled = false,
  isFullWidthEnabled?: boolean,
  pluginInjectionApi?: PluginInjectionAPIWithA11y,
  getIntl?: () => IntlShape,
): SafePlugin {
  const list = {};

  const ariaNotifyPlugin =
    pluginInjectionApi?.accessibilityUtils?.actions.ariaNotify;

  bindKeymapWithCommand(
    nextCell.common!,
    goToNextCell(editorAnalyticsAPI, ariaNotifyPlugin, getIntl)(1),
    list,
  );
  bindKeymapWithCommand(
    previousCell.common!,
    goToNextCell(editorAnalyticsAPI, ariaNotifyPlugin, getIntl)(-1),
    list,
  );
  bindKeymapWithCommand(
    toggleTable.common!,
    createTable(
      isTableScalingEnabled,
      !!isFullWidthEnabled,
      editorAnalyticsAPI,
    ),
    list,
  );
  bindKeymapWithCommand(
    backspace.common!,
    chainCommands(
      deleteTableIfSelectedWithAnalytics(editorAnalyticsAPI)(
        INPUT_METHOD.KEYBOARD,
      ),
      emptyMultipleCellsWithAnalytics(editorAnalyticsAPI)(
        INPUT_METHOD.KEYBOARD,
      ),
    ),
    list,
  );
  bindKeymapWithCommand(backspace.common!, moveCursorBackward, list);

  // Add row/column shortcuts
  bindKeymapWithCommand(
    addRowBefore.common!,
    addRowAroundSelection(editorAnalyticsAPI)('TOP'),
    list,
  );

  bindKeymapWithCommand(
    addRowAfter.common!,
    addRowAroundSelection(editorAnalyticsAPI)('BOTTOM'),
    list,
  );

  bindKeymapWithCommand(
    addColumnBefore.common!,
    addColumnBeforeCommand(isTableScalingEnabled),
    list,
  );

  bindKeymapWithCommand(
    addColumnAfter.common!,
    addColumnAfterCommand(isTableScalingEnabled),
    list,
  );

  if (dragAndDropEnabled) {
    // Move row/column shortcuts
    /**
     * NOTE: If the keyboard shortcut for moving rows or columns is changed, we need to update the handleKeyDown function
     * in packages/editor/editor-plugin-table/src/pm-plugins/drag-and-drop/plugin.ts
     * to make sure the logic for holding the shortcut keys is valid
     * See ticket ED-22154 https://product-fabric.atlassian.net/browse/ED-22154
     */

    bindKeymapWithCommand(
      moveRowDown.common!,
      moveSourceWithAnalyticsViaShortcut(editorAnalyticsAPI)('table-row', 1),
      list,
    );

    bindKeymapWithCommand(
      moveRowUp.common!,
      moveSourceWithAnalyticsViaShortcut(editorAnalyticsAPI)('table-row', -1),
      list,
    );

    bindKeymapWithCommand(
      moveColumnLeft.common!,
      moveSourceWithAnalyticsViaShortcut(editorAnalyticsAPI)(
        'table-column',
        -1,
      ),
      list,
    );

    bindKeymapWithCommand(
      moveColumnRight.common!,
      moveSourceWithAnalyticsViaShortcut(editorAnalyticsAPI)('table-column', 1),
      list,
    );

    // Delete row/column shortcuts
    bindKeymapWithCommand(
      deleteColumn.common!,
      deleteSelectedRowsOrColumnsWithAnalyticsViaShortcut(editorAnalyticsAPI),
      list,
    );

    bindKeymapWithCommand(
      deleteRow.common!,
      deleteSelectedRowsOrColumnsWithAnalyticsViaShortcut(editorAnalyticsAPI),
      list,
    );
  }

  if (getBooleanFF('platform.editor.a11y-column-resizing_emcvz')) {
    bindKeymapWithCommand(
      startColumnResizing.common!,
      initiateKeyboardColumnResizing({
        ariaNotify: ariaNotifyPlugin,
        getIntl: getIntl,
      }),
      list,
    );

    bindKeymapWithCommand(
      moveRight.common!,
      activateNextResizeArea({
        direction: 1,
        ariaNotify: ariaNotifyPlugin,
        getIntl: getIntl,
      }),
      list,
    );

    bindKeymapWithCommand(
      moveLeft.common!,
      activateNextResizeArea({
        direction: -1,
        ariaNotify: ariaNotifyPlugin,
        getIntl: getIntl,
      }),
      list,
    );

    bindKeymapWithCommand(
      decreaseMediaSize.common!,
      changeColumnWidthByStepWithAnalytics(editorAnalyticsAPI)(
        -10,
        getEditorContainerWidth,
        isTableScalingEnabled,
        INPUT_METHOD.SHORTCUT,
        ariaNotifyPlugin,
        getIntl,
      ),
      list,
    );

    bindKeymapWithCommand(
      increaseMediaSize.common!,
      changeColumnWidthByStepWithAnalytics(editorAnalyticsAPI)(
        10,
        getEditorContainerWidth,
        isTableScalingEnabled,
        INPUT_METHOD.SHORTCUT,
        ariaNotifyPlugin,
        getIntl,
      ),
      list,
    );
    bindKeymapWithCommand(
      escape.common!,
      stopKeyboardColumnResizing({
        ariaNotify: ariaNotifyPlugin,
        getIntl: getIntl,
      }),
      list,
    );
  }

  return keymap(list) as SafePlugin;
}

export default keymapPlugin;
