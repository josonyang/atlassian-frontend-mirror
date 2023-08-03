import { findWrapping } from '@atlaskit/editor-prosemirror/transform';
import type {
  Node as PMNode,
  ResolvedPos,
  NodeType,
  NodeRange,
} from '@atlaskit/editor-prosemirror/model';
import type {
  EditorState,
  Transaction,
  Selection,
} from '@atlaskit/editor-prosemirror/state';
import {
  findParentNodeOfType,
  hasParentNodeOfType,
} from '@atlaskit/editor-prosemirror/utils';
import { GapCursorSelection } from '@atlaskit/editor-common/selection';
import {
  isListItemNode,
  isListNode,
  isParagraphNode,
} from '@atlaskit/editor-common/utils';

export const isPosInsideParagraph = ($pos: ResolvedPos) => {
  return $pos.parent.type.name === 'paragraph';
};

export const isPosInsideList = ($pos: ResolvedPos) => {
  const posGrandParent = $pos.node(-1);

  return (
    isListItemNode($pos.parent) ||
    isListNode($pos.parent) ||
    isListItemNode(posGrandParent)
  );
};

export const isWrappingPossible = (
  nodeType: NodeType,
  selection: Selection,
) => {
  const { $from, $to } = selection;

  let range;
  if (selection instanceof GapCursorSelection && $from.nodeAfter) {
    const nodeSize = $from.nodeAfter.nodeSize || 1;
    range = $from.blockRange($from.doc.resolve($from.pos + nodeSize));
  } else {
    range = $from.blockRange($to);
  }
  if (!range) {
    return false;
  }

  const wrap = findWrapping(range, nodeType);
  if (!wrap) {
    return false;
  }

  return true;
};

// canOutdent
export const isInsideListItem = (state: EditorState): boolean => {
  const { parent } = state.selection.$from;
  const { listItem } = state.schema.nodes;

  if (state.selection instanceof GapCursorSelection) {
    return isListItemNode(parent);
  }

  return (
    hasParentNodeOfType(listItem)(state.selection) && isParagraphNode(parent)
  );
};

export const isInsideTableCell = (state: EditorState): boolean => {
  const { tableCell, tableHeader } = state.schema.nodes;
  return !!findParentNodeOfType([tableCell, tableHeader])(state.selection);
};

export const canJoinToPreviousListItem = (state: EditorState): boolean => {
  const { $from } = state.selection;

  const $before = state.doc.resolve($from.pos - 1);
  let nodeBefore = $before ? $before.nodeBefore : null;

  if (state.selection instanceof GapCursorSelection) {
    nodeBefore = $from.nodeBefore;
  }

  return isListNode(nodeBefore);
};

export const selectionContainsList = (tr: Transaction): PMNode | null => {
  const {
    selection: { from, to },
  } = tr;
  let foundListNode: PMNode | null = null;
  tr.doc.nodesBetween(from, to, (node) => {
    if (isListNode(node)) {
      foundListNode = node;
    }

    if (foundListNode) {
      return false;
    }

    return true;
  });
  return foundListNode;
};

type CreateNodeRange = (props: { selection: Selection }) => NodeRange | null;
export const createListNodeRange: CreateNodeRange = ({ selection }) => {
  const { $from, $to } = selection;
  const range = $from.blockRange($to, isListNode);
  if (!range) {
    return null;
  }

  return range;
};
