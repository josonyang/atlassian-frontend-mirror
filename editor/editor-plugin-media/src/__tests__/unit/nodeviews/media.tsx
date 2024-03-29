import React from 'react';

import { render } from '@testing-library/react';

import {
  defaultSchema,
  getSchemaBasedOnStage,
} from '@atlaskit/adf-schema/schema-default';
import type { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import type { PortalProviderAPI } from '@atlaskit/editor-common/portal-provider';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type { MediaProvider } from '@atlaskit/editor-common/provider-factory';
import type { ProsemirrorGetPosHandler } from '@atlaskit/editor-common/react-node-view';
import { browser } from '@atlaskit/editor-common/utils';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { border, media } from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { fakeMediaProvider } from '@atlaskit/editor-test-helpers/media-provider';
import type { NumericalCardDimensions } from '@atlaskit/media-card';
import type { MediaFeatureFlags } from '@atlaskit/media-common';

import { ReactMediaNode } from '../../../nodeviews/mediaNodeView';
import Media from '../../../nodeviews/mediaNodeView/media';
import { stateKey as mediaStateKey } from '../../../pm-plugins/main';
import type { MediaPluginState } from '../../../pm-plugins/types';
import type { MediaOptions } from '../../../types';

const getMockWidthInjectionApi: any = (width: number) => ({
  width: {
    sharedState: {
      currentState() {
        return { width };
      },
      onChange() {
        return () => {};
      },
    },
  },
});

describe('nodeviews/media', () => {
  let providerFactory = {} as ProviderFactory;
  let mediaProvider: Promise<MediaProvider>;
  let pluginState: MediaPluginState;
  let view: EditorView;
  let getPos: ProsemirrorGetPosHandler;
  let cardDimensions: NumericalCardDimensions;

  const mediaNode = media({
    id: 'foo',
    type: 'file',
    collection: 'collection',
    width: 400,
    height: 300,
  });

  const externalMediaNode = media({
    type: 'external',
    url: 'http://example.com/1920x1080.jpg',
  });

  const mediaBlobNode = media({
    type: 'external',
    url: 'blob:http://example.com/dd8bd6d8-cd55-0f42-a159-a3d04bd63ac4#media-blob-url=true&id=d4df0829-1215-41ec-a83f-412543d30025&collection=MediaServicesSample&contextId=DUMMY-OBJECT-ID&mimeType=image%2Fpng&name=image-20200623-053610.png&size=422247&width=680&height=382',
  });

  const mediaNodeWithBorder = border({ color: '#091E4224', size: 3 })(
    media({
      id: 'a559980d-cd47-43e2-8377-27359fcb905f',
      type: 'file',
      collection: 'MediaServicesSample',
    })(),
  )(getSchemaBasedOnStage('stage0'));

  beforeEach(async () => {
    providerFactory = ProviderFactory.create({ mediaProvider });
    pluginState = {} as MediaPluginState;
    mediaProvider = fakeMediaProvider();
    view = {} as EditorView;
    getPos = jest.fn();
    cardDimensions = {} as NumericalCardDimensions;

    jest.spyOn(mediaStateKey, 'getState').mockImplementation(() => pluginState);
    pluginState.handleMediaNodeMount = jest.fn();
    pluginState.handleMediaNodeUnmount = jest.fn();
    pluginState.updateElement = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('passes url prop for external images', async () => {
    const { findByTestId } = render(
      <Media
        node={externalMediaNode()(defaultSchema)}
        getPos={getPos}
        view={view}
        originalDimensions={cardDimensions}
        maxDimensions={cardDimensions}
        selected={false}
        onExternalImageLoaded={jest.fn()}
      />,
    );

    const card = await findByTestId('media-image');

    expect((card as HTMLImageElement).src).toEqual(
      'http://example.com/1920x1080.jpg',
    );
  });

  it('passes feature flag to Card component', async () => {
    const featureFlags = { someFlag: true } as MediaFeatureFlags;
    const mediaOptions = {
      featureFlags,
    };

    const { findByTestId } = render(
      <Media
        view={view}
        node={externalMediaNode()(defaultSchema)}
        getPos={getPos}
        selected={false}
        mediaProvider={mediaProvider}
        originalDimensions={cardDimensions}
        maxDimensions={cardDimensions}
        mediaOptions={mediaOptions}
      />,
    );

    const card = await findByTestId('media-card-view');
    expect(card.id).toBe('newFileExperienceWrapper');
  });

  describe('border marks', () => {
    it('Media node should render border marks with right size', async () => {
      const { findByTestId } = render(
        <Media
          node={mediaNodeWithBorder[0]}
          getPos={getPos}
          view={view}
          originalDimensions={cardDimensions}
          maxDimensions={cardDimensions}
          selected={false}
          mediaProvider={mediaProvider}
          onExternalImageLoaded={jest.fn()}
        />,
      );

      const image = await findByTestId('media-card-wrapper');

      const containerStyle = window.getComputedStyle(image);

      expect(containerStyle).toHaveProperty('borderWidth', '3px');
      expect(containerStyle).toHaveProperty('borderRadius', '6px');
    });
  });

  describe('media node view', () => {
    const createView = (anchorPos: number, headPos: number) =>
      ({
        state: {
          selection: {
            from: 0,
            to: 0,
            $anchor: {
              pos: anchorPos,
            },
            $head: {
              pos: headPos,
            },
          },
        },
      } as EditorView);

    const mediaOptions: MediaOptions = {};
    const portalProviderAPI: PortalProviderAPI = {
      render(component: () => React.ReactChild | null) {
        component();
      },
      remove() {},
    } as any;
    const eventDispatcher = {} as EventDispatcher;

    describe('media node', () => {
      it('correctly sets maxDimensions', async () => {
        const getPos = () => 12;
        const node = mediaNode()(defaultSchema);
        const testView = createView(0, 0);
        const nodeView = ReactMediaNode(
          portalProviderAPI,
          eventDispatcher,
          providerFactory,
          mediaOptions,
          getMockWidthInjectionApi(640),
        )(node, testView, getPos);

        const { findByTestId } = render(nodeView.render());

        const image = await findByTestId('media-card-view');

        // editorWidth.width
        expect(window.getComputedStyle(image).width).toBe('100%');
        // (height / width) * editorWidth.width is the current formula
        expect(window.getComputedStyle(image).height).toBe('100%');
      });

      it('correctly sets contenteditable', () => {
        mediaOptions.allowMediaSingleEditable = true;
        browser.chrome = true;
        const node = mediaNode()(defaultSchema);
        const testView = createView(0, 0);
        const nodeView = ReactMediaNode(
          portalProviderAPI,
          eventDispatcher,
          providerFactory,
          mediaOptions,
          undefined,
        )(node, testView, getPos);

        const elem = nodeView.createDomRef();
        expect(elem.contentEditable).toBe('true');
      });
    });

    describe('media blob node', () => {
      it('correctly sets width and height', async () => {
        const getPos = () => 12;
        const node = mediaBlobNode()(defaultSchema);
        const testView = createView(9, 12);
        const nodeView = ReactMediaNode(
          portalProviderAPI,
          eventDispatcher,
          providerFactory,
          mediaOptions,
          getMockWidthInjectionApi(640),
        )(node, testView, getPos);

        const { findByTestId } = render(nodeView.render());

        const image = await findByTestId('media-card-view');

        expect(window.getComputedStyle(image).width).toBe('100%');
        expect(window.getComputedStyle(image).height).toBe('100%');
      });
    });
  });
});
