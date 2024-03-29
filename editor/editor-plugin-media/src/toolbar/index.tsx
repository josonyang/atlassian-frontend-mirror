import React from 'react';

import type { IntlShape } from 'react-intl-next';

import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
} from '@atlaskit/editor-common/analytics';
import {
  alignmentIcons,
  buildLayoutButtons,
  layoutToMessages,
  wrappingIcons,
} from '@atlaskit/editor-common/card';
import {
  calcMinWidth,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
} from '@atlaskit/editor-common/media-single';
import commonMessages, { cardMessages } from '@atlaskit/editor-common/messages';
import type {
  Command,
  DropdownOptions,
  ExtractInjectionAPI,
  FloatingToolbarConfig,
  FloatingToolbarDropdown,
  FloatingToolbarItem,
  GetEditorFeatureFlags,
} from '@atlaskit/editor-common/types';
import type { HoverDecorationHandler } from '@atlaskit/editor-plugin-decorations';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { NodeSelection } from '@atlaskit/editor-prosemirror/state';
import {
  findParentNodeOfType,
  hasParentNode,
  hasParentNodeOfType,
  removeSelectedNode,
} from '@atlaskit/editor-prosemirror/utils';
import {
  akEditorDefaultLayoutWidth,
  akEditorFullWidthLayoutWidth,
} from '@atlaskit/editor-shared-styles';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import { mediaFilmstripItemDOMSelector } from '@atlaskit/media-filmstrip';
import { messages } from '@atlaskit/media-ui';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';

import { showLinkingToolbar } from '../commands/linking';
import type { MediaNextEditorPluginType } from '../next-plugin-type';
import {
  MediaInlineNodeSelector,
  MediaSingleNodeSelector,
} from '../nodeviews/styles';
import { getPluginState as getMediaAltTextPluginState } from '../pm-plugins/alt-text';
import type { MediaLinkingState } from '../pm-plugins/linking';
import { getMediaLinkingState } from '../pm-plugins/linking';
import { stateKey } from '../pm-plugins/plugin-key';
import type { MediaPluginState } from '../pm-plugins/types';
import type { MediaFloatingToolbarOptions } from '../types';
import ImageBorderItem from '../ui/ImageBorder';
import { FullWidthDisplay, PixelEntry } from '../ui/PixelEntry';
import { currentMediaNodeBorderMark } from '../utils/current-media-node';
import { isVideo } from '../utils/media-single';

import { altTextButton, getAltTextToolbar } from './alt-text';
import {
  changeInlineToMediaCard,
  changeMediaCardToInline,
  removeInlineCard,
  setBorderMark,
  toggleBorderMark,
  updateMediaSingleWidth,
} from './commands';
import { FilePreviewItem } from './filePreviewItem';
import { shouldShowImageBorder } from './imageBorder';
import { LayoutGroup } from './layout-group';
import { getLinkingToolbar, shouldShowMediaLinkToolbar } from './linking';
import { LinkToolbarAppearance } from './linking-toolbar-appearance';
import {
  calcNewLayout,
  downloadMedia,
  getMaxToolbarWidth,
  getPixelWidthOfElement,
  getSelectedLayoutIcon,
  getSelectedMediaSingle,
  removeMediaGroupNode,
} from './utils';

const remove: Command = (state, dispatch) => {
  if (dispatch) {
    dispatch(removeSelectedNode(state.tr));
  }
  return true;
};

const handleRemoveMediaGroup: Command = (state, dispatch) => {
  const tr = removeMediaGroupNode(state);
  if (dispatch) {
    dispatch(tr);
  }
  return true;
};

