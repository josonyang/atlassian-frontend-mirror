import { keymap } from 'prosemirror-keymap';
import { SafePlugin } from '@atlaskit/editor-common/safe-plugin';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Dispatch } from '../../event-dispatcher';
import type { EditorProps } from '../../types/editor-props';
import type {
  NextEditorPlugin,
  CommandDispatch,
} from '@atlaskit/editor-common/types';
import * as keymaps from '../../keymaps';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  AnalyticsEventPayload,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../../plugins/analytics';
import { stateKey as mediaPluginKey } from '../../plugins/media/pm-plugins/plugin-key';
import { analyticsEventKey } from '../analytics/consts';

export function createPlugin(
  eventDispatch: Dispatch,
  onSave?: (editorView: EditorView) => void,
): SafePlugin | undefined {
  if (!onSave) {
    return;
  }

  return keymap({
    [`${keymaps.submit.common}`]: (
      state: EditorState,
      _dispatch: CommandDispatch,
      editorView: EditorView,
    ) => {
      const mediaState = mediaPluginKey.getState(state);

      if (
        mediaState &&
        mediaState.waitForMediaUpload &&
        !mediaState.allUploadsFinished
      ) {
        return true;
      }

      eventDispatch(analyticsEventKey, analyticsPayload(state));
      onSave(editorView);
      return true;
    },
  }) as SafePlugin;
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

type Config = EditorProps['onSave'];
const submitEditorPlugin: NextEditorPlugin<'submitEditor', never, Config> = (
  onSave?,
) => ({
  name: 'submitEditor',

  pmPlugins() {
    return [
      {
        name: 'submitEditor',
        plugin: ({ dispatch }) => createPlugin(dispatch, onSave),
      },
    ];
  },
});

export default submitEditorPlugin;
