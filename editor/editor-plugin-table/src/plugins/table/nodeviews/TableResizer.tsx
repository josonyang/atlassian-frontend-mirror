import type { PropsWithChildren } from 'react';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import rafSchd from 'raf-schd';

import type { TableEventPayload } from '@atlaskit/editor-common/analytics';
import { getGuidelinesWithHighlights } from '@atlaskit/editor-common/guideline';
import type { GuidelineConfig } from '@atlaskit/editor-common/guideline';
import type {
  HandleHeightSizeType,
  HandleResize,
} from '@atlaskit/editor-common/resizer';
import { ResizerNext } from '@atlaskit/editor-common/resizer';
import { resizerHandleShadowClassName } from '@atlaskit/editor-common/styles';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { Transaction } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { findTable } from '@atlaskit/editor-tables/utils';

import {
  COLUMN_MIN_WIDTH,
  getColgroupChildrenLength,
  previewScaleTable,
  scaleTable,
} from '../pm-plugins/table-resizing/utils';
import { pluginKey as tableWidthPluginKey } from '../pm-plugins/table-width';
import {
  TABLE_HIGHLIGHT_GAP,
  TABLE_HIGHLIGHT_TOLERANCE,
  TABLE_SNAP_GAP,
} from '../ui/consts';
import {
  generateResizedPayload,
  generateResizeFrameRatePayloads,
  useMeasureFramerate,
} from '../utils/analytics';
import { defaultGuidelines } from '../utils/guidelines';
import { defaultSnappingWidths, findClosestSnap } from '../utils/snapping';

interface TableResizerProps {
  width: number;
  maxWidth: number;
  updateWidth: (width: number) => void;
  editorView: EditorView;
  getPos: () => number | undefined;
  node: PMNode;
  tableRef: HTMLTableElement;
  displayGuideline: (guideline: GuidelineConfig[]) => boolean;
  attachAnalyticsEvent: (
    payload: TableEventPayload,
  ) => ((tr: Transaction) => boolean) | undefined;
}

const handles = { right: true };
const tableHandleMarginTop = 12;
const tableHandlePosition = 14;

const getResizerHandleHeight = (tableRef: HTMLTableElement) => {
  const tableHeight = tableRef?.clientHeight;
  let handleHeightSize: HandleHeightSizeType | undefined = 'small';
  /*
    - One row table height (minimum possible table height) ~ 45px
    - Two row table height ~ 90px
    - Three row table height ~ 134px

    In the if below we need to use:
    - > 46 because the height of the table can be a float number like 45.44.
    - < 96 is the height of large resize handle.
  */
  if (tableHeight && tableHeight > 46 && tableHeight < 96) {
    handleHeightSize = 'medium';
  } else if (tableHeight && tableHeight >= 96) {
    handleHeightSize = 'large';
  }

  return handleHeightSize;
};

const getResizerMinWidth = (node: PMNode) => {
  const currentColumnCount = getColgroupChildrenLength(node);
  const minColumnWidth =
    currentColumnCount <= 3
      ? currentColumnCount * COLUMN_MIN_WIDTH
      : 3 * COLUMN_MIN_WIDTH;
  // add an extra pixel as the scale table logic will scale columns to be tableContainerWidth - 1
  // the table can't scale past its min-width, so instead restrict table container min width to avoid that situation
  return minColumnWidth + 1;
};

