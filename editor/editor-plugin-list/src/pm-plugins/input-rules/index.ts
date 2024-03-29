import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import type { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import type { FeatureFlags } from '@atlaskit/editor-common/types';
import type { Schema } from '@atlaskit/editor-prosemirror/model';
import type { InputRuleWrapper } from '@atlaskit/prosemirror-input-rules';
import { createPlugin } from '@atlaskit/prosemirror-input-rules';

import { createRuleForListType } from './create-list-input-rule';

export default function inputRulePlugin(
  schema: Schema,
  featureFlags: FeatureFlags,
  editorAnalyticsApi: EditorAnalyticsAPI | undefined,
): SafePlugin | undefined {
  const {
    nodes: { bulletList, orderedList },
  } = schema;
  const rules: InputRuleWrapper[] = [];

  if (bulletList) {
    rules.push(
      createRuleForListType({
        // Using UTF instead of • character
        // because of issue where product converted the
        // character into an escaped version.
        expression: /^\s*([\*\-\u2022]) $/,
        listType: bulletList,
        featureFlags,
        editorAnalyticsApi,
      }),
    );
  }

  const expression = featureFlags?.restartNumberedLists
    ? /((^[1-9]{1}[0-9]{0,2})|^(0))[\.\)] $/
    : /^(1)[\.\)] $/;

  if (orderedList) {
    rules.push(
      createRuleForListType({
        expression,
        listType: orderedList,
        featureFlags,
        editorAnalyticsApi,
      }),
    );
  }

  if (rules.length !== 0) {
    return createPlugin('lists', rules);
  }

  return;
}
