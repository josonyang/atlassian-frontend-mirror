import React from 'react';

// Allowing existing usage of non Pragmatic drag and drop solution
// eslint-disable-next-line @atlaskit/design-system/no-unsupported-drag-and-drop-libraries
import { Draggable } from 'react-beautiful-dnd';

import withDimensions, { type WithDimensionsProps } from '../../hoc/with-dimensions';
import { inlineStylesIfRanking } from '../../internal/helpers';
import { RankableTableBodyRow } from '../../styled/rankable/table-row';
import { type HeadType, type RowType } from '../../types';

import TableCell from './table-cell';

export interface RankableTableRowProps extends WithDimensionsProps {
	head?: HeadType;
	isFixedSize: boolean;
	row: RowType;
	rowIndex: number;
	isRankingDisabled: boolean;
	isHighlighted?: boolean;
	testId?: string;
}

export class RankableTableRow extends React.Component<RankableTableRowProps> {
	innerRef = (innerRefFn: Function) => (ref: HTMLTableRowElement) => {
		innerRefFn(ref);
		if (typeof this.props.innerRef === 'function') {
			this.props.innerRef(ref);
		}
	};

	render() {
		const {
			row,
			head,
			isFixedSize,
			isRanking,
			refWidth,
			rowIndex,
			isRankingDisabled,
			isHighlighted,
			testId,
		} = this.props;
		const {
			cells,
			testId: rowTestId,
			key,
			isHighlighted: isRowHighlighted,
			// TODO: Remove `rest` props and use only what is explicitly in the API.
			...restRowProps
		} = row;
		const inlineStyles = inlineStylesIfRanking(isRanking, refWidth);

		if (typeof key !== 'string' && !isRankingDisabled) {
			throw new Error(
				'dynamic-table: ranking is not possible because table row does not have a key. Add the key to the row or disable ranking.',
			);
		}

		return (
			<Draggable
				draggableId={key || rowIndex.toString()}
				index={rowIndex}
				isDragDisabled={isRankingDisabled}
			>
				{(provided, snapshot) => (
					<RankableTableBodyRow
						{...restRowProps}
						{...provided.dragHandleProps}
						{...provided.draggableProps}
						// It is necessary to prevent the passing of aria-labelledby
						aria-labelledby={undefined}
						// @ts-ignore: [PIT-1685] Fails in post-office due to backwards incompatibility issue with React 18
						aria-describedby={provided.dragHandleProps?.['aria-describedby']}
						ref={this.innerRef(provided.innerRef)}
						// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
						style={{ ...provided.draggableProps.style, ...inlineStyles }}
						isHighlighted={isHighlighted || isRowHighlighted}
						isRanking={isRanking}
						isRankingItem={snapshot.isDragging}
						testId={rowTestId || (testId && `${testId}--rankable--table--body--row`)}
					>
						{cells.map((cell, cellIndex) => {
							const headCell = (head || { cells: [] }).cells[cellIndex];
							return (
								<TableCell
									head={headCell}
									cell={cell}
									isRanking={isRanking}
									key={cell.key || cellIndex}
									isFixedSize={isFixedSize}
									testId={testId}
								/>
							);
						})}
					</RankableTableBodyRow>
				)}
			</Draggable>
		);
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default withDimensions<RankableTableRowProps>(RankableTableRow);
