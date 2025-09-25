import React from 'react';

import type { WrappedComponentProps } from 'react-intl-next';
import { useIntl, injectIntl } from 'react-intl-next';

import {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
	INPUT_METHOD,
} from '@atlaskit/editor-common/analytics';
import { useSharedPluginStateWithSelector } from '@atlaskit/editor-common/hooks';
import { blockMenuMessages as messages } from '@atlaskit/editor-common/messages';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { DIRECTION } from '@atlaskit/editor-common/types';
import { ToolbarDropdownItem } from '@atlaskit/editor-toolbar';
import ArrowUpIcon from '@atlaskit/icon/core/arrow-up';

import type { BlockMenuPlugin } from '../blockMenuPluginType';

import { useBlockMenu } from './block-menu-provider';

type Props = {
	api: ExtractInjectionAPI<BlockMenuPlugin> | undefined;
};

const MoveUpDropdownItemContent = ({ api }: Props & WrappedComponentProps) => {
	const { formatMessage } = useIntl();
	const { fireAnalyticsEvent } = useBlockMenu();
	const { canMoveUp } = useSharedPluginStateWithSelector(
		api,
		['blockControls'],
		({ blockControlsState }) => {
			return {
				canMoveUp: blockControlsState?.blockMenuOptions?.canMoveUp,
			};
		},
	);

	const handleClick = () => {
		fireAnalyticsEvent?.({
			action: ACTION.CLICKED,
			actionSubject: ACTION_SUBJECT.BLOCK_MENU_ITEM,
			actionSubjectId: ACTION_SUBJECT_ID.MOVE_UP_BLOCK,
			eventType: EVENT_TYPE.UI,
			attributes: { inputMethod: INPUT_METHOD.MOUSE },
		});

		api?.core.actions.execute(({ tr }) => {
			api?.blockControls?.commands?.moveNodeWithBlockMenu(DIRECTION.UP)({ tr });
			api?.blockControls?.commands?.toggleBlockMenu({ closeMenu: true })({ tr });
			return tr;
		});
	};
	return (
		<ToolbarDropdownItem
			onClick={handleClick}
			elemBefore={<ArrowUpIcon label="" />}
			isDisabled={!canMoveUp}
		>
			{formatMessage(messages.moveUpBlock)}
		</ToolbarDropdownItem>
	);
};

export const MoveUpDropdownItem = injectIntl(MoveUpDropdownItemContent);
