import React from 'react';
import uuid from 'uuid';
import { AnalyticsEventPayload } from '@atlaskit/analytics-next';
import { ELEMENTS_CHANNEL } from '@atlaskit/mention/resource';
import { mention } from '@atlaskit/adf-schema';

import {
  NextEditorPlugin,
  OptionalPlugin,
} from '@atlaskit/editor-common/types';
import WithPluginState from '../../ui/WithPluginState';
import { isTypeAheadAllowed } from '../type-ahead/utils';
import ToolbarMention from './ui/ToolbarMention';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  INPUT_METHOD,
} from '@atlaskit/editor-common/analytics';
import { IconMention } from '@atlaskit/editor-common/quick-insert';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { MentionPluginOptions, FireElementsChannelEvent } from './types';
import { openTypeAheadAtCursor } from '../type-ahead/transforms/open-typeahead-at-cursor';
import { createTypeAheadConfig } from './type-ahead';
import { mentionPluginKey } from './pm-plugins/key';
import { createMentionPlugin } from './pm-plugins/main';
import type { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';

export { mentionPluginKey };

const mentionsPlugin: NextEditorPlugin<
  'mention',
  {
    pluginConfiguration: MentionPluginOptions | undefined;
    dependencies: [OptionalPlugin<typeof analyticsPlugin>];
  }
> = (options?, api?) => {
  let sessionId = uuid();
  const fireEvent: FireElementsChannelEvent = <T extends AnalyticsEventPayload>(
    payload: T,
  ): void => {
    const { createAnalyticsEvent } =
      api?.dependencies.analytics?.sharedState.currentState() ?? {};
    if (!createAnalyticsEvent) {
      return;
    }

    if (payload.attributes && !payload.attributes.sessionId) {
      payload.attributes.sessionId = sessionId;
    }

    createAnalyticsEvent(payload).fire(ELEMENTS_CHANNEL);
  };
  const typeAhead = createTypeAheadConfig({
    sanitizePrivateContent: options?.sanitizePrivateContent,
    mentionInsertDisplayName: options?.insertDisplayName,
    HighlightComponent: options?.HighlightComponent,
    fireEvent,
  });

  return {
    name: 'mention',

    nodes() {
      return [{ name: 'mention', node: mention }];
    },

    pmPlugins() {
      return [
        {
          name: 'mention',
          plugin: (pmPluginFactoryParams) =>
            createMentionPlugin(pmPluginFactoryParams, fireEvent, options),
        },
      ];
    },

    secondaryToolbarComponent({ editorView, disabled }) {
      return (
        <WithPluginState
          editorView={editorView}
          plugins={{
            mentionState: mentionPluginKey,
          }}
          render={({ mentionState = {} }) =>
            !mentionState.mentionProvider ? null : (
              <ToolbarMention
                editorView={editorView}
                isDisabled={disabled || isTypeAheadAllowed(editorView.state)}
              />
            )
          }
        />
      );
    },

    pluginsOptions: {
      quickInsert: ({ formatMessage }) => [
        {
          id: 'mention',
          title: formatMessage(messages.mention),
          description: formatMessage(messages.mentionDescription),
          keywords: ['team', 'user'],
          priority: 400,
          keyshortcut: '@',
          icon: () => <IconMention />,
          action(insert, state) {
            const tr = insert(undefined);
            openTypeAheadAtCursor({
              triggerHandler: typeAhead,
              inputMethod: INPUT_METHOD.QUICK_INSERT,
            })(tr);

            api?.dependencies.analytics?.actions.attachAnalyticsEvent({
              action: ACTION.INVOKED,
              actionSubject: ACTION_SUBJECT.TYPEAHEAD,
              actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_MENTION,
              attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
              eventType: EVENT_TYPE.UI,
            })(tr);

            return tr;
          },
        },
      ],
      typeAhead,
    },
  };
};

export default mentionsPlugin;
