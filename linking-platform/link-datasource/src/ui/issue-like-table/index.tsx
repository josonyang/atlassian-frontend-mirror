/** @jsx jsx */
import { Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import invariant from 'tiny-invariant';

import Heading from '@atlaskit/heading';
import { Skeleton } from '@atlaskit/linking-common';
import {
  DatasourceResponseSchemaProperty,
  DatasourceType,
} from '@atlaskit/linking-types/datasource';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/adapter/element';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/util/combine';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/addon/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { autoScroller } from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-autoscroll';
import { N40 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import Tooltip from '@atlaskit/tooltip';

import {
  startUfoExperience,
  succeedUfoExperience,
} from '../../analytics/ufoExperiences';
import { stickyTableHeadersIndex } from '../../common/zindex';

import { ColumnPicker } from './column-picker';
import { DragColumnPreview } from './drag-column-preview';
import { DraggableTableHeading } from './draggable-table-heading';
import TableEmptyState from './empty-state';
import { fallbackRenderType } from './render-type';
import { Table, TableHeading } from './styled';
import { IssueLikeDataTableViewProps } from './types';
import { useIsOnScreen } from './useIsOnScreen';

const tableSidePadding = token('space.200', '16px');

const tableHeadStyles = css({
  background: token('elevation.surface', '#FFF'),
  position: 'sticky',
  top: 0,
  zIndex: stickyTableHeadersIndex,
});

const ColumnPickerHeader = styled.th`
  width: 56px;
  z-index: 10;
  position: sticky;
  right: calc(-1 * ${tableSidePadding});
  background-color: ${token('elevation.surface', '#FFF')};
  border-bottom: 2px solid ${token('color.border', N40)}; /* It is required to have solid (not half-transparent) color because of this gradient business below */

  padding-right: ${token('space.100', '4px')};

  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    ${token('elevation.surface', '#FFF')} 10%
  );
  vertical-align: middle; /* Keeps dropdown button in the middle */
  &:last-of-type {
    padding-right: ${tableSidePadding};
  }
  text-align: right; /* In case when TH itself is bigger we want to keep picker at the right side */
`;

const truncatedCellStyles = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  borderRight: `0.5px solid ${token('color.border', N40)}`,
  borderBottom: `0.5px solid ${token('color.border', N40)}`,
  '&:first-child': {
    paddingLeft: `${token('space.100', '4px')}`,
  },
  '&:last-child': {
    borderRight: 0,
    paddingRight: `${token('space.100', '4px')}`,
  },
});

const tableContainerStyles = css({
  borderRadius: 'inherit',
});

const scrollableContainerStyles = css({
  overflow: 'auto',
  boxSizing: 'border-box',
});

const tableStyles = css({
  // These styles are needed to prevent thead bottom border from scrolling away.
  // This happens because it is sticky. https://stackoverflow.com/questions/50361698/border-style-do-not-work-with-sticky-position-element
  borderCollapse: 'separate',
  borderSpacing: 0,
});

// By default tbody and thead have border-bottom: 2px ...
// This removes it, because for header we handle it via `th` styling and footer supply bottom border
const noDefaultBorderStyles = css({
  borderBottom: 0,
});

export interface RowType {
  cells: Array<RowCellType>;
  key?: string;
  ref?: Ref<HTMLTableRowElement>;
}

export interface RowCellType {
  key: string;
  width: number;
  shouldTruncate?: boolean;
  content?: React.ReactNode | string;
}

function extractIndex(data: Record<string, unknown>) {
  const { index } = data;
  invariant(typeof index === 'number');
  return index;
}

export const getOrderedColumns = (
  columns: DatasourceResponseSchemaProperty[],
  visibleColumnKeys: string[],
) => {
  const visibleColumns = columns
    .filter(column => visibleColumnKeys.includes(column.key))
    .sort((a, b) => {
      const indexB = visibleColumnKeys.indexOf(b.key);
      const indexA = visibleColumnKeys.indexOf(a.key);
      return indexA - indexB;
    });

  const invisibleColumns = columns.filter(
    column => !visibleColumnKeys.includes(column.key),
  );

  return [...visibleColumns, ...invisibleColumns];
};

