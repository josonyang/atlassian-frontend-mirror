import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useRef,
} from 'react';

import classNames from 'classnames';

import { TableEventPayload } from '@atlaskit/editor-common/analytics';
import type { GuidelineConfig } from '@atlaskit/editor-common/guideline';
import { getTableContainerWidth } from '@atlaskit/editor-common/node-width';
import { calcTableWidth } from '@atlaskit/editor-common/styles';
import { EditorContainerWidth } from '@atlaskit/editor-common/types';
import { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { EditorView } from '@atlaskit/editor-prosemirror/view';
import { akEditorMobileBreakoutPoint } from '@atlaskit/editor-shared-styles';

import { TABLE_MAX_WIDTH } from '../pm-plugins/table-resizing/utils';
import { TableCssClassName as ClassName, PluginInjectionAPI } from '../types';

import { TableResizer } from './TableResizer';

const getMarginLeft = (lineLength: number, tableWidth: number | 'inherit') => {
  let marginLeft;
  if (tableWidth !== 'inherit' && lineLength) {
    const containerWidth = tableWidth;

    if (containerWidth) {
      marginLeft = (lineLength - containerWidth) / 2;
    }
  }

  return marginLeft;
};

type InnerContainerProps = {
  className: string;
  style?: {
    width: number | 'inherit';
    marginLeft: number | undefined;
  };
  node: PMNode;
};

export const InnerContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<InnerContainerProps>
>(({ className, style, node, children }, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      className={className}
      data-number-column={node.attrs.isNumberColumnEnabled}
      data-layout={node.attrs.layout}
      data-test-id="table-container"
    >
      {children}
    </div>
  );
});

type ResizableTableContainerProps = {
  containerWidth: number;
  lineLength: number;
  node: PMNode;
  className: string;
  editorView: EditorView;
  getPos: () => number | undefined;
  tableRef: HTMLTableElement;
  pluginInjectionApi?: PluginInjectionAPI;
};

export const ResizableTableContainer = ({
  children,
  className,
  node,
  lineLength,
  containerWidth,
  editorView,
  getPos,
  tableRef,
  pluginInjectionApi,
}: PropsWithChildren<ResizableTableContainerProps>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const marginLeftRef = useRef<number | undefined>(0);

  const updateWidth = useCallback(
    (width: number) => {
      if (!containerRef.current) {
        return;
      }

      const marginLeft = getMarginLeft(lineLength, width);

      if (marginLeftRef.current !== marginLeft) {
        marginLeftRef.current = marginLeft;

        if (Number.isFinite(marginLeft)) {
          containerRef.current.style.marginLeft = `${marginLeft}px`;
        }
      }
    },
    [lineLength],
  );

  const displayGuideline = useCallback(
    (guidelines: GuidelineConfig[]) => {
      return (
        pluginInjectionApi?.dependencies?.guideline?.actions?.displayGuideline(
          editorView,
        )({ guidelines }) ?? false
      );
    },
    [pluginInjectionApi, editorView],
  );

  const attachAnalyticsEvent = useCallback(
    (payload: TableEventPayload) => {
      return pluginInjectionApi?.dependencies?.analytics?.actions.attachAnalyticsEvent(
        payload,
      );
    },
    [pluginInjectionApi],
  );

  const tableWidth = getTableContainerWidth(node);
  // 76 is currently an accepted padding value considering the spacing for resizer handle
  const responsiveContainerWidth = containerWidth - 76;
  const width = Math.min(tableWidth, responsiveContainerWidth);
  marginLeftRef.current = getMarginLeft(lineLength, width);
  const maxResizerWidth = Math.min(responsiveContainerWidth, TABLE_MAX_WIDTH);

  return (
    <div
      style={{ marginLeft: marginLeftRef.current, width }}
      className={ClassName.TABLE_RESIZER_CONTAINER}
      ref={containerRef}
    >
      <TableResizer
        width={width}
        maxWidth={maxResizerWidth}
        updateWidth={updateWidth}
        editorView={editorView}
        getPos={getPos}
        node={node}
        tableRef={tableRef}
        displayGuideline={displayGuideline}
        attachAnalyticsEvent={attachAnalyticsEvent}
      >
        <InnerContainer className={className} node={node}>
          {children}
        </InnerContainer>
      </TableResizer>
    </div>
  );
};

type TableContainerProps = {
  node: PMNode;
  className: string;
  containerWidth: EditorContainerWidth;
  isTableResizingEnabled: boolean | undefined;
  isBreakoutEnabled: boolean | undefined;
  editorView: EditorView;
  getPos: () => number | undefined;
  tableRef: HTMLTableElement;
  isNested: boolean;
  pluginInjectionApi?: PluginInjectionAPI;
};

export const TableContainer = ({
  children,
  node,
  className,
  containerWidth: { lineLength, width: editorWidth },
  isTableResizingEnabled,
  isBreakoutEnabled,
  editorView,
  getPos,
  tableRef,
  isNested,
  pluginInjectionApi,
}: PropsWithChildren<TableContainerProps>) => {
  if (isTableResizingEnabled && !isNested) {
    return (
      <ResizableTableContainer
        className={className}
        node={node}
        lineLength={lineLength!}
        containerWidth={editorWidth!}
        editorView={editorView}
        getPos={getPos}
        tableRef={tableRef}
        pluginInjectionApi={pluginInjectionApi}
      >
        {children}
      </ResizableTableContainer>
    );
  }

  const tableWidth = isBreakoutEnabled
    ? calcTableWidth(node.attrs.layout, editorWidth)
    : 'inherit';

  return (
    <InnerContainer
      node={node}
      className={classNames(className, {
        'less-padding': editorWidth < akEditorMobileBreakoutPoint,
      })}
      style={{
        width: tableWidth,
        marginLeft: getMarginLeft(lineLength!, tableWidth),
      }}
    >
      {children}
    </InnerContainer>
  );
};
