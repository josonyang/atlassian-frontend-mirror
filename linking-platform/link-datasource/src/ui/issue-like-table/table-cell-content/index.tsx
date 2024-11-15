import React from 'react';

import { useIntl } from 'react-intl-next';

import { type DatasourceType } from '@atlaskit/linking-types';
import { fg } from '@atlaskit/platform-feature-flags';
import { Box, xcss } from '@atlaskit/primitives';
import Tooltip from '@atlaskit/tooltip';

import { useDatasourceItem } from '../../../state';
import { useExecuteAtomicAction } from '../../../state/actions';
import { isEditTypeSelectable, isEditTypeSupported } from '../edit-type';
import { stringifyType } from '../render-type';
import { TruncateTextTag } from '../truncate-text-tag';
import { type DatasourceTypeWithOnlyValues, type TableViewPropsRenderType } from '../types';

import { InlineEdit } from './inline-edit';

interface TableCellContentProps {
	id: string;
	columnKey: string;
	columnType: DatasourceType['type'];
	/** Used to retrieve cell content from the store */
	renderItem: TableViewPropsRenderType;
	wrappedColumnKeys: string[] | undefined;
}

const readViewStyles = xcss({
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	width: '100%',
	// Compensates for 2px from both top and bottom taken by InlneEdit (from transparent border in read-view mode and border+padding in edit view)
	minHeight: 'calc(40px - 2px * 2)',
	alignContent: 'center',
});

const TooltipWrapper = ({
	columnKey,
	datasourceTypeWithValues: { type, values },
	wrappedColumnKeys,
	children,
}: {
	columnKey: string;
	datasourceTypeWithValues: DatasourceTypeWithOnlyValues;
	wrappedColumnKeys: string[] | undefined;
	children: React.ReactNode;
}) => {
	const intl = useIntl();

	const stringifiedContent = values
		.map((value) =>
			stringifyType({ type, value } as DatasourceType, intl.formatMessage, intl.formatDate),
		)
		.filter((value) => value !== '')
		.join(', ');

	if (stringifiedContent && !wrappedColumnKeys?.includes(columnKey)) {
		return (
			<Tooltip
				// @ts-ignore: [PIT-1685] Fails in post-office due to backwards incompatibility issue with React 18
				tag={TruncateTextTag}
				content={stringifiedContent}
				testId="issues-table-cell-tooltip"
			>
				{children}
			</Tooltip>
		);
	}

	return <>{children}</>;
};

export const ReadOnlyCell = ({
	id,
	columnType,
	wrappedColumnKeys = [],
	renderItem,
	columnKey,
}: TableCellContentProps) => {
	const rowData = useDatasourceItem({ id })?.data;
	if (!rowData || !columnKey || !rowData[columnKey]) {
		return null;
	}

	// Need to make sure we keep falsy values like 0 and '', as well as the boolean false.
	const value = rowData[columnKey]?.data;
	const values = Array.isArray(value) ? value : [value];

	const datasourceTypeWithValues = {
		type: columnType,
		values,
	} as DatasourceTypeWithOnlyValues;

	return (
		<TooltipWrapper
			columnKey={columnKey}
			datasourceTypeWithValues={datasourceTypeWithValues}
			wrappedColumnKeys={wrappedColumnKeys}
		>
			{renderItem(datasourceTypeWithValues)}
		</TooltipWrapper>
	);
};

const InlineEditableCell = ({
	ari,
	values,
	columnKey,
	renderItem,
	integrationKey,
	wrappedColumnKeys,
}: {
	ari: string;
	columnKey: string;
	integrationKey: string;
	wrappedColumnKeys: string[] | undefined;
	values: DatasourceTypeWithOnlyValues;
	renderItem: TableViewPropsRenderType;
}) => {
	// Callbacks are returned only when the ari is editable and the action schemas exist in the store
	const { execute, executeFetch } = useExecuteAtomicAction({
		ari,
		fieldKey: columnKey,
		integrationKey,
	});

	// A field is editable when `execute` is returned from the store
	// if the field requires to fetch options to execute, then is editable only if `executeFetch` is also returned
	const isEditable =
		!!execute &&
		(isEditTypeSelectable(values.type) && fg('enable_datasource_supporting_actions')
			? !!executeFetch
			: true);

	const readView = (
		<TooltipWrapper
			columnKey={columnKey}
			datasourceTypeWithValues={values}
			wrappedColumnKeys={wrappedColumnKeys}
		>
			<Box
				testId="inline-edit-read-view"
				paddingInline={isEditable ? 'space.075' : 'space.100'}
				paddingBlock="space.050"
				xcss={readViewStyles}
			>
				{renderItem(values)}
			</Box>
		</TooltipWrapper>
	);

	if (!isEditable) {
		return readView;
	}

	return (
		<InlineEdit
			ari={ari}
			execute={execute}
			executeFetch={executeFetch}
			readView={readView}
			columnKey={columnKey}
			datasourceTypeWithValues={values}
		/>
	);
};

export const TableCellContent = ({
	id,
	columnKey,
	columnType,
	renderItem,
	wrappedColumnKeys,
}: TableCellContentProps): JSX.Element => {
	const item = useDatasourceItem({ id });

	if (item) {
		const { integrationKey, ari, data: rowData } = item;

		const isEditType =
			!!ari && !!integrationKey && rowData[columnKey] && isEditTypeSupported(columnType);

		if (isEditType) {
			// Need to make sure we keep falsy values like 0 and '', as well as the boolean false.
			const value = rowData[columnKey]?.data;
			const values = Array.isArray(value) ? value : [value];

			const datasourceTypeWithValues = {
				type: columnType,
				values,
			} as DatasourceTypeWithOnlyValues;

			return (
				<InlineEditableCell
					ari={ari}
					columnKey={columnKey}
					renderItem={renderItem}
					integrationKey={integrationKey}
					values={datasourceTypeWithValues}
					wrappedColumnKeys={wrappedColumnKeys}
				/>
			);
		}
	}

	return (
		<Box
			testId="inline-edit-read-view"
			paddingInline="space.100"
			paddingBlock="space.050"
			xcss={readViewStyles}
		>
			<ReadOnlyCell
				id={id}
				columnKey={columnKey}
				columnType={columnType}
				wrappedColumnKeys={wrappedColumnKeys}
				renderItem={renderItem}
			/>
		</Box>
	);
};