const generateMediaCardFloatingToolbar = (
  state: EditorState,
  intl: IntlShape,
  mediaPluginState: MediaPluginState,
  hoverDecoration: HoverDecorationHandler | undefined,
  editorAnalyticsAPI: EditorAnalyticsAPI | undefined,
) => {
  const { mediaGroup } = state.schema.nodes;
  const items: FloatingToolbarItem<Command>[] = [
    {
      id: 'editor.media.view.switcher',
      type: 'dropdown',
      title: intl.formatMessage(messages.changeView),
      options: [
        {
          id: 'editor.media.view.switcher.inline',
          title: intl.formatMessage(cardMessages.inline),
          selected: false,
          disabled: false,
          onClick: changeMediaCardToInline(editorAnalyticsAPI),
          testId: 'inline-appearance',
        },
        {
          id: 'editor.media.view.switcher.thumbnail',
          title: intl.formatMessage(messages.displayThumbnail),
          selected: true,
          disabled: false,
          onClick: () => {
            return true;
          },
          testId: 'thumbnail-appearance',
        },
      ],
    },
    {
      type: 'separator',
    },
    {
      type: 'custom',
      fallback: [],
      render: () => {
        return (
          <FilePreviewItem
            key="editor.media.card.preview"
            mediaPluginState={mediaPluginState}
            intl={intl}
          />
        );
      },
    },
    { type: 'separator' },
    {
      id: 'editor.media.card.download',
      type: 'button',
      icon: DownloadIcon,
      onClick: () => {
        downloadMedia(mediaPluginState);
        return true;
      },
      title: intl.formatMessage(messages.download),
    },
    { type: 'separator' },
    {
      type: 'copy-button',
      items: [
        {
          state,
          formatMessage: intl.formatMessage,
          nodeType: mediaGroup,
        },
        { type: 'separator' },
      ],
    },
    {
      id: 'editor.media.delete',
      type: 'button',
      appearance: 'danger',
      focusEditoronEnter: true,
      icon: RemoveIcon,
      onMouseEnter: hoverDecoration?.(mediaGroup, true),
      onMouseLeave: hoverDecoration?.(mediaGroup, false),
      onFocus: hoverDecoration?.(mediaGroup, true),
      onBlur: hoverDecoration?.(mediaGroup, false),
      title: intl.formatMessage(commonMessages.remove),
      onClick: handleRemoveMediaGroup,
      testId: 'media-toolbar-remove-button',
    },
  ];

  return items;
};

const generateMediaInlineFloatingToolbar = (
  state: EditorState,
  intl: IntlShape,
  mediaPluginState: MediaPluginState,
  hoverDecoration: HoverDecorationHandler | undefined,
  editorAnalyticsAPI: EditorAnalyticsAPI | undefined,
) => {
  const { mediaInline } = state.schema.nodes;
  const items: FloatingToolbarItem<Command>[] = [
    {
      id: 'editor.media.view.switcher',
      type: 'dropdown',
      title: intl.formatMessage(messages.changeView),
      options: [
        {
          id: 'editor.media.view.switcher.inline',
          title: intl.formatMessage(cardMessages.inline),
          selected: true,
          disabled: false,
          onClick: () => {
            return true;
          },
          testId: 'inline-appearance',
        },
        {
          id: 'editor.media.view.switcher.thumbnail',
          title: intl.formatMessage(messages.displayThumbnail),
          selected: false,
          disabled: false,
          onClick: changeInlineToMediaCard(editorAnalyticsAPI),
          testId: 'thumbnail-appearance',
        },
      ],
    },
    {
      type: 'separator',
    },
    {
      type: 'custom',
      fallback: [],
      render: () => {
        return (
          <FilePreviewItem
            key="editor.media.card.preview"
            mediaPluginState={mediaPluginState}
            intl={intl}
          />
        );
      },
    },
    { type: 'separator' },
    {
      id: 'editor.media.card.download',
      type: 'button',
      icon: DownloadIcon,
      onClick: () => {
        downloadMedia(mediaPluginState);
        return true;
      },
      title: intl.formatMessage(messages.download),
    },
    { type: 'separator' },
    {
      type: 'copy-button',
      items: [
        {
          state,
          formatMessage: intl.formatMessage,
          nodeType: mediaInline,
        },
        { type: 'separator' },
      ],
    },
    {
      id: 'editor.media.delete',
      type: 'button',
      appearance: 'danger',
      focusEditoronEnter: true,
      icon: RemoveIcon,
      onMouseEnter: hoverDecoration?.(mediaInline, true),
      onMouseLeave: hoverDecoration?.(mediaInline, false),
      onFocus: hoverDecoration?.(mediaInline, true),
      onBlur: hoverDecoration?.(mediaInline, false),
      title: intl.formatMessage(commonMessages.remove),
      onClick: removeInlineCard,
      testId: 'media-toolbar-remove-button',
    },
  ];

  return items;
};

