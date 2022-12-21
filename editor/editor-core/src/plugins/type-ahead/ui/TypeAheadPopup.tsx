/** @jsx jsx */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
  useRef,
} from 'react';
import { css, jsx } from '@emotion/react';
import { EditorView, DecorationSet } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import rafSchedule from 'raf-schd';

import { akEditorFloatingDialogZIndex } from '@atlaskit/editor-shared-styles';
import { findOverflowScrollParent, Popup } from '@atlaskit/editor-common/ui';
import type { SelectItemMode } from '@atlaskit/editor-common/type-ahead';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';
import { N0, N60A, N50A } from '@atlaskit/theme/colors';
import {
  ACTION,
  ACTION_SUBJECT,
  EVENT_TYPE,
  FireAnalyticsCallback,
} from '@atlaskit/editor-common/analytics';
import {
  CloseSelectionOptions,
  TYPE_AHEAD_DECORATION_DATA_ATTRIBUTE,
  TYPE_AHEAD_POPUP_CONTENT_CLASS,
} from '../constants';

import { TypeAheadList } from './TypeAheadList';
import type { TypeAheadHandler, TypeAheadItem, OnSelectItem } from '../types';
import { ITEM_PADDING } from './TypeAheadListItem';
import { token } from '@atlaskit/tokens';

const DEFAULT_TYPEAHEAD_MENU_HEIGHT = 380;

const typeAheadContent = css`
  background: ${token('elevation.surface.overlay', N0)};
  border-radius: ${borderRadius()}px;
  box-shadow: ${token(
    'elevation.shadow.overlay',
    `0 0 1px ${N60A}, 0 4px 8px -2px ${N50A}`,
  )};
  padding: ${gridSize() / 2}px 0;
  width: 320px;
  max-height: 380px; /* ~5.5 visibile items */
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: relative;
`;

type TypeAheadPopupProps = {
  triggerHandler: TypeAheadHandler;
  editorView: EditorView;
  anchorElement: HTMLElement;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  fireAnalyticsCallback: FireAnalyticsCallback;
  items: Array<TypeAheadItem>;
  selectedIndex: number;
  setSelectedItem: OnSelectItem;
  decorationSet: DecorationSet;
  isEmptyQuery: boolean;
  onItemInsert: (mode: SelectItemMode, index: number) => void;
  cancel: (params: {
    setSelectionAt: CloseSelectionOptions;
    addPrefixTrigger: boolean;
    forceFocusOnEditor: boolean;
  }) => void;
};

type HighlightProps = {
  state: EditorState;
  triggerHandler: TypeAheadHandler;
};
const Highlight: React.FC<HighlightProps> = ({ state, triggerHandler }) => {
  if (!triggerHandler?.getHighlight) {
    return null;
  }

  return triggerHandler.getHighlight(state);
};

