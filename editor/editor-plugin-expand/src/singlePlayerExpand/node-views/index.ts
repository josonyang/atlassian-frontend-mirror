import ReactDOM from 'react-dom';
import type { IntlShape } from 'react-intl-next';
import { keyName } from 'w3c-keyname';

import {
  GapCursorSelection,
  RelativeSelectionPos,
  Side,
} from '@atlaskit/editor-common/selection';
import type {
  SelectionSharedState,
  SetSelectionRelativeToNode,
} from '@atlaskit/editor-common/selection';
import { expandClassNames } from '@atlaskit/editor-common/styles';
import type {
  ExtractInjectionAPI,
  getPosHandler,
  getPosHandlerNode,
} from '@atlaskit/editor-common/types';
import { closestElement, isEmptyNode } from '@atlaskit/editor-common/utils';
import type { Node as PmNode } from '@atlaskit/editor-prosemirror/model';
import { DOMSerializer } from '@atlaskit/editor-prosemirror/model';
import { NodeSelection, Selection } from '@atlaskit/editor-prosemirror/state';
import type {
  Decoration,
  EditorView,
  NodeView,
} from '@atlaskit/editor-prosemirror/view';

import type { ExpandPlugin } from '../../types';
import {
  deleteExpand,
  setSelectionInsideExpand,
  updateExpandTitle,
} from '../commands';
import { renderIcon, toDOM } from '../ui/NodeView';

export class ExpandNodeView implements NodeView {
  node: PmNode;
  view: EditorView;
  dom: HTMLElement;
  contentDOM?: HTMLElement;
  icon?: HTMLElement | null;
  input?: HTMLInputElement | null;
  titleContainer?: HTMLElement | null;
  content?: HTMLElement | null;
  getPos: getPosHandlerNode;
  intl: IntlShape;
  allowInteractiveExpand: boolean = true;
  isMobile: boolean = false;
  api: ExtractInjectionAPI<ExpandPlugin> | undefined;
  constructor(
    node: PmNode,
    view: EditorView,
    getPos: getPosHandlerNode,
    getIntl: () => IntlShape,
    isMobile: boolean,
    private selectNearNode: SetSelectionRelativeToNode | undefined,
    api: ExtractInjectionAPI<ExpandPlugin> | undefined,
    allowInteractiveExpand: boolean = true,
    private __livePage = false,
  ) {
    this.intl = getIntl();
    const { dom, contentDOM } = DOMSerializer.renderSpec(
      document,
      toDOM(node, this.__livePage, this.intl),
    );
    this.allowInteractiveExpand = allowInteractiveExpand;
    this.getPos = getPos;
    this.view = view;
    this.node = node;
    this.dom = dom as HTMLElement;
    this.contentDOM = contentDOM as HTMLElement;
    this.isMobile = isMobile;
    this.api = api;
    this.icon = this.dom.querySelector<HTMLElement>(
      `.${expandClassNames.icon}`,
    );
    this.input = this.dom.querySelector<HTMLInputElement>(
      `.${expandClassNames.titleInput}`,
    );
    this.titleContainer = this.dom.querySelector<HTMLElement>(
      `.${expandClassNames.titleContainer}`,
    );

    renderIcon(this.icon, this.allowInteractiveExpand, this.intl);

    if (!this.input || !this.titleContainer || !this.icon) {
      return;
    }

    // Add event listeners
    /* eslint-disable @repo/internal/dom-events/no-unsafe-event-listeners*/
    this.dom.addEventListener('click', this.handleClick);
    this.dom.addEventListener('input', this.handleInput);
    this.input.addEventListener('keydown', this.handleTitleKeydown);
    // If the user interacts in our title bar (either toggle or input)
    // Prevent ProseMirror from getting a focus event (causes weird selection issues).
    this.titleContainer.addEventListener('focus', this.handleFocus);
    this.icon.addEventListener('keydown', this.handleIconKeyDown);
  }

  private focusTitle = () => {
    if (this.input) {
      const { state, dispatch } = this.view;
      if (this.selectNearNode) {
        const tr = this.selectNearNode({
          selectionRelativeToNode: RelativeSelectionPos.Start,
        })(state);
        if (dispatch) {
          dispatch(tr);
        }
      }
      const pos = this.getPos();
      if (typeof pos === 'number') {
        setSelectionInsideExpand(pos)(state, dispatch, this.view);
      }
      this.input.focus();
    }
  };

  private handleIconKeyDown = (event: KeyboardEvent) => {
    switch (keyName(event)) {
      case 'Tab':
        event.preventDefault();
        this.focusTitle();
        break;
      case 'Enter':
        event.preventDefault();
        this.handleClick(event);
        break;
    }
  };

