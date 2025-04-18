import React, { useEffect } from 'react';

import { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import { ElementBrowser } from '@atlaskit/editor-common/element-browser';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type { Providers } from '@atlaskit/editor-common/provider-factory';
import { WithProviders } from '@atlaskit/editor-common/provider-factory';
import type {
	Command,
	EditorAppearance,
	ExtractInjectionAPI,
	PMPlugin,
	ToolbarUIComponentFactory,
	ToolbarUiComponentFactoryParams,
} from '@atlaskit/editor-common/types';
import { ToolbarSize } from '@atlaskit/editor-common/types';
import type { InputMethod as BlockTypeInputMethod } from '@atlaskit/editor-plugin-block-type';
import { BLOCK_QUOTE, CODE_BLOCK, PANEL } from '@atlaskit/editor-plugin-block-type/consts';
import { fg } from '@atlaskit/platform-feature-flags';

import type { InsertBlockPlugin } from './insertBlockPluginType';
import { toggleInsertBlockPmKey, toggleInsertBlockPmPlugin } from './pm-plugins/toggleInsertBlock';
import type { InsertBlockOptions } from './types';
// Ignored via go/ees005
// eslint-disable-next-line import/no-named-as-default
import ToolbarInsertBlock from './ui/ToolbarInsertBlock';

export const toolbarSizeToButtons = (toolbarSize: ToolbarSize, appearance?: EditorAppearance) => {
	// Different button numbers for full-page to better match full page toolbar breakpoints
	if (appearance === 'full-page' && fg('platform_editor_toolbar_responsive_fixes')) {
		switch (toolbarSize) {
			case ToolbarSize.XXL:
			case ToolbarSize.XL:
			case ToolbarSize.L:
				return 7;
			case ToolbarSize.M:
				return 3;

			default:
				return 0;
		}
	}

	if (fg('platform_editor_toolbar_responsive_fixes')) {
		switch (toolbarSize) {
			case ToolbarSize.XXL:
			case ToolbarSize.XL:
				return 7;
			case ToolbarSize.L:
				return 5;
			case ToolbarSize.M:
			case ToolbarSize.S:
				return 2;

			default:
				return 0;
		}
	} else {
		switch (toolbarSize) {
			case ToolbarSize.XXL:
			case ToolbarSize.XL:
			case ToolbarSize.L:
			case ToolbarSize.M:
				return 7;

			case ToolbarSize.S:
				return 2;

			default:
				return 0;
		}
	}
};

/**
 * Wrapper over insertBlockTypeWithAnalytics to autobind toolbar input method
 * @param name Block name
 */
function handleInsertBlockType(
	insertCodeBlock?: (input_method: INPUT_METHOD) => Command,
	insertPanel?: (input_method: INPUT_METHOD) => Command,
	insertBlockQuote?: (input_method: BlockTypeInputMethod) => Command,
) {
	return (name: string) => {
		if (name === CODE_BLOCK.name && insertCodeBlock) {
			return insertCodeBlock(INPUT_METHOD.TOOLBAR);
		}
		if (name === PANEL.name && insertPanel) {
			return insertPanel(INPUT_METHOD.TOOLBAR);
		}
		if (name === BLOCK_QUOTE.name && insertBlockQuote) {
			return insertBlockQuote(INPUT_METHOD.INSERT_MENU);
		}
		return () => false;
	};
}

function delayUntilIdle(cb: Function) {
	if (typeof window === 'undefined') {
		return;
	}
	// eslint-disable-next-line compat/compat
	if (window.requestIdleCallback !== undefined) {
		// eslint-disable-next-line compat/compat
		return window.requestIdleCallback(() => cb(), { timeout: 500 });
	}
	return window.requestAnimationFrame(() => cb());
}

export const insertBlockPlugin: InsertBlockPlugin = ({ config: options = {}, api }) => {
	const primaryToolbarComponent: ToolbarUIComponentFactory = ({
		editorView,
		editorActions,
		dispatchAnalyticsEvent,
		providerFactory,
		popupsMountPoint,
		popupsBoundariesElement,
		popupsScrollableElement,
		toolbarSize,
		disabled,
		isToolbarReducedSpacing,
		isLastItem,
	}) => {
		const renderNode = (providers: Providers) => {
			return (
				<ToolbarInsertBlockWithInjectionApi
					pluginInjectionApi={api}
					editorView={editorView}
					editorActions={editorActions}
					dispatchAnalyticsEvent={dispatchAnalyticsEvent}
					providerFactory={providerFactory}
					popupsMountPoint={popupsMountPoint}
					popupsBoundariesElement={popupsBoundariesElement}
					popupsScrollableElement={popupsScrollableElement}
					toolbarSize={toolbarSize}
					disabled={disabled}
					isToolbarReducedSpacing={isToolbarReducedSpacing}
					isLastItem={isLastItem}
					providers={providers}
					options={options}
					appearance={options.appearance}
				/>
			);
		};

		return (
			<WithProviders
				providerFactory={providerFactory}
				providers={['emojiProvider']}
				renderNode={renderNode}
			/>
		);
	};

	api?.primaryToolbar?.actions.registerComponent({
		name: 'insertBlock',
		component: primaryToolbarComponent,
	});

	const plugin: ReturnType<InsertBlockPlugin> = {
		name: 'insertBlock',

		actions: {
			toggleAdditionalMenu: () => {
				api?.core?.actions.execute(({ tr }) => {
					return tr.setMeta(toggleInsertBlockPmKey, true);
				});
			},
		},

		getSharedState: (editorState) => {
			if (!editorState || !['full-page', 'full-width'].includes(options.appearance ?? '')) {
				return;
			}

			const toggleInsertBlockPluginState = toggleInsertBlockPmKey.getState(editorState);

			return {
				showElementBrowser: toggleInsertBlockPluginState?.showElementBrowser || false,
			};
		},

		usePluginHook() {
			useEffect(() => {
				// This is to optimise the UI so that when the user first clicks on the insert
				// menu it opens instantly. As we're delaying the loading this won't affect the
				// initial editor rendering metrics.
				delayUntilIdle(() => {
					ElementBrowser.preload();
				});
			}, []);
		},

		pmPlugins: () => {
			if (!['full-page', 'full-width'].includes(options.appearance ?? '')) {
				[];
			}

			const plugins: PMPlugin[] = [];

			plugins.push({
				name: 'toggleInsertBlockPmPlugin',
				plugin: () => toggleInsertBlockPmPlugin(),
			});

			return plugins;
		},
		pluginsOptions: {},
		primaryToolbarComponent: !api?.primaryToolbar ? primaryToolbarComponent : undefined,
	};

	return plugin;
};

interface ToolbarInsertBlockWithInjectionApiProps
	extends Omit<
		ToolbarUiComponentFactoryParams,
		'eventDispatcher' | 'appearance' | 'containerElement' | 'wrapperElement'
	> {
	providers: Providers;
	pluginInjectionApi: ExtractInjectionAPI<typeof insertBlockPlugin> | undefined;
	options: InsertBlockOptions;
	appearance: EditorAppearance | undefined;
}

function ToolbarInsertBlockWithInjectionApi({
	editorView,
	editorActions,
	dispatchAnalyticsEvent,
	popupsMountPoint,
	popupsBoundariesElement,
	popupsScrollableElement,
	toolbarSize,
	disabled,
	isToolbarReducedSpacing,
	isLastItem,
	providers,
	pluginInjectionApi,
	options,
	appearance,
}: ToolbarInsertBlockWithInjectionApiProps) {
	const buttons = toolbarSizeToButtons(toolbarSize, appearance);
	const {
		dateState,
		hyperlinkState,
		imageUploadState,
		mentionState,
		emojiState,
		blockTypeState,
		mediaState,
		typeAheadState,
		placeholderTextState,
		insertBlockState,
		connectivityState,
	} = useSharedPluginState(pluginInjectionApi, [
		'hyperlink',
		'date',
		'imageUpload',
		'mention',
		'emoji',
		'blockType',
		'media',
		'typeAhead',
		'placeholderText',
		'insertBlock',
		'connectivity',
	]);

	const getEmojiProvider = () => {
		if (emojiState?.emojiProvider) {
			return Promise.resolve(emojiState?.emojiProvider);
		}
	};

	const emojiProvider = getEmojiProvider();

	const onShowMediaPicker = (mountInfo?: { ref: HTMLElement; mountPoint: HTMLElement }) => {
		if (!mediaState) {
			return;
		}

		if (fg('platform_editor_add_media_from_url_rollout')) {
			pluginInjectionApi?.core?.actions.execute(
				pluginInjectionApi?.mediaInsert?.commands.showMediaInsertPopup(mountInfo),
			);
		} else {
			mediaState.showMediaPicker();
		}
	};

	return (
		<ToolbarInsertBlock
			showElementBrowser={insertBlockState?.showElementBrowser || false}
			pluginInjectionApi={pluginInjectionApi}
			buttons={buttons}
			isReducedSpacing={isToolbarReducedSpacing}
			isDisabled={disabled}
			isTypeAheadAllowed={Boolean(typeAheadState?.isAllowed)}
			editorView={editorView}
			tableSupported={!!editorView.state.schema.nodes.table}
			tableSelectorSupported={
				options.tableSelectorSupported && !!editorView.state.schema.nodes.table
			}
			actionSupported={!!editorView.state.schema.nodes.taskItem}
			mentionsSupported={!!(mentionState && mentionState.mentionProvider)}
			mentionsDisabled={!!(mentionState && !mentionState.canInsertMention)}
			decisionSupported={!!editorView.state.schema.nodes.decisionItem}
			dateEnabled={!!dateState}
			placeholderTextEnabled={placeholderTextState && placeholderTextState.allowInserting}
			layoutSectionEnabled={Boolean(pluginInjectionApi?.layout)}
			expandEnabled={!!options.allowExpand}
			mediaUploadsEnabled={(mediaState && mediaState.allowsUploads) ?? undefined}
			onShowMediaPicker={onShowMediaPicker}
			mediaSupported={!!mediaState}
			isEditorOffline={connectivityState?.mode === 'offline'}
			imageUploadSupported={!!pluginInjectionApi?.imageUpload}
			imageUploadEnabled={imageUploadState?.enabled}
			handleImageUpload={pluginInjectionApi?.imageUpload?.actions.startUpload}
			availableWrapperBlockTypes={blockTypeState && blockTypeState.availableWrapperBlockTypes}
			linkSupported={!!hyperlinkState}
			linkDisabled={
				!hyperlinkState || !hyperlinkState.canInsertLink || !!hyperlinkState.activeLinkMark
			}
			emojiDisabled={!emojiState || !emojiProvider}
			emojiProvider={emojiProvider}
			nativeStatusSupported={options.nativeStatusSupported}
			horizontalRuleEnabled={options.horizontalRuleEnabled}
			onInsertBlockType={handleInsertBlockType(
				pluginInjectionApi?.codeBlock?.actions.insertCodeBlock,
				pluginInjectionApi?.panel?.actions.insertPanel,
				pluginInjectionApi?.blockType?.actions.insertBlockQuote,
			)}
			onInsertMacroFromMacroBrowser={
				pluginInjectionApi?.extension?.actions.insertMacroFromMacroBrowser
			}
			popupsMountPoint={popupsMountPoint}
			popupsBoundariesElement={popupsBoundariesElement}
			popupsScrollableElement={popupsScrollableElement}
			insertMenuItems={options.insertMenuItems}
			editorActions={editorActions}
			dispatchAnalyticsEvent={dispatchAnalyticsEvent}
			showElementBrowserLink={options.showElementBrowserLink}
			showSeparator={!isLastItem && toolbarSize <= ToolbarSize.S}
			editorAppearance={options.appearance}
		/>
	);
}
