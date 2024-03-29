jest.mock('../../utils/ufoExperiences', () => {
  const actualModule = jest.requireActual('../../utils/ufoExperiences');
  return {
    __esModule: true,
    ...actualModule,
    startUfoExperience: jest.fn(actualModule.startUfoExperience),
    completeUfoExperience: jest.fn(actualModule.completeUfoExperience),
    abortUfoExperience: jest.fn(actualModule.abortUfoExperience),
  };
});
jest.mock('../../card/cardAnalytics', () => {
  const actualModule = jest.requireActual('../../card/cardAnalytics');
  return {
    __esModule: true,
    ...actualModule,
    fireOperationalEvent: jest.fn(actualModule.fireOperationalEvent),
    fireNonCriticalErrorEvent: jest.fn(actualModule.fireNonCriticalErrorEvent),
    fireCopiedEvent: jest.fn(actualModule.fireCopiedEvent),
    fireCommencedEvent: jest.fn(actualModule.fireCommencedEvent),
    fireScreenEvent: jest.fn(actualModule.fireScreenEvent),
  };
});
jest.mock('@atlaskit/media-client-react', () => {
  const actualModule = jest.requireActual('@atlaskit/media-client-react');
  return {
    __esModule: true,
    ...actualModule,
    useFileState: jest.fn(actualModule.useFileState),
  };
});

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardV2Loader from '../../card/v2/cardV2Loader';
import React from 'react';
import { MediaFileStateError } from '@atlaskit/media-client-react';
import { MockedMediaClientProvider } from '@atlaskit/media-client-react/test-helpers';
import {
  createMockedMediaApi,
  fileMap,
} from '../../card/v2/__tests__/utils/_createMediaClient';
import { videoURI } from '@atlaskit/media-test-helpers';
import {
  imgTestId,
  spinnerTestId,
  cardTestId,
  mediaViewerTestId,
  titleBoxTestId,
} from '../utils/_testIDs';
import {
  MediaClientConfig,
  globalMediaEventEmitter,
} from '@atlaskit/media-client';
import { getFileStreamsCache } from '@atlaskit/media-client';
import { IntlProvider } from 'react-intl-next';
import cardPreviewCache from '../../card/getCardPreview/cache';
import {
  completeUfoExperience,
  abortUfoExperience,
} from '../../utils/ufoExperiences';
import {
  fireNonCriticalErrorEvent,
  fireOperationalEvent,
  fireCommencedEvent,
  fireScreenEvent,
} from '../../card/cardAnalytics';
import { MediaCardError } from '../../errors';
import { MockIntersectionObserver } from '../../utils/mockIntersectionObserver';
import { useFileState } from '@atlaskit/media-client-react';

const dummyMediaClientConfig = {} as MediaClientConfig;

const GLOBAL_MEDIA_CARD_SSR = 'mediaCardSsr';
const GLOBAL_MEDIA_NAMESPACE = '__MEDIA_INTERNAL';

const setGlobalSSRData = (id: string, data: any) => {
  // @ts-ignore
  window[GLOBAL_MEDIA_NAMESPACE] = { [GLOBAL_MEDIA_CARD_SSR]: { [id]: data } };
};