export const TableResizer = ({
  children,
  width,
  maxWidth,
  updateWidth,
  editorView,
  getPos,
  node,
  tableRef,
  displayGuideline,
  attachAnalyticsEvent,
}: PropsWithChildren<TableResizerProps>) => {
  const currentGap = useRef(0);
  const [snappingEnabled, setSnappingEnabled] = useState(false);

  const resizerMinWidth = getResizerMinWidth(node);
  const handleHeightSize = getResizerHandleHeight(tableRef);

  const { startMeasure, endMeasure, countFrames } = useMeasureFramerate();

  const updateActiveGuidelines = useCallback(
    ({ gap, keys }: { gap: number; keys: string[] }) => {
      if (gap !== currentGap.current) {
        currentGap.current = gap;
        displayGuideline(
          getGuidelinesWithHighlights(
            gap,
            TABLE_SNAP_GAP,
            keys,
            defaultGuidelines,
          ),
        );
      }
    },
    [displayGuideline],
  );

  const guidelineSnaps = useMemo(
    () =>
      snappingEnabled
        ? {
            x: defaultSnappingWidths,
          }
        : undefined,
    [snappingEnabled],
  );

  const handleResizeStart = useCallback(() => {
    startMeasure();

    const {
      dispatch,
      state: { tr },
    } = editorView;

    dispatch(tr.setMeta(tableWidthPluginKey, { resizing: true }));

    setSnappingEnabled(displayGuideline(defaultGuidelines));
  }, [displayGuideline, editorView, startMeasure]);

  const handleResize = useCallback(
    (originalState, delta) => {
      countFrames();
      const newWidth = originalState.width + delta.width;
      const pos = getPos();
      if (typeof pos !== 'number') {
        return;
      }

      previewScaleTable(
        tableRef,
        {
          node,
          prevNode: node,
          start: pos + 1,
          parentWidth: newWidth,
        },
        editorView.domAtPos.bind(editorView),
      );

      updateActiveGuidelines(
        findClosestSnap(
          newWidth,
          defaultSnappingWidths,
          defaultGuidelines,
          TABLE_HIGHLIGHT_GAP,
          TABLE_HIGHLIGHT_TOLERANCE,
        ),
      );

      updateWidth(newWidth);

      return newWidth;
    },
    [
      editorView,
      getPos,
      node,
      tableRef,
      updateWidth,
      updateActiveGuidelines,
      countFrames,
    ],
  );

  const scheduleResize = useMemo(() => rafSchd(handleResize), [handleResize]);

  const handleResizeStop = useCallback<HandleResize>(
    (originalState, delta) => {
      const newWidth = originalState.width + delta.width;
      const { state, dispatch } = editorView;
      const pos = getPos();

      let tr = state.tr.setMeta(tableWidthPluginKey, { resizing: false });
      const frameRateSamples = endMeasure();

      if (frameRateSamples.length > 0) {
        const resizeFrameRatePayloads = generateResizeFrameRatePayloads({
          docSize: state.doc.nodeSize,
          frameRateSamples,
          originalNode: node,
        });
        resizeFrameRatePayloads.forEach((payload) => {
          attachAnalyticsEvent(payload)?.(tr);
        });
      }

      if (typeof pos === 'number') {
        tr = tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          width: newWidth,
        });

        const newNode = tr.doc.nodeAt(pos)!;
        tr = scaleTable(
          tableRef,
          {
            node: newNode,
            prevNode: node,
            start: pos + 1,
            parentWidth: newWidth,
          },
          editorView.domAtPos.bind(editorView),
        )(tr);

        const scaledNode = tr.doc.nodeAt(pos)!;

        attachAnalyticsEvent(
          generateResizedPayload({
            originalNode: node,
            resizedNode: scaledNode,
          }),
        )?.(tr);
      }

      dispatch(tr);

      // Hide guidelines when resizing stops
      displayGuideline([]);
      updateWidth(newWidth);
      scheduleResize.cancel();

      return newWidth;
    },
    [
      updateWidth,
      editorView,
      getPos,
      node,
      tableRef,
      scheduleResize,
      displayGuideline,
      attachAnalyticsEvent,
      endMeasure,
    ],
  );

  const handleComponent = useMemo(
    () => ({
      left: (
        <div
          className={resizerHandleShadowClassName}
          style={{ height: 'calc(100% - 24px)' }}
        />
      ),
      right: (
        <div
          className={resizerHandleShadowClassName}
          style={{ height: 'calc(100% - 24px)' }}
        />
      ),
    }),
    [],
  );

  return (
    <ResizerNext
      enable={handles}
      width={width}
      handleAlignmentMethod="sticky"
      handleHeightSize={handleHeightSize}
      handleMarginTop={tableHandleMarginTop}
      handleResizeStart={handleResizeStart}
      handleResize={scheduleResize}
      handleResizeStop={handleResizeStop}
      resizeRatio={2}
      minWidth={resizerMinWidth}
      maxWidth={maxWidth}
      snapGap={TABLE_SNAP_GAP}
      snap={guidelineSnaps}
      handlePositioning="adjacent"
      innerPadding={tableHandlePosition}
      isHandleVisible={findTable(editorView.state?.selection)?.pos === getPos()}
      handleComponent={handleComponent}
    >
      {children}
    </ResizerNext>
  );
};
