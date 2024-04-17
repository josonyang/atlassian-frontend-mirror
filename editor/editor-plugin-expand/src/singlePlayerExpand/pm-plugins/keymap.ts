import {
  backspace,
  bindKeymapWithCommand,
  moveDown,
  moveUp,
} from '@atlaskit/editor-common/keymaps';
import type { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { GapCursorSelection, Side } from '@atlaskit/editor-common/selection';
import { findExpand } from '@atlaskit/editor-common/transforms';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import {
  isEmptyNode,
  isPositionNearTableRow,
} from '@atlaskit/editor-common/utils';
import { keymap } from '@atlaskit/editor-prosemirror/keymap';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { Selection } from '@atlaskit/editor-prosemirror/state';

import type { ExpandPlugin } from '../../types';
import { deleteExpand, focusTitle } from '../commands';

const isExpandNode = (node: PMNode) => {
  return node?.type.name === 'expand' || node?.type.name === 'nestedExpand';
};

export function expandKeymap(
  api: ExtractInjectionAPI<ExpandPlugin> | undefined,
  options: {
    __livePage?: boolean;
  },
): SafePlugin {
  const list = {};

  bindKeymapWithCommand(
    moveUp.common!,
    (state, dispatch, editorView) => {
      if (!editorView) {
        return false;
      }
      const { selection, schema } = state;
      const { nodeBefore } = selection.$from;
      if (
        selection instanceof GapCursorSelection &&
        selection.side === Side.RIGHT &&
        nodeBefore &&
        (nodeBefore.type === schema.nodes.expand ||
          nodeBefore.type === schema.nodes.nestedExpand)
        // TO-DO: add back in expanded logic
      ) {
        const { $from } = selection;
        return focusTitle(Math.max($from.pos - 1, 0))(
          state,
          dispatch,
          editorView,
        );
      }

      const { $from } = state.selection;

      if (editorView.endOfTextblock('up')) {
        const expand = findExpand(state);

        // Moving UP in a table should move the cursor to the row above
        // however when an expand is in a table cell to the left of the
        // current table cell, arrow UP moves the cursor to the left
        // see ED-15425
        if (isPositionNearTableRow($from, schema, 'before') && !expand) {
          return false;
        }

        const prevCursorPos = Math.max($from.pos - $from.parentOffset - 1, 0);
        // move cursor from expand's content to its title
        if (expand && expand.start === prevCursorPos) {
          return focusTitle(expand.start)(state, dispatch, editorView);
        }

        const sel = Selection.findFrom(state.doc.resolve(prevCursorPos), -1);
        const expandBefore = findExpand(state, sel);
        if (sel && expandBefore) {
          // moving cursor from outside of an expand to the title when it is collapsed

          // TO-DO: Bring back expanded logic
          return focusTitle(expandBefore.start)(state, dispatch, editorView);
        }
      }

      return false;
    },
    list,
  );

  bindKeymapWithCommand(
    moveDown.common!,
    (state, dispatch, editorView) => {
      if (!editorView) {
        return false;
      }
      const { expand, nestedExpand } = state.schema.nodes;
      const { selection } = state;
      const { nodeAfter } = selection.$from;

      if (
        selection instanceof GapCursorSelection &&
        selection.side === Side.LEFT &&
        nodeAfter &&
        (nodeAfter.type === expand || nodeAfter.type === nestedExpand)
        // TO-DO: Bring back expanded logic
      ) {
        const { $from } = selection;
        return focusTitle($from.pos + 1)(state, dispatch, editorView);
      }

      if (editorView.endOfTextblock('down')) {
        const { $from } = state.selection;

        if ($from.depth === 0) {
          return false;
        }
        const $after = state.doc.resolve($from.after());
        if (
          $after.nodeAfter &&
          ($after.nodeAfter.type === expand ||
            $after.nodeAfter.type === nestedExpand)
        ) {
          return focusTitle($after.pos + 1)(state, dispatch, editorView);
        }
      }
      return false;
    },
    list,
  );

  bindKeymapWithCommand(
    backspace.common!,
    (state, dispatch, editorView) => {
      const { selection } = state;
      const { $from } = selection;
      if (!editorView || !selection.empty) {
        return false;
      }
      const { expand, nestedExpand } = state.schema.nodes;
      const expandNode = findExpand(state);
      if (!expandNode) {
        // @see ED-7977
        const sel = Selection.findFrom(
          state.doc.resolve(Math.max(selection.$from.pos - 1, 0)),
          -1,
        );
        const expandBefore = findExpand(state, sel);
        if (
          expandBefore &&
          (expandBefore.node.type === expand ||
            expandBefore.node.type === nestedExpand)
          // TO-DO: Bring back expanded logic
        ) {
          return focusTitle(expandBefore.start)(state, dispatch, editorView);
        }
        return false;
      }
      const parentNode = state.doc.nodeAt(
        $from.before(Math.max($from.depth - 1, 1)),
      );
      // ED-10012 catch cases where the expand has another node nested within it and
      // the backspace should be applied only to the inner node instead of the expand
      if (parentNode && !isExpandNode(parentNode)) {
        return false;
      }
      const textSel = Selection.findFrom(
        state.doc.resolve(expandNode.pos),
        1,
        true,
      );
      if (
        textSel &&
        selection.$from.pos === textSel.$from.pos &&
        isEmptyNode(state.schema)(expandNode.node) &&
        dispatch
      ) {
        return deleteExpand(api?.analytics?.actions)(state, dispatch);
      }

      return false;
    },
    list,
  );
  return keymap(list) as SafePlugin;
}
