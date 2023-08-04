import React from 'react';
import type { IntlShape } from 'react-intl-next';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';

import { blockquote, hardBreak, heading } from '@atlaskit/adf-schema';

import type {
  QuickInsertActionInsert,
  QuickInsertItem,
  QuickInsertItemId,
} from '@atlaskit/editor-common/provider-factory';
import type {
  NextEditorPlugin,
  OptionalPlugin,
  HeadingLevels,
} from '@atlaskit/editor-common/types';
import { ToolbarSize } from '@atlaskit/editor-common/types';
import { WithPluginState } from '@atlaskit/editor-common/with-plugin-state';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  INPUT_METHOD,
} from '@atlaskit/editor-common/analytics';
import { IconHeading, IconQuote } from '@atlaskit/editor-common/quick-insert';
import * as keymaps from '@atlaskit/editor-common/keymaps';

import type { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';

import { createPlugin, pluginKey } from './pm-plugins/main';
import keymapPlugin from './pm-plugins/keymap';
import inputRulePlugin from './pm-plugins/input-rule';
import ToolbarBlockType from './ui/ToolbarBlockType';
import { setBlockTypeWithAnalytics } from './commands';
import type { BlockTypeNode, BlockTypePluginOptions } from './types';
import { messages } from './messages';

const headingPluginOptions = (
  { formatMessage }: IntlShape,
  isAllowed: boolean,
  editorAnalyticsApi: EditorAnalyticsAPI | undefined,
): Array<QuickInsertItem> => {
  if (!isAllowed) {
    return [];
  }

  return Array.from({ length: 6 }, (_v, idx) => {
    const level = (idx + 1) as HeadingLevels;
    const descriptionDescriptor = (messages as any)[
      `heading${level}Description`
    ];
    const keyshortcut = keymaps.tooltip(
      (keymaps as any)[`toggleHeading${level}`],
    );

    const id = `heading${level}` as QuickInsertItemId;

    return {
      id,
      title: formatMessage((messages as any)[id]),
      description: formatMessage(descriptionDescriptor),
      priority: 1300,
      keywords: [`h${level}`],
      keyshortcut,
      icon: () => <IconHeading level={level} />,
      action(insert: QuickInsertActionInsert, state: EditorState) {
        const tr = insert(state.schema.nodes.heading.createChecked({ level }));
        editorAnalyticsApi?.attachAnalyticsEvent({
          action: ACTION.FORMATTED,
          actionSubject: ACTION_SUBJECT.TEXT,
          eventType: EVENT_TYPE.TRACK,
          actionSubjectId: ACTION_SUBJECT_ID.FORMAT_HEADING,
          attributes: {
            inputMethod: INPUT_METHOD.QUICK_INSERT,
            newHeadingLevel: level,
          },
        })(tr);

        return tr;
      },
    };
  });
};

const blockquotePluginOptions = (
  { formatMessage }: IntlShape,
  isAllowed: boolean,
  editorAnalyticsApi: EditorAnalyticsAPI | undefined,
): Array<QuickInsertItem> => {
  if (!isAllowed) {
    return [];
  }

  return [
    {
      id: 'blockquote',
      title: formatMessage(messages.blockquote),
      description: formatMessage(messages.blockquoteDescription),
      priority: 1300,
      keyshortcut: keymaps.tooltip(keymaps.toggleBlockQuote),
      icon: () => <IconQuote />,
      action(insert, state) {
        const tr = insert(
          state.schema.nodes.blockquote.createChecked(
            {},
            state.schema.nodes.paragraph.createChecked(),
          ),
        );
        editorAnalyticsApi?.attachAnalyticsEvent({
          action: ACTION.FORMATTED,
          actionSubject: ACTION_SUBJECT.TEXT,
          eventType: EVENT_TYPE.TRACK,
          actionSubjectId: ACTION_SUBJECT_ID.FORMAT_BLOCK_QUOTE,
          attributes: {
            inputMethod: INPUT_METHOD.QUICK_INSERT,
          },
        })(tr);

        return tr;
      },
    },
  ];
};

const blockTypePlugin: NextEditorPlugin<
  'blockType',
  {
    pluginConfiguration: BlockTypePluginOptions | undefined;
    dependencies: [OptionalPlugin<typeof analyticsPlugin>];
  }
> = (options?, api?) => ({
  name: 'blockType',

  nodes() {
    const nodes: BlockTypeNode[] = [
      { name: 'heading', node: heading },
      { name: 'blockquote', node: blockquote },
      { name: 'hardBreak', node: hardBreak },
    ];

    if (options && options.allowBlockType) {
      const exclude = options.allowBlockType.exclude
        ? options.allowBlockType.exclude
        : [];
      return nodes.filter((node) => exclude.indexOf(node.name) === -1);
    }

    return nodes;
  },

  pmPlugins() {
    return [
      {
        name: 'blockType',
        plugin: ({ dispatch }) =>
          createPlugin(
            api?.dependencies.analytics?.actions,
            dispatch,
            options && options.lastNodeMustBeParagraph,
          ),
      },
      {
        name: 'blockTypeInputRule',
        plugin: ({ schema, featureFlags }) =>
          inputRulePlugin(
            api?.dependencies.analytics?.actions,
            schema,
            featureFlags,
          ),
      },
      // Needs to be lower priority than editor-tables.tableEditing
      // plugin as it is currently swallowing right/down arrow events inside tables
      {
        name: 'blockTypeKeyMap',
        plugin: ({ schema, featureFlags }) =>
          keymapPlugin(
            api?.dependencies.analytics?.actions,
            schema,
            featureFlags,
          ),
      },
    ];
  },

  primaryToolbarComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing,
    eventDispatcher,
  }) {
    const isSmall =
      options && options.isUndoRedoButtonsEnabled
        ? toolbarSize < ToolbarSize.XXL
        : toolbarSize < ToolbarSize.XL;
    const boundSetBlockType = (name: string) =>
      setBlockTypeWithAnalytics(
        name,
        INPUT_METHOD.TOOLBAR,
        api?.dependencies.analytics?.actions,
      )(editorView.state, editorView.dispatch);

    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{
          pluginState: pluginKey,
        }}
        render={({ pluginState }) => {
          return (
            <ToolbarBlockType
              isSmall={isSmall}
              isDisabled={disabled}
              isReducedSpacing={isToolbarReducedSpacing}
              setBlockType={boundSetBlockType}
              pluginState={pluginState!}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
            />
          );
        }}
      />
    );
  },

  pluginsOptions: {
    quickInsert: (intl) => {
      const exclude =
        options && options.allowBlockType && options.allowBlockType.exclude
          ? options.allowBlockType.exclude
          : [];

      return [
        ...blockquotePluginOptions(
          intl,
          exclude.indexOf('blockquote') === -1,
          api?.dependencies.analytics?.actions,
        ),
        ...headingPluginOptions(
          intl,
          exclude.indexOf('heading') === -1,
          api?.dependencies.analytics?.actions,
        ),
      ];
    },
  },
});

export default blockTypePlugin;
export { pluginKey } from './pm-plugins/main';
export type { BlockTypeState } from './pm-plugins/main';
