import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import {
  EditorState,
  PluginKey,
  Transaction,
  ReadonlyTransaction,
} from 'prosemirror-state';
import { CellSelection } from '@atlaskit/editor-tables/cell-selection';
import { DecorationSet } from 'prosemirror-view';

import { pluginKey as tablePluginKey } from '../plugin-key';

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
): DecorationSet => {
  if (tr.docChanged || tr.selection instanceof CellSelection) {
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

      apply: (tr, decorationSet, oldState) => {
        let pluginState = decorationSet;
        const meta = tr.getMeta(tablePluginKey);
        if (meta && meta.data && meta.data.decorationSet) {
          pluginState = meta.data.decorationSet;
        }

        if (tr.docChanged || tr.selectionSet) {
          pluginState = pluginState.map(tr.mapping, tr.doc);
          return handleDocOrSelectionChanged(tr, pluginState, oldState);
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
