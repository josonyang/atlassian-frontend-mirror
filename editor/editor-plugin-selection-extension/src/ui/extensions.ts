import type {
	ExtensionConfiguration,
	ExtensionSource,
	GetBlockMenuItemFn,
	GetBlockMenuNestedItemsFn,
	GetMenuItemsFn,
	GetToolbarItemFn,
	SelectionExtension,
} from '../types';

export type ToolbarItemExtension = {
	getMenuItems?: GetMenuItemsFn;
	getToolbarItem: GetToolbarItemFn;
};

/**
 * From the full list of extensions, extract only those that have a toolbar item configuration
 * for the specified type (either 'primaryToolbar' or 'inlineToolbar').
 *
 * @param extensionList - List of all extensions
 * @param toolbarType - Type of toolbar ('primaryToolbar' or 'inlineToolbar')
 * @returns Array of ToolbarItemExtension objects
 * @example
 */
export const getToolbarItemExtensions = (
	extensionList: ExtensionConfiguration[],
	toolbarType: 'primaryToolbar' | 'inlineToolbar',
): ToolbarItemExtension[] => {
	return extensionList.reduce<ToolbarItemExtension[]>((acc, extension) => {
		const toolbarConfig = extension[toolbarType];
		if (toolbarConfig?.getToolbarItem) {
			acc.push({
				getToolbarItem: toolbarConfig.getToolbarItem,
				getMenuItems: toolbarConfig.getMenuItems,
			});
		}
		return acc;
	}, []);
};

/**
 * From the full list of extensions, extract only those that have a menu item configuration
 * for the specified source (either 'first-party' or 'external').
 *
 * Map each to the legacy format for SelectionExtension.
 *
 * @param extensionList - List of all extensions
 * @param targetSource - Source of the extensions ('first-party' or 'external')
 * @returns Array of SelectionExtension objects
 * @example
 */
export const getMenuItemExtensions = (
	extensionList: ExtensionConfiguration[],
	targetSource: ExtensionSource,
): SelectionExtension[] => {
	return extensionList.reduce<SelectionExtension[]>((acc, extension) => {
		const { source, inlineToolbar } = extension;
		if (source === targetSource && inlineToolbar?.getMenuItems && !inlineToolbar.getToolbarItem) {
			const menuItems = inlineToolbar.getMenuItems();

			menuItems.forEach((menuItem) => {
				// Only process ExtensionMenuItemConfiguration, skip ExtensionMenuSectionConfiguration
				if ('label' in menuItem && 'icon' in menuItem) {
					acc.push({
						name: menuItem.label,
						icon: menuItem.icon,
						onClick: menuItem.onClick,
						isDisabled: () => !!menuItem.isDisabled,
						component: menuItem.contentComponent,
					});
				}
			});
		}
		return acc;
	}, []);
};

type BlockMenuItems = {
	menuItem: ReturnType<GetBlockMenuItemFn>;
	nestedMenuItems?: ReturnType<GetBlockMenuNestedItemsFn>;
};

export const getBlockMenuItemExtensions = (
	extensionList: ExtensionConfiguration[],
	targetSource: ExtensionSource,
) => {
	return extensionList.reduce<BlockMenuItems[]>((acc, extension) => {
		const { source, blockMenu } = extension;
		if (source === targetSource && blockMenu?.getMenuItem) {
			const menuItem = blockMenu.getMenuItem();
			const nestedMenuItems = blockMenu.getNestedMenuItems?.();
			acc.push({
				menuItem,
				nestedMenuItems,
			});
		}
		return acc;
	}, []);
};
