import { storyContextIdentifierProviderFactory } from '@atlaskit/editor-test-helpers/context-identifier-provider';
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';

import type { DocBuilder } from '@atlaskit/editor-test-helpers/doc-builder';
import {
  bodiedExtension,
  doc,
  layoutColumn,
  layoutSection,
  li,
  media,
  mediaSingle,
  p,
  table,
  td,
  tr,
  ul,
} from '@atlaskit/editor-test-helpers/doc-builder';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
/**
 * TS 3.9+ defines non-configurable property for exports, that's why it's not possible to mock them like this anymore:
 *
 * ```
 * import * as tableUtils from '../../../../../plugins/table/utils';
 * jest.spyOn(tableUtils, 'getColumnsWidths')
 * ```
 *
 * This is a workaround: https://github.com/microsoft/TypeScript/issues/38568#issuecomment-628637477
 */
jest.mock('@atlaskit/media-client', () => ({
  __esModule: true,
  ...jest.requireActual<Object>('@atlaskit/media-client'),
}));
import { createIntl } from 'react-intl-next';
import commonMessages from '../../../../../messages';
import { messages as altTextMessages } from '../../../../../plugins/media/pm-plugins/alt-text/messages';
import type { FloatingToolbarItem } from '@atlaskit/editor-common/types';
import type { MediaOptions } from '../../../../../plugins/media/types';
import { stateKey } from '../../../../../plugins/media/pm-plugins/main';
import { floatingToolbar } from '../../../../../plugins/media/toolbar';
import { mediaAndEmbedToolbarMessages as toolbarMessages } from '@atlaskit/editor-common/messages';
import { setNodeSelection } from '../../../../../utils';
import {
  getFreshMediaProvider,
  temporaryFileId,
  testCollectionName,
} from '../_utils';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import {
  getToolbarItems,
  findToolbarBtn,
} from '../../../../../plugins/floating-toolbar/__tests__/_helpers';
import type { Command } from '../../../../../types';
import type { MediaPluginState } from '../../../../../plugins/media/pm-plugins/types';
import { ffTest } from '@atlassian/feature-flags-test-utils';

