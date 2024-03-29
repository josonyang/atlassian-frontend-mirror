import { toggleMark } from '@atlaskit/editor-common/mark';
import type { ExtractPublicEditorAPI } from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { CommandDispatch } from '@atlaskit/editor-core/src/types';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import { Selection } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, p } from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { insertText } from '@atlaskit/editor-test-helpers/transactions';

import { scrollIntoViewPluginKey } from '../../src/plugin';

describe('ScrollIntoView plugin', () => {
  const createEditor = createEditorFactory();
  const editor = (opts = {}) =>
    createEditor({
      doc: doc(p('hello {<>}')),
      pluginKey: scrollIntoViewPluginKey,
      ...opts,
    });

  let editorView: EditorView;
  let state: EditorState;
  let dispatch: CommandDispatch;
  let plugin: any;
  let appendTrSpy: jest.SpyInstance;
  let editorAPI: ExtractPublicEditorAPI<any> | undefined;

  const getAppendedTr = () =>
    appendTrSpy.mock.results[appendTrSpy.mock.results.length - 1].value;

  const dispatchTrWithMeta = (key: string, value: any) => {
    const { tr, selection } = state;
    const { from: pos } = selection;
    tr.insertText('a', pos, pos);
    tr.setMeta(key, value);
    dispatch(tr);
  };

  beforeEach(() => {
    ({ editorView, plugin, editorAPI } = editor({
      editorProps: {
        quickInsert: true,
      },
    }));
    ({ state, dispatch } = editorView);
    appendTrSpy = jest.spyOn(plugin.spec, 'appendTransaction');
  });

  it('scrolls into view when transaction has steps', () => {
    insertText(editorView, 'there');
    expect(getAppendedTr().scrolledIntoView).toEqual(true);
  });

  it('scrolls into view when transaction updates stored marks', () => {
    const { strong } = state.schema.marks;
    editorAPI?.core.actions.execute(toggleMark(strong));
    expect(getAppendedTr().scrolledIntoView).toEqual(true);
  });

  it("doesn't scroll into view when transaction has no steps", () => {
    const { tr } = state;
    tr.setSelection(Selection.near(tr.doc.resolve(1)));
    dispatch(tr);
    expect(getAppendedTr()).toBeUndefined();
  });

  // these transactions are not things to scroll into view for, they are
  // things like hovering table rows/cols, autofixing invalid tables/layouts
  it("doesn't scroll into view when transaction has addToHistory=false", () => {
    dispatchTrWithMeta('addToHistory', false);
    expect(getAppendedTr()).toBeUndefined();
  });

  it("doesn't scroll into view when transaction has changes from another collab user", () => {
    dispatchTrWithMeta('isRemote', true);
    expect(getAppendedTr()).toBeUndefined();
  });

  it("doesn't scroll into view when explicitly opted out of", () => {
    dispatchTrWithMeta('scrollIntoView', false);
    expect(getAppendedTr()).toBeUndefined();
  });

  it("doesn't scroll into view when already going to", () => {
    const { tr, selection } = state;
    const { from: pos } = selection;
    tr.insertText('a', pos, pos).scrollIntoView();
    dispatch(tr);
    expect(getAppendedTr()).toBeUndefined();
  });

  // typeahead triggers add a mark to current text which counts as a change
  // to the document
  // we don't need to scroll into view as that would already have happened from
  // the user typing, and actually confuses the typeahead plugin a bit
  it("doesn't scroll into view when typeahead trigger transaction", () => {
    const { selection } = state;
    insertText(editorView, '/', selection.from);
    const spyAppendedTr = getAppendedTr();
    // The next input rule plugin will use the append transaction flow
    expect(spyAppendedTr).toBeUndefined();
  });
});
