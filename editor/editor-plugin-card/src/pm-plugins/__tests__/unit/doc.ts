jest.mock('raf-schd', () =>
  jest.fn().mockImplementation((fn: any) => {
    const fnRunner = (...args: any) => fn(...args);
    fnRunner.cancel = () => {};
    return fnRunner;
  }),
);
import rafSchd from 'raf-schd';

jest.mock('../../shouldReplaceLink');
import type { DatasourceAttributes } from '@atlaskit/adf-schema/schema';
import type { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import type { CardProvider } from '@atlaskit/editor-common/provider-factory';
import type { DocBuilder } from '@atlaskit/editor-common/types';
import { setTextSelection } from '@atlaskit/editor-common/utils';
import type { Node } from '@atlaskit/editor-prosemirror/model';
import { Fragment, Slice } from '@atlaskit/editor-prosemirror/model';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import createAnalyticsEventMock from '@atlaskit/editor-test-helpers/create-analytics-event-mock';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { EditorInstanceWithPlugin } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  a,
  blockCard,
  blockquote,
  bodiedExtension,
  clean,
  cleanOne,
  datasourceBlockCard,
  decisionItem,
  decisionList,
  doc,
  embedCard,
  inlineCard,
  li,
  p,
  panel,
  table,
  taskItem,
  taskList,
  td,
  th,
  tr,
  ul,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import defaultSchema from '@atlaskit/editor-test-helpers/schema';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { insertText } from '@atlaskit/editor-test-helpers/transactions';
import { asMock } from '@atlaskit/media-test-helpers';
import type { DatasourceAdf, InlineCardAdf } from '@atlaskit/smart-card';

import type { ProviderWrapper } from '../../../__tests__/unit/_helpers';
import {
  createCardRequest,
  setupProvider,
} from '../../../__tests__/unit/_helpers';
import type { CardPluginState } from '../../../types';
import type { DatasourceTableLayout } from '../../../ui/LayoutButton/types';
import {
  queueCards,
  registerSmartCardEvents,
  setProvider,
} from '../../actions';
import {
  changeSelectedCardToLink,
  convertHyperlinkToSmartCard,
  handleFallbackWithAnalytics,
  insertDatasource,
  queueCardsFromChangedTr,
  setSelectedCardAppearance,
  updateCard,
  updateCardFromDatasourceModal,
} from '../../doc';
import { pluginKey } from '../../main';
import { shouldReplaceLink } from '../../shouldReplaceLink';

const atlassianUrl = 'http://www.atlassian.com/';
const googleUrl = 'http://www.google.com/';
const localUrl = 'http://localhost:9090/';
const mockJqlUrl1 = 'http://www.test123.com/issues/?jql=EDM/';
const mockJqlUrl2 = 'http://www.test123456.com/issues/?jql=EDM/';

function getCardAdfAttrs() {
  return {
    url: atlassianUrl,
  };
}

const inlineCardAdf = {
  type: 'inlineCard',
  attrs: getCardAdfAttrs(),
};

const originalDatasourceAdfAttrs: DatasourceAdf['attrs'] = {
  url: mockJqlUrl1,
  datasource: {
    id: 'datasource-id',
    parameters: { jql: 'EDM=jql', cloudId: 'cloud-id' },
    views: [
      {
        type: 'table',
        properties: { columns: [{ key: 'col1' }, { key: 'col2' }] },
      },
    ],
  },
};

const originalDatasourceAdf: DatasourceAdf = {
  type: 'blockCard',
  attrs: originalDatasourceAdfAttrs,
};

const originalDatasourceWideAdfAttrs: DatasourceAttributes = {
  ...originalDatasourceAdfAttrs,
  layout: 'wide',
};

const getNewDatasourceAdfAttrs = (
  url: string,
  layout?: DatasourceTableLayout,
): DatasourceAttributes => {
  return {
    url,
    datasource: {
      id: 'datasource-id',
      parameters: { jql: 'EDM=jql', cloudId: 'cloud-id' },
      views: [
        {
          type: 'table',
          properties: { columns: [{ key: 'col2' }] },
        },
      ],
    },
    ...(layout ? { layout } : {}),
  };
};

const getNewDatasourceAdf = (
  url: string,
  layout?: DatasourceTableLayout,
): DatasourceAdf => {
  return {
    type: 'blockCard',
    attrs: getNewDatasourceAdfAttrs(url, layout) as DatasourceAdf['attrs'],
  };
};

function getJqlCardAdfAttrs() {
  return {
    url: mockJqlUrl1,
  };
}

const jqlInlineCardAdf: InlineCardAdf = {
  type: 'inlineCard',
  attrs: getJqlCardAdfAttrs(),
};

const datasourceRefsNode = datasourceBlockCard(originalDatasourceAdfAttrs)();
const datasourceNode = clean(datasourceRefsNode)(defaultSchema) as Node;

const wideDatasourceRefsNode = datasourceBlockCard(
  originalDatasourceWideAdfAttrs,
)();
const wideDatasourceNode = clean(wideDatasourceRefsNode)(defaultSchema) as Node;

const blockCardRefsNode = blockCard(getJqlCardAdfAttrs())();
const blockCardNode = clean(blockCardRefsNode)(defaultSchema) as Node;

const inlineCardRefsNode = inlineCard(getJqlCardAdfAttrs())();
const inlineCardNode = clean(inlineCardRefsNode)(defaultSchema) as Node;

describe('card', () => {
  const createEditor = createEditorFactory();
  let createAnalyticsEvent: CreateUIAnalyticsEvent;
  let editor: (doc: DocBuilder) => EditorInstanceWithPlugin<any>;

  beforeEach(() => {
    editor = (doc: DocBuilder) => {
      createAnalyticsEvent =
        createAnalyticsEventMock() as unknown as CreateUIAnalyticsEvent;
      const editorWrapper = createEditor({
        doc,
        editorProps: {
          allowTables: {
            advanced: true,
          },
          allowAnalyticsGASV3: true,
          allowExtension: true,
          allowPanel: true,
          allowTasksAndDecisions: true,
          smartLinks: {
            allowEmbeds: true,
          },
        },
        createAnalyticsEvent,
        pluginKey,
      });
      (createAnalyticsEvent as any).mockClear();
      return editorWrapper;
    };
    asMock(shouldReplaceLink).mockReturnValue(true);
  });

  describe('doc', () => {
    describe('#state.update', () => {
      it('keeps positions the same for typing after the link', () => {
        const { editorView, refs } = editor(
          doc(
            p(
              'hello have a link {<>}',
              a({ href: atlassianUrl })(atlassianUrl),
            ),
          ),
        );

        const { state, dispatch } = editorView;
        dispatch(
          queueCards([createCardRequest(atlassianUrl, refs['<>'])])(state.tr),
        );

        // should be at initial pos
        const initialState = {
          cards: [],
          requests: [
            expect.objectContaining({
              url: atlassianUrl,
              pos: refs['<>'],
            }),
          ],
          provider: null,
          datasourceTableRef: undefined,
          layout: undefined,
          showLinkingToolbar: false,
          smartLinkEvents: undefined,
          showDatasourceModal: false,
          datasourceModalType: undefined,
        } as CardPluginState;
        expect(pluginKey.getState(editorView.state)).toEqual(initialState);

        // type something at end
        setTextSelection(editorView, editorView.state.doc.nodeSize - 2);
        insertText(editorView, 'more text', editorView.state.selection.from);

        // nothing should have changed
        expect(pluginKey.getState(editorView.state)).toEqual(initialState);
      });

      it('queues the link in a slice as the only node', () => {
        const linkDoc = p(
          a({
            href: atlassianUrl,
          })(atlassianUrl),
        );

        const { editorView } = editor(doc(p('blah')));

        const from = 0;
        const to = editorView.state.doc.nodeSize - 2;
        const tr = editorView.state.tr.replaceRange(
          from,
          to,
          new Slice(Fragment.from(linkDoc(editorView.state.schema)), 1, 1),
        );

        editorView.dispatch(
          queueCardsFromChangedTr(editorView.state, tr, INPUT_METHOD.CLIPBOARD),
        );

        expect(pluginKey.getState(editorView.state)).toEqual({
          cards: [],
          requests: [
            {
              url: 'http://www.atlassian.com/',
              pos: 1,
              appearance: 'inline',
              compareLinkText: true,
              source: 'clipboard',
            },
          ],
          provider: null,
          datasourceTableRef: undefined,
          layout: undefined,
          showLinkingToolbar: false,
          smartLinkEvents: undefined,
          showDatasourceModal: false,
          datasourceModalType: undefined,
        } as CardPluginState);
      });

      it('remaps positions for typing before the link', () => {
        const { editorView, refs } = editor(
          doc(
            p(
              '{<>}hello have a link',
              a({ href: atlassianUrl })('{link}' + atlassianUrl),
            ),
          ),
        );

        const { state, dispatch } = editorView;
        dispatch(
          queueCards([createCardRequest(atlassianUrl, refs['link'])])(state.tr),
        );

        // type something at start
        const typedText = 'before everything';
        insertText(editorView, typedText, refs['<>']);

        // nothing should have changed
        expect(pluginKey.getState(editorView.state)).toEqual({
          cards: [],
          requests: [
            expect.objectContaining({
              url: atlassianUrl,
              pos: refs['link'] + typedText.length,
            }),
          ],
          provider: null,
          datasourceTableRef: undefined,
          layout: undefined,
          showLinkingToolbar: false,
          smartLinkEvents: undefined,
          showDatasourceModal: false,
          datasourceModalType: undefined,
        } as CardPluginState);
      });

      it('only remaps the relevant link based on position', () => {
        const hrefs = {
          A: atlassianUrl,
          B: googleUrl,
        };

        // create a doc with 2 links
        const { editorView, refs } = editor(
          doc(
            p(
              'hello have a link {<>}',
              a({ href: hrefs.A })('{A}' + hrefs.B),
              ' and {middle} another ',
              a({ href: hrefs.B })('{B}' + hrefs.B),
            ),
          ),
        );

        const { dispatch } = editorView;

        // queue both links
        (Object.keys(hrefs) as Array<keyof typeof hrefs>).map(key => {
          dispatch(
            queueCards([createCardRequest(hrefs[key], refs[key])])(
              editorView.state.tr,
            ),
          );
        });

        // everything should be at initial pos
        expect(pluginKey.getState(editorView.state)).toEqual({
          cards: [],
          requests: [
            expect.objectContaining({
              url: hrefs['A'],
              pos: refs['A'],
            }),
            expect.objectContaining({
              url: hrefs['B'],
              pos: refs['B'],
            }),
          ],
          provider: null,
          datasourceTableRef: undefined,
          layout: undefined,
          showLinkingToolbar: false,
          smartLinkEvents: undefined,
          showDatasourceModal: false,
          datasourceModalType: undefined,
        } as CardPluginState);

        // type something in between the links
        insertText(editorView, 'ok', refs['middle']);

        // only B should have moved 2 to the right
        expect(pluginKey.getState(editorView.state)).toEqual({
          cards: [],
          requests: [
            expect.objectContaining({
              url: hrefs['A'],
              pos: refs['A'],
            }),
            expect.objectContaining({
              url: hrefs['B'],
              pos: refs['B'] + 2,
            }),
          ],
          provider: null,
          datasourceTableRef: undefined,
          layout: undefined,
          showLinkingToolbar: false,
          smartLinkEvents: undefined,
          showDatasourceModal: false,
          datasourceModalType: undefined,
        } as CardPluginState);
      });
    });

    describe('does not replace if provider', () => {
      const initialDoc = doc(
        p(
          'hello have a link ',
          a({ href: atlassianUrl })('{<>}' + atlassianUrl),
        ),
      );

      let view: EditorView;
      let provider: CardProvider;

      beforeEach(() => {
        const { editorView } = editor(initialDoc);
        view = editorView;
      });

      test('returns invalid ADF', async () => {
        const { dispatch } = view;
        const invalidADF = {
          type: 'panel',
          content: [
            {
              type: 'panel',
              content: [
                {
                  text: 'hello world',
                  type: 'text',
                },
              ],
            },
          ],
        };
        const providerWrapper = setupProvider(invalidADF);
        providerWrapper.addProvider(view);
        ({ provider } = providerWrapper);

        // try to replace the link using bad provider
        dispatch(
          queueCards([
            createCardRequest(atlassianUrl, view.state.selection.from),
          ])(view.state.tr),
        );

        // queue should now be empty, and document should remain the same
        expect(pluginKey.getState(view.state)).toEqual({
          cards: [],
          requests: [
            {
              url: 'http://www.atlassian.com/',
              pos: view.state.selection.from,
              appearance: 'inline',
              compareLinkText: true,
              source: 'clipboard',
            },
          ],
          provider: provider,
          datasourceTableRef: undefined,
          layout: undefined,
          showLinkingToolbar: false,
          smartLinkEvents: undefined,
          showDatasourceModal: false,
          datasourceModalType: undefined,
        } as CardPluginState);
        expect(view.state.doc).toEqualDocument(initialDoc);
        expect(rafSchd).toBeCalled();
      });

      test('rejects', async () => {
        const { dispatch } = view;
        provider = new (class implements CardProvider {
          resolve(): Promise<any> {
            return Promise.reject('error').catch(() => {});
          }
          async findPattern(): Promise<boolean> {
            return true;
          }
        })();

        dispatch(setProvider(provider)(view.state.tr));

        // try to replace the link using bad provider
        dispatch(
          queueCards([
            createCardRequest(atlassianUrl, view.state.selection.from),
          ])(view.state.tr),
        );

        // queue should now be empty, and document should remain the same
        expect(pluginKey.getState(view.state)).toEqual({
          cards: [],
          requests: [
            {
              url: 'http://www.atlassian.com/',
              pos: view.state.selection.from,
              appearance: 'inline',
              compareLinkText: true,
              source: 'clipboard',
            },
          ],
          provider: provider,
          datasourceTableRef: undefined,
          layout: undefined,
          showLinkingToolbar: false,
          smartLinkEvents: undefined,
          showDatasourceModal: false,
          datasourceModalType: undefined,
        } as CardPluginState);
        expect(view.state.doc).toEqualDocument(initialDoc);
        expect(rafSchd).toBeCalled();
      });
    });

    describe('changed document', () => {
      let providerWrapper: ProviderWrapper;

      beforeEach(() => {
        providerWrapper = setupProvider();
      });

      it('does not replace if link text changes', async () => {
        asMock(shouldReplaceLink).mockReturnValue(false);
        const href = 'http://www.sick.com/';
        const { editorView } = editor(
          doc(p('hello have a link ', a({ href })('{<>}' + href))),
        );

        const { dispatch } = editorView;
        providerWrapper.addProvider(editorView);

        // queue it
        dispatch(
          queueCards([
            createCardRequest(href, editorView.state.selection.from),
          ])(editorView.state.tr),
        );

        // now, change the link text (+1 so we change inside the text node with the mark, otherwise
        // we prefer to change on the other side of the boundary)
        insertText(editorView, 'change', editorView.state.selection.from + 1);

        await providerWrapper.waitForRequests();

        // link should not have been replaced, but text will have changed
        expect(editorView.state.doc).toEqualDocument(
          doc(
            p(
              'hello have a link ',
              a({ href })(href[0] + 'change{<>}' + href.slice(1)),
            ),
          ),
        );

        // queue should be empty
        expect(pluginKey.getState(editorView.state)).toEqual({
          cards: [],
          requests: [],
          provider: providerWrapper.provider,
          datasourceTableRef: undefined,
          layout: undefined,
          showLinkingToolbar: false,
          smartLinkEvents: undefined,
          showDatasourceModal: false,
          datasourceModalType: undefined,
        } as CardPluginState);
      });

      it('replaces anyway if compareLinkText is false', async () => {
        const { editorView } = editor(
          doc(
            p(
              'hello have a link ',
              a({
                href: atlassianUrl,
              })('{<>}renamed link'),
            ),
          ),
        );

        const { dispatch } = editorView;
        providerWrapper.addProvider(editorView);

        // queue it
        dispatch(
          queueCards([
            createCardRequest(atlassianUrl, editorView.state.selection.from, {
              compareLinkText: false,
            }),
          ])(editorView.state.tr),
        );

        // the test cardProvider stores the promise for each card it's converting
        // resolve all the promises to allow the card plugin to convert the cards to links
        await providerWrapper.waitForRequests();

        // this test provider replaces links with the ADF of: p('hello world')
        expect(editorView.state.doc).toEqualDocument(
          doc(p('hello have a link '), p('hello world')),
        );
      });

      it('replaces a link encoded with spaces', async () => {
        const { editorView } = editor(
          doc(
            p(
              'hello have a link ',
              a({
                href: 'https://www.atlassian.com/s/7xr7xdqto7trhvr/Media%20picker.sketch?dl=0',
              })(
                '{<>}https://www.atlassian.com/s/7xr7xdqto7trhvr/Media%20picker.sketch?dl=0',
              ),
            ),
          ),
        );

        const { dispatch } = editorView;
        providerWrapper.addProvider(editorView);

        // queue it
        dispatch(
          queueCards([
            createCardRequest(
              'https://www.atlassian.com/s/7xr7xdqto7trhvr/Media%20picker.sketch?dl=0',
              editorView.state.selection.from,
            ),
          ])(editorView.state.tr),
        );

        await providerWrapper.waitForRequests();

        expect(editorView.state.doc).toEqualDocument(
          doc(p('hello have a link '), p('hello world')),
        );
      });

      it('replaces when link text is unencoded', async () => {
        const { editorView } = editor(
          doc(
            p(
              'hello have a link ',
              a({
                href: 'https://www.atlassian.com/s/7xr7xdqto7trhvr/Media%20picker.sketch?dl=0',
              })(
                '{<>}https://www.atlassian.com/s/7xr7xdqto7trhvr/Media picker.sketch?dl=0',
              ),
            ),
          ),
        );

        const { dispatch } = editorView;
        providerWrapper.addProvider(editorView);

        // queue it
        dispatch(
          queueCards([
            createCardRequest(
              'https://www.atlassian.com/s/7xr7xdqto7trhvr/Media%20picker.sketch?dl=0',
              editorView.state.selection.from,
            ),
          ])(editorView.state.tr),
        );

        await providerWrapper.waitForRequests();

        expect(editorView.state.doc).toEqualDocument(
          doc(p('hello have a link '), p('hello world')),
        );
      });

      it('does not replace if position is some other content', async () => {
        asMock(shouldReplaceLink).mockReturnValue(false);
        const initialDoc = doc(
          p('hello have a link '),
          p('{<>}' + atlassianUrl),
        );

        const { editorView } = editor(initialDoc);

        const { dispatch } = editorView;
        providerWrapper.addProvider(editorView);

        // queue a non-link node
        dispatch(
          queueCards([
            createCardRequest(atlassianUrl, editorView.state.selection.from),
          ])(editorView.state.tr),
        );

        // resolve the provider
        await providerWrapper.waitForRequests();

        // nothing should change
        expect(editorView.state.doc).toEqualDocument(initialDoc);
      });
    });

    describe('#updateCard', () => {
      it('should replace selection with new url', function () {
        const { editorView } = editor(
          doc(p('hello', '{<node>}', inlineCard(getCardAdfAttrs())())),
        );

        const { state, dispatch } = editorView;

        expect(editorView.state.doc).toEqualDocument(
          doc(p('hello', inlineCard(getCardAdfAttrs())())),
        );

        updateCard(atlassianUrl)(state, dispatch);

        expect(editorView.state.doc).toEqualDocument(
          doc(
            p('hello', a({ href: atlassianUrl })('http://www.atlassian.com/')),
          ),
        );

        expect(pluginKey.getState(editorView.state)).toEqual({
          cards: [],
          requests: [
            {
              url: 'http://www.atlassian.com/',
              pos: 6,
              appearance: 'inline',
              compareLinkText: true,
              previousAppearance: 'inline',
              source: 'manual',
              analyticsAction: 'updated',
            },
          ],
          provider: null,
          datasourceTableRef: undefined,
          layout: undefined,
          showLinkingToolbar: false,
          smartLinkEvents: undefined,
          showDatasourceModal: false,
          datasourceModalType: undefined,
        } as CardPluginState);
      });
    });

    describe('#changeSelectedCardToLink', () => {
      it('should replace selection with new url using provided node and position', function () {
        const inlineCardRefsNode = inlineCard(getCardAdfAttrs())();
        const inlineCardNode = cleanOne(inlineCardRefsNode)(defaultSchema);
        const { editorView } = editor(
          doc(p('hello', '{<node>}', inlineCardRefsNode, ' some other text')),
        );

        const { state, dispatch } = editorView;

        expect(editorView.state.doc).toEqualDocument(
          doc(p('hello', inlineCard(getCardAdfAttrs())(), ' some other text')),
        );

        changeSelectedCardToLink(
          atlassianUrl,
          atlassianUrl,
          false,
          inlineCardNode,
          6,
        )(state, dispatch);

        expect(editorView.state.doc).toEqualDocument(
          doc(
            p(
              'hello',
              a({ href: atlassianUrl })('http://www.atlassian.com/'),
              ' some other text',
            ),
          ),
        );

        // Ensure we have no pending requests
        expect(pluginKey.getState(editorView.state)).toEqual(
          expect.objectContaining({
            cards: [],
            requests: [],
            provider: null,
            showLinkingToolbar: false,
            smartLinkEvents: undefined,
          }),
        );
      });
    });

    describe('setSelectedCardAppearance()', () => {
      it('should use the right NodeType for the new node', () => {
        const { editorView } = editor(
          doc(p('hello', '{<node>}', inlineCard(getCardAdfAttrs())())),
        );
        const dispatch = jest.fn();

        setSelectedCardAppearance('block', undefined)(
          editorView.state,
          dispatch,
        );
        expect(
          dispatch.mock.calls[0][0].doc.content.content[1].type.name,
        ).toEqual('blockCard');
      });

      it('should use the right range for the transaction', () => {
        const { editorView } = editor(
          doc(p('hello ', '{<node>}', inlineCard(getCardAdfAttrs())())),
        );
        const dispatch = jest.fn();

        setSelectedCardAppearance('block', undefined)(
          editorView.state,
          dispatch,
        );

        expect(dispatch.mock.calls[0][0].steps[0]).toEqual(
          expect.objectContaining({ from: 7, to: 9 }),
        );
      });

      it('should not remove parent panel when changing from inline to block and is only child', () => {
        const { editorView } = editor(
          doc(panel()(p('{<node>}', inlineCard(getCardAdfAttrs())()))),
        );

        // Change the card from "inline" to "block"
        setSelectedCardAppearance('block', undefined)(
          editorView.state,
          editorView.dispatch,
        );

        // The background color of the parent cell should be the same.
        expect(editorView.state.doc).toEqualDocument(
          doc(panel()(blockCard(getCardAdfAttrs())())),
        );
      });

      it('should not remove the background color of a parent table cell', () => {
        const TABLE_LOCAL_ID = 'test-table-local-id';
        const { editorView } = editor(
          doc(
            table({ localId: TABLE_LOCAL_ID })(
              tr(th()(p('1')), th()(p('2')), th()(p('3'))),
              tr(
                td({ background: 'red' })(
                  '{<node>}',
                  blockCard(getCardAdfAttrs())(),
                ),
                td()(p('5')),
                td()(p('6')),
              ),
            ),
          ),
        );

        // Change the card from "block" to "inline"
        setSelectedCardAppearance('inline', undefined)(
          editorView.state,
          editorView.dispatch,
        );

        // The background color of the parent cell should be the same.
        expect(editorView.state.doc).toEqualDocument(
          doc(
            table({ localId: TABLE_LOCAL_ID })(
              tr(th()(p('1')), th()(p('2')), th()(p('3'))),
              tr(
                td({ background: 'red' })(
                  p('{<node>}', inlineCard(getCardAdfAttrs())()),
                ),
                td()(p('5')),
                td()(p('6')),
              ),
            ),
          ),
        );
      });

      it('should correctly replace an inline card with a block card', () => {
        const { editorView } = editor(
          doc(p('hello ', '{<node>}', inlineCard(getCardAdfAttrs())())),
        );

        setSelectedCardAppearance('block', undefined)(
          editorView.state,
          editorView.dispatch,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(p('hello '), blockCard(getCardAdfAttrs())()),
        );
      });

      it('should correctly change the view from embed to block when it is the last node', function () {
        const { editorView } = editor(
          doc(
            '{<node>}',
            embedCard({
              url: 'http://www.atlassian.com/',
              layout: 'center',
            })(),
          ),
        );

        setSelectedCardAppearance('block', undefined)(
          editorView.state,
          editorView.dispatch,
        );

        const node = editorView.state.doc.childAfter(0).node;
        expect(node).toBeDefined();
        expect(node!.type?.name).toEqual('blockCard');

        // Inserting text at current cursor / selection
        editorView.dispatch(editorView.state.tr.insertText('some text'));

        // Ensure user can continue to type without replacing block card
        const newNode = editorView.state.doc.childAfter(0).node;
        expect(newNode).toBeDefined();
        expect(newNode!.type?.name).toEqual('blockCard');
      });

      it('should correctly change the view from block to embed when it is the last node', function () {
        const { editorView } = editor(
          doc('{<node>}', blockCard(getCardAdfAttrs())()),
        );

        setSelectedCardAppearance('embed', undefined)(
          editorView.state,
          editorView.dispatch,
        );

        const node = editorView.state.doc.childAfter(0).node;
        expect(node).toBeDefined();
        expect(node!.type?.name).toEqual('embedCard');

        // Inserting text at current cursor / selection
        editorView.dispatch(editorView.state.tr.insertText('some text'));

        // Ensure user can continue to type without replacing embed card
        const newNode = editorView.state.doc.childAfter(0).node;
        expect(newNode).toBeDefined();
        expect(newNode!.type?.name).toEqual('embedCard');
      });
    });

    describe('convertHyperlinkToSmartCard()', () => {
      it('should create a transaction with the right request', () => {
        const { editorView } = editor(
          doc(p('hello ', '{<node>}', inlineCard(getCardAdfAttrs())())),
        );
        editorView.state.tr.doc.nodesBetween = jest
          .fn()
          .mockImplementation((from, to, callback) => {
            const node = {
              marks: [
                {
                  type: editorView.state.schema.marks.link,
                  attrs: { href: 'some-href' },
                },
              ],
            };
            callback(node);
          });
        const tr = convertHyperlinkToSmartCard(
          editorView.state,
          INPUT_METHOD.MANUAL,
          'block',
        );
        expect(tr.getMeta(pluginKey).requests).toEqual([
          {
            analyticsAction: 'changedType',
            url: 'some-href',
            pos: undefined,
            previousAppearance: 'url',
            shouldReplaceLink: true,
            appearance: 'block',
            compareLinkText: true,
            source: 'manual',
          },
        ]);
      });
    });

    describe('analytics GAS V3', () => {
      const providerWrapper = setupProvider(inlineCardAdf);

      it('should create analytics GAS V3 event if insert card', async () => {
        const { editorView } = editor(
          doc(
            p(
              'hello have a link ',
              a({
                href: atlassianUrl,
              })(`{<>}${atlassianUrl}`),
            ),
          ),
        );

        providerWrapper.addProvider(editorView);

        // queue it
        editorView.dispatch(
          queueCards([
            createCardRequest(atlassianUrl, editorView.state.selection.from),
          ])(editorView.state.tr),
        );

        await providerWrapper.waitForRequests();

        expect(createAnalyticsEvent).toBeCalledWith(
          expect.objectContaining({
            action: 'inserted',
            actionSubject: 'document',
            actionSubjectId: 'smartLink',
            eventType: 'track',
            attributes: expect.objectContaining({
              fromCurrentDomain: false,
              nodeType: 'inlineCard',
            }),
            nonPrivacySafeAttributes: {
              domainName: 'www.atlassian.com',
            },
          }),
        );
      });

      it('should call SmartLinks Event on insert', async () => {
        const { editorView } = editor(
          doc(
            p(
              'hello have a link ',
              a({
                href: atlassianUrl,
              })(`{<>}${atlassianUrl}`),
            ),
          ),
        );

        providerWrapper.addProvider(editorView);

        // queue it
        editorView.dispatch(
          queueCards([
            createCardRequest(atlassianUrl, editorView.state.selection.from),
          ])(editorView.state.tr),
        );

        const eventsMock = {
          insertSmartLink: jest.fn(),
        };

        editorView.dispatch(
          registerSmartCardEvents(eventsMock)(editorView.state.tr),
        );

        await providerWrapper.waitForRequests();

        expect(eventsMock.insertSmartLink).toBeCalledWith(
          'www.atlassian.com',
          'inline',
          createAnalyticsEvent,
        );
      });

      it('should include fromCurrentDomain in the event attribute', async () => {
        const { editorView } = editor(
          doc(
            p(
              'hello have a link ',
              a({
                href: localUrl,
              })(`{<>}${localUrl}`),
            ),
          ),
        );

        providerWrapper.addProvider(editorView);

        // queue it
        editorView.dispatch(
          queueCards([
            createCardRequest(localUrl, editorView.state.selection.from),
          ])(editorView.state.tr),
        );

        await providerWrapper.waitForRequests();

        expect(createAnalyticsEvent).toBeCalledWith(
          expect.objectContaining({
            action: 'inserted',
            actionSubject: 'document',
            actionSubjectId: 'smartLink',
            eventType: 'track',
            attributes: expect.objectContaining({
              fromCurrentDomain: true,
            }),
          }),
        );
      });

      function testWithContext(
        initialDoc: DocBuilder,
        expectedContext: string,
      ) {
        test(`should create analytics GAS V3 with node context ${expectedContext}`, async () => {
          const { editorView } = editor(initialDoc);

          providerWrapper.addProvider(editorView);

          // queue it
          editorView.dispatch(
            queueCards([
              createCardRequest(atlassianUrl, editorView.state.selection.from),
            ])(editorView.state.tr),
          );

          await providerWrapper.waitForRequests();

          expect(createAnalyticsEvent).toBeCalledWith(
            expect.objectContaining({
              action: 'inserted',
              actionSubject: 'document',
              actionSubjectId: 'smartLink',
              eventType: 'track',
              attributes: expect.objectContaining({
                nodeContext: expectedContext,
              }),
            }),
          );
        });
      }

      // Test analytics with right context
      [
        {
          initialDoc: doc(
            blockquote(
              p(
                'hello have a link ',
                a({
                  href: atlassianUrl,
                })(`{<>}${atlassianUrl}`),
              ),
            ),
          ),
          expectedContext: 'blockquote',
        },
        {
          initialDoc: doc(
            table()(
              tr(
                th({ colwidth: [100] })(p('1')),
                th({ colwidth: [100] })(p('2')),
                th({ colwidth: [480] })(p('3')),
              ),
              tr(
                td({ colwidth: [100] })(
                  p(
                    'hello have a link ',
                    a({
                      href: atlassianUrl,
                    })(`{<>}${atlassianUrl}`),
                  ),
                ),
                td({ colwidth: [100] })(p('5')),
                td({ colwidth: [480] })(p('6')),
              ),
            ),
          ),
          expectedContext: 'tableCell',
        },
        {
          initialDoc: doc(
            table()(
              tr(
                th({ colwidth: [100] })(
                  p(
                    'hello have a link ',
                    a({
                      href: atlassianUrl,
                    })(`{<>}${atlassianUrl}`),
                  ),
                ),
                th({ colwidth: [100] })(p('2')),
                th({ colwidth: [480] })(p('3')),
              ),
              tr(
                td({ colwidth: [100] })(p('4')),
                td({ colwidth: [100] })(p('5')),
                td({ colwidth: [480] })(p('6')),
              ),
            ),
          ),
          expectedContext: 'tableHeader',
        },
        {
          initialDoc: doc(
            ul(
              li(
                p(
                  'hello have a link ',
                  a({
                    href: atlassianUrl,
                  })(`{<>}${atlassianUrl}`),
                ),
              ),
            ),
          ),
          expectedContext: 'listItem',
        },
        {
          initialDoc: doc(
            decisionList()(
              decisionItem({ localId: 'local-decision' })(
                'hello have a link ',
                a({
                  href: atlassianUrl,
                })(`{<>}${atlassianUrl}`),
              ),
            ),
          ),
          expectedContext: 'decisionList',
        },
        {
          initialDoc: doc(
            taskList()(
              taskItem({ localId: 'local-task' })(
                'hello have a link ',
                a({
                  href: atlassianUrl,
                })(`{<>}${atlassianUrl}`),
              ),
            ),
          ),
          expectedContext: 'taskList',
        },
        {
          initialDoc: doc(
            panel()(
              p(
                'hello have a link ',
                a({
                  href: atlassianUrl,
                })(`{<>}${atlassianUrl}`),
              ),
            ),
          ),
          expectedContext: 'panel',
        },
        {
          initialDoc: doc(
            bodiedExtension({
              extensionType: 'com.atlassian.confluence.macro.core',
              extensionKey: 'expand',
            })(
              p(
                'hello have a link ',
                a({
                  href: atlassianUrl,
                })(`{<>}${atlassianUrl}`),
              ),
            ),
          ),
          expectedContext: 'bodiedExtension',
        },
      ].forEach(({ initialDoc, expectedContext }) =>
        testWithContext(initialDoc, expectedContext),
      );
    });

    describe('#handleFallbackWithAnalytics', () => {
      it('sends an analytics event upon falling back to a blue link', () => {
        const { editorView } = editor(
          doc(
            p(
              'hello have a link {<>}',
              a({ href: atlassianUrl })(atlassianUrl),
            ),
          ),
        );

        const attachAnalyticsEvent = jest
          .fn()
          .mockImplementation(() => () => {});

        const mockEditorAnalyticsApi: EditorAnalyticsAPI = {
          attachAnalyticsEvent,
        };
        const { state, dispatch } = editorView;
        handleFallbackWithAnalytics(
          {
            pos: 0,
            url: atlassianUrl,
            compareLinkText: true,
            appearance: 'inline',
            source: INPUT_METHOD.MANUAL,
          },
          mockEditorAnalyticsApi,
        )(state, dispatch);
        expect(attachAnalyticsEvent).toBeCalled();
        expect(attachAnalyticsEvent).toBeCalledWith({
          action: 'inserted',
          actionSubject: 'document',
          actionSubjectId: 'link',
          attributes: {
            fromCurrentDomain: false,
            inputMethod: 'manual',
          },
          eventType: 'track',
          nonPrivacySafeAttributes: {
            linkDomain: 'atlassian.com',
          },
        });
      });
    });

    describe('when smart card changes view', () => {
      it('should pass unique id into changedType event attributes', function () {
        const { editorView } = editor(
          doc(p('hello ', '{<node>}', inlineCard(getCardAdfAttrs())())),
        );

        const attachAnalyticsEvent = jest
          .fn()
          .mockImplementation(() => () => {});

        const mockEditorAnalyticsApi: EditorAnalyticsAPI = {
          attachAnalyticsEvent,
        };

        setSelectedCardAppearance('block', mockEditorAnalyticsApi)(
          editorView.state,
          editorView.dispatch,
        );

        expect(attachAnalyticsEvent).toBeCalledWith(
          expect.objectContaining({
            action: 'changedType',
          }),
        );
      });
    });

    describe('updateCardFromDatasourceModal()', () => {
      it('should not update if original node is datasource and nothing gets updated', () => {
        const { editorView } = editor(doc('{<node>}', datasourceRefsNode));

        updateCardFromDatasourceModal(
          editorView.state,
          datasourceNode,
          originalDatasourceAdf,
          editorView,
          undefined,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc('{<node>}', datasourceRefsNode),
        );
      });

      it('should correctly update datasource if its columns get updated', () => {
        const { editorView } = editor(doc('{<node>}', datasourceRefsNode));

        updateCardFromDatasourceModal(
          editorView.state,
          datasourceNode,
          getNewDatasourceAdf(mockJqlUrl1),
          editorView,
          undefined,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(
            '{<node>}',
            datasourceBlockCard(getNewDatasourceAdfAttrs(mockJqlUrl1))(),
          ),
        );
      });

      it('should correctly update wide layout datasource if columns gets updated and keep the wide layout', () => {
        const { editorView } = editor(doc('{<node>}', wideDatasourceRefsNode));
        updateCardFromDatasourceModal(
          editorView.state,
          wideDatasourceNode,
          getNewDatasourceAdf(mockJqlUrl1),
          editorView,
          undefined,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(
            '{<node>}',
            datasourceBlockCard(
              getNewDatasourceAdfAttrs(mockJqlUrl1, 'wide'),
            )(),
          ),
        );
      });

      it('should correctly update datasource if url gets updated', () => {
        const { editorView } = editor(doc('{<node>}', datasourceRefsNode));

        updateCardFromDatasourceModal(
          editorView.state,
          datasourceNode,
          getNewDatasourceAdf(mockJqlUrl2),
          editorView,
          undefined,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(
            '{<node>}',
            datasourceBlockCard(getNewDatasourceAdfAttrs(mockJqlUrl2))(),
          ),
        );
      });

      it('should correctly update datasource to inline card', () => {
        const { editorView } = editor(doc('{<node>}', datasourceRefsNode));

        updateCardFromDatasourceModal(
          editorView.state,
          datasourceNode,
          jqlInlineCardAdf,
          editorView,
          undefined,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(p('{<node>}', inlineCard(getJqlCardAdfAttrs())())),
        );
      });

      it('should correctly update blockCard to datasource', () => {
        const { editorView } = editor(doc('{<node>}', blockCardRefsNode));

        updateCardFromDatasourceModal(
          editorView.state,
          blockCardNode,
          getNewDatasourceAdf(mockJqlUrl1),
          editorView,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(
            '{<node>}',
            datasourceBlockCard(getNewDatasourceAdfAttrs(mockJqlUrl1))(),
          ),
        );
      });

      it('should correctly update inlineCard to datasource', () => {
        const { editorView } = editor(doc(p('{<node>}', inlineCardRefsNode)));

        updateCardFromDatasourceModal(
          editorView.state,
          inlineCardNode,
          originalDatasourceAdf,
          editorView,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(p(), datasourceRefsNode),
        );
      });

      it('should correctly update blockCard to inlineCard', () => {
        const { editorView } = editor(doc('{<node>}', blockCardRefsNode));

        updateCardFromDatasourceModal(
          editorView.state,
          blockCardNode,
          jqlInlineCardAdf,
          editorView,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(p('{<node>}', inlineCard(getJqlCardAdfAttrs())())),
        );
      });
    });

    describe('insertDatasource()', () => {
      it('should insert datasource when adf type is "blockCard"', () => {
        const { editorView } = editor(doc(p()));

        insertDatasource(
          editorView.state,
          originalDatasourceAdf as any,
          editorView,
          undefined,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(p(), datasourceRefsNode),
        );
      });

      it('should insert a smart card when adf type is "inlineCard"', () => {
        const { editorView } = editor(doc(p()));

        insertDatasource(
          editorView.state,
          inlineCardAdf as any,
          editorView,
          undefined,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(p(inlineCard(getCardAdfAttrs())())),
        );
      });
    });
  });
});
