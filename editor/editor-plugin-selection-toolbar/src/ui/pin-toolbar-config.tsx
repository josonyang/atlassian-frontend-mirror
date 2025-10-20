import React from 'react';

import { type IntlShape } from 'react-intl-next';

import { selectionToolbarMessages } from '@atlaskit/editor-common/messages';
import { type ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import type {
	Command,
	FloatingToolbarButton,
	FloatingToolbarItem,
} from '@atlaskit/editor-common/types';
import PinIcon from '@atlaskit/icon/core/pin';
import PinFilledIcon from '@atlaskit/icon/core/pin-filled';
import { fg } from '@atlaskit/platform-feature-flags';

import type { SelectionToolbarPlugin } from '../selectionToolbarPluginType';

type PinToobarConfig = {
	api?: ExtractInjectionAPI<SelectionToolbarPlugin>;
	intl: IntlShape;
	toolbarDocking?: 'top' | 'none';
};

export const getPinOptionToolbarConfig = ({
	api,
	toolbarDocking,
	intl,
}: PinToobarConfig): FloatingToolbarItem<Command>[] => {
	const isOffline = api?.connectivity?.sharedState.currentState()?.mode === 'offline';
	let pinButton: FloatingToolbarButton<Command> = {
		disabled: isOffline,
		id: 'editor.toolbar.unpined',
		icon: () => <PinIcon label="" />,
		onClick: () => {
			if (fg('platform_editor_migrate_toolbar_docking')) {
				return (
					api?.core.actions.execute(
						api?.userPreferences?.actions.updateUserPreference('toolbarDockingPosition', 'top'),
					) ?? false
				);
			}
			return api?.selectionToolbar.actions?.setToolbarDocking?.('top') ?? false;
		},
		title: intl.formatMessage(selectionToolbarMessages.toolbarPositionUnpined),
		type: 'button',
	};

	const isDockedToTop = toolbarDocking === 'top';
	if (isDockedToTop) {
		pinButton = {
			disabled: isOffline,
			id: 'editor.toolbar.pinedToTop',
			icon: () => <PinFilledIcon label="" />,
			onClick: () => {
				if (fg('platform_editor_migrate_toolbar_docking')) {
					return (
						api?.core.actions.execute(
							api?.userPreferences?.actions.updateUserPreference('toolbarDockingPosition', 'none'),
						) ?? false
					);
				}
				return api?.selectionToolbar.actions?.setToolbarDocking?.('none') ?? false;
			},
			type: 'button',
			title: intl.formatMessage(selectionToolbarMessages.toolbarPositionPinedAtTop),
		};
	}

	return [{ type: 'separator', fullHeight: true }, pinButton];
};
