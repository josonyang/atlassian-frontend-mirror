import type { Command } from '@atlaskit/editor-common/types';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';

/**
 * Prevent removing the block when deleting block content
 *
 * @param state EditorState
 * @param dispatch CommandDispatch
 * @returns boolean
 */
export function deleteBlockContent(
  isNodeAWrappingBlockNode: (node?: PMNode | null) => boolean,
): Command {
  return (state, dispatch) => {
    const {
      tr,
      selection: { $from, $to },
      doc,
    } = state;

    if ($from.pos === $to.pos) {
      return false;
    }

    let selectionCrossesWrappingBlockNode = false;

    doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      // Optimisation. If selection crosses wrapping block node
      // short circuit the loop by returning false
      if (selectionCrossesWrappingBlockNode) {
        return false;
      }
      if (isNodeAWrappingBlockNode(node)) {
        selectionCrossesWrappingBlockNode = true;
        return false;
      }
    });

    if (!selectionCrossesWrappingBlockNode) {
      return false;
    }

    tr.delete($from.pos, $to.pos);

    if (dispatch) {
      dispatch(tr);
    }

    return true;
  };
}
