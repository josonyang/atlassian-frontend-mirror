import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
import { doc, p, DocBuilder } from '@atlaskit/editor-test-helpers/doc-builder';
import sendKeyToPm from '@atlaskit/editor-test-helpers/send-key-to-pm';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { act } from '@testing-library/react';

describe('help-dialog', () => {
  const createEditor = createEditorFactory();
  let createAnalyticsEvent: CreateUIAnalyticsEvent;

  const editor = (doc: DocBuilder) => {
    createAnalyticsEvent = jest.fn().mockReturnValue({ fire() {} });
    return createEditor({
      doc,
      editorProps: { allowAnalyticsGASV3: true, allowHelpDialog: true },
      createAnalyticsEvent,
    });
  };

  it('Mod-/ should trigger help clicked analytics event', () => {
    const { editorView } = editor(doc(p('1{<>}')));
    act(() => {
      sendKeyToPm(editorView, 'Mod-/');
    });

    expect(createAnalyticsEvent).toHaveBeenCalledWith({
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: 'helpButton',
      attributes: expect.objectContaining({ inputMethod: 'shortcut' }),
      eventType: 'ui',
    });
  });
  it('TypeAhead should trigger help clicked analytics event', async () => {
    const { typeAheadTool } = editor(doc(p('1{<>}')));
    await act(async () => {
      await typeAheadTool.searchQuickInsert('Help')?.insert({ index: 0 });
    });

    expect(createAnalyticsEvent).toHaveBeenCalledWith({
      action: 'helpOpened',
      actionSubject: 'help',
      actionSubjectId: 'helpQuickInsert',
      attributes: {
        inputMethod: 'quickInsert',
        nodeLocation: 'doc',
        selectionPosition: 'end',
        selectionType: 'cursor',
      },
      eventType: 'ui',
    });
  });
});
