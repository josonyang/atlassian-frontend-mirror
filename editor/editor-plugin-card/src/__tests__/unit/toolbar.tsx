import React from 'react';

import { render } from '@testing-library/react';
import { createIntl } from 'react-intl-next';

import { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import { CardOptions } from '@atlaskit/editor-common/card';
import commonMessages, {
  linkMessages,
  linkToolbarMessages,
} from '@atlaskit/editor-common/messages';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type {
  Command,
  FloatingToolbarButton,
  FloatingToolbarConfig,
} from '@atlaskit/editor-common/types';
import { EditorView } from '@atlaskit/editor-prosemirror/view';
import createAnalyticsEventMock from '@atlaskit/editor-test-helpers/create-analytics-event-mock';
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
import {
  blockCard,
  datasourceBlockCard,
  doc,
  DocBuilder,
  embedCard,
  expand,
  inlineCard,
  p,
} from '@atlaskit/editor-test-helpers/doc-builder';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import CogIcon from '@atlaskit/icon/glyph/editor/settings';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import OpenIcon from '@atlaskit/icon/glyph/shortcut';
import { JIRA_LIST_OF_LINKS_DATASOURCE_ID } from '@atlaskit/link-datasource';
import type { DatasourceAdf } from '@atlaskit/smart-card';
import { ffTest } from '@atlassian/feature-flags-test-utils';

// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import { pluginKey } from '../../pm-plugins/plugin-key';
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import { floatingToolbar } from '../../toolbar';
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import {
  cardContext,
  MockCardContextAdapter,
  mockCardContextState,
  mockPreview,
} from '../../ui/__tests__/_utils/mock-card-context';
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import { SmallerEditIcon } from '../../ui/SmallerEditIcon';
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import * as CardUtils from '../../utils';

const attachAnalyticsEvent = jest.fn().mockImplementation(() => () => {});

const mockEditorAnalyticsApi: EditorAnalyticsAPI = {
  attachAnalyticsEvent,
};

const mockPluginInjectionApi: any = {
  dependencies: {
    decorations: {
      actions: {
        hoverDecoration: () => () => {},
      },
    },
    analytics: {
      actions: mockEditorAnalyticsApi,
    },
    card: {
      actions: undefined,
    },
  },
};

const mockJqlUrl = 'http://www.test123.com/issues/?jql=EDM/';

const datasourceNoUrlAdfAttrs: DatasourceAdf['attrs'] = {
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

const datasourceAdfAttrsWithRealJiraId: DatasourceAdf['attrs'] = {
  datasource: {
    ...datasourceNoUrlAdfAttrs.datasource,
    id: JIRA_LIST_OF_LINKS_DATASOURCE_ID,
  },
};

const datasourceWithUrlAdfAttrs: DatasourceAdf['attrs'] = {
  ...datasourceNoUrlAdfAttrs,
  url: mockJqlUrl,
};

// Copied and simplified from:
// editor-core/src/plugins/floating-toolbar/__tests__/_helpers.ts
const getToolbarItems = (
  toolbar: FloatingToolbarConfig,
  editorView: EditorView,
) => {
  const node = editorView.state.doc.nodeAt(editorView.state.selection.from)!;

  const items = Array.isArray(toolbar.items)
    ? toolbar.items
    : toolbar.items(node);
  return items.filter(item => item.type !== 'copy-button');
};

const getToolbarButtonByTitle = (
  toolbar: FloatingToolbarConfig,
  editorView: EditorView,
  title: string,
) => {
  return getToolbarItems(toolbar!, editorView).find(
    item => item.type === 'button' && item.title === title,
  ) as FloatingToolbarButton<Command>;
};

describe('card', () => {
  const createEditor = createEditorFactory();
  const providerFactory = new ProviderFactory();
  let createAnalyticsEvent = createAnalyticsEventMock();
  let featureFlagsMock = {};
  const editor = (doc: DocBuilder, smartLinksOptions?: CardOptions) => {
    return createEditor({
      doc,
      providerFactory,
      editorProps: {
        smartLinks: {
          allowBlockCards: true,
          allowEmbeds: true,
          allowResizing: true,
          allowDatasource: true,
          ...smartLinksOptions,
        },
        allowExpand: true,
        allowAnalyticsGASV3: true,
      },
      pluginKey,
      createAnalyticsEvent,
    });
  };

  describe('toolbar', () => {
    const intl = createIntl({
      locale: 'en',
    });

    const visitTitle = intl.formatMessage(linkMessages.openLink);
    const unlinkTitle = intl.formatMessage(linkToolbarMessages.unlink);
    const removeTitle = intl.formatMessage(commonMessages.remove);
    const openSettingsTitle = intl.formatMessage(
      linkToolbarMessages.settingsLink,
    );
    const editDatasourceTitle = intl.formatMessage(
      linkToolbarMessages.editDatasource,
    );

    describe.each(['true', 'false', undefined])(
      'with settings button flag returning %s',
      isLinkSettingsButtonEnabled => {
        const getSettingsButton = (
          toolbar: FloatingToolbarConfig,
          editorView: EditorView,
        ) =>
          getToolbarItems(toolbar, editorView).find(
            item => item.type === 'button' && item.title === openSettingsTitle,
          ) as FloatingToolbarButton<Command> | undefined;

        const verifySettingsButton = (
          settingsButton: FloatingToolbarButton<Command> | undefined,
          editorView: EditorView,
        ) => {
          if (isLinkSettingsButtonEnabled === 'true') {
            expect(settingsButton).toBeDefined();
            expect(settingsButton).toMatchObject({
              icon: CogIcon,
            });
            settingsButton?.onClick(editorView.state, editorView.dispatch);
            expect(open).toBeCalledWith(
              'https://id.atlassian.com/manage-profile/link-preferences',
            );
          } else {
            expect(settingsButton).not.toBeDefined();
          }
        };

        beforeEach(() => {
          featureFlagsMock = {
            floatingToolbarLinkSettingsButton: isLinkSettingsButtonEnabled,
          };
          global.open = jest.fn();
        });
        afterEach(() => {
          featureFlagsMock = {};
          (global.open as jest.Mock).mockReset();
        });

        afterAll(() => {
          featureFlagsMock = {};
          (global.open as jest.Mock).mockRestore();
        });

        it('displays toolbar items in correct order for inlineCard', () => {
          const { editorView } = editor(
            doc(
              p(
                '{<node>}',
                inlineCard({
                  url: 'http://www.atlassian.com/',
                })(),
              ),
            ),
          );

          const toolbar = floatingToolbar(
            {
              allowBlockCards: true,
              allowEmbeds: true,
              allowResizing: true,
            },
            featureFlagsMock,
            undefined,
            undefined,
            mockPluginInjectionApi,
          )(editorView.state, intl, providerFactory);
          const toolbarItems = getToolbarItems(toolbar!, editorView);
          expect(toolbar).toBeDefined();
          expect(toolbarItems).toHaveLength(
            isLinkSettingsButtonEnabled === 'true' ? 11 : 9,
          );
          expect(toolbarItems).toMatchSnapshot();

          const settingsButton = getSettingsButton(toolbar!, editorView);
          verifySettingsButton(settingsButton, editorView);
        });

        it('displays toolbar items in correct order for inlineCard on mobile', () => {
          const { editorView } = editor(
            doc(
              p(
                '{<node>}',
                inlineCard({
                  url: 'http://www.atlassian.com/',
                })(),
              ),
            ),
          );

          const toolbar = floatingToolbar(
            {
              allowBlockCards: true,
              allowEmbeds: true,
              allowResizing: true,
            },
            featureFlagsMock,
            'mobile',
            undefined,
            mockPluginInjectionApi,
          )(editorView.state, intl, providerFactory);
          const toolbarItems = getToolbarItems(toolbar!, editorView);
          expect(toolbarItems[2].type).not.toBe('custom');
          expect(toolbar).toBeDefined();
          expect(toolbarItems).toHaveLength(
            isLinkSettingsButtonEnabled === 'true' ? 11 : 9,
          );
          expect(toolbarItems).toMatchSnapshot();

          const settingsButton = getSettingsButton(toolbar!, editorView);
          verifySettingsButton(settingsButton, editorView);
        });

        it('displays toolbar items in correct order for blockCard', () => {
          const { editorView } = editor(
            doc(
              '{<node>}',
              blockCard({
                url: 'http://www.atlassian.com/',
              })(),
            ),
          );

          const toolbar = floatingToolbar(
            {
              allowBlockCards: true,
              allowEmbeds: true,
              allowResizing: true,
            },
            featureFlagsMock,
            undefined,
            undefined,
            mockPluginInjectionApi,
          )(editorView.state, intl, providerFactory);
          const toolbarItems = getToolbarItems(toolbar!, editorView);
          expect(toolbar).toBeDefined();
          expect(toolbarItems).toHaveLength(
            isLinkSettingsButtonEnabled === 'true' ? 9 : 7,
          );
          expect(toolbarItems).toMatchSnapshot();

          const settingsButton = getSettingsButton(toolbar!, editorView);
          verifySettingsButton(settingsButton, editorView);
        });

        it('displays inlineCard toolbar if allowDatasource is false', () => {
          const { editorView } = editor(
            doc('{<node>}', datasourceBlockCard(datasourceWithUrlAdfAttrs)()),
          );

          const toolbar = floatingToolbar(
            {
              allowBlockCards: true,
              allowEmbeds: true,
              allowResizing: true,
              allowDatasource: false,
            },
            featureFlagsMock,
            undefined,
            undefined,
            mockPluginInjectionApi,
          )(editorView.state, intl, providerFactory);
          const toolbarItems = getToolbarItems(toolbar!, editorView);

          expect(
            (toolbarItems[2] as FloatingToolbarButton<Command>).id,
          ).toEqual('editor.link.edit');
        });

        it('displays toolbar items in correct order for datasource with url', () => {
          const { editorView } = editor(
            doc('{<node>}', datasourceBlockCard(datasourceWithUrlAdfAttrs)()),
          );

          const toolbar = floatingToolbar(
            {
              allowBlockCards: true,
              allowEmbeds: true,
              allowResizing: true,
              allowDatasource: true,
            },
            featureFlagsMock,
            undefined,
            undefined,
            mockPluginInjectionApi,
          )(editorView.state, intl, providerFactory);
          const toolbarItems = getToolbarItems(toolbar!, editorView);
          expect(toolbar).toBeDefined();
          expect(toolbarItems).toHaveLength(5); // 3 buttons and 2 separators
          expect(toolbarItems).toMatchSnapshot();
        });

        it('displays toolbar items in correct order for datasource without url', () => {
          const { editorView } = editor(
            doc('{<node>}', datasourceBlockCard(datasourceNoUrlAdfAttrs)()),
          );

          const toolbar = floatingToolbar(
            {
              allowBlockCards: true,
              allowEmbeds: true,
              allowResizing: true,
              allowDatasource: true,
            },
            featureFlagsMock,
            undefined,
            undefined,
            mockPluginInjectionApi,
          )(editorView.state, intl, providerFactory);
          const toolbarItems = getToolbarItems(toolbar!, editorView);
          expect(toolbar).toBeDefined();
          expect(toolbarItems).toHaveLength(3); // 2 buttons and 1 separator
          expect(toolbarItems).toMatchSnapshot();
        });

        it('displays toolbar items in correct order for embedCard', () => {
          const { editorView } = editor(
            doc(
              '{<node>}',
              embedCard({
                url: 'http://www.atlassian.com/',
                layout: 'center',
              })(),
            ),
          );

          const toolbar = floatingToolbar(
            {
              allowBlockCards: true,
              allowEmbeds: true,
              allowResizing: true,
            },
            featureFlagsMock,
            undefined,
            undefined,
            mockPluginInjectionApi,
          )(editorView.state, intl, providerFactory);
          const toolbarItems = getToolbarItems(toolbar!, editorView);
          expect(toolbar).toBeDefined();
          expect(toolbarItems).toHaveLength(
            isLinkSettingsButtonEnabled === 'true' ? 16 : 14,
          );
          expect(toolbarItems).toMatchSnapshot();

          const settingsButton = getSettingsButton(toolbar!, editorView);
          verifySettingsButton(settingsButton, editorView);
        });

        it('displays toolbar items in correct order for embedCard inside an expand', () => {
          const { editorView } = editor(
            doc(
              '{<node>}',
              expand()(
                embedCard({
                  url: 'http://www.atlassian.com/',
                  layout: 'center',
                })(),
              ),
            ),
          );

          const toolbar = floatingToolbar(
            {
              allowBlockCards: true,
              allowEmbeds: true,
              allowResizing: true,
            },
            featureFlagsMock,
            undefined,
            undefined,
            mockPluginInjectionApi,
          )(editorView.state, intl, providerFactory);
          const toolbarItems = getToolbarItems(toolbar!, editorView);
          expect(toolbar).toBeDefined();
          expect(toolbarItems).toMatchSnapshot();

          const settingsButton = getSettingsButton(toolbar!, editorView);
          verifySettingsButton(settingsButton, editorView);
        });
      },
    );

    describe('tests `allowWrapping`, `allowAlignment` and `allowResizing` props in toolbar', () => {
      beforeEach(() => {
        mockPreview('some-preview');
        mockCardContextState();
      });
      it.each([
        {
          allowEmbeds: true,
          allowBlockCards: true,
          allowWrapping: false,
          allowAlignment: false,
          allowResizing: false,
        },
        {
          allowEmbeds: true,
          allowBlockCards: true,
          allowWrapping: false,
          allowAlignment: false,
          allowResizing: true,
        },
        {
          allowEmbeds: true,
          allowBlockCards: true,
          allowWrapping: false,
          allowAlignment: true,
          allowResizing: true,
        },
        {
          allowEmbeds: true,
          allowBlockCards: true,
          allowWrapping: false,
          allowAlignment: true,
          allowResizing: false,
        },
        {
          allowEmbeds: true,
          allowBlockCards: true,
          allowWrapping: true,
          allowAlignment: true,
          allowResizing: false,
        },
        {
          allowEmbeds: true,
          allowBlockCards: true,
          allowWrapping: true,
          allowAlignment: false,
          allowResizing: false,
        },
        {
          allowEmbeds: true,
          allowBlockCards: true,
          allowWrapping: true,
          allowAlignment: false,
          allowResizing: true,
        },
        {
          allowEmbeds: true,
          allowBlockCards: true,
          allowWrapping: true,
          allowAlignment: true,
          allowResizing: true,
        },
      ])(
        'should generate correct toolbar layout with the following toolbar config: %s',

        (toolbarConfig: CardOptions) => {
          const { editorView } = editor(
            doc(
              '{<node>}',
              embedCard({
                url: 'http://www.atlassian.com/',
                layout: 'center',
              })(),
            ),
          );

          const toolbar = floatingToolbar(
            toolbarConfig,
            featureFlagsMock,
            'web',
            undefined,
            mockPluginInjectionApi,
          )(editorView.state, intl, providerFactory);

          const toolbarItems = getToolbarItems(toolbar!, editorView);
          expect(toolbar).toBeDefined();
          expect(toolbarItems).toMatchSnapshot();
        },
      );
    });
    describe('tests `allowBlockCards` & `allowEmbeds` props in toolbar', () => {
      beforeEach(() => {
        mockPreview('some-preview');
        mockCardContextState();
      });
      it.each([
        {
          allowEmbeds: false,
          allowBlockCards: false,
        },
        {
          allowEmbeds: false,
          allowBlockCards: true,
        },
        {
          allowEmbeds: true,
          allowBlockCards: false,
        },
        {
          allowEmbeds: true,
          allowBlockCards: true,
        },
      ])(
        'displays toolbar items in correct order for inlineCard with the following toolbar config: %s',
        (toolbarConfig: CardOptions) => {
          const { editorView } = editor(
            doc(
              p(
                '{<node>}',
                inlineCard({
                  url: 'http://www.atlassian.com/',
                })(),
              ),
            ),
            toolbarConfig,
          );

          const toolbar = floatingToolbar(
            toolbarConfig,
            featureFlagsMock,
            'web',
            undefined,
            mockPluginInjectionApi,
          )(editorView.state, intl, providerFactory);
          const toolbarItems = getToolbarItems(toolbar!, editorView);
          expect(toolbar).toBeDefined();
          expect(toolbarItems).toHaveLength(9);

          const customItem: any = toolbarItems.find(
            item => item.type === 'custom',
          );
          expect(customItem).toBeDefined();

          const { getByTestId, queryByTestId } =
            customItem &&
            render(
              <MockCardContextAdapter card={cardContext}>
                {customItem.render()}
              </MockCardContextAdapter>,
            );

          // verify the correct config is present in the link switching toolbar:
          // "inline" & "url" option should always be present, whereas embed & block options should depend on the passed props
          expect(getByTestId('url-appearance')).toBeInTheDocument();
          expect(getByTestId('inline-appearance')).toBeInTheDocument();
          if (toolbarConfig.allowBlockCards) {
            expect(getByTestId('block-appearance')).toBeInTheDocument();
          } else {
            expect(queryByTestId('block-appearance')).toBeNull();
          }
          if (toolbarConfig.allowEmbeds) {
            expect(getByTestId('embed-appearance')).toBeInTheDocument();
          } else {
            expect(queryByTestId('embed-appearance')).toBeNull();
          }
        },
      );
    });

    it('has no toolbar items when url via url attr is invalid', () => {
      const { editorView } = editor(
        doc(
          p(
            '{<node>}',
            inlineCard({
              url: 'javascript:alert(document.domain)',
            })(),
          ),
        ),
      );

      const toolbar = floatingToolbar(
        {},
        featureFlagsMock,
        undefined,
        undefined,
        mockPluginInjectionApi,
      )(editorView.state, intl, providerFactory);
      expect(getToolbarItems(toolbar!, editorView).length).toEqual(0);
    });

    it('has no toolbar items when url via data attr is invalid', () => {
      const { editorView } = editor(
        doc(
          p(
            '{<node>}',
            inlineCard({
              url: 'javascript:alert(document.domain)',
            })(),
          ),
        ),
      );

      const toolbar = floatingToolbar(
        {},
        featureFlagsMock,
        undefined,
        undefined,
        mockPluginInjectionApi,
      )(editorView.state, intl, providerFactory);
      expect(getToolbarItems(toolbar!, editorView).length).toEqual(0);
    });

    it.each([
      [true, 570],
      [false, 360],
    ])(
      'when feature flag `lpLinkPicker` is %p, should provide height of %d to link picker toolbar',
      (lpLinkPicker, height) => {
        const featureFlags = { lpLinkPicker };
        const { editorView } = editor(
          doc(
            p(
              '{<node>}',
              inlineCard({
                url: 'http://www.atlassian.com/',
              })(),
            ),
          ),
        );

        const toolbar = floatingToolbar(
          {},
          featureFlags,
          undefined,
          undefined,
          mockPluginInjectionApi,
        )(editorView.state, intl, providerFactory);
        const items = getToolbarItems(toolbar!, editorView);
        const editButton = items.find(
          item => 'id' in item && item.id === 'editor.link.edit',
        ) as FloatingToolbarButton<Command>;
        editButton.onClick(editorView.state, editorView.dispatch);
        const editToolbar = floatingToolbar(
          {},
          featureFlags,
          undefined,
          undefined,
          mockPluginInjectionApi,
        )(editorView.state, intl, providerFactory);
        expect(editToolbar?.height).toBe(height);
      },
    );

    it('metadata correctly resolves url and title from plugin state', () => {
      const { editorView } = editor(
        doc(
          p(
            '{<node>}',
            inlineCard({
              url: 'http://www.atlassian.com/',
            })(),
          ),
        ),
      );

      jest.spyOn(CardUtils, 'findCardInfo').mockImplementationOnce(() => {
        return {
          title: 'hey hey hey',
          pos: 1,
        };
      });

      const toolbar = floatingToolbar(
        {
          allowBlockCards: true,
          allowEmbeds: true,
          allowResizing: true,
        },
        featureFlagsMock,
        undefined,
        undefined,
        mockPluginInjectionApi,
      )(editorView.state, intl, providerFactory);
      const toolbarItems = getToolbarItems(toolbar!, editorView);
      expect(toolbar).toBeDefined();
      expect(
        toolbarItems.filter(object => object.hasOwnProperty('metadata')),
      ).toMatchSnapshot();
    });

    it('has an unlink button for inlineCard', () => {
      const { editorView } = editor(
        doc(
          p(
            '{<node>}',
            inlineCard({
              url: 'http://www.atlassian.com/',
            })(),
          ),
        ),
      );

      const toolbar = floatingToolbar({}, featureFlagsMock)(
        editorView.state,
        intl,
        providerFactory,
      );
      expect(toolbar).toBeDefined();

      const unlinkButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === unlinkTitle,
      );

      expect(unlinkButton).toBeDefined();
      expect(unlinkButton).toMatchObject({
        icon: UnlinkIcon,
      });
    });

    it('has a remove button for blockCard', () => {
      const { editorView } = editor(
        doc(
          '{<node>}',
          blockCard({
            url: 'http://www.atlassian.com/',
          })(),
        ),
      );

      const toolbar = floatingToolbar({}, featureFlagsMock)(
        editorView.state,
        intl,
        providerFactory,
      );
      expect(toolbar).toBeDefined();

      const removeButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === removeTitle,
      );

      expect(removeButton).toBeDefined();
      expect(removeButton).toMatchObject({
        appearance: 'danger',
        icon: RemoveIcon,
      });
    });

    it('has a remove button for embedCard', () => {
      const { editorView } = editor(
        doc(
          '{<node>}',
          embedCard({
            url: 'http://www.atlassian.com/',
            layout: 'center',
          })(),
        ),
      );

      const toolbar = floatingToolbar({}, featureFlagsMock)(
        editorView.state,
        intl,
        providerFactory,
      );
      expect(toolbar).toBeDefined();

      const removeButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === removeTitle,
      );

      expect(removeButton).toBeDefined();
      expect(removeButton).toMatchObject({
        appearance: 'danger',
        icon: RemoveIcon,
      });
    });

    it('has a visit button', () => {
      const { editorView } = editor(
        doc(
          p(
            '{<node>}',
            inlineCard({
              url: 'http://www.atlassian.com/',
            })(),
          ),
        ),
      );

      const toolbar = floatingToolbar({}, featureFlagsMock)(
        editorView.state,
        intl,
        providerFactory,
      );
      expect(toolbar).toBeDefined();

      const visitButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === visitTitle,
      );

      expect(visitButton).toBeDefined();
      expect(visitButton).toMatchObject({
        icon: OpenIcon,
      });
    });

    it('opens the url in a new window defined on an inline card', () => {
      // @ts-ignore
      global.open = jest.fn();

      const { editorView } = editor(
        doc(
          p(
            '{<node>}',
            inlineCard({
              url: 'http://www.atlassian.com/',
            })(),
          ),
        ),
      );

      const toolbar = floatingToolbar(
        {},
        featureFlagsMock,
        undefined,
        undefined,
        mockPluginInjectionApi,
      )(editorView.state, intl, providerFactory);

      const visitButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === visitTitle,
      ) as FloatingToolbarButton<Command>;

      visitButton.onClick(editorView.state, editorView.dispatch);
      expect(attachAnalyticsEvent).toBeCalledWith({
        action: 'visited',
        actionSubject: 'smartLink',
        actionSubjectId: 'inlineCard',
        attributes: expect.objectContaining({
          inputMethod: 'toolbar',
        }),
        eventType: 'track',
      });
      expect(open).toBeCalledWith('http://www.atlassian.com/');
    });

    it('opens the url in a new window via data on an inline card', () => {
      // @ts-ignore
      global.open = jest.fn();

      const { editorView } = editor(
        doc(
          p(
            '{<node>}',
            inlineCard({
              data: {
                url: 'http://www.atlassian.com/',
              },
            })(),
          ),
        ),
      );

      const toolbar = floatingToolbar({}, featureFlagsMock)(
        editorView.state,
        intl,
        providerFactory,
      );
      const visitButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === visitTitle,
      ) as FloatingToolbarButton<Command>;

      visitButton.onClick(editorView.state, editorView.dispatch);
      expect(open).toBeCalledWith('http://www.atlassian.com/');
    });

    it('deletes a block card', () => {
      const { editorView } = editor(
        doc(
          p('ab'),
          '{<node>}',
          blockCard({
            url: 'http://www.atlassian.com/',
          })(),
          p('cd'),
        ),
      );

      const toolbar = floatingToolbar({}, featureFlagsMock)(
        editorView.state,
        intl,
        providerFactory,
      );
      const removeButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === removeTitle,
      ) as FloatingToolbarButton<Command>;

      removeButton.onClick(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p('ab'), p('cd')));
    });

    it('deletes an inline card', () => {
      const { editorView } = editor(
        doc(
          p(
            'ab',
            '{<node>}',
            inlineCard({
              data: {
                title: 'Welcome to Atlassian!',
                url: 'http://www.atlassian.com/',
              },
            })(),
            'cd',
          ),
        ),
      );

      const toolbar = floatingToolbar(
        {},
        featureFlagsMock,
        undefined,
        undefined,
        mockPluginInjectionApi,
      )(editorView.state, intl, providerFactory);
      const unlinkButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === unlinkTitle,
      ) as FloatingToolbarButton<Command>;

      unlinkButton.onClick(editorView.state, editorView.dispatch);
      expect(attachAnalyticsEvent).toBeCalledWith({
        action: 'unlinked',
        actionSubject: 'smartLink',
        actionSubjectId: 'inlineCard',
        attributes: expect.objectContaining({
          inputMethod: 'toolbar',
        }),
        eventType: 'track',
      });
      expect(editorView.state.doc).toEqualDocument(
        doc(p('abWelcome to Atlassian!cd')),
      );
    });

    it('deletes an embed card', () => {
      const { editorView } = editor(
        doc(
          p('ab'),
          '{<node>}',
          embedCard({
            url: 'http://www.atlassian.com/',
            layout: 'center',
          })(),
          p('cd'),
        ),
      );

      const toolbar = floatingToolbar(
        {},
        featureFlagsMock,
        undefined,
        undefined,
        mockPluginInjectionApi,
      )(editorView.state, intl, providerFactory);
      const removeButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === removeTitle,
      ) as FloatingToolbarButton<Command>;

      removeButton.onClick(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p('ab'), p('cd')));
    });

    describe('datasource toolbar', () => {
      it('has an edit button, open link button, and delete button if is a datasource with url', () => {
        const { editorView } = editor(
          doc(
            p('ab'),
            '{<node>}',
            datasourceBlockCard(datasourceWithUrlAdfAttrs)(),
            p('cd'),
          ),
        );

        const toolbar = floatingToolbar(
          { allowDatasource: true },
          featureFlagsMock,
        )(editorView.state, intl, providerFactory);

        if (!toolbar) {
          return expect(toolbar).toBeTruthy();
        }

        const editButton = getToolbarButtonByTitle(
          toolbar,
          editorView,
          editDatasourceTitle,
        );
        const visitLinkButton = getToolbarButtonByTitle(
          toolbar,
          editorView,
          visitTitle,
        );
        const removeButton = getToolbarButtonByTitle(
          toolbar,
          editorView,
          removeTitle,
        );

        expect(editButton).toBeDefined();
        expect(editButton).toMatchObject({
          icon: SmallerEditIcon,
        });

        expect(visitLinkButton).toBeDefined();
        expect(visitLinkButton).toMatchObject({
          icon: OpenIcon,
        });

        expect(removeButton).toBeDefined();
        expect(removeButton).toMatchObject({
          appearance: 'danger',
          icon: RemoveIcon,
        });
      });

      it('has an edit button and delete button, and no open link button if it is a datasource without a url', () => {
        const { editorView } = editor(
          doc(
            p('ab'),
            '{<node>}',
            datasourceBlockCard(datasourceNoUrlAdfAttrs)(),
            p('cd'),
          ),
        );

        const toolbar = floatingToolbar(
          { allowDatasource: true },
          featureFlagsMock,
        )(editorView.state, intl, providerFactory);

        if (!toolbar) {
          return expect(toolbar).toBeTruthy();
        }

        const editButton = getToolbarButtonByTitle(
          toolbar,
          editorView,
          editDatasourceTitle,
        );
        const visitLinkButton = getToolbarButtonByTitle(
          toolbar,
          editorView,
          visitTitle,
        );
        const removeButton = getToolbarButtonByTitle(
          toolbar,
          editorView,
          removeTitle,
        );

        expect(editButton).toBeDefined();
        expect(editButton).toMatchObject({
          icon: SmallerEditIcon,
        });

        expect(visitLinkButton).not.toBeDefined();

        expect(removeButton).toBeDefined();
        expect(removeButton).toMatchObject({
          appearance: 'danger',
          icon: RemoveIcon,
        });
      });

      it('visits the link in a new tab if datasource has a url', () => {
        const { editorView } = editor(
          doc(
            p('ab'),
            '{<node>}',
            datasourceBlockCard(datasourceWithUrlAdfAttrs)(),
            p('cd'),
          ),
        );

        const toolbar = floatingToolbar(
          { allowDatasource: true },
          featureFlagsMock,
        )(editorView.state, intl, providerFactory);

        if (!toolbar) {
          return expect(toolbar).toBeTruthy();
        }

        const visitLinkButton = getToolbarButtonByTitle(
          toolbar,
          editorView,
          visitTitle,
        );

        visitLinkButton.onClick(editorView.state, editorView.dispatch);
        expect(open).toBeCalledWith(mockJqlUrl);
      });

      it('deletes a datasource block card', () => {
        const { editorView } = editor(
          doc(
            p('ab'),
            '{<node>}',
            datasourceBlockCard(datasourceWithUrlAdfAttrs)(),
            p('cd'),
          ),
        );

        const toolbar = floatingToolbar(
          { allowDatasource: true },
          featureFlagsMock,
        )(editorView.state, intl, providerFactory);

        if (!toolbar) {
          return expect(toolbar).toBeTruthy();
        }

        const removeButton = getToolbarButtonByTitle(
          toolbar,
          editorView,
          removeTitle,
        );
        removeButton.onClick(editorView.state, editorView.dispatch);
        expect(editorView.state.doc).toEqualDocument(doc(p('ab'), p('cd')));
      });

      describe('shows modal after edit button is clicked when the feature flag is ON', () => {
        ffTest(
          'platform.linking-platform.datasource-jira_issues',
          () => {
            const { editorView, pluginState } = editor(
              doc(
                p('ab'),
                '{<node>}',
                datasourceBlockCard(datasourceAdfAttrsWithRealJiraId)(),
                p('cd'),
              ),
            );

            const toolbar = floatingToolbar(
              { allowDatasource: true },
              featureFlagsMock,
            )(editorView.state, intl, providerFactory);

            if (!toolbar) {
              return expect(toolbar).toBeTruthy();
            }

            expect(pluginState.datasourceModalType).toBeUndefined();
            expect(pluginState.showDatasourceModal).toEqual(false);

            const editButton = getToolbarButtonByTitle(
              toolbar,
              editorView,
              editDatasourceTitle,
            );

            editButton.onClick(editorView.state, editorView.dispatch);

            const toolbarAfterClick = floatingToolbar(
              {},
              featureFlagsMock,
              undefined,
              undefined,
              mockPluginInjectionApi,
            )(editorView.state, intl, providerFactory);

            if (!toolbarAfterClick) {
              return expect(toolbarAfterClick).toBeTruthy();
            }

            const pluginStateAfterClick = pluginKey.getState(editorView.state);
            expect(pluginStateAfterClick?.datasourceModalType).toEqual('jira');
            expect(pluginStateAfterClick?.showDatasourceModal).toEqual(true);
          },
          () => {
            const { editorView, pluginState } = editor(
              doc(
                p('ab'),
                '{<node>}',
                datasourceBlockCard(datasourceAdfAttrsWithRealJiraId)(),
                p('cd'),
              ),
            );

            const toolbar = floatingToolbar({}, featureFlagsMock)(
              editorView.state,
              intl,
              providerFactory,
            );

            if (!toolbar) {
              return expect(toolbar).toBeTruthy();
            }

            expect(pluginState.datasourceModalType).toBeUndefined();
            expect(pluginState.showDatasourceModal).toEqual(false);

            const editButton = getToolbarButtonByTitle(
              toolbar,
              editorView,
              'Edit link',
            );

            editButton.onClick(editorView.state, editorView.dispatch);

            const pluginStateAfterClick = pluginKey.getState(editorView.state);
            expect(pluginStateAfterClick?.datasourceModalType).toBeUndefined();
            expect(pluginStateAfterClick?.showDatasourceModal).toEqual(false);
          },
        );
      });

      describe('when using feature flag', () => {
        ffTest(
          'platform.linking-platform.datasource-jira_issues',
          () => {
            const { editorView } = editor(
              doc(
                p('ab'),
                '{<node>}',
                datasourceBlockCard(datasourceAdfAttrsWithRealJiraId)(),
                p('cd'),
              ),
            );

            const toolbar = floatingToolbar(
              { allowDatasource: true },
              featureFlagsMock,
            )(editorView.state, intl, providerFactory);

            if (!toolbar) {
              return expect(toolbar).toBeTruthy();
            }

            const editButton = getToolbarButtonByTitle(
              toolbar,
              editorView,
              editDatasourceTitle,
            );

            expect(editButton).toBeDefined();
            expect(editButton).toMatchObject({
              icon: SmallerEditIcon,
            });
          },
          () => {
            const { editorView } = editor(
              doc(
                p('ab'),
                '{<node>}',
                datasourceBlockCard(datasourceAdfAttrsWithRealJiraId)(),
                p('cd'),
              ),
            );

            const toolbar = floatingToolbar({}, featureFlagsMock)(
              editorView.state,
              intl,
              providerFactory,
            );

            if (!toolbar) {
              return expect(toolbar).toBeTruthy();
            }

            const editButton = getToolbarButtonByTitle(
              toolbar,
              editorView,
              'Edit link',
            );

            expect(editButton).toBeDefined();
          },
        );
      });
    });
  });
});