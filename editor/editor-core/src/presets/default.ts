// #region Imports
import type { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { EditorPresetBuilder } from '@atlaskit/editor-common/preset';
import type { ContextIdentifierProvider } from '@atlaskit/editor-common/provider-factory';
import type { SelectionPluginOptions } from '@atlaskit/editor-common/selection';
import type {
	EditorAppearance,
	FeatureFlags,
	HyperlinkPluginOptions,
	PerformanceTracking,
	QuickInsertPluginOptions,
	TextFormattingOptions,
} from '@atlaskit/editor-common/types';
import { analyticsPlugin } from '@atlaskit/editor-plugins/analytics';
import type { BasePluginOptions } from '@atlaskit/editor-plugins/base';
import { basePlugin } from '@atlaskit/editor-plugins/base';
import { betterTypeHistoryPlugin } from '@atlaskit/editor-plugins/better-type-history';
import { blockTypePlugin } from '@atlaskit/editor-plugins/block-type';
import type { BlockTypePluginOptions } from '@atlaskit/editor-plugins/block-type';
import { clearMarksOnEmptyDocPlugin } from '@atlaskit/editor-plugins/clear-marks-on-empty-doc';
import { clipboardPlugin } from '@atlaskit/editor-plugins/clipboard';
import { codeBlockPlugin } from '@atlaskit/editor-plugins/code-block';
import type { CodeBlockOptions } from '@atlaskit/editor-plugins/code-block';
import { compositionPlugin } from '@atlaskit/editor-plugins/composition';
import { contextIdentifierPlugin } from '@atlaskit/editor-plugins/context-identifier';
import { copyButtonPlugin } from '@atlaskit/editor-plugins/copy-button';
import { decorationsPlugin } from '@atlaskit/editor-plugins/decorations';
import { editorDisabledPlugin } from '@atlaskit/editor-plugins/editor-disabled';
import { featureFlagsPlugin } from '@atlaskit/editor-plugins/feature-flags';
import { floatingToolbarPlugin } from '@atlaskit/editor-plugins/floating-toolbar';
import { focusPlugin } from '@atlaskit/editor-plugins/focus';
import { historyPlugin } from '@atlaskit/editor-plugins/history';
import { hyperlinkPlugin } from '@atlaskit/editor-plugins/hyperlink';
import type { PastePluginOptions } from '@atlaskit/editor-plugins/paste';
import { pastePlugin } from '@atlaskit/editor-plugins/paste';
import type { PlaceholderPluginOptions } from '@atlaskit/editor-plugins/placeholder';
import { placeholderPlugin } from '@atlaskit/editor-plugins/placeholder';
import { primaryToolbarPlugin } from '@atlaskit/editor-plugins/primary-toolbar';
import { quickInsertPlugin } from '@atlaskit/editor-plugins/quick-insert';
import { selectionPlugin } from '@atlaskit/editor-plugins/selection';
import { selectionToolbarPlugin } from '@atlaskit/editor-plugins/selection-toolbar';
import { submitEditorPlugin } from '@atlaskit/editor-plugins/submit-editor';
import { textFormattingPlugin } from '@atlaskit/editor-plugins/text-formatting';
import { typeAheadPlugin } from '@atlaskit/editor-plugins/type-ahead';
import type { TypeAheadPluginOptions } from '@atlaskit/editor-plugins/type-ahead';
import { undoRedoPlugin } from '@atlaskit/editor-plugins/undo-redo';
import { unsupportedContentPlugin } from '@atlaskit/editor-plugins/unsupported-content';
import { widthPlugin } from '@atlaskit/editor-plugins/width';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';

import { isFullPage as fullPageCheck } from '../utils/is-full-page';
// #endregion

export type DefaultPresetPluginOptions = {
	paste?: PastePluginOptions;
	base?: BasePluginOptions;
	blockType?: BlockTypePluginOptions;
	placeholder?: PlaceholderPluginOptions;
	textFormatting?: TextFormattingOptions;
	submitEditor?: (editorView: EditorView) => void;
	quickInsert?: QuickInsertPluginOptions;
	codeBlock?: CodeBlockOptions;
	selection?: SelectionPluginOptions;
	hyperlinkOptions?: HyperlinkPluginOptions;
	createAnalyticsEvent?: CreateUIAnalyticsEvent;
	typeAhead?: TypeAheadPluginOptions;
	allowAnalyticsGASV3?: boolean;
	performanceTracking?: PerformanceTracking;
	appearance?: EditorAppearance | undefined;
	allowUndoRedoButtons?: boolean;
	featureFlags?: FeatureFlags;
	contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
	/**
	 * There is expected to be temporary divergence between Live Page editor expand behaviour and the standard expand behaviour.
	 *
	 * This is expected to be removed in Q4 as Editor and Live Page teams align on a singular behaviour.
	 *
	 * It is only supported for use by Confluence.
	 *
	 * @default false
	 */
	__livePage?: boolean;
};

/**
 * Note: The order that presets are added determines
 * their placement in the editor toolbar
 */
export function createDefaultPreset(options: DefaultPresetPluginOptions) {
	const isMobile = options.appearance === 'mobile';
	const isFullPage = fullPageCheck(options.appearance);

	const preset = new EditorPresetBuilder()
		.add([featureFlagsPlugin, options.featureFlags || {}])
		.maybeAdd(
			[
				analyticsPlugin,
				{
					createAnalyticsEvent: options.createAnalyticsEvent,
					performanceTracking: options.performanceTracking,
				},
			],
			Boolean(options.allowAnalyticsGASV3),
		)
		.add(betterTypeHistoryPlugin)
		.add([pastePlugin, { ...options?.paste, isFullPage }])
		.add(clipboardPlugin)
		.add(focusPlugin)
		.add(compositionPlugin)
		.add([
			contextIdentifierPlugin,
			{ contextIdentifierProvider: options.contextIdentifierProvider },
		])
		.add([basePlugin, options.base])
		.add(decorationsPlugin)
		.add([typeAheadPlugin, options.typeAhead])
		.maybeAdd(historyPlugin, Boolean(isMobile || options.allowUndoRedoButtons))
		.maybeAdd(primaryToolbarPlugin, () => !!fg('platform.editor.primary-toolbar-ordering'))
		.maybeAdd(
			undoRedoPlugin,
			Boolean(options.featureFlags?.undoRedoButtons ?? options.allowUndoRedoButtons),
		)
		.add([blockTypePlugin, options.blockType])
		.add(clearMarksOnEmptyDocPlugin)
		.maybeAdd(
			[
				selectionToolbarPlugin,
				{
					preferenceToolbarAboveSelection: false,
				},
			],
			() => {
				if (fg('platform.editor.enable-selection-toolbar_ucdwd')) {
					return true;
				}

				return false;
			},
		)
		.add([
			hyperlinkPlugin,
			{
				...options.hyperlinkOptions,
				// @ts-ignore Temporary solution to check for Live Page editor.
				__livePage: options.__livePage,
			},
		])
		.add([textFormattingPlugin, options.textFormatting])
		.add(widthPlugin)
		.add([quickInsertPlugin, options.quickInsert])
		.add([placeholderPlugin, options.placeholder])
		.add(unsupportedContentPlugin)
		.add(editorDisabledPlugin)
		.add([submitEditorPlugin, options.submitEditor])
		.add(copyButtonPlugin)
		.add(floatingToolbarPlugin)
		.add([selectionPlugin, { ...options.selection, __livePage: options.__livePage }])
		.add([codeBlockPlugin, options.codeBlock]);

	return preset;
}

export function useDefaultPreset(props: DefaultPresetPluginOptions) {
	const preset = createDefaultPreset(props);
	return [preset];
}
