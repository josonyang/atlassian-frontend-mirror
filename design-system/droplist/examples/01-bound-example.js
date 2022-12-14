import React, { Component } from 'react';

// eslint-disable-next-line @atlaskit/design-system/no-deprecated-imports
import Item, { ItemGroup } from '@atlaskit/item';

import DropList from '../src';

export default class BoundingExample extends Component {
  render() {
    return (
      <div>
        <p>Scroll up to reposition the droplist</p>
        <div
          style={{
            border: '1px solid black',
            height: '200px',
            width: '300px',
            maxWidth: '100%',
            boxSizing: 'border-box',
            overflow: 'scroll',
          }}
        >
          <div
            style={{
              width: '300px',
              maxWidth: '100%',
              height: '600px',
              paddingTop: '200px',
            }}
          >
            <DropList boundariesElement="scrollParent" isOpen>
              <ItemGroup title="Australia">
                <Item>Sydney</Item>
                <Item isHidden>Darwin</Item>
                <Item isDisabled>Brisbane</Item>
                <Item>Canberra</Item>
                <Item>Melbourne</Item>
              </ItemGroup>
            </DropList>
          </div>
        </div>
      </div>
    );
  }
}
