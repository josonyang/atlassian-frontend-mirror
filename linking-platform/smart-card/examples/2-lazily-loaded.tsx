import React from 'react';
import { Provider, Card, Client } from '../src';

export default () => (
  <Provider client={new Client('staging')}>
    <div>
      <p>Scroll ⇣ to find a lazily loaded smart card 👇</p>
      <div
// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
        style={{ height: '3000px', display: 'flex', alignItems: 'flex-start' }}
      />
      <Card
        url="https://trello.com/b/8B5zyiSn/test-smart-card-board"
        appearance="block"
      />
    </div>
  </Provider>
);