const BASE_WIDTH = 8;
const DEFAULT_WIDTH = BASE_WIDTH * 22;
export const COLUMN_MIN_WIDTH = BASE_WIDTH * 3;
const keyBasedWidthMap: Record<string, number> = {
  priority: BASE_WIDTH * 4,
  status: BASE_WIDTH * 18,
  summary: BASE_WIDTH * 45,
  description: BASE_WIDTH * 31.25,
  type: BASE_WIDTH * 4,
  key: BASE_WIDTH * 13,
};

function getDefaultColumnWidth(
  key: string,
  type: DatasourceType['type'],
): number {
  const keyBasedWidth = keyBasedWidthMap[key];
  if (keyBasedWidth) {
    return keyBasedWidth;
  }

  switch (type) {
    case 'date':
      return BASE_WIDTH * 14;

    case 'icon':
      return BASE_WIDTH * 4;

    default:
      return DEFAULT_WIDTH;
  }
}

export const IssueLikeDataTableView = ({
  testId,
  onNextPage,
  onLoadDatasourceDetails,
  items,
  columns,
  renderItem = fallbackRenderType,
  visibleColumnKeys,
  onVisibleColumnKeysChange,
  columnCustomSizes,
  onColumnResize,
  status,
  hasNextPage,
  scrollableContainerHeight,
  parentContainerRenderInstanceId,
  extensionKey,
}: IssueLikeDataTableViewProps) => {
  const tableId = useMemo(() => Symbol('unique-id'), []);

  const tableHeaderRowRef = useRef<HTMLTableRowElement>(null);

  const [lastRowElement, setLastRowElement] =
    useState<HTMLTableRowElement | null>(null);
  const [hasFullSchema, setHasFullSchema] = useState(false);
  const isBottomOfTableVisibleRaw = useIsOnScreen(lastRowElement);

  const containerRef = useRef<HTMLDivElement>(null);

  const [orderedColumns, setOrderedColumns] = useState(() =>
    getOrderedColumns([...columns], [...visibleColumnKeys]),
  );

  useEffect(() => {
    if (!hasFullSchema) {
      setOrderedColumns(
        getOrderedColumns([...columns], [...visibleColumnKeys]),
      );
    }
  }, [columns, visibleColumnKeys, hasFullSchema]);

  useEffect(() => {
    if (parentContainerRenderInstanceId && status === 'resolved') {
      succeedUfoExperience(
        {
          name: 'datasource-rendered',
        },
        parentContainerRenderInstanceId,
      );
    }
  }, [parentContainerRenderInstanceId, status]);

  const visibleSortedColumns = useMemo(
    () =>
      visibleColumnKeys
        .map(visibleKey => orderedColumns.find(({ key }) => visibleKey === key))
        .filter(Boolean) as DatasourceResponseSchemaProperty[],
    [orderedColumns, visibleColumnKeys],
  );

  // TODO seems like this component can't handle some combination of incremental data retrieval.
  // If data comes first, then columns and then visibleColumnKeys it blows up,
  // or some other combination.

  const identityColumnKey = 'id';

  const getColumnWidth = useCallback(
    (key: string, type: DatasourceType['type']) =>
      columnCustomSizes?.[key] || getDefaultColumnWidth(key, type),
    [columnCustomSizes],
  );

  const headerColumns: Array<RowCellType> = useMemo(
    () =>
      visibleSortedColumns.map(
        ({ key, title, type }) =>
          ({
            key,
            content: title,
            shouldTruncate: true,
            width: getColumnWidth(key, type),
          } as RowCellType),
      ),
    [getColumnWidth, visibleSortedColumns],
  );

  const loadingRow: RowType = useMemo(
    () => ({
      key: 'loading',
      cells: headerColumns.map<RowCellType>(column => ({
        ...column,
        content: (
          <Skeleton
            borderRadius={8}
            width="100%"
            height={14}
            testId="issues-table-row-loading"
          />
        ),
      })),
    }),
    [headerColumns],
  );

  useEffect(() => {
    if (isBottomOfTableVisibleRaw && hasNextPage && status === 'resolved') {
      void onNextPage({
        isSchemaFromData: false,
        shouldForceRequest: true,
      });
    }
  }, [isBottomOfTableVisibleRaw, status, hasNextPage, onNextPage]);

  const hasData = items.length > 0;

  // This variable contains initial Y mouse coordinate, so we can restrict
  // autoScroller in X axis only
  const initialAutoScrollerClientY = useRef<number | null>();
  useEffect(() => {
    if (!onVisibleColumnKeysChange || !hasData) {
      return;
    }

    return combine(
      monitorForElements({
        onDragStart: ({ location, source }) => {
          initialAutoScrollerClientY.current = location.current.input.clientY;
          if (source.data.type === 'table-header') {
            autoScroller.start({
              input: {
                ...location.current.input,
                clientY:
                  // The goal is to have clientY the same and in the middle of the scrollable area
                  // Since clientY is taken from to of the viewport we need to plus that in order to get
                  // middle of the scrollable area in reference to the viewport
                  (initialAutoScrollerClientY.current || 0) +
                  (containerRef.current?.offsetHeight || 0) / 2,
              },
              behavior: 'container-only',
            });
          }
        },
        onDrag: ({ location, source }) => {
          if (source.data.type === 'table-header') {
            autoScroller.updateInput({
              input: {
                ...location.current.input,
                clientY:
                  (initialAutoScrollerClientY.current || 0) +
                  (containerRef.current?.offsetHeight || 0) / 2,
              },
            });
          }
        },
        onDrop({ source, location }) {
          autoScroller.stop();
          if (location.current.dropTargets.length === 0) {
            return;
          }

          const target = location.current.dropTargets[0];
          if (source.data.id === target.data.id) {
            return;
          }

          if (
            source.data.type === 'table-header' &&
            source.data.tableId === tableId
          ) {
            const closestEdgeOfTarget = extractClosestEdge(target.data);
            invariant(
              closestEdgeOfTarget === 'left' || closestEdgeOfTarget === 'right',
            );

            const startIndex = extractIndex(source.data);
            const indexOfTarget = extractIndex(target.data);

            const newColumnKeyOrder = reorderWithEdge({
              list: visibleColumnKeys,
              closestEdgeOfTarget,
              startIndex,
              indexOfTarget,
              axis: 'horizontal',
            });

            onVisibleColumnKeysChange?.([...newColumnKeyOrder]);

            // We sort columns (whole objects) according to their key order presented in newColumnKeyOrder
            setOrderedColumns(columns =>
              getOrderedColumns([...columns], [...newColumnKeyOrder]),
            );
          }
        },
      }),
    );
  }, [visibleColumnKeys, onVisibleColumnKeysChange, tableId, hasData]);

  const tableRows: Array<RowType> = useMemo(
    () =>
      items.map<RowType>((newRowData, rowIndex) => ({
        key: `${
          (identityColumnKey &&
            newRowData[identityColumnKey] &&
            newRowData[identityColumnKey].data) ||
          rowIndex
        }`,
        cells: visibleSortedColumns.map<RowCellType>(({ key, type }) => {
          const value = newRowData[key]?.data || newRowData[key];
          const values = Array.isArray(value) ? value : [value];
          const content = values.map(value =>
            renderItem({ type, value } as DatasourceType),
          );

          return {
            key,
            content: content.length === 1 ? content[0] : content,
            width: getColumnWidth(key, type),
          };
        }),
        ref:
          rowIndex === items.length - 1
            ? el => setLastRowElement(el)
            : undefined,
      })),
    [items, visibleSortedColumns, getColumnWidth, renderItem],
  );

  const rows = useMemo(() => {
    if (status !== 'loading') {
      return tableRows;
    }
    // if there are table rows, only add 1 loading row
    if (tableRows.length > 0) {
      return [
        ...tableRows,
        { ...loadingRow, key: `loading-${tableRows.length}` },
      ];
    }
    // if there are no table rows add 14 rows if it is compact (has scrollableContainerHeight or non-modal)
    // add 10 rows if it is modal (no scrollableContainerHeight)
    const loadingRowsCount = scrollableContainerHeight ? 14 : 10;
    return [...Array(loadingRowsCount)].map((_, index) => ({
      ...loadingRow,
      key: `loading-${index}`,
    }));
  }, [loadingRow, status, tableRows, scrollableContainerHeight]);

  const onSelectedColumnKeysChange = useCallback(
    (newSelectedColumnKeys: string[]) => {
      onVisibleColumnKeysChange?.(newSelectedColumnKeys);
    },
    [onVisibleColumnKeysChange],
  );

  const handlePickerOpen = useCallback(async () => {
    if (hasFullSchema) {
      return;
    }

    if (parentContainerRenderInstanceId) {
      startUfoExperience(
        {
          name: 'column-picker-rendered',
          metadata: { extensionKey: extensionKey ?? undefined },
        },
        parentContainerRenderInstanceId,
      );
    }

    try {
      await onLoadDatasourceDetails();
      setHasFullSchema(true);
    } catch (e) {
      setHasFullSchema(false);
    }
  }, [
    parentContainerRenderInstanceId,
    extensionKey,
    hasFullSchema,
    onLoadDatasourceDetails,
  ]);

  const shouldUseWidth = onColumnResize || columnCustomSizes;

  return (
    <div
      /* There is required contentEditable={true} in editor-card-plugin
       * But this brakes how DND works. We set contentEditable={false} to allow DND to work
       * when dragging is initiated on top of a column label.
       */
      contentEditable={false}
      ref={containerRef}
      css={[
        tableContainerStyles,
        scrollableContainerHeight && scrollableContainerStyles,
      ]}
      style={
        scrollableContainerHeight
          ? {
              maxHeight: `${scrollableContainerHeight}px`,
            }
          : undefined
      }
    >
      <Table
        css={tableStyles}
        data-testid={testId}
        style={shouldUseWidth ? { tableLayout: 'fixed' } : {}}
      >
        <thead
          data-testid={testId && `${testId}--head`}
          css={[noDefaultBorderStyles, tableHeadStyles]}
        >
          <tr ref={tableHeaderRowRef}>
            {headerColumns.map(({ key, content, width }, cellIndex) => {
              const heading = (
                <Tooltip
                  content={content}
                  tag="span"
                  testId={'datasource-header-content'}
                >
                  <Heading level="h200" as={'span'}>
                    {content}
                  </Heading>
                </Tooltip>
              );

              if (onVisibleColumnKeysChange && hasData) {
                const previewRows = tableRows
                  .map(({ cells }) => {
                    const cell: RowCellType | undefined = cells.find(
                      ({ key: cellKey }) => cellKey === key,
                    );
                    if (cell) {
                      return cell.content;
                    }
                  })
                  .slice(0, 5);

                const dragPreview = (
                  <DragColumnPreview title={heading} rows={previewRows} />
                );

                return (
                  <DraggableTableHeading
                    tableId={tableId}
                    key={key}
                    id={key}
                    index={cellIndex}
                    width={width}
                    onWidthChange={onColumnResize?.bind(null, key)}
                    dndPreviewHeight={containerRef.current?.offsetHeight || 0}
                    dragPreview={dragPreview}
                  >
                    {heading}
                  </DraggableTableHeading>
                );
              } else {
                return (
                  <TableHeading
                    key={key}
                    className={
                      !!onVisibleColumnKeysChange ? 'has-column-picker' : ''
                    }
                    data-testid={`${key}-column-heading`}
                    style={shouldUseWidth ? { width } : { maxWidth: width }}
                  >
                    {heading}
                  </TableHeading>
                );
              }
            })}
            {onVisibleColumnKeysChange && (
              <ColumnPickerHeader>
                <ColumnPicker
                  columns={hasFullSchema ? orderedColumns : []}
                  selectedColumnKeys={hasFullSchema ? visibleColumnKeys : []}
                  onSelectedColumnKeysChange={onSelectedColumnKeysChange}
                  onOpen={handlePickerOpen}
                  parentContainerRenderInstanceId={
                    parentContainerRenderInstanceId
                  }
                />
              </ColumnPickerHeader>
            )}
          </tr>
        </thead>
        <tbody
          css={noDefaultBorderStyles}
          data-testid={testId && `${testId}--body`}
        >
          {rows.map(({ key, cells, ref }) => (
            <tr
              key={key}
              data-testid={testId && `${testId}--row-${key}`}
              ref={ref}
            >
              {cells.map(({ key: cellKey, content, width }, cellIndex) => {
                let loadingRowStyle: React.CSSProperties = shouldUseWidth
                  ? { width }
                  : { maxWidth: width };
                // extra padding is required around skeleton loader to avoid vertical jumps when data loads
                if (key?.includes('loading')) {
                  loadingRowStyle = {
                    ...loadingRowStyle,
                    paddingBlock: token('space.100', '12px'),
                  };
                }
                return (
                  <td
                    key={cellKey}
                    data-testid={testId && `${testId}--cell-${cellIndex}`}
                    colSpan={cellIndex + 1 === cells.length ? 2 : undefined}
                    css={truncatedCellStyles}
                    style={loadingRowStyle}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export const EmptyState = TableEmptyState;
