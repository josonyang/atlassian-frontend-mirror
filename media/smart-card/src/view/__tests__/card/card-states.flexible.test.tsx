jest.mock('react-lazily-render', () => (data: any) => data.content);
jest.mock('react-transition-group/Transition', () => (data: any) =>
  data.children,
);
jest.doMock('../../../utils/analytics/analytics');
import '../../__mocks__/intersection-observer.mock';
import { APIError } from '@atlaskit/linking-common';
import {
  CardClient,
  SmartCardProvider as Provider,
} from '@atlaskit/link-provider';
import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from '@testing-library/react';
import { Card, CardAppearance } from '../../Card';
import { fakeFactory, mocks } from '../../../utils/mocks';
import { TitleBlock } from '../../FlexibleCard/components/blocks';
import { flushPromises } from '@atlaskit/media-test-helpers';
import { JsonLd } from 'json-ld-types';

describe('smart-card: card states, flexible', () => {
  let mockClient: CardClient;
  let mockFetch: jest.Mock<Promise<JsonLd.Response>>;
  let mockUrl: string;
  let mockWindowOpen: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn(() => Promise.resolve(mocks.success));
    mockClient = new (fakeFactory(mockFetch))();
    mockWindowOpen = jest.fn();
    mockUrl = 'https://some.url';
    /// @ts-ignore
    global.open = mockWindowOpen;
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe('with render method: withUrl', () => {
    describe('> state: rejected with an error', () => {
      it('should render error view', async () => {
        mockFetch.mockRejectedValue(
          new APIError(
            'fatal',
            'localhost',
            'something wrong',
            'ResolveUnsupportedError',
          ),
        );

        const { getByTestId } = render(
          <Provider client={mockClient}>
            <Card appearance="inline" url={mockUrl}>
              <TitleBlock />
            </Card>
          </Provider>,
        );

        const erroredView = await waitForElement(() =>
          getByTestId('smart-block-title-errored-view'),
        );
        expect(erroredView).toBeTruthy();
        await flushPromises();

        const erroredViewAgain = await waitForElement(() =>
          getByTestId('smart-block-title-errored-view'),
        );
        expect(erroredViewAgain).toBeTruthy();
      });
    });

    describe('> state: resolved', () => {
      it('should open window when flexible ui link with resolved URL is clicked', async () => {
        const mockUrl = 'https://this.is.the.seventh.url';
        const { getByTestId } = render(
          <Provider client={mockClient}>
            <Card testId="resolvedCard2" appearance="inline" url={mockUrl}>
              <TitleBlock />
            </Card>
          </Provider>,
        );
        const resolvedView = await waitForElement(
          () => getByTestId('smart-block-title-resolved-view'),
          {
            timeout: 5000,
          },
        );
        expect(resolvedView).toBeTruthy();

        const resolvedCard = getByTestId('smart-element-link');
        expect(resolvedCard).toBeTruthy();
        fireEvent.click(resolvedCard);

        // ensure default onclick for renderer is not triggered
        expect(mockWindowOpen).toHaveBeenCalledTimes(0);
      });

      it('should render with metadata when resolved', async () => {
        const { getByText } = render(
          <Provider client={mockClient}>
            <Card appearance="inline" url={mockUrl}>
              <TitleBlock />
            </Card>
          </Provider>,
        );
        const resolvedViewName = await waitForElement(() =>
          getByText('I love cheese'),
        );
        expect(resolvedViewName).toBeTruthy();
        expect(mockFetch).toBeCalled();
        expect(mockFetch).toBeCalledTimes(1);
      });

      it('should re-render when URL changes', async () => {
        const { getByText, rerender } = render(
          <Provider client={mockClient}>
            <Card appearance="block" url={mockUrl}>
              <TitleBlock />
            </Card>
          </Provider>,
        );
        const resolvedView = await waitForElement(() =>
          getByText('I love cheese'),
        );
        expect(resolvedView).toBeTruthy();
        expect(mockFetch).toBeCalled();
        expect(mockFetch).toBeCalledTimes(1);

        rerender(
          <Provider client={mockClient}>
            <Card appearance="block" url="https://google.com">
              <TitleBlock />
            </Card>
          </Provider>,
        );
        await waitForElement(() => getByText('I love cheese'));
        expect(mockFetch).toBeCalled();
        expect(mockFetch).toBeCalledTimes(2);
      });

      it('should not re-render when appearance changes', async () => {
        const { getByText, rerender } = render(
          <Provider client={mockClient}>
            <Card appearance="inline" url={mockUrl}>
              <TitleBlock />
            </Card>
          </Provider>,
        );
        const resolvedView = await waitForElement(() =>
          getByText('I love cheese'),
        );
        expect(resolvedView).toBeTruthy();
        expect(mockFetch).toBeCalled();
        expect(mockFetch).toBeCalledTimes(1);

        rerender(
          <Provider client={mockClient}>
            <Card appearance="block" url={mockUrl}>
              <TitleBlock />
            </Card>
          </Provider>,
        );
        await waitForElement(() => getByText('I love cheese'));
        expect(mockFetch).toBeCalled();
        expect(mockFetch).toBeCalledTimes(1);
      });

      it('should call onResolve prop after flexible card is resolved', async () => {
        const mockFn = jest.fn();
        const mockUrl = 'https://this.is.the.seventh.url';
        const { getByTestId } = render(
          <Provider client={mockClient}>
            <Card appearance="inline" url={mockUrl} onResolve={mockFn}>
              <TitleBlock />
            </Card>
          </Provider>,
        );
        const resolvedView = await waitForElement(
          () => getByTestId('smart-block-title-resolved-view'),
          {
            timeout: 5000,
          },
        );
        expect(resolvedView).toBeTruthy();

        expect(mockFn).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('render method: withData', () => {
    describe('> state: resolved', () => {
      it('flexible: renders successfully with data', async () => {
        const { getByText } = render(
          <Provider client={mockClient}>
            <Card appearance="block" url={mockUrl} data={mocks.success.data}>
              <TitleBlock />
            </Card>
          </Provider>,
        );
        const resolvedViewName = await waitForElement(() =>
          getByText('I love cheese'),
        );
        const resolvedViewDescription = await waitForElement(() =>
          getByText('Here is your serving of cheese: 🧀'),
        );
        expect(resolvedViewName).toBeTruthy();
        expect(resolvedViewDescription).toBeTruthy();
      });
    });
  });

  describe.each([
    'inline' as CardAppearance,
    'block' as CardAppearance,
    'embed' as CardAppearance,
  ])('with %s card appearance', (appearance: CardAppearance) => {
    const testId = 'smart-links-container'; // default Flexible UI container testId
    it('renders Flexible UI', async () => {
      const { getByTestId } = render(
        <Provider client={mockClient}>
          <Card appearance={appearance} url={mockUrl}>
            <TitleBlock />
          </Card>
        </Provider>,
      );
      const block = await waitForElement(() => getByTestId(testId));
      expect(block).toBeTruthy();
    });

    it('does not render Flexible UI when card has no children', () => {
      const { queryByTestId } = render(
        <Provider client={mockClient}>
          <Card appearance={appearance} url={mockUrl} />
        </Provider>,
      );
      expect(queryByTestId(testId)).toBeNull();
    });

    it('does not render Flexible UI when card has no valid children', () => {
      const { queryByTestId } = render(
        <Provider client={mockClient}>
          <Card appearance={appearance} url={mockUrl}>
            <div>Test</div>
          </Card>
        </Provider>,
      );
      expect(queryByTestId(testId)).toBeNull();
    });
  });

  describe('with authFlow disabled', () => {
    it('renders Flexible UI with available data', async () => {
      const mockUrl = 'https://this.is.the.seventh.url';
      mockFetch.mockResolvedValueOnce({
        meta: {
          auth: [],
          definitionId: 'confluence-object-provider',
          visibility: 'restricted',
          access: 'forbidden',
          resourceType: 'page',
          key: 'confluence-object-provider',
          requestAccess: {
            accessType: 'ACCESS_EXISTS',
            cloudId: 'DUMMY-CLOUD-ID',
          },
        },
        data: {
          '@context': {
            '@vocab': 'https://www.w3.org/ns/activitystreams#',
            atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
            schema: 'http://schema.org/',
          },
          generator: {
            '@type': 'Application',
            '@id': 'https://www.atlassian.com/#Confluence',
            name: 'Confluence',
          },
          url: mockUrl,
          '@type': ['Document', 'schema:TextDigitalDocument'],
        },
      });

      const { findByTestId, queryByTestId } = render(
        <Provider client={mockClient} authFlow="disabled">
          <Card appearance="inline" url={mockUrl}>
            <TitleBlock testId="auth-flow-disabled" />
          </Card>
        </Provider>,
      );
      const view = await findByTestId('auth-flow-disabled-errored-view');
      const icon = await findByTestId('smart-element-icon-icon--wrapper');
      const link = await findByTestId('smart-element-link');
      const message = queryByTestId('auth-flow-disabled-errored-view-message');

      expect(view).toBeTruthy();
      expect(icon.getAttribute('aria-label')).toBe('Confluence');
      expect(link.textContent).toBe(mockUrl);
      expect(message).not.toBeInTheDocument();
    });
  });
});