const OFFSET = [0, 8];
export const TypeAheadPopup: React.FC<TypeAheadPopupProps> = React.memo(
  (props) => {
    const {
      editorView,
      triggerHandler,
      anchorElement,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      items,
      selectedIndex,
      onItemInsert,
      fireAnalyticsCallback,
      isEmptyQuery,
      cancel,
    } = props;

    const ref = useRef<HTMLDivElement>(
      null,
    ) as React.MutableRefObject<HTMLDivElement>;

    const startTime = useMemo(
      () => performance.now(),
      // In case those props changes
      // we need to recreate the startTime
      [items, isEmptyQuery, fireAnalyticsCallback, triggerHandler], // eslint-disable-line react-hooks/exhaustive-deps
    );
    useEffect(() => {
      if (!fireAnalyticsCallback) {
        return;
      }
      const stopTime = performance.now();
      const time = stopTime - startTime;

      fireAnalyticsCallback({
        payload: {
          action: ACTION.RENDERED,
          actionSubject: ACTION_SUBJECT.TYPEAHEAD,
          eventType: EVENT_TYPE.OPERATIONAL,
          attributes: {
            time,
            items: items.length,
            initial: isEmptyQuery,
          },
        },
      });
    }, [
      startTime,
      items,
      fireAnalyticsCallback,
      isEmptyQuery,
      // In case the current triggerHandler changes
      // e.g: Inserting a mention using the quick insert
      // we need to send the event again
      // eslint-disable-next-line react-hooks/exhaustive-deps
      triggerHandler,
    ]);

    useEffect(() => {
      if (!fireAnalyticsCallback) {
        return;
      }

      fireAnalyticsCallback({
        payload: {
          action: ACTION.VIEWED,
          actionSubject: ACTION_SUBJECT.TYPEAHEAD_ITEM,
          eventType: EVENT_TYPE.OPERATIONAL,
          attributes: {
            index: selectedIndex,
            items: items.length,
          },
        },
      });
    }, [
      items,
      fireAnalyticsCallback,
      selectedIndex,
      // In case the current triggerHandler changes
      // e.g: Inserting a mention using the quick insert
      // we need to send the event again
      // eslint-disable-next-line react-hooks/exhaustive-deps
      triggerHandler,
    ]);

    const [fitHeight, setFitHeight] = useState(DEFAULT_TYPEAHEAD_MENU_HEIGHT);

    const getFitHeight = useCallback(() => {
      if (!anchorElement || !popupsMountPoint) {
        return;
      }
      const target: HTMLElement = anchorElement;
      const { top: targetTop, height: targetHeight } =
        target.getBoundingClientRect();

      const boundariesElement: HTMLElement = document.body;
      const { height: boundariesHeight, top: boundariesTop } =
        boundariesElement.getBoundingClientRect();

      // Calculating the space above and space below our decoration
      const spaceAbove =
        targetTop - (boundariesTop - boundariesElement.scrollTop);
      const spaceBelow =
        boundariesTop + boundariesHeight - (targetTop + targetHeight);

      // Keep default height if more than enough space
      if (spaceBelow >= DEFAULT_TYPEAHEAD_MENU_HEIGHT) {
        return setFitHeight(DEFAULT_TYPEAHEAD_MENU_HEIGHT);
      }

      // Determines whether typeahead will fit above or below decoration
      // and return the space available.
      const newFitHeight = spaceBelow >= spaceAbove ? spaceBelow : spaceAbove;

      // Each typeahead item has some padding
      // We want to leave some space at the top so first item
      // is not partially cropped
      const fitHeightWithSpace = newFitHeight - ITEM_PADDING * 2;

      // Ensure typeahead height is max its default height
      const minFitHeight = Math.min(
        DEFAULT_TYPEAHEAD_MENU_HEIGHT,
        fitHeightWithSpace,
      );

      return setFitHeight(minFitHeight);
    }, [anchorElement, popupsMountPoint]);

    const getFitHeightDebounced = rafSchedule(getFitHeight);

    useLayoutEffect(() => {
      const scrollableElement =
        popupsScrollableElement || findOverflowScrollParent(anchorElement!);
      getFitHeight();
      window.addEventListener('resize', getFitHeightDebounced);
      if (scrollableElement) {
        scrollableElement.addEventListener('scroll', getFitHeightDebounced);
      }

      return () => {
        window.removeEventListener('resize', getFitHeightDebounced);
        if (scrollableElement) {
          scrollableElement.removeEventListener(
            'scroll',
            getFitHeightDebounced,
          );
        }
      };
    }, [
      anchorElement,
      popupsScrollableElement,
      getFitHeightDebounced,
      getFitHeight,
    ]);

    useLayoutEffect(() => {
      const focusOut = (event: FocusEvent) => {
        const { relatedTarget } = event;

        // Given the user is changing the focus
        // When the target is inside the TypeAhead Popup
        // Then the popup should stay open
        if (
          relatedTarget instanceof HTMLElement &&
          relatedTarget.closest &&
          (relatedTarget.closest(`.${TYPE_AHEAD_POPUP_CONTENT_CLASS}`) ||
            relatedTarget.closest(
              `[data-type-ahead="${TYPE_AHEAD_DECORATION_DATA_ATTRIBUTE}"]`,
            ))
        ) {
          return;
        }

        if (!(window.getSelection()?.type === 'Range')) {
          return;
        }
        cancel({
          addPrefixTrigger: true,
          setSelectionAt: CloseSelectionOptions.AFTER_TEXT_INSERTED,
          forceFocusOnEditor: false,
        });
      };
      const { current: element } = ref;
      element?.addEventListener('focusout', focusOut);
      return () => {
        element?.removeEventListener('focusout', focusOut);
      };
    }, [ref, cancel]);

    return (
      <Popup
        zIndex={akEditorFloatingDialogZIndex}
        target={anchorElement}
        mountTo={popupsMountPoint}
        boundariesElement={popupsBoundariesElement}
        scrollableElement={popupsScrollableElement}
        fitHeight={fitHeight}
        fitWidth={340}
        offset={OFFSET}
      >
        <div
          css={typeAheadContent}
          tabIndex={0}
          className={TYPE_AHEAD_POPUP_CONTENT_CLASS}
          ref={ref}
        >
          <Highlight state={editorView.state} triggerHandler={triggerHandler} />
          <TypeAheadList
            items={items}
            selectedIndex={selectedIndex}
            onItemClick={onItemInsert}
            fitHeight={fitHeight}
            editorView={editorView}
            decorationElement={anchorElement}
          />
        </div>
      </Popup>
    );
  },
);

TypeAheadPopup.displayName = 'TypeAheadPopup';
