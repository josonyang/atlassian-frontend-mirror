import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type {
  EditorState,
  // @ts-ignore -- ReadonlyTransaction is a local declaration and will cause a TS2305 error in CCFE typecheck
  ReadonlyTransaction,
  Transaction,
} from '@atlaskit/editor-prosemirror/state';
import { PluginKey } from '@atlaskit/editor-prosemirror/state';
import { DecorationSet } from '@atlaskit/editor-prosemirror/view';
import { CellSelection } from '@atlaskit/editor-tables/cell-selection';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';

import { pluginKey as tablePluginKey } from '../plugin-key';
import { pluginKey as tableWidthPluginKey } from '../table-width';

import {
  buildColumnControlsDecorations,
  maybeUpdateColumnControlsSelectedDecoration,
} from './utils';

export const pluginKey = new PluginKey('tableDecorationsPlugin');

export const getDecorations = (state: EditorState): DecorationSet =>
  pluginKey.getState(state);

export const handleDocOrSelectionChanged = (
  tr: Transaction | ReadonlyTransaction,
  decorationSet: DecorationSet,
  oldState: EditorState,
  newState: EditorState,
): DecorationSet => {
  const isResizing = tableWidthPluginKey.getState(newState)?.resizing;
  const wasResizing = tableWidthPluginKey.getState(oldState)?.resizing;

  const changedResizing = isResizing !== wasResizing;

  // Remove column controls when resizing and don't add column decoration controls when DnD enabled
  if (isResizing || getBooleanFF('platform.editor.table.drag-and-drop')) {
    return DecorationSet.empty;
  } else if (
    tr.docChanged ||
    tr.selection instanceof CellSelection ||
    changedResizing
  ) {
    return buildColumnControlsDecorations({
      decorationSet,
      tr,
    });
  } else if (tr.selectionSet) {
    const isTransactionFromMouseClick =
      !tr.docChanged && tr.selectionSet && tr.getMeta('pointer');
    if (
      isTransactionFromMouseClick ||
      oldState.selection instanceof CellSelection
    ) {
      return maybeUpdateColumnControlsSelectedDecoration({
        decorationSet,
        tr,
      });
    }
  }

  return decorationSet;
};

export const createPlugin = () => {
  return new SafePlugin({
    state: {
      init: () => DecorationSet.empty,

      apply: (tr, decorationSet, oldState, newState) => {
        let pluginState = decorationSet;
        const meta = tr.getMeta(tablePluginKey);

        if (meta && meta.data && meta.data.decorationSet) {
          pluginState = meta.data.decorationSet;
        }

        if (
          tr.docChanged ||
          tr.selectionSet ||
          tr.getMeta(tableWidthPluginKey)
        ) {
          pluginState = pluginState.map(tr.mapping, tr.doc);
          return handleDocOrSelectionChanged(
            tr,
            pluginState,
            oldState,
            newState,
          );
        }

        return pluginState;
      },
    },
    key: pluginKey,
    props: {
      decorations: (state) => getDecorations(state),
    },
  });
};