describe('media', () => {
  const createEditor = createEditorFactory<MediaPluginState>();

  let createAnalyticsEvent: jest.Mock<any>;

  const editor = (doc: DocBuilder, mediaPropsOverride: MediaOptions = {}) => {
    const contextIdentifierProvider = storyContextIdentifierProviderFactory();
    const providerFactory = ProviderFactory.create({
      contextIdentifierProvider,
    });
    return createEditor({
      doc,
      editorProps: {
        media: {
          provider: getFreshMediaProvider(),
          allowMediaSingle: true,
          ...mediaPropsOverride,
        },
        allowExtension: true,
        allowLayouts: true,
        allowTables: true,
        allowAnalyticsGASV3: true,
        contextIdentifierProvider,
      },
      providerFactory,
      createAnalyticsEvent,
      pluginKey: stateKey,
    });
  };

  const temporaryMedia = media({
    id: temporaryFileId,
    type: 'file',
    collection: testCollectionName,
    __fileMimeType: 'image/png',
    width: 100,
    height: 100,
  })();

  const temporaryMediaSingle = mediaSingle({ layout: 'center' })(
    temporaryMedia,
  );

  const docWithMediaSingle = doc(temporaryMediaSingle);

  beforeEach(() => {
    createAnalyticsEvent = jest.fn().mockReturnValue({
      fire() {},
    });
  });

  describe('toolbar', () => {
    const intl = createIntl({
      locale: 'en',
    });

    const removeTitle = intl.formatMessage(commonMessages.remove);

    it('has a remove button', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(editorView.state, intl, {}, undefined);
      expect(toolbar).toBeDefined();
      const removeButton = findToolbarBtn(
        getToolbarItems(toolbar!, editorView),
        removeTitle,
      );

      expect(removeButton).toBeDefined();
      expect(removeButton).toMatchObject({
        appearance: 'danger',
        icon: RemoveIcon,
      });
    });

    it('should render alt text button when enabled', () => {
      const { editorView } = editor(docWithMediaSingle, {
        allowAltTextOnImages: true,
      });
      setNodeSelection(editorView, 0);

      const altTextTitle = intl.formatMessage(altTextMessages.altText);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        {
          allowAltTextOnImages: true,
        },
        undefined,
      );

      const button = findToolbarBtn(
        getToolbarItems(toolbar!, editorView),
        altTextTitle,
      );

      expect(button).toBeDefined();
    });

    it('should render alignment, wrapping and breakout buttons in full page without resizing enabled', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        {
          allowAdvancedToolBarOptions: true,
        },
        undefined,
      );
      expect(toolbar).toBeDefined();
      expect(getToolbarItems(toolbar!, editorView).length).toEqual(11);
    });

    it('should only render alignment and wrapping buttons in full page when resizing is enabled', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        {
          allowResizing: true,
          allowAdvancedToolBarOptions: true,
        },
        undefined,
      );
      expect(toolbar).toBeDefined();
      expect(getToolbarItems(toolbar!, editorView).length).toEqual(8);
    });

    it('should not render any layout buttons when in comment', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        {
          allowResizing: true,
          allowAdvancedToolBarOptions: false,
        },
        undefined,
      );
      expect(toolbar).toBeDefined();
      expect(getToolbarItems(toolbar!, editorView).length).toEqual(1);
    });

    it('should not render any layout buttons when inside a macro', () => {
      const { editorView } = editor(
        doc(
          bodiedExtension({
            extensionKey: 'extensionKey',
            extensionType: 'bodiedExtension',
          })(temporaryMediaSingle),
        ),
      );

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        {
          allowResizing: true,
          allowAdvancedToolBarOptions: true,
        },
        undefined,
      );
      expect(toolbar).toBeDefined();
      expect(getToolbarItems(toolbar!, editorView).length).toEqual(1);
    });

    it('should render layout buttons when inside columns', () => {
      const { editorView } = editor(
        doc(
          layoutSection(
            layoutColumn({ width: 50 })(p('')),
            layoutColumn({ width: 50 })(temporaryMediaSingle),
          ),
        ),
      );

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        {
          allowResizing: true,
          allowAdvancedToolBarOptions: true,
        },
        undefined,
      );
      const findToolbarBtnByName = findToolbarBtn.bind(
        null,
        toolbar!.items as Array<FloatingToolbarItem<Command>>,
      );
      expect(toolbar).toBeDefined();
      expect(
        findToolbarBtnByName(commonMessages.alignImageLeft.defaultMessage),
      ).toBeDefined();
      expect(
        findToolbarBtnByName(commonMessages.alignImageCenter.defaultMessage),
      ).toBeDefined();
      expect(
        findToolbarBtnByName(commonMessages.alignImageRight.defaultMessage),
      ).toBeDefined();
      expect(
        findToolbarBtnByName(toolbarMessages.wrapLeft.defaultMessage),
      ).toBeDefined();
      expect(
        findToolbarBtnByName(toolbarMessages.wrapRight.defaultMessage),
      ).toBeDefined();
    });

    it('should not render any layout buttons when inside a list item', () => {
      const { editorView } = editor(doc(ul(li(temporaryMediaSingle))));

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        {
          allowResizing: true,
          allowAdvancedToolBarOptions: true,
        },
        undefined,
      );
      expect(toolbar).toBeDefined();
      expect(getToolbarItems(toolbar!, editorView).length).toEqual(1);
    });

    it('should render layout buttons when inside a table and allowResizingInTable is enabled', () => {
      const { editorView } = editor(
        doc(table()(tr(td()(temporaryMediaSingle)))),
        {
          allowResizing: true,
          allowResizingInTables: true,
        },
      );

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        {
          allowResizing: true,
          allowAdvancedToolBarOptions: true,
          allowResizingInTables: true,
        },
        undefined,
      );
      expect(toolbar).toBeDefined();
      expect(getToolbarItems(toolbar!, editorView).length).toEqual(8);
    });

    it('should not render layout buttons when inside a table and allowResizingInTable is disabled', () => {
      const { editorView } = editor(
        doc(table()(tr(td()(temporaryMediaSingle)))),
      );

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        {
          allowResizing: true,
          allowAdvancedToolBarOptions: true,
        },
        undefined,
      );
      expect(toolbar).toBeDefined();
      expect(getToolbarItems(toolbar!, editorView).length).toEqual(1);
    });

    it('deletes a media single', () => {
      const { editorView } = editor(docWithMediaSingle);
      setNodeSelection(editorView, 0);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        undefined,
        undefined,
      );
      const removeButton = findToolbarBtn(
        getToolbarItems(toolbar!, editorView),
        removeTitle,
      );

      removeButton.onClick(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p()));
    });

    it('aligns a media single to the left', () => {
      const { editorView } = editor(docWithMediaSingle);
      setNodeSelection(editorView, 0);

      const analyticsFn = jest.fn().mockImplementation(() => () => {});
      const mockPluginInjectionApi: any = {
        dependencies: {
          width: {
            sharedState: {
              currentState() {
                return {
                  lineLength: null,
                };
              },
            },
          },
          decorations: {
            actions: {
              hoverDecoration: () => () => {},
            },
          },
          analytics: {
            actions: {
              attachAnalyticsEvent: analyticsFn,
            },
          },
        },
      };

      const alignLeftTitle = intl.formatMessage(commonMessages.alignImageLeft);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        {
          allowResizing: true,
          allowAdvancedToolBarOptions: true,
        },
        mockPluginInjectionApi,
      );

      const button = findToolbarBtn(
        getToolbarItems(toolbar!, editorView),
        alignLeftTitle,
      );

      button.onClick(editorView.state, editorView.dispatch);
      expect(analyticsFn).toBeCalled();
      expect(editorView.state.doc).toEqualDocument(
        doc(mediaSingle({ layout: 'align-start' })(temporaryMedia)),
      );
    });

    describe('should render only pixel size input component when resizing', () => {
      ffTest(
        'platform.editor.media.extended-resize-experience',
        async () => {
          const { editorView } = editor(docWithMediaSingle);
          const mediaPluginState: MediaPluginState | undefined =
            stateKey.getState(editorView.state);
          mediaPluginState?.setIsResizing(true);

          const toolbar = floatingToolbar(
            editorView.state,
            intl,
            {
              allowResizing: true,
              allowAdvancedToolBarOptions: true,
            },
            undefined,
          );
          expect(toolbar!.items.length).toBe(1);
        },
        async () => {
          const { editorView } = editor(docWithMediaSingle);
          const mediaPluginState: MediaPluginState | undefined =
            stateKey.getState(editorView.state);
          mediaPluginState?.setIsResizing(true);

          const toolbar = floatingToolbar(
            editorView.state,
            intl,
            {
              allowResizing: true,
              allowAdvancedToolBarOptions: true,
            },
            undefined,
          );
          expect(toolbar!.items.length).toBe(9);
        },
      );
    });
  });
});
