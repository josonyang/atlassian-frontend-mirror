import { useCallback, useMemo } from 'react';

import type { CardClient } from '@atlaskit/link-provider';
import { request } from '@atlaskit/linking-common';
import type {
  InvokeRequest,
  InvokeResponse,
} from '@atlaskit/linking-types/smart-link-actions';

import { useResolverUrl } from '../use-resolver-url';

/**
 * useSmartLinkClientExtension
 *
 * This hook extends the usage of @atlaskit/link-provider CardClient
 * for smart links.
 *
 * @param cardClient
 */
export const useSmartLinkClientExtension = (cardClient: CardClient) => {
  const resolvedUrl = useResolverUrl(cardClient);

  const invoke = useCallback(
    async (data: InvokeRequest) => {
      const response = await request<InvokeResponse>(
        'post',
        `${resolvedUrl}/invoke`,
        data,
        undefined,
        [200, 201, 202, 203, 204],
      );

      return response;
    },
    [resolvedUrl],
  );

  return useMemo(() => ({ invoke }), [invoke]);
};
