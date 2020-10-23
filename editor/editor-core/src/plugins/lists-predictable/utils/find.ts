import { findParentNodeClosestToPos } from 'prosemirror-utils';
import { ResolvedPos, Node as PMNode } from 'prosemirror-model';
import { isListNode, isListItemNode } from './node';

export function findFirstNestedList($pos: ResolvedPos): ResolvedPos | null {
  const currentNode = $pos.doc.nodeAt($pos.pos);
  let currentListItemPos: number | null = null;
  if (isListItemNode(currentNode)) {
    currentListItemPos = $pos.pos;
  } else {
    const result = findParentNodeClosestToPos($pos, isListItemNode);
    currentListItemPos = result?.pos || null;
  }

  if (!currentListItemPos) {
    return null;
  }
  const currentListItemNode = $pos.doc.nodeAt(currentListItemPos);
  if (!currentListItemNode) {
    return null;
  }
  const lastListItemChild = currentListItemNode.child(
    currentListItemNode.childCount - 1,
  );

  if (!isListNode(lastListItemChild)) {
    return null;
  }

  const firstNestedListPosition =
    currentListItemNode.nodeSize - lastListItemChild.nodeSize;
  const firstNestedListNode = $pos.doc.nodeAt(firstNestedListPosition);
  if (!isListNode(firstNestedListNode)) {
    return null;
  }

  return $pos.doc.resolve(firstNestedListPosition);
}

export function findFirstParentListNode($pos: ResolvedPos): PMNode | null {
  const currentNode = $pos.doc.nodeAt($pos.pos);
  let listNodePosition: number | undefined | null = null;
  if (isListNode(currentNode)) {
    listNodePosition = $pos.pos;
  } else {
    const result = findParentNodeClosestToPos($pos, isListNode);
    listNodePosition = result && result.pos;
  }

  if (listNodePosition == null) {
    return null;
  }
  const node = $pos.doc.nodeAt(listNodePosition);

  return node || null;
}