const generateMediaSingleFloatingToolbar = (
  state: EditorState,
  intl: IntlShape,
  options: MediaFloatingToolbarOptions,
  pluginState: MediaPluginState,
  mediaLinkingState: MediaLinkingState,
  pluginInjectionApi:
    | ExtractInjectionAPI<MediaNextEditorPluginType>
    | undefined,
  getEditorFeatureFlags?: GetEditorFeatureFlags,
) => {
  const { mediaSingle } = state.schema.nodes;
  const {
    allowResizing,
    allowLinking,
    allowAdvancedToolBarOptions,
    allowResizingInTables,
    allowAltTextOnImages,
  } = options;

  let toolbarButtons: FloatingToolbarItem<Command>[] = [];
  const { hoverDecoration } = pluginInjectionApi?.decorations.actions ?? {};

  if (shouldShowImageBorder(state)) {
    toolbarButtons.push({
      type: 'custom',
      fallback: [],
      render: editorView => {
        if (!editorView) {
          return null;
        }
        const { dispatch, state } = editorView;
        const borderMark = currentMediaNodeBorderMark(state);
        return (
          <ImageBorderItem
            toggleBorder={() => {
              toggleBorderMark(pluginInjectionApi?.analytics?.actions)(
                state,
                dispatch,
              );
            }}
            setBorder={attrs => {
              setBorderMark(pluginInjectionApi?.analytics?.actions)(attrs)(
                state,
                dispatch,
              );
            }}
            borderMark={borderMark}
            intl={intl}
          />
        );
      },
    });
    toolbarButtons.push({ type: 'separator' });
  }

  if (allowAdvancedToolBarOptions) {
    const widthPlugin = pluginInjectionApi?.width;
    let isChangingLayoutDisabled = false;
    const selectedNode = getSelectedMediaSingle(state);

    if (getBooleanFF('platform.editor.media.extended-resize-experience')) {
      const contentWidth = widthPlugin?.sharedState.currentState()?.lineLength;
      const selectedNodeMaxWidth = pluginState.currentMaxWidth || contentWidth;

      if (
        selectedNode &&
        selectedNodeMaxWidth &&
        selectedNode.node.attrs.width >= selectedNodeMaxWidth
      ) {
        isChangingLayoutDisabled = true;
      }
    }

    const layoutButtons = buildLayoutButtons(
      state,
      intl,
      state.schema.nodes.mediaSingle,
      widthPlugin,
      pluginInjectionApi?.analytics?.actions,
      allowResizing,
      allowResizingInTables,
      true,
      true,
      isChangingLayoutDisabled,
    );
    if (getBooleanFF('platform.editor.media.grouped-layout') && selectedNode) {
      const selectedLayoutIcon = getSelectedLayoutIcon(
        [...alignmentIcons, ...wrappingIcons],
        selectedNode.node,
      );

      if (selectedLayoutIcon && layoutButtons.length) {
        const options: DropdownOptions<Command> = {
          render: props => {
            return <LayoutGroup layoutButtons={layoutButtons} {...props} />;
          },
          width: 156,
          height: 32,
        };
        const trigger: FloatingToolbarDropdown<Command> = {
          id: 'media-single-layout',
          testId: 'media-single-layout-dropdown-trigger',
          type: 'dropdown',
          options: options,
          title: intl.formatMessage(layoutToMessages[selectedLayoutIcon.value]),
          icon: selectedLayoutIcon.icon,
        };

        toolbarButtons = [...toolbarButtons, trigger, { type: 'separator' }];
      }
    } else {
      toolbarButtons = [...toolbarButtons, ...layoutButtons];

      if (layoutButtons.length) {
        toolbarButtons.push({ type: 'separator' });
      }
    }

    // Pixel Entry Toolbar Support
    const { selection } = state;
    const isWithinTable = hasParentNodeOfType([state.schema.nodes.table])(
      selection,
    );
    if (
      getBooleanFF('platform.editor.media.extended-resize-experience') &&
      allowResizing &&
      (!isWithinTable || allowResizingInTables === true)
    ) {
      const selectedMediaSingleNode = getSelectedMediaSingle(state);

      const sizeInput = {
        type: 'custom',
        fallback: [],
        render: editorView => {
          if (!editorView || !selectedMediaSingleNode) {
            return null;
          }
          const { state, dispatch } = editorView;

          const contentWidth =
            widthPlugin?.sharedState.currentState()?.lineLength ||
            akEditorDefaultLayoutWidth;

          const selectedMediaNode =
            selectedMediaSingleNode.node.content.firstChild;
          if (!selectedMediaNode) {
            return null;
          }

          const {
            width: mediaSingleWidth,
            widthType,
            layout,
          } = selectedMediaSingleNode.node.attrs;
          const { width: mediaWidth, height: mediaHeight } =
            selectedMediaNode.attrs;

          const maxWidthForNestedNode =
            pluginInjectionApi?.media.sharedState.currentState()
              ?.currentMaxWidth;

          const maxWidth =
            maxWidthForNestedNode || akEditorFullWidthLayoutWidth;

          const isVideoFile = isVideo(selectedMediaNode.attrs.__fileMimeType);

          const minWidth = calcMinWidth(
            isVideoFile,
            maxWidthForNestedNode || contentWidth,
          );

          const hasPixelType = widthType === 'pixel';

          const pixelWidthFromElement = getPixelWidthOfElement(
            editorView,
            selectedMediaSingleNode.pos + 1, // get pos of media node
            mediaWidth || DEFAULT_IMAGE_WIDTH,
          );

          const pixelWidth = hasPixelType
            ? mediaSingleWidth
            : pixelWidthFromElement;

          //hasParentNode will return falsey value if selection depth === 0
          const isNested = hasParentNode(
            n => n.type !== state.schema.nodes.doc,
          )(state.selection);

          return (
            <PixelEntry
              intl={intl}
              width={
                pluginState.isResizing ? pluginState.resizingWidth : pixelWidth
              }
              showMigration={!pluginState.isResizing && !hasPixelType}
              mediaWidth={mediaWidth || DEFAULT_IMAGE_WIDTH}
              mediaHeight={mediaHeight || DEFAULT_IMAGE_HEIGHT}
              minWidth={minWidth}
              maxWidth={maxWidth}
              onChange={(valid: boolean) => {
                if (valid) {
                  hoverDecoration?.(mediaSingle, true, 'warning')(
                    editorView.state,
                    dispatch,
                    editorView,
                  );
                } else {
                  hoverDecoration?.(mediaSingle, false)(
                    editorView.state,
                    dispatch,
                    editorView,
                  );
                }
              }}
              onSubmit={({ width, validation }) => {
                const newLayout = calcNewLayout(
                  width,
                  layout,
                  contentWidth,
                  options.fullWidthEnabled,
                  isNested,
                );

                updateMediaSingleWidth(pluginInjectionApi?.analytics?.actions)(
                  width,
                  validation,
                  newLayout,
                )(state, dispatch);
              }}
              onMigrate={() => {
                const tr = state.tr.setNodeMarkup(
                  selectedMediaSingleNode.pos,
                  undefined,
                  {
                    ...selectedMediaSingleNode.node.attrs,
                    width: pixelWidthFromElement,
                    widthType: 'pixel',
                  },
                );
                tr.setMeta('scrollIntoView', false);
                tr.setSelection(
                  NodeSelection.create(tr.doc, selectedMediaSingleNode.pos),
                );
                dispatch(tr);
              }}
            />
          );
        },
      } as FloatingToolbarItem<Command>;

      if (pluginState.isResizing) {
        // If the image is resizing
        // then return pixel entry component or full width label as the only toolbar item
        if (!selectedMediaSingleNode) {
          return [];
        }

        const { layout } = selectedMediaSingleNode.node.attrs;
        if (layout === 'full-width') {
          const fullWidthLabel = {
            type: 'custom',
            fallback: [],
            render: () => {
              return <FullWidthDisplay intl={intl} />;
            },
          } as FloatingToolbarItem<Command>;
          return [fullWidthLabel];
        }
        return [sizeInput];
      }

      toolbarButtons.push(sizeInput);
      toolbarButtons.push({ type: 'separator' });
    }

    if (allowLinking && shouldShowMediaLinkToolbar(state)) {
      toolbarButtons.push({
        type: 'custom',
        fallback: [],
        render: (editorView, idx) => {
          if (editorView?.state) {
            const editLink = () => {
              if (editorView) {
                const { state, dispatch } = editorView;
                showLinkingToolbar(state, dispatch);
              }
            };

            const openLink = () => {
              if (editorView) {
                const {
                  state: { tr },
                  dispatch,
                } = editorView;
                pluginInjectionApi?.analytics?.actions.attachAnalyticsEvent({
                  eventType: EVENT_TYPE.TRACK,
                  action: ACTION.VISITED,
                  actionSubject: ACTION_SUBJECT.MEDIA,
                  actionSubjectId: ACTION_SUBJECT_ID.LINK,
                })(tr);
                dispatch(tr);
                return true;
              }
            };

            return (
              <LinkToolbarAppearance
                key={idx}
                editorState={editorView.state}
                intl={intl}
                mediaLinkingState={mediaLinkingState}
                onAddLink={editLink}
                onEditLink={editLink}
                onOpenLink={openLink}
              />
            );
          }
          return null;
        },
      });
    }
  }

  if (allowAltTextOnImages) {
    toolbarButtons.push(
      altTextButton(intl, state, pluginInjectionApi?.analytics?.actions),
      { type: 'separator' },
    );
  }

  const removeButton: FloatingToolbarItem<Command> = {
    id: 'editor.media.delete',
    type: 'button',
    appearance: 'danger',
    focusEditoronEnter: true,
    icon: RemoveIcon,
    onMouseEnter: hoverDecoration?.(mediaSingle, true),
    onMouseLeave: hoverDecoration?.(mediaSingle, false),
    onFocus: hoverDecoration?.(mediaSingle, true),
    onBlur: hoverDecoration?.(mediaSingle, false),
    title: intl.formatMessage(commonMessages.remove),
    onClick: remove,
    testId: 'media-toolbar-remove-button',
  };
  const items: Array<FloatingToolbarItem<Command>> = [
    ...toolbarButtons,
    {
      type: 'copy-button',
      items: [
        {
          state,
          formatMessage: intl.formatMessage,
          nodeType: mediaSingle,
        },
        { type: 'separator' },
      ],
    },
    removeButton,
  ];

  return items;
};

