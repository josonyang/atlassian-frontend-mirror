import React from 'react';

import { useEditorToolbar } from '@atlaskit/editor-common/toolbar';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { useSharedPluginStateSelector } from '@atlaskit/editor-common/use-shared-plugin-state-selector';
import type { SelectionToolbarPlugin } from '@atlaskit/editor-plugin-selection-toolbar';
import { ToolbarTooltip, ToolbarButton as BaseToolbarButton } from '@atlaskit/editor-toolbar';
import { conditionalHooksFactory } from '@atlaskit/platform-feature-flags-react';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';

import type { SelectionExtensionPlugin } from '../../selectionExtensionPluginType';
import type { ExtensionToolbarItemConfiguration } from '../../types';

type ToolbarButtonProps = {
	api: ExtractInjectionAPI<SelectionExtensionPlugin> | undefined;
	config: ExtensionToolbarItemConfiguration;
};

/**
 * !! When removing platform_editor_toolbar_aifc_patch_3 also remove package dependency on `@atlaskit/editor-plugin-view-mode`.
 */
const usePluginState = conditionalHooksFactory(
	() => expValEquals('platform_editor_toolbar_aifc_patch_3', 'isEnabled', true),
	(api?: ExtractInjectionAPI<SelectionToolbarPlugin> | undefined) => {
		const { editorToolbarDockingPreference } = useEditorToolbar();

		return {
			editorToolbarDockingPreference,
		};
	},
	(api?: ExtractInjectionAPI<SelectionToolbarPlugin> | undefined) => {
		const editorToolbarDockingPreference = useSharedPluginStateSelector(
			api,
			'userPreferences.preferences.toolbarDockingPosition',
		);

		return {
			editorToolbarDockingPreference,
		};
	},
);

export const ToolbarButton = ({ api, config }: ToolbarButtonProps) => {
	const { editorToolbarDockingPreference } = usePluginState(api);

	const isDockedAtTop = editorToolbarDockingPreference === 'top';

	if (isDockedAtTop) {
		return null;
	}

	const Icon = config.icon;

	return (
		<ToolbarTooltip content={config.tooltip}>
			<BaseToolbarButton
				iconBefore={<Icon label="" />}
				isDisabled={config.isDisabled}
				onClick={config.onClick}
			>
				{config.label}
			</BaseToolbarButton>
		</ToolbarTooltip>
	);
};
