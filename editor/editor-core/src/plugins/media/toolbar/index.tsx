import React from 'react';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { NodeSelection } from '@atlaskit/editor-prosemirror/state';
import {
  findParentNodeOfType,
  removeSelectedNode,
} from '@atlaskit/editor-prosemirror/utils';
import type { IntlShape } from 'react-intl-next';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { mediaFilmstripItemDOMSelector } from '@atlaskit/media-filmstrip';
import type {
  GetEditorFeatureFlags,
  ExtractInjectionAPI,
} from '@atlaskit/editor-common/types';
import commonMessages from '../../../messages';
import type { Command } from '../../../types';
import type {
  FloatingToolbarConfig,
  FloatingToolbarItem,
} from '../../../plugins/floating-toolbar/types';
import { stateKey } from '../pm-plugins/plugin-key';
import type { HoverDecorationHandler } from '@atlaskit/editor-plugin-decorations';
import { getLinkingToolbar, shouldShowMediaLinkToolbar } from './linking';
import { buildLayoutButtons } from '@atlaskit/editor-common/card';

import type { MediaLinkingState } from '../pm-plugins/linking';
import { getMediaLinkingState } from '../pm-plugins/linking';
import { getPluginState as getMediaAltTextPluginState } from '../pm-plugins/alt-text';
import { altTextButton, getAltTextToolbar } from './alt-text';
import type { MediaFloatingToolbarOptions } from '../types';
import type { MediaPluginState } from '../pm-plugins/types';
import { showLinkingToolbar } from '../commands/linking';
import { LinkToolbarAppearance } from './linking-toolbar-appearance';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
} from '@atlaskit/editor-common/analytics';
import { messages } from '@atlaskit/media-ui';
import { cardMessages } from '@atlaskit/editor-common/messages';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';
import { FilePreviewItem } from './filePreviewItem';
import {
  downloadMedia,
  getSelectedMediaSingle,
  removeMediaGroupNode,
} from './utils';
import {
  changeInlineToMediaCard,
  changeMediaCardToInline,
  removeInlineCard,
  setBorderMark,
  toggleBorderMark,
} from './commands';
import {
  MediaInlineNodeSelector,
  MediaSingleNodeSelector,
} from '../nodeviews/styles';
import ImageBorderItem from '../ui/ImageBorder';
import { currentMediaNodeBorderMark } from '../utils/current-media-node';
import { shouldShowImageBorder } from './imageBorder';
import type mediaPlugin from '../index';

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
          onClick: changeMediaCardToInline,
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
          onClick: changeInlineToMediaCard,
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
  pluginInjectionApi: ExtractInjectionAPI<typeof mediaPlugin> | undefined,
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

  if (shouldShowImageBorder(state)) {
    toolbarButtons.push({
      type: 'custom',
      fallback: [],
      render: (editorView) => {
        if (!editorView) {
          return null;
        }
        const { dispatch, state } = editorView;
        const borderMark = currentMediaNodeBorderMark(state);
        return (
          <ImageBorderItem
            toggleBorder={() => {
              toggleBorderMark(state, dispatch);
            }}
            setBorder={(attrs) => {
              setBorderMark(attrs)(state, dispatch);
            }}
            showSomewhatSemanticTooltips={
              getEditorFeatureFlags?.().useSomewhatSemanticTextColorNames
            }
            borderMark={borderMark}
            intl={intl}
          />
        );
      },
    });
    toolbarButtons.push({ type: 'separator' });
  }

  if (allowAdvancedToolBarOptions) {
    const widthPlugin = pluginInjectionApi?.dependencies.width;
    let isChangingLayoutDisabled = false;

    if (getBooleanFF('platform.editor.media.extended-resize-experience')) {
      const contentWidth = widthPlugin?.sharedState.currentState()?.lineLength;
      const selectedNode = getSelectedMediaSingle(state);
      if (selectedNode && contentWidth) {
        const { width } = selectedNode.node.attrs;

        if (width >= contentWidth) {
          isChangingLayoutDisabled = true;
        }
      }
    }

    const layoutButtons = buildLayoutButtons(
      state,
      intl,
      state.schema.nodes.mediaSingle,
      widthPlugin,
      pluginInjectionApi?.dependencies.analytics?.actions,
      allowResizing,
      allowResizingInTables,
      true,
      true,
      isChangingLayoutDisabled,
    );
    toolbarButtons = [...toolbarButtons, ...layoutButtons];

    if (layoutButtons.length) {
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
                pluginInjectionApi?.dependencies.analytics?.actions.attachAnalyticsEvent(
                  {
                    eventType: EVENT_TYPE.TRACK,
                    action: ACTION.VISITED,
                    actionSubject: ACTION_SUBJECT.MEDIA,
                    actionSubjectId: ACTION_SUBJECT_ID.LINK,
                  },
                )(tr);
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
    toolbarButtons.push(altTextButton(intl, state), { type: 'separator' });
  }
  const { hoverDecoration } =
    pluginInjectionApi?.dependencies.decorations.actions ?? {};
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
  pluginInjectionApi: ExtractInjectionAPI<typeof mediaPlugin> | undefined,
): FloatingToolbarConfig | undefined => {
  const { media, mediaInline, mediaSingle, mediaGroup } = state.schema.nodes;
  const {
    altTextValidator,
    allowLinking,
    allowAltTextOnImages,
    providerFactory,
    allowMediaInline,
    getEditorFeatureFlags,
  } = options;
  const mediaPluginState: MediaPluginState | undefined =
    stateKey.getState(state);
  const mediaLinkingState: MediaLinkingState = getMediaLinkingState(state);
  const { hoverDecoration } =
    pluginInjectionApi?.dependencies.decorations.actions ?? {};

  if (!mediaPluginState || mediaPluginState.isResizing) {
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

  return {
    ...baseToolbar,
    items,
    scrollable: true,
  };
};
