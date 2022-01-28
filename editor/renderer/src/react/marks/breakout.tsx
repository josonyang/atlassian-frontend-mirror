import React from 'react';
import styled from 'styled-components';
import { BreakoutMarkAttrs } from '@atlaskit/adf-schema';
import { WidthConsumer } from '@atlaskit/editor-common/ui';
import { calcBreakoutWidth } from '@atlaskit/editor-common/utils';
import { blockNodesVerticalMargin } from '@atlaskit/editor-shared-styles';
import { MarkProps } from '../types';

export const Wrapper = styled.div`
  margin: ${blockNodesVerticalMargin} 0;
  margin-left: 50%;
  transform: translateX(-50%);
`;

export default function Breakout(props: MarkProps<BreakoutMarkAttrs>) {
  return (
    <WidthConsumer>
      {({ width }) => (
        <Wrapper
          data-mode={props.mode}
          style={{ width: calcBreakoutWidth(props.mode, width) }}
          className="fabric-editor-breakout-mark fabric-editor-block-mark"
        >
          {props.children}
        </Wrapper>
      )}
    </WidthConsumer>
  );
}
