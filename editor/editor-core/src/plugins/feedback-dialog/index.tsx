import React from 'react';
import type { FeedbackInfo } from '../../types';
import type { NextEditorPlugin } from '@atlaskit/editor-common/types';
import { IconFeedback } from '@atlaskit/editor-common/quick-insert';
import { version as coreVersion } from '../../version-wrapper';

import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
} from '../analytics';
import loadJiraCollectorDialogScript from './loadJiraCollectorDialogScript';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';

let showJiraCollectorDialog: () => void;
let feedbackInfoHash: string;
let defaultFeedbackInfo: FeedbackInfo;

const hashFeedbackInfo = (feedbackInfo: FeedbackInfo): string => {
  const { product, packageName, packageVersion, labels } = feedbackInfo;
  return [product, packageName, packageVersion, ...(labels || [])].join('|');
};

export const openFeedbackDialog = async (feedbackInfo?: FeedbackInfo) =>
  new Promise(async (resolve, reject) => {
    const combinedFeedbackInfo = {
      // default value assignment
      ...{
        product: 'n/a',
        labels: [],
        packageName: '',
        packageVersion: '',
        sessionId: '',
        contentId: '',
        tabId: '',
      },
      ...defaultFeedbackInfo,
      ...feedbackInfo,
    };
    const newFeedbackInfoHash = hashFeedbackInfo(combinedFeedbackInfo);

    if (!showJiraCollectorDialog || feedbackInfoHash !== newFeedbackInfoHash) {
      try {
        showJiraCollectorDialog = await loadJiraCollectorDialogScript(
          [combinedFeedbackInfo.product, ...combinedFeedbackInfo.labels],
          combinedFeedbackInfo.packageName,
          coreVersion,
          combinedFeedbackInfo.packageVersion,
          combinedFeedbackInfo.sessionId,
          combinedFeedbackInfo.contentId,
          combinedFeedbackInfo.tabId,
        );

        feedbackInfoHash = newFeedbackInfoHash;
      } catch (err) {
        reject(err);
      }
    }

    const timeoutId = window.setTimeout(showJiraCollectorDialog, 0);
    // Return the timoutId for consumers to call clearTimeout if they need to.
    resolve(timeoutId);
  });

const feedbackDialog: NextEditorPlugin<
  'feedbackDialog',
  {
    pluginConfiguration: FeedbackInfo;
  }
> = (feedbackInfo: FeedbackInfo) => {
  defaultFeedbackInfo = feedbackInfo;
  return {
    name: 'feedbackDialog',

    pluginsOptions: {
      quickInsert: ({ formatMessage }) => [
        {
          id: 'feedbackdialog',
          title: formatMessage(messages.feedbackDialog),
          description: formatMessage(messages.feedbackDialogDescription),
          priority: 400,
          keywords: ['bug'],
          icon: () => <IconFeedback />,
          action(insert, state) {
            const tr = insert('');
            openFeedbackDialog(feedbackInfo);

            return addAnalytics(state, tr, {
              action: ACTION.OPENED,
              actionSubject: ACTION_SUBJECT.FEEDBACK_DIALOG,
              attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
              eventType: EVENT_TYPE.UI,
            });
          },
        },
      ],
    },
  };
};

export default feedbackDialog;
