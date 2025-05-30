/* eslint-disable @atlaskit/design-system/use-tokens-typography */
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css, jsx, styled } from '@compiled/react';

import { Skeleton } from '@atlaskit/linking-common';
import { type DatasourceResponseSchemaProperty } from '@atlaskit/linking-types';
import { N40 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

type Column = Omit<DatasourceResponseSchemaProperty, 'type' | 'title'> & {
	width: number;
};

type Row = {
	id: number;
	longWidth: number;
	shortWidth: number;
};

type SkeletonProps = {
	width: number;
	itemName: string;
};

const SkeletonComponent = ({ width, itemName }: SkeletonProps) => (
	<Skeleton
		borderRadius={token('border.radius.100', '8px')}
		testId={`${itemName}-empty-state-skeleton`}
		height={14}
		width={width}
	/>
);

const tableBodyStyles = css({
	borderBottom: 0,
});

const tableStyles = css({
	backgroundColor: token('utility.elevation.surface.current', '#FFF'),
});

const padding = `${token('space.100', '8px')} ${token('space.100', '8px')}`;

const cellStyles = css({
	padding,
	borderRight: `0.5px solid ${token('color.border', N40)}`,
	borderBottom: `0.5px solid ${token('color.border', N40)}`,
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'&:first-of-type': {
		paddingLeft: `${token('space.100', '8px')}`,
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'&:last-of-type': {
		borderRight: 0,
		paddingRight: `${token('space.100', '8px')}`,
	},
});

const baseColumns: Column[] = [
	{
		key: 'type',
		width: 35,
	},
	{
		key: 'issue',
		width: 50,
	},
	{
		key: 'summary',
		width: 100,
	},
	{
		key: 'assignee',
		width: 70,
	},
	{
		key: 'priority',
		width: 60,
	},
	{
		key: 'status',
		width: 60,
	},
	{
		key: 'resolution',
		width: 55,
	},
	{
		key: 'created',
		width: 50,
	},
	{
		key: 'due',
		width: 50,
	},
];

const longColumnWidths = [141, 208, 186, 212, 212, 151, 212, 182, 180, 163, 172, 211, 145, 190];
const shortColumnWidths = [75, 54, 66, 73, 52, 73, 55, 80, 67, 76, 58, 65, 56, 76];

const renderItem = ({ key, width }: Column, { longWidth, shortWidth }: Row) => {
	switch (key) {
		case 'status':
			return <SkeletonComponent width={shortWidth} itemName={key} />;
		case 'summary':
			return <SkeletonComponent width={longWidth} itemName={key} />;
		default:
			return <SkeletonComponent width={width} itemName={key} />;
	}
};

export interface Props {
	isCompact?: boolean;
	testId?: string;
}

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled
const TableHeading = styled.td({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'.pm-table-wrapper > table thead &, .ProseMirror .pm-table-wrapper > table thead &, &': {
		border: 0,
		position: 'relative',
		/* This makes resizing work with out jumping due to padding + changes overall width for same default values. */
		boxSizing: 'border-box',
		lineHeight: '24px',
		paddingTop: token('space.025', '2px'),
		paddingRight: token('space.050', '4px'),
		paddingBottom: token('space.025', '2px'),
		paddingLeft: token('space.050', '4px'),
		borderRight: `0.5px solid ${token('color.border', N40)}`,
		borderBottom: `2px solid ${token('color.border', N40)}`,
		/*
      lineHeight * 2 -> Max height of two lined header
      verticalPadding * 2 -> padding for this component itself
      verticalPadding * 2 -> padding inside span (--container)
      2px -> Bottom border
      Last two terms are needed because of border-box box sizing.
    */
		height: `calc(24px * 2 + ${token('space.025', '2px')} * 4 + 2px)`,
		verticalAlign: 'bottom',
		backgroundColor: token('utility.elevation.surface.current', '#FFF'),
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'.pm-table-wrapper > table thead.has-column-picker &:nth-last-of-type(2), .ProseMirror .pm-table-wrapper > table thead.has-column-picker &:nth-last-of-type(2), thead.has-column-picker &:nth-last-of-type(2)':
		{
			borderRight: 0,
		},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'.pm-table-wrapper > table thead &:first-of-type, .ProseMirror .pm-table-wrapper > table thead &:first-of-type, &:first-of-type':
		{
			paddingLeft: token('space.050', '4px'),
		},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'.pm-table-wrapper > table thead &:last-of-type, .ProseMirror .pm-table-wrapper > table thead &:last-of-type, &:last-of-type':
		{
			borderRight: 0,
		},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	"& [data-testid='datasource-header-content--container']": {
		width: '100%',
		/* With Button now being a parent for this component it adds its lineHeight value and spoils
      `height` calculation above. */
		lineHeight: '24px',
		paddingTop: token('space.025', '2px'),
		paddingRight: token('space.050', '4px'),
		paddingBottom: token('space.025', '2px'),
		paddingLeft: token('space.050', '4px'),
		display: '-webkit-box',
		WebkitLineClamp: 2,
		WebkitBoxOrient: 'vertical',
		whiteSpace: 'normal',
		overflow: 'hidden',
		wordWrap: 'break-word',
	},
});

const EmptyState = ({ isCompact, testId }: Props) => {
	const columnsToRender = isCompact ? baseColumns.slice(0, 6) : baseColumns;
	// if it is compact (non-modal), there is room for 14 rows
	// if it is modal (not compact), there is only room for 10 rows
	const rowsNumber = isCompact ? 14 : 10;
	const rows: Row[] = new Array(rowsNumber).fill(null).map((_, index) => ({
		id: index,
		longWidth: longColumnWidths[index],
		shortWidth: shortColumnWidths[index],
	}));

	return (
		<div
			style={{
				// the IssueLikeDataTableView wraps the table in a container with the styling below while modal doesn't
				// this maxHeight comes from scrollableContainerHeight
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				maxHeight: 590,
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				padding: token('space.0', '0px'),
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				boxSizing: 'border-box',
			}}
		>
			<table css={tableStyles} data-testid={testId}>
				{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
				<thead style={{ borderBottom: 0 }}>
					<tr>
						{columnsToRender.map(({ key, width }) => (
							// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
							<TableHeading key={key} style={{ width, padding }}>
								<Skeleton
									appearance="darkGray"
									borderRadius={8}
									testId="empty-state-skeleton"
									height={12}
									width={width}
								/>
							</TableHeading>
						))}
					</tr>
				</thead>
				<tbody css={tableBodyStyles}>
					{rows.map((row) => (
						<tr key={row.id}>
							{columnsToRender.map((column) => (
								<td css={cellStyles} key={column.key}>
									{renderItem(column, row)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EmptyState;
