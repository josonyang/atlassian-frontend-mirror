import React from 'react';

import type { WrappedComponentProps } from 'react-intl-next';
import { injectIntl } from 'react-intl-next';

import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type { ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { Popup } from '@atlaskit/editor-common/ui';
import type { MenuItem } from '@atlaskit/editor-common/ui-menu';
import { ArrowKeyNavigationType, DropdownMenu } from '@atlaskit/editor-common/ui-menu';
import { useSharedPluginStateSelector } from '@atlaskit/editor-common/use-shared-plugin-state-selector';
import { EditorView } from '@atlaskit/editor-prosemirror/view';
import { akEditorFloatingOverlapPanelZIndex } from '@atlaskit/editor-shared-styles';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import type { BlockControlsPlugin } from '../blockControlsPluginType';

import { getBlockMenuItems, menuItemsCallback } from './block-menu-items';
import { BLOCK_MENU_WIDTH } from './consts';

type BlockMenuProps = {
	editorView: EditorView | undefined;
	mountPoint?: HTMLElement;
	boundariesElement?: HTMLElement;
	scrollableElement?: HTMLElement;
	api: ExtractInjectionAPI<BlockControlsPlugin> | undefined;
};

const BlockMenu = ({
	editorView,
	mountPoint,
	boundariesElement,
	scrollableElement,
	api,
	intl: { formatMessage },
}: BlockMenuProps & WrappedComponentProps) => {
	const { blockControlsState } = useSharedPluginState(api, ['blockControls'], {
		disabled: editorExperiment('platform_editor_usesharedpluginstateselector', true),
	});

	// isMenuOpen
	const isMenuOpenSelector = useSharedPluginStateSelector(api, 'blockControls.isMenuOpen', {
		disabled: editorExperiment('platform_editor_usesharedpluginstateselector', false),
	});
	const isMenuOpen = editorExperiment('platform_editor_usesharedpluginstateselector', true)
		? isMenuOpenSelector
		: blockControlsState?.isMenuOpen;

	// menuTriggerBy
	const menuTriggerBySelector = useSharedPluginStateSelector(api, 'blockControls.menuTriggerBy', {
		disabled: editorExperiment('platform_editor_usesharedpluginstateselector', false),
	});
	const menuTriggerBy = editorExperiment('platform_editor_usesharedpluginstateselector', true)
		? menuTriggerBySelector
		: blockControlsState?.menuTriggerBy;

	if (isMenuOpen) {
		return null;
	}
	const activeNodeSelector = `[data-drag-handler-anchor-name=${menuTriggerBy}]`;
	const targetHandleRef = document.querySelector(activeNodeSelector);
	const items = getBlockMenuItems(formatMessage);

	const handleOpenChange = (payload?: { event: PointerEvent | KeyboardEvent; isOpen: boolean }) => {
		if (!payload?.isOpen) {
			api?.core.actions.execute(api?.blockControls.commands.toggleBlockMenu({ closeMenu: true }));
		}
	};

	const onMenuItemActivated = ({ item }: { item: MenuItem }) => {
		if (editorView) {
			menuItemsCallback[item.value.name as keyof typeof menuItemsCallback]?.(api, formatMessage)?.(
				editorView.state,
				editorView.dispatch,
				editorView,
			);
			api?.core.actions.execute(api?.blockControls.commands.toggleBlockMenu({ closeMenu: true }));
		}
	};

	return (
		<Popup
			alignX={'left'}
			alignY={'start'}
			// Ignored via go/ees005
			// eslint-disable-next-line @atlaskit/editor/no-as-casting
			target={targetHandleRef as HTMLElement}
			mountTo={undefined}
			zIndex={akEditorFloatingOverlapPanelZIndex}
			forcePlacement={true}
			stick={true}
			offset={[-6, 8]}
		>
			<DropdownMenu
				mountTo={mountPoint}
				boundariesElement={boundariesElement}
				scrollableElement={scrollableElement}
				//This needs be removed when the a11y is completely handled
				//Disabling key navigation now as it works only partially
				arrowKeyNavigationProviderOptions={{
					type: ArrowKeyNavigationType.MENU,
				}}
				items={items}
				isOpen={true}
				fitWidth={BLOCK_MENU_WIDTH}
				section={{ hasSeparator: true }}
				onOpenChange={handleOpenChange}
				onItemActivated={onMenuItemActivated}
			/>
		</Popup>
	);
};

export default injectIntl(BlockMenu);
