import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
import type { DocBuilder } from '@atlaskit/editor-test-helpers/doc-builder';
import {
  doc,
  p,
  panel,
  blockquote,
  taskList,
  taskItem,
  decisionList,
  decisionItem,
} from '@atlaskit/editor-test-helpers/doc-builder';

import { areBlockTypesDisabled } from '../../utils';

describe('#areBlockTypesDisabled', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: DocBuilder) =>
    createEditor({
      doc,
      editorProps: {
        allowPanel: true,
        allowTasksAndDecisions: true,
      },
    });

  it('should return true is selection has a blockquote', () => {
    const { editorView } = editor(
      doc(blockquote(p('te{<}xt')), panel()(p('te{>}xt'))),
    );
    const result = areBlockTypesDisabled(editorView.state);
    expect(result).toBe(true);
  });

  it('should return false is selection has no blockquote', () => {
    const { editorView } = editor(doc(p('te{<}xt'), panel()(p('te{>}xt'))));
    const result = areBlockTypesDisabled(editorView.state);
    expect(result).toBe(false);
  });

  it('should return true if selection has action item', () => {
    const { editorView } = editor(
      doc(
        taskList({ localId: 'local-uuid' })(
          taskItem({ localId: 'local-uuid', state: 'TODO' })('Action {<>}'),
        ),
      ),
    );
    const result = areBlockTypesDisabled(editorView.state);
    expect(result).toBe(true);
  });

  it('should return true if selection has decision', () => {
    const { editorView } = editor(
      doc(
        decisionList({ localId: 'local-uuid' })(
          decisionItem({ localId: 'local-uuid', state: 'TODO' })(
            'Decision {<>}',
          ),
        ),
      ),
    );
    const result = areBlockTypesDisabled(editorView.state);
    expect(result).toBe(true);
  });
});