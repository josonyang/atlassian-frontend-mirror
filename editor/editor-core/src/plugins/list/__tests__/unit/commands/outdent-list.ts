import {
  doc,
  ul,
  ol,
  li,
  p,
  table,
  tr,
  td,
  thEmpty,
  tdEmpty,
  DocBuilder,
} from '@atlaskit/editor-test-helpers/doc-builder';
import sendKeyToPm from '@atlaskit/editor-test-helpers/send-key-to-pm';
import {
  UIAnalyticsEvent,
  CreateUIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import {
  createProsemirrorEditorFactory,
  LightEditorPlugin,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import { outdentList } from '../../../commands/outdent-list';
import deprecatedAnalyticsPlugin, { INPUT_METHOD } from '../../../../analytics';
import { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import listPlugin from '../../..';
import { tablesPlugin } from '@atlaskit/editor-plugin-table';
import { setTextSelection } from '../../../../../utils';
import type { FeatureFlags } from '@atlaskit/editor-common/types';
import featureFlagsPlugin from '@atlaskit/editor-plugin-feature-flags';
import { contentInsertionPlugin } from '@atlaskit/editor-plugin-content-insertion';

describe('lists plugin -> commands -> outdentList', () => {
  const createProseMirrorEditor = createProsemirrorEditorFactory();
  let createAnalyticsEvent: CreateUIAnalyticsEvent;

  beforeEach(() => {
    createAnalyticsEvent = jest.fn(() => ({ fire() {} } as UIAnalyticsEvent));
  });

  const editor = (doc: DocBuilder, featureFlags: FeatureFlags = {}) => {
    const preset = new Preset<LightEditorPlugin>()
      .add([featureFlagsPlugin, featureFlags])
      .add([analyticsPlugin, { createAnalyticsEvent }])
      .add(contentInsertionPlugin)
      .add([listPlugin, featureFlags])
      .add(tablesPlugin)
      .add([deprecatedAnalyticsPlugin, { createAnalyticsEvent }]);

    return createProseMirrorEditor({
      doc,
      preset,
    });
  };

  describe('#outdentList', () => {
    describe('when outdent from a nested list item', () => {
      it('should keep the list item at the right level', () => {
        // prettier-ignore
        const document = doc(
          ol()(
            li(p('A')),
            li(
              p('B'),
              ol()(
                li(p('{<>}B1')),
              ),
            ),
            li(p('C')),
          )
        );
        // prettier-ignore
        const expected =doc(
          ol()(
            li(p('A')),
            li(p('B')),
            li(p('B1')),
            li(p('C')),
          ),
        );
        const { editorView } = editor(document);

        outdentList(INPUT_METHOD.KEYBOARD, {})(
          editorView.state,
          editorView.dispatch,
        );
        expect(editorView.state.doc).toEqualDocument(expected);
      });
    });

    describe('when outdent from a nested mixed list', () => {
      it('should keep the list type from the target list', () => {
        // prettier-ignore
        const document = doc(
          ol()(
            li(p('A')),
            li(
              p('B'),
              ul(
                li(p('{<>}B1')),
              ),
            ),
            li(p('C')),
          )
        );
        // prettier-ignore
        const expected = doc(
          ol()(
            li(p('A')),
            li(p('B')),
            li(p('B1')),
            li(p('C')),
          ),
        );
        const { editorView } = editor(document);

        outdentList(INPUT_METHOD.KEYBOARD, {})(
          editorView.state,
          editorView.dispatch,
        );
        expect(editorView.state.doc).toEqualDocument(expected);
      });
    });

    describe('when outdent the first list item with a mixed nested list', () => {
      it('should join the list items into a single list', () => {
        // prettier-ignore
        const document = doc(
          ol()(
            li(
              p('A{<>}'),
              ul(
                li(p('B')),
              ),
            ),
            li(p('C')),
          )
        );
        // prettier-ignore
        const expected = doc(
          p('A'),
          ol()(
            li(p('B')),
            li(p('C')),
          ),
        );
        const { editorView } = editor(document);

        outdentList(INPUT_METHOD.KEYBOARD, {})(
          editorView.state,
          editorView.dispatch,
        );
        expect(editorView.state.doc).toEqualDocument(expected);
      });
    });

    describe('when outdent the first list item with nested list', () => {
      it('should join the list items into a single list', () => {
        // prettier-ignore
        const document = doc(
          ol()(
            li(
              p('A{<>}'),
              ol()(
                li(p('B')),
              ),
            ),
            li(p('C')),
          )
        );
        // prettier-ignore
        const expected = doc(
          p('A'),
          ol()(
            li(p('B')),
            li(p('C')),
          ),
        );
        const { editorView } = editor(document);

        outdentList(INPUT_METHOD.KEYBOARD, {})(
          editorView.state,
          editorView.dispatch,
        );
        expect(editorView.state.doc).toEqualDocument(expected);
      });
    });

    describe('when outdent the first list item with deep nested list', () => {
      it('should join the list items into a single list', () => {
        // prettier-ignore
        const document = doc(
          ol()(
            li(
              p('A{<>}'),
              ol()(
                li(
                  p('B'),
                  ol()(
                    li(p('B1')),
                  ),
                ),
              ),
            ),
            li(p('C')),
          )
        );
        // prettier-ignore
        const expected = doc(
          p('A'),
          ol()(
            li(
              p('B'),
              ol()(
                li(p('B1')),
              ),
            ),
            li(p('C')),
          ),
        );
        const { editorView } = editor(document);

        outdentList(INPUT_METHOD.KEYBOARD, {})(
          editorView.state,
          editorView.dispatch,
        );
        expect(editorView.state.doc).toEqualDocument(expected);
      });
    });

    describe('when outdent the first list item with deep mixed nested list', () => {
      it('should join the list items into a single list', () => {
        // prettier-ignore
        const document = doc(
          ol()(
            li(
              p('A{<>}'),
              ul(
                li(
                  p('B'),
                  ul(
                    li(p('B1')),
                  ),
                ),
              ),
            ),
            li(p('C')),
          )
        );
        // prettier-ignore
        const expected = doc(
          p('A'),
          ol()(
            li(
              p('B'),
              ul(
                li(p('B1')),
              ),
            ),
            li(p('C')),
          ),
        );
        const { editorView } = editor(document);

        outdentList(INPUT_METHOD.KEYBOARD, {})(
          editorView.state,
          editorView.dispatch,
        );

        expect(editorView.state.doc).toEqualDocument(expected);
      });
    });

    describe('outdent list inside table', () => {
      it('should outdent list if only list is in selection and should return true', () => {
        // prettier-ignore
        const TABLE_LOCAL_ID = 'test-table-local-id';
        const document = doc(
          table({ localId: TABLE_LOCAL_ID })(
            tr(thEmpty, thEmpty, thEmpty),
            tr(
              td()(p('Hello')),
              td()(
                ol()(
                  li(p('{selStart}Item 1')),
                  li(p('Item 2')),
                  li(p('Item 3{selEnd}')),
                ),
              ),
              tdEmpty,
            ),
            tr(tdEmpty, tdEmpty, tdEmpty),
          ),
        );
        // prettier-ignore
        const expected = doc(
          table({ localId: TABLE_LOCAL_ID })(
            tr(thEmpty, thEmpty, thEmpty),
            tr(
              td()(p('Hello')),
              td()(
                p('Item 1'),
                p('Item 2'),
                p('Item 3'),
              ),
              tdEmpty,
            ),
            tr(tdEmpty, tdEmpty, tdEmpty),
          ),
        );
        const { editorView, refs } = editor(document);
        const { selStart, selEnd } = refs;
        setTextSelection(editorView, selStart, selEnd);

        const result = outdentList(INPUT_METHOD.KEYBOARD, {})(
          editorView.state,
          editorView.dispatch,
        );

        expect(editorView.state.doc).toEqualDocument(expected);
        expect(result).toEqual(true);
      });

      it('should not outdent list if elements other than list is in selection, return false and send Shift-Tab to table', () => {
        const TABLE_LOCAL_ID = 'test-table-local-id';
        // prettier-ignore
        const document = doc(
          table({ localId: TABLE_LOCAL_ID })(
            tr(thEmpty, thEmpty, thEmpty),
            tr(
              td()(p('{helloPosBefore}Hello{helloPosAfter}')),
              td()(
                ol()(li(p('{item1Pos}Item 1')), li(p('Item 2'))),
                p('list after text{textPos}'),
              ),
              tdEmpty,
            ),
            tr(tdEmpty, tdEmpty, tdEmpty),
          ),
        );

        const { editorView, refs } = editor(document);
        const { helloPosAfter, helloPosBefore, item1Pos, textPos } = refs;
        setTextSelection(editorView, item1Pos, textPos);

        expect(editorView.state.selection.$anchor.pos).toEqual(item1Pos);
        expect(editorView.state.selection.$head.pos).toEqual(textPos);

        sendKeyToPm(editorView, 'Shift-Tab');

        expect(editorView.state.selection.$anchor.pos).toEqual(helloPosBefore);
        expect(editorView.state.selection.$head.pos).toEqual(helloPosAfter);
      });
    });

    describe('analytics', () => {
      describe('when restartNumberedLists not enabled', () => {
        it('should fire analytics with correct payload when outdenting first item in a list', () => {
          // prettier-ignore
          const document = doc(
            ol()(
              li(p('A{<>}')),
              li(p('B')),
              li(p('c')),
            )
          );
          const { editorView } = editor(document);
          outdentList(INPUT_METHOD.KEYBOARD, {})(
            editorView.state,
            editorView.dispatch,
          );
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'outdented',
            actionSubject: 'list',
            actionSubjectId: 'numberedList',
            eventType: 'track',
            attributes: expect.objectContaining({
              inputMethod: 'keyboard',
            }),
          });
        });
        it('should fire analytics with correct payload when outdenting splits the list', () => {
          // prettier-ignore
          const document = doc(
            ol()(
              li(p('A')),
              li(p('B{<>}')),
              li(p('c')),
            )
          );
          const { editorView } = editor(document);
          outdentList(INPUT_METHOD.KEYBOARD, {})(
            editorView.state,
            editorView.dispatch,
          );
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'outdented',
            actionSubject: 'list',
            actionSubjectId: 'numberedList',
            eventType: 'track',
            attributes: expect.objectContaining({
              inputMethod: 'keyboard',
            }),
          });
        });
      });
      describe('when restartNumberedLists is enabled', () => {
        const featureFlags = { restartNumberedLists: true };
        it('should fire analytics with correct payload when outdenting first item in a list', () => {
          // prettier-ignore
          const document = doc(
            ol()(
              li(p('A{<>}')),
              li(p('B')),
              li(p('c')),
            )
          );
          const { editorView } = editor(document, featureFlags);
          outdentList(INPUT_METHOD.KEYBOARD, featureFlags)(
            editorView.state,
            editorView.dispatch,
          );
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'outdented',
            actionSubject: 'list',
            actionSubjectId: 'numberedList',
            eventType: 'track',
            attributes: expect.objectContaining({
              inputMethod: 'keyboard',
            }),
          });
          expect(createAnalyticsEvent).toHaveBeenCalledWith(
            expect.objectContaining({
              attributes: expect.not.objectContaining({
                outdentScenario: expect.anything(),
              }),
            }),
          );
        });
        it('should fire analytics with correct payload when outdenting one top-level item which splits the list', () => {
          // prettier-ignore
          const document = doc(
            ol({ order: 6 })(
              li(p('A')),
              li(p('B{<>}')),
              li(p('c')),
            )
          );
          const { editorView } = editor(document, featureFlags);
          outdentList(INPUT_METHOD.KEYBOARD, featureFlags)(
            editorView.state,
            editorView.dispatch,
          );
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'outdented',
            actionSubject: 'list',
            actionSubjectId: 'numberedList',
            eventType: 'track',
            attributes: expect.objectContaining({
              inputMethod: 'keyboard',
              outdentScenario: 'splitList',
              splitListStartNumber: 7,
            }),
          });
        });
        it('should fire analytics with correct payload when outdenting two top-level items which splits the list', () => {
          // prettier-ignore
          const document = doc(
            ol({ order: 6 })(
              li(p('A')),
              li(p('{<}B')),
              li(p('C{>}')),
              li(p('D')),
            )
          );
          const { editorView } = editor(document, featureFlags);
          outdentList(INPUT_METHOD.KEYBOARD, featureFlags)(
            editorView.state,
            editorView.dispatch,
          );
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'outdented',
            actionSubject: 'list',
            actionSubjectId: 'numberedList',
            eventType: 'track',
            attributes: expect.objectContaining({
              inputMethod: 'keyboard',
              outdentScenario: 'splitList',
              splitListStartNumber: 8,
            }),
          });
        });
        it('should fire analytics with correct payload when outdenting one top-level and one nested item which splits the list', () => {
          // prettier-ignore
          const document = doc(
            ol({ order: 6 })(
              li(p('A')),
              li(
                p('{<}B'),
                ol()(
                  li(
                    p('C{>}'),
                    ol()(
                      li(p('D')),
                    ),
                  ),
                ),
              ),
              li(p('E')),
            )
          );
          const { editorView } = editor(document, featureFlags);
          outdentList(INPUT_METHOD.KEYBOARD, featureFlags)(
            editorView.state,
            editorView.dispatch,
          );
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'outdented',
            actionSubject: 'list',
            actionSubjectId: 'numberedList',
            eventType: 'track',
            attributes: expect.objectContaining({
              inputMethod: 'keyboard',
              outdentScenario: 'splitList',
              splitListStartNumber: 7,
            }),
          });
        });
        it('should fire analytics with correct payload when outdenting one top-level that is above one nested item, which splits the list and sets split list order to 1', () => {
          // prettier-ignore
          const document = doc(
            ol({ order: 6 })(
              li(p('A')),
              li(
                p('{<}B{>}'),
                ol()(
                  li(
                    p('C'),
                  ),
                ),
              ),
              li(p('E')),
            )
          );
          const { editorView } = editor(document, featureFlags);
          outdentList(INPUT_METHOD.KEYBOARD, featureFlags)(
            editorView.state,
            editorView.dispatch,
          );
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'outdented',
            actionSubject: 'list',
            actionSubjectId: 'numberedList',
            eventType: 'track',
            attributes: expect.objectContaining({
              inputMethod: 'keyboard',
              outdentScenario: 'splitList',
              splitListStartNumber: 1,
            }),
          });
        });
        it('should fire analytics with correct payload when outdenting the last list item', () => {
          // prettier-ignore
          const document = doc(
            ol()(
              li(p('A')),
              li(p('B')),
              li(p('c{<>}')),
            )
          );
          const { editorView } = editor(document, featureFlags);
          outdentList(INPUT_METHOD.KEYBOARD, featureFlags)(
            editorView.state,
            editorView.dispatch,
          );
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'outdented',
            actionSubject: 'list',
            actionSubjectId: 'numberedList',
            eventType: 'track',
            attributes: expect.objectContaining({
              inputMethod: 'keyboard',
            }),
          });
          expect(createAnalyticsEvent).toHaveBeenCalledWith(
            expect.objectContaining({
              attributes: expect.not.objectContaining({
                outdentScenario: expect.anything(),
              }),
            }),
          );
        });
      });
    });
  });
});
