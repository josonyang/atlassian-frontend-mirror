import type { Transaction } from '@atlaskit/editor-prosemirror/state';
import { pluginKey as undoPluginKey } from './pm-plugins/plugin-key';
import type { HigherOrderCommand } from '../../types/command';
import type { InputSource } from './enums';

type AttachInputMeta = (inputSource: InputSource) => HigherOrderCommand;
export const attachInputMeta: AttachInputMeta =
  (inputSource) => (command) => (state, dispatch) => {
    let customTr: Transaction = state.tr;
    const fakeDispatch = (tr: Transaction) => {
      customTr = tr;
    };
    command(state, fakeDispatch);

    if (!customTr || !customTr.docChanged) {
      return false;
    }

    customTr.setMeta(undoPluginKey, inputSource);
    if (dispatch) {
      dispatch(customTr);
    }

    return true;
  };
