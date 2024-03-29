// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';

import { render, screen } from '@testing-library/react';

import { PanelType } from '@atlaskit/adf-schema';
import { PanelSharedCssClassName } from '@atlaskit/editor-common/panel';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import type { DocBuilder } from '@atlaskit/editor-common/types';
import { decorationsPlugin } from '@atlaskit/editor-plugin-decorations';
// eslint-disable-next-line import/no-extraneous-dependencies
import { panelPlugin } from '@atlaskit/editor-plugin-panel';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { LightEditorPlugin } from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  createProsemirrorEditorFactory,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, p, panel } from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import defaultSchema from '@atlaskit/editor-test-helpers/schema';
import { ResourcedEmoji } from '@atlaskit/emoji/element';
import { getTestEmojiResource } from '@atlaskit/util-data-test/get-test-emoji-resource';

import { getPanelNodeView, PanelIcon } from '../../nodeviews/panel';
import type { PanelPluginOptions } from '../../types';

jest.mock('@atlaskit/emoji/element');

describe('Panel - NodeView', () => {
  const createEditor = createProsemirrorEditorFactory();
  const renderEmojiSpy = jest.fn();
  let providerFactory: ProviderFactory;
  const emojiProvider = getTestEmojiResource();
  (ResourcedEmoji as unknown as jest.Mock).mockImplementation(() => {
    return {
      render: renderEmojiSpy,
    };
  });

  beforeEach(() => {
    providerFactory = ProviderFactory.create({ emojiProvider });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a contentDOM of `div` inside `div[data-panel-type]`', () => {
    const { editorView } = createEditor({
      doc: doc(p()),
    });

    const node = panel()(p('this is the decision'))(defaultSchema);

    const providerFactory = ProviderFactory.create({});
    const panelPluginOptions: PanelPluginOptions = {};
    const nodeView = getPanelNodeView(panelPluginOptions, providerFactory)(
      node,
      editorView,
      () => -1,
    );

    const contentDOM = nodeView!.contentDOM as HTMLElement;

    expect(contentDOM.tagName).toBe('DIV');
    expect(contentDOM.parentElement!.tagName).toBe('DIV');
    expect(contentDOM.parentElement!.getAttribute('data-panel-type')).toBe(
      'info',
    );
  });

  describe('PanelIcon', () => {
    const standardPanelTypes = Object.values(PanelType).filter(
      panelType => panelType !== PanelType.CUSTOM,
    );

    it.each<PanelType>(standardPanelTypes)(
      'renders panelIcon according to standard panel type %s',
      panelType => {
        render(
          <PanelIcon
            panelAttributes={{
              panelType: panelType,
            }}
          />,
        );
        expect(screen.getByLabelText(`Panel ${panelType}`)).toBeInTheDocument();
      },
    );

    it('renders emojiIcon for custom panel type', () => {
      render(
        <PanelIcon
          allowCustomPanel={true}
          providerFactory={providerFactory}
          panelAttributes={{
            panelType: PanelType.CUSTOM,
            panelIcon: ':smiley:',
          }}
        />,
      );
      expect(ResourcedEmoji).toBeCalledWith(
        expect.objectContaining({
          showTooltip: false,
          emojiId: expect.objectContaining({
            shortName: ':smiley:',
          }),
        }),
        {},
      );
    });
  });

  describe('custom panels', () => {
    const testDocWithPanel = doc(
      panel({
        panelType: 'custom',
        panelIcon: ':smiley:',
        panelColor: 'rgb(0, 255, 0)',
        panelIconId: '1f603',
        panelIconText: '😃',
      })(p('custom panel')),
    );

    const testDocWithWrongShortNameAndId = doc(
      panel({
        panelType: 'custom',
        panelIcon: ':smileyy:',
        panelColor: 'rgb(0, 255, 0)',
        panelIconId: '1f603',
      })(p('custom panel')),
    );

    const testDocWithWrongShortNameAndFallback = doc(
      panel({
        panelType: 'custom',
        panelIcon: ':smileyy:',
        panelColor: 'rgb(0, 255, 0)',
        panelIconText: '😃',
      })(p('custom panel')),
    );

    function setupEditor(
      allowCustomPanel: boolean = false,
      allowEditCustomPanel: boolean = false,
      document: DocBuilder,
    ) {
      const editorData = createEditor({
        doc: document,
        preset: new Preset<LightEditorPlugin>().add(decorationsPlugin).add([
          panelPlugin,
          {
            allowCustomPanel: allowCustomPanel,
          },
        ]),
        providerFactory,
      });
      const editorView = editorData.editorView;
      const panelElement = editorView.dom.firstChild as HTMLElement;
      return { editorView, panelElement };
    }

    it('renders panel with emoji and color when feature flag enabled', () => {
      const { panelElement } = setupEditor(true, true, testDocWithPanel);
      expect(panelElement.getAttribute('data-panel-type')).toBe('custom');
      expect(panelElement.getAttribute('data-panel-color')).toBe(
        'rgb(0, 255, 0)',
      );
      expect(ResourcedEmoji).toBeCalledWith(
        expect.objectContaining({
          emojiId: {
            fallback: '😃',
            id: '1f603',
            shortName: ':smiley:',
          },
          emojiProvider: emojiProvider,
          fitToHeight: 20,
          showTooltip: false,
        }),
        expect.any(Object),
      );
      expect(renderEmojiSpy).toHaveBeenCalled();
    });

    it('renders panel with icon using emojiId when shortName is incorrect and feature flag enabled', () => {
      const { panelElement } = setupEditor(
        true,
        true,
        testDocWithWrongShortNameAndId,
      );
      expect(panelElement.getAttribute('data-panel-type')).toBe('custom');
      expect(panelElement.getAttribute('data-panel-color')).toBe(
        'rgb(0, 255, 0)',
      );

      expect(ResourcedEmoji).toBeCalledWith(
        expect.objectContaining({
          emojiId: {
            fallback: null,
            id: '1f603',
            shortName: ':smileyy:',
          },
          emojiProvider: emojiProvider,
          fitToHeight: 20,
          showTooltip: false,
        }),
        expect.any(Object),
      );
      expect(renderEmojiSpy).toHaveBeenCalled();
    });

    it('renders panel with icon using fallback when shortName is incorrect and feature flag enabled', () => {
      const { panelElement } = setupEditor(
        true,
        true,
        testDocWithWrongShortNameAndFallback,
      );
      expect(panelElement.getAttribute('data-panel-type')).toBe('custom');
      expect(panelElement.getAttribute('data-panel-color')).toBe(
        'rgb(0, 255, 0)',
      );
      expect(ResourcedEmoji).toBeCalledWith(
        expect.objectContaining({
          emojiId: {
            fallback: '😃',
            id: null,
            shortName: ':smileyy:',
          },
          emojiProvider: emojiProvider,
          fitToHeight: 20,
          showTooltip: false,
        }),
        expect.any(Object),
      );
      expect(renderEmojiSpy).toHaveBeenCalled();
    });

    it('does not render panel with emoji and color when feature flag disabled', () => {
      const { panelElement } = setupEditor(false, false, testDocWithPanel);
      expect(panelElement.style.backgroundColor).toEqual('');
      expect(panelElement.getAttribute('data-panel-type')).toBe('custom');
      expect(ResourcedEmoji).not.toHaveBeenCalled();
    });

    it('renders panel icon as NOT content-editable element', () => {
      const { panelElement } = setupEditor(true, true, testDocWithPanel);
      expect(
        (
          panelElement.querySelector(
            `.${PanelSharedCssClassName.icon}`,
          ) as HTMLElement
        ).contentEditable,
      ).toEqual('false');
    });
  });

  describe('mutation', () => {
    it(`should ignore mutations inside panel nodeview`, () => {
      const { editorView } = createEditor({
        doc: doc(p()),
      });

      const node = panel()(p('this is the decision'))(defaultSchema);

      const providerFactory = ProviderFactory.create({});
      const panelPluginOptions: PanelPluginOptions = {};
      const nodeView = getPanelNodeView(panelPluginOptions, providerFactory)(
        node,
        editorView,
        () => -1,
      );

      const mutation = {
        type: 'selection',
        target: nodeView.icon,
      } as const;

      expect(nodeView.ignoreMutation!(mutation)).toBe(true);
    });
  });
});
