import type {
	FloatingToolbarConfig,
	NextEditorPlugin,
	OptionalPlugin,
} from '@atlaskit/editor-common/types';
import type { BlockControlsPlugin } from '@atlaskit/editor-plugin-block-controls';
import type { ContextPanelPlugin } from '@atlaskit/editor-plugin-context-panel';
import type { CopyButtonPlugin } from '@atlaskit/editor-plugin-copy-button';
import type { DecorationsPlugin } from '@atlaskit/editor-plugin-decorations';
import type { EditorDisabledPlugin } from '@atlaskit/editor-plugin-editor-disabled';
import type { EditorViewModePlugin } from '@atlaskit/editor-plugin-editor-viewmode';
import type { ExtensionPlugin } from '@atlaskit/editor-plugin-extension';
import type { FeatureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
import type { Node } from '@atlaskit/editor-prosemirror/model';
import type { EditorState, Transaction } from '@atlaskit/editor-prosemirror/state';

export type ConfigWithNodeInfo = {
	config: FloatingToolbarConfig | undefined;
	pos: number;
	node: Node;
};

export type FloatingToolbarPluginState = {
	getConfigWithNodeInfo: (state: EditorState) => ConfigWithNodeInfo | null | undefined;
};

export type FloatingToolbarPluginData = {
	confirmDialogForItem?: number;
};

export type ForceFocusSelector = (selector: string | null) => (tr: Transaction) => Transaction;

/**
 * Floating toolbar plugin to be added to an `EditorPresetBuilder` and used with `ComposableEditor`
 * from `@atlaskit/editor-core`.
 */
export type FloatingToolbarPlugin = NextEditorPlugin<
	'floatingToolbar',
	{
		dependencies: [
			DecorationsPlugin,
			OptionalPlugin<ContextPanelPlugin>,
			OptionalPlugin<ExtensionPlugin>,
			CopyButtonPlugin,
			EditorDisabledPlugin,
			OptionalPlugin<EditorViewModePlugin>,
			OptionalPlugin<BlockControlsPlugin>,
			OptionalPlugin<FeatureFlagsPlugin>,
		];
		actions: { forceFocusSelector: ForceFocusSelector };
		sharedState:
			| {
					configWithNodeInfo: ConfigWithNodeInfo | undefined;
					floatingToolbarData: FloatingToolbarPluginData | undefined;
			  }
			| undefined;
	}
>;
