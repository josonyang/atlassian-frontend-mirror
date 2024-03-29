import React from 'react';

import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type { DocBuilder } from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, p } from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { renderWithIntl } from '@atlaskit/editor-test-helpers/rtl';

import ToolbarTask from '../../../ui/ToolbarTask';

describe('tasks and decisions - ToolbarTask', () => {
  const createEditor = createEditorFactory();

  const providerFactory = new ProviderFactory();
  const editor = (doc: DocBuilder) =>
    createEditor({
      doc,
      editorProps: { allowTasksAndDecisions: true },
    });

  afterAll(() => {
    providerFactory.destroy();
  });

  it('should be disabled if isDisabled property is true', async () => {
    const { editorView } = editor(doc(p('text')));
    const { getByRole } = renderWithIntl(
      <ToolbarTask
        editorView={editorView}
        isDisabled={true}
        editorAPI={undefined}
      />,
    );

    expect(getByRole('button')).toBeDisabled();
  });
});
