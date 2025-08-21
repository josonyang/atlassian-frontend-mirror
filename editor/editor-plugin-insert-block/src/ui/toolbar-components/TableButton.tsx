import React from 'react';

import { useIntl } from 'react-intl-next';

import {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
	INPUT_METHOD,
} from '@atlaskit/editor-common/analytics';
import { formatShortcut, toggleTable } from '@atlaskit/editor-common/keymaps';
import { toolbarInsertBlockMessages as messages } from '@atlaskit/editor-common/messages';
import { useEditorToolbar } from '@atlaskit/editor-common/toolbar';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { ToolbarButton, ToolbarTooltip, TableIcon } from '@atlaskit/editor-toolbar';

import type { InsertBlockPlugin } from '../../insertBlockPluginType';

type TableButtonProps = {
	api?: ExtractInjectionAPI<InsertBlockPlugin>;
};
export const TableButton = ({ api }: TableButtonProps) => {
	const { formatMessage } = useIntl();

	const { editorView } = useEditorToolbar();

	if (!editorView?.state.schema.nodes.table) {
		return null;
	}

	const onClick = () => {
		if (editorView) {
			const { state, dispatch } = editorView;
			// workaround to solve race condition where cursor is not placed correctly inside table
			queueMicrotask(() => {
				api?.table?.actions.insertTable?.({
					action: ACTION.INSERTED,
					actionSubject: ACTION_SUBJECT.DOCUMENT,
					actionSubjectId: ACTION_SUBJECT_ID.TABLE,
					attributes: { inputMethod: INPUT_METHOD.TOOLBAR },
					eventType: EVENT_TYPE.TRACK,
				})(state, dispatch);
			});
		}
	};

	return (
		<ToolbarTooltip content={formatMessage(messages.table)}>
			<ToolbarButton
				iconBefore={<TableIcon label={formatMessage(messages.table)} size="small" />}
				onClick={onClick}
				ariaKeyshortcuts={formatShortcut(toggleTable)}
			/>
		</ToolbarTooltip>
	);
};
