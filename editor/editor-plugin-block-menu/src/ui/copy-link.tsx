import React, { useCallback } from 'react';

import type { WrappedComponentProps } from 'react-intl-next';
import { useIntl, injectIntl } from 'react-intl-next';

import {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
	INPUT_METHOD,
} from '@atlaskit/editor-common/analytics';
import { blockMenuMessages as messages } from '@atlaskit/editor-common/messages';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { ToolbarDropdownItem } from '@atlaskit/editor-toolbar';
import LinkIcon from '@atlaskit/icon/core/link';
import { fg } from '@atlaskit/platform-feature-flags';

import type { BlockMenuPlugin, BlockMenuPluginOptions } from '../blockMenuPluginType';

import { useBlockMenu } from './block-menu-provider';
import { copyLink } from './utils/copyLink';
import { isNestedNode } from './utils/isNestedNode';

type Props = {
	api: ExtractInjectionAPI<BlockMenuPlugin> | undefined;
	config: BlockMenuPluginOptions | undefined;
};

const CopyLinkDropdownItemContent = ({ api, config }: Props & WrappedComponentProps) => {
	const { formatMessage } = useIntl();
	const { fireAnalyticsEvent } = useBlockMenu();

	const handleClick = useCallback(() => {
		fireAnalyticsEvent?.({
			action: ACTION.CLICKED,
			actionSubject: ACTION_SUBJECT.BLOCK_MENU_ITEM,
			actionSubjectId: ACTION_SUBJECT_ID.COPY_LINK_TO_BLOCK,
			eventType: EVENT_TYPE.UI,
			attributes: { inputMethod: INPUT_METHOD.MOUSE },
		});

		api?.core.actions.execute(({ tr }) => {
			api?.blockControls?.commands?.toggleBlockMenu({ closeMenu: true })({ tr });
			return tr;
		});
		api?.core.actions.focus();
		return copyLink(config?.getLinkPath, config?.blockQueryParam, api);
	}, [config?.getLinkPath, config?.blockQueryParam, api, fireAnalyticsEvent]);

	const checkIsNestedNode = useCallback(() => {
		const selection = api?.selection?.sharedState?.currentState()?.selection;
		const menuTriggerBy = api?.blockControls?.sharedState?.currentState()?.menuTriggerBy;
		if (!selection || !menuTriggerBy) {
			return false;
		}
		return isNestedNode(selection, menuTriggerBy);
	}, [api]);

	// Hide copy link when `platform_editor_adf_with_localid` feature flag is off or when the node is nested
	if (!fg('platform_editor_adf_with_localid') || checkIsNestedNode()) {
		return null;
	}

	const text = fg('platform_editor_block_menu_patch_1')
		? formatMessage(messages.copyLinkToBlock)
		: formatMessage(messages.copyLink);

	return (
		<ToolbarDropdownItem onClick={handleClick} elemBefore={<LinkIcon label="" />}>
			{text}
		</ToolbarDropdownItem>
	);
};

export const CopyLinkDropdownItem = injectIntl(CopyLinkDropdownItemContent);