  private handleClick = (event: Event) => {
    const pos = this.getPos();
    if (typeof pos !== 'number') {
      return;
    }

    const target = event.target as HTMLElement;

    if (closestElement(target, `.${expandClassNames.icon}`)) {
      if (!this.allowInteractiveExpand) {
        return;
      }
      event.stopPropagation();

      // We blur the editorView, to prevent any keyboard showing on mobile
      // When we're interacting with the expand toggle
      if (this.view.dom instanceof HTMLElement) {
        this.view.dom.blur();
      }

      // TODO https://product-fabric.atlassian.net/browse/ED-22841
      // call toggleExpandExpanded

      return;
    }

    if (target === this.input) {
      event.stopPropagation();
      this.focusTitle();
      return;
    }
  };

  private handleInput = (event: Event) => {
    const pos = this.getPos();
    if (typeof pos !== 'number') {
      return;
    }

    const target = event.target as HTMLInputElement;
    if (target === this.input) {
      event.stopPropagation();
      const { state, dispatch } = this.view;
      updateExpandTitle({
        title: target.value,
        pos,
        nodeType: this.node.type,
      })(state, dispatch);
    }
  };

  private handleFocus = (event: FocusEvent) => {
    event.stopImmediatePropagation();
  };

  private handleTitleKeydown = (event: KeyboardEvent) => {
    switch (keyName(event)) {
      case 'Enter':
        // TO-DO
        break;
      case 'Tab':
      case 'ArrowDown':
        this.moveToOutsideOfTitle(event);
        break;
      case 'ArrowRight':
        this.handleArrowRightFromTitle(event);
        break;
      case 'ArrowLeft':
        this.handleArrowLeftFromTitle(event);
        break;
      case 'ArrowUp':
        this.setLeftGapCursor(event);
        break;
      case 'Backspace':
        this.deleteEmptyExpand();
        break;
    }
  };

  private deleteEmptyExpand = () => {
    const { state } = this.view;
    const expandNode = this.node;

    if (!this.input) {
      return;
    }
    const { selectionStart, selectionEnd } = this.input;
    if (selectionStart !== selectionEnd || selectionStart !== 0) {
      return;
    }

    if (expandNode && isEmptyNode(state.schema)(expandNode)) {
      deleteExpand(this.api?.analytics?.actions)(state, this.view.dispatch);
    }
  };

  private moveToOutsideOfTitle = (event: KeyboardEvent) => {
    event.preventDefault();
    const { state, dispatch } = this.view;
    const expandPos = this.getPos();
    if (typeof expandPos !== 'number') {
      return;
    }

    let pos = expandPos;
    if (this.isCollapsed()) {
      pos = expandPos + this.node.nodeSize;
    }
    const resolvedPos = state.doc.resolve(pos);
    if (!resolvedPos) {
      return;
    }

    if (
      this.isCollapsed() &&
      resolvedPos.nodeAfter &&
      ['expand', 'nestedExpand'].indexOf(resolvedPos.nodeAfter.type.name) > -1
    ) {
      return this.setRightGapCursor(event);
    }

    const sel = Selection.findFrom(resolvedPos, 1, true);
    if (sel) {
      // If the input has focus, ProseMirror doesn't
      // Give PM focus back before changing our selection
      this.view.focus();
      dispatch(state.tr.setSelection(sel));
    }
  };

  // TODO: https://product-fabric.atlassian.net/browse/ED-22841
  private isCollapsed = () => {
    return false;
  };

  private setRightGapCursor = (event: KeyboardEvent) => {
    if (!this.input) {
      return;
    }
    const pos = this.getPos();
    if (typeof pos !== 'number') {
      return;
    }
    const { value, selectionStart, selectionEnd } = this.input;
    if (selectionStart === selectionEnd && selectionStart === value.length) {
      const { state, dispatch } = this.view;
      event.preventDefault();
      this.view.focus();
      dispatch(
        state.tr.setSelection(
          new GapCursorSelection(
            state.doc.resolve(this.node.nodeSize + pos),
            Side.RIGHT,
          ),
        ),
      );
    }
  };

  private setLeftGapCursor = (event: KeyboardEvent) => {
    if (!this.input) {
      return;
    }
    const pos = this.getPos();
    if (typeof pos !== 'number') {
      return;
    }
    const { selectionStart, selectionEnd } = this.input;
    if (selectionStart === selectionEnd && selectionStart === 0) {
      event.preventDefault();
      const { state, dispatch } = this.view;
      this.view.focus();
      dispatch(
        state.tr.setSelection(
          new GapCursorSelection(state.doc.resolve(pos), Side.LEFT),
        ),
      );
    }
  };

