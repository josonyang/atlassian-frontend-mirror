import type {
  DocBuilder,
  PublicPluginAPI,
} from '@atlaskit/editor-common/types';
import type { AnalyticsPlugin } from '@atlaskit/editor-plugin-analytics';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  blockquote,
  doc,
  h1,
  indentation,
  p,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import sendKeyToPm from '@atlaskit/editor-test-helpers/send-key-to-pm';

import * as indentationCommands from '../../commands';
import type { NewAttributes, PrevAttributes } from '../../commands/utils';
import { getNewIndentLevel, getPrevIndentLevel } from '../../commands/utils';

const { getIndentCommand: indent, getOutdentCommand: outdent } =
  indentationCommands;

describe('indentation', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: DocBuilder) =>
    createEditor({
      doc,
      editorProps: {
        allowAnalyticsGASV3: true,
        allowTextAlignment: true,
        allowIndentation: true,
      },
    });

  describe('indent', () => {
    it('indents a top level paragraph and sends analytics', () => {
      const { editorView, editorAPI: api } = editor(doc(p('hello{<>}')));
      const editorAPI = api as PublicPluginAPI<[AnalyticsPlugin]>;
      jest.spyOn(editorAPI?.analytics?.actions, 'attachAnalyticsEvent');
      const { dispatch, state } = editorView;

      indent(editorAPI?.analytics?.actions)()(state, dispatch);

      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 1 })(p('hello'))),
      );
      expect(
        editorAPI?.analytics?.actions.attachAnalyticsEvent,
      ).toHaveBeenCalledWith({
        action: 'formatted',
        actionSubject: 'text',
        actionSubjectId: 'indentation',
        attributes: {
          direction: 'indent',
          indentType: 'paragraph',
          inputMethod: 'keyboard',
          newIndentLevel: 1,
          previousIndentationLevel: 0,
        },
        eventType: 'track',
      });
    });

    it('indents only the current paragraph', () => {
      const { editorView } = editor(doc(p('hello{<>}'), p('world')));
      const { dispatch, state } = editorView;
      indent(undefined)()(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 1 })(p('hello')), p('world')),
      );
    });

    it('indents a top level heading', () => {
      const { editorView } = editor(doc(h1('hello{<>}')));
      const { dispatch, state } = editorView;
      indent(undefined)()(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 1 })(h1('hello'))),
      );
    });

    it('indents multiple blocks', () => {
      const { editorView } = editor(
        doc(p('{<}hello'), blockquote(p('hello')), p('world{>}')),
      );
      const { dispatch, state } = editorView;
      indent(undefined)()(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          indentation({ level: 1 })(p('hello')),
          blockquote(p('hello')),
          indentation({ level: 1 })(p('world')),
        ),
      );
    });

    it('should not indent more than 6 levels', () => {
      const { editorView } = editor(
        doc(indentation({ level: 6 })(p('hello{<>}'))),
      );
      const { dispatch, state } = editorView;
      indent(undefined)()(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 6 })(p('hello'))),
      );
    });
  });

  describe('outdent', () => {
    it('outdents a top level paragraph', () => {
      const { editorView, editorAPI: api } = editor(
        doc(indentation({ level: 3 })(p('hello{<>}'))),
      );
      const editorAPI = api as PublicPluginAPI<[AnalyticsPlugin]>;
      jest.spyOn(editorAPI?.analytics?.actions, 'attachAnalyticsEvent');
      const { dispatch, state } = editorView;
      outdent(editorAPI?.analytics?.actions)()(state, dispatch);

      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 2 })(p('hello'))),
      );
      expect(
        editorAPI?.analytics?.actions.attachAnalyticsEvent,
      ).toHaveBeenCalledWith({
        action: 'formatted',
        actionSubject: 'text',
        actionSubjectId: 'indentation',
        attributes: {
          direction: 'outdent',
          indentType: 'paragraph',
          inputMethod: 'keyboard',
          newIndentLevel: 2,
          previousIndentationLevel: 3,
        },
        eventType: 'track',
      });
    });

    it('outdents only the current paragraph', () => {
      const { editorView } = editor(
        doc(indentation({ level: 3 })(p('hello{<>}')), p('world')),
      );
      const { dispatch, state } = editorView;
      outdent(undefined)()(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 2 })(p('hello')), p('world')),
      );
    });

    it('outdents a top level heading', () => {
      const { editorView } = editor(
        doc(indentation({ level: 3 })(h1('hello{<>}'))),
      );
      const { dispatch, state } = editorView;
      outdent(undefined)()(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 2 })(h1('hello'))),
      );
    });

    it('outdents multiple blocks', () => {
      const { editorView } = editor(
        doc(
          indentation({ level: 2 })(p('{<}hello')),
          blockquote(p('hello')),
          indentation({ level: 3 })(p('world{>}')),
        ),
      );
      const { dispatch, state } = editorView;
      outdent(undefined)()(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          indentation({ level: 1 })(p('hello')),
          blockquote(p('hello')),
          indentation({ level: 2 })(p('world')),
        ),
      );
    });

    it('should remove the marks when is at level 1', () => {
      const { editorView } = editor(
        doc(indentation({ level: 1 })(p('hello{<>}'))),
      );
      const { dispatch, state } = editorView;
      outdent(undefined)()(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p('hello')));
    });
  });

  describe('keymap', () => {
    it('calls indent command on Tab', () => {
      const indentMock = jest.fn();
      jest
        .spyOn(indentationCommands, 'getIndentCommand')
        .mockImplementation(() => () => indentMock);
      const { editorView } = editor(doc(p('{<>}')));

      expect(indentMock).toHaveBeenCalledTimes(0);
      sendKeyToPm(editorView, 'Tab');
      expect(indentMock).toHaveBeenCalledTimes(1);
    });

    it('calls outdent command on Shift + Tab', () => {
      const outdentMock = jest.fn();
      jest
        .spyOn(indentationCommands, 'getOutdentCommand')
        .mockImplementation(() => () => outdentMock);
      const { editorView } = editor(doc(p('{<>}')));

      expect(outdentMock).toHaveBeenCalledTimes(0);
      sendKeyToPm(editorView, 'Shift-Tab');
      expect(outdentMock).toHaveBeenCalledTimes(1);
    });

    it('calls outdent command on Backspace at the start of node', () => {
      const outdentMock = jest.fn();
      jest
        .spyOn(indentationCommands, 'getOutdentCommand')
        .mockImplementation(() => () => outdentMock);
      const { editorView } = editor(doc(p('{<>}hello')));

      expect(outdentMock).toHaveBeenCalledTimes(0);
      sendKeyToPm(editorView, 'Backspace');
      expect(outdentMock).toHaveBeenCalledTimes(1);
    });

    it('should not call outdent command on Backspace if not at the start of node', () => {
      const outdentMock = jest.fn();
      jest
        .spyOn(indentationCommands, 'getOutdentCommand')
        .mockImplementation(() => () => outdentMock);
      const { editorView } = editor(doc(p('h{<>}ello')));

      expect(outdentMock).toHaveBeenCalledTimes(0);
      sendKeyToPm(editorView, 'Backspace');
      expect(outdentMock).toHaveBeenCalledTimes(0);
    });
  });

  describe('getPrevIndentLevel', () => {
    const testCases: [PrevAttributes, number][] = [
      [{ level: 1 }, 1],
      [undefined, 0],
    ];

    test.each(testCases)(
      'getPrevIndentLevel(%p, %p) should equal %p',
      (prevAttr: PrevAttributes, expectedResult: number) => {
        expect(getPrevIndentLevel(prevAttr)).toEqual(expectedResult);
      },
    );
  });

  describe('getNewIndentLevel', () => {
    const testCases: [PrevAttributes, NewAttributes, number][] = [
      [{ level: 1 }, { level: 1 }, 1],
      [{ level: 1 }, undefined, 1],
      [{ level: 1 }, false, 0],
      [undefined, { level: 1 }, 1],
      [undefined, undefined, 0],
      [undefined, false, 0],
    ];

    test.each(testCases)(
      'getNewIndentLevel(%p, %p) should equal %p',
      (
        prevAttr: PrevAttributes,
        newAttr: NewAttributes,
        expectedResult: number,
      ) => {
        expect(getNewIndentLevel(prevAttr, newAttr)).toEqual(expectedResult);
      },
    );
  });
});
