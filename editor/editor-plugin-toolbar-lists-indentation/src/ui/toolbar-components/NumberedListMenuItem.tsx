import React from 'react';

import { useIntl } from 'react-intl-next';

import { useSharedPluginStateWithSelector } from '@atlaskit/editor-common/hooks';
import {
	toggleOrderedList as toggleOrderedListKeymap,
	formatShortcut,
} from '@atlaskit/editor-common/keymaps';
import { listMessages } from '@atlaskit/editor-common/messages';
import { getInputMethodFromParentKeys } from '@atlaskit/editor-common/toolbar';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import {
	ListNumberedIcon,
	ToolbarDropdownItem,
	ToolbarKeyboardShortcutHint,
} from '@atlaskit/editor-toolbar';
import type { ToolbarComponentTypes } from '@atlaskit/editor-toolbar-model';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';

import type { ToolbarListsIndentationPlugin } from '../../toolbarListsIndentationPluginType';

type NumberedListMenuItemType = {
	api?: ExtractInjectionAPI<ToolbarListsIndentationPlugin>;
	parents: ToolbarComponentTypes;
};

export const NumberedListMenuItem = ({ api, parents }: NumberedListMenuItemType) => {
	const { formatMessage } = useIntl();
	const isTaskListItemEnabled = expValEquals(
		'platform_editor_toolbar_task_list_menu_item',
		'isEnabled',
		true,
	);
	const { orderedListActive, orderedListDisabled, taskListActive } =
		useSharedPluginStateWithSelector(api, ['list', 'taskDecision'], (states) => ({
			orderedListActive: states.listState?.orderedListActive,
			orderedListDisabled: states.listState?.orderedListDisabled,
			taskListActive: states.taskDecisionState?.isInsideTask,
		}));

	const onClick = () => {
		api?.core.actions.execute(
			isTaskListItemEnabled && taskListActive
				? api?.taskDecision?.commands.toggleTaskList('orderedList')
				: api?.list.commands.toggleOrderedList(getInputMethodFromParentKeys(parents)),
		);
	};

	const shortcut = formatShortcut(toggleOrderedListKeymap);

	return (
		<ToolbarDropdownItem
			elemBefore={<ListNumberedIcon size="small" label="" />}
			elemAfter={shortcut ? <ToolbarKeyboardShortcutHint shortcut={shortcut} /> : undefined}
			isSelected={orderedListActive}
			isDisabled={
				isTaskListItemEnabled ? orderedListDisabled && !taskListActive : orderedListDisabled
			}
			onClick={onClick}
			ariaKeyshortcuts={shortcut}
		>
			{formatMessage(listMessages.orderedList)}
		</ToolbarDropdownItem>
	);
};
