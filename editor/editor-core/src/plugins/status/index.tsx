import React from 'react';

import { findDomRefAtPos } from 'prosemirror-utils';

import { status } from '@atlaskit/adf-schema';

import { NextEditorPlugin } from '@atlaskit/editor-common/types';
import WithPluginState from '../../ui/WithPluginState';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconStatus } from '@atlaskit/editor-common/quick-insert';

import { commitStatusPicker, createStatus, updateStatus } from './actions';
import { keymapPlugin } from './keymap';
import createStatusPlugin from './plugin';
import { pluginKey } from './plugin-key';
import { StatusPluginOptions, StatusState, StatusType } from './types';
import StatusPicker from './ui/statusPicker';

const baseStatusPlugin: NextEditorPlugin<
  'status',
  {
    pluginConfiguration: StatusPluginOptions | undefined;
  }
> = (options?) => ({
  name: 'status',

  nodes() {
    return [{ name: 'status', node: status }];
  },

  pmPlugins() {
    return [
      {
        name: 'status',
        plugin: (pmPluginFactoryParams) =>
          createStatusPlugin(pmPluginFactoryParams, options),
      },
      { name: 'statusKeymap', plugin: keymapPlugin },
    ];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
  }) {
    const domAtPos = editorView.domAtPos.bind(editorView);
    return (
      <WithPluginState
        plugins={{
          statusState: pluginKey,
        }}
        render={({ statusState = {} as StatusState }) => {
          const { showStatusPickerAt } = statusState;
          if (typeof showStatusPickerAt !== 'number') {
            return null;
          }

          const target = findDomRefAtPos(
            showStatusPickerAt,
            domAtPos,
          ) as HTMLElement;

          const statusNode: any =
            editorView.state.doc.nodeAt(showStatusPickerAt);

          if (!statusNode || statusNode.type.name !== 'status') {
            return null;
          }

          const { text, color, localId } = statusNode.attrs;

          return (
            <StatusPicker
              isNew={statusState.isNew}
              target={target}
              defaultText={text}
              defaultColor={color}
              defaultLocalId={localId}
              mountTo={popupsMountPoint}
              boundariesElement={popupsBoundariesElement}
              scrollableElement={popupsScrollableElement}
              onSelect={(status: StatusType) => {
                updateStatus(status)(editorView.state, editorView.dispatch);
              }}
              onTextChanged={(status: StatusType) => {
                updateStatus(status)(editorView.state, editorView.dispatch);
              }}
              closeStatusPicker={() => {
                commitStatusPicker()(editorView);
              }}
              onEnter={() => {
                commitStatusPicker()(editorView);
              }}
            />
          );
        }}
      />
    );
  },
});

const decorateWithPluginOptions = (
  plugin: ReturnType<
    NextEditorPlugin<
      'status',
      {
        pluginConfiguration: StatusPluginOptions;
      }
    >
  >,
  options: StatusPluginOptions,
) => {
  if (options.menuDisabled === true) {
    return plugin;
  }
  plugin.pluginsOptions = {
    quickInsert: ({ formatMessage }) => [
      {
        id: 'status',
        title: formatMessage(messages.status),
        description: formatMessage(messages.statusDescription),
        priority: 700,
        keywords: ['lozenge'],
        icon: () => <IconStatus />,
        action(insert, state) {
          return addAnalytics(state, createStatus()(insert, state), {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.STATUS,
            attributes: {
              inputMethod: INPUT_METHOD.QUICK_INSERT,
            },
            eventType: EVENT_TYPE.TRACK,
          });
        },
      },
    ],
  };
  return plugin;
};

const statusPlugin: NextEditorPlugin<
  'status',
  {
    pluginConfiguration: StatusPluginOptions;
  }
> = (options: StatusPluginOptions, api) =>
  decorateWithPluginOptions(baseStatusPlugin(options, api), options);

export default statusPlugin;
