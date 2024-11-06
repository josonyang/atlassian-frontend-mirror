import React, { useMemo } from 'react';

import {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
	INPUT_METHOD,
} from '@atlaskit/editor-common/analytics';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import { toolbarInsertBlockMessages as messages } from '@atlaskit/editor-common/messages';
import type { MediaProvider } from '@atlaskit/editor-common/provider-factory';
import { IconImages } from '@atlaskit/editor-common/quick-insert';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type {
	EditorAppearance,
	ExtractInjectionAPI,
	PMPlugin,
	PMPluginFactoryParams,
} from '@atlaskit/editor-common/types';
import { NodeSelection, PluginKey } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { getMediaFeatureFlag } from '@atlaskit/media-common';
import { fg } from '@atlaskit/platform-feature-flags';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import type { MediaNextEditorPluginType } from './next-plugin-type';
import { lazyMediaView } from './nodeviews/lazy-media';
import { lazyMediaGroupView } from './nodeviews/lazy-media-group';
import { lazyMediaInlineView } from './nodeviews/lazy-media-inline';
import { lazyMediaSingleView } from './nodeviews/lazy-media-single';
import { createPlugin as createMediaAltTextPlugin } from './pm-plugins/alt-text';
import keymapMediaAltTextPlugin from './pm-plugins/alt-text/keymap';
import { hideMediaViewer, showMediaViewer } from './pm-plugins/commands';
import keymapPlugin from './pm-plugins/keymap';
import keymapMediaSinglePlugin from './pm-plugins/keymap-media';
import linkingPlugin from './pm-plugins/linking';
import keymapLinkingPlugin from './pm-plugins/linking/keymap';
import { createPlugin, stateKey } from './pm-plugins/main';
import { mediaSpecWithFixedToDOM } from './toDOM-fixes/media';
import { mediaGroupSpecWithFixedToDOM } from './toDOM-fixes/mediaGroup';
import { mediaInlineSpecWithFixedToDOM } from './toDOM-fixes/mediaInline';
import { mediaSingleSpecWithFixedToDOM } from './toDOM-fixes/mediaSingle';
import { floatingToolbar } from './toolbar';
import { MediaPickerComponents } from './ui/MediaPicker';
import { RenderMediaViewer } from './ui/MediaViewer/PortalWrapper';
import ToolbarMedia from './ui/ToolbarMedia';
import { createMediaIdentifierArray, extractMediaNodes } from './utils/media-common';
import { insertMediaAsMediaSingle } from './utils/media-single';

type MediaPickerFunctionalComponentProps = {
	editorDomElement: Element;
	appearance: EditorAppearance;
	api: ExtractInjectionAPI<MediaNextEditorPluginType> | undefined;
};

type MediaViewerFunctionalComponentProps = {
	api: ExtractInjectionAPI<MediaNextEditorPluginType> | undefined;
	editorView: EditorView;
};

const MediaPickerFunctionalComponent = ({
	api,
	editorDomElement,
	appearance,
}: MediaPickerFunctionalComponentProps) => {
	const { mediaState } = useSharedPluginState(api, ['media']);

	if (!mediaState) {
		return null;
	}

	return (
		<MediaPickerComponents
			editorDomElement={editorDomElement}
			mediaState={mediaState}
			appearance={appearance}
			api={api}
		/>
	);
};

