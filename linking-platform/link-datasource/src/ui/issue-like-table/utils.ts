import { DatasourceAction } from '../../analytics/types';

export const COLUMN_BASE_WIDTH = 8;
export const COLUMN_MIN_WIDTH = COLUMN_BASE_WIDTH * 3;

export type GetWidthCss = (arg: {
  shouldUseWidth: boolean;
  width?: number;
}) => React.CSSProperties;

/**
 * Generate width related portion of css for table cell.
 *
 * @param shouldUseWidth boolean argument defines if a given width is user defined / baked in value
 * or rather default width that should be treated as a maximum width. When table inserted initially
 * and no user custom width defined we set this value to `false`. As soon as user changes any of the
 * column widths we treat all width as custom hardcoded widths.
 * @param width Sometimes set to undefined for last column to make it occupy remainder of the table width
 */
export const getWidthCss: GetWidthCss = ({ shouldUseWidth, width }) => {
  if (!width) {
    return {};
  }
  if (shouldUseWidth) {
    return {
      width,
    };
  } else {
    return { maxWidth: width };
  }
};

/**
 * This method should be called when one atomic action is performed on columns: adding new item, removing one item, changing items order.
 * The assumption is that since only one action is changed at each time, we don't have to verify the actual contents of the lists.
 */
export const getColumnAction = (
  oldVisibleColumnKeys: string[],
  newVisibleColumnKeys: string[],
): DatasourceAction => {
  const newColumnSize = newVisibleColumnKeys.length;
  const oldColumnSize = oldVisibleColumnKeys.length;

  if (newColumnSize > oldColumnSize) {
    return DatasourceAction.COLUMN_ADDED;
  } else if (newColumnSize < oldColumnSize) {
    return DatasourceAction.COLUMN_REMOVED;
  } else {
    return DatasourceAction.COLUMN_REORDERED;
  }
};
