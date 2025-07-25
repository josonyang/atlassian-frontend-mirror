import type { ADFEntity } from '@atlaskit/adf-utils/types';
import { type MenuItem } from '@atlaskit/editor-common/ui-menu';
import type { ViewMode } from '@atlaskit/editor-plugin-editor-viewmode';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';

export type MenuItemsType = Array<{
	items: MenuItem[];
}>;

export type SelectionExtensionComponentProps = {
	closeExtension: () => void;
	selection: SelectionExtensionSelectionInfo;
};

export type SelectionExtensionCallbackOptions = {
	selection?: SelectionExtensionSelectionInfo;
	selectedNodeAdf?: ADFEntity;
	selectionRanges?: SelectionRange[];
};

export type SelectionExtensionSelectionInfo = {
	text: string;
	from: number;
	to: number;
	coords: SelectionExtensionCoords;
};

export type SelectionCoords = {
	left: number;
	right: number;
	top: number;
	bottom: number;
};

export type SelectionExtension = {
	name: string;
	icon?: React.ComponentType<React.PropsWithChildren<{ label: string }>>;
	isDisabled?: (params: SelectionExtensionCallbackOptions) => boolean;
	onClick?: (params: SelectionExtensionCallbackOptions) => void;
	component?: React.ComponentType<SelectionExtensionComponentProps>;
};

export type DynamicSelectionExtension = Omit<SelectionExtension, 'isDisabled'> & {
	isDisabled?: boolean;
};

// inspired by content api operation https://bitbucket.org/atlassian/pf-adf-service/src/master/src/lib/update/types.ts
export type SelectionPointer = {
	pointer: string;
	// position only applicable if selection is a text node
	position?: number;
};

export type SelectionRange = {
	start: SelectionPointer;
	end: SelectionPointer;
};

export type SelectionExtensionFnOptions = {
	selectedNodeAdf: ADFEntity;
	selectionRanges: SelectionRange[];
};

export type SelectionExtensionFn = ({
	selectedNodeAdf,
	selectionRanges,
}: SelectionExtensionFnOptions) => DynamicSelectionExtension;

export type SelectionExtensionConfig = SelectionExtension | SelectionExtensionFn;

export type SelectionExtensions = {
	firstParty?: SelectionExtensionConfig[];
	external?: SelectionExtensionConfig[];
};

type SelectionExtensionModes = ViewMode;

export type SelectionExtensionPluginOptions = {
	pageModes?: SelectionExtensionModes | SelectionExtensionModes[];
	extensions?: SelectionExtensions;
};

/**
 * @private
 * @deprecated Use {@link SelectionExtensionPluginOptions} instead.
 * @see https://product-fabric.atlassian.net/browse/ED-27496
 */
export type SelectionExtensionPluginConfiguration = SelectionExtensionPluginOptions;

export type SelectionExtensionCoords = { left: number; right: number; top: number; bottom: number };

export type InsertPosition = {
	pointer: string;
	// can set from/to if selection is a text node
	from?: number;
	to?: number;
};
export type LinkInsertionOption = {
	link: string;
	insertPosition: InsertPosition;
};

export enum SelectionExtensionActionTypes {
	SET_ACTIVE_EXTENSION = 'set-active-extension',
	UPDATE_ACTIVE_EXTENSION_COORDS = 'update-active-extension-coords',
	CLEAR_ACTIVE_EXTENSION = 'clear-active-extension',
	SET_SELECTED_NODE = 'set-selected-node',
	START_TRACK_CHANGES = 'start-track-changes',
}

export type UpdateActiveExtensionAction =
	| {
			type: SelectionExtensionActionTypes.SET_ACTIVE_EXTENSION;
			extension: SelectionExtension;
	  }
	| {
			type: SelectionExtensionActionTypes.UPDATE_ACTIVE_EXTENSION_COORDS;
			coords: SelectionExtensionCoords;
	  }
	| { type: SelectionExtensionActionTypes.CLEAR_ACTIVE_EXTENSION };

export type SelectionExtensionPluginState = {
	activeExtension?: {
		extension: SelectionExtension;
		selection: SelectionExtensionSelectionInfo;
		coords: SelectionExtensionCoords;
	};
	selectedNode?: PMNode;
	nodePos?: number;
	startTrackChanges?: boolean;
	docChangedAfterClick?: boolean;
};
