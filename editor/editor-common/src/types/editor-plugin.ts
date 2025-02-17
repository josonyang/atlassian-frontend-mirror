import type { EditorState, Transaction } from '@atlaskit/editor-prosemirror/state';

import type { ContextPanelHandler } from './context-panel';
import type { FloatingToolbarHandler } from './floating-toolbar';
import type { PMPlugin } from './plugin-factory';
import type { MarkConfig, NodeConfig } from './prosemirror-config';
import type { QuickInsertHandler } from './quick-insert';
import type { SelectionToolbarHandler } from './selection-toolbar';
import type { ToolbarUIComponentFactory } from './toolbar';
import type { TypeAheadHandler } from './type-ahead';
import type { ReactHookFactory, UIComponentFactory } from './ui-components';

export type PluginsOptions = {
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[pluginName: string]: any;
	/**
	 * Handler returns an array of QuickInsertItem that are added to the Element Browser, Insert Menu and Quick Insert
	 */
	quickInsert?: QuickInsertHandler;
	typeAhead?: TypeAheadHandler;
	/**
	 * See: `FloatingToolbarConfig`
	 */
	floatingToolbar?: FloatingToolbarHandler;
	/**
	 * The selection toolbar is a floating toolbar that is displayed for
	 * range selections when any plugins return a selection toolbar group with
	 * items.
	 */
	selectionToolbar?: SelectionToolbarHandler;
	/**
	 * Handler returning a React component that is added to the context panel.
	 *
	 * See https://product-fabric.atlassian.net/wiki/spaces/E/pages/1406016239/Context+Panel
	 */
	contextPanel?: ContextPanelHandler;
};

type EditorViewStateUpdatedCallbackProps = {
	readonly originalTransaction: Readonly<Transaction>;
	readonly transactions: readonly Transaction[];
	readonly oldEditorState: Readonly<EditorState>;
	readonly newEditorState: Readonly<EditorState>;
};

export interface EditorPlugin {
	/**
	 * Name of a plugin, that other plugins can use to provide options to it or exclude via a preset.
	 */
	name: string;

	/**
	 * Options that will be passed to a plugin with a corresponding name if it exists and enabled.
	 */
	pluginsOptions?: PluginsOptions;

	/**
	 * List of ProseMirror-plugins. This is where we define which plugins will be added to EditorView (main-plugin, keybindings, input-rules, etc.).
	 */
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pmPlugins?: (pluginOptions?: any) => Array<PMPlugin>;

	/**
	 * A list of `NodeConfig`s with a name and a `NodeSpec`. (`NodeSpec` is imported from @atlaskit/adf-schema)
	 *
	 */
	nodes?: () => NodeConfig[];

	/**
	 * A list of `MarkConfig`s with a name and a `MarkSpec` (`MarkSpec` is imported from @atlaskit/adf-schema)
	 */
	marks?: () => MarkConfig[];

	/**
	 * Optional UI-component that lives inside the actual content-area (like mention-picker, floating toolbar for links, etc.)
	 *
	 * Handler returns a React component that is added to the top of the editor content area (PluginSlot).
	 * Although it’s common to specify a custom mount point (eg. date picker)
	 */
	contentComponent?: UIComponentFactory;

	/**
	 * Optional react hook that is mounted for all appearances
	 *
	 * This can be used to access React context, or other React specific code (ie. run `useEffect`)
	 * within a plugin that will run for all appearances without mounting any components.
	 *
	 * Example usages include analytics or width.
	 */
	usePluginHook?: ReactHookFactory;

	/**
	 * Optional UI-component that will be added to the toolbar at the top of the editor (doesn't exist in the compact-editor).
	 *
	 * Handler returns a React component that is added to the toolbar at the top of the editor
	 *
	 * Plugins use <ToolbarButton> component to maintain design consistency.
	 */
	primaryToolbarComponent?: ToolbarUIComponentFactory;

	/**
	 * Optional UI-component that will be added to the toolbar at the bottom right of the editor. (doesn't exist in the full-page editor)
	 * In compact mode this toolbar lives on the right-hand side of the editor.
	 */
	secondaryToolbarComponent?: UIComponentFactory;

	/**
	 * Called after EditorView state is updated.
	 */
	onEditorViewStateUpdated?: (props: EditorViewStateUpdatedCallbackProps) => void;
}

export type getPosHandler = getPosHandlerNode | boolean;
export type getPosHandlerNode = () => number | undefined;