describe('Card V2', () => {
  let currentObserver: any;
  const intersectionObserver = new MockIntersectionObserver();

  const makeVisible = () => {
    act(() => {
      intersectionObserver.triggerIntersect({
        target: currentObserver,
        isIntersecting: true,
      });
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();

    const actualUseFileState = jest.requireActual(
      '@atlaskit/media-client-react',
    ).useFileState;
    (useFileState as jest.Mock).mockImplementation(jest.fn(actualUseFileState));

    jest.spyOn(globalMediaEventEmitter, 'emit');
    jest.spyOn(performance, 'now').mockReturnValue(1000);

    intersectionObserver.setup({
      observe: (elem?: any) => {
        currentObserver = elem;
      },
      disconnect: () => {},
    });

    // @ts-ignore
    delete window[GLOBAL_MEDIA_NAMESPACE];
  });

  afterEach(() => {
    jest.restoreAllMocks();

    // clear preview cache
    cardPreviewCache.clear();

    // clear file streams cache so that the state
    // that is not managed by media-state will be reset
    getFileStreamsCache().removeAll();

    intersectionObserver.cleanup();
  });

  describe('should manage lazy loading', () => {
    it('should lazy load by default', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
          />
        </MockedMediaClientProvider>,
      );

      // ensure that an img is never rendered
      await expect(screen.findByTestId(imgTestId)).rejects.toThrow();

      // should not render A title box
      expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
      expect(
        screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('04 Aug 2023, 01:40 AM'),
      ).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

      // should not render a file type icon
      expect(screen.queryByLabelText('pdf')).not.toBeInTheDocument();

      // should render a spinner icon
      expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
    });

    it('should load image when card comes into view', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
          />
        </MockedMediaClientProvider>,
      );

      // wait for ViewportDetector to be mounted before turning the card visible
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="loading"]'),
        ).toBeInTheDocument(),
      );
      makeVisible();

      const img = await screen.findByTestId(imgTestId);
      expect(img).toBeInTheDocument();
    });

    it('should set loading img to lazy if lazy load is enabled and there is SSR data-preview', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const expectedPreview = {
        dataURI: 'global-scope-datauri',
        source: 'ssr-data',
      };
      const { id, collection } = fileMap.workingImgWithRemotePreview;
      const identifier = {
        mediaItemType: 'file',
        id,
        collectionName: collection,
      } as const;

      setGlobalSSRData(`${id}-${collection}`, expectedPreview);

      render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={true}
            ssr="client"
          />
        </MockedMediaClientProvider>,
      );

      expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
      const img: HTMLImageElement = await screen.findByTestId(imgTestId);
      expect(img.getAttribute('loading')).toEqual('lazy');
    });

    it('should reuse dataURI from global scope when ssr is client', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const expectedPreview = {
        dataURI: 'global-scope-datauri',
        source: 'ssr-data',
      };
      const { id, collection } = fileMap.workingImgWithRemotePreview;
      const identifier = {
        mediaItemType: 'file',
        id,
        collectionName: collection,
      } as const;

      setGlobalSSRData(`${id}-${collection}`, expectedPreview);

      render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            ssr="client"
          />
        </MockedMediaClientProvider>,
      );

      const img: HTMLImageElement = await screen.findByTestId(imgTestId);
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('global-scope-datauri');
    });

    it('should reuse local img when the SSR data-preview dimensions are larger than the image dimensions', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const expectedPreview = {
        dataURI: 'global-scope-datauri',
        source: 'ssr-data',
        dimensions: { width: 100, height: 100 },
      };
      const { id, collection } = fileMap.workingImgWithRemotePreview;
      const identifier = {
        mediaItemType: 'file',
        id,
        collectionName: collection,
      } as const;

      setGlobalSSRData(`${id}-${collection}`, expectedPreview);

      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            dimensions={{ width: 50, height: 50 }}
            ssr="client"
          />
        </MockedMediaClientProvider>,
      );

      // wait for ViewportDetector to be mounted before turning the card visible
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="loading"]'),
        ).toBeInTheDocument(),
      );
      makeVisible();

      const img: HTMLImageElement = await screen.findByTestId(imgTestId);
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('global-scope-datauri');
    });

    it('should refetch img when there is SSR data-preview and the dimensions are bigger', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const expectedPreview = {
        dataURI: 'global-scope-datauri',
        source: 'ssr-data',
        dimensions: { width: 100, height: 100 },
      };
      const { id, collection } = fileMap.workingImgWithRemotePreview;
      const identifier = {
        mediaItemType: 'file',
        id,
        collectionName: collection,
      } as const;

      setGlobalSSRData(`${id}-${collection}`, expectedPreview);

      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            dimensions={{ width: 500, height: 500 }}
            ssr="client"
          />
        </MockedMediaClientProvider>,
      );

      // wait for ViewportDetector to be mounted before turning the card visible
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="loading"]'),
        ).toBeInTheDocument(),
      );
      makeVisible();

      const img: HTMLImageElement = await screen.findByTestId(imgTestId);
      expect(img).toBeInTheDocument();

      // expect card to refetch the img
      await waitFor(() =>
        expect(img.src).not.toContain('global-scope-datauri'),
      );
      expect(img.src).toContain('http://localhost/');
    });

    it('should refetch img when there is SSR data-preview and the dimensions are bigger and no lazy loading', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const expectedPreview = {
        dataURI: 'global-scope-datauri',
        source: 'ssr-data',
        dimensions: { width: 100, height: 100 },
      };
      const { id, collection } = fileMap.workingImgWithRemotePreview;
      const identifier = {
        mediaItemType: 'file',
        id,
        collectionName: collection,
      } as const;

      setGlobalSSRData(`${id}-${collection}`, expectedPreview);

      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            dimensions={{ width: 200, height: 200 }}
            ssr="client"
          />
        </MockedMediaClientProvider>,
      );

      fireEvent.load(await screen.findByTestId(imgTestId));
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const img: HTMLImageElement = await screen.findByTestId(imgTestId);
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('http://localhost/');
      expect(img.src).not.toContain('global-scope-datauri');
    });

    it('should render immediately when not set to lazy load', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );
    });

    it('should not lazy load if a cache of the preview is available', async () => {
      // cache a preview
      cardPreviewCache.set(fileMap.workingPdfWithRemotePreview.id, 'crop', {
        dataURI: 'a uri',
        orientation: 1,
        source: 'cache-remote',
        dimensions: {},
      });

      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );
    });
  });

  describe('should trigger callbacks', () => {
    it('for onClick when the card is clicked upon', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            onClick={onClick}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const card = screen.getByTestId(cardTestId);
      await user.click(card);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('for onMouseEnter when the mouse enters the card', async () => {
      const user = userEvent.setup();
      const onMouseEnter = jest.fn();
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            onMouseEnter={onMouseEnter}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const card = screen.getByTestId(cardTestId);
      await user.hover(card);
      expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    // TODO - missing onFullscreenChange callback
  });

  describe('should render an accessible preview (i.e. <img>)', () => {
    it('should render preview without alternative text by default', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect((img as HTMLImageElement).alt).toBe('');
    });

    it('should render preview with alternative text when "alt" is provided', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            alt="alt text"
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect((img as HTMLImageElement).alt).toBe('alt text');
    });
  });

  describe('should manage its resize mode', () => {
    it('should render "crop" resize mode by default', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const style = window.getComputedStyle(img);
      expect(style.maxWidth).toBe('100%');
      expect(style.maxHeight).toBe('');
    });

    // TODO - investigate if "fit" and "full-fit" are redundantly identical
    it('should render "fit" resize mode correctly', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            resizeMode="fit"
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const style = window.getComputedStyle(img);
      expect(style.maxWidth).toBe('100%');
      expect(style.maxHeight).toBe('100%');
    });

    it('should render "full-fit" resize mode correctly', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            resizeMode="full-fit"
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const style = window.getComputedStyle(img);
      expect(style.maxWidth).toBe('100%');
      expect(style.maxHeight).toBe('100%');
    });

    it('should render "stretchy-fit" resize mode correctly', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            resizeMode="stretchy-fit"
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const style = window.getComputedStyle(img);
      expect(style.maxWidth).toBe('');
      expect(style.maxHeight).toBe('');
      expect(style.height).toBe('100%');
    });
  });

  describe('should manage its dimensions', () => {
    it('should use default dimensions for the default "image" appearance', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      const card = await screen.findByTestId(cardTestId);
      const style = window.getComputedStyle(card);
      expect(style.height).toBe('125px');
      expect(style.width).toBe('156px');
    });

    it('should use default dimensions for a "square" appearance', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            appearance="square"
          />
        </MockedMediaClientProvider>,
      );

      const card = await screen.findByTestId(cardTestId);
      const style = window.getComputedStyle(card);
      expect(style.height).toBe('300px');
      expect(style.width).toBe('300px');
    });

    it('should use default dimensions for a "horizontal" appearance', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            appearance="horizontal"
          />
        </MockedMediaClientProvider>,
      );

      const card = await screen.findByTestId(cardTestId);
      const style = window.getComputedStyle(card);
      expect(style.height).toBe('125px');
      expect(style.width).toBe('435px');
    });

    it('should update with new dimensions', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { rerender } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            dimensions={{ width: 100, height: 500 }}
          />
        </MockedMediaClientProvider>,
      );

      expect(await screen.findByTestId(cardTestId)).toBeInTheDocument();

      rerender(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            dimensions={{ width: 400, height: 400 }}
          />
        </MockedMediaClientProvider>,
      );

      const card = await screen.findByTestId(cardTestId);
      const style = window.getComputedStyle(card);
      expect(style.height).toBe('400px');
      expect(style.width).toBe('400px');
    });

    it('should set custom dimensions', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            appearance="square"
            dimensions={{ width: 100, height: 500 }}
          />
        </MockedMediaClientProvider>,
      );

      const card = await screen.findByTestId(cardTestId);
      const style = window.getComputedStyle(card);
      expect(style.height).toBe('500px');
      expect(style.width).toBe('100px');
    });

    it('should set custom percentage dimensions', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            appearance="square"
            dimensions={{ width: '20%', height: '20%' }}
          />
        </MockedMediaClientProvider>,
      );

      const card = await screen.findByTestId(cardTestId);
      const style = window.getComputedStyle(card);
      expect(style.height).toBe('20%');
      expect(style.width).toBe('20%');
    });

    // TODO - this actually successfully renders but has bad behaviour: it renders to be 100% width and 0 height (i.e. you can't see it)
    it.skip('should ignore invalid custom dimensions', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            appearance="square"
            dimensions={{ width: 'invalid', height: 'invalid' }}
          />
        </MockedMediaClientProvider>,
      );

      const card = await screen.findByTestId(cardTestId);
      const style = window.getComputedStyle(card);
      expect(style.height).toBe('300px');
      expect(style.width).toBe('300px');
    });
  });

  describe('should manage its orientation', () => {
    it('should not rotate the preview by default (i.e. preview has an orientation of 1)', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const style = window.getComputedStyle(img);
      expect(style.transform).not.toContain('rotate');
    });

    it('should rotate the preview if it has an orientation greater than 1', async () => {
      cardPreviewCache.set(fileMap.workingPdfWithRemotePreview.id, 'crop', {
        dataURI: 'a data uri',
        orientation: 6,
        source: 'cache-remote',
        dimensions: {},
      });
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const style = window.getComputedStyle(img);
      expect(style.transform).toContain('rotate(90deg)');
    });
  });

  // TODO - should demonstrate its selection by its role
  describe('should manage its selection', () => {
    it('should render as not selected by default', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      // should not be selected
      expect(container.querySelector('[data-test-selected="true"]')).toBeNull();
    });

    it('should render as selected', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            selected
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      // should be selected
      expect(
        container.querySelector('[data-test-selected="true"]'),
      ).toBeInTheDocument();
    });
  });

  describe('should render a tick box appropriately', () => {
    it('should not render a tick box by default', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect(screen.queryByLabelText('tick')).not.toBeInTheDocument();
    });

    it('should render a tick box when the card is "selectable"', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            selectable
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect(screen.getByLabelText('tick')).toBeInTheDocument();
    });
  });

  describe('should render card correctly', () => {
    describe('when "disableOverlay" is false by default', () => {
      it('when there is no remote preview', async () => {
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithoutRemotePreview.id,
          collectionName: fileMap.workingPdfWithoutRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        // should not render a preview img
        expect(screen.queryByTestId(imgTestId)).not.toBeInTheDocument();

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).toBeInTheDocument();
        expect(screen.queryByText('04 Aug 2023, 01:40 AM')).toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should render error message correctly
        expect(
          screen.queryByText('Preview unavailable'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when fetching the remote preview errors out (RemotePreviewError: remote-preview-fetch)', async () => {
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should not render a preview img
        expect(screen.queryByTestId(imgTestId)).not.toBeInTheDocument();

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).toBeInTheDocument();
        expect(screen.queryByText('04 Aug 2023, 01:40 AM')).toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should render error message correctly
        expect(screen.queryByText('Preview unavailable')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when loading the remote preview errors out (ImageLoadError: remote-uri)', async () => {
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: 'use-broken-preview',
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should be attempting to load the preview
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="loading-preview"]'),
          ).toBeInTheDocument(),
        );

        // simulate that the file was unsuccessfully loaded in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.error(img);

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).toBeInTheDocument();
        expect(screen.queryByText('04 Aug 2023, 01:40 AM')).toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should render error message correctly
        expect(screen.queryByText('Preview unavailable')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when a serverRateLimited error occurs (RequestError: serverRateLimited)', async () => {
        let initialStore: any = { files: {} };
        const attributes = {
          reason: 'serverRateLimited',
          statusCode: 429,
        };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'error',
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'serverRateLimited',
          details: attributes,
          name: fileMap.workingPdfWithRemotePreview.details.name,
        };

        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).toBeInTheDocument();

        // should render error message correctly
        expect(screen.queryByText('Failed to load')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('media-type')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when a pollingMaxAttemptsExceeded error occurs (PollingError: pollingMaxAttemptsExceeded)', async () => {
        let initialStore: any = { files: {} };
        const attributes = {
          reason: 'pollingMaxAttemptsExceeded',
          attempts: 2,
        };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'error',
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'pollingMaxAttemptsExceeded',
          details: attributes,
          name: fileMap.workingPdfWithRemotePreview.details.name,
        };

        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).toBeInTheDocument();

        // should render error message correctly
        expect(screen.queryByText('Failed to load')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('media-type')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when there is an empty items error (emptyItems, metadata-fetch)', async () => {
        const mockedMediaApi = createMockedMediaApi({
          ids: [],
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).toBeInTheDocument();

        // should render error message correctly
        expect(screen.queryByText('Failed to load')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('media-type')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when file id is invalid (invalidFileId, metadata-fetch)', async () => {
        const mockedMediaApi = createMockedMediaApi({
          ids: [],
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: 'invalid id',
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).toBeInTheDocument();

        // should render error message correctly
        expect(screen.queryByText('Failed to load')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('media-type')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when backend fails to process the file (status: failed-processing) ', async () => {
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.failedPdf.id,
          collectionName: fileMap.failedPdf.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="failed-processing"]'),
          ).toBeInTheDocument(),
        );

        // should provide a download action
        expect(screen.queryByLabelText('Download')).toBeInTheDocument();

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.failedPdf.details.name),
        ).toBeInTheDocument();
        expect(screen.queryByText('04 Aug 2023, 01:40 AM')).toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should render error message correctly
        expect(screen.queryByText('Preview unavailable')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when loading', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
            />
          </MockedMediaClientProvider>,
        );

        // should not render a title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.failedPdf.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should not render a file type icon
        expect(screen.queryByLabelText('pdf')).not.toBeInTheDocument();

        // should render a spinner
        expect(screen.queryByTestId(spinnerTestId)).toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when backend is processing the file (status: processing)', async () => {
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.processingPdf.id,
          collectionName: fileMap.processingPdf.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should be processing
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="processing"]'),
          ).toBeInTheDocument(),
        );

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.processingPdf.details.name),
        ).toBeInTheDocument();
        expect(screen.queryByText('24 Aug 2023, 05:11 AM')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should render message correctly
        expect(screen.queryByText('Creating preview...')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when uploading with a progress of 0', async () => {
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          progress: 0,
        };
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });

        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;

        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should be uploading
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="uploading"]'),
          ).toBeInTheDocument(),
        );

        // use fake timer to pause when the card is uploading
        jest.useFakeTimers();

        // should not render a preview img
        expect(screen.queryByTestId(imgTestId)).not.toBeInTheDocument();

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should render a progress bar correctly
        expect(screen.queryByRole('progressbar')).toBeInTheDocument();
        expect(
          container.querySelector('[aria-valuenow="0"]'),
        ).toBeInTheDocument();
        expect(
          container.querySelector('[data-test-progress="0"]'),
        ).toBeInTheDocument();

        // set timers back to normal
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });

      it('when uploading with a progress of 0.5', async () => {
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          progress: 0.5,
        };
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;

        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should be uploading
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="uploading"]'),
          ).toBeInTheDocument(),
        );

        // use fake timer to pause the card in its uploading state
        jest.useFakeTimers();

        // should not render a preview img
        expect(screen.queryByTestId(imgTestId)).not.toBeInTheDocument();

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should render a progress bar correctly
        expect(screen.queryByRole('progressbar')).toBeInTheDocument();
        expect(
          container.querySelector('[aria-valuenow="50"]'),
        ).toBeInTheDocument();
        expect(
          container.querySelector('[data-test-progress="0.5"]'),
        ).toBeInTheDocument();

        // set timers back to normal
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });

      it('when successfully being processed after uploading without a local preview', async () => {
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          progress: 0.5,
        };
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;

        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should be attempting to load a preview
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="loading-preview"]'),
          ).toBeInTheDocument(),
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should be fully processeds
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should not render file type icon
        expect(screen.queryByLabelText('pdf')).not.toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar correctly
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        expect(
          container.querySelector('[data-test-progress="1"]'),
        ).toBeInTheDocument();
      });

      it('when uploading with a local preview', async () => {
        // cache a local preview
        cardPreviewCache.set(fileMap.workingPdfWithLocalPreview.id, 'crop', {
          dataURI: fileMap.workingPdfWithLocalPreview.details.preview.value,
          orientation: 1,
          source: 'cache-local',
          dimensions: {},
        });

        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithLocalPreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithLocalPreview.details.name,
          size: fileMap.workingPdfWithLocalPreview.details.size,
          mediaType: fileMap.workingPdfWithLocalPreview.details.mediaType,
          mimeType: fileMap.workingPdfWithLocalPreview.details.mimeType,
          id: fileMap.workingPdfWithLocalPreview.id,
          progress: 0.8,
          preview: {
            value: fileMap.workingPdfWithLocalPreview.details.preview.value,
          },
        };
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithLocalPreview.id,
          collectionName: fileMap.workingPdfWithLocalPreview.collection,
        } as const;

        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should be uploading
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="uploading"]'),
          ).toBeInTheDocument(),
        );

        // use fake timer to pause when the card is uploading
        jest.useFakeTimers();

        // should render a preview img
        expect(screen.queryByTestId(imgTestId)).toBeInTheDocument();

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should render a progress bar correctly
        expect(screen.queryByRole('progressbar')).toBeInTheDocument();
        expect(
          container.querySelector('[aria-valuenow="80"]'),
        ).toBeInTheDocument();
        expect(
          container.querySelector('[data-test-progress="0.8"]'),
        ).toBeInTheDocument();

        // set timers back to normal
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });

      it('when successfully being processed after uploading with a local preview', async () => {
        // cache a local preview
        cardPreviewCache.set(fileMap.workingPdfWithLocalPreview.id, 'crop', {
          dataURI: fileMap.workingPdfWithLocalPreview.details.preview.value,
          orientation: 1,
          source: 'cache-local',
          dimensions: {},
        });

        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithLocalPreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithLocalPreview.details.name,
          size: fileMap.workingPdfWithLocalPreview.details.size,
          mediaType: fileMap.workingPdfWithLocalPreview.details.mediaType,
          mimeType: fileMap.workingPdfWithLocalPreview.details.mimeType,
          id: fileMap.workingPdfWithLocalPreview.id,
          progress: 0.5,
        };
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithLocalPreview.id,
          collectionName: fileMap.workingPdfWithLocalPreview.collection,
        } as const;

        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should be fully processed
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        // should render a preview img
        expect(screen.queryByTestId(imgTestId)).toBeInTheDocument();

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar correctly
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        expect(
          container.querySelector('[data-test-progress="1"]'),
        ).toBeInTheDocument();
      });

      // TODO: Fix when the Mocked Media API is updated from https://product-fabric.atlassian.net/browse/MEX-2642
      it('when the card is never loaded', async () => {
        // ensure that the next file state is never returned
        (useFileState as jest.Mock).mockReturnValue({
          fileState: undefined,
        });

        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
            />
          </MockedMediaClientProvider>,
        );

        // should never render an image
        await expect(screen.findByTestId(imgTestId)).rejects.toThrow();

        // should not render a title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should not render a file type icon
        expect(screen.queryByLabelText('pdf')).not.toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should render a spinner
        expect(screen.queryByTestId(spinnerTestId)).toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      // TODO: Fix when the Mocked Media API is updated from https://product-fabric.atlassian.net/browse/MEX-2642
      it.skip('when there is an upload error', async () => {
        // add initial state so that the file is currently uploading
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          progress: 0.5,
        };

        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should be uploading
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="uploading"]'),
          ).toBeInTheDocument(),
        );

        // TODO: Fix when the Mocked Media API is updated from https://product-fabric.atlassian.net/browse/MEX-2642
        // the next state should be an upload error
        // act(() => {
        // mediaClient.__DO_NOT_USE__getMediaStore().setState((state) => {
        //   state.files[fileMap.workingPdfWithRemotePreview.id] = {
        //     status: 'error',
        //     id: fileMap.workingPdfWithRemotePreview.id,
        //     reason: 'upload',
        //     details: {},
        //   };
        // });
        // });

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).toBeInTheDocument();
        expect(screen.queryByText('Failed to upload')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      // TODO: Fix when the Mocked Media API is updated from https://product-fabric.atlassian.net/browse/MEX-2642
      it.skip('when an error occurs after the card is complete', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        //act(() => {
        // TODO: Fix when the Mocked Media API is updated from https://product-fabric.atlassian.net/browse/MEX-2642
        // mediaClient.__DO_NOT_USE__getMediaStore().setState((state) => {
        //   state.files[fileMap.workingPdfWithRemotePreview.id] = {
        //     status: 'error',
        //     id: fileMap.workingPdfWithRemotePreview.id,
        //     reason: 'some error reason',
        //     details: {},
        //   };
        // });
        // });

        // card should ignore the error
        await expect(
          waitFor(() =>
            expect(
              container.querySelector('[data-test-status="error"]'),
            ).toBeInTheDocument(),
          ),
        ).rejects.toThrow();

        // should render title box correctly
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).toBeInTheDocument();
        expect(screen.queryByText('04 Aug 2023, 01:40 AM')).toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should not render an error message
        expect(screen.queryByText('Failed to load')).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });
    });

    describe('when "disableOverlay" is true', () => {
      it('when there is no remote preview', async () => {
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithoutRemotePreview.id,
          collectionName: fileMap.workingPdfWithoutRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        // should not render a preview img
        expect(screen.queryByTestId(imgTestId)).not.toBeInTheDocument();

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should render error message correctly
        expect(
          screen.queryByText('Preview unavailable'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when fetching the remote preview errors out (RemotePreviewError: remote-preview-fetch)', async () => {
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should not render a preview img
        expect(screen.queryByTestId(imgTestId)).not.toBeInTheDocument();

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should render error message correctly
        expect(screen.queryByText('Preview unavailable')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when loading the remote preview errors out (ImageLoadError: remote-uri)', async () => {
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: 'use-broken-preview',
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should be attempting to load the preview
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="loading-preview"]'),
          ).toBeInTheDocument(),
        );

        // simulate that the file was unsuccessfully loaded in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.error(img);

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should render error message correctly
        expect(screen.queryByText('Preview unavailable')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when a serverRateLimited error occurs (RequestError: serverRateLimited)', async () => {
        let initialStore: any = { files: {} };
        const attributes = {
          reason: 'serverRateLimited',
          statusCode: 429,
        };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'error',
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'serverRateLimited',
          details: attributes,
          name: fileMap.workingPdfWithRemotePreview.details.name,
        };

        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should not render error message
        expect(screen.queryByText('Failed to load')).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('media-type')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when a pollingMaxAttemptsExceeded error occurs (PollingError: pollingMaxAttemptsExceeded)', async () => {
        let initialStore: any = { files: {} };
        const attributes = {
          reason: 'pollingMaxAttemptsExceeded',
          attempts: 2,
        };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'error',
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'pollingMaxAttemptsExceeded',
          details: attributes,
          name: fileMap.workingPdfWithRemotePreview.details.name,
        };

        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should not render error message
        expect(screen.queryByText('Failed to load')).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('media-type')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when there is an empty items error (emptyItems, metadata-fetch)', async () => {
        const mockedMediaApi = createMockedMediaApi({
          ids: [],
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should not render error message
        expect(screen.queryByText('Failed to load')).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('media-type')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when file id is invalid (invalidFileId, metadata-fetch)', async () => {
        const mockedMediaApi = createMockedMediaApi({
          ids: [],
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: 'invalid id',
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should not render error message
        expect(screen.queryByText('Failed to load')).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('media-type')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when backend fails to process the file (status: failed-processing) ', async () => {
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.failedPdf.id,
          collectionName: fileMap.failedPdf.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="failed-processing"]'),
          ).toBeInTheDocument(),
        );

        // should not provide a download action
        expect(screen.queryByLabelText('Download')).not.toBeInTheDocument();

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.failedPdf.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should render error message correctly
        expect(screen.queryByText('Preview unavailable')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when loading', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // should not render a title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.failedPdf.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should not render a file type icon
        expect(screen.queryByLabelText('pdf')).not.toBeInTheDocument();

        // should render a spinner
        expect(screen.queryByTestId(spinnerTestId)).toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when backend is processing the file (status: processing)', async () => {
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.processingPdf.id,
          collectionName: fileMap.processingPdf.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should be processing
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="processing"]'),
          ).toBeInTheDocument(),
        );

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.processingPdf.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should render message correctly
        expect(screen.queryByText('Creating preview...')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      it('when uploading with a progress of 0', async () => {
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          progress: 0,
        };
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });

        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;

        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should be uploading
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="uploading"]'),
          ).toBeInTheDocument(),
        );

        // use fake timer to pause when the card is uploading
        jest.useFakeTimers();

        // should not render a preview img
        expect(screen.queryByTestId(imgTestId)).not.toBeInTheDocument();

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should render a progress bar correctly
        expect(screen.queryByRole('progressbar')).toBeInTheDocument();
        expect(
          container.querySelector('[aria-valuenow="0"]'),
        ).toBeInTheDocument();
        expect(
          container.querySelector('[data-test-progress="0"]'),
        ).toBeInTheDocument();

        // set timers back to normal
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });

      it('when uploading with a progress of 0.5', async () => {
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          progress: 0.5,
        };
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;

        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should be uploading
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="uploading"]'),
          ).toBeInTheDocument(),
        );

        // use fake timer to pause the card in its uploading state
        jest.useFakeTimers();

        // should not render a preview img
        expect(screen.queryByTestId(imgTestId)).not.toBeInTheDocument();

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should render a progress bar correctly
        expect(screen.queryByRole('progressbar')).toBeInTheDocument();
        expect(
          container.querySelector('[aria-valuenow="50"]'),
        ).toBeInTheDocument();
        expect(
          container.querySelector('[data-test-progress="0.5"]'),
        ).toBeInTheDocument();

        // set timers back to normal
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });

      it('when successfully being processed after uploading without a local preview', async () => {
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          progress: 0.5,
        };
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;

        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should be attempting to load a preview
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="loading-preview"]'),
          ).toBeInTheDocument(),
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should be fully processeds
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should not render file type icon
        expect(screen.queryByLabelText('pdf')).not.toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar correctly
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        expect(
          container.querySelector('[data-test-progress="1"]'),
        ).toBeInTheDocument();
      });

      it('when uploading with a local preview', async () => {
        // cache a local preview
        cardPreviewCache.set(fileMap.workingPdfWithLocalPreview.id, 'crop', {
          dataURI: fileMap.workingPdfWithLocalPreview.details.preview.value,
          orientation: 1,
          source: 'cache-local',
          dimensions: {},
        });

        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithLocalPreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithLocalPreview.details.name,
          size: fileMap.workingPdfWithLocalPreview.details.size,
          mediaType: fileMap.workingPdfWithLocalPreview.details.mediaType,
          mimeType: fileMap.workingPdfWithLocalPreview.details.mimeType,
          id: fileMap.workingPdfWithLocalPreview.id,
          progress: 0.8,
          preview: {
            value: fileMap.workingPdfWithLocalPreview.details.preview.value,
          },
        };
        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithLocalPreview.id,
          collectionName: fileMap.workingPdfWithLocalPreview.collection,
        } as const;

        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should be uploading
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="uploading"]'),
          ).toBeInTheDocument(),
        );

        // use fake timer to pause when the card is uploading
        jest.useFakeTimers();

        // should render a preview img
        expect(screen.queryByTestId(imgTestId)).toBeInTheDocument();

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should render a progress bar correctly
        expect(screen.queryByRole('progressbar')).toBeInTheDocument();
        expect(
          container.querySelector('[aria-valuenow="80"]'),
        ).toBeInTheDocument();
        expect(
          container.querySelector('[data-test-progress="0.8"]'),
        ).toBeInTheDocument();

        // set timers back to normal
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });

      it('when successfully being processed after uploading with a local preview', async () => {
        // cache a local preview
        cardPreviewCache.set(fileMap.workingPdfWithLocalPreview.id, 'crop', {
          dataURI: fileMap.workingPdfWithLocalPreview.details.preview.value,
          orientation: 1,
          source: 'cache-local',
          dimensions: {},
        });

        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithLocalPreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithLocalPreview.details.name,
          size: fileMap.workingPdfWithLocalPreview.details.size,
          mediaType: fileMap.workingPdfWithLocalPreview.details.mediaType,
          mimeType: fileMap.workingPdfWithLocalPreview.details.mimeType,
          id: fileMap.workingPdfWithLocalPreview.id,
          progress: 0.5,
        };
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithLocalPreview.id,
          collectionName: fileMap.workingPdfWithLocalPreview.collection,
        } as const;

        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should be fully processed
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        // should render a preview img
        expect(screen.queryByTestId(imgTestId)).toBeInTheDocument();

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar correctly
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        expect(
          container.querySelector('[data-test-progress="1"]'),
        ).toBeInTheDocument();
      });

      // TODO: Fix when the Mocked Media API is updated from https://product-fabric.atlassian.net/browse/MEX-2642
      it('when the card is never loaded', async () => {
        // ensure that the next file state is never returned
        (useFileState as jest.Mock).mockReturnValue({
          fileState: undefined,
        });

        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // should never render an image
        await expect(screen.findByTestId(imgTestId)).rejects.toThrow();

        // should not render a title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('24 Aug 2023, 05:11 AM'),
        ).not.toBeInTheDocument();

        // should not render a file type icon
        expect(screen.queryByLabelText('pdf')).not.toBeInTheDocument();

        // should not render a creating preview message
        expect(
          screen.queryByText('Creating preview...'),
        ).not.toBeInTheDocument();

        // should render a spinner
        expect(screen.queryByTestId(spinnerTestId)).toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      // TODO: Fix when the Mocked Media API is updated from https://product-fabric.atlassian.net/browse/MEX-2642
      it.skip('when there is an upload error', async () => {
        // add initial state so that the file is currently uploading
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          progress: 0.5,
        };

        const mockedMediaApi = createMockedMediaApi({
          withRemotePreview: false,
        });
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // card should be uploading
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="uploading"]'),
          ).toBeInTheDocument(),
        );

        // TODO: Fix when the Mocked Media API is updated from https://product-fabric.atlassian.net/browse/MEX-2642
        // the next state should be an upload error
        // act(() => {
        // mediaClient.__DO_NOT_USE__getMediaStore().setState((state) => {
        //   state.files[fileMap.workingPdfWithRemotePreview.id] = {
        //     status: 'error',
        //     id: fileMap.workingPdfWithRemotePreview.id,
        //     reason: 'upload',
        //     details: {},
        //   };
        // });
        // });

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).not.toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).toBeInTheDocument();
        expect(screen.queryByText('Failed to upload')).toBeInTheDocument();

        // should render file type icon correctly
        expect(screen.queryByLabelText('pdf')).toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      // TODO: Fix when the Mocked Media API is updated from https://product-fabric.atlassian.net/browse/MEX-2642
      it.skip('when an error occurs after the card is complete', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              disableOverlay
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        //act(() => {
        // TODO: Fix when the Mocked Media API is updated from https://product-fabric.atlassian.net/browse/MEX-2642
        // mediaClient.__DO_NOT_USE__getMediaStore().setState((state) => {
        //   state.files[fileMap.workingPdfWithRemotePreview.id] = {
        //     status: 'error',
        //     id: fileMap.workingPdfWithRemotePreview.id,
        //     reason: 'some error reason',
        //     details: {},
        //   };
        // });
        // });

        // card should ignore the error
        await expect(
          waitFor(() =>
            expect(
              container.querySelector('[data-test-status="error"]'),
            ).toBeInTheDocument(),
          ),
        ).rejects.toThrow();

        // should not render title box
        expect(screen.queryByTestId(titleBoxTestId)).toBeInTheDocument();
        expect(
          screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('04 Aug 2023, 01:40 AM'),
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Warning')).not.toBeInTheDocument();

        // should not render an error message
        expect(screen.queryByText('Failed to load')).not.toBeInTheDocument();

        // should not render a spinner
        expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();

        // should not render a progress bar
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });
    });
  });

  describe('should manage inline player', () => {
    it('should render a video player when a video is clicked upon', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingVideo.id,
        collectionName: fileMap.workingVideo.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            onClick={onClick}
            useInlinePlayer
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const playBtn = screen.getByLabelText('play');
      await user.click(playBtn);
      expect(container.querySelector('video')).toBeInTheDocument();
    });

    it('should not play an inline video when an error occurs', async () => {
      // cache a preview
      cardPreviewCache.set(fileMap.workingVideo.id, 'crop', {
        dataURI: videoURI,
        orientation: 1,
        source: 'cache-remote',
      });

      let initialStore: any = { files: {} };
      initialStore.files[fileMap.workingVideo.id] = {
        status: 'error',
        id: fileMap.workingVideo.id,
        reason: 'some error reason',
        message: 'some error message',
      };

      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingVideo.id,
        collectionName: fileMap.workingVideo.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider
          mockedMediaApi={mockedMediaApi}
          initialStore={initialStore}
        >
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            useInlinePlayer
            disableOverlay
          />
        </MockedMediaClientProvider>,
      );

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="error"]'),
        ).toBeInTheDocument(),
      );

      expect(screen.queryByLabelText('play')).not.toBeInTheDocument();
      expect(container.querySelector('video')).not.toBeInTheDocument();
    });
  });

  describe('should update when a new identifier is provided', () => {
    it('for a new file identifier', async () => {
      global.URL.createObjectURL = () => 'create-object-url-1';
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container, rerender } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect((img as HTMLImageElement).src).toContain('create-object-url-1');
      expect(
        screen.queryByText(fileMap.workingPdfWithRemotePreview.details.name),
      ).toBeInTheDocument();
      expect(screen.queryByText('04 Aug 2023, 01:40 AM')).toBeInTheDocument();

      global.URL.createObjectURL = () => 'create-object-url-2';
      const newIdentifier = {
        mediaItemType: 'file',
        id: fileMap.workingJpegWithRemotePreview.id,
        collectionName: fileMap.workingJpegWithRemotePreview.collection,
      } as const;
      rerender(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={newIdentifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const newImg = await screen.findByTestId(imgTestId);
      fireEvent.load(newImg);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect((newImg as HTMLImageElement).src).toContain('create-object-url-2');
      expect(
        await screen.findByText(
          fileMap.workingJpegWithRemotePreview.details.name,
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText('11 Jan 2017, 04:48 AM')).toBeInTheDocument();

      // reset createObjectURL
      global.URL.createObjectURL = () => 'mock result of URL.createObjectURL()';
    });

    it('for a new external image identifier', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const extIdentifier = {
        mediaItemType: 'external-image',
        dataURI: 'ext-uri',
        name: 'ext',
      } as const;
      const { container, rerender } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={extIdentifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect(screen.getByText(extIdentifier.name)).toBeInTheDocument();
      expect((img as HTMLImageElement).src).toContain(extIdentifier.dataURI);

      const newExtIdentifier = {
        mediaItemType: 'external-image',
        dataURI: 'new-ext-uri',
        name: 'nExt',
      } as const;
      rerender(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={newExtIdentifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const newImg = await screen.findByTestId(imgTestId);
      fireEvent.load(newImg);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect(screen.getByText(newExtIdentifier.name)).toBeInTheDocument();
      expect((newImg as HTMLImageElement).src).toContain(
        newExtIdentifier.dataURI,
      );
    });
  });

  it('should trigger download action successfully when clicked', async () => {
    const user = userEvent.setup();
    const mockedMediaApi = createMockedMediaApi({
      withRemotePreview: false,
    });
    const identifier = {
      mediaItemType: 'file',
      id: fileMap.failedPdf.id,
      collectionName: fileMap.failedPdf.collection,
    } as const;
    const { container } = render(
      <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
        <CardV2Loader
          mediaClientConfig={dummyMediaClientConfig}
          identifier={identifier}
          isLazy={false}
        />
      </MockedMediaClientProvider>,
    );

    // card should completely process the error
    await waitFor(() =>
      expect(
        container.querySelector('[data-test-status="failed-processing"]'),
      ).toBeInTheDocument(),
    );

    const btn = screen.getByLabelText('Download');
    await user.click(btn);
    expect(globalMediaEventEmitter.emit).toHaveBeenCalledTimes(1);
    expect(globalMediaEventEmitter.emit).toHaveBeenCalledWith('media-viewed', {
      fileId: fileMap.failedPdf.id,
      isUserCollection: false,
      viewingLevel: 'download',
    });
  });

  describe('should manage MediaViewer integration', () => {
    it('should render Media Viewer when clicked when "shouldOpenMediaViewer" is true', async () => {
      const user = userEvent.setup();
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            shouldOpenMediaViewer
          />
        </MockedMediaClientProvider>,
      );

      // card should be attempting to load the preview
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="loading-preview"]'),
        ).toBeInTheDocument(),
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const card = screen.getByTestId(cardTestId);
      await user.click(card);
      expect(await screen.findByTestId(mediaViewerTestId)).toBeInTheDocument();
    });

    it('should not render Media Viewer when clicked when "shouldOpenMediaViewer" is false by default', async () => {
      const user = userEvent.setup();
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const card = screen.getByTestId(cardTestId);
      await user.click(card);
      await expect(screen.findByTestId(mediaViewerTestId)).rejects.toThrow();
    });

    /**
     * TODO - Media Viewer (MV) won't work at the moment because it isn't using the media-state state.
     * As such, this test cases doesn't really check that MV renders with all items.
     * Instead, it checks that at the very least, the first and only item is the card that was clicked upon.
     * Need to update these this test case in the future
     */
    it('should render Media Viewer with an item', async () => {
      const user = userEvent.setup();
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingPdfWithRemotePreview.id,
        collectionName: fileMap.workingPdfWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            shouldOpenMediaViewer
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const card = screen.getByTestId(cardTestId);
      await user.click(card);

      const mediaViewer = await screen.findByTestId(mediaViewerTestId);
      expect(mediaViewer).toBeInTheDocument();

      expect(
        within(mediaViewer).getByText(
          fileMap.workingPdfWithRemotePreview.details.name,
        ),
      ).toBeInTheDocument();
    });

    it('should not render Media Viewer for a video when "useInlinePlayer" is true', async () => {
      const user = userEvent.setup();
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingVideo.id,
        collectionName: fileMap.workingVideo.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
            shouldOpenMediaViewer
            useInlinePlayer
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      const card = screen.getByTestId(cardTestId);
      await user.click(card);
      await expect(screen.findByTestId(mediaViewerTestId)).rejects.toThrow();
    });
  });

  it('should render correctly with an external image identifier', async () => {
    const mockedMediaApi = createMockedMediaApi();
    const extIdentifier = {
      mediaItemType: 'external-image',
      dataURI: 'ext-uri',
      name: 'ext',
    } as const;
    const { container } = render(
      <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
        <CardV2Loader
          mediaClientConfig={dummyMediaClientConfig}
          identifier={extIdentifier}
          isLazy={false}
        />
      </MockedMediaClientProvider>,
    );

    // simulate that the file has been fully processed in the browser
    const img = await screen.findByTestId(imgTestId);
    fireEvent.load(img);

    // card should completely process the file
    await waitFor(() =>
      expect(
        container.querySelector('[data-test-status="complete"]'),
      ).toBeInTheDocument(),
    );

    expect(screen.getByText(extIdentifier.name)).toBeInTheDocument();
    expect((img as HTMLImageElement).src).toContain(extIdentifier.dataURI);
  });

  describe('should trigger events from globalMediaEventEmitter', () => {
    it('when rendering an image not from the recents collection, it should emit a "media-viewed" event', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingImgWithRemotePreview.id,
        collectionName: fileMap.workingImgWithRemotePreview.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect(globalMediaEventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(globalMediaEventEmitter.emit).toHaveBeenCalledWith(
        'media-viewed',
        {
          fileId: fileMap.workingImgWithRemotePreview.id,
          isUserCollection: false,
          viewingLevel: 'minimal',
        },
      );
    });

    it('when rendering an image from the recents collection, it should emit a "media-viewed" event', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'file',
        id: fileMap.workingImgWithRemotePreviewInRecentsCollection.id,
        collectionName:
          fileMap.workingImgWithRemotePreviewInRecentsCollection.collection,
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect(globalMediaEventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(globalMediaEventEmitter.emit).toHaveBeenCalledWith(
        'media-viewed',
        {
          fileId: fileMap.workingImgWithRemotePreviewInRecentsCollection.id,
          isUserCollection: true,
          viewingLevel: 'minimal',
        },
      );
    });

    it('when rendering an external image, it should emit a "media-viewed" event', async () => {
      const mockedMediaApi = createMockedMediaApi();
      const identifier = {
        mediaItemType: 'external-image',
        dataURI: 'ext-uri',
        name: 'ext',
      } as const;
      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </MockedMediaClientProvider>,
      );

      // simulate that the file has been fully processed in the browser
      const img = await screen.findByTestId(imgTestId);
      fireEvent.load(img);

      // card should completely process the file
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="complete"]'),
        ).toBeInTheDocument(),
      );

      expect(globalMediaEventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(globalMediaEventEmitter.emit).toHaveBeenCalledWith(
        'media-viewed',
        {
          fileId: identifier.dataURI,
          isUserCollection: false,
          viewingLevel: 'minimal',
        },
      );
    });
  });

  it('should internationalise messages with the provided IntlProvider', async () => {
    const mockedMediaApi = createMockedMediaApi({ withRemotePreview: false });
    const identifier = {
      mediaItemType: 'file',
      id: fileMap.workingPdfWithRemotePreview.id,
      collectionName: fileMap.workingPdfWithRemotePreview.collection,
    } as const;
    const { container } = render(
      <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
        <IntlProvider
          locale="en"
          messages={{
            'fabric.media.preview_unavailable': 'an internationalised message',
          }}
        >
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            isLazy={false}
          />
        </IntlProvider>
      </MockedMediaClientProvider>,
    );

    // card should completely process the error
    await waitFor(() =>
      expect(
        container.querySelector('[data-test-status="error"]'),
      ).toBeInTheDocument(),
    );

    expect(
      screen.getByText('an internationalised message'),
    ).toBeInTheDocument();
  });

  describe('should manage analytics appropriately', () => {
    describe('should pass the Analytics Event fired', () => {
      it('from CardView to the provided onClick callback', async () => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              onClick={onClick}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        const card = screen.getByTestId(cardTestId);
        await user.click(card);
        expect(onClick.mock.calls[0][1]).toBeDefined();
      });

      it('from InlinePlayerLazy to the provided onClick callback', async () => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingVideo.id,
          collectionName: fileMap.workingVideo.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
              onClick={onClick}
              useInlinePlayer
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        const card = screen.getByTestId(cardTestId);
        await user.click(card);
        expect(onClick.mock.calls[0][1]).toBeDefined();
      });
    });

    describe('should fire commenced analytics event on file load start ', () => {
      it('with file identifier', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        expect(fireCommencedEvent).toBeCalledTimes(1);
        expect(fireCommencedEvent).toHaveBeenCalledWith(
          expect.any(Function),
          expect.objectContaining({
            fileId: fileMap.workingPdfWithRemotePreview.id,
          }),
          { overall: { durationSincePageStart: 1000 } },
          {
            traceId: expect.any(String),
          },
        );
      });

      it('with an external image identifier', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const extIdentifier = {
          mediaItemType: 'external-image',
          dataURI: 'ext-uri',
          name: 'ext',
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={extIdentifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        expect(fireCommencedEvent).toBeCalledTimes(1);
        expect(fireCommencedEvent).toHaveBeenCalledWith(
          expect.any(Function),
          expect.objectContaining({
            fileId: 'external-image',
          }),
          { overall: { durationSincePageStart: 1000 } },
          {
            traceId: expect.any(String),
          },
        );
      });
    });

    describe('should attach the correct file status flags when completing the UFO experience', () => {
      it('should attach an uploading file status flag with value as true', async () => {
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'uploading',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          progress: 0,
        };
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );
        expect(completeUfoExperience).toBeCalledTimes(3);
        expect(completeUfoExperience).toHaveBeenLastCalledWith(
          expect.any(String),
          expect.any(String),
          expect.any(Object),
          { wasStatusUploading: true, wasStatusProcessing: false },
          expect.any(Object),
          undefined,
        );
      });

      // FIXME: flaky test - failed on https://bitbucket.org/atlassian/atlassian-frontend/pipelines/results/2020200
      it.skip('should attach a processing file status flag with value as true', async () => {
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'processing',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          representations: {},
          artifacts: {},
        };
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );
        expect(completeUfoExperience).toBeCalledTimes(2);
        expect(completeUfoExperience).toHaveBeenLastCalledWith(
          expect.any(String),
          expect.any(String),
          expect.any(Object),
          { wasStatusUploading: false, wasStatusProcessing: true },
          expect.any(Object),
          undefined,
        );
      });

      it('should attach uploading and processing file status flags with values as false', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );
        expect(completeUfoExperience).toBeCalledTimes(2);
        expect(completeUfoExperience).toHaveBeenLastCalledWith(
          expect.any(String),
          expect.any(String),
          expect.any(Object),
          { wasStatusUploading: false, wasStatusProcessing: false },
          expect.any(Object),
          undefined,
        );
      });

      it('should attach uploading and processing file status flags with values as false for external image identifiers', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const extIdentifier = {
          mediaItemType: 'external-image',
          dataURI: 'ext-uri',
          name: 'ext',
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={extIdentifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );
        expect(completeUfoExperience).toBeCalledTimes(1);
        expect(completeUfoExperience).toHaveBeenLastCalledWith(
          expect.any(String),
          expect.any(String),
          expect.any(Object),
          { wasStatusUploading: false, wasStatusProcessing: false },
          expect.any(Object),
          undefined,
        );
      });
    });

    describe('should complete the UFO experience correctly when experiencing errors', () => {
      it('when a serverRateLimited error occurs (RequestError: serverRateLimited)', async () => {
        let initialStore: any = { files: {} };
        const attributes = {
          reason: 'serverRateLimited',
          statusCode: 429,
        };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'error',
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'serverRateLimited',
          details: attributes,
          name: fileMap.workingPdfWithRemotePreview.details.name,
        };

        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        expect(completeUfoExperience).toBeCalledTimes(1);
        expect(completeUfoExperience).toHaveBeenLastCalledWith(
          expect.any(String),
          'error',
          {
            fileMediatype: undefined,
            fileMimetype: undefined,
            fileId: fileMap.workingPdfWithRemotePreview.id,
            fileSize: undefined,
            fileStatus: undefined,
          },
          { wasStatusUploading: false, wasStatusProcessing: false },
          expect.any(Object),
          new MediaCardError(
            'metadata-fetch',
            new MediaFileStateError(
              fileMap.workingPdfWithRemotePreview.id,
              'serverRateLimited',
              undefined,
              { statusCode: 429 },
            ),
          ),
        );
        expect(
          (completeUfoExperience as jest.Mock).mock.calls[0][5].secondaryError,
        ).toMatchObject({
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'serverRateLimited',
          details: { statusCode: 429 },
        });
      });

      it('when a pollingMaxAttemptsExceeded error occurs (PollingError: pollingMaxAttemptsExceeded)', async () => {
        let initialStore: any = { files: {} };
        const attributes = {
          reason: 'pollingMaxAttemptsExceeded',
          attempts: 2,
        };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'error',
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'pollingMaxAttemptsExceeded',
          details: attributes,
          name: fileMap.workingPdfWithRemotePreview.details.name,
        };

        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        expect(completeUfoExperience).toBeCalledTimes(1);
        expect(completeUfoExperience).toHaveBeenLastCalledWith(
          expect.any(String),
          'error',
          {
            fileMediatype: undefined,
            fileMimetype: undefined,
            fileId: fileMap.workingPdfWithRemotePreview.id,
            fileSize: undefined,
            fileStatus: undefined,
          },
          { wasStatusUploading: false, wasStatusProcessing: false },
          expect.any(Object),
          new MediaCardError(
            'metadata-fetch',
            new MediaFileStateError(
              fileMap.workingPdfWithRemotePreview.id,
              'pollingMaxAttemptsExceeded',
              undefined,
              { attempts: 2 },
            ),
          ),
        );
        expect(
          (completeUfoExperience as jest.Mock).mock.calls[0][5].secondaryError,
        ).toMatchObject({
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'pollingMaxAttemptsExceeded',
          details: { attempts: 2 },
        });
      });
    });

    describe('should fire a screen event ', () => {
      it('when the file status is complete', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        expect(fireScreenEvent).toBeCalledTimes(1);
      });

      it('when the file is a video and has a preview', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingVideo.id,
          collectionName: fileMap.workingVideo.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        expect(fireScreenEvent).toBeCalledTimes(1);
      });
    });

    describe('should fire an operational event', () => {
      it('when the card status changes (file identifier)', async () => {
        let initialStore: any = { files: {} };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'processing',
          name: fileMap.workingPdfWithRemotePreview.details.name,
          size: fileMap.workingPdfWithRemotePreview.details.size,
          mediaType: fileMap.workingPdfWithRemotePreview.details.mediaType,
          mimeType: fileMap.workingPdfWithRemotePreview.details.mimeType,
          id: fileMap.workingPdfWithRemotePreview.id,
          representations: {},
          artifacts: {},
        };
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        expect(fireOperationalEvent).toHaveBeenCalledTimes(2);
        expect(fireOperationalEvent).toHaveBeenCalledWith(
          expect.any(Function),
          'processing',
          {
            fileMediatype:
              fileMap.workingPdfWithRemotePreview.details.mediaType,
            fileMimetype: fileMap.workingPdfWithRemotePreview.details.mimeType,
            fileId: fileMap.workingPdfWithRemotePreview.id,
            fileSize: fileMap.workingPdfWithRemotePreview.details.size,
            fileStatus: 'processing',
          },
          {
            overall: {
              durationSinceCommenced: 0,
              durationSincePageStart: 1000,
            },
          },
          { client: { status: 'unknown' }, server: { status: 'unknown' } },
          undefined,
          {
            traceId: expect.any(String),
          },
          undefined,
        );
        expect(fireOperationalEvent).toHaveBeenNthCalledWith(
          2,
          expect.any(Function),
          'complete',
          {
            fileMediatype:
              fileMap.workingPdfWithRemotePreview.details.mediaType,
            fileMimetype: fileMap.workingPdfWithRemotePreview.details.mimeType,
            fileId: fileMap.workingPdfWithRemotePreview.id,
            fileSize: fileMap.workingPdfWithRemotePreview.details.size,
            fileStatus: 'processing',
          },
          {
            overall: {
              durationSinceCommenced: 0,
              durationSincePageStart: 1000,
            },
          },
          { client: { status: 'unknown' }, server: { status: 'unknown' } },
          undefined,
          {
            traceId: expect.any(String),
          },
          undefined,
        );
      });

      it('when the card status changes (external image identifier)', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const extIdentifier = {
          mediaItemType: 'external-image',
          dataURI: 'ext-uri',
          name: 'ext',
        } as const;
        const { container } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={extIdentifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        expect(fireOperationalEvent).toHaveBeenCalledTimes(1);
        expect(fireOperationalEvent).toHaveBeenCalledWith(
          expect.any(Function),
          'complete',
          {
            fileMediatype: 'image',
            fileId: extIdentifier.mediaItemType,
          },
          {
            overall: {
              durationSinceCommenced: 0,
              durationSincePageStart: 1000,
            },
          },
          { client: { status: 'unknown' }, server: { status: 'unknown' } },
          undefined,
          {
            traceId: expect.any(String),
          },
          undefined,
        );
      });

      it('when a serverRateLimited error occurs (RequestError: serverRateLimited)', async () => {
        let initialStore: any = { files: {} };
        const attributes = {
          reason: 'serverRateLimited',
          statusCode: 429,
        };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'error',
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'serverRateLimited',
          details: attributes,
          name: fileMap.workingPdfWithRemotePreview.details.name,
        };

        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        expect(fireOperationalEvent).toBeCalledTimes(1);
        expect(fireOperationalEvent).toHaveBeenLastCalledWith(
          expect.any(Function),
          'error',
          {
            fileMediatype: undefined,
            fileMimetype: undefined,
            fileId: fileMap.workingPdfWithRemotePreview.id,
            fileSize: undefined,
            fileStatus: undefined,
          },
          {
            overall: {
              durationSinceCommenced: 0,
              durationSincePageStart: 1000,
            },
          },
          { client: { status: 'unknown' }, server: { status: 'unknown' } },
          new MediaCardError(
            'metadata-fetch',
            new MediaFileStateError(
              fileMap.workingPdfWithRemotePreview.id,
              'serverRateLimited',
              undefined,
              { statusCode: 429 },
            ),
          ),
          {
            traceId: expect.any(String),
          },
          undefined,
        );
        expect(
          (fireOperationalEvent as jest.Mock).mock.calls[0][5].secondaryError,
        ).toMatchObject({
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'serverRateLimited',
          details: { statusCode: 429 },
        });
      });

      it('when a pollingMaxAttemptsExceeded error occurs (PollingError: pollingMaxAttemptsExceeded)', async () => {
        let initialStore: any = { files: {} };
        const attributes = {
          reason: 'pollingMaxAttemptsExceeded',
          attempts: 2,
        };
        initialStore.files[fileMap.workingPdfWithRemotePreview.id] = {
          status: 'error',
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'pollingMaxAttemptsExceeded',
          details: attributes,
          name: fileMap.workingPdfWithRemotePreview.details.name,
        };

        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;
        const { container } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // card should completely process the error
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="error"]'),
          ).toBeInTheDocument(),
        );

        expect(fireOperationalEvent).toBeCalledTimes(1);
        expect(fireOperationalEvent).toHaveBeenLastCalledWith(
          expect.any(Function),
          'error',
          {
            fileMediatype: undefined,
            fileMimetype: undefined,
            fileId: fileMap.workingPdfWithRemotePreview.id,
            fileSize: undefined,
            fileStatus: undefined,
          },
          {
            overall: {
              durationSinceCommenced: 0,
              durationSincePageStart: 1000,
            },
          },
          { client: { status: 'unknown' }, server: { status: 'unknown' } },
          new MediaCardError(
            'metadata-fetch',
            new MediaFileStateError(
              fileMap.workingPdfWithRemotePreview.id,
              'pollingMaxAttemptsExceeded',
              undefined,
              { attempts: 2 },
            ),
          ),
          {
            traceId: expect.any(String),
          },
          undefined,
        );
        expect(
          (fireOperationalEvent as jest.Mock).mock.calls[0][5].secondaryError,
        ).toMatchObject({
          id: fileMap.workingPdfWithRemotePreview.id,
          reason: 'pollingMaxAttemptsExceeded',
          details: { attempts: 2 },
        });
      });
    });

    it('should fire a non-critical error event if an error occurs when refetching a preview with bigger dimensions', async () => {
      const mockedMediaApi = createMockedMediaApi({ withRemotePreview: false });
      const expectedPreview = {
        dataURI: 'global-scope-datauri',
        source: 'ssr-data',
        dimensions: { width: 100, height: 100 },
      };
      const { id, collection } = fileMap.workingImgWithRemotePreview;
      const identifier = {
        mediaItemType: 'file',
        id,
        collectionName: collection,
      } as const;

      setGlobalSSRData(`${id}-${collection}`, expectedPreview);

      const { container } = render(
        <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
          <CardV2Loader
            mediaClientConfig={dummyMediaClientConfig}
            identifier={identifier}
            dimensions={{ width: 500, height: 500 }}
            ssr="client"
          />
        </MockedMediaClientProvider>,
      );

      // wait for ViewportDetector to be mounted before turning the card visible
      await waitFor(() =>
        expect(
          container.querySelector('[data-test-status="loading"]'),
        ).toBeInTheDocument(),
      );
      makeVisible();

      await waitFor(() => expect(fireNonCriticalErrorEvent).toBeCalledTimes(1));
      expect(fireNonCriticalErrorEvent).toBeCalledWith(
        expect.any(Function),
        expect.any(String),
        expect.any(Object),
        expect.any(Object),
        expect.objectContaining({
          primaryReason: 'remote-preview-fetch-ssr',
        }),
        expect.any(Object),
        undefined,
      );

      const img: HTMLImageElement = await screen.findByTestId(imgTestId);
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('global-scope-datauri');
    });

    describe('should abort the experience', () => {
      it('when the component is unmounted (file identifier)', async () => {
        let initialStore: any = { files: {} };
        const mockedMediaApi = createMockedMediaApi();
        const identifier = {
          mediaItemType: 'file',
          id: fileMap.workingPdfWithRemotePreview.id,
          collectionName: fileMap.workingPdfWithRemotePreview.collection,
        } as const;

        const { container, unmount } = render(
          <MockedMediaClientProvider
            mockedMediaApi={mockedMediaApi}
            initialStore={initialStore}
          >
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={identifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        unmount();
        expect(abortUfoExperience).toBeCalledTimes(1);
        expect(abortUfoExperience).toHaveBeenCalledWith(expect.any(String), {
          fileAttributes: {
            fileId: fileMap.workingPdfWithRemotePreview.id,
            fileMediatype:
              fileMap.workingPdfWithRemotePreview.details.mediaType,
            fileMimetype: fileMap.workingPdfWithRemotePreview.details.mimeType,
            fileSize: fileMap.workingPdfWithRemotePreview.details.size,
            fileStatus: 'processed',
          },
          fileStateFlags: {
            wasStatusProcessing: false,
            wasStatusUploading: false,
          },
          ssrReliability: {
            client: {
              status: 'unknown',
            },
            server: {
              status: 'unknown',
            },
          },
        });
      });

      it('when the component is unmounted (external image identifier)', async () => {
        const mockedMediaApi = createMockedMediaApi();
        const extIdentifier = {
          mediaItemType: 'external-image',
          dataURI: 'ext-uri',
          name: 'ext',
        } as const;

        const { container, unmount } = render(
          <MockedMediaClientProvider mockedMediaApi={mockedMediaApi}>
            <CardV2Loader
              mediaClientConfig={dummyMediaClientConfig}
              identifier={extIdentifier}
              isLazy={false}
            />
          </MockedMediaClientProvider>,
        );

        // simulate that the file has been fully processed in the browser
        const img = await screen.findByTestId(imgTestId);
        fireEvent.load(img);

        // card should completely process the file
        await waitFor(() =>
          expect(
            container.querySelector('[data-test-status="complete"]'),
          ).toBeInTheDocument(),
        );

        unmount();
        expect(abortUfoExperience).toBeCalledTimes(1);
        expect(abortUfoExperience).toHaveBeenCalledWith(expect.any(String), {
          fileAttributes: {
            fileMediatype: 'image',
            fileId: extIdentifier.mediaItemType,
          },
          fileStateFlags: {
            wasStatusProcessing: false,
            wasStatusUploading: false,
          },
          ssrReliability: {
            client: {
              status: 'unknown',
            },
            server: {
              status: 'unknown',
            },
          },
        });
      });
    });
  });
});
