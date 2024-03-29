import React, { Component, ReactNode } from 'react';

import CommonCell from './internal/common-cell';
import OverflowContainer from './internal/overflow-container';
import { indentBase } from './internal/styled';
import withColumnWidth from './internal/with-column-width';

export interface CellProps {
  /**
   * Whether the cell contents should wrap or display on a single line and be concatenated.
   */
  // eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
  singleLine?: boolean;
  /**
   * Indent level for the cell. Each indent level adds 25px to the left padding.
   */
  indentLevel?: number;
  /**
   * Width of the header item. Takes a string or a number representing the width in pixels.
   */
  width?: number | string;
  /**
   * Class name to apply to cell.
   */
  className?: string;
  /**
   * Children content, used when composing table-tree from internal components
   */
  children?: ReactNode;
}

class Cell extends Component<CellProps> {
  render() {
    const { children, singleLine, indentLevel, width, className, ...props } =
      this.props;
    return (
      // TODO: Determine whether proper `td` elements can be used instead of
      // roles (DSP-11588)
      <CommonCell
        role="gridcell"
        indent={
          indentLevel ? `calc(${indentBase} * ${indentLevel})` : undefined
        }
        width={width}
        className={className}
        {...props}
      >
        <OverflowContainer isSingleLine={singleLine}>
          {children}
        </OverflowContainer>
      </CommonCell>
    );
  }
}

export default withColumnWidth(Cell);
