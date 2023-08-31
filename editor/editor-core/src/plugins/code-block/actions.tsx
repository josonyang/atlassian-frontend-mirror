import {
  findParentNodeOfType,
  findSelectedNodeOfType,
  removeSelectedNode,
  removeParentNodeOfType,
  isNodeSelection,
  safeInsert,
} from '@atlaskit/editor-prosemirror/utils';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { NodeSelection } from '@atlaskit/editor-prosemirror/state';
import type { Command } from '../../types';
import { pluginKey } from './plugin-key';
import type { CodeBlockState } from './pm-plugins/main-state';
import { copySelectionPluginKey } from './pm-plugins/codeBlockCopySelectionPlugin';
import { ACTIONS } from './pm-plugins/actions';
import { copyToClipboard } from '../../utils/clipboard';
import { addAnalytics } from '../analytics/utils';
import { shouldSplitSelectedNodeOnNodeInsertion } from '@atlaskit/editor-common/insert';
import { transformToCodeBlockAction } from './transform-to-code-block';
import { withAnalytics } from '@atlaskit/editor-common/editor-analytics';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
} from '@atlaskit/editor-common/analytics';
import type {
  INPUT_METHOD,
  EditorAnalyticsAPI,
} from '@atlaskit/editor-common/analytics';

export const removeCodeBlock: Command = (state, dispatch) => {
  const {
    schema: { nodes },
    tr,
  } = state;
  if (dispatch) {
    let removeTr = tr;
    if (findSelectedNodeOfType(nodes.codeBlock)(tr.selection)) {
      removeTr = removeSelectedNode(tr);
    } else {
      removeTr = removeParentNodeOfType(nodes.codeBlock)(tr);
    }
    dispatch(removeTr);
  }
  return true;
};

export const changeLanguage =
  (language: string): Command =>
  (state, dispatch) => {
    const { codeBlock } = state.schema.nodes;
    const pos = pluginKey.getState(state)?.pos;

    if (typeof pos !== 'number') {
      return false;
    }

    const tr = state.tr
      .setNodeMarkup(pos, codeBlock, { language })
      .setMeta('scrollIntoView', false);

    const selection = isNodeSelection(state.selection)
      ? NodeSelection.create(tr.doc, pos)
      : tr.selection;

    const result = tr.setSelection(selection);

    if (dispatch) {
      dispatch(
        addAnalytics(state, result, {
          action: ACTION.LANGUAGE_SELECTED,
          actionSubject: ACTION_SUBJECT.CODE_BLOCK,
          attributes: { language },
          eventType: EVENT_TYPE.TRACK,
        }),
      );
    }

    return true;
  };

export const copyContentToClipboard: Command = (state, dispatch) => {
  const {
    schema: { nodes },
    tr,
  } = state;

  const codeBlock = findParentNodeOfType(nodes.codeBlock)(tr.selection);
  const textContent = codeBlock && codeBlock.node.textContent;

  if (textContent) {
    copyToClipboard(textContent);
    let copyToClipboardTr = tr;

    copyToClipboardTr.setMeta(pluginKey, {
      type: ACTIONS.SET_COPIED_TO_CLIPBOARD,
      data: true,
    });
    copyToClipboardTr.setMeta(copySelectionPluginKey, 'remove-selection');

    if (dispatch) {
      dispatch(copyToClipboardTr);
    }
  }

  return true;
};

export const resetCopiedState: Command = (state, dispatch) => {
  const { tr } = state;
  const codeBlockState: CodeBlockState | undefined = pluginKey.getState(state);
  let resetCopiedStateTr = tr;

  if (codeBlockState && codeBlockState.contentCopied) {
    resetCopiedStateTr.setMeta(pluginKey, {
      type: ACTIONS.SET_COPIED_TO_CLIPBOARD,
      data: false,
    });
    resetCopiedStateTr.setMeta(copySelectionPluginKey, 'remove-selection');
    if (dispatch) {
      dispatch(resetCopiedStateTr);
    }
  } else {
    const clearSelectionStateTransaction = state.tr;
    clearSelectionStateTransaction.setMeta(
      copySelectionPluginKey,
      'remove-selection',
    );
    // note: dispatch should always be defined when called from the
    // floating toolbar. Howver the Command type which floating toolbar uses
    // (and resetCopiedState) uses suggests it's optional.
    if (dispatch) {
      dispatch(clearSelectionStateTransaction);
    }
  }

  return true;
};