export const floatingToolbar = (
  state: EditorState,
  intl: IntlShape,
  options: MediaFloatingToolbarOptions = {},
  pluginInjectionApi:
    | ExtractInjectionAPI<MediaNextEditorPluginType>
    | undefined,
): FloatingToolbarConfig | undefined => {
  const { media, mediaInline, mediaSingle, mediaGroup } = state.schema.nodes;
  const {
    altTextValidator,
    allowLinking,
    allowAltTextOnImages,
    providerFactory,
    allowMediaInline,
    allowResizing,
    getEditorFeatureFlags,
  } = options;
  const mediaPluginState: MediaPluginState | undefined =
    stateKey.getState(state);

  const mediaLinkingState: MediaLinkingState = getMediaLinkingState(state);
  const { hoverDecoration } = pluginInjectionApi?.decorations.actions ?? {};

  if (!mediaPluginState) {
    return;
  }
  const nodeType = allowMediaInline
    ? [mediaInline, mediaSingle, media]
    : [mediaSingle];
  const baseToolbar = {
    title: 'Media floating controls',
    nodeType,
    getDomRef: () => mediaPluginState.element,
  };

  if (
    allowLinking &&
    mediaLinkingState &&
    mediaLinkingState.visible &&
    shouldShowMediaLinkToolbar(state)
  ) {
    const linkingToolbar = getLinkingToolbar(
      baseToolbar,
      mediaLinkingState,
      state,
      intl,
      pluginInjectionApi,
      providerFactory,
    );
    if (linkingToolbar) {
      return linkingToolbar;
    }
  }

  if (allowAltTextOnImages) {
    const mediaAltTextPluginState = getMediaAltTextPluginState(state);
    if (mediaAltTextPluginState.isAltTextEditorOpen) {
      return getAltTextToolbar(baseToolbar, {
        altTextValidator,
        forceFocusSelector:
          pluginInjectionApi?.floatingToolbar.actions?.forceFocusSelector,
      });
    }
  }

  let items: FloatingToolbarItem<Command>[] = [];
  const parentMediaGroupNode = findParentNodeOfType(mediaGroup)(
    state.selection,
  );
  let selectedNodeType;
  if (state.selection instanceof NodeSelection) {
    selectedNodeType = state.selection.node.type;
  }
  if (allowMediaInline && parentMediaGroupNode?.node.type === mediaGroup) {
    const mediaOffset = state.selection.$from.parentOffset + 1;
    baseToolbar.getDomRef = () => {
      const selector = mediaFilmstripItemDOMSelector(mediaOffset);
      return mediaPluginState.element?.querySelector(selector) as HTMLElement;
    };
    items = generateMediaCardFloatingToolbar(
      state,
      intl,
      mediaPluginState,
      hoverDecoration,
      pluginInjectionApi?.analytics?.actions,
    );
  } else if (
    allowMediaInline &&
    selectedNodeType &&
    selectedNodeType === mediaInline
  ) {
    baseToolbar.getDomRef = () => {
      const element = mediaPluginState.element?.querySelector(
        `.${MediaInlineNodeSelector}`,
      ) as HTMLElement;
      return element || mediaPluginState.element;
    };
    items = generateMediaInlineFloatingToolbar(
      state,
      intl,
      mediaPluginState,
      hoverDecoration,
      pluginInjectionApi?.analytics?.actions,
    );
  } else {
    baseToolbar.getDomRef = () => {
      const element = mediaPluginState.element?.querySelector(
        `.${MediaSingleNodeSelector}`,
      ) as HTMLElement;
      return element || mediaPluginState.element;
    };
    items = generateMediaSingleFloatingToolbar(
      state,
      intl,
      options,
      mediaPluginState,
      mediaLinkingState,
      pluginInjectionApi,
      getEditorFeatureFlags,
    );
  }

  const toolbarConfig = {
    ...baseToolbar,
    items,
    scrollable: true,
  };

  if (
    getBooleanFF('platform.editor.media.extended-resize-experience') &&
    allowResizing
  ) {
    return {
      ...toolbarConfig,
      width: mediaPluginState.isResizing ? undefined : getMaxToolbarWidth(),
    };
  }

  return toolbarConfig;
};
