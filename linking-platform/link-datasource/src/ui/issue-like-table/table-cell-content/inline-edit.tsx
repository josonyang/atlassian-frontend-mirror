import React, { useCallback, useState } from 'react';

import AKInlineEdit from '@atlaskit/inline-edit';
import { type AtomicActionExecuteResponse } from '@atlaskit/linking-types';
import { type DatasourceDataResponseItem, type Link } from '@atlaskit/linking-types/datasource';
import { Box, xcss } from '@atlaskit/primitives';
import { useSmartLinkReload } from '@atlaskit/smart-card/hooks';

import { useDatasourceAnalyticsEvents } from '../../../analytics';
import { useDatasourceTableFlag } from '../../../hooks/useDatasourceTableFlag';
import { type DatasourceItem, useDatasourceActions, useDatasourceItem } from '../../../state';
import { editType } from '../edit-type';
import type { DatasourceTypeWithOnlyValues } from '../types';

const editContainerStyles = xcss({
	marginBlockStart: 'space.negative.100',
});

interface InlineEditProps {
	ari: string;
	columnKey: string;
	readView: React.ReactNode;
	datasourceTypeWithValues: DatasourceTypeWithOnlyValues;
	execute: (value: string | number) => Promise<AtomicActionExecuteResponse>;
	executeFetch?: <E>(inputs: any) => Promise<E>;
}

const getBackendUpdateValue = (typedNewValue: DatasourceTypeWithOnlyValues): string | number => {
	switch (typedNewValue.type) {
		case 'string':
			return typedNewValue.values[0] || '';
		case 'status':
			return typedNewValue.values[0]?.transitionId || '';
	}

	throw new Error(
		`Datasource 2 way sync Backend update value not implemented for type ${typedNewValue.type}`,
	);
};

const mapUpdatedItem = (
	existingItem: DatasourceDataResponseItem,
	columnKey: string,
	newValue: DatasourceTypeWithOnlyValues,
): DatasourceDataResponseItem | null => {
	switch (newValue.type) {
		case 'string':
			return {
				...existingItem,
				[columnKey]: {
					data: newValue.values[0] || '',
				},
			};
		case 'status':
			return newValue.values[0]
				? {
						...existingItem,
						[columnKey]: {
							data: newValue.values[0],
						},
					}
				: existingItem;
		default:
	}
	return null;
};

const isNewValue = (
	columnKey: string,
	newItem: DatasourceDataResponseItem,
	existingData: DatasourceDataResponseItem,
) => {
	return newItem[columnKey].data && newItem[columnKey].data !== existingData[columnKey].data;
};

const useRefreshDatasourceItem = (item: DatasourceItem | undefined) => {
	const url = (item?.data?.key?.data as Link)?.url;

	// passing empty string to the hook isn't ideal, but the alternatives are too much effort for this small fix.
	const reloadSmartLinkAction = useSmartLinkReload({
		url: url || '',
	});

	return useCallback(() => {
		if (url) {
			reloadSmartLinkAction();
		}
	}, [reloadSmartLinkAction, url]);
};

export const InlineEdit = ({
	ari,
	execute,
	executeFetch,
	readView,
	columnKey,
	datasourceTypeWithValues,
}: InlineEditProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValues, setEditValues] =
		useState<DatasourceTypeWithOnlyValues>(datasourceTypeWithValues);

	const item = useDatasourceItem({ id: ari });
	const { entityType, integrationKey } = item || {};

	const { showErrorFlag } = useDatasourceTableFlag();

	const { onUpdateItem } = useDatasourceActions();

	const { fireEvent } = useDatasourceAnalyticsEvents();

	const refreshDatasourceItem = useRefreshDatasourceItem(item);
	const onCommitUpdate = useCallback(
		(newValue: DatasourceTypeWithOnlyValues) => {
			if (!item) {
				setIsEditing(false);
				return;
			}

			const existingData = item.data;

			const newItem = mapUpdatedItem(item.data, columnKey, newValue);

			if (!newItem || !isNewValue(columnKey, newItem, existingData)) {
				setIsEditing(false);
				return;
			}

			onUpdateItem(ari, newItem);

			fireEvent('ui.form.submitted.inlineEdit', {});

			execute(getBackendUpdateValue(newValue))
				.then(refreshDatasourceItem)
				.catch((error) => {
					const status = error && typeof error === 'object' ? error.status : undefined;
					showErrorFlag({ status });
					onUpdateItem(ari, existingData);
				});
			setIsEditing(false);
		},
		[item, columnKey, onUpdateItem, ari, refreshDatasourceItem, fireEvent, execute, showErrorFlag],
	);

	const onEdit = useCallback(() => {
		setIsEditing(true);

		if (integrationKey && entityType) {
			fireEvent('ui.inlineEdit.clicked.datasource', {
				integrationKey,
				entityType,
				fieldKey: columnKey,
			});
		}
	}, [columnKey, entityType, fireEvent, integrationKey]);

	const onCancelEdit = useCallback(() => {
		setIsEditing(false);

		if (integrationKey && entityType) {
			fireEvent('ui.inlineEdit.cancelled.datasource', {
				integrationKey,
				entityType,
				fieldKey: columnKey,
			});
		}
	}, [columnKey, entityType, fireEvent, integrationKey]);

	return (
		<Box xcss={editContainerStyles}>
			<AKInlineEdit
				{...editType({
					defaultValue: datasourceTypeWithValues,
					currentValue: editValues,
					setEditValues,
					executeFetch,
				})}
				hideActionButtons
				readView={() => readView}
				readViewFitContainerWidth
				isEditing={isEditing}
				onEdit={onEdit}
				onCancel={onCancelEdit}
				onConfirm={() => onCommitUpdate(editValues)}
			/>
		</Box>
	);
};
