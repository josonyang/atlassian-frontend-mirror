// eslint-disable-next-line import/no-extraneous-dependencies
import type { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  INPUT_METHOD,
} from '@atlaskit/editor-common/analytics';
import { editorCommandToPMCommand } from '@atlaskit/editor-common/preset';
import type { DocBuilder } from '@atlaskit/editor-common/types';
import { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import { featureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  createProsemirrorEditorFactory,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { LightEditorPlugin } from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, li, ol, p, ul } from '@atlaskit/editor-test-helpers/doc-builder';

import { toggleBulletList, toggleOrderedList } from '../../../commands';
import { listPlugin } from '../../../index';

describe('list-conversion', () => {
  const createEditor = createProsemirrorEditorFactory();
  let createAnalyticsEvent: CreateUIAnalyticsEvent;
  const editorAnalyticsAPIFake: EditorAnalyticsAPI = {
    attachAnalyticsEvent: jest.fn().mockReturnValue(() => jest.fn()),
  };

  const editor = (doc: DocBuilder) => {
    const preset = new Preset<LightEditorPlugin>()
      .add([featureFlagsPlugin, {}])
      .add([analyticsPlugin, { createAnalyticsEvent }])
      .add(listPlugin);

    return createEditor({
      doc,
      preset,
    });
  };
  describe.each([
    [
      'sibling',
      // prettier-ignore
      doc(
        ul(
          li(p('A{<>}')),
          li(p('B')),
        ),
      ),
      {
        itemIndexAtSelectionStart: 0,
        itemIndexAtSelectionEnd: 0,
        indentLevelAtSelectionStart: 0,
        indentLevelAtSelectionEnd: 0,
        itemsInSelection: 1,
      },
    ],
    [
      'nestedSibling',
      // prettier-ignore
      doc(
        ul(
          li(p('A'),
          ul(
            li(p('{<>}A1'))),
          ),
          li(p('B'),
          ul(
            li(p('B1'))),
          ),
        ),
      ),
      {
        itemIndexAtSelectionStart: 0,
        itemIndexAtSelectionEnd: 0,
        indentLevelAtSelectionStart: 1,
        indentLevelAtSelectionEnd: 1,
        itemsInSelection: 1,
      },
    ],
    [
      'withChildren',
      // prettier-ignore
      doc(
        ul(
          li(p('A{<>}'),
          ul(
            li(p('A1')),
            li(p('A2'))),
          ),
          li(p('B'),
          ul(
            li(p('B1'))),
          ),
        ),
      ),
      {
        itemIndexAtSelectionStart: 0,
        itemIndexAtSelectionEnd: 0,
        indentLevelAtSelectionStart: 0,
        indentLevelAtSelectionEnd: 0,
        itemsInSelection: 1,
      },
    ],
    [
      'rangedSiblingStart',
      // prettier-ignore
      doc(
        ul(
          li(p('{<}A')),
          li(p('B{>}')),
          li(p('C')),
        ),
      ),
      {
        itemIndexAtSelectionStart: 0,
        itemIndexAtSelectionEnd: 1,
        indentLevelAtSelectionStart: 0,
        indentLevelAtSelectionEnd: 0,
        itemsInSelection: 2,
      },
    ],
    [
      'rangedSiblingMid',
      // prettier-ignore
      doc(
        ul(
          li(p('A')),
          li(p('{<}B')),
          li(p('C{>}')),
        ),
      ),
      {
        itemIndexAtSelectionStart: 1,
        itemIndexAtSelectionEnd: 2,
        indentLevelAtSelectionStart: 0,
        indentLevelAtSelectionEnd: 0,
        itemsInSelection: 2,
      },
    ],

    [
      'rangedNestedDescending',
      // prettier-ignore
      doc(
        ul(
          li(p('{<}A'),
          ul(
            li(p('A1'),
            ul(
              li(p('1.1{>}')))),
            ),
          ),
        ),
      ),
      {
        itemIndexAtSelectionStart: 0,
        itemIndexAtSelectionEnd: 0,
        indentLevelAtSelectionStart: 0,
        indentLevelAtSelectionEnd: 2,
        itemsInSelection: 3,
      },
    ],

    [
      'rangedNestedAscending',
      // prettier-ignore
      doc(
        ul(
          li(p('A'),
          ul(
            li(p('A1'),
            ul(
              li(p('{<}A1.1'))),
            ),
            li(p('A2'))),
          ),
          li(p('B{>}')),
        ),
      ),
      {
        itemIndexAtSelectionStart: 0,
        itemIndexAtSelectionEnd: 1,
        indentLevelAtSelectionStart: 2,
        indentLevelAtSelectionEnd: 0,
        itemsInSelection: 3,
      },
    ],
  ])('list-conversion', (scenario, documentNode, expectedAttributes) => {
    it(`analytics ul to ol ${scenario}`, () => {
      const { editorView } = editor(documentNode);
      editorCommandToPMCommand(
        toggleOrderedList(editorAnalyticsAPIFake)(INPUT_METHOD.KEYBOARD),
      )(editorView.state, editorView.dispatch);

      expect(editorAnalyticsAPIFake.attachAnalyticsEvent).toHaveBeenCalledWith({
        action: ACTION.CONVERTED,
        actionSubject: ACTION_SUBJECT.LIST,
        actionSubjectId: ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER,
        eventType: EVENT_TYPE.TRACK,
        attributes: expect.objectContaining({
          transformedFrom: ACTION_SUBJECT_ID.FORMAT_LIST_BULLET,
          inputMethod: INPUT_METHOD.KEYBOARD,
          ...expectedAttributes,
        }),
      });
    });
  });

  it(`list-conversion analytics ol to ul`, () => {
    const { editorView } = editor(
      // prettier-ignore
      doc(
        ol()(
          li(p('A'),
          ol()(
            li(p('{<>}A1'))),
          ),
          li(p('B'),
          ol()(
            li(p('B1'))),
          ),
        ),
      ),
    );
    editorCommandToPMCommand(
      toggleBulletList(editorAnalyticsAPIFake)(INPUT_METHOD.KEYBOARD),
    )(editorView.state, editorView.dispatch);

    expect(editorAnalyticsAPIFake.attachAnalyticsEvent).toHaveBeenCalledWith({
      action: ACTION.CONVERTED,
      actionSubject: ACTION_SUBJECT.LIST,
      actionSubjectId: ACTION_SUBJECT_ID.FORMAT_LIST_BULLET,
      eventType: EVENT_TYPE.TRACK,
      attributes: expect.objectContaining({
        transformedFrom: ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER,
        inputMethod: INPUT_METHOD.KEYBOARD,
        itemIndexAtSelectionStart: 0,
        itemIndexAtSelectionEnd: 0,
        indentLevelAtSelectionStart: 1,
        indentLevelAtSelectionEnd: 1,
        itemsInSelection: 1,
      }),
    });
  });

  it(`list-conversion analytics for untoggling list`, () => {
    const { editorView } = editor(
      // prettier-ignore
      doc(
        ul(
          li(p('A{<>}')),
        ),
      ),
    );
    editorCommandToPMCommand(
      toggleBulletList(editorAnalyticsAPIFake)(INPUT_METHOD.KEYBOARD),
    )(editorView.state, editorView.dispatch);

    expect(editorAnalyticsAPIFake.attachAnalyticsEvent).toHaveBeenCalledWith({
      action: ACTION.CONVERTED,
      actionSubject: ACTION_SUBJECT.LIST,
      actionSubjectId: ACTION_SUBJECT_ID.TEXT,
      eventType: EVENT_TYPE.TRACK,
      attributes: expect.objectContaining({
        transformedFrom: ACTION_SUBJECT_ID.FORMAT_LIST_BULLET,
        inputMethod: INPUT_METHOD.KEYBOARD,
        itemIndexAtSelectionStart: 0,
        itemIndexAtSelectionEnd: 0,
        indentLevelAtSelectionStart: 0,
        indentLevelAtSelectionEnd: 0,
        itemsInSelection: 1,
      }),
    });
  });
});
