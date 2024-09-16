import { type IntlShape } from 'react-intl-next';

import { type INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import type {
	EditorCommand,
	NextEditorPlugin,
	OptionalPlugin,
} from '@atlaskit/editor-common/types';
import type { AccessibilityUtilsPlugin } from '@atlaskit/editor-plugin-accessibility-utils';
import { type AnalyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import type { EditorDisabledPlugin } from '@atlaskit/editor-plugin-editor-disabled';
import type { FeatureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
import type { QuickInsertPlugin } from '@atlaskit/editor-plugin-quick-insert';
import type { WidthPlugin } from '@atlaskit/editor-plugin-width';
import { type DecorationSet } from '@atlaskit/editor-prosemirror/view';

export type ActiveNode = {
	pos: number;
	anchorName: string;
	nodeType: string;
	handleOptions?: HandleOptions;
};

export interface PluginState {
	decorations: DecorationSet;
	isDragging: boolean;
	isMenuOpen?: boolean;
	editorHeight: number;
	editorWidthLeft: number;
	editorWidthRight: number;
	activeNode?: ActiveNode;
	isResizerResizing: boolean;
	/**
	 * @private
	 * @deprecated Doc size limits no longer supported
	 */
	isDocSizeLimitEnabled: boolean | null;
	/**
	 * is dragging the node without using drag handle, i,e, native prosemirror DnD
	 */
	isPMDragging: boolean;
	childCount: number;
}

export type ReleaseHiddenDecoration = () => boolean | undefined;

export type BlockControlsSharedState =
	| {
			isMenuOpen: boolean;
			activeNode?: ActiveNode;
			isDragging: boolean;
			isPMDragging: boolean;
	  }
	| undefined;

export type HandleOptions = { isFocused: boolean } | undefined;

export type BlockControlsPlugin = NextEditorPlugin<
	'blockControls',
	{
		dependencies: [
			OptionalPlugin<EditorDisabledPlugin>,
			OptionalPlugin<WidthPlugin>,
			OptionalPlugin<FeatureFlagsPlugin>,
			OptionalPlugin<AnalyticsPlugin>,
			OptionalPlugin<AccessibilityUtilsPlugin>,
			/**
			 * For Typeahead - Empty line prompt experiment
			 * Clean up ticket ED-24824
			 */
			OptionalPlugin<QuickInsertPlugin>,
		];
		sharedState: BlockControlsSharedState;
		commands: {
			moveNode: (
				start: number,
				to: number,
				inputMethod?: MoveNodeMethod,
				formatMessage?: IntlShape['formatMessage'],
			) => EditorCommand;
			showDragHandleAt: (
				pos: number,
				anchorName: string,
				nodeType: string,
				handleOptions?: HandleOptions,
			) => EditorCommand;
			setNodeDragged: (
				getPos: () => number | undefined,
				anchorName: string,
				nodeType: string,
			) => EditorCommand;
		};
	}
>;

export type BlockControlsMeta = {
	activeNode: ActiveNode;
	type: string;
	dom: HTMLElement;
	editorHeight: number;
	nodeMoved: boolean;
};

export type MoveNodeMethod = INPUT_METHOD.DRAG_AND_DROP | INPUT_METHOD.SHORTCUT;
