import type { DocBuilder } from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, p as paragraph } from '@atlaskit/editor-test-helpers/doc-builder';

import { pluginKey } from '../../plugin-key';

describe('width plugin', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: DocBuilder) => {
    return createEditor({
      doc,
    });
  };

  it('should not updating plugin state for a non related plugin transaction', () => {
    const { editorView: view, eventDispatcher } = editor(
      doc(paragraph('{<>}')),
    );
    const spy = jest.spyOn(eventDispatcher, 'emit');

    view.dispatch(view.state.tr.setMeta('someotherplugin', { pos: 20 }));

    const pluginState = pluginKey.getState(view.state);
    expect(pluginState).toEqual({ width: 0 });

    // Ensure width plugin never updates.
    // @ts-ignore
    expect(spy).not.toHaveBeenCalledWith(pluginKey.key, expect.anything());
  });

  it('should update width', () => {
    const { editorView: view, eventDispatcher } = editor(
      doc(paragraph('{<>}')),
    );
    const spy = jest.spyOn(eventDispatcher, 'emit');

    view.dispatch(view.state.tr.setMeta(pluginKey, { width: 50 }));

    const pluginState = pluginKey.getState(view.state);
    expect(pluginState).toEqual({ width: 50 });

    // @ts-ignore
    expect(spy).toHaveBeenCalledWith(pluginKey.key, {
      width: 50,
    });
  });

  it('should update lineLength', () => {
    const { editorView: view, eventDispatcher } = editor(
      doc(paragraph('{<>}')),
    );
    const spy = jest.spyOn(eventDispatcher, 'emit');

    view.dispatch(view.state.tr.setMeta(pluginKey, { lineLength: 50 }));

    const pluginState = pluginKey.getState(view.state);
    expect(pluginState).toEqual({
      width: 0,
      lineLength: 50,
    });

    // @ts-ignore
    expect(spy).toHaveBeenCalledWith(pluginKey.key, {
      width: 0,
      lineLength: 50,
    });
  });

  it('shouldnt emit with no new values', () => {
    const { editorView: view, eventDispatcher } = editor(
      doc(paragraph('{<>}')),
    );
    const spy = jest.spyOn(eventDispatcher, 'emit');

    view.dispatch(view.state.tr.setMeta(pluginKey, { width: 0 }));

    const pluginState = pluginKey.getState(view.state);
    expect(pluginState).toEqual({ width: 0 });

    // @ts-ignore
    expect(spy).not.toHaveBeenCalledWith(pluginKey.key, expect.anything());
  });
});
