import { Command, CommandDispatch } from '../../types';
import { copyButtonPluginKey } from './pm-plugins/plugin-key';
import { MarkType, NodeType } from 'prosemirror-model';
import { hoverDecoration } from '../base/pm-plugins/decoration';
import { EditorState, Transaction, NodeSelection } from 'prosemirror-state';
import {
  copyHTMLToClipboard,
  copyHTMLToClipboardPolyfill,
} from '../../utils/clipboard';
import { getSelectedNodeOrNodeParentByNodeType, toDOM } from './utils';
import { addAnalytics, ACTION, INPUT_METHOD } from '../analytics';
import { getAnalyticsPayload } from '../clipboard/pm-plugins/main';
import { browser } from '@atlaskit/editor-common/utils';

export function createToolbarCopyCommandForMark(markType: MarkType): Command {
  function command(state: EditorState, dispatch: CommandDispatch | undefined) {
    const textNode = state.tr.selection.$head.parent.maybeChild(
      state.tr.selection.$head.index(),
    );

    if (!textNode) {
      return false;
    }

    if (dispatch) {
      // As calling copyHTMLToClipboard causes side effects -- we only run this when
      // dispatch is provided -- as otherwise the consumer is only testing to see if
      // the action is availble.
      const domNode = toDOM(textNode, state.schema);
      if (domNode) {
        const div = document.createElement('div');
        const p = document.createElement('p');
        div.appendChild(p);
        p.appendChild(domNode);
        // The "1 1" refers to the start and end depth of the slice
        // since we're copying the text inside a paragraph, it will always be 1 1
        // https://github.com/ProseMirror/prosemirror-view/blob/master/src/clipboard.ts#L32
        (div.firstChild as HTMLElement).setAttribute('data-pm-slice', '1 1 []');

        // If we're copying a hyperlink, we'd copy the url as the fallback plain text
        const linkUrl = (domNode as HTMLElement).getAttribute('href');

        copyHTMLToClipboard(
          div,
          markType.name === 'link' && linkUrl ? linkUrl : undefined,
        );
      }

      const copyToClipboardTr = state.tr;
      copyToClipboardTr.setMeta(copyButtonPluginKey, { copied: true });

      const analyticsPayload = getAnalyticsPayload(state, ACTION.COPIED);
      if (analyticsPayload) {
        analyticsPayload.attributes.inputMethod = INPUT_METHOD.FLOATING_TB;
        analyticsPayload.attributes.markType = markType.name;
        addAnalytics(state, copyToClipboardTr, analyticsPayload);
      }

      dispatch(copyToClipboardTr);
    }

    return true;
  }

  return command;
}

export function getProvideMarkVisualFeedbackForCopyButtonCommand(
  markType: MarkType,
) {
  function provideMarkVisualFeedbackForCopyButtonCommand(
    state: EditorState,
    dispatch: CommandDispatch | undefined,
  ) {
    const tr = state.tr;
    tr.setMeta(copyButtonPluginKey, { showSelection: true, markType });

    if (dispatch) {
      dispatch(tr);
    }

    return true;
  }
  return provideMarkVisualFeedbackForCopyButtonCommand;
}

export function removeMarkVisualFeedbackForCopyButtonCommand(
  state: EditorState,
  dispatch: CommandDispatch | undefined,
) {
  const tr = state.tr;
  tr.setMeta(copyButtonPluginKey, { removeSelection: true });

  const copyButtonState = copyButtonPluginKey.getState(state);
  if (copyButtonState?.copied) {
    tr.setMeta(copyButtonPluginKey, { copied: false });
  }

  if (dispatch) {
    dispatch(tr);
  }

  return true;
}

export const createToolbarCopyCommandForNode =
  (nodeType: NodeType | Array<NodeType>): Command =>
  (state, dispatch) => {
    const { tr, schema } = state;

    // This command should only be triggered by the Copy button in the floating toolbar
    // which is only visible when selection is inside the target node
    let contentNodeWithPos = getSelectedNodeOrNodeParentByNodeType({
      nodeType,
      selection: tr.selection,
    });
    if (!contentNodeWithPos) {
      return false;
    }

    const copyToClipboardTr = tr;
    copyToClipboardTr.setMeta(copyButtonPluginKey, { copied: true });

    const analyticsPayload = getAnalyticsPayload(state, ACTION.COPIED);
    if (analyticsPayload) {
      analyticsPayload.attributes.inputMethod = INPUT_METHOD.FLOATING_TB;
      analyticsPayload.attributes.nodeType = contentNodeWithPos.node.type.name;
      addAnalytics(state, copyToClipboardTr, analyticsPayload);
    }
    if (dispatch) {
      // As calling copyHTMLToClipboard causes side effects -- we only run this when
      // dispatch is provided -- as otherwise the consumer is only testing to see if
      // the action is availble.
      const domNode = toDOM(contentNodeWithPos.node, schema);
      if (domNode) {
        const div = document.createElement('div');
        div.appendChild(domNode);

        // if copying inline content
        if (contentNodeWithPos.node.type.inlineContent) {
          // The "1 1" refers to the start and end depth of the slice
          // since we're copying the text inside a paragraph, it will always be 1 1
          // https://github.com/ProseMirror/prosemirror-view/blob/master/src/clipboard.ts#L32
          (div.firstChild as HTMLElement).setAttribute(
            'data-pm-slice',
            '1 1 []',
          );
        } else {
          // The "0 0" refers to the start and end depth of the slice
          // since we're copying the block node only, it will always be 0 0
          // https://github.com/ProseMirror/prosemirror-view/blob/master/src/clipboard.ts#L32
          (div.firstChild as HTMLElement).setAttribute(
            'data-pm-slice',
            '0 0 []',
          );
        }
        // ED-17083 safari seems have bugs for extension copy because exntension do not have a child text(innerText) and it will not recognized as html in clipboard, this could be merge into one if this extension fixed children issue or safari fix the copy bug
        if (
          browser.safari &&
          state.selection instanceof NodeSelection &&
          state.selection.node.type === state.schema.nodes.extension
        ) {
          copyHTMLToClipboardPolyfill(div);
        } else {
          copyHTMLToClipboard(div);
        }
      }
      copyToClipboardTr.setMeta('scrollIntoView', false);
      dispatch(copyToClipboardTr);
    }

    return true;
  };

export const resetCopiedState =
  (nodeType: NodeType | Array<NodeType>, onMouseLeave?: Command): Command =>
  (state, dispatch) => {
    let customTr = state.tr;

    // Avoid multipe dispatch
    // https://product-fabric.atlassian.net/wiki/spaces/E/pages/2241659456/All+about+dispatch+and+why+there+shouldn+t+be+multiple#How-do-I-avoid-them%3F
    const customDispatch = (tr: Transaction) => {
      customTr = tr;
    };

    onMouseLeave
      ? onMouseLeave(state, customDispatch)
      : hoverDecoration(nodeType, false)(state, customDispatch);

    const copyButtonState = copyButtonPluginKey.getState(state);
    if (copyButtonState?.copied) {
      customTr.setMeta(copyButtonPluginKey, { copied: false });
    }

    if (dispatch) {
      dispatch(customTr);
    }

    return true;
  };
