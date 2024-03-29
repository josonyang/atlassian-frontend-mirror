import {
  ACTION,
  ACTION_SUBJECT,
  EVENT_TYPE,
} from '@atlaskit/editor-common/analytics';
import { getStepRange } from '@atlaskit/editor-common/utils';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorState } from '@atlaskit/editor-test-helpers/create-editor-state';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, p } from '@atlaskit/editor-test-helpers/doc-builder';

import { attachPayloadIntoTransaction } from '../../attach-payload-into-transaction';

describe('attachPayloadIntoTransaction', () => {
  it('should attach payload into position that is in range of document (accounts for previous steps in the transaction)', () => {
    const editorState = createEditorState(doc(p('Some text{<>}')));

    const tr = editorState.tr.deleteRange(0, editorState.selection.$from.pos);

    const stepRangeBefore = getStepRange(tr);

    attachPayloadIntoTransaction({
      payload: {
        eventType: EVENT_TYPE.OPERATIONAL,
        action: ACTION.DISPATCHED_VALID_TRANSACTION,
        actionSubject: ACTION_SUBJECT.EDITOR,
      },
      selection: editorState.selection,
      tr,
      channel: 'editor',
    });

    expect(getStepRange(tr)).toStrictEqual(stepRangeBefore);
  });
});
