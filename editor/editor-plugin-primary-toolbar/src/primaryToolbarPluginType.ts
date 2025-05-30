import type { NextEditorPlugin, ToolbarUIComponentFactory } from '@atlaskit/editor-common/types';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';

export interface PrimaryToolbarPluginOptions {
	contextualFormattingEnabled?: boolean;
}

export type PrimaryToolbarPlugin = NextEditorPlugin<
	'primaryToolbar',
	{
		sharedState: PrimaryToolbarPluginState | undefined;
		actions: {
			registerComponent: ({
				name,
				component,
			}: {
				name: ToolbarElementNames;
				component: ToolbarUIComponentFactory;
			}) => void;
		};
		pluginConfiguration?: PrimaryToolbarPluginOptions;
	}
>;

export type ComponentRegistry = Map<string, ToolbarUIComponentFactory>;

export type ToolbarElementNames =
	| 'separator'
	| 'undoRedoPlugin'
	| 'blockType'
	| 'textFormatting'
	| 'alignment'
	| 'textColor'
	| 'highlight'
	| 'hyperlink'
	| 'toolbarListsIndentation'
	| 'insertBlock'
	| 'beforePrimaryToolbar'
	| 'avatarGroup'
	| 'findReplace'
	| 'aiExperience'
	| 'aiSimplified'
	| 'loom'
	| 'spellCheck'
	| 'overflowMenu'
	| 'pinToolbar';

export type ToolbarElementConfig = {
	name: ToolbarElementNames;
	enabled?: (componentRegistry: ComponentRegistry, editorState: EditorState) => boolean;
};

export type PrimaryToolbarPluginState = {
	components: ToolbarUIComponentFactory[];
};
