import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { GapCursorSelection } from '@atlaskit/editor-common/selection';
import type { InputRuleWrapper } from '@atlaskit/editor-common/types';
import { closeHistory } from '@atlaskit/editor-prosemirror/history';
import { Mark as PMMark } from '@atlaskit/editor-prosemirror/model';
import { EditorState, TextSelection } from '@atlaskit/editor-prosemirror/state';

import { createInputRulePlugin } from './plugin';
import type { OnInputEvent } from './types';

export { createRule } from '@atlaskit/editor-common/utils';

const hasUnsupportedMarks = (
  state: EditorState,
  start: number,
  end: number,
  marksNameUnsupported: string[],
) => {
  const isUnsupportedMark = (node: PMMark) =>
    (marksNameUnsupported || []).includes(node.type.name);

  const $from = state.doc.resolve(start);
  const $to = state.doc.resolve(end);
  const marksInSelection =
    start === end ? $from.marks() : $from.marksAcross($to);

  return (marksInSelection || []).some(isUnsupportedMark);
};

const isCursorInsideUnsupportedMarks = (
  state: EditorState,
  marksNameUnsupported: string[],
): boolean => {
  const { selection } = state;
  if (!(selection instanceof TextSelection)) {
    return false;
  }
  const { $cursor } = selection;
  const isUnsupportedMark = (node: PMMark) =>
    marksNameUnsupported.includes(node.type.name);

  return Boolean($cursor?.nodeBefore?.marks?.some(isUnsupportedMark));
};

type Options = {
  isBlockNodeRule?: boolean;
  allowInsertTextOnDocument?: boolean;
};
export const createPlugin = (
  pluginName: string,
  rules: Array<InputRuleWrapper>,
  options: Options = {},
): SafePlugin => {
  const { isBlockNodeRule = false, allowInsertTextOnDocument = true } = options;

  const onInputEvent: OnInputEvent = ({ state, from, to }) => {
    const unsupportedMarks = isBlockNodeRule
      ? ['code', 'link', 'typeAheadQuery']
      : ['code'];

    const $from = state.selection.$from;

    if (
      $from.parent.type.spec.code ||
      (!(state.selection instanceof TextSelection) &&
        !(state.selection instanceof GapCursorSelection)) ||
      hasUnsupportedMarks(state, from, to, unsupportedMarks) ||
      (isBlockNodeRule &&
        isCursorInsideUnsupportedMarks(state, unsupportedMarks))
    ) {
      return false;
    }

    return true;
  };

  return createInputRulePlugin(pluginName, rules, {
    allowInsertTextOnDocument,
    onInputEvent,
    onBeforeRegexMatch: (tr) => {
      closeHistory(tr);
    },
  });
};