export const ignoreFollowingMutations: Command = (state, dispatch) => {
  const { tr } = state;

  const ignoreFollowingMutationsTr = tr;

  ignoreFollowingMutationsTr.setMeta(pluginKey, {
    type: ACTIONS.SET_SHOULD_IGNORE_FOLLOWING_MUTATIONS,
    data: true,
  });

  if (dispatch) {
    dispatch(ignoreFollowingMutationsTr);
  }

  return true;
};

export const resetShouldIgnoreFollowingMutations: Command = (
  state,
  dispatch,
) => {
  const { tr } = state;

  const ignoreFollowingMutationsTr = tr;

  ignoreFollowingMutationsTr.setMeta(pluginKey, {
    type: ACTIONS.SET_SHOULD_IGNORE_FOLLOWING_MUTATIONS,
    data: false,
  });

  if (dispatch) {
    dispatch(ignoreFollowingMutationsTr);
  }

  return true;
};

/**
 * This function creates a new transaction that inserts a code block,
 * if there is text selected it will wrap the current selection if not it will
 * append the codeblock to the end of the document.
 */
export function createInsertCodeBlockTransaction({
  state,
}: {
  state: EditorState;
}) {
  let { tr } = state;
  const { from } = state.selection;
  const { codeBlock } = state.schema.nodes;
  const grandParentNodeType = state.selection.$from.node(-1)?.type;
  const parentNodeType = state.selection.$from.parent.type;

  /** We always want to append a codeBlock unless we're inserting into a paragraph
   * AND it's a valid child of the grandparent node.
   * Insert the current selection as codeBlock content unless it contains nodes other
   * than paragraphs and inline.
   */
  const canInsertCodeBlock =
    shouldSplitSelectedNodeOnNodeInsertion({
      parentNodeType,
      grandParentNodeType,
      content: codeBlock.createAndFill() as PMNode,
    }) && contentAllowedInCodeBlock(state);

  if (canInsertCodeBlock) {
    tr = transformToCodeBlockAction(state, from);
  } else {
    safeInsert(codeBlock.createAndFill() as PMNode)(tr).scrollIntoView();
  }

  return tr;
}

/**
 * Check if the current selection contains any nodes that are not permitted
 * as codeBlock child nodes. Note that this allows paragraphs and inline nodes
 * as we extract their text content.
 */
function contentAllowedInCodeBlock(state: EditorState): boolean {
  const { $from, $to } = state.selection;
  let isAllowedChild = true;
  state.doc.nodesBetween($from.pos, $to.pos, (node) => {
    if (!isAllowedChild) {
      return false;
    }

    return (isAllowedChild =
      node.type === state.schema.nodes.listItem ||
      node.type === state.schema.nodes.bulletList ||
      node.type === state.schema.nodes.orderedList ||
      node.type === state.schema.nodes.paragraph ||
      node.isInline ||
      node.isText);
  });

  return isAllowedChild;
}

export function insertCodeBlockWithAnalytics(
  inputMethod: INPUT_METHOD,
  analyticsAPI?: EditorAnalyticsAPI,
): Command {
  return withAnalytics(analyticsAPI, {
    action: ACTION.INSERTED,
    actionSubject: ACTION_SUBJECT.DOCUMENT,
    actionSubjectId: ACTION_SUBJECT_ID.CODE_BLOCK,
    attributes: { inputMethod: inputMethod as INPUT_METHOD.TOOLBAR },
    eventType: EVENT_TYPE.TRACK,
  })(function (state: EditorState, dispatch) {
    let tr = createInsertCodeBlockTransaction({ state });
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  });
}
