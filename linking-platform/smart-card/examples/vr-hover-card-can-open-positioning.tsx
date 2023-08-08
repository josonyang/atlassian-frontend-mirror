/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';

import { token } from '@atlaskit/tokens';

import { VRTestWrapper } from './utils/vr-test';
import { Provider, Client, ResolveResponse } from '../src';
import { mockConfluenceResponse } from '../src/view/HoverCard/__tests__/__mocks__/mocks';
import { HoverCard } from '../src/hoverCard';

class CustomClient extends Client {
  fetchData(url: string) {
    return Promise.resolve(mockConfluenceResponse as ResolveResponse);
  }
}

const styles = css`
  display: flex;
  gap: 1rem;

  > div {
    flex-grow: 1;
    padding: 1rem;
    background-color: ${token(
      'color.background.accent.lime.subtlest',
      '#eefbda',
    )};

    &:hover {
      background-color: ${token(
        'color.background.accent.lime.bolder',
        '#5b7f24',
      )};
    }
  }
`;

export default () => {
  const [canOpen, setCanOpen] = useState(true);

  return (
    <VRTestWrapper title="Hover Card: CanOpen and Positioning">
      <Provider
        client={new CustomClient('staging')}
        featureFlags={{ enableImprovedPreviewAction: true }}
      >
        <HoverCard url="https://www.mockurl.com" canOpen={canOpen}>
          <div css={styles}>
            <div
              data-testid="hover-test-can-open-left"
              onMouseEnter={() => setCanOpen(true)}
            >
              Open
            </div>
            <div
              data-testid="hover-test-cannot-open"
              onMouseEnter={() => setCanOpen(false)}
            >
              Close
            </div>
            <div
              data-testid="hover-test-can-open-right"
              onMouseEnter={() => setCanOpen(true)}
            >
              Open
            </div>
          </div>
        </HoverCard>
      </Provider>
    </VRTestWrapper>
  );
};