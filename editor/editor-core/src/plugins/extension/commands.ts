import { removeSelectedNode, removeParentNodeOfType } from 'prosemirror-utils';
import { ExtensionLayout } from '@atlaskit/adf-schema';
import { Node as PMNode } from 'prosemirror-model';

import { applyChange } from '../context-panel/transforms';
import { createCommand } from './plugin-factory';
import { ExtensionAction, ExtensionState } from './types';
import { getSelectedExtension } from './utils';
import { removeConnectedNodes } from '@atlaskit/editor-common/utils';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import {
  Parameters,
  TransformBefore,
  TransformAfter,
} from '@atlaskit/editor-common/src/extensions';

export function updateState(state: Partial<ExtensionState>) {
  return createCommand({
    type: 'UPDATE_STATE',
    data: state,
  });
}

export function setEditingContextToContextPanel<
  T extends Parameters = Parameters,
>(
  processParametersBefore: TransformBefore<T>,
  processParametersAfter: TransformAfter<T>,
) {
  return createCommand<ExtensionAction<T>>(
    {
      type: 'UPDATE_STATE',
      data: {
        showContextPanel: true,
        processParametersBefore,
        processParametersAfter,
      },
    },
    applyChange,
  );
}

export const clearEditingContext = createCommand(
  {
    type: 'UPDATE_STATE',
    data: {
      showContextPanel: false,
      processParametersBefore: undefined,
      processParametersAfter: undefined,
    },
  },
  applyChange,
);

export const forceAutoSave = (
  resolve: () => void,
  reject?: (reason?: any) => void,
) =>
  createCommand(
    {
      type: 'UPDATE_STATE',
      data: { autoSaveResolve: resolve, autoSaveReject: reject },
    },
    applyChange,
  );

export const showContextPanel = createCommand(
  {
    type: 'UPDATE_STATE',
    data: { showContextPanel: true },
  },
  applyChange,
);

export const updateExtensionLayout = (layout: ExtensionLayout) =>
  createCommand({ type: 'UPDATE_STATE', data: { layout } }, (tr, state) => {
    const selectedExtension = getSelectedExtension(state, true);

    if (selectedExtension) {
      const trWithNewNodeMarkup = tr.setNodeMarkup(
        selectedExtension.pos,
        undefined,
        {
          ...selectedExtension.node.attrs,
          layout,
        },
      );
      trWithNewNodeMarkup.setMeta('scrollIntoView', false);
      return trWithNewNodeMarkup;
    }

    return tr;
  });

export const removeExtension = () =>
  createCommand(
    {
      type: 'UPDATE_STATE',
      data: { element: undefined },
    },
    (tr, state) => {
      if (getSelectedExtension(state)) {
        return removeSelectedNode(tr);
      } else {
        return removeParentNodeOfType(state.schema.nodes.bodiedExtension)(tr);
      }
    },
  );

export const removeDescendantNodes = (sourceNode?: PMNode) =>
  createCommand(
    {
      type: 'UPDATE_STATE',
      data: { element: undefined },
    },
    (tr, state) => {
      return sourceNode ? removeConnectedNodes(state, sourceNode) : tr;
    },
  );
