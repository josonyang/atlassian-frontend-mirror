import { keymap } from '@atlaskit/editor-prosemirror/keymap';
import type { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { Selection } from '@atlaskit/editor-prosemirror/state';
import * as keymaps from '../../../keymaps';
import { findParentNodeOfType } from '@atlaskit/editor-prosemirror/utils';
import type { Command } from '../../../types';
import { createNewParagraphBelow } from '@atlaskit/editor-common/utils';
import { GapCursorSelection } from '../../selection/gap-cursor/selection';

export function captionKeymap(): SafePlugin {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.moveDown.common!,
    createNewParagraphBelowCaption,
    list,
  );
  keymaps.bindKeymapWithCommand(
    keymaps.enter.common!,
    createNewParagraphBelowCaption,
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveDown.common!,
    getOutOfCaption,
    list,
  );

  keymaps.bindKeymapWithCommand(keymaps.enter.common!, getOutOfCaption, list);

  keymaps.bindKeymapWithCommand(
    keymaps.moveUp.common!,
    selectParentMediaSingle,
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.shiftTab.common!,
    selectParentMediaSingle,
    list,
  );

  keymaps.bindKeymapWithCommand(keymaps.tab.common!, getOutOfCaption, list);

  keymaps.bindKeymapWithCommand(
    keymaps.moveLeft.common!,
    gapCursorSelectLeftParentMediaSingle,
    list,
  );

  return keymap(list) as SafePlugin;
}

const createNewParagraphBelowCaption: Command = (state, dispatch) => {
  const caption = findParentNodeOfType(state.schema.nodes.caption)(
    state.selection,
  );
  if (caption) {
    return createNewParagraphBelow(state, dispatch);
  }
  return false;
};

const getOutOfCaption: Command = (state, dispatch) => {
  const caption = findParentNodeOfType(state.schema.nodes.caption)(
    state.selection,
  );
  if (caption) {
    if (dispatch) {
      const tr = state.tr.setSelection(
        Selection.near(
          state.tr.doc.resolve(caption.pos + caption.node.nodeSize),
        ),
      );
      dispatch(tr);
    }
    return true;
  }
  return false;
};

const selectParentMediaSingle: Command = (state, dispatch) => {
  if (findParentNodeOfType(state.schema.nodes.caption)(state.selection)) {
    const mediaSingleParent = findParentNodeOfType(
      state.schema.nodes.mediaSingle,
    )(state.selection);
    if (mediaSingleParent) {
      if (dispatch) {
        const tr = state.tr.setSelection(
          Selection.near(state.tr.doc.resolve(mediaSingleParent.pos)),
        );
        dispatch(tr);
      }
      return true;
    }
  }
  return false;
};

const gapCursorSelectLeftParentMediaSingle: Command = (state, dispatch) => {
  const caption = findParentNodeOfType(state.schema.nodes.caption)(
    state.selection,
  );
  if (caption) {
    const mediaSingleParent = findParentNodeOfType(
      state.schema.nodes.mediaSingle,
    )(state.selection);

    if (
      mediaSingleParent &&
      state.selection.empty &&
      state.tr.doc.resolve(state.selection.from).parentOffset === 0
    ) {
      const gapCursorSelection = GapCursorSelection.findFrom(
        state.tr.doc.resolve(mediaSingleParent.pos),
        0,
        false,
      );

      if (gapCursorSelection) {
        if (dispatch) {
          const tr = state.tr.setSelection(gapCursorSelection);
          dispatch(tr);
        }
        return true;
      }
    }
  }
  return false;
};
