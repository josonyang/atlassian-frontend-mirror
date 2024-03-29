/** @jsx jsx */
import { jsx } from '@emotion/react';
import type { FC } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { StorageClient } from '@atlaskit/frontend-utilities/storage-client';

import { getPulseStyles } from './styled';
import type { FeatureDiscoveryProps } from './types';

const LOCAL_STORAGE_CLIENT_KEY = '@atlaskit/smart-card';
const LOCAL_STORAGE_DISCOVERY_KEY = 'action-discovery-status';
const LOCAL_STORAGE_DISCOVERY_VALUE = 'discovered';
const LOCAL_STORAGE_DISCOVERY_EXPIRY_IN_MS = 15552000000; // 180 days
const LOCAL_STORAGE_DISCOVERY_REQUIRED_TIME = 2000; // 2s

/**
 * This is a hacky solution to help with the feature discovery.
 * This implementation must be removed once the experiment is completed.
 * Cleanup on https://product-fabric.atlassian.net/browse/EDM-5795
 * @see https://team.atlassian.com/project/ATLAS-13099/about
 */
const FeatureDiscovery: FC<FeatureDiscoveryProps> = ({
  appearance,
  children,
  testId,
}) => {
  const renderedTime = useRef<number>();

  const storageClient = useMemo(
    () => new StorageClient(LOCAL_STORAGE_CLIENT_KEY),
    [],
  );
  const discovered = useMemo(
    () =>
      storageClient.getItem(LOCAL_STORAGE_DISCOVERY_KEY) ===
      LOCAL_STORAGE_DISCOVERY_VALUE,
    [storageClient],
  );

  useEffect(() => {
    renderedTime.current = Date.now();

    return () => {
      if (!discovered && renderedTime.current) {
        const duration = Date.now() - renderedTime.current;
        if (duration > LOCAL_STORAGE_DISCOVERY_REQUIRED_TIME) {
          storageClient.setItemWithExpiry(
            LOCAL_STORAGE_DISCOVERY_KEY,
            LOCAL_STORAGE_DISCOVERY_VALUE,
            LOCAL_STORAGE_DISCOVERY_EXPIRY_IN_MS,
          );
        }
      }
    };
  }, [storageClient, discovered]);

  const component = useMemo(() => {
    if (!discovered) {
      return (
        <span
          css={getPulseStyles(appearance)}
          data-testid={`${testId}-discovery`}
        >
          {children}
        </span>
      );
    }
  }, [appearance, children, discovered, testId]);

  return component ?? children;
};

export default FeatureDiscovery;