  private handleArrowRightFromTitle = (event: KeyboardEvent) => {
    if (!this.input || !this.selectNearNode) {
      return;
    }
    const pos = this.getPos();
    if (typeof pos !== 'number') {
      return;
    }
    const { value, selectionStart, selectionEnd } = this.input;
    if (selectionStart === selectionEnd && selectionStart === value.length) {
      event.preventDefault();
      const { state, dispatch } = this.view;
      this.view.focus();
      const tr = this.selectNearNode({
        selectionRelativeToNode: RelativeSelectionPos.End,
        selection: NodeSelection.create(state.doc, pos),
      })(state);
      if (dispatch) {
        dispatch(tr);
      }
    }
  };

  private handleArrowLeftFromTitle = (event: KeyboardEvent) => {
    if (!this.input || !this.selectNearNode) {
      return;
    }
    const pos = this.getPos();
    if (typeof pos !== 'number') {
      return;
    }
    const { selectionStart, selectionEnd } = this.input;
    if (selectionStart === selectionEnd && selectionStart === 0) {
      event.preventDefault();
      const { state, dispatch } = this.view;
      this.view.focus();
      const selectionSharedState: SelectionSharedState =
        this.api?.selection?.sharedState.currentState() || {};
      // selectionRelativeToNode is undefined when user clicked to select node, then hit left to get focus in title
      // This is a special case where we want to bypass node selection and jump straight to gap cursor
      if (selectionSharedState?.selectionRelativeToNode === undefined) {
        const tr = this.selectNearNode({
          selectionRelativeToNode: undefined,
          selection: new GapCursorSelection(state.doc.resolve(pos), Side.LEFT),
        })(state);
        if (dispatch) {
          dispatch(tr);
        }
      } else {
        const tr = this.selectNearNode({
          selectionRelativeToNode: RelativeSelectionPos.Start,
          selection: NodeSelection.create(state.doc, pos),
        })(state);
        if (dispatch) {
          dispatch(tr);
        }
      }
    }
  };

  stopEvent(event: Event) {
    const target = event.target as HTMLElement;
    return (
      target === this.input ||
      target === this.icon ||
      !!closestElement(target, `.${expandClassNames.icon}`)
    );
  }

  ignoreMutation(
    mutationRecord: MutationRecord | { type: 'selection'; target: Element },
  ) {
    // ME-1931: Mobile relies on composition which creates dom mutations. If we ignore them, prosemirror
    // does not recognise the changes and reverts them.
    if (
      this.isMobile &&
      (mutationRecord.type === 'characterData' ||
        mutationRecord.type === 'childList')
    ) {
      return false;
    }

    if (mutationRecord.type === 'selection') {
      return false;
    }
    return true;
  }

  update(node: PmNode, _decorations: readonly Decoration[]) {
    if (this.node.type === node.type) {
      // TODO: https://product-fabric.atlassian.net/browse/ED-22841
      // Handle toggling of the expand on update here

      // During a collab session the title doesn't sync with other users
      // since we're intentionally being less aggressive about re-rendering.
      // We also apply a rAF to avoid abrupt continuous replacement of the title.
      window.requestAnimationFrame(() => {
        if (this.input && this.node.attrs.title !== this.input.value) {
          this.input.value = this.node.attrs.title;
        }
      });

      this.node = node;
      return true;
    }
    return false;
  }

  destroy() {
    if (!this.dom || !this.input || !this.titleContainer || !this.icon) {
      return;
    }

    this.dom.removeEventListener('click', this.handleClick);
    this.dom.removeEventListener('input', this.handleInput);
    this.input.removeEventListener('keydown', this.handleTitleKeydown);
    this.titleContainer.removeEventListener('focus', this.handleFocus);
    this.icon.removeEventListener('keydown', this.handleIconKeyDown);
    ReactDOM.unmountComponentAtNode(this.icon);
  }
}

export default function ({
  getIntl,
  isMobile,
  api,
  allowInteractiveExpand = true,
  __livePage,
}: {
  getIntl: () => IntlShape;
  isMobile: boolean;
  api: ExtractInjectionAPI<ExpandPlugin> | undefined;
  allowInteractiveExpand: boolean;
  __livePage: boolean;
}) {
  return (node: PmNode, view: EditorView, getPos: getPosHandler): NodeView =>
    new ExpandNodeView(
      node,
      view,
      getPos as getPosHandlerNode,
      getIntl,
      isMobile,
      api?.selection?.actions?.selectNearNode,
      api,
      allowInteractiveExpand,
      __livePage,
    );
}