const MediaViewerFunctionalComponent = ({
	api,
	editorView,
}: MediaViewerFunctionalComponentProps) => {
	const { mediaState } = useSharedPluginState(api, ['media']);

	// Only traverse document once when media viewer is visible, media viewer items will not update
	// when document changes are made while media viewer is open

	const mediaItems = useMemo(() => {
		if (mediaState?.isMediaViewerVisible && fg('platform_editor_media_interaction_improvements')) {
			const mediaNodes = extractMediaNodes(editorView.state.doc);
			return createMediaIdentifierArray(mediaNodes);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- only update mediaItems once when media viewer is visible
	}, [mediaState?.isMediaViewerVisible]);

	// Viewer does not have required attributes to render the media viewer
	if (
		!mediaState?.isMediaViewerVisible ||
		!mediaState?.mediaViewerSelectedMedia ||
		!mediaState?.mediaClientConfig
	) {
		return null;
	}

	const handleOnClose = () => {
		// Run Command to hide the media viewer
		api?.core.actions.execute(api?.media.commands.hideMediaViewer);
	};

	return (
		<RenderMediaViewer
			mediaClientConfig={mediaState?.mediaClientConfig}
			onClose={handleOnClose}
			selectedNodeAttrs={mediaState.mediaViewerSelectedMedia}
			items={fg('platform_editor_media_interaction_improvements') ? mediaItems : undefined}
		/>
	);
};

export const mediaPlugin: MediaNextEditorPluginType = ({ config: options = {}, api }) => {
	let previousMediaProvider: Promise<MediaProvider> | undefined;
	return {
		name: 'media',

		getSharedState(editorState) {
			if (!editorState) {
				return null;
			}
			return stateKey.getState(editorState) || null;
		},

		actions: {
			insertMediaAsMediaSingle: (
				view,
				node,
				inputMethod,
				isNestingInQuoteSupported,
				insertMediaVia,
			) =>
				insertMediaAsMediaSingle(
					view,
					node,
					inputMethod,
					api?.analytics?.actions,
					isNestingInQuoteSupported,
					insertMediaVia,
				),
			setProvider: (provider) => {
				// Prevent someone trying to set the exact same provider twice for performance reasons
				if (previousMediaProvider === provider) {
					return false;
				}
				previousMediaProvider = provider;
				return (
					api?.core.actions.execute(({ tr }) =>
						tr.setMeta(stateKey, { mediaProvider: provider }),
					) ?? false
				);
			},
		},
		commands: {
			showMediaViewer,
			hideMediaViewer,
		},

		nodes() {
			const {
				allowMediaGroup = true,
				allowMediaSingle = false,
				allowCaptions,
				featureFlags: mediaFeatureFlags,
			} = options || {};

			const allowMediaInline = getMediaFeatureFlag('mediaInline', mediaFeatureFlags);

			const mediaSingleOption = fg('platform_editor_media_extended_resize_experience')
				? {
						withCaption: allowCaptions,
						withExtendedWidthTypes: true,
					}
				: {
						withCaption: allowCaptions,
						withExtendedWidthTypes: false,
					};

			return [
				{ name: 'mediaGroup', node: mediaGroupSpecWithFixedToDOM() },
				{ name: 'mediaSingle', node: mediaSingleSpecWithFixedToDOM(mediaSingleOption) },
				{ name: 'media', node: mediaSpecWithFixedToDOM() },
				{ name: 'mediaInline', node: mediaInlineSpecWithFixedToDOM() },
			].filter((node) => {
				if (node.name === 'mediaGroup') {
					return allowMediaGroup;
				}

				if (node.name === 'mediaSingle') {
					return allowMediaSingle;
				}

				if (node.name === 'mediaInline') {
					return allowMediaInline;
				}

				return true;
			});
		},

		pmPlugins() {
			const pmPlugins: Array<PMPlugin> = [
				{
					name: 'media',
					plugin: ({
						schema,
						dispatch,
						getIntl,
						eventDispatcher,
						providerFactory,
						errorReporter,
						portalProviderAPI,
						dispatchAnalyticsEvent,
					}: PMPluginFactoryParams) => {
						return createPlugin(
							schema,
							{
								providerFactory,
								nodeViews: {
									mediaGroup: lazyMediaGroupView(
										portalProviderAPI,
										eventDispatcher,
										providerFactory,
										options,
										api,
									),
									mediaSingle: lazyMediaSingleView(
										portalProviderAPI,
										eventDispatcher,
										providerFactory,
										api,
										dispatchAnalyticsEvent,
										options,
									),
									media: lazyMediaView(
										portalProviderAPI,
										eventDispatcher,
										providerFactory,
										options,
										api,
									),
									mediaInline: lazyMediaInlineView(
										portalProviderAPI,
										eventDispatcher,
										providerFactory,
										api,
									),
								},
								errorReporter,
								uploadErrorHandler: options && options.uploadErrorHandler,
								waitForMediaUpload: options && options.waitForMediaUpload,
								customDropzoneContainer: options && options.customDropzoneContainer,
								customMediaPicker: options && options.customMediaPicker,
								allowResizing: !!(options && options.allowResizing),
							},
							getIntl,
							api,
							dispatch,
							options,
						);
					},
				},
				{
					name: 'mediaKeymap',
					plugin: ({ getIntl }) =>
						keymapPlugin(
							options,
							api?.analytics?.actions,
							api?.selection?.actions,
							api?.width,
							getIntl,
						),
				},
			];

			if (options && options.allowMediaSingle) {
				pmPlugins.push({
					name: 'mediaSingleKeymap',
					plugin: ({ schema }) => keymapMediaSinglePlugin(schema),
				});
			}

			if (options && options.allowAltTextOnImages) {
				pmPlugins.push({
					name: 'mediaAltText',
					plugin: createMediaAltTextPlugin,
				});
				pmPlugins.push({
					name: 'mediaAltTextKeymap',
					plugin: ({ schema }) => keymapMediaAltTextPlugin(schema, api?.analytics?.actions),
				});
			}

			if (options && options.allowLinking) {
				pmPlugins.push({
					name: 'mediaLinking',
					plugin: ({ dispatch }: PMPluginFactoryParams) => linkingPlugin(dispatch),
				});
				pmPlugins.push({
					name: 'mediaLinkingKeymap',
					plugin: ({ schema }) => keymapLinkingPlugin(schema),
				});
			}

			pmPlugins.push({
				name: 'mediaSelectionHandler',
				plugin: () => {
					const mediaSelectionHandlerPlugin = new SafePlugin({
						key: new PluginKey('mediaSelectionHandlerPlugin'),
						props: {
							handleScrollToSelection: (view) => {
								const {
									state: { selection },
								} = view;
								if (!(selection instanceof NodeSelection) || selection.node.type.name !== 'media') {
									return false;
								}

								const { node, offset } = view.domAtPos(selection.from);
								if (
									// Is the media element mounted already?
									offset === node.childNodes.length
								) {
									// Media is not ready, so stop the scroll request
									return true;
								}

								// Media is ready, keep the scrolling request
								return false;
							},
						},
					});

					return mediaSelectionHandlerPlugin;
				},
			});

			return pmPlugins;
		},

		contentComponent({ editorView, appearance }) {
			return (
				<>
					{fg('platform_editor_media_previewer_bugfix') && (
						<MediaViewerFunctionalComponent api={api} editorView={editorView} />
					)}
					<MediaPickerFunctionalComponent
						editorDomElement={editorView.dom}
						appearance={appearance}
						api={api}
					/>
				</>
			);
		},

		secondaryToolbarComponent({ editorView, eventDispatcher, disabled }) {
			return <ToolbarMedia isDisabled={disabled} isReducedSpacing={true} api={api} />;
		},

		pluginsOptions: {
			quickInsert: ({ formatMessage }) =>
				editorExperiment('add-media-from-url', true)
					? []
					: [
							{
								id: 'media',
								title: formatMessage(messages.mediaFiles),
								description: formatMessage(messages.mediaFilesDescription),
								priority: 400,
								keywords: ['attachment', 'gif', 'media', 'picture', 'image', 'video', 'file'],
								icon: () => <IconImages />,
								action(insert, state) {
									const pluginState = stateKey.getState(state);
									pluginState?.showMediaPicker();
									const tr = insert('');
									api?.analytics?.actions.attachAnalyticsEvent({
										action: ACTION.OPENED,
										actionSubject: ACTION_SUBJECT.PICKER,
										actionSubjectId: ACTION_SUBJECT_ID.PICKER_CLOUD,
										attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
										eventType: EVENT_TYPE.UI,
									})(tr);

									return tr;
								},
							},
						],

			floatingToolbar: (state, intl, providerFactory) =>
				floatingToolbar(
					state,
					intl,
					{
						providerFactory,
						allowMediaInline: options && getMediaFeatureFlag('mediaInline', options.featureFlags),
						allowResizing: options && options.allowResizing,
						allowResizingInTables: options && options.allowResizingInTables,
						allowCommentsOnMedia: options && options.allowCommentsOnMedia,
						allowLinking: options && options.allowLinking,
						allowAdvancedToolBarOptions: options && options.allowAdvancedToolBarOptions,
						allowAltTextOnImages: options && options.allowAltTextOnImages,
						allowImagePreview: options && options.allowImagePreview,
						altTextValidator: options && options.altTextValidator,
						fullWidthEnabled: options && options.fullWidthEnabled,
						allowMediaInlineImages: options && options.allowMediaInlineImages,
						isViewOnly: api?.editorViewMode?.sharedState.currentState()?.mode === 'view',
					},
					api,
				),
		},
	};
};
