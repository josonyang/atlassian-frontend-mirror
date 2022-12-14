import { Node as PMNode, NodeType } from 'prosemirror-model';

import { FeatureFlags } from '../../../../types/feature-flags';
import {
  ruleWithAnalytics,
  createWrappingJoinRule,
} from '../../../../utils/input-rules';

import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  INPUT_METHOD,
  AnalyticsEventPayload,
} from '../../../analytics';

type Props = {
  listType: NodeType;
  expression: RegExp;
  featureFlags?: FeatureFlags;
};
export function createRuleForListType({
  listType,
  expression,
  featureFlags,
}: Props) {
  const isBulletList = listType.name === 'bulletList';
  const actionSubjectId = isBulletList
    ? ACTION_SUBJECT_ID.FORMAT_LIST_BULLET
    : ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER;

  const analyticsPayload: AnalyticsEventPayload = {
    action: ACTION.INSERTED,
    actionSubject: ACTION_SUBJECT.LIST,
    actionSubjectId,
    eventType: EVENT_TYPE.TRACK,
    attributes: {
      inputMethod: INPUT_METHOD.FORMATTING,
    },
  };

  const shouldJoinNextNodeWhen = (_: string[], node: PMNode) =>
    node.type === listType;

  let getAttrs = {};
  if (featureFlags?.restartNumberedLists) {
    getAttrs = (matchResult: RegExpExecArray): Record<string, any> => {
      return {
        order: Number(matchResult[1]),
      };
    };
  }

  const inputRule = createWrappingJoinRule({
    match: expression,
    nodeType: listType,
    getAttrs,
    joinPredicate: shouldJoinNextNodeWhen,
  });

  return ruleWithAnalytics(analyticsPayload)(inputRule);
}
