import React from 'react';
import { TitleBlock } from '../../src';
import ExampleContainer from './example-container';
import { SmartLinkStatus } from '../../src/constants';

export default () => (
  <ExampleContainer>
    <TitleBlock status={SmartLinkStatus.Resolving} />
  </ExampleContainer>
);
