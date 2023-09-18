import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

import type { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import { findOverflowScrollParent } from '@atlaskit/editor-common/ui';
import { browser, mapChildren } from '@atlaskit/editor-common/utils';
import type { Node as PmNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorView, NodeView } from '@atlaskit/editor-prosemirror/view';

import type { TablePluginState } from '../../../types';
import {
  TableCssClassName as ClassName,
  TableCssClassName,
} from '../../../types';
import {
  STICKY_HEADER_TOGGLE_TOLERANCE_MS,
  stickyHeaderBorderBottomWidth,
  stickyRowOffsetTop,
  tableControlsSpacing,
  tableScrollbarOffset,
} from '../../../ui/consts';
import { pluginKey as tablePluginKey } from '../../plugin-key';
import {
  syncStickyRowToTable,
  updateStickyMargins as updateTableMargin,
} from '../../table-resizing/utils/dom';
import { updateStickyState } from '../commands';

import type { TableDOMElements } from './dom';
import { getTop, getTree } from './dom';

// limit scroll event calls
const HEADER_ROW_SCROLL_THROTTLE_TIMEOUT = 200;

// timeout for resetting the scroll class - if it’s too long then users won’t be able to click on the header cells,
// if too short it would trigger too many dom updates.
const HEADER_ROW_SCROLL_RESET_DEBOUNCE_TIMEOUT = 400;

const anyChildCellMergedAcrossRow = (node: PmNode) =>
  mapChildren(node, (child) => child.attrs.rowspan || 0).some(
    (rowspan) => rowspan > 1,
  );

/**
 * Check if a given node is a header row with this definition:
 *  - all children are tableHeader cells
 *  - no table cells have been have merged with other table row cells
 *
 * @param node ProseMirror node
 * @return boolean if it meets definition
 */
export const supportedHeaderRow = (node: PmNode) => {
  const allHeaders = mapChildren(
    node,
    (child) => child.type.name === 'tableHeader',
  ).every(Boolean);

  const someMerged = anyChildCellMergedAcrossRow(node);

  return allHeaders && !someMerged;
};

export class TableRowNodeView implements NodeView {
  view: EditorView;
  node: PmNode;
  getPos: () => number;
  eventDispatcher: EventDispatcher;

  dom: HTMLTableRowElement; // this is the sticky header table row
  contentDOM: HTMLElement;

  isHeaderRow: boolean;
  editorScrollableElement?: HTMLElement | Window;
  colControlsOffset = 0;
  focused = false;
  topPosEditorElement = 0;
  isSticky: boolean;
  lastStickyTimestamp: number | undefined;
  lastTimePainted: number;

  private intersectionObserver?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;
  private sentinels: {
    top?: HTMLElement | null;
    bottom?: HTMLElement | null;
  } = {};
  private stickyRowHeight?: number;

  get tree(): TableDOMElements | null | undefined {
    return getTree(this.dom);
  }

  constructor(
    node: PmNode,
    view: EditorView,
    getPos: any,
    eventDispatcher: EventDispatcher,
  ) {
    this.view = view;
    this.node = node;
    this.getPos = getPos;
    this.eventDispatcher = eventDispatcher;

    this.dom = document.createElement('tr');
    this.contentDOM = this.dom;

    this.lastTimePainted = 0;
    this.isHeaderRow = supportedHeaderRow(node);
    this.isSticky = false;
    this.lastStickyTimestamp = undefined;

    if (this.isHeaderRow) {
      this.dom.setAttribute('data-header-row', 'true');
      this.subscribe();
    }
  }

  /* external events */
  listening = false;

  headerRowMouseScrollEnd = debounce(() => {
    this.dom.classList.remove('no-pointer-events');
  }, HEADER_ROW_SCROLL_RESET_DEBOUNCE_TIMEOUT);

  // When the header is sticky, the header row is set to position: fixed
  // This prevents mouse wheel scrolling on the scroll-parent div when user's mouse is hovering the header row.
  // This fix sets pointer-events: none on the header row briefly to avoid this behaviour
  headerRowMouseScroll = throttle(() => {
    if (this.isSticky) {
      this.dom.classList.add('no-pointer-events');
      this.headerRowMouseScrollEnd();
    }
  }, HEADER_ROW_SCROLL_THROTTLE_TIMEOUT);

  subscribe() {
    this.editorScrollableElement =
      findOverflowScrollParent(this.view.dom as HTMLElement) || window;

    if (this.editorScrollableElement) {
      this.initObservers();
      this.topPosEditorElement = getTop(this.editorScrollableElement);
    }

    this.eventDispatcher.on('widthPlugin', this.updateStickyHeaderWidth);

    this.eventDispatcher.on(
      (tablePluginKey as any).key,
      this.onTablePluginState,
    );

    this.listening = true;

    this.dom.addEventListener('wheel', this.headerRowMouseScroll.bind(this));
    this.dom.addEventListener(
      'touchmove',
      this.headerRowMouseScroll.bind(this),
    );
  }

  unsubscribe() {
    if (!this.listening) {
      return;
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      // ED-16211 Once intersection observer is disconnected, we need to remove the isObserved from the sentinels
      // Otherwise when new intersection observer is created it will not observe because it thinks its already being observed
      [this.sentinels.top, this.sentinels.bottom].forEach((el) => {
        if (el) {
          delete el.dataset.isObserved;
        }
      });
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    this.eventDispatcher.off('widthPlugin', this.updateStickyHeaderWidth);
    this.eventDispatcher.off(
      (tablePluginKey as any).key,
      this.onTablePluginState,
    );

    this.listening = false;

    this.dom.removeEventListener('wheel', this.headerRowMouseScroll);
    this.dom.removeEventListener('touchmove', this.headerRowMouseScroll);
  }

  // initialize intersection observer to track if table is within scroll area
  private initObservers() {
    if (!this.dom || this.dom.dataset.isObserved) {
      return;
    }
    this.dom.dataset.isObserved = 'true';
    this.createIntersectionObserver();
    this.createResizeObserver();

    if (!this.intersectionObserver || !this.resizeObserver) {
      return;
    }

    this.resizeObserver.observe(this.dom);
    if (this.editorScrollableElement) {
      this.resizeObserver.observe(this.editorScrollableElement as HTMLElement);
    }

    window.requestAnimationFrame(() => {
      // we expect tree to be defined after animation frame
      const tableContainer = this.tree?.wrapper.closest(
        `.${TableCssClassName.NODEVIEW_WRAPPER}`,
      );
      if (tableContainer) {
        this.sentinels.top = tableContainer
          .getElementsByClassName(ClassName.TABLE_STICKY_SENTINEL_TOP)
          .item(0) as HTMLElement;
        this.sentinels.bottom = tableContainer
          .getElementsByClassName(ClassName.TABLE_STICKY_SENTINEL_BOTTOM)
          .item(0) as HTMLElement;
        [this.sentinels.top, this.sentinels.bottom].forEach((el) => {
          // skip if already observed for another row on this table
          if (el && !el.dataset.isObserved) {
            el.dataset.isObserved = 'true';
            this.intersectionObserver!.observe(el);
          }
        });
      }
    });
  }

  // updating bottom sentinel position if sticky header height changes
  // to allocate for new header height
  private createResizeObserver() {
    this.resizeObserver = new ResizeObserver((entries) => {
      if (!this.tree) {
        return;
      }
      const { table } = this.tree;
      entries.forEach((entry) => {
        // On resize of the parent scroll element we need to adjust the width
        // of the sticky header
        if (
          entry.target.className ===
          (this.editorScrollableElement as HTMLElement)?.className
        ) {
          this.updateStickyHeaderWidth();
        } else {
          const newHeight = entry.contentRect
            ? entry.contentRect.height
            : (entry.target as HTMLElement).offsetHeight;

          if (
            this.sentinels.bottom &&
            // When the table header is sticky, it would be taller by a 1px (border-bottom),
            // So we adding this check to allow a 1px difference.
            Math.abs(newHeight - (this.stickyRowHeight || 0)) >
              stickyHeaderBorderBottomWidth
          ) {
            this.stickyRowHeight = newHeight;
            this.sentinels.bottom.style.bottom = `${
              tableScrollbarOffset + stickyRowOffsetTop + newHeight
            }px`;

            updateTableMargin(table);
          }
        }
      });
    });
  }

  private createIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], _: IntersectionObserver) => {
        if (!this.tree) {
          return;
        }
        const { table } = this.tree;

        if (table.rows.length < 2) {
          // ED-19307 - When there's only one row in a table the top & bottom sentinels become inverted. This creates some nasty visiblity
          // toggling side-effects because the intersection observers gets confused.
          return;
        }

        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          // if the rootBounds has 0 height, e.g. confluence preview mode, we do nothing.
          if (entry.rootBounds?.height === 0) {
            return;
          }

          if (target.classList.contains(ClassName.TABLE_STICKY_SENTINEL_TOP)) {
            const sentinelIsBelowScrollArea =
              (entry.rootBounds?.bottom || 0) < entry.boundingClientRect.bottom;

            if (!entry.isIntersecting && !sentinelIsBelowScrollArea) {
              this.tree &&
                this.makeHeaderRowSticky(this.tree, entry.rootBounds?.top);
              this.lastStickyTimestamp = Date.now();
            } else {
              table && this.makeRowHeaderNotSticky(table);
            }
          }

          if (
            target.classList.contains(ClassName.TABLE_STICKY_SENTINEL_BOTTOM)
          ) {
            const sentinelIsAboveScrollArea =
              entry.boundingClientRect.top - this.dom.offsetHeight <
              (entry.rootBounds?.top || 0);

            if (table && !entry.isIntersecting && sentinelIsAboveScrollArea) {
              // Not a perfect solution, but need to this code specific for FireFox ED-19177
              if (browser.gecko) {
                if (
                  this.lastStickyTimestamp &&
                  Date.now() - this.lastStickyTimestamp >
                    STICKY_HEADER_TOGGLE_TOLERANCE_MS
                ) {
                  this.makeRowHeaderNotSticky(table);
                }
              } else {
                this.makeRowHeaderNotSticky(table);
              }
            } else if (entry.isIntersecting && sentinelIsAboveScrollArea) {
              this.tree &&
                this.makeHeaderRowSticky(this.tree, entry?.rootBounds?.top);
              this.lastStickyTimestamp = Date.now();
            }
          }
          return;
        });
      },
      { root: this.editorScrollableElement as Element },
    );
  }

  /* paint/update loop */
  previousDomTop: number | undefined;
  previousPadding: number | undefined;

  latestDomTop: number | undefined;

  nextFrame: number | undefined;

  /* nodeview lifecycle */
  update(node: PmNode, ..._args: any[]) {
    // do nothing if nodes were identical
    if (node === this.node) {
      return true;
    }

    // see if we're changing into a header row or
    // changing away from one
    const newNodeIsHeaderRow = supportedHeaderRow(node);
    if (this.isHeaderRow !== newNodeIsHeaderRow) {
      return false; // re-create nodeview
    }

    // node is different but no need to re-create nodeview
    this.node = node;

    // don't do anything if we're just a regular tr
    if (!this.isHeaderRow) {
      return true;
    }

    // something changed, sync widths
    const tbody = this.dom.parentElement;
    const table = tbody && tbody.parentElement;
    syncStickyRowToTable(table);

    return true;
  }

  destroy() {
    this.unsubscribe();

    if (this.tree) {
      this.makeRowHeaderNotSticky(this.tree.table, true);
    }

    this.emitOff(true);
  }

  ignoreMutation(
    mutationRecord: MutationRecord | { type: 'selection'; target: Element },
  ) {
    /* tableRows are not directly editable by the user
     * so it should be safe to ignore mutations that we cause
     * by updating styles and classnames on this DOM element
     *
     * Update: should not ignore mutations for row selection to avoid known issue with table selection highlight in firefox
     * Related bug report: https://bugzilla.mozilla.org/show_bug.cgi?id=1289673
     * */
    const isTableSelection =
      mutationRecord.type === 'selection' &&
      mutationRecord.target.nodeName === 'TR';
    /**
     * Update: should not ignore mutations when an node is added, as this interferes with
     * prosemirrors handling of some language inputs in Safari (ie. Pinyin, Hiragana).
     *
     * In paticular, when a composition occurs at the start of the first node inside a table cell, if the resulting mutation
     * from the composition end is ignored than prosemirror will end up with; invalid table markup nesting and a misplaced
     * selection and insertion.
     */
    const isNodeInsertion =
      mutationRecord.type === 'childList' &&
      mutationRecord.target.nodeName === 'TR' &&
      mutationRecord.addedNodes.length;

    if (isTableSelection || isNodeInsertion) {
      return false;
    }

    return true;
  }

  /* receive external events */

  onTablePluginState = (state: TablePluginState) => {
    const tableRef = state.tableRef;

    const tree = this.tree;
    if (!tree) {
      return;
    }

    // when header rows are toggled off - mark sentinels as unobserved
    if (!state.isHeaderRowEnabled) {
      [this.sentinels.top, this.sentinels.bottom].forEach((el) => {
        if (el) {
          delete el.dataset.isObserved;
        }
      });
    }

    const isCurrentTableSelected = tableRef === tree.table;

    // If current table selected and header row is toggled off, turn off sticky header
    if (isCurrentTableSelected && !state.isHeaderRowEnabled && this.tree) {
      this.makeRowHeaderNotSticky(this.tree.table);
    }
    this.focused = isCurrentTableSelected;

    const { wrapper } = tree;

    const tableContainer = wrapper.parentElement!;
    const tableContentWrapper = tableContainer.parentElement;

    const layoutContainer =
      tableContentWrapper && tableContentWrapper.parentElement;

    if (isCurrentTableSelected) {
      this.colControlsOffset = tableControlsSpacing;

      if (
        layoutContainer &&
        layoutContainer.getAttribute('data-layout-content')
      ) {
        // move table a little out of the way
        // to provide spacing for table controls
        tableContentWrapper!.style.paddingLeft = '11px';
      }
    } else {
      this.colControlsOffset = 0;
      if (
        layoutContainer &&
        layoutContainer.getAttribute('data-layout-content')
      ) {
        tableContentWrapper!.style.removeProperty('padding-left');
      }
    }

    // run after table style changes have been committed
    setTimeout(() => {
      syncStickyRowToTable(tree.table);
    }, 0);
  };

  updateStickyHeaderWidth = () => {
    // table width might have changed, sync that back to sticky row
    const tree = this.tree;
    if (!tree) {
      return;
    }

    syncStickyRowToTable(tree.table);
  };

  shouldHeaderStick = (tree: TableDOMElements): boolean => {
    const { wrapper } = tree;
    const tableWrapperRect = wrapper.getBoundingClientRect();
    const editorAreaRect = (
      this.editorScrollableElement as HTMLElement
    ).getBoundingClientRect();

    const stickyHeaderRect = this.contentDOM.getBoundingClientRect();
    const firstHeaderRow = !this.dom.previousElementSibling;
    const subsequentRows = !!this.dom.nextElementSibling;
    const isHeaderValid = firstHeaderRow && subsequentRows;

    // if the table wrapper is less than the editor top pos then make it sticky
    // Make header sticky if table wrapper top is outside viewport
    //  but bottom is still in the viewport.
    if (
      tableWrapperRect.top < editorAreaRect.top &&
      tableWrapperRect.bottom > editorAreaRect.top &&
      isHeaderValid
    ) {
      return true;
    }

    // if the sticky header is below the editor area make it non-sticky
    if (stickyHeaderRect.top > editorAreaRect.top) {
      return false;
    }

    // otherwise make it non-sticky
    return false;
  };

  makeHeaderRowSticky = (tree: TableDOMElements, scrollTop?: number) => {
    // If header row height is more than 50% of viewport height don't do this
    if (this.stickyRowHeight && this.stickyRowHeight > window.innerHeight / 2) {
      return;
    }

    const { table, wrapper } = tree;

    // ED-16035 Make sure sticky header is only applied to first row
    const tbody = this.dom.parentElement;
    const isFirstHeader = tbody?.firstChild?.isEqualNode(this.dom);
    if (!isFirstHeader) {
      return;
    }

    const currentTableTop = this.getCurrentTableTop(tree);

    if (!scrollTop) {
      scrollTop = getTop(this.editorScrollableElement);
    }

    const domTop =
      currentTableTop > 0 ? scrollTop : scrollTop + currentTableTop;

    if (!this.isSticky) {
      syncStickyRowToTable(table);
      this.dom.classList.add('sticky');
      table.classList.add(ClassName.TABLE_STICKY);

      this.isSticky = true;
    }

    this.dom.style.top = `${domTop}px`;
    updateTableMargin(table);
    this.dom.scrollLeft = wrapper.scrollLeft;

    this.emitOn(domTop, this.colControlsOffset);
  };

  makeRowHeaderNotSticky = (
    table: HTMLElement,
    isEditorDestroyed: boolean = false,
  ) => {
    if (!this.isSticky || !table || !this.dom) {
      return;
    }

    this.dom.style.removeProperty('width');
    this.dom.classList.remove('sticky');
    table.classList.remove(ClassName.TABLE_STICKY);

    this.isSticky = false;
    this.dom.style.top = '';
    table.style.removeProperty('margin-top');

    this.emitOff(isEditorDestroyed);
  };

  getWrapperoffset = (inverse: boolean = false): number => {
    const focusValue = inverse ? !this.focused : this.focused;
    return focusValue ? 0 : tableControlsSpacing;
  };

  getWrapperRefTop = (wrapper: HTMLElement): number =>
    Math.round(getTop(wrapper)) + this.getWrapperoffset();

  // TODO: rename!
  getScrolledTableTop = (wrapper: HTMLElement): number =>
    this.getWrapperRefTop(wrapper) - this.topPosEditorElement;

  getCurrentTableTop = (tree: TableDOMElements): number =>
    this.getScrolledTableTop(tree.wrapper) + tree.table.clientHeight;

  /* emit external events */

  padding = 0;
  top = 0;

  emitOn = (top: number, padding: number) => {
    if (top === this.top && padding === this.padding) {
      return;
    }

    this.top = top;
    this.padding = padding;

    updateStickyState({
      pos: this.getPos(),
      top,
      sticky: true,
      padding,
    })(this.view.state, this.view.dispatch, this.view);
  };

  emitOff = (isEditorDestroyed: boolean) => {
    if (this.top === 0 && this.padding === 0) {
      return;
    }

    this.top = 0;
    this.padding = 0;

    if (!isEditorDestroyed) {
      updateStickyState({
        pos: this.getPos(),
        sticky: false,
        top: this.top,
        padding: this.padding,
      })(this.view.state, this.view.dispatch, this.view);
    }
  };
}
