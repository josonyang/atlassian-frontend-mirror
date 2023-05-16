// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'fetch-mock/cjs/client';

import mockedAvailableSitesResult from './__fixtures__/available-sites-result.json';

export const mockAvailableSites = () => {
  const fetchAvailableSiteEndpoint = /\/gateway\/api\/available-sites/;

  fetchMock.post(fetchAvailableSiteEndpoint, mockedAvailableSitesResult, {
    delay: 200,
  });
};

export const mockAvailableSitesWithError = () => {
  const fetchAvailableSiteEndpoint = /\/gateway\/api\/available-sites/;

  fetchMock.post(fetchAvailableSiteEndpoint, 503);
};

export const mockRestore = () => {
  fetchMock.restore();
};
