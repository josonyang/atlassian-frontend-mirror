import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import { SmartCardProvider } from '@atlaskit/link-provider';
import { mockSimpleIntersectionObserver } from '@atlaskit/link-test-helpers';

import SmartLinkClient from '../../../../../examples-helpers/smartLinkCustomClient';

import Link, { LINK_TYPE_TEST_ID } from './index';

mockSimpleIntersectionObserver(); // required to mock smart link internals
describe('Link Type', () => {
  const smartLinkClient = new SmartLinkClient();
  const spyFetchData = jest.spyOn(smartLinkClient, 'fetchData');
  let originalWindowOpen: typeof window.open;
  // Needed to suppress console errors in smart-card
  let consoleErrorFn: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorFn = jest
      .spyOn(console, 'error')
      .mockImplementation(() => jest.fn());
  });
  afterEach(() => {
    consoleErrorFn.mockRestore();
  });

  beforeAll(() => {
    originalWindowOpen = window.open;
    window.open = jest.fn();
  });

  afterAll(() => {
    window.open = originalWindowOpen;
  });

  const setup = ({ url = '', ...props }) => {
    return render(
      <SmartCardProvider client={smartLinkClient}>
        <Link url={url} {...props} />
      </SmartCardProvider>,
    );
  };
  it('renders empty dom when url is undefined', async () => {
    const { container } = setup({ url: undefined });
    expect(container).toBeEmptyDOMElement();
  });

  it('renders as a smart link', async () => {
    const { getByText, queryByTestId } = setup({
      url: 'https://product-fabric.atlassian.net/browse/EDM-5941',
    });

    await waitFor(() =>
      getByText(
        'EDM-5941: Implement mapping between data type and visual component',
      ),
    );

    const card = queryByTestId(`${LINK_TYPE_TEST_ID}-resolved-view`);

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute(
      'href',
      'https://product-fabric.atlassian.net/browse/EDM-5941',
    );
  });

  it('opens a smart link in a new tab when clicked', async () => {
    const { getByText, queryByTestId } = setup({
      url: 'https://product-fabric.atlassian.net/browse/EDM-5941',
    });

    await waitFor(() =>
      getByText(
        'EDM-5941: Implement mapping between data type and visual component',
      ),
    );

    const card = queryByTestId(`${LINK_TYPE_TEST_ID}-resolved-view`);

    expect(card).toBeInTheDocument();

    fireEvent.click(card!);

    expect(window.open).toHaveBeenCalledWith(
      'https://product-fabric.atlassian.net/browse/EDM-5941',
      '_blank',
      'noopener, noreferrer',
    );
  });

  it('renders errored view when smart link does not resolve', async () => {
    const { queryByTestId } = setup({
      url: 'https://link-that-does-not-resolve.com',
    });

    await waitFor(() => expect(spyFetchData).toHaveBeenCalled());

    const card = queryByTestId(`${LINK_TYPE_TEST_ID}-errored-view`);

    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('https://link-that-does-not-resolve.com');
    expect(card).toHaveAttribute(
      'href',
      'https://link-that-does-not-resolve.com',
    );
  });

  it('renders fallback when smart link resolves with ResolveUnsupportedError', async () => {
    const { queryByRole } = setup({
      url: 'https://link-that-is-unsupported.com',
    });

    await waitFor(() => expect(spyFetchData).toHaveBeenCalled());

    const anchor = queryByRole('link');

    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveTextContent('https://link-that-is-unsupported.com');
    expect(anchor).toHaveAttribute(
      'href',
      'https://link-that-is-unsupported.com',
    );
    expect(anchor).toHaveAttribute('target', '_blank');
  });

  it('renders with the text passed and has correct attributes', async () => {
    const { queryByRole } = setup({
      url: 'https://www.atlassian.com/',
      text: 'Atlassian Website',
    });

    const anchor = queryByRole('link');

    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveTextContent('Atlassian Website');
    expect(anchor).toHaveAttribute('href', 'https://www.atlassian.com/');
    expect(anchor).toHaveAttribute('target', '_blank');
  });

  it('renders with the styles when linkType is passed', async () => {
    const { queryByRole } = setup({
      url: 'https://www.atlassian.com/',
      text: 'Atlassian Website',
      style: {
        appearance: 'key',
      },
    });

    const anchor = queryByRole('link');

    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveStyle({
      fontWeight: '600',
      marginTop: '20px',
      textTransform: 'uppercase',
    });
  });
});
