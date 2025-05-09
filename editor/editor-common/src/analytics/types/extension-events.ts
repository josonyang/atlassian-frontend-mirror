import type { ExtensionLayout } from '@atlaskit/adf-schema';

import type { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, INPUT_METHOD } from './enums';
import type { SELECTION_TYPE, TrackAEP } from './utils';

export enum GAP_CURSOR_POSITION {
	LEFT = 'left',
	RIGHT = 'right',
}

export enum TARGET_SELECTION_SOURCE {
	CURRENT_SELECTION = 'currentSelection',
	HTML_ELEMENT = 'htmlElement',
}

// Not a discriminated union because we are using `selection.toJSON()`
export type SelectionJson = {
	type: SELECTION_TYPE;
	anchor?: number;
	head?: number;
	side?: GAP_CURSOR_POSITION;
	pos?: number;
};

export type ExtensionType =
	| ACTION_SUBJECT_ID.EXTENSION_BLOCK
	| ACTION_SUBJECT_ID.EXTENSION_BODIED
	| ACTION_SUBJECT_ID.EXTENSION_INLINE;

type ExtensionUpdateAEP = TrackAEP<
	ACTION.UPDATED | ACTION.ERRORED,
	ACTION_SUBJECT.EXTENSION,
	ExtensionType,
	{
		// com.atlassian.ecosystem - Forge
		extensionType: string;
		/**
		 * extensionkey follows this format:
		 * `${manifest.key}:${manifest.modules.nodes.name}`
		 * e.g: 'awesome:item', 'awesome:default', 'awesome:list'
		 */
		extensionKey: string;
		layout?: ExtensionLayout;
		// UUID
		localId?: string;
		selection: SelectionJson;
		// Updated using selection from
		targetSelectionSource: TARGET_SELECTION_SOURCE;
	},
	INPUT_METHOD.MACRO_BROWSER | INPUT_METHOD.CONFIG_PANEL | INPUT_METHOD.TOOLBAR
>;

type ExtensionDeletedAEP = TrackAEP<
	ACTION.DELETED,
	ACTION_SUBJECT.EXTENSION,
	ExtensionType,
	{
		extensionType: string;
		extensionKey: string;
		localId: string;
		inputMethod?: INPUT_METHOD.TOOLBAR | INPUT_METHOD.FLOATING_TB;
	},
	INPUT_METHOD.TOOLBAR | INPUT_METHOD.FLOATING_TB
>;

type ExtensionAPICalledPayload = TrackAEP<
	ACTION.INVOKED,
	ACTION_SUBJECT.EXTENSION,
	ACTION_SUBJECT_ID.EXTENSION_API,
	{
		functionName: string;
	},
	INPUT_METHOD.EXTENSION_API
>;

export type ExtensionEventPayload =
	| ExtensionUpdateAEP
	| ExtensionDeletedAEP
	| ExtensionAPICalledPayload;
