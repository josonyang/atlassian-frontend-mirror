import { keymap } from 'prosemirror-keymap';
import { ResolvedPos } from 'prosemirror-model';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Dispatch } from '../../event-dispatcher';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  AnalyticsEventPayload,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../../plugins/analytics';
import {
  CommandDispatch,
  NextEditorPlugin,
} from '@atlaskit/editor-common/types';
import { analyticsEventKey } from '../analytics/consts';

export function createPlugin(
  eventDispatch: Dispatch,
  onSave?: (editorView: EditorView) => void,
): SafePlugin | undefined {
  if (!onSave) {
    return;
  }

  return keymap({
    Enter(
      state: EditorState,
      _dispatch: CommandDispatch,
      editorView: EditorView,
    ) {
      if (canSaveOnEnter(editorView)) {
        eventDispatch(analyticsEventKey, analyticsPayload(state));
        onSave(editorView);
        return true;
      }
      return false;
    },
  }) as SafePlugin;
}

function canSaveOnEnter(editorView: EditorView) {
  const { $cursor } = editorView.state.selection as TextSelection;
  const { decisionItem, paragraph, taskItem } = editorView.state.schema.nodes;
  return (
    !$cursor ||
    ($cursor.parent.type === paragraph && $cursor.depth === 1) ||
    ($cursor.parent.type === decisionItem && !isEmptyAtCursor($cursor)) ||
    ($cursor.parent.type === taskItem && !isEmptyAtCursor($cursor))
  );
}

function isEmptyAtCursor($cursor: ResolvedPos<any>) {
  const { content } = $cursor.parent;
  return !(content && content.size);
}

const analyticsPayload = (
  state: EditorState,
): { payload: AnalyticsEventPayload } => ({
  payload: {
    action: ACTION.STOPPED,
    actionSubject: ACTION_SUBJECT.EDITOR,
    actionSubjectId: ACTION_SUBJECT_ID.SAVE,
    attributes: {
      inputMethod: INPUT_METHOD.SHORTCUT,
      documentSize: state.doc.nodeSize,
      // TODO add individual node counts - tables, headings, lists, mediaSingles, mediaGroups, mediaCards, panels, extensions, decisions, action, codeBlocks
    },
    eventType: EVENT_TYPE.UI,
  },
});

type Config = (editorView: EditorView) => void;
const saveOnEnterPlugin: NextEditorPlugin<
  'saveOnEnter',
  never,
  Config | undefined
> = (onSave?) => ({
  name: 'saveOnEnter',

  pmPlugins() {
    return [
      {
        name: 'saveOnEnter',
        plugin: ({ dispatch }) => createPlugin(dispatch, onSave),
      },
    ];
  },
});

export default saveOnEnterPlugin;
